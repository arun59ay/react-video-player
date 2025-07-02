import React from "react";
import { VideoPlayer } from "./components/VideoPlayer";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          @streamspark/react-video-player
        </h1>

        <div className="space-y-8">
          {/* Main Demo Player */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Dark Theme Player
            </h2>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=800"
              title="Big Buck Bunny - Demo Video"
              theme="dark"
              autoplay={false}
              loop={false}
              onPlay={() => console.log("Video started playing")}
              onPause={() => console.log("Video paused")}
              onTimeUpdate={(time) => console.log("Time update:", time)}
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
              autoplay={false}
              loop={false}
            />
          </div>

          {/* Compact Player */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Compact Size Player
            </h2>
            <div className="max-w-md mx-auto">
              <VideoPlayer
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                poster="https://images.pexels.com/photos/1090637/pexels-photo-1090637.jpeg?auto=compress&cs=tinysrgb&w=400"
                title="For Bigger Blazes"
                theme="dark"
                width="400px"
                height="225px"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Features List */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Enhanced Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Core Features
              </h3>
              <ul className="space-y-2">
                <li>• Custom play/pause controls</li>
                <li>• Interactive seek bar with buffering indicator</li>
                <li>• Volume control with slider and mute</li>
                <li>• Playback speed adjustment (0.25x - 2x)</li>
                <li>• Full-screen toggle</li>
                <li>• Subtitle support (.vtt files)</li>
                <li>• Loading spinner and error handling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                User Experience
              </h3>
              <ul className="space-y-2">
                <li>• Light and dark themes</li>
                <li>• Responsive design</li>
                <li>• Enhanced keyboard shortcuts</li>
                <li>• Auto-hide controls</li>
                <li>• Smooth animations</li>
                <li>• Full accessibility support</li>
                <li>• TypeScript support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Keyboard Shortcuts */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Enhanced Keyboard Shortcuts
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-gray-300">
            <Shortcut label="Play/Pause" keys="Space / K" />
            <Shortcut label="Seek -10s" keys="← / J" />
            <Shortcut label="Seek +10s" keys="→ / L" />
            <Shortcut label="Volume Up" keys="↑" />
            <Shortcut label="Volume Down" keys="↓" />
            <Shortcut label="Mute" keys="M" />
            <Shortcut label="Fullscreen" keys="F" />
            <Shortcut label="Speed Down" keys="Shift + ," />
            <Shortcut label="Speed Up" keys="Shift + ." />
            <Shortcut label="Go to Start" keys="Home" />
            <Shortcut label="Go to End" keys="End" />
          </div>
        </div>

        {/* Package Installation */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            NPM Package Installation
          </h2>
          <div className="bg-gray-900 rounded p-4 mb-4">
            <code className="text-green-400">
              npm install @streamspark/react-video-player
            </code>
          </div>
          <div className="text-gray-300">
            <h3 className="text-lg font-semibold text-white mb-2">
              Usage Example:
            </h3>
            <pre className="bg-gray-900 rounded p-4 text-sm overflow-x-auto">
              {`import React from 'react';
import { VideoPlayer } from '@streamspark/react-video-player';

const App = () => (
  <VideoPlayer
    src="/videos/sample.mp4"
    poster="/images/thumb.jpg"
    captions="/captions/subtitles.vtt"
    title="Demo Player"
    theme="dark"
    autoplay={false}
    loop={false}
    onPlay={() => console.log('Playing')}
    onPause={() => console.log('Paused')}
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
