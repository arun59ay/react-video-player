// ✅ Controls.tsx
import React from 'react';
import { SeekBar } from './SeekBar';
import { Volume } from './Volume';
import { PlaybackSpeed } from './PlaybackSpeed';

interface ControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  captionsEnabled: boolean;
  buffered: number;
  hasCaptions: boolean;
  onPlay: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onMute: () => void;
  onPlaybackRateChange: (rate: number) => void;
  onFullscreen: () => void;
  onToggleCaptions: () => void;
  formatTime: (time: number) => string;
  src: string;
  isVolumeSliderOpen: boolean;
  setIsVolumeSliderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onVolumeHover: (hovering: boolean) => void;
}


const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const MaximizeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

const MinimizeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="10" y1="14" x2="3" y2="21" />
  </svg>
);

const CaptionsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <line x1="4" y1="12" x2="10" y2="12" />
    <line x1="14" y1="12" x2="20" y2="12" />
  </svg>
);


export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  playbackRate,
  isFullscreen,
  captionsEnabled,
  buffered,
  hasCaptions,
  onPlay,
  onSeek,
  onVolumeChange,
  onMute,
  onPlaybackRateChange,
  onFullscreen,
  onToggleCaptions,
  formatTime,
  src,
  isVolumeSliderOpen,
  setIsVolumeSliderOpen,
  onVolumeHover 
}) => {
  return (
    <div className="rvp-video-controls">
      <SeekBar
        currentTime={currentTime}
        duration={duration}
        buffered={buffered}
        onSeek={onSeek}
        formatTime={formatTime}
        src={src}
      />

      <video
        id="rvp-thumbnail-video"
        src={src}
        preload="auto"
        muted
        style={{ display: 'none' }}
      />

      <canvas
        id="rvp-thumbnail-canvas"
        width={160}
        height={90}
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '0',
          display: 'none',
          border: '1px solid #ccc',
          zIndex: 1000,
        }}
      />

      <div className="rvp-controls-bar">
        <div className="rvp-controls-left">
          <button
            className="rvp-control-btn rvp-play-btn"
            onClick={onPlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon/> : <PlayIcon/>}
          </button>

          <Volume
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onMute={onMute}
            isVolumeSliderOpen={isVolumeSliderOpen}
            setIsVolumeSliderOpen={setIsVolumeSliderOpen}
            onVolumeHover={onVolumeHover} // ✅ ADD THIS LINE
          />

          <div className="rvp-time-display">
            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="rvp-controls-right">
          {hasCaptions && (
            <button
              className={`rvp-control-btn ${captionsEnabled ? 'rvp-active' : ''}`}
              onClick={onToggleCaptions}
              title="Toggle Captions"
              aria-label="Toggle Captions"
            >
              <CaptionsIcon/>
            </button>
          )}

          <PlaybackSpeed
            playbackRate={playbackRate}
            onPlaybackRateChange={onPlaybackRateChange}
          />

          <button
            className="rvp-control-btn"
            onClick={onFullscreen}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <MinimizeIcon/> : <MaximizeIcon/>}
          </button>
        </div>
      </div>
    </div>
  );
};
