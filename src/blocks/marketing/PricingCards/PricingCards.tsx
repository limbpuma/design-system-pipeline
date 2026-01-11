import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * PricingCards Block
 *
 * Display pricing tiers with features comparison.
 * Perfect for SaaS landing pages and product pages.
 *
 * @accessibility
 * - Uses semantic list structure for features
 * - Price values have aria-labels for screen readers
 * - Popular/recommended tier is announced
 * - CTAs are keyboard accessible
 */

const gridVariants = cva(
  'w-full grid',
  {
    variants: {
      columns: {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
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

const cardVariants = cva(
  'relative flex flex-col rounded-2xl p-6 transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-slate-900 border border-[var(--semantic-color-border-default)] hover:shadow-lg',
        elevated: 'bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl border border-[var(--semantic-color-border-default)]',
        gradient: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-[var(--semantic-color-border-default)] hover:shadow-lg',
      },
      highlighted: {
        true: 'ring-2 ring-blue-600 dark:ring-blue-500 scale-105 z-10',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      highlighted: false,
    },
  }
);

export interface PricingFeature {
  /** Feature text */
  text: string;
  /** Whether feature is included */
  included: boolean;
  /** Optional tooltip/info */
  info?: string;
}

export interface PricingTier {
  /** Unique identifier */
  id: string;
  /** Tier name */
  name: string;
  /** Description */
  description?: string;
  /** Price */
  price: {
    monthly?: number;
    yearly?: number;
    custom?: string;
  };
  /** Currency symbol */
  currency?: string;
  /** Features list */
  features: PricingFeature[];
  /** CTA text */
  ctaText?: string;
  /** CTA href */
  ctaHref?: string;
  /** CTA onClick */
  ctaOnClick?: () => void;
  /** Is this the popular/recommended tier */
  popular?: boolean;
  /** Popular badge text */
  popularText?: string;
  /** Is the CTA disabled */
  disabled?: boolean;
  /** Custom badge */
  badge?: string;
}

export interface PricingCardsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Array of pricing tiers */
  tiers: PricingTier[];
  /** Billing period toggle */
  billingPeriod?: 'monthly' | 'yearly';
  /** Show billing toggle */
  showBillingToggle?: boolean;
  /** Callback when billing period changes */
  onBillingPeriodChange?: (period: 'monthly' | 'yearly') => void;
  /** Card variant style */
  cardVariant?: 'default' | 'elevated' | 'gradient';
  /** Yearly discount percentage to display */
  yearlyDiscount?: number;
  /** Header content */
  header?: React.ReactNode;
}

// Check icon component
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={cn('w-5 h-5', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// X icon component
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={cn('w-5 h-5', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Info icon component
const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={cn('w-4 h-4', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Billing Toggle Component
interface BillingToggleProps {
  period: 'monthly' | 'yearly';
  onChange: (period: 'monthly' | 'yearly') => void;
  yearlyDiscount?: number;
}

const BillingToggle: React.FC<BillingToggleProps> = ({ period, onChange, yearlyDiscount }) => (
  <div className="flex items-center justify-center gap-4 mb-8">
    <button
      onClick={() => onChange('monthly')}
      className={cn(
        'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
        period === 'monthly'
          ? 'bg-blue-600 text-white'
          : 'text-[var(--semantic-color-foreground-muted)] hover:text-[var(--semantic-color-foreground-default)]'
      )}
      aria-pressed={period === 'monthly'}
    >
      Monthly
    </button>
    <button
      onClick={() => onChange('yearly')}
      className={cn(
        'px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2',
        period === 'yearly'
          ? 'bg-blue-600 text-white'
          : 'text-[var(--semantic-color-foreground-muted)] hover:text-[var(--semantic-color-foreground-default)]'
      )}
      aria-pressed={period === 'yearly'}
    >
      Yearly
      {yearlyDiscount && (
        <span className={cn(
          'px-2 py-0.5 text-xs font-medium rounded-full',
          period === 'yearly'
            ? 'bg-white/20 text-white'
            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
        )}>
          Save {yearlyDiscount}%
        </span>
      )}
    </button>
  </div>
);

// Pricing Card Component
interface PricingCardProps {
  tier: PricingTier;
  billingPeriod: 'monthly' | 'yearly';
  variant: 'default' | 'elevated' | 'gradient';
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, billingPeriod, variant }) => {
  const price = billingPeriod === 'yearly' ? tier.price.yearly : tier.price.monthly;
  const currency = tier.currency || '$';

  return (
    <article
      className={cn(cardVariants({ variant, highlighted: tier.popular }))}
      aria-label={`${tier.name} pricing tier${tier.popular ? ' - Recommended' : ''}`}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-full shadow-lg">
            {tier.popularText || 'Most Popular'}
          </span>
        </div>
      )}

      {/* Custom badge */}
      {tier.badge && !tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 text-sm font-semibold bg-amber-500 text-white rounded-full shadow-lg">
            {tier.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className={cn('text-center', (tier.popular || tier.badge) && 'pt-4')}>
        <h3 className="text-xl font-bold text-[var(--semantic-color-foreground-default)]">
          {tier.name}
        </h3>
        {tier.description && (
          <p className="mt-2 text-sm text-[var(--semantic-color-foreground-muted)]">
            {tier.description}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="mt-6 text-center">
        {tier.price.custom ? (
          <span className="text-3xl font-bold text-[var(--semantic-color-foreground-default)]">
            {tier.price.custom}
          </span>
        ) : price !== undefined ? (
          <div>
            <span
              className="text-4xl font-bold text-[var(--semantic-color-foreground-default)]"
              aria-label={`${currency}${price} per ${billingPeriod === 'yearly' ? 'year' : 'month'}`}
            >
              {currency}{price}
            </span>
            <span className="text-[var(--semantic-color-foreground-muted)]">
              /{billingPeriod === 'yearly' ? 'year' : 'month'}
            </span>
          </div>
        ) : (
          <span className="text-3xl font-bold text-[var(--semantic-color-foreground-default)]">
            Free
          </span>
        )}
      </div>

      {/* CTA */}
      <div className="mt-6">
        {tier.ctaHref ? (
          <a
            href={tier.ctaHref}
            className={cn(
              'block w-full py-3 px-6 text-center font-semibold rounded-xl transition-all duration-200',
              tier.popular
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
              tier.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
            )}
            aria-disabled={tier.disabled}
          >
            {tier.ctaText || 'Get Started'}
          </a>
        ) : (
          <button
            onClick={tier.ctaOnClick}
            disabled={tier.disabled}
            className={cn(
              'w-full py-3 px-6 font-semibold rounded-xl transition-all duration-200',
              tier.popular
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
              tier.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {tier.ctaText || 'Get Started'}
          </button>
        )}
      </div>

      {/* Features */}
      <ul className="mt-8 space-y-4 flex-1" aria-label="Features">
        {tier.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
          >
            {feature.included ? (
              <CheckIcon className="flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            ) : (
              <XIcon className="flex-shrink-0 text-slate-300 dark:text-slate-600 mt-0.5" />
            )}
            <span
              className={cn(
                'text-sm',
                feature.included
                  ? 'text-[var(--semantic-color-foreground-default)]'
                  : 'text-[var(--semantic-color-foreground-muted)] line-through'
              )}
            >
              {feature.text}
              {feature.info && (
                <span
                  className="inline-flex ml-1 text-[var(--semantic-color-foreground-muted)] cursor-help"
                  title={feature.info}
                  aria-label={feature.info}
                >
                  <InfoIcon />
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export function PricingCards({
  tiers,
  billingPeriod: controlledPeriod,
  showBillingToggle = true,
  onBillingPeriodChange,
  cardVariant = 'default',
  yearlyDiscount,
  header,
  columns,
  gap,
  className,
  ...props
}: PricingCardsProps) {
  const [internalPeriod, setInternalPeriod] = React.useState<'monthly' | 'yearly'>('monthly');

  const billingPeriod = controlledPeriod ?? internalPeriod;
  const handlePeriodChange = (period: 'monthly' | 'yearly') => {
    setInternalPeriod(period);
    onBillingPeriodChange?.(period);
  };

  return (
    <section
      className={cn('w-full', className)}
      aria-label="Pricing plans"
      {...props}
    >
      {/* Header */}
      {header && <div className="mb-8">{header}</div>}

      {/* Billing Toggle */}
      {showBillingToggle && (
        <BillingToggle
          period={billingPeriod}
          onChange={handlePeriodChange}
          yearlyDiscount={yearlyDiscount}
        />
      )}

      {/* Pricing Grid */}
      <div className={cn(gridVariants({ columns, gap }))}>
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            billingPeriod={billingPeriod}
            variant={cardVariant}
          />
        ))}
      </div>
    </section>
  );
}

export default PricingCards;
