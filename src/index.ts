export { VideoPlayer } from './components/VideoPlayer';
export { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
export { QualitySelector } from './components/QualitySelector';
export { SocialShare } from './components/SocialShare';
export { ChapterMarkers } from './components/ChapterMarkers';

export type { 
  VideoPlayerProps,
  VideoState,
  VideoControls,
  Chapter,
  VideoQuality,
  SubtitleTrack,
  PlaylistItem,
  AnalyticsData,
  CaptionConfig
} from './types/video';

export { useVideo } from './hooks/useVideo';
export { useAnalytics } from './hooks/useAnalytics';
export { useCustomCaptions } from './hooks/useCustomCaptions';