import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/Card';

/**
 * FeatureGrid Block
 *
 * Display a grid of features/benefits with icons, titles, and descriptions.
 * Supports multiple column layouts and card styles.
 *
 * @accessibility
 * - Uses semantic list structure
 * - Each feature card is properly labeled
 * - Icons are decorative (aria-hidden)
 */

const gridVariants = cva(
  'w-full',
  {
    variants: {
      columns: {
        2: 'grid grid-cols-1 md:grid-cols-2',
        3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      },
      gap: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
      },
    },
    defaultVariants: {
      columns: 3,
      gap: 'md',
    },
  }
);

const sectionVariants = cva(
  'w-full py-12 lg:py-20',
  {
    variants: {
      theme: {
        light: 'bg-[var(--semantic-color-background-default)]',
        subtle: 'bg-[var(--semantic-color-background-subtle)]',
        dark: 'bg-[var(--semantic-color-background-inverse)]',
      },
    },
    defaultVariants: {
      theme: 'light',
    },
  }
);

export interface Feature {
  /** Unique identifier */
  id: string;
  /** Feature icon - React node (SVG, emoji, or icon component) */
  icon?: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional link */
  href?: string;
}

export interface FeatureGridProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof gridVariants>,
    VariantProps<typeof sectionVariants> {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Array of features to display */
  features: Feature[];
  /** Card style variant */
  cardVariant?: 'default' | 'bordered' | 'elevated';
  /** Center align content */
  centered?: boolean;
}

export function FeatureGrid({
  title,
  subtitle,
  features,
  columns,
  gap,
  theme,
  cardVariant = 'default',
  centered = false,
  className,
  ...props
}: FeatureGridProps) {
  const sectionId = React.useId();
  const titleId = `${sectionId}-title`;

  return (
    <section
      className={cn(sectionVariants({ theme }), className)}
      aria-labelledby={title ? titleId : undefined}
      {...props}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className={cn('mb-12', centered && 'text-center')}>
            {title && (
              <h2
                id={titleId}
                className={cn(
                  'text-3xl lg:text-4xl font-bold',
                  theme === 'dark'
                    ? 'text-white'
                    : 'text-[var(--semantic-color-foreground-default)]'
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  'mt-4 text-lg max-w-2xl',
                  centered && 'mx-auto',
                  theme === 'dark'
                    ? 'text-gray-300'
                    : 'text-[var(--semantic-color-foreground-muted)]'
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        <ul className={cn(gridVariants({ columns, gap }))}>
          {features.map((feature) => (
            <li key={feature.id}>
              <FeatureCard
                feature={feature}
                variant={cardVariant}
                centered={centered}
                darkMode={theme === 'dark'}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: Feature;
  variant: 'default' | 'bordered' | 'elevated';
  centered: boolean;
  darkMode: boolean;
}

function FeatureCard({ feature, variant, centered, darkMode }: FeatureCardProps) {
  const cardClasses = cn(
    'h-full transition-all duration-200',
    variant === 'bordered' && 'border-2',
    variant === 'elevated' && 'shadow-lg hover:shadow-xl',
    darkMode && 'bg-gray-800 border-gray-700'
  );

  const content = (
    <Card className={cardClasses}>
      <CardHeader className={centered ? 'items-center text-center' : ''}>
        {feature.icon && (
          <div
            className={cn(
              'mb-4 p-3 rounded-lg inline-flex',
              'bg-[var(--semantic-color-primary-default)]/10',
              'text-[var(--semantic-color-primary-default)]'
            )}
            aria-hidden="true"
          >
            {feature.icon}
          </div>
        )}
        <CardTitle
          className={cn(
            darkMode ? 'text-white' : 'text-[var(--semantic-color-foreground-default)]'
          )}
        >
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription
          className={cn(
            centered && 'text-center',
            darkMode ? 'text-gray-300' : ''
          )}
        >
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );

  if (feature.href) {
    return (
      <a
        href={feature.href}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-color-ring-default)] rounded-lg"
      >
        {content}
      </a>
    );
  }

  return content;
}

export default FeatureGrid;
