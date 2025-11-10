import { useState, useRef, useEffect, memo, useCallback } from 'react';

export interface CaptionStyle {
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
  position?: 'bottom' | 'top';
  margin?: string;
  opacity?: number;
  textShadow?: string;
  fontWeight?: string | number;
  lineHeight?: string;
  maxWidth?: string;
  wordWrap?: 'break-word' | 'normal';
  zIndex?: number;
  border?: string;
  boxShadow?: string;
}

export interface CaptionProps {
  text: string;
  isVisible: boolean;
  style?: CaptionStyle;
  className?: string;
  draggable?: boolean;
}

export const Caption = memo<CaptionProps>(({ 
  text, 
  isVisible, 
  style = {},
  className = '',
  draggable = true
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const captionRef = useRef<HTMLDivElement>(null);

  if (!isVisible || !text.trim()) {
    return null;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    e.preventDefault();
    setIsDragging(true);
    
    // Get the current position of the caption element
    const rect = captionRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    } else {
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !draggable) return;
    e.preventDefault();
    
    // Get the video player container to calculate relative position
    const videoPlayer = captionRef.current?.closest('.rvp-video-player');
    if (videoPlayer) {
      const playerRect = videoPlayer.getBoundingClientRect();
      const captionRect = captionRef.current?.getBoundingClientRect();
      
      if (captionRect) {
        const newX = e.clientX - playerRect.left - dragStart.x;
        const newY = e.clientY - playerRect.top - dragStart.y;
        
        // Constrain to video player bounds
        const maxX = playerRect.width - captionRect.width;
        const maxY = playerRect.height - captionRect.height;
        
        setPosition({
          x: Math.max(0, Math.min(maxX, newX)),
          y: Math.max(0, Math.min(maxY, newY))
        });
      }
    } else {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    if (!draggable) return;
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!draggable) return;
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    
    // Get the current position of the caption element
    const rect = captionRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    } else {
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !draggable) return;
    e.preventDefault();
    const touch = e.touches[0];
    
    // Get the video player container to calculate relative position
    const videoPlayer = captionRef.current?.closest('.rvp-video-player');
    if (videoPlayer) {
      const playerRect = videoPlayer.getBoundingClientRect();
      const captionRect = captionRef.current?.getBoundingClientRect();
      
      if (captionRect) {
        const newX = touch.clientX - playerRect.left - dragStart.x;
        const newY = touch.clientY - playerRect.top - dragStart.y;
        
        // Constrain to video player bounds
        const maxX = playerRect.width - captionRect.width;
        const maxY = playerRect.height - captionRect.height;
        
        setPosition({
          x: Math.max(0, Math.min(maxX, newX)),
          y: Math.max(0, Math.min(maxY, newY))
        });
      }
    } else {
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    if (!draggable) return;
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart]);

  const defaultStyle: CaptionStyle = {
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '8px 12px',
    borderRadius: '4px',
    textAlign: 'center',
    position: 'bottom',
    margin: '0 auto 20px auto',
    opacity: 1,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    fontWeight: '400',
    lineHeight: '1.4',
    maxWidth: '80%',
    wordWrap: 'break-word',
    ...style
  };

  const captionStyle: React.CSSProperties = {
    position: 'absolute',
    left: position.x !== 0 ? position.x : (defaultStyle.position === 'top' ? '50%' : '50%'),
    top: position.y !== 0 ? position.y : (defaultStyle.position === 'top' ? '20px' : 'auto'),
    bottom: defaultStyle.position === 'bottom' && position.y === 0 ? '20px' : 'auto',
    transform: position.x !== 0 ? 'none' : 'translateX(-50%)',
    fontSize: defaultStyle.fontSize,
    fontFamily: defaultStyle.fontFamily,
    color: defaultStyle.color,
    backgroundColor: defaultStyle.backgroundColor,
    padding: defaultStyle.padding,
    borderRadius: defaultStyle.borderRadius,
    textAlign: defaultStyle.textAlign,
    margin: defaultStyle.margin,
    opacity: defaultStyle.opacity,
    textShadow: defaultStyle.textShadow,
    fontWeight: defaultStyle.fontWeight,
    lineHeight: defaultStyle.lineHeight,
    maxWidth: defaultStyle.maxWidth,
    wordWrap: defaultStyle.wordWrap,
    zIndex: defaultStyle.zIndex || 10,
    border: defaultStyle.border,
    pointerEvents: draggable ? 'auto' : 'none',
    whiteSpace: 'pre-wrap',
    transition: isDragging ? 'none' : 'opacity 0.3s ease-in-out',
    cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'default',
    userSelect: 'none',
    boxShadow: isDragging ? '0 4px 12px rgba(0, 0, 0, 0.3)' : defaultStyle.boxShadow || '0 1px 3px rgba(0, 0, 0, 0.3)'
  };

  return (
    <div 
      ref={captionRef}
      className={`rvp-caption ${isDragging ? 'rvp-caption-dragging' : ''} ${className}`}
      style={captionStyle}
      role="caption"
      aria-live="polite"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {text}
    </div>
  );
});
