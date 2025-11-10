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
- 🎨 **Complete control customization** - show/hide and style any control
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

### 🎨 **Complete Control Customization** *(NEW!)*
- **Full control visibility** - show/hide any control individually
- **Complete styling control** - customize every aspect of the player's appearance
- **Button styles** - customize play, volume, and all control buttons
- **Seek bar customization** - control colors, sizes, and hover effects
- **Volume slider styling** - customize width, colors, and thumb appearance
- **Time display styling** - control fonts, colors, backgrounds, and effects
- **Menu customization** - style playback speed, quality, and share menus
- **Tooltip styling** - customize tooltip appearance and delays
- **CSS variables support** - use CSS variables for advanced customization
- **TypeScript interfaces** - full type safety for all customization options

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

### 📝 Basic Usage Example

```tsx
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
```


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

### Basic Props

| Prop            | Type                  | Default     | Description                         |
| --------------- | --------------------- | ----------- | ----------------------------------- |
| `src`           | `string \| string[] \| PlaylistItem[]` | — *(req)*   | Video source URL(s) or playlist     |
| `poster`        | `string`              | `undefined` | Poster image                        |
| `captions`      | `string \| SubtitleTrack[]` | `undefined` | WebVTT subtitles file or array      |
| `customCaptions`| `CaptionConfig[]`     | `undefined` | Custom draggable captions array    |
| `title`         | `string`              | `undefined` | Accessible title for screen readers |
| `description`   | `string`              | `undefined` | Video description                   |
| `theme`         | `'light' \| 'dark'`   | `'dark'`    | UI Theme                            |
| `autoplay`      | `boolean`             | `false`     | Autoplay on load                    |
| `loop`          | `boolean`             | `false`     | Loop the video                      |
| `muted`         | `boolean`             | `false`     | Mute by default                     |
| `controls`      | `boolean`             | `true`      | Show/hide player controls           |
| `width`         | `string \| number`  | `'100%'`    | Custom player width                 |
| `height`        | `string \| number`  | `'auto'`    | Custom player height                |
| `className`     | `string`              | `''`        | Custom class for the wrapper        |
| `style`         | `React.CSSProperties` | `{}`        | Inline styles                       |

### Advanced Props

| Prop                    | Type                  | Default     | Description                         |
| ----------------------- | --------------------- | ----------- | ----------------------------------- |
| `chapters`              | `Chapter[]`           | `undefined` | Video chapters array                |
| `qualities`             | `VideoQuality[]`      | `undefined` | Video quality options               |
| `enablePictureInPicture`| `boolean`             | `true`      | Enable Picture-in-Picture mode      |
| `enableTheaterMode`     | `boolean`             | `true`      | Enable Theater mode                 |
| `enableAnalytics`       | `boolean`             | `false`     | Enable analytics tracking           |
| `enableSocialShare`     | `boolean`             | `true`      | Enable social sharing               |
| `enableKeyboardShortcuts`| `boolean`            | `true`      | Enable keyboard shortcuts           |
| `showKeyboardShortcutsHelp`| `boolean`         | `false`     | Show keyboard shortcuts help        |
| `theaterMode`           | `boolean`             | `false`     | Initial theater mode state          |
| `controlOptions`        | `ControlOptions`      | `undefined` | Control customization options       |




🧠 Event Callbacks

| Callback            | Type                       | Description                    |
| ------------------- | -------------------------- | ------------------------------ |
| `onPlay`            | `() => void`               | Triggered when playback starts |
| `onPause`           | `() => void`               | Triggered when paused          |
| `onTimeUpdate`      | `(time: number) => void`   | On time change during playback |
| `onVolumeChange`    | `(volume: number) => void` | On volume update               |
| `onSeek`            | `(time: number) => void`   | When seeking is done           |
| `onEnded`           | `() => void`               | When video ends                |
| `onError`          | `(error: string) => void`  | If video load/playback fails   |
| `onChapterChange`  | `(chapter: Chapter) => void`| When chapter changes           |
| `onQualityChange`  | `(quality: string) => void`| When quality changes           |
| `onSubtitleChange` | `(language: string) => void`| When subtitle language changes |
| `onPlaylistItemChange` | `(index: number, item: PlaylistItem) => void` | When playlist item changes |
| `onAnalyticsUpdate` | `(data: AnalyticsData) => void` | Analytics data update      |
| `onShare`          | `(timestamp?: number) => void` | When video is shared      |


