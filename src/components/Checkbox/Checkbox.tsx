import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const checkboxVariants = cva(
  'peer shrink-0 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-color-ring-default)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-[var(--semantic-color-border-default)] data-[state=checked]:bg-[var(--semantic-color-primary-default)] data-[state=checked]:border-[var(--semantic-color-primary-default)]',
        secondary: 'border-[var(--semantic-color-border-default)] data-[state=checked]:bg-[var(--semantic-color-secondary-default)] data-[state=checked]:border-[var(--semantic-color-secondary-default)]',
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, size, label, description, indeterminate, id, ...props }, ref) => {
    const checkboxId = id || React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={checkboxId}
          ref={inputRef}
          className={cn(checkboxVariants({ variant, size }), className)}
          {...props}
        />
        {(label || description) && (
          <div className="grid gap-1">
            {label && (
              <label htmlFor={checkboxId} className="text-sm font-medium leading-none text-[var(--semantic-color-foreground-default)] cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-[var(--semantic-color-foreground-muted)]">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
