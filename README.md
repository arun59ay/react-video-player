@streamspark/react-video-player
A fully-featured, YouTube-like video player built completely from scratch using React and TypeScript — no third-party libraries involved.

Ideal for developers who want a clean, minimal, extensible, and dependency-free media player for their React applications.

✅ Features
🎬 Custom Controls – Play, Pause, Seek with buffering indicator
🔇 Volume Control – Drag slider with mute toggle
⏩ Enhanced Seek Bar – Shows current time, total duration, and buffering progress
⚙️ Playback Speed – 0.25x to 2x in steps
🌐 Subtitles – .vtt caption track support
📺 Full-Screen Toggle – Native browser support
🌓 Light/Dark Themes – Beautiful theme variations
📱 Responsive Layout – Works across all devices
🧠 Enhanced Keyboard Shortcuts – Full YouTube-like keyboard navigation
🎯 TypeScript Support – Full type safety and IntelliSense
♿ Accessibility – ARIA labels, keyboard navigation, screen reader support
🎨 Custom Styling – Easy to customize with CSS variables
📦 Zero Dependencies – No external libraries except React and Lucide icons

📦 Installation
bash
Copy
Edit
npm install @streamspark/react-video-player
🛠 Usage
Basic Usage
tsx
Copy
Edit
import React from 'react';
import { VideoPlayer } from '@streamspark/react-video-player';

const App = () => (
  <VideoPlayer
    src="/videos/sample.mp4"
    poster="/images/thumb.jpg"
    title="Demo Player"
    theme="dark"
  />
);
Advanced Usage with All Props
tsx
Copy
Edit
import React from 'react';
import { VideoPlayer } from '@streamspark/react-video-player';

const App = () => (
  <VideoPlayer
    src="/videos/sample.mp4"
    poster="/images/thumb.jpg"
    captions="/captions/subtitles.vtt"
    title="Advanced Demo Player"
    theme="light"
    autoplay={false}
    loop={false}
    muted={false}
    controls={true}
    width="800px"
    height="450px"
    className="my-custom-player"
    style={{ borderRadius: '12px' }}
    onPlay={() => console.log('Video started')}
    onPause={() => console.log('Video paused')}
    onTimeUpdate={(time) => console.log('Current time:', time)}
    onVolumeChange={(volume) => console.log('Volume:', volume)}
    onSeek={(time) => console.log('Seeked to:', time)}
    onEnded={() => console.log('Video ended')}
    onError={(error) => console.error('Video error:', error)}
  />
);
🎮 Enhanced Keyboard Shortcuts
Action	Keys
Play/Pause	Space or K
Seek backward 10s	← or J
Seek forward 10s	→ or L
Volume up	↑
Volume down	↓
Mute/Unmute	M
Fullscreen toggle	F
Decrease speed	Shift + ,
Increase speed	Shift + .
Go to start	Home
Go to end	End

📋 Props API
Prop	Type	Default	Description
src	string	required	Video source URL
poster	string	undefined	Poster image URL
captions	string	undefined	WebVTT captions file URL
title	string	undefined	Video title
theme	'light' | 'dark'	'dark'	Player theme
autoplay	boolean	false	Auto-play video on load
loop	boolean	false	Loop video playback
muted	boolean	false	Start video muted
controls	boolean	true	Show/hide player controls
width	string | number	'100%'	Player width
height	string | number	'auto'	Player height
className	string	''	Additional CSS class
style	CSSProperties	{}	Inline styles

🎯 Event Callbacks
Callback	Type	Description
onPlay	() => void	Called when video starts playing
onPause	() => void	Called when video is paused
onTimeUpdate	(time: number) => void	Called on time updates
onVolumeChange	(volume: number) => void	Called on volume changes
onSeek	(time: number) => void	Called when seeking
onEnded	() => void	Called when video ends
onError	(error: string) => void	Called on errors

🗂️ Project Structure
pgsql
Copy
Edit
@streamspark/react-video-player/
├── src/
│   ├── components/
│   │   ├── VideoPlayer.tsx
│   │   ├── Controls.tsx
│   │   ├── Volume.tsx
│   │   ├── SeekBar.tsx
│   │   ├── PlaybackSpeed.tsx
│   │   └── LoadingSpinner.tsx
│   ├── hooks/
│   │   └── useVideo.ts
│   ├── types/
│   │   └── video.ts
│   ├── styles/
│   │   └── player.css
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
🎨 Custom Styling
css
Copy
Edit
.rvp-video-player {
  --rvp-primary-color: #ff0000;
  --rvp-background-color: rgba(0, 0, 0, 0.8);
  --rvp-text-color: white;
  --rvp-border-radius: 8px;
}
🧠 Built Without
❌ No react-player
❌ No hls.js
❌ No video.js
❌ No external state managers
❌ No styling libraries

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📄 License
MIT License - see LICENSE file for details.

🔗 Links
GitHub Repository

NPM Package

Demo



