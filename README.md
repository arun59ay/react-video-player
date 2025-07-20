# 🎥 @streamspark/react-video-player

<p align="center">
  <a href="https://www.npmjs.com/package/@streamspark/react-video-player">
    <img src="https://img.shields.io/npm/v/@streamspark/react-video-player.svg" alt="npm version" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
  </a>
  <a href="https://github.com/arun59ay/react-video-player/stargazers">
    <img src="https://img.shields.io/github/stars/arun59ay/react-video-player.svg?style=social" alt="Stars" />
  </a>
  <a href="https://github.com/arun59ay/react-video-player/issues">
    <img src="https://img.shields.io/github/issues/arun59ay/react-video-player.svg" alt="Issues" />
  </a>
  <a href="https://github.com/arun59ay/react-video-player/commits/main">
    <img src="https://img.shields.io/github/last-commit/arun59ay/react-video-player" alt="Last Commit" />
  </a>
</p>


A fully-featured, YouTube-like video player built completely from scratch using **React** and **TypeScript** — no third-party video libraries involved.

Perfect for developers looking for a **clean**, **minimal**, **extensible**, and **dependency-free** media player.

---

## ✅ Features

- 🎬 Custom play/pause/seek controls (with buffer indicator)
- 🔊 Volume control with mute & smooth slider behavior
- ⏩ Modern seek bar with time + hover support
- 📺 Fullscreen toggle
- 🌐 Subtitle (.vtt) support
- ⚙️ Playback speed control (0.25x – 2x)
- 🌓 Light & dark themes
- 📱 Fully responsive layout
- 🎮 YouTube-style keyboard shortcuts
- ♿ Accessible (ARIA & screen reader friendly)
- 🎨 Themeable via CSS variables
- 🧱 No 3rd-party libraries – pure React

---

## ✨ What’s New

### 🧠 Smarter Control Visibility  
- Controls remain visible while mouse is **anywhere** inside the player  
- Hide only when mouse leaves — like YouTube  
- No flickering or premature hide during interaction  

### 🔊 Volume Panel (Improved UX)  
- Click to open — no accidental hover changes  
- Auto hides when mouse leaves the panel  
- Smooth sliding and clear mute indicator  

### 🎞️ Seek Bar Preview (Optional)  
- Integrated `<canvas>` + `<video>` thumbnail preview  
- Works with sprite images or auto-generated previews  
- Fast and optimized  

### 📷 Instant Thumbnail Preview *(Optional)*
- Hover previews powered by `<video>` + `<canvas>`.
- Works with both **sprite frames** and **per-second captures**.
- Fully optimized for performance — previews load instantly.

---

## 🚀 Live Demo

Try it online (no setup required):  
👉 [StackBlitz Demo](https://stackblitz.com/github/arun59ay/react-video-player)

---

🔗 Links

🔧 [GitHub](https://github.com/arun59ay/react-video-player): https://github.com/arun59ay/react-video-player

📦 [NPM](https://www.npmjs.com/package/@streamspark/react-video-player): https://www.npmjs.com/package/@streamspark/react-video-player

⚡ [Live Demo](https://stackblitz.com/github/arun59ay/react-video-player): https://stackblitz.com/github/arun59ay/react-video-player





## 📦 Installation

```bash
npm install @streamspark/react-video-player

You also need to import the default styles manually:

import '@streamspark/react-video-player/dist/index.css';


import React from 'react';
import { VideoPlayer } from '@streamspark/react-video-player';
import '@streamspark/react-video-player/dist/index.css';

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
import '@streamspark/react-video-player/dist/index.css';

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


## 🎨 Styling (CSS Variables)

Override the look via your own styles:

```css
.rvp-video-player {
  --rvp-primary-color: #ff0000;
  --rvp-background-color: rgba(0, 0, 0, 0.85);
  --rvp-text-color: #fff;
  --rvp-border-radius: 10px;
}
```

---

## 🧩 Project Structure

@streamspark/react-video-player/
├── src/
│   ├── components/       # All modular player components
│   ├── hooks/            # Custom video hook
│   ├── types/            # Type definitions
│   ├── styles/           # CSS styles
│   └── index.ts          # Entry point
├── demo/                 # Vite + manual CSS demo project
├── dist/                 # Compiled output
├── package.json
├── tsconfig.json
└── README.md


## 🎨 Custom Styling
You can override styling using CSS variables:

.rvp-video-player {
  --rvp-primary-color: #ff0000;
  --rvp-background-color: rgba(0, 0, 0, 0.8);
  --rvp-text-color: white;
  --rvp-border-radius: 8px;
}


## ❌ Not Using

This package **does NOT depend on**:

- `react-player`
- `video.js`
- `hls.js`
- External UI frameworks
- Redux or global state

It’s written with **vanilla React**, **DOM APIs**, and **TypeScript** — fully maintainable and modular.

---

## 🤝 Contributing

We welcome feature suggestions, bug reports, and contributions!

- 📁 Clone the repo
- 💻 Create a feature branch
- ✅ Submit a PR

---

## 📄 License

MIT License  
© 2025 – Arun YT

---

Made with ❤️ and TypeScript by [Arun YT](https://github.com/arun59ay)

---

## 🌟 Feedback Welcome

If you like this project, **please consider giving it a star** ⭐ and leaving feedback through [GitHub Issues](https://github.com/arun59ay/react-video-player/issues).  
Your support helps keep this project actively maintained and improved.



---

## 📢 Discoverability Boost

To help more developers find and benefit from this project, it’s being submitted to:

- [awesome-react-components](https://github.com/brillout/awesome-react-components)
- [madewithreactjs.com](https://madewithreactjs.com/)
- [bestofjs.org](https://bestofjs.org/)

