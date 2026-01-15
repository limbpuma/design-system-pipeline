import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * NotificationList Block
 *
 * Display notifications with actions and status indicators.
 * Perfect for notification centers, alert lists, and messaging.
 *
 * @accessibility
 * - Uses semantic list structure with ul/li elements
 * - New/unread notifications announced to screen readers
 * - Actions are keyboard accessible with Enter/Space support
 * - Dismiss actions have clear labels
 */

const listVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        dropdown: 'bg-white dark:bg-slate-900 shadow-lg border border-[var(--semantic-color-border-default)] rounded-xl overflow-hidden',
        panel: 'bg-white dark:bg-slate-900 border border-[var(--semantic-color-border-default)] rounded-xl',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'message' | 'mention' | 'system';

export interface Notification {
  /** Unique identifier */
  id: string;
  /** Notification type */
  type: NotificationType;
  /** Title */
  title: string;
  /** Message content */
  message?: string;
  /** Timestamp */
  timestamp: Date | string;
  /** Read/unread status */
  read?: boolean;
  /** Avatar or icon */
  avatar?: string | React.ReactNode;
  /** Sender name */
  sender?: string;
  /** Primary action */
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Dismissible */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
}

export interface NotificationListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listVariants> {
  /** Array of notifications */
  notifications: Notification[];
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Callback when notification is clicked */
  onNotificationClick?: (notification: Notification) => void;
  /** Callback when notification is dismissed */
  onDismiss?: (id: string) => void;
  /** Mark all as read callback */
  onMarkAllRead?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state icon */
  emptyIcon?: React.ReactNode;
  /** Max height with scroll */
  maxHeight?: string | number;
  /** Show unread count in header */
  showUnreadCount?: boolean;
}

// Notification type styles
const notificationStyles: Record<NotificationType, { icon: React.ReactNode; color: string; bg: string }> = {
  info: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  success: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  error: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
  },
  message: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  mention: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    ),
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-100 dark:bg-pink-900/30',
  },
  system: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-100 dark:bg-slate-800',
  },
};

// Format relative time
function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - then.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return then.toLocaleDateString('default', { month: 'short', day: 'numeric' });
}

// Loading skeleton
const NotificationSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex gap-3 p-4 animate-pulse border-b border-[var(--semantic-color-border-default)] last:border-b-0">
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
        </div>
      </div>
    ))}
  </>
);

// Notification Item Component
interface NotificationItemProps {
  notification: Notification;
  onClick?: (notification: Notification) => void;
  onDismiss?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
  onDismiss,
}) => {
  const styles = notificationStyles[notification.type];

  const handleClick = () => {
    onClick?.(notification);
    if (notification.action?.onClick) {
      notification.action.onClick();
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss?.(notification.id);
    notification.onDismiss?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const content = (
    <div
      className={cn(
        'group relative flex gap-3 p-4 transition-colors cursor-pointer',
        'hover:bg-slate-50 dark:hover:bg-slate-800/50',
        'border-b border-[var(--semantic-color-border-default)] last:border-b-0',
        !notification.read && 'bg-blue-50/50 dark:bg-blue-900/10'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${notification.read ? '' : 'Unread'} ${notification.type} notification: ${notification.title}`}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <span
          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600"
          aria-hidden="true"
        />
      )}

      {/* Avatar/Icon */}
      <div className="flex-shrink-0">
        {notification.avatar ? (
          typeof notification.avatar === 'string' ? (
            <img
              src={notification.avatar}
              alt={notification.sender || 'User'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
            />
          ) : (
            notification.avatar
          )
        ) : (
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              styles.bg,
              styles.color
            )}
          >
            {styles.icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className={cn(
              'text-sm text-[var(--semantic-color-foreground-default)]',
              !notification.read && 'font-semibold'
            )}>
              {notification.sender && (
                <span className="font-medium">{notification.sender}: </span>
              )}
              {notification.title}
            </p>
            {notification.message && (
              <p className="mt-0.5 text-sm text-[var(--semantic-color-foreground-muted)] line-clamp-2">
                {notification.message}
              </p>
            )}
          </div>

          {/* Time and dismiss */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <time
              dateTime={
                typeof notification.timestamp === 'string'
                  ? notification.timestamp
                  : notification.timestamp.toISOString()
              }
              className="text-xs text-[var(--semantic-color-foreground-muted)]"
            >
              {formatRelativeTime(notification.timestamp)}
            </time>

            {notification.dismissible !== false && onDismiss && (
              <button
                onClick={handleDismiss}
                className={cn(
                  'p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100',
                  'dark:hover:text-slate-300 dark:hover:bg-slate-700',
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                  'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                )}
                aria-label="Dismiss notification"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Action button */}
        {notification.action && (
          <div className="mt-2">
            {notification.action.href ? (
              <a
                href={notification.action.href}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {notification.action.label}
              </a>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  notification.action?.onClick?.();
                }}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {notification.action.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return content;
};

export function NotificationList({
  notifications,
  header,
  footer,
  onNotificationClick,
  onDismiss,
  onMarkAllRead,
  loading = false,
  emptyMessage = 'No notifications',
  emptyIcon,
  maxHeight,
  showUnreadCount = true,
  variant,
  size,
  className,
  ...props
}: NotificationListProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const defaultHeader = (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--semantic-color-border-default)]">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold text-[var(--semantic-color-foreground-default)]">
          Notifications
        </h2>
        {showUnreadCount && unreadCount > 0 && (
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
      {onMarkAllRead && unreadCount > 0 && (
        <button
          onClick={onMarkAllRead}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Mark all read
        </button>
      )}
    </div>
  );

  return (
    <div className={cn(listVariants({ variant, size }), className)} {...props}>
      {/* Header */}
      {header !== null && (header || defaultHeader)}

      {/* Notification list - scrollable */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight }}
        role="region"
        aria-label="Notification list"
      >
        {loading ? (
          <NotificationSkeleton />
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[var(--semantic-color-foreground-muted)]">
            {emptyIcon || (
              <svg
                className="w-12 h-12 mb-3 text-slate-300 dark:text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            )}
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <ul className="list-none m-0 p-0" aria-label="Notifications">
            {notifications.map((notification) => (
              <li key={notification.id} className="list-none">
                <NotificationItem
                  notification={notification}
                  onClick={onNotificationClick}
                  onDismiss={onDismiss}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-[var(--semantic-color-border-default)]">
          {footer}
        </div>
      )}
    </div>
  );
}

export default NotificationList;
