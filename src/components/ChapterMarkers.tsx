import { memo, useCallback } from 'react';
import { Chapter } from '../types/video';

interface ChapterMarkersProps {
  chapters: Chapter[];
  duration: number;
  currentTime: number;
  onChapterClick: (chapterIndex: number) => void;
}

export const ChapterMarkers = memo<ChapterMarkersProps>(({ chapters, duration, currentTime, onChapterClick }) => {
  if (chapters.length === 0 || duration === 0) return null;

  const handleChapterClick = useCallback((index: number) => {
    onChapterClick(index);
  }, [onChapterClick]);

  const handleTouchStart = useCallback((e: React.TouchEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    handleChapterClick(index);
  }, [handleChapterClick]);

  return (
    <div className="rvp-chapter-markers">
      {chapters.map((chapter, index) => {
        const position = (chapter.startTime / duration) * 100;
        const isActive = currentTime >= chapter.startTime && currentTime <= chapter.endTime;
        
        return (
          <div
            key={index}
            className={`rvp-chapter-marker ${isActive ? 'rvp-active' : ''}`}
            style={{ left: `${position}%` }}
            onClick={() => handleChapterClick(index)}
            onTouchStart={(e) => handleTouchStart(e, index)}
            title={chapter.title}
            role="button"
            tabIndex={0}
            aria-label={`Chapter: ${chapter.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleChapterClick(index);
              }
            }}
          >
            <div className="rvp-chapter-marker-dot" />
            <div className="rvp-chapter-marker-tooltip">{chapter.title}</div>
          </div>
        );
      })}
    </div>
  );
});

