import * as React from 'react';
import { AppShell } from '../../../layouts/AppShell';
import { StatsCards, type Stat } from '../../../blocks/application/StatsCards';
import { cn } from '../../../lib/utils';

/**
 * DashboardOverview Template
 *
 * Complete dashboard overview page with stats, charts placeholder, and activity feed.
 * Uses AppShell layout for consistent navigation structure.
 *
 * @accessibility
 * - Uses semantic landmarks from AppShell
 * - Stats have proper labeling
 * - Activity feed uses list semantics
 */

export interface Activity {
  id: string;
  message: string;
  time: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

export interface DashboardOverviewProps {
  /** Stats to display in cards */
  stats: Stat[];
  /** Recent activity items */
  activities?: Activity[];
  /** Chart/graph content slot */
  chartContent?: React.ReactNode;
  /** Additional widgets slot */
  widgets?: React.ReactNode;
  /** Sidebar content */
  sidebar: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Page title */
  title?: string;
  /** Page subtitle/description */
  subtitle?: string;
  /** Whether sidebar is collapsed */
  sidebarCollapsed?: boolean;
  /** Stats cards variant */
  statsVariant?: 'default' | 'bordered' | 'minimal';
  /** Stats columns configuration */
  statsColumns?: 2 | 3 | 4;
  /** Additional class name */
  className?: string;
}

export function DashboardOverview({
  stats,
  activities = [],
  chartContent,
  widgets,
  sidebar,
  header,
  title = 'Dashboard',
  subtitle,
  sidebarCollapsed = false,
  statsVariant = 'default',
  statsColumns = 4,
  className,
}: DashboardOverviewProps) {
  const activityTypeStyles: Record<string, string> = {
    info: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
  };

  return (
    <AppShell
      sidebar={sidebar}
      header={header}
      sidebarCollapsed={sidebarCollapsed}
      className={className}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--semantic-color-foreground-default)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-[var(--semantic-color-foreground-muted)]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Stats Cards */}
        <StatsCards
          stats={stats}
          variant={statsVariant}
          columns={statsColumns}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div
              className={cn(
                'rounded-xl border border-[var(--semantic-color-border-default)]',
                'bg-[var(--semantic-color-card-default)] p-6'
              )}
            >
              <h2 className="text-lg font-semibold text-[var(--semantic-color-foreground-default)] mb-4">
                Analytics
              </h2>
              {chartContent ? (
                chartContent
              ) : (
                <div className="h-64 flex items-center justify-center text-[var(--semantic-color-foreground-muted)]">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-2 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <p className="text-sm">Chart content goes here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <div
            className={cn(
              'rounded-xl border border-[var(--semantic-color-border-default)]',
              'bg-[var(--semantic-color-card-default)] p-6'
            )}
          >
            <h2 className="text-lg font-semibold text-[var(--semantic-color-foreground-default)] mb-4">
              Recent Activity
            </h2>
            {activities.length > 0 ? (
              <ul className="space-y-4" role="list" aria-label="Recent activity">
                {activities.map((activity) => (
                  <li key={activity.id} className="flex gap-3">
                    {activity.icon ? (
                      <div
                        className={cn(
                          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                          activityTypeStyles[activity.type || 'info']
                        )}
                      >
                        {activity.icon}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          'flex-shrink-0 w-2 h-2 mt-2 rounded-full',
                          activity.type === 'success' && 'bg-green-500',
                          activity.type === 'warning' && 'bg-yellow-500',
                          activity.type === 'error' && 'bg-red-500',
                          (!activity.type || activity.type === 'info') && 'bg-blue-500'
                        )}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--semantic-color-foreground-default)]">
                        {activity.message}
                      </p>
                      <p className="text-xs text-[var(--semantic-color-foreground-muted)] mt-0.5">
                        {activity.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[var(--semantic-color-foreground-muted)] text-center py-8">
                No recent activity
              </p>
            )}
          </div>
        </div>

        {/* Additional Widgets */}
        {widgets && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {widgets}
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default DashboardOverview;
