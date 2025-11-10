import { useState } from 'react';
import { VideoPlayer } from "../src/components/VideoPlayer";
import { CaptionConfig, Chapter, VideoQuality, SubtitleTrack, PlaylistItem, AnalyticsData } from "../src/types/video";
import './src/index.css';

function App() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  // Custom captions configuration
  const customCaptions: CaptionConfig[] = [
    {
      text: "🎬 Welcome to React Video Player!",
      startTime: 0,
      endTime: 8,
      style: {
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        fontWeight: 'normal',
        position: 'bottom',
        padding: '4px 8px',
        borderRadius: '2px',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
        zIndex: 10,
        maxWidth: '80%',
        textAlign: 'center'
      }
    },
    {
      text: "✨ This video demonstrates\ncustomizable captions",
      startTime: 8,
      endTime: 16,
      style: {
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        textAlign: 'center',
        position: 'bottom',
        padding: '4px 8px',
        borderRadius: '2px',
        fontWeight: 'normal',
        lineHeight: '1.4',
        zIndex: 10,
        maxWidth: '80%'
      }
    },
    {
      text: "🎨 Fully customizable styling!",
      startTime: 16,
      endTime: 24,
      style: {
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        textAlign: 'center',
        position: 'bottom',
        padding: '4px 8px',
        borderRadius: '2px',
        fontWeight: 'normal',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
        zIndex: 10,
        maxWidth: '80%'
      }
    },
    {
      text: "📱 Mobile touch compatible",
      startTime: 24,
      endTime: 32,
      style: {
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        textAlign: 'center',
        position: 'bottom',
        padding: '4px 8px',
        borderRadius: '2px',
        opacity: 1,
        zIndex: 10,
        maxWidth: '80%'
      }
    }
  ];

  // Video chapters
  const chapters: Chapter[] = [
    { title: "Introduction", startTime: 0, endTime: 30 },
    { title: "Main Content", startTime: 30, endTime: 90 },
    { title: "Conclusion", startTime: 90, endTime: 120 }
  ];

  // Video quality options
  // NOTE: For demo purposes, we're using different sample videos to demonstrate quality switching
  // In production, you would provide different quality versions of the SAME video:
  // - BigBuckBunny_1080p.mp4
  // - BigBuckBunny_720p.mp4
  // - BigBuckBunny_480p.mp4
  // - BigBuckBunny_360p.mp4
  // Since we don't have different quality versions of the same video in the sample library,
  // we're using different videos to demonstrate the quality switching feature
  const qualities: VideoQuality[] = [
    { label: "Auto", value: "auto", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { label: "1080p", value: "1080p", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { label: "720p", value: "720p", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { label: "480p", value: "480p", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { label: "360p", value: "360p", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
  ];

  // Multiple subtitle tracks
  const subtitleTracks: SubtitleTrack[] = [
    { label: "English", language: "en", src: "/captions/en.vtt", default: true },
    { label: "Spanish", language: "es", src: "/captions/es.vtt" },
    { label: "French", language: "fr", src: "/captions/fr.vtt" }
  ];

  // Playlist items
  const playlist: PlaylistItem[] = [
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Big Buck Bunny",
      poster: "https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Elephant's Dream",
      poster: "https://images.pexels.com/photos/62307/elephant-nature-africa-kenya-62307.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "For Bigger Blazes",
      poster: "https://images.pexels.com/photos/1090637/pexels-photo-1090637.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          @streamspark/react-video-player
        </h1>
        <p className="text-center text-gray-400 mb-8">
          A fully-featured, YouTube-like video player with advanced features
        </p>

        <div className="space-y-8">
          {/* Full Featured Player with All New Features */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              🚀 Full Featured Player - All New Features
            </h2>
            <div className="mb-4 p-4 bg-blue-900 border border-blue-600 rounded-lg">
              <p className="text-sm text-blue-200">
                <strong>✨ New Features:</strong> Picture-in-Picture (I), Theater Mode (T), Quality Selector, 
                Social Sharing, Video Chapters, Multiple Subtitles, Analytics, Playlist Support, 
                Advanced Keyboard Shortcuts (?)
              </p>
            </div>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=800"
              title="Big Buck Bunny - Full Featured Demo"
              description="This video demonstrates all the new features including Picture-in-Picture, Theater Mode, Quality Selection, Social Sharing, Chapters, and more!"
              theme="dark"
              customCaptions={customCaptions}
              chapters={chapters}
              qualities={qualities}
              captions={subtitleTracks}
              enablePictureInPicture={true}
              enableTheaterMode={true}
              enableAnalytics={true}
              enableSocialShare={true}
              enableKeyboardShortcuts={true}
              showKeyboardShortcutsHelp={false}
              autoplay={false}
              loop={false}
              onPlay={() => console.log("Video started playing")}
              onPause={() => console.log("Video paused")}
              onTimeUpdate={(time) => console.log("Time update:", time)}
              onChapterChange={(chapter) => console.log("Chapter changed:", chapter)}
              onQualityChange={(quality) => console.log("Quality changed:", quality)}
              onSubtitleChange={(language) => console.log("Subtitle changed:", language)}
              onAnalyticsUpdate={(data) => {
                setAnalyticsData(data);
                console.log("Analytics update:", data);
              }}
              onShare={(timestamp) => console.log("Share clicked:", timestamp)}
            />
            
            {analyticsData && (
              <div className="mt-4 p-4 bg-green-900 border border-green-600 rounded-lg">
                <h3 className="text-lg font-semibold text-green-200 mb-2">📊 Analytics Data</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-green-100">
                  <div>
                    <strong>Watch Time:</strong> {Math.round(analyticsData.watchTime)}s
                  </div>
                  <div>
                    <strong>Play Count:</strong> {analyticsData.playCount}
                  </div>
                  <div>
                    <strong>Seek Count:</strong> {analyticsData.seekCount}
                  </div>
                  <div>
                    <strong>Engagement:</strong> {Math.round(analyticsData.engagementScore)}%
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Playlist Demo */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              📋 Playlist Support
            </h2>
            <div className="mb-4 p-4 bg-purple-900 border border-purple-600 rounded-lg">
              <p className="text-sm text-purple-200">
                <strong>🎵 Playlist Feature:</strong> Auto-play next video, playlist progress indicator, 
                and seamless video transitions
              </p>
            </div>
            <VideoPlayer
              src={playlist}
              title="Video Playlist Demo"
              theme="dark"
              enablePictureInPicture={true}
              enableTheaterMode={true}
              enableSocialShare={true}
              onPlaylistItemChange={(index, item) => {
                console.log(`Playing video ${index + 1}: ${item.title}`);
              }}
            />
          </div>

          {/* Chapters Demo */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              📑 Video Chapters
            </h2>
            <div className="mb-4 p-4 bg-indigo-900 border border-indigo-600 rounded-lg">
              <p className="text-sm text-indigo-200">
                <strong>📑 Chapters Feature:</strong> Click on chapter markers on the seek bar to jump to specific sections
              </p>
            </div>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              poster="https://images.pexels.com/photos/62307/elephant-nature-africa-kenya-62307.jpeg?auto=compress&cs=tinysrgb&w=800"
              title="Elephant's Dream - Chapters Demo"
              theme="dark"
              chapters={chapters}
              enablePictureInPicture={true}
              enableTheaterMode={true}
              onChapterChange={(chapter) => {
                console.log("Chapter:", chapter.title);
              }}
            />
          </div>

          {/* Quality Selector Demo */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              🎥 Quality Selector
            </h2>
            <div className="mb-4 p-4 bg-yellow-900 border border-yellow-600 rounded-lg">
              <p className="text-sm text-yellow-200">
                <strong>🎥 Quality Feature:</strong> Hover over the quality button to select different video qualities
              </p>
            </div>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              poster="https://images.pexels.com/photos/1090637/pexels-photo-1090637.jpeg?auto=compress&cs=tinysrgb&w=400"
              title="For Bigger Blazes - Quality Demo"
              theme="dark"
              qualities={qualities}
              enablePictureInPicture={true}
              enableTheaterMode={true}
              onQualityChange={(quality) => {
                console.log("Quality changed to:", quality);
              }}
            />
          </div>

          {/* Theater Mode Demo */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              🎭 Theater Mode
            </h2>
            <div className="mb-4 p-4 bg-pink-900 border border-pink-600 rounded-lg">
              <p className="text-sm text-pink-200">
                <strong>🎭 Theater Mode:</strong> Click the theater mode button (T key) for a wider viewing experience
              </p>
            </div>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=800"
              title="Theater Mode Demo"
              theme="dark"
              enableTheaterMode={true}
              enablePictureInPicture={true}
            />
          </div>

          {/* Picture-in-Picture Demo */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              🖼️ Picture-in-Picture
            </h2>
            <div className="mb-4 p-4 bg-teal-900 border border-teal-600 rounded-lg">
              <p className="text-sm text-teal-200">
                <strong>🖼️ PiP Feature:</strong> Click the Picture-in-Picture button (I key) to watch video in a floating window
              </p>
            </div>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              poster="https://images.pexels.com/photos/62307/elephant-nature-africa-kenya-62307.jpeg?auto=compress&cs=tinysrgb&w=800"
              title="Picture-in-Picture Demo"
              theme="dark"
              enablePictureInPicture={true}
            />
          </div>

          {/* Social Sharing Demo */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              📤 Social Sharing
            </h2>
            <div className="mb-4 p-4 bg-orange-900 border border-orange-600 rounded-lg">
              <p className="text-sm text-orange-200">
                <strong>📤 Share Feature:</strong> Click the share button to copy link, share on social media, or get embed code
              </p>
            </div>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              poster="https://images.pexels.com/photos/1090637/pexels-photo-1090637.jpeg?auto=compress&cs=tinysrgb&w=400"
              title="Social Sharing Demo"
              theme="dark"
              enableSocialShare={true}
              onShare={(timestamp) => {
                console.log("Share clicked at:", timestamp);
              }}
            />
          </div>

          {/* Light Theme Demo */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Light Theme Player
            </h2>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              poster="https://images.pexels.com/photos/62307/elephant-nature-africa-kenya-62307.jpeg?auto=compress&cs=tinysrgb&w=800"
              title="Elephant's Dream - Light Theme Demo"
              theme="light"
              enablePictureInPicture={true}
              enableTheaterMode={true}
              enableSocialShare={true}
              autoplay={false}
              loop={false}
            />
          </div>

          {/* Custom Captions Showcase */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Custom Captions Showcase
            </h2>
            <div className="max-w-2xl mx-auto">
              <VideoPlayer
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                poster="https://images.pexels.com/photos/1090637/pexels-photo-1090637.jpeg?auto=compress&cs=tinysrgb&w=400"
                title="Custom Captions Demo"
                theme="dark"
                customCaptions={[
                  {
                    text: "🔥 For Bigger Blazes!",
                    startTime: 0,
                    endTime: 10,
                    style: {
                      fontSize: '14px',
                      color: '#ffffff',
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      fontWeight: 'normal',
                      position: 'bottom',
                      padding: '4px 8px',
                      borderRadius: '2px',
                      zIndex: 10,
                      maxWidth: '80%',
                      textAlign: 'center'
                    }
                  }
                ]}
                width="100%"
                height="300px"
              />
            </div>
            <div className="mt-4 p-4 bg-yellow-900 border border-yellow-600 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 text-lg mr-2">⚠️</span>
                <p className="text-sm text-yellow-200 font-semibold">
                  <strong>IMPORTANT:</strong> Click the CC (captions) button in the player controls to enable custom captions!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features List */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            ✨ All Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Core Features
              </h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Custom play/pause controls</li>
                <li>✅ Interactive seek bar with buffering</li>
                <li>✅ Volume control with slider and mute</li>
                <li>✅ Playback speed (0.25x - 2x)</li>
                <li>✅ Full-screen toggle</li>
                <li>✅ Subtitle support (.vtt files)</li>
                <li>✅ Customizable captions</li>
                <li>✅ Loading spinner</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                🆕 New Features
              </h3>
              <ul className="space-y-2 text-sm">
                <li>🖼️ Picture-in-Picture (PiP)</li>
                <li>🎭 Theater Mode</li>
                <li>📑 Video Chapters</li>
                <li>🎥 Quality Selector</li>
                <li>🌐 Multiple Subtitle Languages</li>
                <li>📤 Social Sharing</li>
                <li>📊 Analytics Tracking</li>
                <li>📋 Playlist Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                User Experience
              </h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Light and dark themes</li>
                <li>✅ Responsive design</li>
                <li>✅ Mobile touch support</li>
                <li>✅ Advanced keyboard shortcuts</li>
                <li>✅ Keyboard shortcuts help (?)</li>
                <li>✅ Auto-hide controls</li>
                <li>✅ Smooth animations</li>
                <li>✅ Full accessibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Keyboard Shortcuts */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            ⌨️ Enhanced Keyboard Shortcuts
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-gray-300">
            <Shortcut label="Play/Pause" keys="Space / K" />
            <Shortcut label="Seek -10s" keys="← / J" />
            <Shortcut label="Seek +10s" keys="→ / L" />
            <Shortcut label="Volume Up" keys="↑" />
            <Shortcut label="Volume Down" keys="↓" />
            <Shortcut label="Mute" keys="M" />
            <Shortcut label="Fullscreen" keys="F" />
            <Shortcut label="Picture-in-Picture" keys="I" />
            <Shortcut label="Toggle Captions" keys="C" />
            <Shortcut label="Theater Mode" keys="T" />
            <Shortcut label="Seek to 0-90%" keys="0-9" />
            <Shortcut label="Speed Down" keys="Shift + ," />
            <Shortcut label="Speed Up" keys="Shift + ." />
            <Shortcut label="Go to Start" keys="Home" />
            <Shortcut label="Go to End" keys="End" />
            <Shortcut label="Show Help" keys="?" />
          </div>
        </div>

        {/* Package Installation */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            📦 NPM Package Installation
          </h2>
          <div className="bg-gray-900 rounded p-4 mb-4">
            <code className="text-green-400">
              npm install @streamspark/react-video-player
            </code>
          </div>
          <div className="text-gray-300">
            <h3 className="text-lg font-semibold text-white mb-2">
              Usage Example with All Features:
            </h3>
            <pre className="bg-gray-900 rounded p-4 text-sm overflow-x-auto">
              {`import React from 'react';
import { VideoPlayer } from '@streamspark/react-video-player';
import type { Chapter, VideoQuality, SubtitleTrack } from '@streamspark/react-video-player';

const chapters: Chapter[] = [
  { title: "Intro", startTime: 0, endTime: 30 },
  { title: "Main", startTime: 30, endTime: 90 }
];

const qualities: VideoQuality[] = [
  { label: "1080p", value: "1080p", src: "/video-1080p.mp4" },
  { label: "720p", value: "720p", src: "/video-720p.mp4" }
];

const subtitles: SubtitleTrack[] = [
  { label: "English", language: "en", src: "/en.vtt", default: true },
  { label: "Spanish", language: "es", src: "/es.vtt" }
];

const App = () => (
  <VideoPlayer
    src="/videos/sample.mp4"
    poster="/images/thumb.jpg"
    title="Demo Player"
    description="Video description"
    theme="dark"
    chapters={chapters}
    qualities={qualities}
    captions={subtitles}
    enablePictureInPicture={true}
    enableTheaterMode={true}
    enableAnalytics={true}
    enableSocialShare={true}
    enableKeyboardShortcuts={true}
    onChapterChange={(chapter) => console.log(chapter)}
    onQualityChange={(quality) => console.log(quality)}
    onSubtitleChange={(lang) => console.log(lang)}
    onAnalyticsUpdate={(data) => console.log(data)}
    onShare={(timestamp) => console.log(timestamp)}
  />
);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

const Shortcut = ({ label, keys }: { label: string; keys: string }) => (
  <div className="flex justify-between">
    <span>{label}:</span>
    <kbd className="bg-gray-700 px-2 py-1 rounded text-sm">{keys}</kbd>
  </div>
);

export default App;
