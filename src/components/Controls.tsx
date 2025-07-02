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
  formatTime
}) => {
  return (
    <div className="rvp-video-controls">
      <SeekBar
        currentTime={currentTime}
        duration={duration}
        buffered={buffered}
        onSeek={onSeek}
        formatTime={formatTime}
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
          />
          
          <div className="rvp-time-display">
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
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