import { useState, useEffect } from 'react';
import { CaptionConfig } from '../types/video';

export const useCustomCaptions = (
  customCaptions: CaptionConfig[] = [],
  currentTime: number,
  captionsEnabled: boolean
) => {
  const [currentCaption, setCurrentCaption] = useState<CaptionConfig | null>(null);

  useEffect(() => {
    if (!captionsEnabled || customCaptions.length === 0) {
      setCurrentCaption(null);
      return;
    }

    // Find the caption that should be displayed at the current time
    const activeCaption = customCaptions.find(
      caption => 
        currentTime >= caption.startTime && 
        currentTime <= caption.endTime
    );

    setCurrentCaption(activeCaption || null);
  }, [currentTime, customCaptions, captionsEnabled]);

  return {
    currentCaption,
    isVisible: captionsEnabled && currentCaption !== null
  };
};
