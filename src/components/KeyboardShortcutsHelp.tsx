import { memo } from 'react';

interface KeyboardShortcutsHelpProps {
  isVisible: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsHelp = memo<KeyboardShortcutsHelpProps>(({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const shortcuts = [
    { key: 'Space / K', action: 'Play / Pause' },
    { key: '← / J', action: 'Seek backward 10s' },
    { key: '→ / L', action: 'Seek forward 10s' },
    { key: '↑', action: 'Volume up' },
    { key: '↓', action: 'Volume down' },
    { key: 'M', action: 'Mute / Unmute' },
    { key: 'F', action: 'Fullscreen' },
    { key: 'I', action: 'Picture-in-Picture' },
    { key: 'C', action: 'Toggle captions' },
    { key: 'T', action: 'Theater mode' },
    { key: '0-9', action: 'Seek to percentage (0% - 90%)' },
    { key: 'Shift + ,', action: 'Decrease playback speed' },
    { key: 'Shift + .', action: 'Increase playback speed' },
    { key: 'Home', action: 'Go to start' },
    { key: 'End', action: 'Go to end' },
    { key: '?', action: 'Show / Hide this help' },
  ];

  return (
    <div 
      className="rvp-keyboard-shortcuts-help"
      onClick={onClose}
      role="dialog"
      aria-label="Keyboard Shortcuts Help"
      aria-modal="true"
    >
      <div className="rvp-keyboard-shortcuts-content" onClick={(e) => e.stopPropagation()}>
        <div className="rvp-keyboard-shortcuts-header">
          <h3>Keyboard Shortcuts</h3>
          <button 
            className="rvp-close-btn"
            onClick={onClose}
            aria-label="Close keyboard shortcuts help"
          >
            ×
          </button>
        </div>
        <div className="rvp-keyboard-shortcuts-list">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="rvp-shortcut-item">
              <div className="rvp-shortcut-keys">
                {shortcut.key.split(' / ').map((key, i) => (
                  <kbd key={i} className="rvp-key">{key}</kbd>
                ))}
              </div>
              <div className="rvp-shortcut-action">{shortcut.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

