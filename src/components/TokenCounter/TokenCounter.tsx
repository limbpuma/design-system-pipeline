import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const tokenCounterVariants = cva(
  'inline-flex items-center gap-2 rounded-md transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[var(--semantic-color-background-muted)] text-[var(--semantic-color-foreground-default)]',
        outline: 'border border-[var(--semantic-color-border-default)]',
        minimal: '',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface TokenCounterProps extends VariantProps<typeof tokenCounterVariants> {
  count: number;
  maxTokens?: number;
  showPercentage?: boolean;
  showWarning?: boolean;
  warningThreshold?: number;
  errorThreshold?: number;
  label?: string;
  className?: string;
  animated?: boolean;
}

const TokenCounter: React.FC<TokenCounterProps> = ({
  count,
  maxTokens,
  showPercentage,
  showWarning = true,
  warningThreshold = 0.8,
  errorThreshold = 0.95,
  label = 'Tokens',
  variant,
  size,
  className,
  animated = true,
}) => {
  const percentage = maxTokens ? count / maxTokens : 0;
  const isWarning = showWarning && percentage >= warningThreshold && percentage < errorThreshold;
  const isError = showWarning && percentage >= errorThreshold;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatusColor = () => {
    if (isError) return 'text-[var(--semantic-color-destructive-default)]';
    if (isWarning) return 'text-[var(--semantic-color-warning-default)]';
    return 'text-[var(--semantic-color-foreground-default)]';
  };

  return (
    <div className={cn(tokenCounterVariants({ variant, size }), className)}>
      <span className="text-[var(--semantic-color-foreground-muted)]">{label}:</span>
      <span className={cn('font-mono font-medium', getStatusColor(), animated && 'transition-colors duration-200')}>
        {formatNumber(count)}
      </span>
      {maxTokens && (
        <>
          <span className="text-[var(--semantic-color-foreground-muted)]">/</span>
          <span className="font-mono text-[var(--semantic-color-foreground-muted)]">{formatNumber(maxTokens)}</span>
        </>
      )}
      {showPercentage && maxTokens && (
        <span className={cn('text-[var(--semantic-color-foreground-muted)]', isError && 'text-[var(--semantic-color-destructive-default)]')}>
          ({(percentage * 100).toFixed(0)}%)
        </span>
      )}
      {maxTokens && (
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--semantic-color-background-subtle)]">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300',
              isError ? 'bg-[var(--semantic-color-destructive-default)]' : isWarning ? 'bg-[var(--semantic-color-warning-default)]' : 'bg-[var(--semantic-color-primary-default)]'
            )}
            style={{ width: `${Math.min(percentage * 100, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export { TokenCounter, tokenCounterVariants };
