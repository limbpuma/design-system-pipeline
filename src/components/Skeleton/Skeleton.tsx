import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const skeletonVariants = cva(
  'animate-pulse bg-[var(--semantic-color-background-muted)]',
  {
    variants: {
      variant: {
        default: 'rounded-md',
        circular: 'rounded-full',
        text: 'rounded h-4',
        rectangular: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  count?: number;
  gap?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, count = 1, gap = '0.5rem', style, ...props }, ref) => {
    const singleSkeleton = (key?: number) => (
      <div
        key={key}
        ref={key === undefined ? ref : undefined}
        className={cn(skeletonVariants({ variant }), className)}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      />
    );

    if (count === 1) return singleSkeleton();

    return (
      <div ref={ref} className="flex flex-col" style={{ gap }}>
        {Array.from({ length: count }, (_, i) => singleSkeleton(i))}
      </div>
    );
  }
);
Skeleton.displayName = 'Skeleton';

// Pre-built skeleton patterns
export interface SkeletonCardProps {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showActions?: boolean;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  showImage = true,
  showTitle = true,
  showDescription = true,
  showActions = false,
  className,
}) => (
  <div className={cn('rounded-lg border border-[var(--semantic-color-border-default)] p-4', className)}>
    {showImage && <Skeleton variant="rectangular" width="100%" height="160px" className="mb-4" />}
    {showTitle && <Skeleton variant="text" width="60%" height="1.5rem" className="mb-2" />}
    {showDescription && <Skeleton variant="text" count={3} gap="0.5rem" />}
    {showActions && (
      <div className="mt-4 flex gap-2">
        <Skeleton width="80px" height="36px" />
        <Skeleton width="80px" height="36px" />
      </div>
    )}
  </div>
);

export interface SkeletonListItemProps {
  showAvatar?: boolean;
  showSubtitle?: boolean;
  showAction?: boolean;
  className?: string;
}

const SkeletonListItem: React.FC<SkeletonListItemProps> = ({
  showAvatar = true,
  showSubtitle = true,
  showAction = false,
  className,
}) => (
  <div className={cn('flex items-center gap-3 py-3', className)}>
    {showAvatar && <Skeleton variant="circular" width="40px" height="40px" />}
    <div className="flex-1">
      <Skeleton variant="text" width="40%" height="1rem" className="mb-1" />
      {showSubtitle && <Skeleton variant="text" width="60%" height="0.875rem" />}
    </div>
    {showAction && <Skeleton width="60px" height="32px" />}
  </div>
);

export interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  className,
}) => (
  <div className={cn('w-full', className)}>
    {showHeader && (
      <div className="flex gap-4 border-b border-[var(--semantic-color-border-default)] pb-3 mb-3">
        {Array.from({ length: columns }, (_, i) => (
          <Skeleton key={i} variant="text" width={`${100 / columns}%`} height="1rem" />
        ))}
      </div>
    )}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className="flex gap-4 py-3">
        {Array.from({ length: columns }, (_, colIndex) => (
          <Skeleton key={colIndex} variant="text" width={`${100 / columns}%`} height="1rem" />
        ))}
      </div>
    ))}
  </div>
);

export { Skeleton, SkeletonCard, SkeletonListItem, SkeletonTable, skeletonVariants };
