import React from 'react';
import { VideoPlayer } from './src/components/VideoPlayer';
import { CaptionConfig } from './src/types/video';

// Example usage of custom captions
const CaptionExample: React.FC = () => {
  // Define custom captions with different styling options
  const customCaptions: CaptionConfig[] = [
    {
      text: "Welcome to our video!",
      startTime: 0,
      endTime: 3,
      style: {
        fontSize: '20px',
        color: '#ff6b6b',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        fontWeight: 'bold',
        position: 'top'
      }
    },
    {
      text: "This is a customizable caption\nwith multiple lines",
      startTime: 3,
      endTime: 6,
      style: {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        textAlign: 'center',
        position: 'bottom',
        padding: '12px 16px',
        borderRadius: '8px'
      }
    },
    {
      text: "You can style captions however you want!",
      startTime: 6,
      endTime: 9,
      style: {
        fontSize: '18px',
        color: '#4ecdc4',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',
        fontWeight: '600',
        position: 'bottom',
        padding: '10px 20px',
        borderRadius: '12px',
        maxWidth: '70%'
      }
    },
    {
      text: "Different styles for different moments",
      startTime: 9,
      endTime: 12,
      style: {
        fontSize: '14px',
        color: '#f39c12',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'left',
        position: 'top',
        padding: '8px 12px',
        borderRadius: '4px',
        opacity: 0.9
      }
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Custom Captions Example</h2>
      <VideoPlayer
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        title="Custom Captions Demo"
        customCaptions={customCaptions}
        controls={true}
        width="100%"
        height="400px"
      />
      
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Caption Configuration Options:</h3>
        <ul>
          <li><strong>text:</strong> The caption text to display</li>
          <li><strong>startTime/endTime:</strong> When to show/hide the caption (in seconds)</li>
          <li><strong>style:</strong> Custom styling options including:
            <ul>
              <li>fontSize, fontFamily, color</li>
              <li>backgroundColor, padding, borderRadius</li>
              <li>textAlign, position (top/bottom)</li>
              <li>opacity, textShadow, fontWeight</li>
              <li>lineHeight, maxWidth, wordWrap</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CaptionExample;
