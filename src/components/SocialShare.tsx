import { useState, memo, useCallback } from 'react';

interface SocialShareProps {
  url: string;
  title?: string;
  currentTime?: number;
  duration?: number;
  onShare?: (timestamp?: number) => void;
}

const ShareIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
));

export const SocialShare = memo<SocialShareProps>(({ url, title, currentTime, duration, onShare }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatTime = useCallback((time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const getShareUrl = useCallback((timestamp?: number): string => {
    const shareUrl = new URL(url, window.location.origin);
    if (timestamp !== undefined && timestamp > 0) {
      shareUrl.searchParams.set('t', Math.floor(timestamp).toString());
    }
    return shareUrl.toString();
  }, [url]);

  const handleShare = useCallback((platform: string, timestamp?: number) => {
    const shareUrl = getShareUrl(timestamp);
    const shareText = title || 'Check out this video';
    const timeText = timestamp && duration ? ` at ${formatTime(timestamp)}` : '';
    const fullText = `${shareText}${timeText}`;

    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(fullText)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert('Link copied to clipboard!');
        });
        onShare?.(timestamp);
        setShowMenu(false);
        return;
      case 'embed':
        const embedCode = `<iframe src="${shareUrl}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
        navigator.clipboard.writeText(embedCode).then(() => {
          alert('Embed code copied to clipboard!');
        });
        onShare?.(timestamp);
        setShowMenu(false);
        return;
      default:
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      onShare?.(timestamp);
      setShowMenu(false);
    }
  }, [getShareUrl, title, formatTime, duration, onShare]);

  return (
    <div 
      className="rvp-social-share"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button 
        className="rvp-control-btn rvp-share-btn"
        aria-label="Share video"
        title="Share"
      >
        <ShareIcon/>
        <span className="rvp-tooltip">Share</span>
      </button>
      
      <div className={`rvp-share-menu ${showMenu ? 'rvp-show' : ''}`}>
        <div className="rvp-share-menu-title">Share</div>
        <button
          className="rvp-share-option"
          onClick={() => handleShare('copy', currentTime)}
        >
          Copy link{currentTime ? ` (at ${formatTime(currentTime)})` : ''}
        </button>
        <button
          className="rvp-share-option"
          onClick={() => handleShare('twitter', currentTime)}
        >
          Twitter
        </button>
        <button
          className="rvp-share-option"
          onClick={() => handleShare('facebook', currentTime)}
        >
          Facebook
        </button>
        <button
          className="rvp-share-option"
          onClick={() => handleShare('linkedin', currentTime)}
        >
          LinkedIn
        </button>
        <button
          className="rvp-share-option"
          onClick={() => handleShare('embed', currentTime)}
        >
          Copy embed code
        </button>
      </div>
    </div>
  );
});

