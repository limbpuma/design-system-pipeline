import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useTheme, type Theme } from './useTheme';

const themeToggleVariants = cva(
  'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-color-ring-default)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        button: 'rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] hover:bg-[var(--semantic-color-background-subtle)]',
        ghost: 'rounded-md hover:bg-[var(--semantic-color-background-subtle)]',
        minimal: '',
      },
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'button',
      size: 'md',
    },
  }
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const SystemIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

export interface ThemeToggleProps extends VariantProps<typeof themeToggleVariants> {
  className?: string;
  showLabel?: boolean;
  showSystemOption?: boolean;
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, variant, size, showLabel, showSystemOption, ...props }, ref) => {
    const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);

    const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';

    if (showSystemOption) {
      return (
        <div className="relative">
          <button
            ref={ref}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(themeToggleVariants({ variant, size }), 'gap-2', showLabel && 'px-3 w-auto', className)}
            aria-label="Toggle theme"
            {...props}
          >
            {resolvedTheme === 'dark' ? <MoonIcon className={iconSize} /> : <SunIcon className={iconSize} />}
            {showLabel && <span className="text-sm capitalize">{theme}</span>}
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-popover-default)] p-1 shadow-lg z-50">
              {(['light', 'dark', 'system'] as Theme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTheme(t); setIsOpen(false); }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-[var(--semantic-color-background-subtle)]',
                    theme === t && 'bg-[var(--semantic-color-background-muted)]'
                  )}
                >
                  {t === 'light' && <SunIcon className="h-4 w-4" />}
                  {t === 'dark' && <MoonIcon className="h-4 w-4" />}
                  {t === 'system' && <SystemIcon className="h-4 w-4" />}
                  <span className="capitalize">{t}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggleTheme}
        className={cn(themeToggleVariants({ variant, size }), className)}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
        {...props}
      >
        {resolvedTheme === 'dark' ? <SunIcon className={iconSize} /> : <MoonIcon className={iconSize} />}
      </button>
    );
  }
);
ThemeToggle.displayName = 'ThemeToggle';

export { ThemeToggle, themeToggleVariants };
