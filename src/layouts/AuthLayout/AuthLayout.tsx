import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * AuthLayout
 *
 * Centered layout for authentication pages (login, register, forgot password).
 * Supports single panel or split panel designs.
 *
 * @accessibility
 * - Semantic main landmark
 * - Proper heading structure support
 * - Focus management for forms
 */

const layoutVariants = cva(
  'min-h-screen flex',
  {
    variants: {
      variant: {
        centered: 'items-center justify-center bg-[var(--semantic-color-background-subtle)]',
        split: 'flex-col lg:flex-row',
        minimal: 'items-center justify-center bg-[var(--semantic-color-background-default)]',
      },
    },
    defaultVariants: {
      variant: 'centered',
    },
  }
);

const contentVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        centered: 'max-w-md mx-auto p-6',
        split: 'lg:w-1/2 flex items-center justify-center p-6 lg:p-12',
        minimal: 'max-w-sm mx-auto p-6',
      },
    },
    defaultVariants: {
      variant: 'centered',
    },
  }
);

export interface AuthLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  /** Logo component */
  logo?: React.ReactNode;
  /** Footer content (links, copyright) */
  footer?: React.ReactNode;
  /** Side panel content (for split variant) */
  sideContent?: React.ReactNode;
  /** Side panel background image */
  sideImage?: string;
  /** Side panel background color/gradient */
  sideBackground?: string;
  /** Main auth content */
  children: React.ReactNode;
}

export function AuthLayout({
  logo,
  footer,
  sideContent,
  sideImage,
  sideBackground = 'bg-[var(--semantic-color-primary-default)]',
  variant,
  className,
  children,
  ...props
}: AuthLayoutProps) {
  const isSplit = variant === 'split';

  return (
    <div className={cn(layoutVariants({ variant }), className)} {...props}>
      {/* Side Panel (split variant only) */}
      {isSplit && (
        <div
          className={cn(
            'hidden lg:flex lg:w-1/2 items-center justify-center relative',
            sideImage ? '' : sideBackground
          )}
        >
          {sideImage && (
            <img
              src={sideImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {sideImage && (
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          )}
          {sideContent && (
            <div className="relative z-10 p-12 text-white max-w-lg">
              {sideContent}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main
        className={cn(
          contentVariants({ variant }),
          isSplit && 'bg-[var(--semantic-color-background-default)]'
        )}
        role="main"
      >
        <div className="w-full space-y-6">
          {/* Logo */}
          {logo && (
            <div className={cn('flex', variant === 'centered' ? 'justify-center' : 'justify-start')}>
              {logo}
            </div>
          )}

          {/* Auth Form/Content */}
          {children}

          {/* Footer */}
          {footer && (
            <div className="pt-6 text-center text-sm text-[var(--semantic-color-foreground-muted)]">
              {footer}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
