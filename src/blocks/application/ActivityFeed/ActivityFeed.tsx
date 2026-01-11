import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * ActivityFeed Block
 *
 * Display recent activity in a chronological feed.
 * Perfect for dashboards, user profiles, and audit logs.
 *
 * @accessibility
 * - Uses semantic list structure
 * - Timestamps are accessible with datetime attribute
 * - Activity types have aria-labels
 * - Focus visible on interactive elements
 */

const feedVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-[var(--semantic-color-border-default)] rounded-lg overflow-hidden',
        card: 'bg-white dark:bg-slate-900 shadow-sm border border-[var(--semantic-color-border-default)] rounded-xl',
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

const itemVariants = cva(
  'relative flex gap-4 pb-6 last:pb-0',
  {
    variants: {
      size: {
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type ActivityType =
  | 'create'
  | 'update'
  | 'delete'
  | 'comment'
  | 'upload'
  | 'download'
  | 'share'
  | 'login'
  | 'logout'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface ActivityItem {
  /** Unique identifier */
  id: string;
  /** Activity type for icon styling */
  type: ActivityType;
  /** Main title/description */
  title: string;
  /** Optional description */
  description?: string;
  /** User who performed the action */
  user?: {
    name: string;
    avatar?: string;
  };
  /** Timestamp */
  timestamp: Date | string;
  /** Optional metadata */
  metadata?: Record<string, string>;
  /** Optional action link */
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export interface ActivityFeedProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof feedVariants> {
  /** Array of activity items */
  activities: ActivityItem[];
  /** Show timeline connector */
  showTimeline?: boolean;
  /** Group by date */
  groupByDate?: boolean;
  /** Max items to show before "Show more" */
  maxItems?: number;
  /** Callback for load more */
  onLoadMore?: () => void;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Show relative timestamps */
  relativeTime?: boolean;
  /** Header content */
  header?: React.ReactNode;
}

// Activity type icons and colors
const activityStyles: Record<ActivityType, { icon: React.ReactNode; color: string; bg: string }> = {
  create: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  update: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  delete: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
  },
  comment: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  upload: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
  },
  download: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  share: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-100 dark:bg-pink-900/30',
  },
  login: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
    ),
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-100 dark:bg-teal-900/30',
  },
  logout: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-100 dark:bg-slate-800',
  },
  success: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  error: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
  },
  warning: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  info: {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
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

// Format date for grouping
function formatDateGroup(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return d.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' });
}

// Loading skeleton
const ActivitySkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex gap-4 pb-6 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
        </div>
      </div>
    ))}
  </>
);

export function ActivityFeed({
  activities,
  showTimeline = true,
  groupByDate = false,
  maxItems,
  onLoadMore,
  loading = false,
  emptyMessage = 'No activity yet',
  relativeTime = true,
  header,
  variant,
  size,
  className,
  ...props
}: ActivityFeedProps) {
  const [expanded, setExpanded] = React.useState(false);

  const displayedActivities = maxItems && !expanded
    ? activities.slice(0, maxItems)
    : activities;

  const hasMore = maxItems && activities.length > maxItems && !expanded;

  // Group activities by date if needed
  const groupedActivities = React.useMemo(() => {
    if (!groupByDate) return { '': displayedActivities };

    return displayedActivities.reduce((groups, activity) => {
      const dateKey = formatDateGroup(activity.timestamp);
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(activity);
      return groups;
    }, {} as Record<string, ActivityItem[]>);
  }, [displayedActivities, groupByDate]);

  const formatTimestamp = (timestamp: Date | string) => {
    if (relativeTime) {
      return formatRelativeTime(timestamp);
    }
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return date.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className={cn(feedVariants({ variant, size }), className)} {...props}>
      {header && (
        <div className={cn(
          'mb-4',
          variant === 'card' && 'px-6 pt-6 pb-4 border-b border-[var(--semantic-color-border-default)]'
        )}>
          {header}
        </div>
      )}

      <div className={cn(variant === 'card' && 'p-6')}>
        {loading ? (
          <ActivitySkeleton />
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-[var(--semantic-color-foreground-muted)]">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div role="feed" aria-label="Activity feed">
            {Object.entries(groupedActivities).map(([dateGroup, items]) => (
              <div key={dateGroup || 'all'}>
                {groupByDate && dateGroup && (
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--semantic-color-foreground-muted)] mb-4 mt-6 first:mt-0">
                    {dateGroup}
                  </h3>
                )}
                <ul className="space-y-0">
                  {items.map((activity, index) => {
                    const styles = activityStyles[activity.type];
                    const isLast = index === items.length - 1;

                    return (
                      <li
                        key={activity.id}
                        className={cn(itemVariants({ size }))}
                        role="article"
                        aria-label={`${activity.type} activity: ${activity.title}`}
                      >
                        {/* Timeline connector */}
                        {showTimeline && !isLast && (
                          <div
                            className="absolute left-4 top-8 w-0.5 h-full -ml-px bg-slate-200 dark:bg-slate-700"
                            aria-hidden="true"
                          />
                        )}

                        {/* Icon */}
                        <div
                          className={cn(
                            'relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                            styles.bg,
                            styles.color
                          )}
                          aria-hidden="true"
                        >
                          {styles.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[var(--semantic-color-foreground-default)] font-medium">
                                {activity.user && (
                                  <span className="font-semibold">{activity.user.name} </span>
                                )}
                                {activity.title}
                              </p>
                              {activity.description && (
                                <p className="mt-1 text-sm text-[var(--semantic-color-foreground-muted)]">
                                  {activity.description}
                                </p>
                              )}
                              {activity.metadata && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {Object.entries(activity.metadata).map(([key, value]) => (
                                    <span
                                      key={key}
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                    >
                                      {key}: {value}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <time
                              dateTime={
                                typeof activity.timestamp === 'string'
                                  ? activity.timestamp
                                  : activity.timestamp.toISOString()
                              }
                              className="flex-shrink-0 text-xs text-[var(--semantic-color-foreground-muted)]"
                            >
                              {formatTimestamp(activity.timestamp)}
                            </time>
                          </div>

                          {activity.action && (
                            <div className="mt-2">
                              {activity.action.href ? (
                                <a
                                  href={activity.action.href}
                                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                  {activity.action.label}
                                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                </a>
                              ) : (
                                <button
                                  onClick={activity.action.onClick}
                                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                  {activity.action.label}
                                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {/* Show more / Load more */}
            {hasMore && (
              <button
                onClick={() => setExpanded(true)}
                className="mt-4 w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Show {activities.length - (maxItems || 0)} more activities
              </button>
            )}

            {onLoadMore && (
              <button
                onClick={onLoadMore}
                className="mt-4 w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors border border-[var(--semantic-color-border-default)] rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Load more
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityFeed;
