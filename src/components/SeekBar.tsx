import React, { useState, useRef } from 'react';

interface SeekBarProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (time: number) => void;
  formatTime: (time: number) => string;
}

export const SeekBar: React.FC<SeekBarProps> = ({
  currentTime,
  duration,
  buffered,
  onSeek,
  formatTime
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const seekBarRef = useRef<HTMLDivElement>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!seekBarRef.current) return;

    const rect = seekBarRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const time = (percentage / 100) * duration;
    
    setHoverTime(time);
    setShowPreview(true);

    if (isDragging) {
      onSeek(time);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      handleSeek(e);
      setIsDragging(false);
    }
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
    setIsDragging(false);
  };

  const handleSeek = (e: React.MouseEvent) => {
    if (!seekBarRef.current) return;

    const rect = seekBarRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const time = (percentage / 100) * duration;
    onSeek(time);
  };

  return (
    <div 
      className="rvp-seek-bar-container"
      ref={seekBarRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={duration}
      aria-valuenow={currentTime}
      tabIndex={0}
    >
      <div className="rvp-seek-bar">
        <div className="rvp-seek-bar-background">
          <div 
            className="rvp-seek-bar-buffered" 
            style={{ width: `${buffered}%` }}
          />
          <div 
            className="rvp-seek-bar-progress" 
            style={{ width: `${progress}%` }}
          />
          <div 
            className="rvp-seek-bar-thumb" 
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>
      
      {showPreview && (
        <div 
          className="rvp-seek-preview"
          style={{ 
            left: `${(hoverTime / duration) * 100}%`,
            transform: 'translateX(-50%)'
          }}
        >
          {formatTime(hoverTime)}
        </div>
      )}
    </div>
  );
};