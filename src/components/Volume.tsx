import { useState, useRef, memo, useCallback, useEffect } from 'react';

interface VolumeProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMute: () => void;
  isVolumeSliderOpen: boolean;
  setIsVolumeSliderOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  onVolumeHover?: (hovering: boolean) => void; // ← make use of this
}

const VolumeXIcon = memo(() => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
));

const Volume1Icon = memo(() => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
));

const Volume2Icon = memo(() => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
));

export const Volume = memo<VolumeProps>(({
  volume,
  isMuted,
  onVolumeChange,
  onMute,
  isVolumeSliderOpen,
  setIsVolumeSliderOpen,
  onVolumeHover
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false); // Track hover state with ref for accurate checks

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeXIcon/>;
    if (volume < 0.5) return <Volume1Icon/>;
    return <Volume2Icon/>;
  };

  // Calculate volume from X position (horizontal slider like YouTube)
  const calculateVolumeFromX = useCallback((clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    return percentage / 100;
  }, []);

  const handleVolumeChange = useCallback((e: React.MouseEvent) => {
    const newVolume = calculateVolumeFromX(e.clientX);
    onVolumeChange(newVolume);
  }, [calculateVolumeFromX, onVolumeChange]);

  const handleVolumeChangeTouch = useCallback((touch: React.Touch) => {
    const newVolume = calculateVolumeFromX(touch.clientX);
    onVolumeChange(newVolume);
  }, [calculateVolumeFromX, onVolumeChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    handleVolumeChange(e);
  }, [handleVolumeChange]);

  // Use document-level mouse move for smoother dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleDocumentMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      const newVolume = calculateVolumeFromX(e.clientX);
      onVolumeChange(newVolume);
    };

    const handleDocumentMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, [isDragging, calculateVolumeFromX, onVolumeChange]);


  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleVolumeChangeTouch(e.touches[0]);
    }
  }, [handleVolumeChangeTouch]);

  // Handle tap on volume button for mobile (show/hide slider)
  const handleVolumeButtonTouch = useCallback((e: React.TouchEvent) => {
    // Don't prevent default if slider is already open - allow mute to work
    if (!isVolumeSliderOpen) {
      e.preventDefault();
      // Show slider on first tap (mobile)
      setIsVolumeSliderOpen(true);
      setIsHovering(true);
      isHoveringRef.current = true;
      onVolumeHover?.(true);
    }
    // If slider is open, let the click handler handle mute
  }, [isVolumeSliderOpen, onVolumeHover]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging && e.touches.length > 0) {
      e.preventDefault();
      handleVolumeChangeTouch(e.touches[0]);
    }
  }, [isDragging, handleVolumeChangeTouch]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Clear any pending hide timeout immediately
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    isHoveringRef.current = true;
    setIsHovering(true);
    // Show slider immediately on hover (smooth animation via CSS)
    setIsVolumeSliderOpen(true);
    onVolumeHover?.(true);
  }, [onVolumeHover]);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    // Check if we're leaving to go to the slider
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && containerRef.current?.contains(relatedTarget)) {
      // Mouse is moving to slider, don't hide
      return;
    }
    
    // Only proceed if not dragging
    if (isDragging) return;
    
    // Clear any existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    // Set hover state to false
    isHoveringRef.current = false;
    setIsHovering(false);
    
    // Delay hide to allow mouse to move to slider (like YouTube)
    hideTimeoutRef.current = setTimeout(() => {
      // Final check before hiding - ensure we're still not hovering or dragging
      if (!isDragging && !isHoveringRef.current && isVolumeSliderOpen) {
        setIsVolumeSliderOpen(false);
        onVolumeHover?.(false);
      }
      hideTimeoutRef.current = null;
    }, 300); // Increased delay for more reliable hiding
  }, [isDragging, isVolumeSliderOpen, onVolumeHover]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Also hide when dragging ends if not hovering (with longer delay like YouTube)
  useEffect(() => {
    if (!isDragging && !isHovering && isVolumeSliderOpen) {
      // Clear any existing timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      // Wait before hiding after interaction ends (like YouTube)
      hideTimeoutRef.current = setTimeout(() => {
        // Final check before hiding
        if (!isHoveringRef.current && !isDragging && isVolumeSliderOpen) {
          setIsVolumeSliderOpen(false);
          onVolumeHover?.(false);
        }
        hideTimeoutRef.current = null;
      }, 500); // Increased delay for more reliable hiding after drag
    }
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [isDragging, isHovering, isVolumeSliderOpen, onVolumeHover]);

  // Handle touch end outside control area for mobile
  useEffect(() => {
    if (!isVolumeSliderOpen || isDragging) return;

    const handleDocumentTouchEnd = (e: TouchEvent) => {
      if (!containerRef.current || !sliderRef.current) return;
      
      const touch = e.changedTouches[0];
      if (!touch) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const sliderRect = sliderRef.current.getBoundingClientRect();
      
      const padding = 10;
      
      const isOutsideContainer = 
        touch.clientX < containerRect.left - padding ||
        touch.clientX > containerRect.right + padding ||
        touch.clientY < containerRect.top - padding ||
        touch.clientY > containerRect.bottom + padding;
      
      const isOutsideSlider = 
        touch.clientX < sliderRect.left - padding ||
        touch.clientX > sliderRect.right + padding ||
        touch.clientY < sliderRect.top - padding ||
        touch.clientY > sliderRect.bottom + padding;

      // Hide slider if touch ended outside both areas
      if (isOutsideContainer && isOutsideSlider && !isDragging) {
        setTimeout(() => {
          if (!isDragging && !isHoveringRef.current && isVolumeSliderOpen) {
            setIsVolumeSliderOpen(false);
            setIsHovering(false);
            isHoveringRef.current = false;
            onVolumeHover?.(false);
          }
        }, 300);
      }
    };

    document.addEventListener('touchend', handleDocumentTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchend', handleDocumentTouchEnd);
    };
  }, [isVolumeSliderOpen, isDragging, onVolumeHover]);

  // Global mouse move listener to detect when mouse leaves the control area (throttled for performance)
  useEffect(() => {
    if (!isVolumeSliderOpen || isDragging) return;

    let timeoutId: NodeJS.Timeout | null = null;
    let lastCheckTime = 0;
    const throttleDelay = 50;
    const hideDelay = 300; // Increased delay for more reliable hiding

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle the checks to improve performance
      if (now - lastCheckTime < throttleDelay) return;
      lastCheckTime = now;

      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Check if slider is visible
      const sliderVisible = sliderRef.current && isVolumeSliderOpen;
      let sliderRect: DOMRect | null = null;
      if (sliderVisible && sliderRef.current) {
        sliderRect = sliderRef.current.getBoundingClientRect();
      }
      
      // Add padding to account for gaps between elements
      const padding = 10;
      
      // Check if mouse is outside container (with padding)
      const isOutsideContainer = 
        e.clientX < containerRect.left - padding ||
        e.clientX > containerRect.right + padding ||
        e.clientY < containerRect.top - padding ||
        e.clientY > containerRect.bottom + padding;
      
      // Check if mouse is outside slider (if visible)
      let isOutsideSlider = true;
      if (sliderVisible && sliderRect) {
        isOutsideSlider = 
          e.clientX < sliderRect.left - padding ||
          e.clientX > sliderRect.right + padding ||
          e.clientY < sliderRect.top - padding ||
          e.clientY > sliderRect.bottom + padding;
      }

      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // Only hide if mouse is outside both areas and not dragging
      if (isOutsideContainer && isOutsideSlider && !isDragging) {
        // Add delay before hiding (like YouTube)
        timeoutId = setTimeout(() => {
          // Final check before hiding - ensure we're still not hovering or dragging
          if (!isDragging && !isHoveringRef.current && isVolumeSliderOpen) {
            setIsVolumeSliderOpen(false);
            setIsHovering(false);
            isHoveringRef.current = false;
            onVolumeHover?.(false);
          }
          timeoutId = null;
        }, hideDelay);
      } else {
        // Mouse is inside, clear any pending hide timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };

    // Also listen for mouse leave on document to catch edge cases
    const handleDocumentMouseLeave = () => {
      // Clear any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      // Immediately hide if mouse leaves document
      if (!isDragging && !isHoveringRef.current && isVolumeSliderOpen) {
        setIsVolumeSliderOpen(false);
        setIsHovering(false);
        isHoveringRef.current = false;
        onVolumeHover?.(false);
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleDocumentMouseLeave, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleDocumentMouseLeave);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, [isVolumeSliderOpen, isDragging, onVolumeHover]);

  return (
    <div
      ref={containerRef}
      className="rvp-volume-control"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="rvp-control-btn rvp-volume-btn"
        onClick={onMute}
        onTouchStart={handleVolumeButtonTouch}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        title={isMuted ? 'Unmute (m)' : `Mute (m) - ${Math.round(volume * 100)}%`}
      >
        {getVolumeIcon()}
        <span className="rvp-tooltip">{isMuted ? 'Unmute (m)' : `Mute (m) - ${Math.round(volume * 100)}%`}</span>
      </button>

      <div 
        className={`rvp-volume-slider ${isVolumeSliderOpen ? 'rvp-show' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="rvp-volume-slider-track"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            />
            <div
              className="rvp-volume-slider-thumb"
              style={{ left: `${isMuted ? 0 : volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
