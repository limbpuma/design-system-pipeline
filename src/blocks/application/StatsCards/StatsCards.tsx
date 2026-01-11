import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card';

/**
 * StatsCards Block
 *
 * Display key metrics and KPIs in a grid of cards.
 * Commonly used in dashboards and analytics pages.
 *
 * @accessibility
 * - Uses semantic list structure
 * - Screen reader friendly stat announcements
 * - Change indicators have aria-label
 */

const gridVariants = cva(
  'w-full grid',
  {
    variants: {
      columns: {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      },
      gap: {
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-6',
      },
    },
    defaultVariants: {
      columns: 4,
      gap: 'md',
    },
  }
);

export interface Stat {
  /** Unique identifier */
  id: string;
  /** Stat label/name */
  label: string;
  /** Current value (formatted string) */
  value: string;
  /** Change from previous period (e.g., "+12.5%") */
  change?: string;
  /** Whether change is positive, negative, or neutral */
  changeType?: 'positive' | 'negative' | 'neutral';
  /** Optional icon */
  icon?: React.ReactNode;
  /** Optional description or context */
  description?: string;
}

export interface StatsCardsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Array of stats to display */
  stats: Stat[];
  /** Show trend indicators */
  showTrends?: boolean;
  /** Card style variant */
  variant?: 'default' | 'bordered' | 'minimal';
}

export function StatsCards({
  stats,
  columns,
  gap,
  showTrends = true,
  variant = 'default',
  className,
  ...props
}: StatsCardsProps) {
  return (
    <div
      className={cn(gridVariants({ columns, gap }), className)}
      role="list"
      aria-label="Statistics"
      {...props}
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          stat={stat}
          showTrend={showTrends}
          variant={variant}
        />
      ))}
    </div>
  );
}

interface StatCardProps {
  stat: Stat;
  showTrend: boolean;
  variant: 'default' | 'bordered' | 'minimal';
}

function StatCard({ stat, showTrend, variant }: StatCardProps) {
  const cardClasses = cn(
    variant === 'bordered' && 'border-2',
    variant === 'minimal' && 'shadow-none bg-transparent'
  );

  const changeColor = {
    positive: 'text-[var(--semantic-color-success-default)]',
    negative: 'text-[var(--semantic-color-destructive-default)]',
    neutral: 'text-[var(--semantic-color-foreground-muted)]',
  };

  const changeArrow = {
    positive: '↑',
    negative: '↓',
    neutral: '→',
  };

  return (
    <Card className={cardClasses} role="listitem">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-[var(--semantic-color-foreground-muted)]">
            {stat.label}
          </CardTitle>
          {stat.icon && (
            <span
              className="text-[var(--semantic-color-foreground-muted)]"
              aria-hidden="true"
            >
              {stat.icon}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span
            className="text-2xl lg:text-3xl font-bold text-[var(--semantic-color-foreground-default)]"
            aria-label={`${stat.label}: ${stat.value}`}
          >
            {stat.value}
          </span>

          {showTrend && stat.change && stat.changeType && (
            <span
              className={cn(
                'text-sm font-medium flex items-center gap-0.5',
                changeColor[stat.changeType]
              )}
              aria-label={`${stat.changeType === 'positive' ? 'increased' : stat.changeType === 'negative' ? 'decreased' : 'unchanged'} by ${stat.change}`}
            >
              <span aria-hidden="true">{changeArrow[stat.changeType]}</span>
              {stat.change}
            </span>
          )}
        </div>

        {stat.description && (
          <p className="mt-1 text-xs text-[var(--semantic-color-foreground-muted)]">
            {stat.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default StatsCards;
