import React, { useState } from 'react';
import { Settings } from 'lucide-react';

interface PlaybackSpeedProps {
  playbackRate: number;
  onPlaybackRateChange: (rate: number) => void;
}

const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export const PlaybackSpeed: React.FC<PlaybackSpeedProps> = ({
  playbackRate,
  onPlaybackRateChange
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div 
      className="rvp-playback-speed"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button 
        className="rvp-control-btn rvp-speed-btn"
        aria-label={`Playback speed: ${playbackRate}x`}
      >
        <Settings size={20} />
        <span className="rvp-speed-label">{playbackRate}x</span>
      </button>
      
      <div className={`rvp-speed-menu ${showMenu ? 'rvp-show' : ''}`}>
        <div className="rvp-speed-menu-title">Playback Speed</div>
        {PLAYBACK_RATES.map((rate) => (
          <button
            key={rate}
            className={`rvp-speed-option ${rate === playbackRate ? 'rvp-active' : ''}`}
            onClick={() => onPlaybackRateChange(rate)}
            aria-label={`Set speed to ${rate}x`}
          >
            {rate}x {rate === 1 && '(Normal)'}
          </button>
        ))}
      </div>
    </div>
  );
};