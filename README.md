# 🎥 @streamspark/react-video-player

<p align="center">
  <a href="https://www.npmjs.com/package/react-video-player">
    <img src="https://img.shields.io/npm/v/react-video-player.svg" alt="npm version" />
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
- ⏩ **Live seek drag** - YouTube-style real-time scrubbing
- 📺 Fullscreen toggle
- 🌐 Subtitle (.vtt) support
- 📝 **Custom draggable captions** with full styling control
- ⚙️ Playback speed control (0.25x – 2x)
- 🌓 Light & dark themes
- 📱 Fully responsive layout & mobile touch support
- 🎮 YouTube-style keyboard shortcuts
- ♿ Accessible (ARIA & screen reader friendly)
- 🎨 Themeable via CSS variables
- 🧱 No 3rd-party libraries – pure React

---

## ✨ What's New

### ⏩ **Live Seek Drag** *(NEW!)*
- **YouTube-style scrubbing** - drag the seek bar thumb for real-time seeking
- **Live video preview** - see video content as you drag through the timeline
- **Smooth interaction** - no delay between drag and video response
- **Cross-platform support** - works on both desktop and mobile devices
- **Enhanced visual feedback** - thumb grows during drag for better grip
- **Touch-friendly** - optimized for finger dragging on mobile devices

### 📝 **Custom Draggable Captions** *(NEW!)*
- **Fully customizable captions** with complete styling control
- **Drag & drop positioning** - move captions anywhere on the video
- **YouTube-like styling** - clean, unobtrusive appearance
- **Mobile touch support** - drag with finger on mobile devices
- **Boundary constraints** - captions stay within video player bounds
- **Timing control** - precise start/end times for each caption
- **Visual feedback** - hover effects and drag indicators

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

📦 [NPM](https://www.npmjs.com/package/react-smart-video-player): https://www.npmjs.com/package/react-smart-video-player

⚡ [Live Demo](https://stackblitz.com/github/arun59ay/react-video-player): https://stackblitz.com/github/arun59ay/react-video-player





## 📦 Installation

```bash
npm install react-video-player

You also need to import the default styles manually:

import 'react-video-player/dist/index.css';


import React from 'react';
import { VideoPlayer } from 'react-video-player';
import 'react-video-player/dist/index.css';

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

### 📝 Custom Draggable Captions

```tsx
import React from 'react';
import { VideoPlayer } from 'react-video-player';
import { CaptionConfig } from 'react-video-player';

const customCaptions: CaptionConfig[] = [
  {
    text: "🎬 Welcome to our video!",
    startTime: 0,
    endTime: 5,
    style: {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      position: 'bottom',
      padding: '8px 12px',
      borderRadius: '4px',
      fontWeight: 'bold'
    }
  },
  {
    text: "📱 Drag me anywhere!",
    startTime: 5,
    endTime: 10,
    style: {
      fontSize: '14px',
      color: '#ff6b6b',
      backgroundColor: 'rgba(255, 107, 107, 0.9)',
      position: 'top',
      padding: '6px 10px',
      borderRadius: '6px',
      textAlign: 'center'
    }
  }
];

const App = () => (
  <VideoPlayer
    src="/videos/sample.mp4"
    customCaptions={customCaptions}
    title="Custom Captions Demo"
    theme="dark"
    width="100%"
    height="400px"
  />
);
```

**CaptionConfig Interface:**
```tsx
interface CaptionConfig {
  text: string;                    // Caption text content
  startTime: number;               // Start time in seconds
  endTime: number;                 // End time in seconds
  style?: {
    fontSize?: string;             // Font size (e.g., '16px')
    fontFamily?: string;           // Font family
    color?: string;                // Text color
    backgroundColor?: string;      // Background color
    padding?: string;              // Padding (e.g., '8px 12px')
    borderRadius?: string;         // Border radius
    textAlign?: 'left' | 'center' | 'right';
    position?: 'bottom' | 'top';   // Default position
    margin?: string;               // Margin
    opacity?: number;              // Opacity (0-1)
    textShadow?: string;           // Text shadow
    fontWeight?: string | number;   // Font weight
    lineHeight?: string;           // Line height
    maxWidth?: string;             // Max width
    wordWrap?: 'break-word' | 'normal';
    zIndex?: number;               // Z-index
    border?: string;               // Border
    boxShadow?: string;            // Box shadow
  };
}
```

**Features:**
- ✅ **Drag & Drop**: Click and drag captions anywhere on the video
- ✅ **Mobile Touch**: Touch and drag on mobile devices  
- ✅ **Boundary Constraints**: Captions stay within video player bounds
- ✅ **Visual Feedback**: Hover effects and drag indicators
- ✅ **Position Memory**: Captions remember their position after dragging
- ✅ **Full Styling**: Complete control over appearance and positioning

### ⏩ Live Seek Drag

The video player includes YouTube-style live seek dragging for smooth video scrubbing:

```tsx
import React from 'react';
import { VideoPlayer } from 'react-video-player';

const App = () => (
  <VideoPlayer
    src="/videos/sample.mp4"
    title="Live Seek Demo"
    // Live seek drag is enabled by default
    // Just drag the seek bar thumb to scrub through the video
  />
);
```

**Live Seek Features:**
- ✅ **Real-time Scrubbing**: Drag the seek bar thumb to jump through video
- ✅ **Live Preview**: See video content as you drag through the timeline
- ✅ **Smooth Interaction**: No delay between drag and video response
- ✅ **Cross-platform**: Works on both desktop and mobile devices
- ✅ **Enhanced Feedback**: Thumb grows during drag for better grip
- ✅ **Touch Optimized**: Finger-friendly dragging on mobile devices

import React from 'react';
import { VideoPlayer } from 'react-video-player';
import 'react-video-player/dist/index.css';

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

| Prop            | Type                  | Default     | Description                         |
| --------------- | --------------------- | ----------- | ----------------------------------- |
| `src`           | `string`              | — *(req)*   | Video source URL                    |
| `poster`        | `string`              | `undefined` | Poster image                        |
| `captions`      | `string`              | `undefined` | WebVTT subtitles file               |
| `customCaptions`| `CaptionConfig[]`     | `undefined` | Custom draggable captions array    |
| `title`         | `string`              | `undefined` | Accessible title for screen readers |
| `theme`         | `'light' \| 'dark'`   | `'dark'`    | UI Theme                            |
| `autoplay`      | `boolean`             | `false`     | Autoplay on load                    |
| `loop`          | `boolean`             | `false`     | Loop the video                      |
| `muted`         | `boolean`             | `false`     | Mute by default                     |
| `controls`      | `boolean`             | `true`      | Show/hide player controls           |
| `width`         | `string` or `number`  | `'100%'`    | Custom player width                 |
| `height`        | `string` or `number`  | `'auto'`    | Custom player height                |
| `className`     | `string`              | `''`        | Custom class for the wrapper        |
| `style`         | `React.CSSProperties` | `{}`        | Inline styles                       |




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

react-video-player/
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
© 2025 – Arun

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

