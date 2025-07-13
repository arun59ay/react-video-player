import React, { useRef } from 'react';
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
  const { handlePreview, hidePreview } = useVideoThumbnailPreview({ src });

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!seekBarRef.current) return;
    const rect = seekBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * duration);
  };

  const playedPercent = (currentTime / duration) * 100;
  const bufferedPercent = (buffered / duration) * 100;

  return (
    <div
      ref={seekBarRef}
      className="rvp-seekbar-container"
      onClick={handleSeek}
      onMouseMove={(e) => handlePreview(e, duration)}
      onMouseLeave={hidePreview}
    >
      <div className="rvp-seekbar-track" />
      <div className="rvp-seekbar-buffered" style={{ width: `${bufferedPercent}%` }} />
      <div className="rvp-seekbar-played" style={{ width: `${playedPercent}%` }} />
      <div className="rvp-seekbar-thumb" style={{ left: `${playedPercent}%` }} />
    </div>
  );
};
