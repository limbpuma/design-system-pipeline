import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button Component
 * A versatile button with multiple variants and sizes
 * Uses semantic design tokens for consistent theming
 */

// Button variants using CVA (Class Variance Authority)
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--semantic-color-primary-default)]',
          'text-[var(--semantic-color-primary-foreground)]',
          'hover:bg-[var(--semantic-color-primary-hover)]',
          'active:bg-[var(--semantic-color-primary-active)]',
          'focus-visible:ring-[var(--semantic-color-ring-default)]',
        ].join(' '),
        secondary: [
          'bg-[var(--semantic-color-secondary-default)]',
          'text-[var(--semantic-color-secondary-foreground)]',
          'hover:bg-[var(--semantic-color-secondary-hover)]',
          'active:bg-[var(--semantic-color-secondary-active)]',
          'focus-visible:ring-[var(--semantic-color-ring-default)]',
        ].join(' '),
        outline: [
          'border border-[var(--semantic-color-border-default)]',
          'bg-transparent',
          'hover:bg-[var(--semantic-color-accent-default)]',
          'hover:text-[var(--semantic-color-accent-foreground)]',
          'focus-visible:ring-[var(--semantic-color-ring-default)]',
        ].join(' '),
        ghost: [
          'bg-transparent',
          'hover:bg-[var(--semantic-color-accent-default)]',
          'hover:text-[var(--semantic-color-accent-foreground)]',
          'focus-visible:ring-[var(--semantic-color-ring-default)]',
        ].join(' '),
        danger: [
          'bg-[var(--semantic-color-destructive-default)]',
          'text-[var(--semantic-color-destructive-foreground)]',
          'hover:bg-[var(--semantic-color-destructive-hover)]',
          'active:bg-[var(--semantic-color-destructive-active)]',
          'focus-visible:ring-[var(--semantic-color-destructive-default)]',
        ].join(' '),
        success: [
          'bg-[var(--semantic-color-success-default)]',
          'text-[var(--semantic-color-success-foreground)]',
          'hover:bg-[var(--semantic-color-success-hover)]',
          'active:bg-[var(--semantic-color-success-active)]',
          'focus-visible:ring-[var(--semantic-color-success-default)]',
        ].join(' '),
        link: [
          'text-[var(--semantic-color-primary-default)]',
          'underline-offset-4 hover:underline',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-3 py-1.5 text-sm rounded-md',
        md: 'h-10 px-4 py-2 text-base rounded-md',
        lg: 'h-12 px-6 py-3 text-lg rounded-md',
        icon: 'h-10 w-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  children,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      ) : null}
      {children}
    </button>
  );
}

export { buttonVariants };
export default Button;
