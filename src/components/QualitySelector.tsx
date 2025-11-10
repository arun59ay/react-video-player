import { useState, memo, useCallback } from 'react';
import { VideoQuality } from '../types/video';

interface QualitySelectorProps {
  qualities: VideoQuality[];
  currentQuality?: string;
  onQualityChange: (quality: string) => void;
}

const SettingsIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
));

export const QualitySelector = memo<QualitySelectorProps>(({ qualities, currentQuality, onQualityChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleQualityChange = useCallback((quality: string) => {
    onQualityChange(quality);
    setShowMenu(false);
  }, [onQualityChange]);

  if (qualities.length === 0) return null;

  return (
    <div 
      className="rvp-quality-selector"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button 
        className="rvp-control-btn rvp-quality-btn"
        aria-label={`Quality: ${currentQuality || 'Auto'}`}
        title={`Quality: ${currentQuality || 'Auto'}`}
      >
        <SettingsIcon/>
        <span className="rvp-quality-label">{currentQuality || 'Auto'}</span>
        <span className="rvp-tooltip">Quality: {currentQuality || 'Auto'}</span>
      </button>
      
      <div className={`rvp-quality-menu ${showMenu ? 'rvp-show' : ''}`}>
        <div className="rvp-quality-menu-title">Quality</div>
        {qualities.map((quality) => (
          <button
            key={quality.value}
            className={`rvp-quality-option ${quality.value === currentQuality ? 'rvp-active' : ''}`}
            onClick={() => handleQualityChange(quality.value)}
            aria-label={`Set quality to ${quality.label}`}
          >
            {quality.label}
          </button>
        ))}
      </div>
    </div>
  );
});

