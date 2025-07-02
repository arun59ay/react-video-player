import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="rvp-video-loading">
      <div className="rvp-loading-spinner" aria-label="Loading video"></div>
    </div>
  );
};