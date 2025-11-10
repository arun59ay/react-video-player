import { memo } from 'react';

export const LoadingSpinner = memo(() => {
  return (
    <div className="rvp-video-loading">
      <div className="rvp-loading-spinner" aria-label="Loading video"></div>
    </div>
  );
});