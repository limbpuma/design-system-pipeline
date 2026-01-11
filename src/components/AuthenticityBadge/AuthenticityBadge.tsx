import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * AuthenticityBadge Component
 * Visual indicator for image authenticity scores
 * Key differentiator for AI-powered real estate verification
 */

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium transition-all',
  {
    variants: {
      status: {
        verified: [
          'bg-green-100 text-green-900 border-green-300',
          'dark:bg-green-900 dark:text-green-100 dark:border-green-700',
        ].join(' '),
        caution: [
          'bg-yellow-100 text-yellow-900 border-yellow-300',
          'dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700',
        ].join(' '),
        alert: [
          'bg-red-100 text-red-900 border-red-300',
          'dark:bg-red-900 dark:text-red-100 dark:border-red-700',
        ].join(' '),
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded-md border',
        md: 'px-2.5 py-1 text-sm rounded-lg border',
        lg: 'px-3 py-1.5 text-base rounded-lg border-2',
      },
      interactive: {
        true: 'cursor-pointer hover:opacity-80',
        false: '',
      },
    },
    defaultVariants: {
      status: 'verified',
      size: 'md',
      interactive: false,
    },
  }
);

export interface AuthenticityIndicator {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'positive';
}

export interface AuthenticityBadgeProps
  extends Omit<VariantProps<typeof badgeVariants>, 'status' | 'interactive'> {
  /** Authenticity score from 0 to 100 */
  score: number;
  /** Whether the images appear AI-generated */
  isAIGenerated?: boolean;
  /** Whether the images appear digitally edited */
  isEdited?: boolean;
  /** Show detailed tooltip/popup on click */
  showDetails?: boolean;
  /** Detailed indicators for the tooltip */
  indicators?: AuthenticityIndicator[];
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
  /** Show label text alongside score */
  showLabel?: boolean;
}

// Icons
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const PencilIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

function getStatus(score: number): 'verified' | 'caution' | 'alert' {
  if (score >= 90) return 'verified';
  if (score >= 70) return 'caution';
  return 'alert';
}

function getStatusConfig(status: 'verified' | 'caution' | 'alert') {
  switch (status) {
    case 'verified':
      return {
        label: 'Verified',
        description: 'Authentic images',
        Icon: CheckCircleIcon,
      };
    case 'caution':
      return {
        label: 'Review',
        description: 'Needs review',
        Icon: AlertTriangleIcon,
      };
    case 'alert':
      return {
        label: 'Alert',
        description: 'Possible manipulation',
        Icon: XCircleIcon,
      };
  }
}

