import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * FAQ Block
 *
 * Frequently asked questions accordion component.
 * Perfect for landing pages, help centers, and support pages.
 *
 * @accessibility
 * - Uses semantic details/summary or button/region pattern
 * - Keyboard accessible with Enter/Space to toggle
 * - ARIA expanded state announced
 * - Focus visible on all interactive elements
 */

const containerVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-[var(--semantic-color-border-default)] rounded-xl divide-y divide-[var(--semantic-color-border-default)] overflow-hidden',
        cards: 'space-y-4',
        minimal: 'divide-y divide-[var(--semantic-color-border-default)]',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const itemVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: 'border-b border-[var(--semantic-color-border-default)] last:border-b-0',
        bordered: '',
        cards: 'bg-white dark:bg-slate-900 border border-[var(--semantic-color-border-default)] rounded-xl overflow-hidden',
        minimal: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface FAQItem {
  /** Unique identifier */
  id: string;
  /** Question */
  question: string;
  /** Answer - can be string or React node */
  answer: React.ReactNode;
  /** Category for grouping */
  category?: string;
}

export interface FAQProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /** Array of FAQ items */
  items: FAQItem[];
  /** Allow multiple items open */
  allowMultiple?: boolean;
  /** Default open item IDs */
  defaultOpen?: string[];
  /** Controlled open state */
  openItems?: string[];
  /** Callback when items change */
  onOpenChange?: (openItems: string[]) => void;
  /** Group by category */
  groupByCategory?: boolean;
  /** Search enabled */
  searchable?: boolean;
  /** Header content */
  header?: React.ReactNode;
  /** Show expand all button */
  showExpandAll?: boolean;
  /** Icon position */
  iconPosition?: 'left' | 'right';
}

// Chevron icon component
const ChevronIcon: React.FC<{ className?: string; expanded?: boolean }> = ({ className, expanded }) => (
  <svg
    className={cn(
      'w-5 h-5 transition-transform duration-200',
      expanded && 'rotate-180',
      className
    )}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// Search icon component
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={cn('w-5 h-5', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// FAQ Item Component
interface FAQItemComponentProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  variant: 'default' | 'bordered' | 'cards' | 'minimal';
  iconPosition: 'left' | 'right';
}

const FAQItemComponent: React.FC<FAQItemComponentProps> = ({
  item,
  isOpen,
  onToggle,
  variant,
  iconPosition,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={cn(itemVariants({ variant }))}>
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center gap-4 text-left transition-colors',
          'py-4 px-4 sm:px-6',
          'hover:bg-slate-50 dark:hover:bg-slate-800/50',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset',
          iconPosition === 'left' && 'flex-row-reverse justify-end'
        )}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${item.id}`}
      >
        <span className="flex-1 font-medium text-[var(--semantic-color-foreground-default)] pr-4">
          {item.question}
        </span>
        <ChevronIcon
          expanded={isOpen}
          className="flex-shrink-0 text-[var(--semantic-color-foreground-muted)]"
        />
      </button>

      <div
        id={`faq-content-${item.id}`}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
        )}
        style={{ height: height !== undefined ? `${height}px` : 'auto' }}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        hidden={!isOpen && height === 0}
      >
        <div
          ref={contentRef}
          className={cn(
            'px-4 sm:px-6 pb-4',
            'text-[var(--semantic-color-foreground-muted)]',
            'prose prose-sm max-w-none dark:prose-invert',
            iconPosition === 'left' && 'pl-12'
          )}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export function FAQ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  openItems: controlledOpenItems,
  onOpenChange,
  groupByCategory = false,
  searchable = false,
  header,
  showExpandAll = false,
  iconPosition = 'right',
  variant = 'default',
  size,
  className,
  ...props
}: FAQProps) {
  const [internalOpenItems, setInternalOpenItems] = React.useState<string[]>(defaultOpen);
  const [searchQuery, setSearchQuery] = React.useState('');

  const openItemsState = controlledOpenItems ?? internalOpenItems;

  const handleToggle = (id: string) => {
    let newOpenItems: string[];

    if (allowMultiple) {
      newOpenItems = openItemsState.includes(id)
        ? openItemsState.filter((item) => item !== id)
        : [...openItemsState, id];
    } else {
      newOpenItems = openItemsState.includes(id) ? [] : [id];
    }

    setInternalOpenItems(newOpenItems);
    onOpenChange?.(newOpenItems);
  };

  const handleExpandAll = () => {
    const allIds = filteredItems.map((item) => item.id);
    const isAllExpanded = allIds.every((id) => openItemsState.includes(id));
    const newOpenItems = isAllExpanded ? [] : allIds;
    setInternalOpenItems(newOpenItems);
    onOpenChange?.(newOpenItems);
  };

  // Filter items by search query
  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(query) ||
        (typeof item.answer === 'string' && item.answer.toLowerCase().includes(query))
    );
  }, [items, searchQuery]);

  // Group items by category
  const groupedItems = React.useMemo(() => {
    if (!groupByCategory) return { '': filteredItems };

    return filteredItems.reduce((groups, item) => {
      const category = item.category || 'General';
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
      return groups;
    }, {} as Record<string, FAQItem[]>);
  }, [filteredItems, groupByCategory]);

  const allExpanded = filteredItems.every((item) => openItemsState.includes(item.id));

  return (
    <section
      className={cn('w-full', className)}
      aria-label="Frequently Asked Questions"
      {...props}
    >
      {/* Header */}
      {header && <div className="mb-8">{header}</div>}

      {/* Search and Expand All controls */}
      {(searchable || showExpandAll) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          {searchable && (
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--semantic-color-foreground-muted)]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className={cn(
                  'w-full pl-10 pr-4 py-2.5 rounded-lg',
                  'bg-white dark:bg-slate-900',
                  'border border-[var(--semantic-color-border-default)]',
                  'text-[var(--semantic-color-foreground-default)]',
                  'placeholder:text-[var(--semantic-color-foreground-muted)]',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  'transition-colors'
                )}
                aria-label="Search frequently asked questions"
              />
            </div>
          )}

          {showExpandAll && filteredItems.length > 0 && (
            <button
              onClick={handleExpandAll}
              className={cn(
                'px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
                'text-[var(--semantic-color-foreground-muted)]',
                'hover:bg-slate-100 dark:hover:bg-slate-800',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
              )}
            >
              {allExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          )}
        </div>
      )}

      {/* FAQ Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-[var(--semantic-color-foreground-muted)]">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>{searchQuery ? 'No questions found matching your search.' : 'No questions available.'}</p>
        </div>
      ) : (
        <div>
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category || 'all'} className="mb-8 last:mb-0">
              {groupByCategory && category && (
                <h3 className="text-lg font-semibold text-[var(--semantic-color-foreground-default)] mb-4">
                  {category}
                </h3>
              )}
              <div className={cn(containerVariants({ variant, size }))}>
                {categoryItems.map((item) => (
                  <FAQItemComponent
                    key={item.id}
                    item={item}
                    isOpen={openItemsState.includes(item.id)}
                    onToggle={() => handleToggle(item.id)}
                    variant={variant || 'default'}
                    iconPosition={iconPosition}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FAQ;
