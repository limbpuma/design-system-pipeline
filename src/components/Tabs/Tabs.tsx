import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * Tabs Component
 *
 * A professional tabbed interface with multiple variants and smooth animations.
 * Built on Radix UI for complete accessibility.
 *
 * @accessibility
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - ARIA tablist, tab, tabpanel roles
 * - Focus visible states
 * - Screen reader announcements
 */

const tabsListVariants = cva(
  'inline-flex items-center gap-1',
  {
    variants: {
      variant: {
        default: [
          'p-1 rounded-lg',
          'bg-slate-100 dark:bg-slate-800',
        ],
        underline: [
          'border-b border-slate-200 dark:border-slate-700',
          'gap-0',
        ],
        pills: [
          'gap-2',
        ],
        enclosed: [
          'border-b border-slate-200 dark:border-slate-700',
          'gap-0',
        ],
      },
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
    },
  }
);

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'px-3 py-1.5 rounded-md',
          'text-slate-600 dark:text-slate-400',
          'hover:text-slate-900 dark:hover:text-slate-100',
          'data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900',
          'data-[state=active]:text-slate-900 dark:data-[state=active]:text-white',
          'data-[state=active]:shadow-sm',
        ],
        underline: [
          'px-4 py-2.5 -mb-px',
          'text-slate-600 dark:text-slate-400',
          'hover:text-slate-900 dark:hover:text-slate-100',
          'border-b-2 border-transparent',
          'data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400',
          'data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400',
        ],
        pills: [
          'px-4 py-2 rounded-full',
          'text-slate-600 dark:text-slate-400',
          'hover:bg-slate-100 dark:hover:bg-slate-800',
          'hover:text-slate-900 dark:hover:text-slate-100',
          'data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-blue-500',
          'data-[state=active]:text-white',
          'data-[state=active]:shadow-md data-[state=active]:shadow-blue-500/25',
        ],
        enclosed: [
          'px-4 py-2.5 -mb-px rounded-t-lg',
          'text-slate-600 dark:text-slate-400',
          'border border-transparent',
          'hover:text-slate-900 dark:hover:text-slate-100',
          'data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900',
          'data-[state=active]:text-slate-900 dark:data-[state=active]:text-white',
          'data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700',
          'data-[state=active]:border-b-white dark:data-[state=active]:border-b-slate-900',
        ],
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      fullWidth: {
        true: 'flex-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
    },
  }
);

// Context for variant propagation
interface TabsContextValue {
  variant: 'default' | 'underline' | 'pills' | 'enclosed';
  size: 'sm' | 'md' | 'lg';
  fullWidth: boolean;
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: 'default',
  size: 'md',
  fullWidth: false,
});

// Root Tabs component
export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    Omit<VariantProps<typeof tabsListVariants>, 'fullWidth'> {
  fullWidth?: boolean;
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ variant = 'default', size = 'md', fullWidth = false, children, ...props }, ref) => (
  <TabsContext.Provider value={{ variant: variant ?? 'default', size: size ?? 'md', fullWidth: fullWidth ?? false }}>
    <TabsPrimitive.Root ref={ref} {...props}>
      {children}
    </TabsPrimitive.Root>
  </TabsContext.Provider>
));
Tabs.displayName = 'Tabs';

// Tabs List
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant, size, fullWidth } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
});
TabsList.displayName = 'TabsList';

// Tabs Trigger with icon support
export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  /** Icon to display before the label */
  icon?: React.ReactNode;
  /** Badge/count to display after the label */
  badge?: React.ReactNode;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, icon, badge, children, ...props }, ref) => {
  const { variant, size, fullWidth } = React.useContext(TabsContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {icon && (
        <span className="flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {badge && (
        <span className={cn(
          'ml-1 flex-shrink-0 min-w-[1.25rem] px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none',
          variant === 'pills'
            ? 'bg-white/20 text-current'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
        )}>
          {badge}
        </span>
      )}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = 'TabsTrigger';

// Tabs Content with animation
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      'data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2',
      'data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0',
      'duration-200',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

// Tabs Panel - alternative name for content
const TabsPanel = TabsContent;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsPanel,
  tabsListVariants,
  tabsTriggerVariants,
};
