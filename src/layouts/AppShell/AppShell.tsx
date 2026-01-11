import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * AppShell Layout
 *
 * Main application layout with optional sidebar, header, and footer.
 * Used for dashboard and application pages.
 *
 * @accessibility
 * - Uses semantic landmarks (nav, main, aside, header, footer)
 * - Skip link support built-in
 * - Sidebar has proper aria-label
 * - Responsive with collapsible sidebar
 */

const shellVariants = cva(
  'min-h-screen',
  {
    variants: {
      variant: {
        default: 'bg-[var(--semantic-color-background-default)]',
        subtle: 'bg-[var(--semantic-color-background-subtle)]',
      },
    },
    defaultVariants: {
      variant: 'subtle',
    },
  }
);

const sidebarVariants = cva(
  [
    'fixed inset-y-0 left-0 z-50 flex flex-col',
    'bg-[var(--semantic-color-card-default)]',
    'border-r border-[var(--semantic-color-border-default)]',
    'transition-all duration-300 ease-in-out',
  ],
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: 'w-64',
      },
      hidden: {
        true: '-translate-x-full lg:translate-x-0',
        false: 'translate-x-0',
      },
    },
    defaultVariants: {
      collapsed: false,
      hidden: false,
    },
  }
);

export interface AppShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  /** Sidebar content */
  sidebar?: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Collapse sidebar to icons only */
  sidebarCollapsed?: boolean;
  /** Hide sidebar on mobile */
  sidebarHidden?: boolean;
  /** Sidebar label for accessibility */
  sidebarLabel?: string;
  /** Main content */
  children: React.ReactNode;
}

export function AppShell({
  sidebar,
  header,
  footer,
  sidebarCollapsed = false,
  sidebarHidden = true,
  sidebarLabel = 'Main navigation',
  variant,
  className,
  children,
  ...props
}: AppShellProps) {
  const mainId = React.useId();

  return (
    <div className={cn(shellVariants({ variant }), 'flex', className)} {...props}>
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

      {/* Sidebar */}
      {sidebar && (
        <aside
          className={cn(sidebarVariants({ collapsed: sidebarCollapsed, hidden: sidebarHidden }))}
          aria-label={sidebarLabel}
        >
          {sidebar}
        </aside>
      )}

      {/* Main wrapper */}
      <div
        className={cn(
          'flex-1 flex flex-col min-h-screen transition-all duration-300',
          sidebar && !sidebarHidden && (sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64')
        )}
      >
        {/* Header */}
        {header && (
          <header
            className={cn(
              'sticky top-0 z-40',
              'bg-[var(--semantic-color-background-default)]',
              'border-b border-[var(--semantic-color-border-default)]'
            )}
          >
            {header}
          </header>
        )}

        {/* Main Content */}
        <main
          id={mainId}
          className="flex-1 p-4 lg:p-6"
          role="main"
        >
          {children}
        </main>

        {/* Footer */}
        {footer && (
          <footer
            className={cn(
              'mt-auto',
              'border-t border-[var(--semantic-color-border-default)]',
              'bg-[var(--semantic-color-background-default)]'
            )}
          >
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

export default AppShell;
