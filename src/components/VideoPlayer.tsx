import { useRef, useEffect, useState, memo, useCallback, useMemo } from 'react';
import { Controls } from './Controls';
import { LoadingSpinner } from './LoadingSpinner';
import { Caption } from './Caption';
import { KeyboardShortcutsHelp } from './KeyboardShortcutsHelp';
import { useVideo } from '../hooks/useVideo';
import { useCustomCaptions } from '../hooks/useCustomCaptions';
import { useAnalytics } from '../hooks/useAnalytics';
import { VideoPlayerProps, SubtitleTrack, PlaylistItem } from '../types/video';
import '../styles/player.css';

export const VideoPlayer = memo<VideoPlayerProps>(({
  src,
  poster,
  captions,
  customCaptions = [],
  title,
  description,
  theme = 'dark',
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  width = '100%',
  height = 'auto',
  className = '',
  style = {},
  chapters,
  qualities,
  enablePictureInPicture = true,
  enableTheaterMode = true,
  enableAnalytics = false,
  enableSocialShare = true,
  enableKeyboardShortcuts = true,
  showKeyboardShortcutsHelp = false,
  theaterMode = false,
  controlOptions,
  onPlay,
  onPause,
  onTimeUpdate,
  onVolumeChange,
  onSeek,
  onEnded,
  onError,
  onChapterChange,
  onQualityChange,
  onSubtitleChange,
  onPlaylistItemChange,
  onAnalyticsUpdate,
  onShare,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(showKeyboardShortcutsHelp);
  const qualityChangedRef = useRef(false);
  const lastQualitySrcRef = useRef<string | null>(null);
  const volumeChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playbackRateChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTrackedVolumeRef = useRef<number>(0);

  // Normalize src to handle string, array, or playlist
  const getVideoSrc = useCallback((): string => {
    if (typeof src === 'string') return src;
    if (Array.isArray(src)) {
      if (src.length > 0 && typeof src[0] === 'string') {
        return src[0];
      }
      if (src.length > 0) {
        const firstItem = src[0];
        if (typeof firstItem === 'object' && firstItem !== null && 'src' in firstItem) {
          return (firstItem as PlaylistItem).src;
        }
      }
    }
    return '';
  }, [src]);

  const getCurrentPlaylistItem = useCallback((): PlaylistItem | null => {
    if (Array.isArray(src) && src.length > 0) {
      const firstItem = src[0];
      if (typeof firstItem === 'object' && firstItem !== null && 'src' in firstItem) {
        return (src[currentPlaylistIndex] as PlaylistItem) || null;
      }
    }
    return null;
  }, [src, currentPlaylistIndex]);

  const currentItem = getCurrentPlaylistItem();
  const baseVideoSrc = currentItem?.src || getVideoSrc();
  const videoPoster = currentItem?.poster || poster;
  const videoTitle = currentItem?.title || title;

  // Normalize captions to handle string or array
  const subtitleTracks: SubtitleTrack[] = useMemo(() => {
    if (!captions) return [];
    if (typeof captions === 'string') {
      return [{ label: 'English', language: 'en', src: captions, default: true }];
    }
    return captions;
  }, [captions]);

  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [feedback, setFeedback] = useState({
    playPause: false,
    seek: false,
    seekText: '',
    volume: false,
    volumeText: ''
  });
  const [isVolumeSliderOpen, setIsVolumeSliderOpen] = useState(false);

  const videoState = useVideo(videoRef, containerRef, {
    onPlay,
    onPause,
    onTimeUpdate,
    onVolumeChange,
    onSeek,
    onEnded: () => {
      onEnded?.();
      // Auto-play next in playlist
      if (Array.isArray(src) && src.length > 0) {
        const firstItem = src[0];
        if (typeof firstItem === 'object' && firstItem !== null && 'src' in firstItem) {
          const playlist = src as PlaylistItem[];
          if (currentPlaylistIndex < playlist.length - 1) {
            setCurrentPlaylistIndex(prev => prev + 1);
          }
        }
      }
    },
    onError,
    onSeekFeedback: (timeDiff: number) => {
      if (Math.abs(timeDiff) >= 5) {
        setFeedback(prev => ({
          ...prev,
          seek: true,
          seekText: `${timeDiff > 0 ? '+' : ''}${Math.round(timeDiff)}s`
        }));
        setTimeout(() => setFeedback(prev => ({ ...prev, seek: false })), 1000);
      }
    },
    onVolumeFeedback: (volume, isMuted) => {
      setFeedback(prev => ({
        ...prev,
        volume: true,
        volumeText: isMuted ? 'Muted' : `${Math.round(volume * 100)}%`
      }));
      setTimeout(() => setFeedback(prev => ({ ...prev, volume: false })), 1000);
    },
    onPlayPauseFeedback: () => {
      setFeedback(prev => ({ ...prev, playPause: true }));
      setTimeout(() => setFeedback(prev => ({ ...prev, playPause: false })), 800);
    },
    onChapterChange,
    onQualityChange,
    onSubtitleChange,
    chapters,
    qualities,
    subtitleTracks,
    enablePictureInPicture,
    enableTheaterMode,
    theaterMode,
    enableKeyboardShortcuts,
    showKeyboardShortcutsHelp: showKeyboardHelp,
    onKeyboardShortcutsHelpToggle: (show: boolean) => {
      setShowKeyboardHelp(show);
    }
  });

  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    isFullscreen,
    isPictureInPicture,
    isTheaterMode,
    captionsEnabled,
    isLoading,
    buffered,
    currentQuality,
    currentChapter,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    setPlaybackRate,
    toggleFullscreen,
    togglePictureInPicture,
    toggleTheaterMode,
    toggleCaptions,
    setQuality,
    seekToChapter,
    formatTime
  } = videoState;

  // Use quality source if quality is set, otherwise use base source
  // This must be calculated after currentQuality is available from useVideo
  const videoSrc = useMemo((): string => {
    if (currentQuality && qualities && qualities.length > 0) {
      const qualityOption = qualities.find(q => q.value === currentQuality);
      if (qualityOption && qualityOption.src) {
        return qualityOption.src;
      }
    }
    return baseVideoSrc;
  }, [currentQuality, qualities, baseVideoSrc]);

  // Analytics hook
  const { trackVolumeChange, trackPlaybackRateChange } = useAnalytics({
    enabled: enableAnalytics,
    onUpdate: onAnalyticsUpdate,
    currentTime,
    duration,
    isPlaying,
    chapters: chapters || []
  });

  // Initialize lastTrackedVolumeRef with current volume
  useEffect(() => {
    if (lastTrackedVolumeRef.current === 0) {
      lastTrackedVolumeRef.current = volume;
    }
  }, [volume]);

  // Track volume and playback rate changes for analytics (debounced to avoid excessive updates)
  useEffect(() => {
    if (!enableAnalytics) return;
    
    // Only track if volume changed significantly (more than 5%) to avoid tracking every mouse move
    const volumeDiff = Math.abs(volume - lastTrackedVolumeRef.current);
    if (volumeDiff < 0.05) return; // Less than 5% change, don't track
    
    // Clear any existing timeout
    if (volumeChangeTimeoutRef.current) {
      clearTimeout(volumeChangeTimeoutRef.current);
    }
    
    // Debounce volume change tracking (wait 500ms after last change)
    volumeChangeTimeoutRef.current = setTimeout(() => {
      trackVolumeChange();
      lastTrackedVolumeRef.current = volume;
    }, 500);
    
    return () => {
      if (volumeChangeTimeoutRef.current) {
        clearTimeout(volumeChangeTimeoutRef.current);
      }
    };
  }, [enableAnalytics, volume, trackVolumeChange]);
  
  useEffect(() => {
    if (!enableAnalytics) return;
    
    // Clear any existing timeout
    if (playbackRateChangeTimeoutRef.current) {
      clearTimeout(playbackRateChangeTimeoutRef.current);
    }
    
    // Debounce playback rate change tracking (wait 300ms after last change)
    playbackRateChangeTimeoutRef.current = setTimeout(() => {
      trackPlaybackRateChange();
    }, 300);
    
    return () => {
      if (playbackRateChangeTimeoutRef.current) {
        clearTimeout(playbackRateChangeTimeoutRef.current);
      }
    };
  }, [enableAnalytics, playbackRate, trackPlaybackRateChange]);

  // Custom captions hook
  const { currentCaption, isVisible: isCaptionVisible } = useCustomCaptions(
    customCaptions,
    currentTime,
    captionsEnabled
  );

  // Track quality changes to prevent VideoPlayer from resetting source
  useEffect(() => {
    if (currentQuality && qualities && qualities.length > 0) {
      const qualityOption = qualities.find(q => q.value === currentQuality);
      if (qualityOption) {
        lastQualitySrcRef.current = qualityOption.src;
        qualityChangedRef.current = true;
      }
    }
  }, [currentQuality, qualities]);

  // Update video src when playlist changes (but not during quality changes)
  useEffect(() => {
    if (videoRef.current && videoSrc) {
      const video = videoRef.current;
      
      // Don't update if quality is being changed or was recently changed
      if ((video as any).__isChangingQuality) {
        return;
      }
      
      // If quality was changed, don't reset to original videoSrc
      if (qualityChangedRef.current && lastQualitySrcRef.current) {
        const normalizeUrl = (url: string) => {
          try {
            const urlObj = new URL(url);
            return urlObj.origin + urlObj.pathname;
          } catch {
            return url.split('?')[0].split('#')[0].replace(/\/$/, '');
          }
        };
        
        const currentSrc = video.src || video.currentSrc || '';
        const normalizedCurrentSrc = normalizeUrl(currentSrc);
        const normalizedQualitySrc = normalizeUrl(lastQualitySrcRef.current);
        
        // If current source matches the quality source, don't change it
        if (normalizedCurrentSrc === normalizedQualitySrc || currentSrc === lastQualitySrcRef.current) {
          return;
        }
      }
      
      // Normalize URLs for comparison
      const normalizeUrl = (url: string) => {
        try {
          const urlObj = new URL(url);
          return urlObj.origin + urlObj.pathname;
        } catch {
          return url.split('?')[0].split('#')[0].replace(/\/$/, '');
        }
      };
      
      // Only update if source is actually different
      const currentSrc = video.src || video.currentSrc || '';
      const normalizedCurrentSrc = normalizeUrl(currentSrc);
      const normalizedVideoSrc = normalizeUrl(videoSrc);
      
      // Only update if:
      // 1. Source is actually different
      // 2. Not in the middle of a quality change
      // 3. Quality hasn't been manually changed (use quality source instead)
      if (normalizedCurrentSrc !== normalizedVideoSrc && currentSrc !== videoSrc) {
        if (!(video as any).__isChangingQuality) {
          // If quality was set, prefer quality source over original videoSrc
          if (qualityChangedRef.current && lastQualitySrcRef.current) {
            const normalizedQualitySrc = normalizeUrl(lastQualitySrcRef.current);
            if (normalizedCurrentSrc !== normalizedQualitySrc) {
              video.src = lastQualitySrcRef.current;
            }
          } else {
            video.src = videoSrc;
          }
          
          if (currentItem) {
            onPlaylistItemChange?.(currentPlaylistIndex, currentItem);
          }
        }
      }
    }
  }, [videoSrc, currentItem, currentPlaylistIndex, onPlaylistItemChange]);

  // Show/hide controls based on activity
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let timeout: NodeJS.Timeout;
    let touchStartTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTouchTime = 0;
    let swipeStartX = 0;
    let swipeStartY = 0;
    let isSwipeGesture = false;

    const showControls = () => {
      setIsControlsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying && !isHoveringRef.current && !isVolumeSliderOpen) {
          setIsControlsVisible(false);
        }
      }, 3000);
    };

    const hideControls = () => {
      if (isPlaying && !isHoveringRef.current && !isVolumeSliderOpen) {
        setIsControlsVisible(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartTime = Date.now();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      swipeStartX = e.touches[0].clientX;
      swipeStartY = e.touches[0].clientY;
      isSwipeGesture = false;
      showControls();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = Math.abs(currentX - swipeStartX);
        const deltaY = Math.abs(currentY - swipeStartY);
        
        if (deltaX > 30 && deltaX > deltaY) {
          isSwipeGesture = true;
          const swipeDistance = currentX - swipeStartX;
          const seekDistance = swipeDistance / node.offsetWidth;
          const seekTime = seekDistance * duration;
          const newTime = Math.max(0, Math.min(duration, currentTime + seekTime));
          seek(newTime);
        }
      }
      showControls();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime;
      const currentTime = Date.now();
      
      if (!isSwipeGesture) {
        if (currentTime - lastTouchTime < 300 && touchDuration < 200) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const distance = Math.sqrt(
            Math.pow(touchEndX - touchStartX, 2) + Math.pow(touchEndY - touchStartY, 2)
          );
          
          if (distance < 50) {
            togglePlay();
          }
        }
      }
      
      lastTouchTime = currentTime;
      isSwipeGesture = false;
      showControls();
    };

    node.addEventListener('mouseenter', showControls);
    node.addEventListener('mousemove', showControls);
    node.addEventListener('mouseleave', hideControls);
    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchmove', handleTouchMove, { passive: false });
    node.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      node.removeEventListener('mouseenter', showControls);
      node.removeEventListener('mousemove', showControls);
      node.removeEventListener('mouseleave', hideControls);
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
      node.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(timeout);
    };
  }, [isPlaying, isVolumeSliderOpen, togglePlay, seek, currentTime, duration]);

  useEffect(() => {
    if (!isPlaying) setIsControlsVisible(true);
  }, [isPlaying]);

  // Get share URL
  const getShareUrl = useCallback((): string => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  }, []);

  const isPlaylist = Array.isArray(src) && src.length > 0 && 
    typeof src[0] === 'object' && src[0] !== null && 'src' in src[0];
  const playlist = isPlaylist ? (src as PlaylistItem[]) : null;

  // Apply custom CSS variables
  const customStyle = useMemo(() => {
    const cssVars: Record<string, string> = {};
    
    if (controlOptions?.customCSSVariables) {
      Object.entries(controlOptions.customCSSVariables).forEach(([key, value]) => {
        cssVars[`--rvp-${key}`] = value;
      });
    }

    // Apply control options as CSS variables
    if (controlOptions?.playButtonStyle) {
      const s = controlOptions.playButtonStyle;
      if (s.backgroundColor) cssVars['--rvp-play-btn-bg'] = s.backgroundColor;
      if (s.hoverBackgroundColor) cssVars['--rvp-play-btn-hover-bg'] = s.hoverBackgroundColor;
      if (s.color) cssVars['--rvp-play-btn-color'] = s.color;
      if (s.borderRadius) cssVars['--rvp-play-btn-radius'] = s.borderRadius;
      if (s.width) cssVars['--rvp-play-btn-width'] = s.width;
      if (s.height) cssVars['--rvp-play-btn-height'] = s.height;
    }

    if (controlOptions?.volumeButtonStyle) {
      const s = controlOptions.volumeButtonStyle;
      if (s.backgroundColor) cssVars['--rvp-volume-btn-bg'] = s.backgroundColor;
      if (s.hoverBackgroundColor) cssVars['--rvp-volume-btn-hover-bg'] = s.hoverBackgroundColor;
      if (s.color) cssVars['--rvp-volume-btn-color'] = s.color;
      if (s.borderRadius) cssVars['--rvp-volume-btn-radius'] = s.borderRadius;
    }

    if (controlOptions?.controlButtonStyle) {
      const s = controlOptions.controlButtonStyle;
      if (s.backgroundColor) cssVars['--rvp-control-btn-bg'] = s.backgroundColor;
      if (s.hoverBackgroundColor) cssVars['--rvp-control-btn-hover-bg'] = s.hoverBackgroundColor;
      if (s.color) cssVars['--rvp-control-btn-color'] = s.color;
      if (s.padding) cssVars['--rvp-control-btn-padding'] = s.padding;
      if (s.width) cssVars['--rvp-control-btn-width'] = s.width;
      if (s.height) cssVars['--rvp-control-btn-height'] = s.height;
    }

    if (controlOptions?.seekBarStyle) {
      const s = controlOptions.seekBarStyle;
      if (s.height) cssVars['--rvp-seekbar-height'] = s.height;
      if (s.hoverHeight) cssVars['--rvp-seekbar-hover-height'] = s.hoverHeight;
      if (s.backgroundColor) cssVars['--rvp-seekbar-bg'] = s.backgroundColor;
      if (s.playedColor) cssVars['--rvp-seekbar-played'] = s.playedColor;
      if (s.bufferedColor) cssVars['--rvp-seekbar-buffered'] = s.bufferedColor;
      if (s.thumbColor) cssVars['--rvp-seekbar-thumb'] = s.thumbColor;
      if (s.thumbSize) cssVars['--rvp-seekbar-thumb-size'] = s.thumbSize;
      if (s.hoverThumbSize) cssVars['--rvp-seekbar-thumb-hover-size'] = s.hoverThumbSize;
      if (s.borderRadius) cssVars['--rvp-seekbar-radius'] = s.borderRadius;
    }

    if (controlOptions?.volumeSliderStyle) {
      const s = controlOptions.volumeSliderStyle;
      if (s.width) cssVars['--rvp-volume-slider-width'] = s.width;
      if (s.height) cssVars['--rvp-volume-slider-height'] = s.height;
      if (s.backgroundColor) cssVars['--rvp-volume-slider-bg'] = s.backgroundColor;
      if (s.fillColor) cssVars['--rvp-volume-slider-fill'] = s.fillColor;
      if (s.thumbColor) cssVars['--rvp-volume-slider-thumb'] = s.thumbColor;
      if (s.thumbSize) cssVars['--rvp-volume-slider-thumb-size'] = s.thumbSize;
      if (s.borderRadius) cssVars['--rvp-volume-slider-radius'] = s.borderRadius;
    }

    if (controlOptions?.timeDisplayStyle) {
      const s = controlOptions.timeDisplayStyle;
      if (s.fontSize) cssVars['--rvp-time-font-size'] = s.fontSize;
      if (s.fontWeight) cssVars['--rvp-time-font-weight'] = String(s.fontWeight);
      if (s.color) cssVars['--rvp-time-color'] = s.color;
      if (s.backgroundColor) cssVars['--rvp-time-bg'] = s.backgroundColor;
      if (s.backdropFilter) cssVars['--rvp-time-backdrop'] = s.backdropFilter;
      if (s.borderColor) cssVars['--rvp-time-border'] = s.borderColor;
      if (s.borderRadius) cssVars['--rvp-time-radius'] = s.borderRadius;
      if (s.padding) cssVars['--rvp-time-padding'] = s.padding;
      if (s.textShadow) cssVars['--rvp-time-shadow'] = s.textShadow;
    }

    if (controlOptions?.controlsBarStyle) {
      const s = controlOptions.controlsBarStyle;
      if (s.backgroundColor) cssVars['--rvp-controls-bar-bg'] = s.backgroundColor;
      if (s.padding) cssVars['--rvp-controls-bar-padding'] = s.padding;
      if (s.gap) cssVars['--rvp-controls-bar-gap'] = s.gap;
      if (s.borderRadius) cssVars['--rvp-controls-bar-radius'] = s.borderRadius;
      if (s.height) cssVars['--rvp-controls-bar-height'] = s.height;
      if (s.minHeight) cssVars['--rvp-controls-bar-min-height'] = s.minHeight;
    }

    if (controlOptions?.tooltipStyle) {
      const s = controlOptions.tooltipStyle;
      if (s.backgroundColor) cssVars['--rvp-tooltip-bg'] = s.backgroundColor;
      if (s.color) cssVars['--rvp-tooltip-color'] = s.color;
      if (s.fontSize) cssVars['--rvp-tooltip-font-size'] = s.fontSize;
      if (s.fontWeight) cssVars['--rvp-tooltip-font-weight'] = String(s.fontWeight);
      if (s.padding) cssVars['--rvp-tooltip-padding'] = s.padding;
      if (s.borderRadius) cssVars['--rvp-tooltip-radius'] = s.borderRadius;
    }

    return cssVars;
  }, [controlOptions]);

  return (
    <div
      ref={containerRef}
      className={`rvp-video-player ${theme === 'light' ? 'rvp-light' : ''} ${isTheaterMode ? 'rvp-theater-mode' : ''} ${isControlsVisible ? '' : 'rvp-hide-controls'} ${className}`}
      style={{ width, height, ...customStyle, ...style } as React.CSSProperties}
      tabIndex={0}
      role="application"
      aria-label={videoTitle || 'Video Player'}
      data-custom-captions={customCaptions.length > 0 ? 'true' : 'false'}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={videoPoster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        preload="metadata"
        className="rvp-video"
        aria-label={videoTitle}
        onClick={togglePlay}
        data-changing-quality={isLoading ? "true" : "false"}
      >
        {subtitleTracks.map((track, index) => (
          <track
            key={index}
            kind="subtitles"
            src={track.src}
            srcLang={track.language}
            label={track.label}
            default={track.default || index === 0}
          />
        ))}
        Your browser does not support the video tag.
      </video>

      {isLoading && <LoadingSpinner />}

      {feedback.playPause && (
        <div className="rvp-feedback-overlay rvp-play-pause-feedback">
          <div className="rvp-feedback-icon">
            {isPlaying ? (
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      )}

      {feedback.seek && (
        <div className="rvp-feedback-overlay rvp-seek-feedback">
          <div className="rvp-feedback-text">{feedback.seekText}</div>
        </div>
      )}

      {feedback.volume && (
        <div className="rvp-feedback-overlay rvp-volume-feedback">
          <div className="rvp-feedback-text">{feedback.volumeText}</div>
        </div>
      )}

      {currentCaption && isCaptionVisible && (
        <Caption
          text={currentCaption.text}
          isVisible={isCaptionVisible}
          style={currentCaption.style}
          draggable={true}
        />
      )}

      {controls && (
        <div className={`rvp-video-overlay ${isControlsVisible ? 'rvp-show' : ''}`}>
          {currentChapter && (
            <div className="rvp-chapter-title">
              <span>{currentChapter.title}</span>
            </div>
          )}

          {videoTitle && (
            <div className="rvp-video-title">
              <h3>{videoTitle}</h3>
              {description && <p className="rvp-video-description">{description}</p>}
            </div>
          )}

          {isPlaylist && playlist && (
            <div className="rvp-playlist-info">
              <span>Video {currentPlaylistIndex + 1} of {playlist.length}</span>
            </div>
          )}

          <Controls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            playbackRate={playbackRate}
            isFullscreen={isFullscreen}
            isPictureInPicture={isPictureInPicture}
            isTheaterMode={isTheaterMode}
            captionsEnabled={captionsEnabled}
            buffered={buffered}
            hasCaptions={!!captions || customCaptions.length > 0}
            onPlay={togglePlay}
            onSeek={seek}
            onVolumeChange={(vol) => {
              setVolume(vol);
              setIsVolumeSliderOpen(true);
            }}
            onMute={toggleMute}
            onPlaybackRateChange={setPlaybackRate}
            onFullscreen={toggleFullscreen}
            onToggleCaptions={toggleCaptions}
            onTogglePictureInPicture={togglePictureInPicture}
            onToggleTheaterMode={toggleTheaterMode}
            onQualityChange={setQuality}
            onChapterClick={seekToChapter}
            onShare={onShare}
            formatTime={formatTime}
            src={videoSrc}
            url={getShareUrl()}
            title={videoTitle}
            isVolumeSliderOpen={isVolumeSliderOpen}
            setIsVolumeSliderOpen={setIsVolumeSliderOpen}
            onVolumeHover={(hovering) => {
              isHoveringRef.current = hovering;
            }}
            chapters={chapters}
            qualities={qualities}
            currentQuality={currentQuality}
            enablePictureInPicture={enablePictureInPicture}
            enableTheaterMode={enableTheaterMode}
            enableSocialShare={enableSocialShare}
            controlOptions={controlOptions}
          />
        </div>
      )}

      {showKeyboardHelp && enableKeyboardShortcuts && (
        <KeyboardShortcutsHelp
          isVisible={showKeyboardHelp}
          onClose={() => setShowKeyboardHelp(false)}
        />
      )}
    </div>
  );
});
