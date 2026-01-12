import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const sidebarVariants = cva(
  'flex flex-col border-r transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-[var(--semantic-color-background-default)] border-[var(--semantic-color-border-default)]',
        dark: 'bg-[var(--semantic-color-background-muted)] border-[var(--semantic-color-border-muted)]',
      },
      position: {
        left: 'border-r',
        right: 'border-l',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'left',
    },
  }
);

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  children?: NavItem[];
  disabled?: boolean;
}

export interface SidebarProps extends VariantProps<typeof sidebarVariants> {
  items: NavItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsedWidth?: string;
  expandedWidth?: string;
  activeItemId?: string;
  onItemClick?: (item: NavItem) => void;
  className?: string;
}

const ChevronIcon = ({ className, direction = 'right' }: { className?: string; direction?: 'right' | 'down' }) => (
  <svg className={cn('h-4 w-4 transition-transform', direction === 'down' && 'rotate-90', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={cn('h-5 w-5', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const NavItemComponent: React.FC<{
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
  depth: number;
  onItemClick?: (item: NavItem) => void;
}> = ({ item, collapsed, isActive, depth, onItemClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      item.onClick?.();
      onItemClick?.(item);
    }
  };

  const content = (
    <button
      onClick={handleClick}
      disabled={item.disabled}
      className={cn(
        'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
        'hover:bg-[var(--semantic-color-background-subtle)]',
        isActive && 'bg-[var(--semantic-color-primary-default)]/10 text-[var(--semantic-color-primary-default)]',
        !isActive && 'text-[var(--semantic-color-foreground-default)]',
        item.disabled && 'cursor-not-allowed opacity-50',
        depth > 0 && 'ml-4'
      )}
      title={collapsed ? item.label : undefined}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      {!collapsed && (
        <>
          <span className="flex-1 truncate text-left">{item.label}</span>
          {item.badge && (
            <span className="rounded-full bg-[var(--semantic-color-primary-default)] px-2 py-0.5 text-xs text-[var(--semantic-color-primary-foreground)]">
              {item.badge}
            </span>
          )}
          {hasChildren && <ChevronIcon direction={isOpen ? 'down' : 'right'} />}
        </>
      )}
    </button>
  );

  return (
    <div>
      {item.href ? <a href={item.href}>{content}</a> : content}
      {hasChildren && isOpen && !collapsed && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <NavItemComponent
              key={child.id}
              item={child}
              collapsed={collapsed}
              isActive={false}
              depth={depth + 1}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({
    items,
    header,
    footer,
    collapsed = false,
    onCollapsedChange,
    collapsedWidth = '64px',
    expandedWidth = '256px',
    activeItemId,
    onItemClick,
    variant,
    position,
    className,
  }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(sidebarVariants({ variant, position }), className)}
        style={{ width: collapsed ? collapsedWidth : expandedWidth }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--semantic-color-border-default)] p-4">
          {!collapsed && header}
          <button
            onClick={() => onCollapsedChange?.(!collapsed)}
            className="rounded-md p-1 hover:bg-[var(--semantic-color-background-subtle)]"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <MenuIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {items.map((item) => (
              <NavItemComponent
                key={item.id}
                item={item}
                collapsed={collapsed}
                isActive={activeItemId === item.id}
                depth={0}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        {footer && (
          <div className="border-t border-[var(--semantic-color-border-default)] p-4">
            {!collapsed && footer}
          </div>
        )}
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export { Sidebar, sidebarVariants };
