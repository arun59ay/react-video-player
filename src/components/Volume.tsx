import React, { useState, useRef } from 'react';

interface VolumeProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMute: () => void;
  isVolumeSliderOpen: boolean;
  setIsVolumeSliderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onVolumeHover?: (hovering: boolean) => void; // ← make use of this
}

const VolumeXIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const Volume1Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const Volume2Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

export const Volume: React.FC<VolumeProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onMute,
  isVolumeSliderOpen,
  setIsVolumeSliderOpen,
  onVolumeHover
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeXIcon/>;
    if (volume < 0.5) return <Volume1Icon/>;
    return <Volume2Icon/>;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleVolumeChange(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && e.buttons === 1) { // only drag when mouse is pressed
      handleVolumeChange(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleVolumeChange = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((rect.bottom - e.clientY) / rect.height) * 100));
    const newVolume = percentage / 100;
    onVolumeChange(newVolume);
  };

  return (
    <div
      className="rvp-volume-control"
      onMouseEnter={() => {
        setIsVolumeSliderOpen(true);
        onVolumeHover?.(true);
      }}
      onMouseLeave={() => {
        if (!isDragging) setIsVolumeSliderOpen(false);
        onVolumeHover?.(false);
      }}
    >
      <button
        className="rvp-control-btn rvp-volume-btn"
        onClick={onMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {getVolumeIcon()}
      </button>

      <div className={`rvp-volume-slider ${isVolumeSliderOpen ? 'rvp-show' : ''}`}>
        <div
          className="rvp-volume-slider-track"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          role="slider"
          aria-label="Volume"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
          tabIndex={0}
        >
          <div className="rvp-volume-slider-background">
            <div
              className="rvp-volume-slider-fill"
              style={{ height: `${isMuted ? 0 : volume * 100}%` }}
            />
            <div
              className="rvp-volume-slider-thumb"
              style={{ bottom: `${isMuted ? 0 : volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
