import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  canvasId?: string;
  videoId?: string;
}

export const useVideoThumbnailPreview = ({
  src,
  canvasId = 'rvp-canvas',
  videoId = 'rvp-video',
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastTime = useRef<number>(-1);

  useEffect(() => {
    // 📦 Container
    const container = document.createElement('div');
    container.id = canvasId;
    Object.assign(container.style, {
      position: 'absolute',
      display: 'none',
      opacity: '0',
      transition: 'opacity 0.2s ease-in-out',
      pointerEvents: 'none',
      zIndex: '9999',
      borderRadius: '6px',
      overflow: 'hidden',
      background: '#000',
      boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
    });

    // 🖼️ Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 90;
    container.appendChild(canvas);

    // 🕒 Time Label
    const label = document.createElement('div');
    label.id = 'thumbnail-time';
    Object.assign(label.style, {
      position: 'absolute',
      bottom: '4px',
      right: '6px',
      padding: '1px 6px',
      fontSize: '12px',
      color: '#fff',
      background: 'rgba(0,0,0,0.7)',
      borderRadius: '3px',
      fontFamily: 'sans-serif',
    });
    container.appendChild(label);

    // ⏳ Spinner
    const spinner = document.createElement('div');
    spinner.className = 'rvp-spinner';
    Object.assign(spinner.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '24px',
      height: '24px',
      marginTop: '-12px',
      marginLeft: '-12px',
      border: '2px solid #ccc',
      borderTop: '2px solid #fff',
      borderRadius: '50%',
      animation: 'rvp-spin 0.6s linear infinite',
      display: 'none',
    });
    container.appendChild(spinner);

    document.body.appendChild(container);
    containerRef.current = container;

    // 🎞️ Video Element
    const video = document.createElement('video');
    video.src = src;
    video.id = videoId;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.style.display = 'none';
    document.body.appendChild(video);
    videoRef.current = video;

    // Prime the video
    video.play().catch(() => {});
    video.pause();

    return () => {
      container.remove();
      video.remove();
    };
  }, [src]);

  const handlePreview = (e: React.MouseEvent<HTMLDivElement>, duration: number) => {
    const container = containerRef.current!;
    const canvas = container.querySelector('canvas')!;
    const label = container.querySelector('#thumbnail-time')!;
    const ctx = canvas.getContext('2d');
    const video = videoRef.current!;
    const spinner = container.querySelector('.rvp-spinner') as HTMLDivElement;

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = offsetX / rect.width;
    const previewTime = percent * duration;

    // Only seek if significant change
    if (Math.abs(previewTime - lastTime.current) < 0.2) return;
    lastTime.current = previewTime;

    // Show spinner only if frame not ready
    if (video.readyState < 2) {
      spinner.style.display = 'block';
    }

    video.currentTime = previewTime;

    const canvasX = e.pageX - canvas.width / 2;
    const canvasY = rect.top + window.scrollY - canvas.height - 12;
    Object.assign(container.style, {
      left: `${canvasX}px`,
      top: `${canvasY}px`,
      display: 'block',
      opacity: '1',
    });

    // Use video callback if supported
    if ('requestVideoFrameCallback' in video) {
      (video as any).requestVideoFrameCallback(() => {
        try {
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          label.textContent = formatTime(previewTime);
          spinner.style.display = 'none';
        } catch {}
      });
    } else {
      (video as HTMLVideoElement).addEventListener('seeked', () => {
          setTimeout(() => {
            try {
              ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
              label.textContent = formatTime(previewTime);
              spinner.style.display = 'none';
            } catch {}
          }, 80);
        },
        { once: true }
      );
    }
  };

  const hidePreview = () => {
    const container = containerRef.current!;
    const spinner = container.querySelector('.rvp-spinner') as HTMLDivElement;
    container.style.opacity = '0';
    spinner.style.display = 'none';
    setTimeout(() => {
      container.style.display = 'none';
    }, 200);
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60).toString();
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return { handlePreview, hidePreview };
};
