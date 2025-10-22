import React, { useRef, useState, useEffect } from 'react';
import { useVideoThumbnailPreview } from '../hooks/useVideoPreviewExtractor';

interface SeekBarProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (time: number) => void;
  formatTime: (time: number) => string;
  src: string;
}

export const SeekBar: React.FC<SeekBarProps> = ({ currentTime, duration, buffered, onSeek, src }) => {
  const seekBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const { handlePreview, hidePreview } = useVideoThumbnailPreview({ src });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);

  const getSeekPosition = (clientX: number) => {
    if (!seekBarRef.current) return 0;
    const rect = seekBarRef.current.getBoundingClientRect();
    const percent = (clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(duration, percent * duration));
  };

  const handleSeek = (clientX: number) => {
    const seekTime = getSeekPosition(clientX);
    onSeek(seekTime);
  };

  // Live seek during drag
  const handleDragSeek = (clientX: number) => {
    const seekTime = getSeekPosition(clientX);
    setDragTime(seekTime);
    onSeek(seekTime); // Live seek like YouTube
  };

  // Mouse drag handlers
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragTime(currentTime);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleDragSeek(e.clientX);
    } else {
      // Regular preview on hover
      const syntheticEvent = {
        clientX: e.clientX,
        clientY: e.clientY,
      } as React.MouseEvent<HTMLDivElement>;
      handlePreview(syntheticEvent, duration);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      hidePreview();
    }
  };

  // Touch drag handlers
  const handleThumbTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragTime(currentTime);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      handleDragSeek(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      hidePreview();
    }
  };

  // Add/remove global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const handleMouseSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      handleSeek(e.clientX);
    }
  };

  const handleTouchSeek = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging && e.touches.length > 0) {
      handleSeek(e.touches[0].clientX);
    }
  };

  const handleSeekBarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      handlePreview(e, duration);
    }
  };

  const handleSeekBarTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging && e.touches.length > 0) {
      // Create a synthetic mouse event for preview
      const syntheticEvent = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      } as React.MouseEvent<HTMLDivElement>;
      handlePreview(syntheticEvent, duration);
    }
  };

  // Use drag time when dragging, otherwise use current time
  const displayTime = isDragging ? dragTime : currentTime;
  const playedPercent = (displayTime / duration) * 100;
  const bufferedPercent = (buffered / duration) * 100;

  return (
    <div
      ref={seekBarRef}
      className="rvp-seekbar-container"
      onClick={handleMouseSeek}
      onMouseMove={handleSeekBarMouseMove}
      onMouseLeave={hidePreview}
      onTouchStart={handleTouchSeek}
      onTouchMove={handleSeekBarTouchMove}
      onTouchEnd={hidePreview}
    >
      <div className="rvp-seekbar-track" />
      <div className="rvp-seekbar-buffered" style={{ width: `${bufferedPercent}%` }} />
      <div className="rvp-seekbar-played" style={{ width: `${playedPercent}%` }} />
      <div 
        ref={thumbRef}
        className="rvp-seekbar-thumb" 
        style={{ left: `${playedPercent}%` }}
        onMouseDown={handleThumbMouseDown}
        onTouchStart={handleThumbTouchStart}
      />
    </div>
  );
};
