import * as React from 'react';
import { cn } from '../../lib/utils';

export interface StreamingTextProps {
  text: string;
  isStreaming?: boolean;
  speed?: 'slow' | 'normal' | 'fast' | 'instant';
  showCursor?: boolean;
  cursorStyle?: 'block' | 'line' | 'underscore';
  className?: string;
  onComplete?: () => void;
}

const speedMap = {
  slow: 50,
  normal: 25,
  fast: 10,
  instant: 0,
};

const cursorMap = {
  block: '█',
  line: '|',
  underscore: '_',
};

const StreamingText: React.FC<StreamingTextProps> = ({
  text,
  isStreaming = false,
  speed = 'normal',
  showCursor = true,
  cursorStyle = 'block',
  className,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (speed === 'instant' || !isStreaming) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      return;
    }

    setIsAnimating(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          setIsAnimating(false);
          onComplete?.();
          return prev;
        }
        return prev + 1;
      });
    }, speedMap[speed]);

    return () => clearInterval(interval);
  }, [text, speed, isStreaming, onComplete]);

  React.useEffect(() => {
    setDisplayedText(text.slice(0, currentIndex));
  }, [text, currentIndex]);

  // Reset when text changes
  React.useEffect(() => {
    if (isStreaming) {
      setCurrentIndex(0);
      setDisplayedText('');
    }
  }, [text, isStreaming]);

  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      {displayedText}
      {showCursor && (isStreaming || isAnimating) && (
        <span className="animate-pulse text-[var(--semantic-color-primary-default)]">
          {cursorMap[cursorStyle]}
        </span>
      )}
    </span>
  );
};

export { StreamingText };
