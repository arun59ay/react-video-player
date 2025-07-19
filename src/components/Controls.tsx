// ✅ Controls.tsx
import React from 'react';
import { Play, Pause, Maximize, Minimize, Type } from 'lucide-react';
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
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
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
              <Type size={20} />
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
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
