import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * MarketingLayout
 *
 * Full-width layout for marketing and landing pages.
 * Features sticky navigation and flexible content areas.
 *
 * @accessibility
 * - Semantic landmarks (nav, main, footer)
 * - Skip link for keyboard users
 * - Proper ARIA labels
 */

const layoutVariants = cva(
  'min-h-screen flex flex-col',
  {
    variants: {
      variant: {
        default: 'bg-[var(--semantic-color-background-default)]',
        subtle: 'bg-[var(--semantic-color-background-subtle)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const navVariants = cva(
  [
    'w-full z-50 transition-all duration-300',
    'border-b border-[var(--semantic-color-border-default)]',
  ],
  {
    variants: {
      sticky: {
        true: 'sticky top-0',
        false: 'relative',
      },
      transparent: {
        true: 'bg-transparent border-transparent',
        false: 'bg-[var(--semantic-color-background-default)]',
      },
    },
    defaultVariants: {
      sticky: true,
      transparent: false,
    },
  }
);

export interface MarketingLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  /** Navigation content */
  nav?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Announcement bar above nav */
  announcement?: React.ReactNode;
  /** Make navigation sticky */
  stickyNav?: boolean;
  /** Transparent navigation (for hero overlays) */
  transparentNav?: boolean;
  /** Navigation aria-label */
  navLabel?: string;
  /** Main content */
  children: React.ReactNode;
}

export function MarketingLayout({
  nav,
  footer,
  announcement,
  stickyNav = true,
  transparentNav = false,
  navLabel = 'Main navigation',
  variant,
  className,
  children,
  ...props
}: MarketingLayoutProps) {
  const mainId = React.useId();

  return (
    <div className={cn(layoutVariants({ variant }), className)} {...props}>
      {/* Skip Link */}
      <a
        href={`#${mainId}`}
        className={cn(
          'sr-only focus:not-sr-only',
          'fixed top-4 left-4 z-[100]',
          'px-4 py-2 rounded-md',
          'bg-[var(--semantic-color-primary-default)]',
          'text-[var(--semantic-color-primary-foreground)]',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'focus:ring-[var(--semantic-color-ring-default)]'
        )}
      >
        Skip to main content
      </a>

      {/* Announcement Bar */}
      {announcement && (
        <div
          className={cn(
            'w-full py-2 px-4 text-center text-sm',
            'bg-[var(--semantic-color-primary-default)]',
            'text-[var(--semantic-color-primary-foreground)]'
          )}
          role="banner"
        >
          {announcement}
        </div>
      )}

      {/* Navigation */}
      {nav && (
        <nav
          className={cn(navVariants({ sticky: stickyNav, transparent: transparentNav }))}
          aria-label={navLabel}
        >
          <div className="container mx-auto px-4 lg:px-6">
            {nav}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main
        id={mainId}
        className="flex-1"
        role="main"
      >
        {children}
      </main>

      {/* Footer */}
      {footer && (
        <footer
          className={cn(
            'w-full',
            'border-t border-[var(--semantic-color-border-default)]',
            'bg-[var(--semantic-color-background-default)]'
          )}
          role="contentinfo"
        >
          {footer}
        </footer>
      )}
    </div>
  );
}

export default MarketingLayout;
