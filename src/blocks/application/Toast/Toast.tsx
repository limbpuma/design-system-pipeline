import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const toastVariants = cva(
  'pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] text-[var(--semantic-color-foreground-default)]',
        success: 'border-[var(--semantic-color-success-default)] bg-[var(--semantic-color-success-default)]/10 text-[var(--semantic-color-success-default)]',
        error: 'border-[var(--semantic-color-destructive-default)] bg-[var(--semantic-color-destructive-default)]/10 text-[var(--semantic-color-destructive-default)]',
        warning: 'border-[var(--semantic-color-warning-default)] bg-[var(--semantic-color-warning-default)]/10 text-[var(--semantic-color-warning-foreground)]',
        info: 'border-[var(--semantic-color-primary-default)] bg-[var(--semantic-color-primary-default)]/10 text-[var(--semantic-color-primary-default)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
}

const iconMap = {
  success: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  default: null,
};

const Toast: React.FC<ToastProps> = ({ id, title, description, variant = 'default', action, onDismiss }) => {
  return (
    <div className={cn(toastVariants({ variant }))}>
      {iconMap[variant]}
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="shrink-0 rounded-md px-3 py-1 text-sm font-medium hover:bg-black/5"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 rounded-md p-1 hover:bg-black/5"
        aria-label="Dismiss"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'bottom-right',
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const toast = React.useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    const newToast: ToastData = { id, duration: 5000, ...data };

    setToasts((prev) => {
      const updated = [...prev, newToast].slice(-maxToasts);
      return updated;
    });

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }

    return id;
  }, [maxToasts]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      <div className={cn('fixed z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none', positionClasses[position])}>
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export { Toast, toastVariants };
