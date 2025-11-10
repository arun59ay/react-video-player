import { useRef, useState, useEffect, memo, useCallback } from 'react';
import { useVideoThumbnailPreview } from '../hooks/useVideoPreviewExtractor';

interface SeekBarProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (time: number) => void;
  formatTime: (time: number) => string;
  src: string;
}

export const SeekBar = memo<SeekBarProps>(({ currentTime, duration, buffered, onSeek, src, formatTime }) => {
  const seekBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const { handlePreview, hidePreview } = useVideoThumbnailPreview({ src });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);

  const getSeekPosition = useCallback((clientX: number) => {
    if (!seekBarRef.current) return 0;
    const rect = seekBarRef.current.getBoundingClientRect();
    const percent = (clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(duration, percent * duration));
  }, [duration]);

  const handleSeek = useCallback((clientX: number) => {
    const seekTime = getSeekPosition(clientX);
    onSeek(seekTime);
  }, [getSeekPosition, onSeek]);

  // Live seek during drag
  const handleDragSeek = useCallback((clientX: number) => {
    const seekTime = getSeekPosition(clientX);
    setDragTime(seekTime);
    onSeek(seekTime); // Live seek like YouTube
  }, [getSeekPosition, onSeek]);

  // Mouse drag handlers
  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragTime(currentTime);
  }, [currentTime]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
  }, [isDragging, handleDragSeek, handlePreview, duration]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      hidePreview();
    }
  }, [isDragging, hidePreview]);

  // Touch drag handlers
  const handleThumbTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragTime(currentTime);
  }, [currentTime]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      handleDragSeek(e.touches[0].clientX);
    }
  }, [isDragging, handleDragSeek]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      hidePreview();
    }
  }, [isDragging, hidePreview]);

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
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd, hidePreview]);

  const handleMouseSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      handleSeek(e.clientX);
    }
  }, [isDragging, handleSeek]);

  const handleTouchSeek = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging && e.touches.length > 0) {
      handleSeek(e.touches[0].clientX);
    }
  }, [isDragging, handleSeek]);

  const handleSeekBarMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      handlePreview(e, duration);
    }
  }, [isDragging, handlePreview, duration]);

  const handleSeekBarTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging && e.touches.length > 0) {
      // Create a synthetic mouse event for preview
      const syntheticEvent = {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      } as React.MouseEvent<HTMLDivElement>;
      handlePreview(syntheticEvent, duration);
    }
  }, [isDragging, handlePreview, duration]);

  // Use drag time when dragging, otherwise use current time
  const displayTime = isDragging ? dragTime : currentTime;
  // Ensure duration is valid and greater than 0 to avoid division by zero or invalid percentages
  const validDuration = duration > 0 ? duration : 1;
  const playedPercent = Math.min(100, Math.max(0, (displayTime / validDuration) * 100));
  const bufferedPercent = Math.min(100, Math.max(0, (buffered / validDuration) * 100));

  return (
    <div
      ref={seekBarRef}
      className={`rvp-seekbar-container ${isDragging ? 'rvp-dragging' : ''}`}
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
});
