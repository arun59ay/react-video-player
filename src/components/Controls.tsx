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
  <svg fill="none" height="36" viewBox="0 0 36 36" width="36"><path d="M 17 8.6 L 10.89 4.99 C 9.39 4.11 7.5 5.19 7.5 6.93 C 7.5 6.93 7.5 6.93 7.5 6.93 L 7.5 29.06 C 7.5 30.8 9.39 31.88 10.89 31 C 10.89 31 10.89 31 10.89 31 L 17 27.4 C 17 27.4 17 27.4 17 27.4 C 17 27.4 17 27.4 17 27.4 L 17 8.6 C 17 8.6 17 8.6 17 8.6 C 17 8.6 17 8.6 17 8.6 Z M 17 8.6 L 17 8.6 C 17 8.6 17 8.6 17 8.6 C 17 8.6 17 8.6 17 8.6 V 27.4 C 17 27.4 17 27.4 17 27.4 C 17 27.4 17 27.4 17 27.4 L 33 18 C 33 18 33 18 33 18 C 33 18 33 18 33 18 V 18 L 17 8.6 C 17 8.6 17 8.6 17 8.6 C 17 8.6 17 8.6 17 8.6 Z" fill="white"></path></svg>
);

const PauseIcon = () => (
  <svg fill="none" height="36" viewBox="0 0 36 36" width="36"><path d="M 12.75 4.5 L 9.75 4.5 C 9.15 4.5 8.58 4.73 8.15 5.15 C 7.73 5.58 7.5 6.15 7.5 6.75 L 7.5 29.25 C 7.5 29.84 7.73 30.41 8.15 30.84 C 8.58 31.26 9.15 31.5 9.75 31.5 L 12.75 31.5 C 13.34 31.5 13.91 31.26 14.34 30.84 C 14.76 30.41 15 29.84 15 29.25 L 15 6.75 C 15 6.15 14.76 5.58 14.34 5.15 C 13.91 4.73 13.34 4.5 12.75 4.5 Z M 26.25 4.5 L 23.25 4.5 C 22.65 4.5 22.08 4.73 21.65 5.15 C 21.23 5.58 21 6.15 21 6.75 V 29.25 C 21 29.84 21.23 30.41 21.65 30.84 C 22.08 31.26 22.65 31.5 23.25 31.5 L 26.25 31.5 C 26.84 31.5 27.41 31.26 27.84 30.84 C 28.26 30.41 28.5 29.84 28.5 29.25 V 6.75 L 28.5 6.75 C 28.5 6.15 28.26 5.58 27.84 5.15 C 27.41 4.73 26.84 4.5 26.25 4.5 Z" fill="white"></path></svg>
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

const CaptionsIcon = ({ isActive = false }: { isActive?: boolean }) => {
  if (isActive) {
    // Captions enabled - show disabled icon (to turn off)
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 3H3C2.46 3 1.96 3.21 1.58 3.58C1.21 3.96 1 4.46 1 5V19C1 19.53 1.21 20.03 1.58 20.41C1.96 20.78 2.46 21 3 21H21C21.53 21 22.03 20.78 22.41 20.41C22.78 20.03 23 19.53 23 19V5C23 4.46 22.78 3.96 22.41 3.58C22.03 3.21 21.53 3 21 3ZM9.03 8.08L9.29 8.16C9.79 8.35 10.24 8.65 10.60 9.05L10.77 9.26L10.83 9.34C10.96 9.55 11.01 9.80 10.96 10.05C10.92 10.29 10.79 10.51 10.59 10.66C10.40 10.81 10.15 10.89 9.91 10.87C9.66 10.85 9.43 10.74 9.26 10.57L9.19 10.49L9.11 10.39C8.98 10.24 8.81 10.12 8.62 10.05L8.54 10.02C8.32 9.97 8.10 10.00 7.91 10.11C7.67 10.24 7.48 10.43 7.35 10.67L7.28 10.79C7.09 11.16 6.99 11.58 7 12L7.00 12.16C7.02 12.52 7.11 12.88 7.28 13.20L7.35 13.32C7.48 13.56 7.67 13.75 7.91 13.88L7.99 13.92C8.16 14.00 8.35 14.02 8.54 13.97L8.62 13.94C8.85 13.85 9.05 13.70 9.19 13.50L9.26 13.43C9.44 13.24 9.68 13.13 9.93 13.12C10.19 13.11 10.44 13.20 10.63 13.37C10.82 13.53 10.94 13.77 10.97 14.02C11.00 14.27 10.93 14.53 10.77 14.73C10.39 15.23 9.88 15.61 9.29 15.83L9.03 15.91C8.43 16.06 7.79 16.01 7.21 15.77L6.97 15.65C6.42 15.35 5.95 14.90 5.64 14.36L5.50 14.12C5.21 13.55 5.04 12.92 5.00 12.27L5 12C4.99 11.26 5.17 10.53 5.50 9.87L5.64 9.63C5.96 9.09 6.42 8.64 6.97 8.34C7.60 8.00 8.34 7.91 9.03 8.08ZM17.03 8.08L17.29 8.16C17.79 8.35 18.24 8.65 18.60 9.05L18.77 9.26L18.83 9.34C18.96 9.55 19.01 9.80 18.96 10.05C18.92 10.29 18.79 10.51 18.59 10.66C18.40 10.81 18.15 10.89 17.91 10.87C17.66 10.85 17.43 10.74 17.26 10.57L17.19 10.49L17.11 10.39C16.98 10.24 16.81 10.12 16.62 10.05L16.54 10.02C16.32 9.97 16.10 10.00 15.91 10.11C15.67 10.24 15.48 10.43 15.35 10.67L15.28 10.79C15.09 11.16 14.99 11.58 15 12L15.00 12.16C15.02 12.52 15.11 12.88 15.28 13.20L15.35 13.32C15.48 13.56 15.67 13.75 15.91 13.88L15.99 13.92C16.16 14.00 16.35 14.02 16.54 13.97L16.62 13.94C16.85 13.85 17.05 13.70 17.19 13.50L17.26 13.43C17.44 13.24 17.68 13.13 17.93 13.12C18.19 13.11 18.44 13.20 18.63 13.37C18.82 13.53 18.94 13.77 18.97 14.02C19.00 14.27 18.93 14.53 18.77 14.73C18.39 15.23 17.88 15.61 17.29 15.83L17.03 15.91C16.43 16.06 15.79 16.01 15.21 15.77L14.97 15.65C14.42 15.35 13.95 14.90 13.64 14.36L13.50 14.12C13.21 13.55 13.04 12.92 13.00 12.27L13 12C12.99 11.26 13.17 10.53 13.50 9.87L13.64 9.63C13.96 9.09 14.42 8.64 14.97 8.34C15.60 8.00 16.34 7.91 17.03 8.08Z" />
      </svg>
    );
  }
  
  // Captions disabled - show enabled icon (to turn on)
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.20 3.01L21 3H3L2.79 3.01C2.30 3.06 1.84 3.29 1.51 3.65C1.18 4.02 .99 4.50 1 5V19L1.01 19.20C1.05 19.66 1.26 20.08 1.58 20.41C1.91 20.73 2.33 20.94 2.79 20.99L3 21H21L21.20 20.98C21.66 20.94 22.08 20.73 22.41 20.41C22.73 20.08 22.94 19.66 22.99 19.20L23 19V5C23.00 4.50 22.81 4.02 22.48 3.65C22.15 3.29 21.69 3.06 21.20 3.01ZM3 19V5H21V19H3ZM6.97 8.34C6.42 8.64 5.96 9.09 5.64 9.63L5.50 9.87C5.16 10.53 4.99 11.26 5 12L5.00 12.27C5.04 12.92 5.21 13.55 5.50 14.12L5.64 14.36C5.96 14.90 6.42 15.35 6.97 15.65L7.21 15.77C7.79 16.01 8.43 16.06 9.03 15.91L9.29 15.83C9.88 15.61 10.39 15.23 10.77 14.73C10.93 14.53 11.00 14.27 10.97 14.02C10.94 13.77 10.82 13.53 10.63 13.37C10.44 13.20 10.19 13.11 9.93 13.12C9.68 13.13 9.44 13.24 9.26 13.43L9.19 13.50C9.05 13.70 8.85 13.85 8.62 13.94L8.54 13.97C8.35 14.02 8.16 14.00 7.99 13.92L7.91 13.88C7.67 13.75 7.48 13.56 7.35 13.32L7.28 13.20C7.11 12.88 7.02 12.52 7.00 12.16L7 12C6.99 11.58 7.09 11.16 7.28 10.79L7.35 10.67C7.48 10.43 7.67 10.24 7.91 10.11C8.10 10.00 8.32 9.97 8.54 10.02L8.62 10.05C8.81 10.12 8.98 10.24 9.11 10.39L9.19 10.49L9.26 10.57C9.43 10.74 9.66 10.85 9.91 10.87C10.15 10.89 10.40 10.81 10.59 10.66C10.79 10.51 10.92 10.29 10.96 10.05C11.01 9.80 10.96 9.55 10.83 9.34L10.77 9.26L10.60 9.05C10.24 8.65 9.79 8.35 9.29 8.16L9.03 8.08C8.34 7.91 7.60 8.00 6.97 8.34ZM14.97 8.34C14.42 8.64 13.96 9.09 13.64 9.63L13.50 9.87C13.16 10.53 12.99 11.26 13 12L13.00 12.27C13.04 12.92 13.21 13.55 13.50 14.12L13.64 14.36C13.96 14.90 14.42 15.35 14.97 15.65L15.21 15.77C15.79 16.01 16.43 16.06 17.03 15.91L17.29 15.83C17.88 15.61 18.39 15.23 18.77 14.73C18.93 14.53 19.00 14.27 18.97 14.02C18.94 13.77 18.82 13.53 18.63 13.37C18.44 13.20 18.19 13.11 17.93 13.12C17.68 13.13 17.44 13.24 17.26 13.43L17.19 13.50C17.05 13.70 16.85 13.85 16.62 13.94L16.54 13.97C16.35 14.02 16.16 14.00 15.99 13.92L15.91 13.88C15.67 13.75 15.48 13.56 15.35 13.32L15.28 13.20C15.11 12.88 15.02 12.52 15.00 12.16L15 12C14.99 11.58 15.09 11.16 15.28 10.79L15.35 10.67C15.48 10.43 15.67 10.24 15.91 10.11C16.10 10.00 16.32 9.97 16.54 10.02L16.62 10.05C16.81 10.12 16.98 10.24 17.11 10.39L17.19 10.49L17.26 10.57C17.43 10.74 17.66 10.85 17.91 10.87C18.15 10.89 18.40 10.81 18.59 10.66C18.79 10.51 18.92 10.29 18.96 10.05C19.01 9.80 18.96 9.55 18.83 9.34L18.77 9.26L18.60 9.05C18.24 8.65 17.79 8.35 17.29 8.16L17.03 8.08C16.34 7.91 15.60 8.00 14.97 8.34Z" />
    </svg>
  );
};


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
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
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
              <CaptionsIcon isActive={captionsEnabled} />
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
            {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};
