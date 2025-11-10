import { useEffect, useRef, useCallback } from 'react';
import { AnalyticsData } from '../types/video';

interface UseAnalyticsOptions {
  enabled?: boolean;
  onUpdate?: (data: AnalyticsData) => void;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  chapters?: Array<{ startTime: number; endTime: number }>;
}

export const useAnalytics = ({
  enabled = false,
  onUpdate,
  currentTime,
  duration,
  isPlaying,
  chapters = []
}: UseAnalyticsOptions) => {
  const analyticsRef = useRef<AnalyticsData>({
    watchTime: 0,
    totalTime: 0,
    playCount: 0,
    pauseCount: 0,
    seekCount: 0,
    volumeChanges: 0,
    playbackRateChanges: 0,
    chaptersViewed: [],
    dropOffPoints: [],
    engagementScore: 0
  });

  const lastUpdateTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const playStartTimeRef = useRef<number | null>(null);
  const watchedChaptersRef = useRef<Set<number>>(new Set());

  // Track watch time
  useEffect(() => {
    if (!enabled || !isPlaying || duration === 0) return;

    const interval = setInterval(() => {
      if (isPlaying && playStartTimeRef.current !== null) {
        const now = Date.now();
        const elapsed = (now - playStartTimeRef.current) / 1000;
        analyticsRef.current.watchTime += elapsed;
        analyticsRef.current.totalTime = duration;
        playStartTimeRef.current = now;
        
        // Calculate engagement score
        const watchPercentage = (analyticsRef.current.watchTime / duration) * 100;
        const engagementScore = Math.min(100, watchPercentage);
        analyticsRef.current.engagementScore = engagementScore;

        onUpdate?.(analyticsRef.current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, isPlaying, duration, onUpdate]);

  // Track play/pause
  useEffect(() => {
    if (!enabled) return;

    if (isPlaying) {
      analyticsRef.current.playCount++;
      playStartTimeRef.current = Date.now();
    } else {
      if (playStartTimeRef.current !== null) {
        analyticsRef.current.pauseCount++;
        playStartTimeRef.current = null;
      }
    }
  }, [enabled, isPlaying]);

  // Track seeks
  useEffect(() => {
    if (!enabled || lastTimeRef.current === 0) {
      lastTimeRef.current = currentTime;
      return;
    }

    const timeDiff = Math.abs(currentTime - lastTimeRef.current);
    if (timeDiff > 2) {
      analyticsRef.current.seekCount++;
      lastTimeRef.current = currentTime;
    }
  }, [enabled, currentTime]);

  // Track chapters viewed
  useEffect(() => {
    if (!enabled || chapters.length === 0) return;

    chapters.forEach((chapter, index) => {
      if (
        currentTime >= chapter.startTime &&
        currentTime <= chapter.endTime &&
        !watchedChaptersRef.current.has(index)
      ) {
        watchedChaptersRef.current.add(index);
        analyticsRef.current.chaptersViewed.push(index);
        onUpdate?.(analyticsRef.current);
      }
    });
  }, [enabled, currentTime, chapters, onUpdate]);

  // Track drop-off points
  const trackDropOff = useCallback(() => {
    if (!enabled) return;
    analyticsRef.current.dropOffPoints.push(currentTime);
    onUpdate?.(analyticsRef.current);
  }, [enabled, currentTime, onUpdate]);

  const trackVolumeChange = useCallback(() => {
    if (!enabled) return;
    analyticsRef.current.volumeChanges++;
    onUpdate?.(analyticsRef.current);
  }, [enabled, onUpdate]);

  const trackPlaybackRateChange = useCallback(() => {
    if (!enabled) return;
    analyticsRef.current.playbackRateChanges++;
    onUpdate?.(analyticsRef.current);
  }, [enabled, onUpdate]);

  const getAnalytics = useCallback((): AnalyticsData => {
    return { ...analyticsRef.current };
  }, []);

  const resetAnalytics = useCallback(() => {
    analyticsRef.current = {
      watchTime: 0,
      totalTime: 0,
      playCount: 0,
      pauseCount: 0,
      seekCount: 0,
      volumeChanges: 0,
      playbackRateChanges: 0,
      chaptersViewed: [],
      dropOffPoints: [],
      engagementScore: 0
    };
    watchedChaptersRef.current.clear();
    lastTimeRef.current = 0;
    playStartTimeRef.current = null;
  }, []);

  return {
    trackDropOff,
    trackVolumeChange,
    trackPlaybackRateChange,
    getAnalytics,
    resetAnalytics
  };
};

