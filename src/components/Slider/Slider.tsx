import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const sliderVariants = cva(
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      size: {
        sm: '[&_.track]:h-1 [&_.thumb]:h-4 [&_.thumb]:w-4',
        md: '[&_.track]:h-2 [&_.thumb]:h-5 [&_.thumb]:w-5',
        lg: '[&_.track]:h-3 [&_.thumb]:h-6 [&_.thumb]:w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SliderProps extends VariantProps<typeof sliderVariants> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  label?: string;
  showValue?: boolean;
  showMinMax?: boolean;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    onChangeEnd,
    label,
    showValue = true,
    showMinMax,
    formatValue = (v) => v.toString(),
    disabled,
    size,
    className,
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [isDragging, setIsDragging] = React.useState(false);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const value = controlledValue ?? internalValue;
    const percentage = ((value - min) / (max - min)) * 100;

    const updateValue = React.useCallback((clientX: number) => {
      if (!trackRef.current || disabled) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + percent * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      setInternalValue(clampedValue);
      onChange?.(clampedValue);
    }, [min, max, step, onChange, disabled]);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      updateValue(e.clientX);
    };

    React.useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => updateValue(e.clientX);
      const handleMouseUp = () => {
        setIsDragging(false);
        onChangeEnd?.(value);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, updateValue, onChangeEnd, value]);

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="mb-2 flex items-center justify-between">
            {label && (
              <label className="text-sm font-medium text-[var(--semantic-color-foreground-default)]">
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-sm font-medium text-[var(--semantic-color-foreground-muted)]">
                {formatValue(value)}
              </span>
            )}
          </div>
        )}

        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-disabled={disabled}
          className={cn(sliderVariants({ size }), disabled && 'opacity-50 cursor-not-allowed')}
          onMouseDown={handleMouseDown}
          onKeyDown={(e) => {
            if (disabled) return;
            const step = (max - min) / 100;
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              onChange?.(Math.min(max, value + step));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              onChange?.(Math.max(min, value - step));
            }
          }}
        >
          <div
            ref={trackRef}
            className="track relative w-full grow overflow-hidden rounded-full bg-[var(--semantic-color-background-muted)]"
          >
            <div
              className="absolute h-full bg-[var(--semantic-color-primary-default)] transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div
            className="thumb absolute rounded-full border-2 border-[var(--semantic-color-primary-default)] bg-[var(--semantic-color-background-default)] shadow-md transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--semantic-color-ring-default)]"
            style={{ left: `calc(${percentage}% - ${size === 'sm' ? '8px' : size === 'lg' ? '12px' : '10px'})` }}
          />
        </div>

        {showMinMax && (
          <div className="mt-1 flex justify-between text-xs text-[var(--semantic-color-foreground-muted)]">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider, sliderVariants };
