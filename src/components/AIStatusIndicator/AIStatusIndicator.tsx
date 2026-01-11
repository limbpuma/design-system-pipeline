import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * AIStatusIndicator Component
 *
 * Professional status indicator for AI operations with rich visual feedback.
 * Features animated states, progress tracking, and soft color variants.
 *
 * @accessibility
 * - ARIA live regions for status announcements
 * - Screen reader friendly labels
 * - Color-independent status indication via icons
 */

const statusVariants = cva(
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

export type AIStatus = 'idle' | 'processing' | 'analyzing' | 'success' | 'error' | 'warning';

export interface AIStatusIndicatorProps extends VariantProps<typeof statusVariants> {
  /** Current status */
  status: AIStatus;
  /** Optional label text */
  label?: string;
  /** Progress percentage (0-100) for analyzing state */
  progress?: number;
  /** Show animated effects */
  animated?: boolean;
  /** Show as badge style */
  badge?: boolean;
  /** Additional class name */
  className?: string;
}

const statusConfig: Record<AIStatus, {
  icon: React.ReactNode;
  colors: string;
  badgeColors: string;
  dotColor: string;
  label: string;
}> = {
  idle: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    colors: 'text-slate-500',
    badgeColors: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    dotColor: 'bg-slate-400',
    label: 'Ready',
  },
  processing: {
    icon: (
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
    colors: 'text-blue-600 dark:text-blue-400',
    badgeColors: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    dotColor: 'bg-blue-500',
    label: 'Processing',
  },
  analyzing: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    colors: 'text-violet-600 dark:text-violet-400',
    badgeColors: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    dotColor: 'bg-violet-500',
    label: 'Analyzing',
  },
  success: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    colors: 'text-emerald-600 dark:text-emerald-400',
    badgeColors: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    dotColor: 'bg-emerald-500',
    label: 'Complete',
  },
  error: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    colors: 'text-red-600 dark:text-red-400',
    badgeColors: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    dotColor: 'bg-red-500',
    label: 'Error',
  },
  warning: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    colors: 'text-amber-600 dark:text-amber-400',
    badgeColors: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    dotColor: 'bg-amber-500',
    label: 'Warning',
  },
};

const PulsingDot: React.FC<{ color: string; animated?: boolean }> = ({ color, animated }) => (
  <span className="relative flex h-2.5 w-2.5">
    {animated && (
      <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', color)} />
    )}
    <span className={cn('relative inline-flex rounded-full h-2.5 w-2.5', color)} />
  </span>
);

const CircularProgress: React.FC<{ progress: number; size: number; strokeWidth: number; className?: string }> = ({
  progress,
  size,
  strokeWidth,
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className={cn('transform -rotate-90', className)}>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-slate-200 dark:text-slate-700"
      />
      {/* Progress circle */}
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
        className="text-violet-500 transition-all duration-500 ease-out"
      />
    </svg>
  );
};

export function AIStatusIndicator({
  status,
  label,
  progress,
  animated = true,
  badge = false,
  size,
  className,
}: AIStatusIndicatorProps) {
  const config = statusConfig[status];
  const displayLabel = label || config.label;
  const isActive = status === 'processing' || status === 'analyzing';

  // Badge style
  if (badge) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full font-medium transition-all duration-300',
          config.badgeColors,
          size === 'sm' && 'text-xs py-1 px-2',
          size === 'lg' && 'text-base py-2 px-4',
          className
        )}
        role="status"
        aria-live="polite"
      >
        <PulsingDot color={config.dotColor} animated={animated && isActive} />
        <span>{displayLabel}</span>
        {status === 'analyzing' && progress !== undefined && (
          <span className="text-current/70">{progress}%</span>
        )}
      </span>
    );
  }

  // Default inline style
  return (
    <div
      className={cn(statusVariants({ size }), config.colors, className)}
      role="status"
      aria-live="polite"
    >
      {/* Icon or Progress */}
      {status === 'analyzing' && progress !== undefined ? (
        <div className="relative">
          <CircularProgress
            progress={progress}
            size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
            strokeWidth={2}
          />
          {animated && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            </span>
          )}
        </div>
      ) : (
        <span className={cn(animated && isActive && status === 'analyzing' && 'animate-pulse')}>
          {config.icon}
        </span>
      )}

      {/* Label */}
      <span>{displayLabel}</span>

      {/* Progress percentage (if not using circular) */}
      {status === 'analyzing' && progress !== undefined && (
        <span className="tabular-nums text-current/70">
          {progress}%
        </span>
      )}
    </div>
  );
}

export default AIStatusIndicator;
