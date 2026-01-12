import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-color-ring-default)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=unchecked]:bg-[var(--semantic-color-muted-default)] data-[state=checked]:bg-[var(--semantic-color-primary-default)]',
        success: 'data-[state=unchecked]:bg-[var(--semantic-color-muted-default)] data-[state=checked]:bg-[var(--semantic-color-success-default)]',
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const thumbSizes = {
  sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
  md: 'h-5 w-5 data-[state=checked]:translate-x-5',
  lg: 'h-6 w-6 data-[state=checked]:translate-x-7',
};

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, variant, size = 'md', label, description, id, checked, onChange, ...props }, ref) => {
    const switchId = id || React.useId();
    const [isChecked, setIsChecked] = React.useState(checked ?? false);

    React.useEffect(() => {
      if (checked !== undefined) setIsChecked(checked);
    }, [checked]);

    const handleClick = () => {
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange?.({ target: { checked: newValue } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          data-state={isChecked ? 'checked' : 'unchecked'}
          onClick={handleClick}
          className={cn(switchVariants({ variant, size }), className)}
        >
          <span
            data-state={isChecked ? 'checked' : 'unchecked'}
            className={cn(
              'pointer-events-none block rounded-full bg-[var(--semantic-color-background-default)] shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0',
              thumbSizes[size || 'md']
            )}
          />
        </button>
        <input type="checkbox" ref={ref} id={switchId} checked={isChecked} onChange={() => {}} className="sr-only" {...props} />
        {(label || description) && (
          <div className="grid gap-1">
            {label && (
              <label htmlFor={switchId} className="text-sm font-medium leading-none text-[var(--semantic-color-foreground-default)] cursor-pointer">
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
Switch.displayName = 'Switch';

export { Switch, switchVariants };
