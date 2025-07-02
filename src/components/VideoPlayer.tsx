import React, { useRef, useEffect, useState } from 'react';
import { Controls } from './Controls';
import { LoadingSpinner } from './LoadingSpinner';
import { useVideo } from '../hooks/useVideo';
import { VideoPlayerProps } from '../types/video';
import '../styles/player.css';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  captions,
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
  onError
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [showControls, setShowControls] = useState(true);
  const [showPlayPause, setShowPlayPause] = useState(false);
  const [showSeekFeedback, setShowSeekFeedback] = useState(false);
  const [seekFeedbackText, setSeekFeedbackText] = useState('');
  const [showVolumeFeedback, setShowVolumeFeedback] = useState(false);
  const [volumeFeedbackText, setVolumeFeedbackText] = useState('');

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
        setSeekFeedbackText(timeDiff > 0 ? `+${Math.round(timeDiff)}s` : `${Math.round(timeDiff)}s`);
        setShowSeekFeedback(true);
        setTimeout(() => setShowSeekFeedback(false), 1000);
      }
    },
    onVolumeFeedback: (volume: number, isMuted: boolean) => {
      setVolumeFeedbackText(isMuted ? 'Muted' : `${Math.round(volume * 100)}%`);
      setShowVolumeFeedback(true);
      setTimeout(() => setShowVolumeFeedback(false), 1000);
    },
    onPlayPauseFeedback: () => {
      setShowPlayPause(true);
      setTimeout(() => setShowPlayPause(false), 800);
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

  const clearControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleMouseMove = () => {
    if (!controls) return;
    showControlsTemporarily();
  };

  const handleMouseLeave = () => {
    if (!controls) return;
    if (isPlaying) {
      clearControlsTimeout();
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLElement;
    const isControl = clickedElement.closest(
      '.rvp-video-overlay, .rvp-control-btn, .rvp-seek-bar-container, .rvp-volume-slider, .rvp-speed-menu, .rvp-feedback-overlay'
    );
    if (!isControl) {
      togglePlay();
      showControlsTemporarily();
    }
    containerRef.current?.focus();
  };

  useEffect(() => {
    return () => {
      clearControlsTimeout();
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || !controls) setShowControls(true);
  }, [isPlaying, controls]);

  useEffect(() => {
    if (videoRef.current && muted) videoRef.current.muted = true;
  }, [muted]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.code === 'Space' &&
      document.activeElement === containerRef.current
    ) {
      e.preventDefault();
      togglePlay();
      showControlsTemporarily();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isPlaying]);


  return (
    <div
      ref={containerRef}
      className={`rvp-video-player rvp-${theme} ${className}`}
      style={{ width, height, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => containerRef.current?.focus()}
      tabIndex={0}
      role="application"
      aria-label={title || 'Video Player'}
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

      {showPlayPause && (
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

      {showSeekFeedback && (
        <div className="rvp-feedback-overlay rvp-seek-feedback">
          <div className="rvp-feedback-text">{seekFeedbackText}</div>
        </div>
      )}

      {showVolumeFeedback && (
        <div className="rvp-feedback-overlay rvp-volume-feedback">
          <div className="rvp-feedback-text">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
              {volumeFeedbackText === 'Muted' ? (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              )}
            </svg>
            {volumeFeedbackText}
          </div>
        </div>
      )}

      {controls && (
        <div className={`rvp-video-overlay ${showControls ? 'rvp-show' : ''}`}>
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
            hasCaptions={!!captions}
            onPlay={togglePlay}
            onSeek={seek}
            onVolumeChange={setVolume}
            onMute={toggleMute}
            onPlaybackRateChange={setPlaybackRate}
            onFullscreen={toggleFullscreen}
            onToggleCaptions={toggleCaptions}
            formatTime={formatTime}
          />
        </div>
      )}
    </div>
  );
};

export type { VideoPlayerProps };