## 🎨 Customization

The video player offers extensive customization options through the `controlOptions` prop, allowing you to control visibility, styling, and behavior of all controls.

### Control Options

The `controlOptions` prop provides complete control over the player's appearance and functionality:

```tsx
import { VideoPlayer, ControlOptions } from 'react-video-player';

const controlOptions: ControlOptions = {
  // Visibility toggles
  showPlayButton: true,
  showVolumeControl: true,
  showTimeDisplay: true,
  showSeekBar: true,
  showPlaybackSpeed: true,
  showQualitySelector: true,
  showCaptionsButton: true,
  showFullscreenButton: true,
  showPictureInPictureButton: true,
  showTheaterModeButton: true,
  showSocialShare: true,
  showChapterMarkers: true,

  // Button styles
  playButtonStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    hoverBackgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    borderRadius: '50%',
    width: '48px',
    height: '48px'
  },

  volumeButtonStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    hoverBackgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    borderRadius: '50%'
  },

  controlButtonStyle: {
    backgroundColor: 'transparent',
    hoverBackgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '8px',
    width: '44px',
    height: '44px'
  },

  // Seek bar styles
  seekBarStyle: {
    height: '8px',
    hoverHeight: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    playedColor: '#ff0000',
    bufferedColor: 'rgba(255, 255, 255, 0.4)',
    thumbColor: '#ff0000',
    thumbSize: '16px',
    hoverThumbSize: '22px',
    borderRadius: '4px'
  },

  // Volume slider styles
  volumeSliderStyle: {
    width: '120px',
    height: '44px',
    backgroundColor: 'transparent',
    fillColor: '#ff0000',
    thumbColor: 'white',
    thumbSize: '14px',
    borderRadius: '22px'
  },

  // Time display styles
  timeDisplayStyle: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px) saturate(180%)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    padding: '4px 8px',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
  },

  // Controls bar styles
  controlsBarStyle: {
    backgroundColor: 'transparent',
    padding: '0',
    gap: '12px',
    borderRadius: '0',
    height: '44px',
    minHeight: '44px'
  },

  // Tooltip styles
  tooltipStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    fontSize: '12px',
    fontWeight: 500,
    padding: '6px 10px',
    borderRadius: '4px',
    showDelay: 500,
    hideDelay: 0
  },

  // Menu styles
  playbackSpeedMenuStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px) saturate(180%)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '8px',
    fontSize: '14px',
    color: 'white',
    textShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 2px'
  },

  qualityMenuStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px) saturate(180%)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '8px',
    fontSize: '14px',
    color: 'white',
    textShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 2px'
  },

  shareMenuStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px) saturate(180%)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '8px',
    fontSize: '14px',
    color: 'white',
    textShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 2px'
  },

  // Custom CSS variables (for advanced customization)
  customCSSVariables: {
    'custom-color': '#ff0000',
    'custom-size': '20px'
  }
};

const App = () => (
  <VideoPlayer
    src="/videos/sample.mp4"
    controlOptions={controlOptions}
  />
);
```

### Control Options Interface

```tsx
interface ControlOptions {
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

interface ControlButtonStyle {
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

interface ControlMenuStyle {
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
```

### Example: Minimal Player

Create a minimal player with only essential controls:

```tsx
<VideoPlayer
  src="/videos/sample.mp4"
  controlOptions={{
    showPlayButton: true,
    showVolumeControl: true,
    showTimeDisplay: true,
    showSeekBar: true,
    showPlaybackSpeed: false,
    showQualitySelector: false,
    showCaptionsButton: false,
    showFullscreenButton: true,
    showPictureInPictureButton: false,
    showTheaterModeButton: false,
    showSocialShare: false,
    showChapterMarkers: false
  }}
/>
```

