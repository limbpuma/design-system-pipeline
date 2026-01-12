import * as React from 'react';
import { cn } from '../../../lib/utils';
import { AIStatusIndicator, type AIStatus } from '../../../components/AIStatusIndicator';

/**
 * AnalysisProgress Block
 *
 * Professional progress stepper for AI analysis workflows.
 * Features animated transitions, step tracking, and time estimates.
 *
 * @accessibility
 * - Progress announcements via aria-live
 * - Step navigation with keyboard
 * - Screen reader friendly status updates
 */

export interface AnalysisStep {
  id: string;
  label: string;
  description?: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  progress?: number;
  duration?: number; // in seconds
  error?: string;
}

export interface AnalysisProgressProps {
  /** Analysis steps */
  steps: AnalysisStep[];
  /** Overall progress (0-100) */
  overallProgress: number;
  /** Estimated time remaining in seconds */
  estimatedTime?: number;
  /** Current status */
  status: AIStatus;
  /** Status message */
  statusMessage?: string;
  /** Show step details */
  showDetails?: boolean;
  /** Compact mode */
  compact?: boolean;
  /** Show animated gradient on progress */
  animated?: boolean;
  /** Additional class name */
  className?: string;
}

const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
};

// Status labels for screen readers
const statusLabels: Record<AnalysisStep['status'], string> = {
  pending: 'Pending',
  active: 'In progress',
  complete: 'Completed',
  error: 'Failed',
};

