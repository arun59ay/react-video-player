import { useState, useEffect, useCallback, useRef } from 'react';
import { VideoState, VideoControls } from '../types/video';

export const useVideo = (
  videoRef: React.RefObject<HTMLVideoElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  options?: {
    onPlay?: () => void;
    onPause?: () => void;
    onTimeUpdate?: (currentTime: number) => void;
    onVolumeChange?: (volume: number) => void;
    onSeek?: (time: number) => void;
    onEnded?: () => void;
    onError?: (error: string) => void;
    onSeekFeedback?: (timeDiff: number) => void;
    onVolumeFeedback?: (volume: number, isMuted: boolean) => void;
    onPlayPauseFeedback?: () => void;
  }
): VideoState & VideoControls => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [buffered, setBuffered] = useState(0);

  const lastVolumeRef = useRef(1);
  const lastCurrentTimeRef = useRef(0);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
        options?.onError?.(error.message);
      });
    }
    
    // Trigger visual feedback
    options?.onPlayPauseFeedback?.();
  }, [isPlaying, videoRef, options]);

  const seek = useCallback((time: number) => {
    if (!videoRef.current) return;
    const clampedTime = Math.max(0, Math.min(duration, time));
    const timeDiff = clampedTime - lastCurrentTimeRef.current;
    
    videoRef.current.currentTime = clampedTime;
    setCurrentTime(clampedTime);
    lastCurrentTimeRef.current = clampedTime;
    
    options?.onSeek?.(clampedTime);
    
    // Trigger seek feedback for significant time changes
    if (Math.abs(timeDiff) >= 5) {
      options?.onSeekFeedback?.(timeDiff);
    }
  }, [videoRef, duration, options]);

  const setVolumeValue = useCallback((newVolume: number) => {
    if (!videoRef.current) return;
    
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    videoRef.current.volume = clampedVolume;
    setVolume(clampedVolume);
    
    if (clampedVolume > 0) {
      lastVolumeRef.current = clampedVolume;
      if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
    
    options?.onVolumeChange?.(clampedVolume);
    options?.onVolumeFeedback?.(clampedVolume, isMuted && clampedVolume === 0);
  }, [videoRef, isMuted, options]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    videoRef.current.muted = newMutedState;
    
    if (newMutedState) {
      lastVolumeRef.current = volume;
    } else {
      // Restore previous volume when unmuting
      const restoreVolume = lastVolumeRef.current || 0.5;
      videoRef.current.volume = restoreVolume;
      setVolume(restoreVolume);
    }
    
    // Trigger volume feedback
    options?.onVolumeFeedback?.(newMutedState ? 0 : volume, newMutedState);
  }, [isMuted, videoRef, volume, options]);

  const setPlaybackRateValue = useCallback((rate: number) => {
    if (!videoRef.current) return;
    const clampedRate = Math.max(0.25, Math.min(2, rate));
    videoRef.current.playbackRate = clampedRate;
    setPlaybackRate(clampedRate);
  }, [videoRef]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((error) => {
        console.error('Error entering fullscreen:', error);
        options?.onError?.(error.message);
      });
    } else {
      document.exitFullscreen().catch((error) => {
        console.error('Error exiting fullscreen:', error);
        options?.onError?.(error.message);
      });
    }
  }, [containerRef, options]);

  const toggleCaptions = useCallback(() => {
    if (!videoRef.current) return;
    
    const textTracks = videoRef.current.textTracks;
    if (textTracks.length > 0) {
      const track = textTracks[0];
      track.mode = captionsEnabled ? 'hidden' : 'showing';
      setCaptionsEnabled(!captionsEnabled);
    }
  }, [captionsEnabled, videoRef]);

  const formatTime = useCallback((time: number): string => {
    if (isNaN(time)) return '0:00';
    
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Enhanced keyboard shortcuts with visual feedback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current || !containerRef.current) return;
      
      // Check if the video player container is focused or contains the active element
      const isPlayerFocused = containerRef.current.contains(document.activeElement) ||
                             document.activeElement === containerRef.current ||
                             document.activeElement === videoRef.current;
      
      if (!isPlayerFocused) return;
      
      // Prevent default behavior for all our handled keys
      const handledKeys = [
        'Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'KeyM', 'KeyF', 'KeyK', 'KeyJ', 'KeyL', 'Comma', 'Period', 'Home', 'End'
      ];
      
      if (handledKeys.includes(e.code)) {
        e.preventDefault();
      }
      
      const currentVideoTime = videoRef.current.currentTime;
      
      switch (e.code) {
        case 'Space':
        case 'KeyK':
          togglePlay();
          break;
        case 'ArrowLeft':
        case 'KeyJ':
          const newTimeLeft = Math.max(0, currentVideoTime - 10);
          seek(newTimeLeft);
          break;
        case 'ArrowRight':
        case 'KeyL':
          const newTimeRight = Math.min(duration, currentVideoTime + 10);
          seek(newTimeRight);
          break;
        case 'ArrowUp':
          const newVolumeUp = Math.min(1, volume + 0.1);
          setVolumeValue(newVolumeUp);
          break;
        case 'ArrowDown':
          const newVolumeDown = Math.max(0, volume - 0.1);
          setVolumeValue(newVolumeDown);
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        case 'Comma':
          if (e.shiftKey) {
            setPlaybackRateValue(Math.max(0.25, playbackRate - 0.25));
          }
          break;
        case 'Period':
          if (e.shiftKey) {
            setPlaybackRateValue(Math.min(2, playbackRate + 0.25));
          }
          break;
        case 'Home':
          seek(0);
          break;
        case 'End':
          seek(duration);
          break;
      }
    };

    // Add event listener to document to catch all keyboard events
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    togglePlay, 
    seek, 
    currentTime, 
    duration, 
    setVolumeValue, 
    volume, 
    toggleMute, 
    toggleFullscreen,
    setPlaybackRateValue,
    playbackRate,
    videoRef,
    containerRef
  ]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      options?.onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      options?.onPause?.();
    };

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      setCurrentTime(currentTime);
      lastCurrentTimeRef.current = currentTime;
      options?.onTimeUpdate?.(currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration || 0);
    };

    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setBuffered((bufferedEnd / duration) * 100);
        }
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      options?.onEnded?.();
    };

    const handleError = () => {
      setIsLoading(false);
      options?.onError?.('Video failed to load');
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [videoRef, options]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return {
    // State
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    isFullscreen,
    captionsEnabled,
    isLoading,
    buffered,
    // Controls
    togglePlay,
    seek,
    setVolume: setVolumeValue,
    toggleMute,
    setPlaybackRate: setPlaybackRateValue,
    toggleFullscreen,
    toggleCaptions,
    formatTime
  };
};