export function AuthenticityBadge({
  score,
  isAIGenerated = false,
  isEdited = false,
  showDetails = false,
  indicators = [],
  onClick,
  size,
  className,
  showLabel = true,
}: AuthenticityBadgeProps) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement | HTMLDivElement>(null);
  const popoverId = React.useId();

  const status = getStatus(score);
  const config = getStatusConfig(status);
  const iconSize = size === 'lg' ? 'h-5 w-5' : size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  const isInteractive = showDetails || !!onClick;

  // Close popover on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    }
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPopoverOpen]);

  // Close on Escape key and trap focus
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isPopoverOpen) {
        setIsPopoverOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (isPopoverOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus the popover when it opens
      popoverRef.current?.focus();
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPopoverOpen]);

  const handleClick = () => {
    if (showDetails) {
      setIsPopoverOpen(!isPopoverOpen);
    }
    onClick?.();
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {isInteractive ? (
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          type="button"
          onClick={handleClick}
          className={cn(badgeVariants({ status, size, interactive: true }), className)}
          aria-label={`Authenticity score: ${score}%`}
          aria-expanded={showDetails ? isPopoverOpen : undefined}
          aria-haspopup={showDetails ? 'dialog' : undefined}
          aria-controls={showDetails && isPopoverOpen ? popoverId : undefined}
        >
          <config.Icon className={iconSize} aria-hidden="true" />
          <span>{score}%</span>
          {showLabel && size !== 'sm' && <span className="hidden sm:inline">{config.label}</span>}
        </button>
      ) : (
        <div
          role="img"
          className={cn(badgeVariants({ status, size, interactive: false }), className)}
          aria-label={`Authenticity score: ${score}%`}
        >
          <config.Icon className={iconSize} aria-hidden="true" />
          <span aria-hidden="true">{score}%</span>
          {showLabel && size !== 'sm' && <span className="hidden sm:inline" aria-hidden="true">{config.label}</span>}
        </div>
      )}

      {/* Warning badges for AI/Edited */}
      {(isAIGenerated || isEdited) && (
        <div className="absolute -top-1 -right-1 flex gap-0.5">
          {isAIGenerated && (
            <span
              className="flex items-center justify-center w-4 h-4 bg-purple-500 rounded-full"
              role="img"
              aria-label="Possibly AI-generated"
            >
              <SparklesIcon className="h-2.5 w-2.5 text-white" aria-hidden="true" />
            </span>
          )}
          {isEdited && (
            <span
              className="flex items-center justify-center w-4 h-4 bg-orange-500 rounded-full"
              role="img"
              aria-label="Digitally edited"
            >
              <PencilIcon className="h-2.5 w-2.5 text-white" aria-hidden="true" />
            </span>
          )}
        </div>
      )}

      {/* Details popover (accessible dialog pattern) */}
      {showDetails && isPopoverOpen && (
        <div
          ref={popoverRef}
          id={popoverId}
          className={cn(
            'absolute z-50 top-full left-0 mt-2',
            'w-72 p-4 rounded-xl',
            'bg-[var(--semantic-color-popover-default)]',
            'border border-[var(--semantic-color-border-default)]',
            'shadow-xl'
          )}
          role="dialog"
          aria-modal="false"
          aria-label={`Authenticity details: ${score}% - ${config.description}`}
          tabIndex={-1}
        >
          {/* Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-[var(--semantic-color-border-default)]">
            <div
              className={cn(
                'flex items-center justify-center w-12 h-12 rounded-full',
                status === 'verified' && 'bg-green-100 dark:bg-green-900',
                status === 'caution' && 'bg-yellow-100 dark:bg-yellow-900',
                status === 'alert' && 'bg-red-100 dark:bg-red-900'
              )}
            >
              <ShieldCheckIcon
                aria-hidden="true"
                className={cn(
                  'h-6 w-6',
                  status === 'verified' && 'text-green-700 dark:text-green-200',
                  status === 'caution' && 'text-yellow-700 dark:text-yellow-200',
                  status === 'alert' && 'text-red-700 dark:text-red-200'
                )}
              />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{score}</span>
                <span className="text-[var(--semantic-color-muted-foreground)]">/100</span>
              </div>
              <p className="text-sm text-[var(--semantic-color-muted-foreground)]">{config.description}</p>
            </div>
          </div>

          {/* Indicators */}
          {indicators.length > 0 && (
            <ul className="mt-3 space-y-2">
              {indicators.map((indicator, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  {indicator.severity === 'positive' ? (
                    <CheckCircleIcon aria-hidden="true" className="h-4 w-4 mt-0.5 text-green-700 dark:text-green-300 shrink-0" />
                  ) : indicator.severity === 'high' ? (
                    <XCircleIcon aria-hidden="true" className="h-4 w-4 mt-0.5 text-red-700 dark:text-red-300 shrink-0" />
                  ) : indicator.severity === 'medium' ? (
                    <AlertTriangleIcon aria-hidden="true" className="h-4 w-4 mt-0.5 text-yellow-700 dark:text-yellow-300 shrink-0" />
                  ) : (
                    <InfoIcon aria-hidden="true" className="h-4 w-4 mt-0.5 text-gray-600 dark:text-gray-300 shrink-0" />
                  )}
                  <span>{indicator.description}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Warning flags */}
          {(isAIGenerated || isEdited) && (
            <div className="mt-3 pt-3 border-t border-[var(--semantic-color-border-default)] space-y-2">
              {isAIGenerated && (
                <div className="flex items-center gap-2 text-sm text-purple-800 dark:text-purple-200">
                  <SparklesIcon aria-hidden="true" className="h-4 w-4" />
                  <span>Possibly AI-generated</span>
                </div>
              )}
              {isEdited && (
                <div className="flex items-center gap-2 text-sm text-orange-800 dark:text-orange-200">
                  <PencilIcon aria-hidden="true" className="h-4 w-4" />
                  <span>Digitally edited</span>
                </div>
              )}
            </div>
          )}

          {/* Footer note */}
          <p className="mt-3 pt-3 border-t border-[var(--semantic-color-border-default)] text-xs text-[var(--semantic-color-muted-foreground)]">
            Authenticity analysis uses AI to detect possible image manipulation.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Compact authenticity score display for cards
 */
export function AuthenticityScore({
  score,
  className,
}: {
  score: number;
  className?: string;
}) {
  const status = getStatus(score);
  const statusLabel = status === 'verified' ? 'Verified' : status === 'caution' ? 'Needs review' : 'Alert';

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center',
        'w-10 h-10 rounded-lg font-bold text-sm',
        status === 'verified' && 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
        status === 'caution' && 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100',
        status === 'alert' && 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100',
        className
      )}
      role="img"
      aria-label={`Authenticity score: ${score}% - ${statusLabel}`}
    >
      <span aria-hidden="true">{score}%</span>
    </div>
  );
}

export { badgeVariants };
export default AuthenticityBadge;
