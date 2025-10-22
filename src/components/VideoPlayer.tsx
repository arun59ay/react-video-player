import React, { useRef, useEffect, useState } from 'react';
import { Controls } from './Controls';
import { LoadingSpinner } from './LoadingSpinner';
import { Caption } from './Caption';
import { useVideo } from '../hooks/useVideo';
import { useCustomCaptions } from '../hooks/useCustomCaptions';
import { VideoPlayerProps } from '../types/video';
import '../styles/player.css';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  captions,
  customCaptions = [],
  title,
  theme = 'dark',
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  width = '100%',
  height = 'auto',
  className = '',
  style = {},
  onPlay,
  onPause,
  onTimeUpdate,
  onVolumeChange,
  onSeek,
  onEnded,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

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
    onEnded,
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
    captionsEnabled,
    isLoading,
    buffered,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    setPlaybackRate,
    toggleFullscreen,
    toggleCaptions,
    formatTime
  } = videoState;

  // Custom captions hook
  const { currentCaption, isVisible: isCaptionVisible } = useCustomCaptions(
    customCaptions,
    currentTime,
    captionsEnabled
  );


  // ✅ Show/hide controls based on activity (mouse and touch)
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

    // Handle touch gestures
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
        
        // Detect horizontal swipe for seeking
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
      
      // Only handle tap gestures if it wasn't a swipe
      if (!isSwipeGesture) {
        // Check for double tap (within 300ms and similar position)
        if (currentTime - lastTouchTime < 300 && touchDuration < 200) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const distance = Math.sqrt(
            Math.pow(touchEndX - touchStartX, 2) + Math.pow(touchEndY - touchStartY, 2)
          );
          
          if (distance < 50) { // Double tap within 50px
            togglePlay();
          }
        }
      }
      
      lastTouchTime = currentTime;
      isSwipeGesture = false;
      showControls();
    };

    // Mouse events
    node.addEventListener('mouseenter', showControls);
    node.addEventListener('mousemove', showControls);
    node.addEventListener('mouseleave', hideControls);
    
    // Touch events
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

  // Keep controls visible when video is paused
  useEffect(() => {
    if (!isPlaying) setIsControlsVisible(true);
  }, [isPlaying]);


  return (
    <div
      ref={containerRef}
      className={`rvp-video-player ${theme === 'light' ? 'rvp-light' : ''} ${isControlsVisible ? '' : 'rvp-hide-controls'} ${className}`}
      style={{ width, height, ...style }}
      tabIndex={0}
      role="application"
      aria-label={title || 'Video Player'}
      data-custom-captions={customCaptions.length > 0 ? 'true' : 'false'}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        preload="metadata"
        className="rvp-video"
        aria-label={title}
        onClick={togglePlay}
      >
        {captions && (
          <track
            kind="subtitles"
            src={captions}
            srcLang="en"
            label="English"
            default={captionsEnabled}
          />
        )}
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

      {/* Custom Captions */}
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
          {title && (
            <div className="rvp-video-title">
              <h3>{title}</h3>
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
            formatTime={formatTime}
            src={src}
            isVolumeSliderOpen={isVolumeSliderOpen}
            setIsVolumeSliderOpen={setIsVolumeSliderOpen}
            onVolumeHover={(hovering) => {
              isHoveringRef.current = hovering;
            }}
          />
        </div>
      )}
    </div>
  );
};
