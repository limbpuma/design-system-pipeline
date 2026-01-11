import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { buttonVariants } from '../../../components/Button';

/**
 * HeroSection Block
 *
 * A flexible hero section for marketing pages with multiple layout options.
 * Supports image positioning, size variants, and responsive behavior.
 *
 * @accessibility
 * - Uses semantic <section> with aria-labelledby
 * - Proper heading hierarchy (h1)
 * - Image has required alt text
 * - CTA button is keyboard accessible
 */

const heroVariants = cva(
  'relative w-full overflow-hidden',
  {
    variants: {
      layout: {
        'image-left': 'flex flex-col lg:flex-row',
        'image-right': 'flex flex-col lg:flex-row-reverse',
        'image-top': 'flex flex-col',
        'image-background': 'relative',
        centered: 'flex flex-col items-center text-center',
      },
      size: {
        compact: 'py-12 lg:py-16 min-h-[400px]',
        default: 'py-16 lg:py-24 min-h-[500px]',
        hero: 'py-20 lg:py-32 min-h-[600px] lg:min-h-[80vh]',
        full: 'min-h-screen',
      },
      theme: {
        light: 'bg-[var(--semantic-color-background-default)]',
        dark: 'bg-[var(--semantic-color-background-inverse)] text-[var(--semantic-color-foreground-inverse)]',
        gradient: 'bg-gradient-to-br from-[var(--semantic-color-primary-default)] to-[var(--semantic-color-accent-default)]',
        transparent: 'bg-transparent',
      },
    },
    defaultVariants: {
      layout: 'image-right',
      size: 'default',
      theme: 'light',
    },
  }
);

const contentVariants = cva(
  'flex flex-col justify-center',
  {
    variants: {
      layout: {
        'image-left': 'lg:w-1/2 px-6 lg:px-12 py-8 lg:py-0',
        'image-right': 'lg:w-1/2 px-6 lg:px-12 py-8 lg:py-0',
        'image-top': 'px-6 lg:px-12 py-8',
        'image-background': 'relative z-10 px-6 lg:px-12 py-8 max-w-3xl mx-auto text-center',
        centered: 'px-6 lg:px-12 max-w-3xl',
      },
    },
    defaultVariants: {
      layout: 'image-right',
    },
  }
);

export interface HeroSectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroVariants> {
  /** Main headline - renders as h1 */
  title: string;
  /** Supporting text below the headline */
  subtitle?: string;
  /** Image URL */
  image?: string;
  /** Alt text for image (required for accessibility) */
  imageAlt?: string;
  /** Primary CTA button text */
  ctaText?: string;
  /** Primary CTA link destination */
  ctaHref?: string;
  /** Primary CTA button variant */
  ctaVariant?: 'primary' | 'secondary' | 'outline';
  /** Secondary CTA button text */
  secondaryCtaText?: string;
  /** Secondary CTA link destination */
  secondaryCtaHref?: string;
  /** Optional badge/tag above title */
  badge?: React.ReactNode;
  /** Additional content below CTAs */
  children?: React.ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  image,
  imageAlt = '',
  ctaText,
  ctaHref = '#',
  ctaVariant = 'primary',
  secondaryCtaText,
  secondaryCtaHref = '#',
  badge,
  layout,
  size,
  theme,
  className,
  children,
  ...props
}: HeroSectionProps) {
  const heroId = React.useId();
  const titleId = `${heroId}-title`;

  const showImage = image && layout !== 'centered';
  const isBackgroundImage = layout === 'image-background';

  return (
    <section
      className={cn(heroVariants({ layout, size, theme }), className)}
      aria-labelledby={titleId}
      {...props}
    >
      {/* Background image overlay */}
      {isBackgroundImage && image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </>
      )}

      {/* Content */}
      <div className={cn(contentVariants({ layout }))}>
        {badge && (
          <div className="mb-4">{badge}</div>
        )}

        <h1
          id={titleId}
          className={cn(
            'font-bold tracking-tight',
            'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
            theme === 'dark' || isBackgroundImage
              ? 'text-white'
              : 'text-[var(--semantic-color-foreground-default)]'
          )}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={cn(
              'mt-4 lg:mt-6 text-lg lg:text-xl max-w-2xl',
              theme === 'dark' || isBackgroundImage
                ? 'text-gray-300'
                : 'text-[var(--semantic-color-foreground-muted)]'
            )}
          >
            {subtitle}
          </p>
        )}

        {(ctaText || secondaryCtaText) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {ctaText && (
              <a
                href={ctaHref}
                className={cn(buttonVariants({ variant: ctaVariant, size: 'lg' }))}
              >
                {ctaText}
              </a>
            )}
            {secondaryCtaText && (
              <a
                href={secondaryCtaHref}
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                {secondaryCtaText}
              </a>
            )}
          </div>
        )}

        {children && (
          <div className="mt-8">{children}</div>
        )}
      </div>

      {/* Side/Top Image */}
      {showImage && !isBackgroundImage && (
        <div
          className={cn(
            layout === 'image-top' ? 'w-full h-64 lg:h-96' : 'lg:w-1/2',
            'relative'
          )}
        >
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </section>
  );
}

export default HeroSection;