### Example: Custom Styled Player

Customize the appearance to match your brand:

```tsx
<VideoPlayer
  src="/videos/sample.mp4"
  controlOptions={{
    playButtonStyle: {
      backgroundColor: 'rgba(255, 0, 0, 0.8)',
      hoverBackgroundColor: 'rgba(255, 0, 0, 1)',
      borderRadius: '50%',
      width: '56px',
      height: '56px'
    },
    seekBarStyle: {
      height: '10px',
      hoverHeight: '16px',
      playedColor: '#ff0000',
      thumbColor: '#ff0000',
      thumbSize: '18px',
      hoverThumbSize: '24px'
    },
    timeDisplayStyle: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#ffffff',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '8px',
      padding: '6px 12px'
    }
  }}
/>
```

### CSS Variables

You can also customize the player using CSS variables directly:

```css
.rvp-video-player {
  /* Play Button */
  --rvp-play-btn-bg: rgba(0, 0, 0, 0.5);
  --rvp-play-btn-hover-bg: rgba(0, 0, 0, 0.9);
  --rvp-play-btn-color: white;
  --rvp-play-btn-radius: 50%;
  --rvp-play-btn-width: 48px;
  --rvp-play-btn-height: 48px;

  /* Seek Bar */
  --rvp-seekbar-height: 8px;
  --rvp-seekbar-hover-height: 14px;
  --rvp-seekbar-played: #ff0000;
  --rvp-seekbar-thumb: #ff0000;
  --rvp-seekbar-thumb-size: 16px;
  --rvp-seekbar-thumb-hover-size: 22px;

  /* Volume Slider */
  --rvp-volume-slider-width: 120px;
  --rvp-volume-slider-fill: #ff0000;
  --rvp-volume-slider-thumb: white;

  /* Time Display */
  --rvp-time-font-size: 14px;
  --rvp-time-color: white;
  --rvp-time-bg: rgba(0, 0, 0, 0.5);

  /* Tooltip */
  --rvp-tooltip-bg: rgba(0, 0, 0, 0.9);
  --rvp-tooltip-color: white;
  --rvp-tooltip-font-size: 12px;
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


## 📚 Additional Examples

### Quality Selection

```tsx
import { VideoPlayer, VideoQuality } from 'react-video-player';

const qualities: VideoQuality[] = [
  { label: '1080p', value: '1080p', src: '/videos/sample-1080p.mp4' },
  { label: '720p', value: '720p', src: '/videos/sample-720p.mp4' },
  { label: '480p', value: '480p', src: '/videos/sample-480p.mp4' },
  { label: '360p', value: '360p', src: '/videos/sample-360p.mp4' }
];

const App = () => (
  <VideoPlayer
    src="/videos/sample.mp4"
    qualities={qualities}
    onQualityChange={(quality) => console.log('Quality changed to:', quality)}
  />
);
```

### Chapters Support

```tsx
import { VideoPlayer, Chapter } from 'react-video-player';

const chapters: Chapter[] = [
  { title: 'Introduction', startTime: 0, endTime: 30 },
  { title: 'Main Content', startTime: 30, endTime: 120 },
  { title: 'Conclusion', startTime: 120, endTime: 150 }
];

const App = () => (
  <VideoPlayer
    src="/videos/sample.mp4"
    chapters={chapters}
    onChapterChange={(chapter) => console.log('Chapter:', chapter.title)}
  />
);
```

### Playlist Support

```tsx
import { VideoPlayer, PlaylistItem } from 'react-video-player';

const playlist: PlaylistItem[] = [
  { src: '/videos/video1.mp4', title: 'Video 1', poster: '/posters/video1.jpg' },
  { src: '/videos/video2.mp4', title: 'Video 2', poster: '/posters/video2.jpg' },
  { src: '/videos/video3.mp4', title: 'Video 3', poster: '/posters/video3.jpg' }
];

const App = () => (
  <VideoPlayer
    src={playlist}
    onPlaylistItemChange={(index, item) => {
      console.log('Playing:', item.title, 'at index:', index);
    }}
  />
);
```


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