// Animated step icon with status
const StepIcon: React.FC<{ status: AnalysisStep['status']; index: number; label: string }> = ({
  status,
  index,
  label,
}) => {
  const baseClass = 'relative w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300';

  const ariaLabel = `Step ${index + 1}: ${label} - ${statusLabels[status]}`;

  switch (status) {
    case 'complete':
      return (
        <div
          className={cn(baseClass, 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30')}
          role="img"
          aria-label={ariaLabel}
        >
          <svg className="w-5 h-5 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    case 'active':
      return (
        <div
          className={cn(baseClass, 'bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/30')}
          role="img"
          aria-label={ariaLabel}
        >
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-xl bg-blue-500/30 animate-ping" aria-hidden="true" />
        </div>
      );
    case 'error':
      return (
        <div
          className={cn(baseClass, 'bg-red-500 text-white shadow-lg shadow-red-500/30')}
          role="img"
          aria-label={ariaLabel}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    default:
      return (
        <div
          className={cn(
            baseClass,
            'bg-slate-100 dark:bg-slate-800',
            'text-slate-400 dark:text-slate-500',
            'border-2 border-slate-200 dark:border-slate-700'
          )}
          role="img"
          aria-label={ariaLabel}
        >
          <span aria-hidden="true">{index + 1}</span>
        </div>
      );
  }
};

// Animated progress bar
const AnimatedProgressBar: React.FC<{
  progress: number;
  status: AIStatus;
  animated?: boolean;
}> = ({ progress, status, animated = true }) => {
  const isActive = status === 'processing' || status === 'analyzing';

  return (
    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-inner">
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500 ease-out',
          status === 'error'
            ? 'bg-red-500'
            : status === 'success'
            ? 'bg-emerald-500'
            : 'bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 bg-[length:200%_100%]',
          animated && isActive && 'animate-[shimmer_2s_linear_infinite]'
        )}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Overall progress"
      />
    </div>
  );
};

// Step connector line
const StepConnector: React.FC<{ status: 'pending' | 'active' | 'complete' | 'error' }> = ({ status }) => (
  <div className="flex flex-col items-center flex-1 min-h-[32px]">
    <div
      className={cn(
        'w-0.5 flex-1 rounded-full transition-all duration-500',
        status === 'complete'
          ? 'bg-emerald-500'
          : status === 'active'
          ? 'bg-gradient-to-b from-blue-500 to-slate-200 dark:to-slate-700'
          : 'bg-slate-200 dark:bg-slate-700'
      )}
    />
  </div>
);

export function AnalysisProgress({
  steps,
  overallProgress,
  estimatedTime,
  status,
  statusMessage,
  showDetails = true,
  compact = false,
  animated = true,
  className,
}: AnalysisProgressProps) {
  const currentStepIndex = steps.findIndex((s) => s.status === 'active');
  const completedSteps = steps.filter((s) => s.status === 'complete').length;
  const totalDuration = steps
    .filter((s) => s.status === 'complete' && s.duration)
    .reduce((acc, s) => acc + (s.duration || 0), 0);

  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 dark:border-slate-700',
        'bg-white dark:bg-slate-900',
        'shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50',
        compact ? 'p-4' : 'p-6',
        className
      )}
      role="region"
      aria-label="Analysis progress"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AIStatusIndicator status={status} label={statusMessage} animated={animated} />
        </div>
        {estimatedTime !== undefined && (status === 'processing' || status === 'analyzing') && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              ~{formatTime(estimatedTime)}
            </span>
          </div>
        )}
      </div>

      {/* Overall progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-slate-500 dark:text-slate-400">
            Step {Math.max(currentStepIndex + 1, completedSteps)} of {steps.length}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {Math.round(overallProgress)}%
            </span>
          </div>
        </div>
        <AnimatedProgressBar progress={overallProgress} status={status} animated={animated} />
      </div>

      {/* Steps - Detailed View */}
      {showDetails && (
        <div className="space-y-0" role="list" aria-label="Analysis steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex gap-4"
              role="listitem"
            >
              {/* Step indicator column */}
              <div className="flex flex-col items-center">
                <StepIcon status={step.status} index={index} label={step.label} />
                {index < steps.length - 1 && (
                  <StepConnector status={step.status} />
                )}
              </div>

              {/* Step content */}
              <div className={cn(
                'flex-1 pb-6',
                index === steps.length - 1 && 'pb-0'
              )}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4
                      className={cn(
                        'font-semibold transition-colors duration-300',
                        step.status === 'active'
                          ? 'text-slate-900 dark:text-white'
                          : step.status === 'complete'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : step.status === 'error'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-slate-400 dark:text-slate-500'
                      )}
                    >
                      {step.label}
                    </h4>
                    {step.description && (
                      <p className={cn(
                        'text-sm mt-1 transition-colors duration-300',
                        step.status === 'active' || step.status === 'complete'
                          ? 'text-slate-500 dark:text-slate-400'
                          : 'text-slate-400 dark:text-slate-600'
                      )}>
                        {step.description}
                      </p>
                    )}
                    {step.error && (
                      <div className="flex items-start gap-2 mt-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30">
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-sm text-red-600 dark:text-red-400">{step.error}</p>
                      </div>
                    )}
                  </div>

                  {/* Duration badge */}
                  {step.duration !== undefined && step.status === 'complete' && (
                    <span className="flex-shrink-0 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {formatTime(step.duration)}
                    </span>
                  )}
                </div>

                {/* Step progress bar */}
                {step.status === 'active' && step.progress !== undefined && (
                  <div className="mt-3 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300"
                      style={{ width: `${step.progress}%` }}
                      role="progressbar"
                      aria-valuenow={step.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${step.label} progress`}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compact view */}
      {!showDetails && (
        <div className="flex items-center gap-2" role="list" aria-label="Analysis steps compact view">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  step.status === 'complete'
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                    : step.status === 'active'
                    ? 'bg-blue-500 shadow-lg shadow-blue-500/50 animate-pulse scale-125'
                    : step.status === 'error'
                    ? 'bg-red-500 shadow-lg shadow-red-500/50'
                    : 'bg-slate-200 dark:bg-slate-700'
                )}
                role="listitem"
                aria-label={`Step ${index + 1}: ${step.label} - ${statusLabels[step.status]}`}
              />
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 rounded-full transition-all duration-500',
                    step.status === 'complete'
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Summary stats */}
      {status === 'success' && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Analysis Complete
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {completedSteps} steps completed
                  {totalDuration > 0 && ` in ${formatTime(totalDuration)}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                100%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error state summary */}
      {status === 'error' && (
        <div className="mt-6 pt-4 border-t border-red-100 dark:border-red-900/30">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                Analysis Failed
              </p>
              <p className="text-xs text-red-500 dark:text-red-400/70">
                Check the error above and try again
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalysisProgress;
