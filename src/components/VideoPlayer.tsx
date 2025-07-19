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

  // ✅ Show/hide controls based on activity
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let timeout: NodeJS.Timeout;

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

    node.addEventListener('mouseenter', showControls);
    node.addEventListener('mousemove', showControls);
    node.addEventListener('mouseleave', hideControls);

    return () => {
      node.removeEventListener('mouseenter', showControls);
      node.removeEventListener('mousemove', showControls);
      node.removeEventListener('mouseleave', hideControls);
      clearTimeout(timeout);
    };
  }, [isPlaying, isVolumeSliderOpen]);

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
            hasCaptions={!!captions}
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
