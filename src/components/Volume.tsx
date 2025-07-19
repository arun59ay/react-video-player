import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

interface VolumeProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMute: () => void;
  isVolumeSliderOpen: boolean;
  setIsVolumeSliderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onVolumeHover?: (hovering: boolean) => void; // ← make use of this
}

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
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
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
