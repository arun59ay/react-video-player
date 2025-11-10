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
  isPictureInPicture: boolean;
  isTheaterMode: boolean;
  currentQuality?: string;
  currentSubtitleLanguage?: string;
  currentChapter?: Chapter;
}

export interface VideoControls {
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  toggleFullscreen: () => void;
  toggleCaptions: () => void;
  togglePictureInPicture: () => void;
  toggleTheaterMode: () => void;
  setQuality: (quality: string) => void;
  setSubtitleLanguage: (language: string) => void;
  seekToChapter: (chapterIndex: number) => void;
  formatTime: (time: number) => string;
}

export interface CaptionConfig {
  text: string;
  startTime: number;
  endTime: number;
  style?: {
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
  };
}

export interface Chapter {
  title: string;
  startTime: number;
  endTime: number;
}

export interface VideoQuality {
  label: string;
  value: string;
  src: string;
}

export interface SubtitleTrack {
  label: string;
  language: string;
  src: string;
  default?: boolean;
}

export interface PlaylistItem {
  src: string;
  title: string;
  poster?: string;
  duration?: number;
}

export interface AnalyticsData {
  watchTime: number;
  totalTime: number;
  playCount: number;
  pauseCount: number;
  seekCount: number;
  volumeChanges: number;
  playbackRateChanges: number;
  chaptersViewed: number[];
  dropOffPoints: number[];
  engagementScore: number;
}

export interface ControlButtonStyle {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  color?: string;
  borderColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string | number;
  padding?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
}

export interface ControlMenuStyle {
  backgroundColor?: string;
  backdropFilter?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  textShadow?: string;
}

export interface ControlOptions {
  // Visibility toggles
  showPlayButton?: boolean;
  showVolumeControl?: boolean;
  showTimeDisplay?: boolean;
  showSeekBar?: boolean;
  showPlaybackSpeed?: boolean;
  showQualitySelector?: boolean;
  showCaptionsButton?: boolean;
  showFullscreenButton?: boolean;
  showPictureInPictureButton?: boolean;
  showTheaterModeButton?: boolean;
  showSocialShare?: boolean;
  showChapterMarkers?: boolean;

  // Button styles
  playButtonStyle?: ControlButtonStyle;
  volumeButtonStyle?: ControlButtonStyle;
  controlButtonStyle?: ControlButtonStyle;
  rightControlsButtonStyle?: ControlButtonStyle;

  // Menu styles
  playbackSpeedMenuStyle?: ControlMenuStyle;
  qualityMenuStyle?: ControlMenuStyle;
  shareMenuStyle?: ControlMenuStyle;

  // Seek bar styles
  seekBarStyle?: {
    height?: string;
    hoverHeight?: string;
    backgroundColor?: string;
    playedColor?: string;
    bufferedColor?: string;
    thumbColor?: string;
    thumbSize?: string;
    hoverThumbSize?: string;
    borderRadius?: string;
  };

  // Volume slider styles
  volumeSliderStyle?: {
    width?: string;
    height?: string;
    backgroundColor?: string;
    fillColor?: string;
    thumbColor?: string;
    thumbSize?: string;
    borderRadius?: string;
  };

  // Time display styles
  timeDisplayStyle?: {
    fontSize?: string;
    fontWeight?: string | number;
    color?: string;
    backgroundColor?: string;
    backdropFilter?: string;
    borderColor?: string;
    borderRadius?: string;
    padding?: string;
    textShadow?: string;
  };

  // Controls bar styles
  controlsBarStyle?: {
    backgroundColor?: string;
    padding?: string;
    gap?: string;
    borderRadius?: string;
    minHeight?: string;
    height?: string;
  };

  // Tooltip styles
  tooltipStyle?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string | number;
    padding?: string;
    borderRadius?: string;
    showDelay?: number;
    hideDelay?: number;
  };

  // Custom CSS variables (for advanced customization)
  customCSSVariables?: Record<string, string>;
}

export interface VideoPlayerProps {
  src: string | string[] | PlaylistItem[];
  poster?: string;
  captions?: string | SubtitleTrack[];
  customCaptions?: CaptionConfig[];
  title?: string;
  description?: string;
  theme?: 'light' | 'dark';
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  chapters?: Chapter[];
  qualities?: VideoQuality[];
  enablePictureInPicture?: boolean;
  enableTheaterMode?: boolean;
  enableAnalytics?: boolean;
  enableSocialShare?: boolean;
  enableKeyboardShortcuts?: boolean;
  showKeyboardShortcutsHelp?: boolean;
  theaterMode?: boolean;
  controlOptions?: ControlOptions;
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (time: number) => void;
  onVolumeChange?: (volume: number) => void;
  onSeek?: (time: number) => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
  onChapterChange?: (chapter: Chapter) => void;
  onQualityChange?: (quality: string) => void;
  onSubtitleChange?: (language: string) => void;
  onPlaylistItemChange?: (index: number, item: PlaylistItem) => void;
  onAnalyticsUpdate?: (data: AnalyticsData) => void;
  onShare?: (timestamp?: number) => void;
}