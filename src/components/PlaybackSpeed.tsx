import React, { useState } from 'react';

interface PlaybackSpeedProps {
  playbackRate: number;
  onPlaybackRateChange: (rate: number) => void;
}

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

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
        <SettingsIcon/>
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