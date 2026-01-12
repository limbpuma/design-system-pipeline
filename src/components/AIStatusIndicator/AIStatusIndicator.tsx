import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * AIStatusIndicator Component
 *
 * A professional status indicator for AI operations with rich visual feedback.
 * Features multiple presentation styles, smooth animations, and clear status communication.
 *
 * @accessibility
 * - ARIA live regions for status announcements
 * - Screen reader friendly labels
 * - Color-independent status indication via icons
 * - High contrast mode support
 */

const indicatorVariants = cva(
  'inline-flex items-center gap-2 font-medium transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type AIStatus = 'idle' | 'connecting' | 'processing' | 'analyzing' | 'success' | 'error' | 'warning';

export interface AIStatusIndicatorProps extends VariantProps<typeof indicatorVariants> {
  /** Current status */
  status: AIStatus;
  /** Custom label */
  label?: string;
  /** Progress percentage (0-100) */
  progress?: number;
  /** Show animations */
  animated?: boolean;
  /** Display style */
  variant?: 'inline' | 'badge' | 'card' | 'minimal';
  /** Show progress bar */
  showProgress?: boolean;
  /** Additional details text */
  details?: string;
  /** Additional class */
  className?: string;
}

interface StatusConfig {
  icon: React.ReactNode;
  label: string;
  colors: {
    text: string;
    bg: string;
    border: string;
    dot: string;
    progress: string;
  };
}

const getStatusConfig = (status: AIStatus, animated: boolean): StatusConfig => {
  const configs: Record<AIStatus, StatusConfig> = {
    idle: {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M12 8v4l2 2" />
        </svg>
      ),
      label: 'Ready',
      colors: {
        text: 'text-slate-600 dark:text-slate-400',
        bg: 'bg-slate-100 dark:bg-slate-800',
        border: 'border-slate-200 dark:border-slate-700',
        dot: 'bg-slate-400',
        progress: 'bg-slate-400',
      },
    },
    connecting: {
      icon: (
        <svg className={cn('w-4 h-4', animated && 'animate-pulse')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
        </svg>
      ),
      label: 'Connecting',
      colors: {
        text: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        dot: 'bg-blue-500',
        progress: 'bg-blue-500',
      },
    },
    processing: {
      icon: (
        <svg className={cn('w-4 h-4', animated && 'animate-spin')} viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ),
      label: 'Processing',
      colors: {
        text: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        dot: 'bg-blue-500',
        progress: 'bg-blue-500',
      },
    },
    analyzing: {
      icon: (
        <svg className={cn('w-4 h-4', animated && 'animate-pulse')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
      label: 'Analyzing',
      colors: {
        text: 'text-violet-600 dark:text-violet-400',
        bg: 'bg-violet-50 dark:bg-violet-900/20',
        border: 'border-violet-200 dark:border-violet-800',
        dot: 'bg-violet-500',
        progress: 'bg-violet-500',
      },
    },
    success: {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Complete',
      colors: {
        text: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        border: 'border-emerald-200 dark:border-emerald-800',
        dot: 'bg-emerald-500',
        progress: 'bg-emerald-500',
      },
    },
    error: {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      ),
      label: 'Error',
      colors: {
        text: 'text-red-600 dark:text-red-400',
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-800',
        dot: 'bg-red-500',
        progress: 'bg-red-500',
      },
    },
    warning: {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      label: 'Warning',
      colors: {
        text: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800',
        dot: 'bg-amber-500',
        progress: 'bg-amber-500',
      },
    },
  };

  return configs[status];
};

// Animated dot
const PulsingDot: React.FC<{ color: string; animated?: boolean }> = ({ color, animated }) => (
  <span className="relative flex h-2.5 w-2.5">
    {animated && (
      <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping', color)} />
    )}
    <span className={cn('relative inline-flex rounded-full h-2.5 w-2.5', color)} />
  </span>
);

// Circular progress
const CircularProgress: React.FC<{ progress: number; size?: number; color: string }> = ({
  progress,
  size = 20,
  color,
}) => {
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('transition-all duration-500 ease-out', color)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">
        {progress}
      </span>
    </div>
  );
};

// Linear progress bar
const ProgressBar: React.FC<{ progress: number; color: string }> = ({ progress, color }) => (
  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
    <div
      className={cn('h-full rounded-full transition-all duration-500 ease-out', color)}
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  </div>
);

export function AIStatusIndicator({
  status,
  label,
  progress,
  animated = true,
  variant = 'inline',
  showProgress = false,
  details,
  size,
  className,
}: AIStatusIndicatorProps) {
  const config = getStatusConfig(status, animated);
  const displayLabel = label || config.label;
  const isActive = ['connecting', 'processing', 'analyzing'].includes(status);

  // Minimal variant - just an icon with tooltip
  if (variant === 'minimal') {
    return (
      <div
        className={cn(indicatorVariants({ size }), config.colors.text, className)}
        role="status"
        aria-live="polite"
        aria-label={displayLabel}
        title={displayLabel}
      >
        {config.icon}
      </div>
    );
  }

  // Badge variant
  if (variant === 'badge') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-2 py-1.5 px-3 rounded-full font-medium',
          'border transition-all duration-300',
          config.colors.bg,
          config.colors.border,
          config.colors.text,
          size === 'sm' && 'text-xs py-1 px-2',
          size === 'lg' && 'text-base py-2 px-4',
          className
        )}
        role="status"
        aria-live="polite"
      >
        <PulsingDot color={config.colors.dot} animated={animated && isActive} />
        <span>{displayLabel}</span>
        {progress !== undefined && (
          <span className="opacity-70 tabular-nums">{progress}%</span>
        )}
      </span>
    );
  }

  // Card variant - full featured
  if (variant === 'card') {
    return (
      <div
        className={cn(
          'rounded-xl border p-4 transition-all duration-300',
          config.colors.bg,
          config.colors.border,
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          {/* Icon with background */}
          <div className={cn(
            'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
            config.colors.text,
            'bg-white dark:bg-slate-900/50'
          )}>
            {progress !== undefined && isActive ? (
              <CircularProgress progress={progress} size={28} color={config.colors.progress} />
            ) : (
              config.icon
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={cn('font-semibold', config.colors.text)}>{displayLabel}</span>
              {progress !== undefined && !isActive && (
                <span className="text-xs opacity-70 tabular-nums">{progress}%</span>
              )}
            </div>
            {details && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5 truncate">{details}</p>
            )}
            {showProgress && progress !== undefined && (
              <div className="mt-2">
                <ProgressBar progress={progress} color={config.colors.progress} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default inline variant
  return (
    <div
      className={cn(indicatorVariants({ size }), config.colors.text, className)}
      role="status"
      aria-live="polite"
    >
      {progress !== undefined && isActive ? (
        <CircularProgress
          progress={progress}
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
          color={config.colors.progress}
        />
      ) : (
        config.icon
      )}
      <span>{displayLabel}</span>
      {progress !== undefined && !isActive && (
        <span className="opacity-70 tabular-nums">{progress}%</span>
      )}
    </div>
  );
}

export default AIStatusIndicator;
