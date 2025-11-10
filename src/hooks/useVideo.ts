import { useState, useEffect, useCallback, useRef } from 'react';
import { VideoState, VideoControls, Chapter, VideoQuality, SubtitleTrack } from '../types/video';

interface UseVideoOptions {
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onVolumeChange?: (volume: number) => void;
  onSeek?: (time: number) => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
  onSeekFeedback?: (timeDiff: number) => void;
  onVolumeFeedback?: (volume: number, isMuted: boolean) => void;
  onPlayPauseFeedback?: () => void;
  onChapterChange?: (chapter: Chapter) => void;
  onQualityChange?: (quality: string) => void;
  onSubtitleChange?: (language: string) => void;
  chapters?: Chapter[];
  qualities?: VideoQuality[];
  subtitleTracks?: SubtitleTrack[];
  enablePictureInPicture?: boolean;
  enableTheaterMode?: boolean;
  theaterMode?: boolean;
  enableKeyboardShortcuts?: boolean;
  showKeyboardShortcutsHelp?: boolean;
  onKeyboardShortcutsHelpToggle?: (show: boolean) => void;
}

export const useVideo = (
  videoRef: React.RefObject<HTMLVideoElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  options?: UseVideoOptions
): VideoState & VideoControls => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(options?.theaterMode || false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [currentQuality, setCurrentQuality] = useState<string | undefined>();
  const [currentSubtitleLanguage, setCurrentSubtitleLanguage] = useState<string | undefined>();
  const [currentChapter, setCurrentChapter] = useState<Chapter | undefined>();
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  const lastVolumeRef = useRef(1);
  const lastCurrentTimeRef = useRef(0);
  const chaptersRef = useRef<Chapter[]>(options?.chapters || []);
  const qualitiesRef = useRef<VideoQuality[]>(options?.qualities || []);
  const subtitleTracksRef = useRef<SubtitleTrack[]>(options?.subtitleTracks || []);

  // Update refs when props change
  useEffect(() => {
    chaptersRef.current = options?.chapters || [];
    qualitiesRef.current = options?.qualities || [];
    subtitleTracksRef.current = options?.subtitleTracks || [];
  }, [options?.chapters, options?.qualities, options?.subtitleTracks]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
        options?.onError?.(error.message);
      });
    }
    
    options?.onPlayPauseFeedback?.();
  }, [isPlaying, videoRef, options]);

  const seek = useCallback((time: number) => {
    if (!videoRef.current) return;
    const clampedTime = Math.max(0, Math.min(duration, time));
    const timeDiff = clampedTime - lastCurrentTimeRef.current;
    
    videoRef.current.currentTime = clampedTime;
    setCurrentTime(clampedTime);
    lastCurrentTimeRef.current = clampedTime;
    
    options?.onSeek?.(clampedTime);
    
    if (Math.abs(timeDiff) >= 5) {
      options?.onSeekFeedback?.(timeDiff);
    }
  }, [videoRef, duration, options]);

  const setVolumeValue = useCallback((newVolume: number) => {
    if (!videoRef.current) return;
    
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    videoRef.current.volume = clampedVolume;
    setVolume(clampedVolume);
    
    if (clampedVolume > 0) {
      lastVolumeRef.current = clampedVolume;
      if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
    
    options?.onVolumeChange?.(clampedVolume);
    options?.onVolumeFeedback?.(clampedVolume, isMuted && clampedVolume === 0);
  }, [videoRef, isMuted, options]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    videoRef.current.muted = newMutedState;
    
    if (newMutedState) {
      lastVolumeRef.current = volume;
    } else {
      const restoreVolume = lastVolumeRef.current || 0.5;
      videoRef.current.volume = restoreVolume;
      setVolume(restoreVolume);
    }
    
    options?.onVolumeFeedback?.(newMutedState ? 0 : volume, newMutedState);
  }, [isMuted, videoRef, volume, options]);

  const setPlaybackRateValue = useCallback((rate: number) => {
    if (!videoRef.current) return;
    const clampedRate = Math.max(0.25, Math.min(2, rate));
    videoRef.current.playbackRate = clampedRate;
    setPlaybackRate(clampedRate);
  }, [videoRef]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((error) => {
        console.error('Error entering fullscreen:', error);
        options?.onError?.(error.message);
      });
    } else {
      document.exitFullscreen().catch((error) => {
        console.error('Error exiting fullscreen:', error);
        options?.onError?.(error.message);
      });
    }
  }, [containerRef, options]);

  const togglePictureInPicture = useCallback(async () => {
    if (!videoRef.current || !options?.enablePictureInPicture) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Error toggling Picture-in-Picture:', error);
      options?.onError?.('Picture-in-Picture not supported');
    }
  }, [videoRef, options]);

  const toggleTheaterMode = useCallback(() => {
    if (!options?.enableTheaterMode) return;
    setIsTheaterMode(prev => !prev);
  }, [options]);

  const toggleCaptions = useCallback(() => {
    if (!videoRef.current) return;
    
    const textTracks = videoRef.current.textTracks;
    if (textTracks.length > 0) {
      const track = textTracks[0];
      track.mode = captionsEnabled ? 'hidden' : 'showing';
    }
    setCaptionsEnabled(!captionsEnabled);
  }, [captionsEnabled, videoRef]);

  const setQuality = useCallback((quality: string) => {
    if (!videoRef.current) return;
    
    const qualityOption = qualitiesRef.current.find(q => q.value === quality);
    if (!qualityOption) return;
    
    const video = videoRef.current;
    const wasPlaying = isPlaying;
    
    // Save current state
    const savedTime = video.currentTime || 0;
    const savedVolume = video.volume;
    const savedMuted = video.muted;
    const savedPlaybackRate = video.playbackRate;
    
    // Check if source is actually different
    const newSrc = qualityOption.src;
    const currentSrc = video.src || video.currentSrc || '';
    
    // Normalize URLs for comparison (remove trailing slashes, query params, etc.)
    const normalizeUrl = (url: string) => {
      try {
        const urlObj = new URL(url);
        return urlObj.origin + urlObj.pathname;
      } catch {
        return url.split('?')[0].split('#')[0].replace(/\/$/, '');
      }
    };
    
    const normalizedCurrentSrc = normalizeUrl(currentSrc);
    const normalizedNewSrc = normalizeUrl(newSrc);
    
    // If source is the same (or very similar), just update quality label without changing video
    if (normalizedCurrentSrc === normalizedNewSrc || 
        (video.currentSrc && normalizeUrl(video.currentSrc) === normalizedNewSrc) ||
        currentSrc === newSrc) {
      console.log('Quality source is the same, no video change needed');
      setCurrentQuality(quality);
      options?.onQualityChange?.(quality);
      return;
    }
    
    console.log('Changing quality from', currentQuality, 'to', quality);
    
    // Mark that we're changing quality to prevent conflicts
    (video as any).__isChangingQuality = true;
    
    // Set loading state immediately to show spinner and hide video
    setIsLoading(true);
    
    // Pause video immediately to prevent showing unwanted content
    video.pause();
    
    // Clear any existing quality change handlers
    const existingHandler = (video as any).__qualityChangeHandler;
    const existingSeekedHandler = (video as any).__qualitySeekedHandler;
    const existingLoadedDataHandler = (video as any).__qualityLoadedDataHandler;
    
    if (existingHandler) {
      video.removeEventListener('canplaythrough', existingHandler);
    }
    if (existingSeekedHandler) {
      video.removeEventListener('seeked', existingSeekedHandler);
    }
    if (existingLoadedDataHandler) {
      video.removeEventListener('loadeddata', existingLoadedDataHandler);
    }
    
    // Change source
    video.src = newSrc;
    
    // Reload the video
    video.load();
    
    // Track if we've already handled the ready state
    let isHandled = false;
    
    // Restore state after video is ready
    const handleReady = () => {
      if (isHandled) return;
      isHandled = true;
      
      console.log('Video ready, restoring time:', savedTime);
      
      // Update duration immediately when new video loads
      if (video.duration && video.duration > 0) {
        setDuration(video.duration);
      }
      
      // Restore volume and muted state first
      video.volume = savedVolume;
      video.muted = savedMuted;
      video.playbackRate = savedPlaybackRate;
      
      // Clamp saved time to new video duration
      const newDuration = video.duration || 0;
      const clampedTime = newDuration > 0 ? Math.min(savedTime, newDuration) : 0;
      
      // Set current time
      video.currentTime = clampedTime;
      setCurrentTime(clampedTime);
      
      // Wait for seeked event to ensure time is properly set
      const handleSeeked = () => {
        // Ensure duration is updated
        if (video.duration && video.duration > 0) {
          setDuration(video.duration);
        }
        
        // Hide loading state
        setIsLoading(false);
        delete (video as any).__isChangingQuality;
        
        // Resume playback if it was playing
        if (wasPlaying) {
          // Small delay to ensure video is ready
          setTimeout(() => {
            video.play().catch((error) => {
              console.error('Error resuming playback after quality change:', error);
              setIsLoading(false);
              delete (video as any).__isChangingQuality;
              options?.onError?.(error.message);
            });
          }, 100);
        } else {
          // Even if not playing, ensure loading state is cleared
          setIsLoading(false);
          delete (video as any).__isChangingQuality;
        }
        
        video.removeEventListener('seeked', handleSeeked);
        delete (video as any).__qualitySeekedHandler;
      };
      
      // Store handler reference
      (video as any).__qualitySeekedHandler = handleSeeked;
      video.addEventListener('seeked', handleSeeked);
      
      // If already at the correct time (or very close), trigger seeked immediately
      if (Math.abs(video.currentTime - savedTime) < 0.1) {
        // Use setTimeout to ensure event handlers are set up
        setTimeout(() => {
          handleSeeked();
        }, 50);
      }
      
      // Clean up
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('loadeddata', handleLoadedData);
      delete (video as any).__qualityChangeHandler;
      delete (video as any).__qualityLoadedDataHandler;
    };
    
    const handleCanPlayThrough = () => {
      if (video.readyState >= 4) { // HAVE_ENOUGH_DATA
        handleReady();
      }
    };
    
    const handleLoadedData = () => {
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
        handleReady();
      }
    };
    
    // Store handler references
    (video as any).__qualityChangeHandler = handleCanPlayThrough;
    (video as any).__qualityLoadedDataHandler = handleLoadedData;
    
    // Listen to both events for faster loading
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('loadeddata', handleLoadedData);
    
    // Also listen to loadedmetadata as a fallback
    const handleLoadedMetadata = () => {
      if (video.readyState >= 1 && !isHandled) { // HAVE_METADATA
        // Update duration when metadata is loaded
        if (video.duration && video.duration > 0) {
          setDuration(video.duration);
        }
        // Clamp saved time to new video duration
        const newDuration = video.duration || 0;
        const clampedTime = newDuration > 0 ? Math.min(savedTime, newDuration) : 0;
        // Set time immediately if metadata is loaded
        video.currentTime = clampedTime;
        setCurrentTime(clampedTime);
      }
    };
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // Set quality state immediately
    setCurrentQuality(quality);
    options?.onQualityChange?.(quality);
    
    // Cleanup metadata listener after a delay
    setTimeout(() => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }, 5000);
  }, [videoRef, isPlaying, currentQuality, options]);

  const setSubtitleLanguage = useCallback((language: string) => {
    if (!videoRef.current) return;
    
    const tracks = videoRef.current.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      if (track.language === language) {
        track.mode = 'showing';
        setCurrentSubtitleLanguage(language);
        options?.onSubtitleChange?.(language);
      } else {
        track.mode = 'hidden';
      }
    }
  }, [videoRef, options]);

  const seekToChapter = useCallback((chapterIndex: number) => {
    const chapters = chaptersRef.current;
    if (chapterIndex >= 0 && chapterIndex < chapters.length) {
      const chapter = chapters[chapterIndex];
      seek(chapter.startTime);
      setCurrentChapter(chapter);
      options?.onChapterChange?.(chapter);
    }
  }, [seek, options]);

  // Detect current chapter
  useEffect(() => {
    const chapters = chaptersRef.current;
    if (chapters.length === 0) return;

    const foundChapter = chapters.find(
      chapter => currentTime >= chapter.startTime && currentTime <= chapter.endTime
    );

    if (foundChapter && foundChapter !== currentChapter) {
      setCurrentChapter(foundChapter);
      options?.onChapterChange?.(foundChapter);
    } else if (!foundChapter && currentChapter) {
      setCurrentChapter(undefined);
    }
  }, [currentTime, currentChapter, options]);

  const formatTime = useCallback((time: number): string => {
    if (isNaN(time)) return '0:00';
    
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Enhanced keyboard shortcuts
  useEffect(() => {
    if (!options?.enableKeyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current || !containerRef.current) return;
      
      const isPlayerFocused = containerRef.current.contains(document.activeElement) ||
                             document.activeElement === containerRef.current ||
                             document.activeElement === videoRef.current;
      
      if (!isPlayerFocused) return;
      
      // Show/hide keyboard shortcuts help
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowKeyboardHelp(prev => {
          const newValue = !prev;
          options?.onKeyboardShortcutsHelpToggle?.(newValue);
          return newValue;
        });
        return;
      }

      // Number keys (0-9) for seeking to percentage
      if (e.key >= '0' && e.key <= '9' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const percentage = parseInt(e.key) / 10;
        const seekTime = duration * percentage;
        seek(seekTime);
        return;
      }

      const handledKeys = [
        'Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'KeyM', 'KeyF', 'KeyK', 'KeyJ', 'KeyL', 'KeyI', 'KeyC', 'KeyT',
        'Comma', 'Period', 'Home', 'End', 'Digit0', 'Digit1', 'Digit2',
        'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9'
      ];
      
      if (handledKeys.includes(e.code)) {
        e.preventDefault();
      }
      
      const currentVideoTime = videoRef.current.currentTime;
      
      switch (e.code) {
        case 'Space':
        case 'KeyK':
          togglePlay();
          break;
        case 'ArrowLeft':
        case 'KeyJ':
          seek(Math.max(0, currentVideoTime - 10));
          break;
        case 'ArrowRight':
        case 'KeyL':
          seek(Math.min(duration, currentVideoTime + 10));
          break;
        case 'ArrowUp':
          setVolumeValue(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          setVolumeValue(Math.max(0, volume - 0.1));
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        case 'KeyI':
          if (options?.enablePictureInPicture) {
            togglePictureInPicture();
          }
          break;
        case 'KeyC':
          toggleCaptions();
          break;
        case 'KeyT':
          if (options?.enableTheaterMode) {
            toggleTheaterMode();
          }
          break;
        case 'Comma':
          if (e.shiftKey) {
            setPlaybackRateValue(Math.max(0.25, playbackRate - 0.25));
          }
          break;
        case 'Period':
          if (e.shiftKey) {
            setPlaybackRateValue(Math.min(2, playbackRate + 0.25));
          }
          break;
        case 'Home':
          seek(0);
          break;
        case 'End':
          seek(duration);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    options?.enableKeyboardShortcuts,
    options?.enablePictureInPicture,
    options?.enableTheaterMode,
    togglePlay,
    seek,
    duration,
    setVolumeValue,
    volume,
    toggleMute,
    toggleFullscreen,
    togglePictureInPicture,
    toggleTheaterMode,
    toggleCaptions,
    setPlaybackRateValue,
    playbackRate,
    videoRef,
    containerRef,
    options
  ]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      options?.onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      options?.onPause?.();
    };

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      setCurrentTime(currentTime);
      lastCurrentTimeRef.current = currentTime;
      options?.onTimeUpdate?.(currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration || 0);
    };

    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setBuffered((bufferedEnd / duration) * 100);
        }
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      options?.onEnded?.();
    };

    const handleError = () => {
      setIsLoading(false);
      options?.onError?.('Video failed to load');
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [videoRef, options]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Picture-in-Picture change listener
  useEffect(() => {
    if (!options?.enablePictureInPicture) return;

    const handlePictureInPictureChange = () => {
      setIsPictureInPicture(!!document.pictureInPictureElement);
    };

    document.addEventListener('enterpictureinpicture', handlePictureInPictureChange);
    document.addEventListener('leavepictureinpicture', handlePictureInPictureChange);
    
    return () => {
      document.removeEventListener('enterpictureinpicture', handlePictureInPictureChange);
      document.removeEventListener('leavepictureinpicture', handlePictureInPictureChange);
    };
  }, [options?.enablePictureInPicture]);

  return {
    // State
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
    currentSubtitleLanguage,
    currentChapter,
    // Controls
    togglePlay,
    seek,
    setVolume: setVolumeValue,
    toggleMute,
    setPlaybackRate: setPlaybackRateValue,
    toggleFullscreen,
    togglePictureInPicture,
    toggleTheaterMode,
    toggleCaptions,
    setQuality,
    setSubtitleLanguage,
    seekToChapter,
    formatTime
  };
};
