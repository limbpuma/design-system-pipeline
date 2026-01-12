import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] text-[var(--semantic-color-foreground-default)]',
        info: 'border-[var(--semantic-color-primary-default)]/50 bg-[var(--semantic-color-primary-default)]/10 text-[var(--semantic-color-primary-default)] [&>svg]:text-[var(--semantic-color-primary-default)]',
        success: 'border-[var(--semantic-color-success-default)]/50 bg-[var(--semantic-color-success-default)]/10 text-[var(--semantic-color-success-default)] [&>svg]:text-[var(--semantic-color-success-default)]',
        warning: 'border-[var(--semantic-color-warning-default)]/50 bg-[var(--semantic-color-warning-default)]/10 text-[var(--semantic-color-warning-foreground)] [&>svg]:text-[var(--semantic-color-warning-default)]',
        destructive: 'border-[var(--semantic-color-destructive-default)]/50 bg-[var(--semantic-color-destructive-default)]/10 text-[var(--semantic-color-destructive-default)] [&>svg]:text-[var(--semantic-color-destructive-default)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconMap = {
  info: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  destructive: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  default: null,
};

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
  className?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, children, icon, showIcon = true, dismissible, onDismiss, action, ...props }, ref) => {
    const defaultIcon = variant ? iconMap[variant] : null;
    const displayIcon = icon ?? defaultIcon;

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        <div className="flex gap-3">
          {showIcon && displayIcon && <div className="shrink-0 mt-0.5">{displayIcon}</div>}
          <div className="flex-1">
            {title && <h5 className="mb-1 font-medium leading-none">{title}</h5>}
            {children && <div className="text-sm opacity-90">{children}</div>}
            {action && <div className="mt-3">{action}</div>}
          </div>
          {dismissible && (
            <button
              onClick={onDismiss}
              className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Dismiss alert"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export { Alert, alertVariants };
