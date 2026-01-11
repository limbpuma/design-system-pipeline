import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

// Utility function for merging Tailwind classes
function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs));
}

// Button variants using CVA (Class Variance Authority)
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-600',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400',
        outline:
          'border border-gray-300 bg-transparent hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-400',
        ghost:
          'bg-transparent hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-400',
        danger:
          'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600',
        success:
          'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-600',
      },
      size: {
        sm: 'h-8 px-2.5 py-1.5 text-sm rounded-md',
        md: 'h-10 px-4 py-2 text-base rounded-md',
        lg: 'h-12 px-6 py-3 text-lg rounded-md',
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
