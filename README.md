# @streamspark/react-video-player

A fully-featured, YouTube-like video player built completely from scratch using **React** and **TypeScript** — no third-party libraries involved.

Ideal for developers who want a clean, minimal, extensible, and dependency-free media player for their React applications.

---

## ✅ Features

- 🎬 **Custom Controls** – Play, Pause, Seek with buffering indicator  
- 🔇 **Volume Control** – Slider with mute toggle  
- ⏩ **Enhanced Seek Bar** – Current time, total duration & buffered progress  
- ⚙️ **Playback Speed** – 0.25x to 2x in steps  
- 🌐 **Subtitles Support** – WebVTT (.vtt) tracks  
- 📺 **Fullscreen Toggle** – Native fullscreen  
- 🌓 **Light/Dark Themes** – Easily switchable themes  
- 📱 **Responsive Layout** – Works on all devices  
- 🧠 **Keyboard Shortcuts** – Full YouTube-style controls  
- 🎯 **TypeScript Support** – Full typings + IntelliSense  
- ♿ **Accessibility** – ARIA labels, screen reader support  
- 🎨 **Custom Styling** – Easily style via CSS variables  
- 📦 **Zero Dependencies** – No libraries except React & Lucide icons

---

## 🚀 Live Demo

Try it instantly on StackBlitz (no setup needed):  
👉 [https://stackblitz.com/github/arun59ay/react-video-player](https://stackblitz.com/github/arun59ay/react-video-player)

---

## 📦 Installation

```bash
npm install @streamspark/react-video-player
🛠 Basic Usage
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
🔧 Advanced Usage
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
🎮 Keyboard Shortcuts
Action	Keys
Play / Pause	Space or K
Seek -10s	← or J
Seek +10s	→ or L
Volume Up	↑
Volume Down	↓
Mute / Unmute	M
Fullscreen Toggle	F
Decrease Speed	Shift + ,
Increase Speed	Shift + .
Jump to Start	Home
Jump to End	End

📋 Props API
Prop	Type	Default	Description
src	string	required	Video source URL
poster	string	undefined	Poster image
captions	string	undefined	Subtitles (.vtt)
title	string	undefined	Title for accessibility
theme	'light' | 'dark'	'dark'	Player theme
autoplay	boolean	false	Auto-play the video
loop	boolean	false	Loop playback
muted	boolean	false	Start muted
controls	boolean	true	Show/hide controls
width	string | number	'100%'	Custom width
height	string | number	'auto'	Custom height
className	string	''	Additional CSS class
style	React.CSSProperties	{}	Inline styles

🎯 Event Callbacks
Callback	Type	Description
onPlay	() => void	Called when video plays
onPause	() => void	Called when paused
onTimeUpdate	(time: number) => void	Called during time change
onVolumeChange	(volume: number) => void	Called on volume change
onSeek	(time: number) => void	Called when user seeks
onEnded	() => void	Called when video ends
onError	(error: string) => void	Called on video error

📁 Project Structure
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
Use CSS variables to customize the player:

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
❌ react-player

❌ hls.js

❌ video.js

❌ external state managers

❌ UI libraries

Everything is crafted using React, native browser APIs, and vanilla CSS.

🤝 Contributing
Contributions are welcome! Please feel free to open issues or submit pull requests.

📄 License
MIT License — see LICENSE file for full details.

🔗 Links
🧠 GitHub: github.com/arun59ay/react-video-player

📦 NPM: npmjs.com/package/@streamspark/react-video-player

⚡ Live Demo: stackblitz.com/github/arun59ay/react-video-player

Made with ❤️ by Arun YT

yaml
Copy
Edit
