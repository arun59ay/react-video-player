export interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  captionsEnabled: boolean;
  isLoading: boolean;
  buffered: number;
}

export interface VideoControls {
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  toggleFullscreen: () => void;
  toggleCaptions: () => void;
  formatTime: (time: number) => string;
}

export interface VideoPlayerProps {
 src: string;
  poster?: string;
  captions?: string;
  title?: string;
  theme?: 'light' | 'dark';
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onSeek?: (time: number) => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
}