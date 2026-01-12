import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const textareaVariants = cva(
  'flex w-full rounded-md border transition-colors placeholder:text-[var(--semantic-color-foreground-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-color-ring-default)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)]',
        filled: 'border-transparent bg-[var(--semantic-color-background-muted)]',
        outline: 'border-[var(--semantic-color-border-strong)] bg-transparent',
      },
      textareaSize: {
        sm: 'min-h-[60px] px-3 py-2 text-xs',
        md: 'min-h-[80px] px-4 py-3 text-sm',
        lg: 'min-h-[120px] px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      textareaSize: 'md',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, textareaSize, label, error, helperText, maxLength, showCount, autoResize, id, value, onChange, ...props }, ref) => {
    const textareaId = id || React.useId();
    const [internalValue, setInternalValue] = React.useState(value?.toString() || '');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const currentLength = internalValue.length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);

      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    React.useEffect(() => {
      if (value !== undefined) setInternalValue(value.toString());
    }, [value]);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={textareaRef}
          value={internalValue}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            textareaVariants({ variant, textareaSize }),
            autoResize && 'resize-none overflow-hidden',
            error && 'border-[var(--semantic-color-destructive-default)]',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        <div className="mt-1.5 flex items-center justify-between">
          <div>
            {error && (
              <p className="text-xs text-[var(--semantic-color-destructive-default)]">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-xs text-[var(--semantic-color-foreground-muted)]">{helperText}</p>
            )}
          </div>
          {showCount && maxLength && (
            <p className={cn(
              'text-xs',
              currentLength >= maxLength ? 'text-[var(--semantic-color-destructive-default)]' : 'text-[var(--semantic-color-foreground-muted)]'
            )}>
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
