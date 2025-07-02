# 🎥 @streamspark/react-video-player

A fully-featured, YouTube-like video player built completely from scratch using **React** and **TypeScript** — no third-party video libraries involved.

Perfect for developers looking for a **clean**, **minimal**, **extensible**, and **dependency-free** media player.

---

## ✅ Features

- 🎬 Custom Play/Pause/Seek Controls (with buffering indicator)  
- 🔊 Volume Control (with mute toggle)  
- ⏩ Enhanced Seek Bar (with time and buffer display)  
- ⚙️ Playback Speed Adjustment (0.25x to 2x)  
- 🌐 Subtitles Support (.vtt WebVTT format)  
- 📺 Fullscreen Toggle  
- 🌓 Light & Dark Themes  
- 📱 Responsive Layout (mobile-friendly)  
- 🎮 YouTube-like Keyboard Shortcuts  
- 🎯 TypeScript Support (fully typed with IntelliSense)  
- ♿ Accessibility (ARIA + Screen Reader support)  
- 🎨 Easy Styling via CSS Variables  
- 📦 Zero Dependencies (only React + Lucide icons)

---

## 🚀 Live Demo

Try it online (no setup required):  
👉 [StackBlitz Demo](https://stackblitz.com/github/arun59ay/react-video-player)

---

🔗 Links

🔧 [GitHub](https://github.com/arun59ay/react-video-player): https://github.com/arun59ay/react-video-player

📦 [NPM](https://www.npmjs.com/package/@streamspark/react-video-player): https://www.npmjs.com/package/@streamspark/react-video-player

⚡ [Live Demo](https://stackblitz.com/github/arun59ay/react-video-player): https://stackblitz.com/github/arun59ay/react-video-player

 <a href="https://stackblitz.com/github/arun59ay/react-video-player?embed=1&file=src/App.tsx&view=preview" target="_blank" rel="noopener noreferrer">⚡ Live Preview</a>

 [![Open in StackBlitz](https://img.shields.io/badge/Open%20in-StackBlitz-blue?logo=stackblitz)](https://stackblitz.com/github/arun59ay/react-video-player?embed=1&file=src/App.tsx&view=preview)




## 📦 Installation

```bash
npm install @streamspark/react-video-player

import React from 'react';
import { VideoPlayer } from '@streamspark/react-video-player';

export default function App() {
  return (
    <VideoPlayer
      src="/videos/sample.mp4"
      poster="/images/thumb.jpg"
      title="Demo Player"
      theme="dark"
    />
  );
}


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
    onTimeUpdate={(time) => console.log('Time:', time)}
    onVolumeChange={(vol) => console.log('Volume:', vol)}
    onSeek={(time) => console.log('Seeked to:', time)}
    onEnded={() => console.log('Ended')}
    onError={(err) => console.error('Error:', err)}
  />
);


🎮 Keyboard Shortcuts

| Action            | Keys      |
| ----------------- | --------- |
| Play / Pause      | Space / K |
| Seek -10s         | ← / J     |
| Seek +10s         | → / L     |
| Volume Up         | ↑         |
| Volume Down       | ↓         |
| Mute / Unmute     | M         |
| Fullscreen Toggle | F         |
| Speed Down        | Shift + , |
| Speed Up          | Shift + . |
| Go to Start       | Home      |
| Go to End         | End       |




📋 Props API

| Prop        | Type                  | Default     | Description                         |
| ----------- | --------------------- | ----------- | ----------------------------------- |
| `src`       | `string`              | — *(req)*   | Video source URL                    |
| `poster`    | `string`              | `undefined` | Poster image                        |
| `captions`  | `string`              | `undefined` | WebVTT subtitles file               |
| `title`     | `string`              | `undefined` | Accessible title for screen readers |
| `theme`     | `'light' \| 'dark'`   | `'dark'`    | UI Theme                            |
| `autoplay`  | `boolean`             | `false`     | Autoplay on load                    |
| `loop`      | `boolean`             | `false`     | Loop the video                      |
| `muted`     | `boolean`             | `false`     | Mute by default                     |
| `controls`  | `boolean`             | `true`      | Show/hide player controls           |
| `width`     | `string` or `number`  | `'100%'`    | Custom player width                 |
| `height`    | `string` or `number`  | `'auto'`    | Custom player height                |
| `className` | `string`              | `''`        | Custom class for the wrapper        |
| `style`     | `React.CSSProperties` | `{}`        | Inline styles                       |




🧠 Event Callbacks

| Callback         | Type                       | Description                    |
| ---------------- | -------------------------- | ------------------------------ |
| `onPlay`         | `() => void`               | Triggered when playback starts |
| `onPause`        | `() => void`               | Triggered when paused          |
| `onTimeUpdate`   | `(time: number) => void`   | On time change during playback |
| `onVolumeChange` | `(volume: number) => void` | On volume update               |
| `onSeek`         | `(time: number) => void`   | When seeking is done           |
| `onEnded`        | `() => void`               | When video ends                |
| `onError`        | `(error: string) => void`  | If video load/playback fails   |



🧩 Project Structure

@streamspark/react-video-player/
├── src/
│   ├── components/       # All modular player components
│   ├── hooks/            # Custom video hook
│   ├── types/            # Type definitions
│   ├── styles/           # CSS styles
│   └── index.ts          # Entry point
├── demo/                 # Vite + Tailwind demo project
├── dist/                 # Compiled output
├── package.json
├── tsconfig.json
└── README.md


🎨 Custom Styling
You can override styling using CSS variables:

.rvp-video-player {
  --rvp-primary-color: #ff0000;
  --rvp-background-color: rgba(0, 0, 0, 0.8);
  --rvp-text-color: white;
  --rvp-border-radius: 8px;
}

🚫 Built Without
❌ react-player

❌ hls.js

❌ video.js

❌ External state libraries

❌ UI frameworks

All features built from scratch using native DOM APIs + React + Tailwind.

🤝 Contributing
Found a bug or want to add a feature?
We welcome contributions — PRs and issues are appreciated!

📄 License
MIT License — See LICENSE for details.

---

Made with ❤️ by Arun YT
