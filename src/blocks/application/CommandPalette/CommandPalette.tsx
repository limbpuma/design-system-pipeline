import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  onSelect: () => void;
  category?: string;
  disabled?: boolean;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

// Simple fuzzy search
const fuzzySearch = (query: string, text: string): boolean => {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qIndex = 0;
  for (let i = 0; i < t.length && qIndex < q.length; i++) {
    if (t[i] === q[qIndex]) qIndex++;
  }
  return qIndex === q.length;
};

const CommandPalette: React.FC<CommandPaletteProps> = ({
  items,
  open = false,
  onOpenChange,
  placeholder = 'Type a command or search...',
  emptyMessage = 'No results found.',
  className,
}) => {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredItems = React.useMemo(() => {
    if (!query) return items;
    return items.filter(
      (item) =>
        fuzzySearch(query, item.label) ||
        (item.description && fuzzySearch(query, item.description)) ||
        (item.category && fuzzySearch(query, item.category))
    );
  }, [items, query]);

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredItems.forEach((item) => {
      const category = item.category || 'Commands';
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    return groups;
  }, [filteredItems]);

  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange?.(!open);
      }
      if (!open) return;

      if (e.key === 'Escape') {
        onOpenChange?.(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filteredItems[selectedIndex];
        if (item && !item.disabled) {
          item.onSelect();
          onOpenChange?.(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange, filteredItems, selectedIndex]);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
        onKeyDown={(e) => e.key === 'Escape' && onOpenChange?.(false)}
        role="presentation"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Dialog content */}
      <div
        className={cn(
          'relative w-full max-w-lg overflow-hidden rounded-xl border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-popover-default)] shadow-2xl',
          className
        )}
        role="document"
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-[var(--semantic-color-border-default)] px-4">
          <svg className="h-5 w-5 text-[var(--semantic-color-foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-4 text-sm text-[var(--semantic-color-foreground-default)] placeholder-[var(--semantic-color-foreground-muted)] outline-none"
          />
          <kbd className="rounded border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-muted)] px-1.5 py-0.5 text-xs text-[var(--semantic-color-foreground-muted)]">
            ESC
          </kbd>
        </div>

        {/* Results - scrollable with keyboard access */}
        <div
          className={cn(
            'max-h-80 overflow-y-auto p-2',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--semantic-color-ring-default)]'
          )}
          tabIndex={0}
          role="listbox"
          aria-label="Command results"
        >
          {filteredItems.length === 0 ? (
            <p className="py-6 text-center text-sm text-[var(--semantic-color-foreground-muted)]">
              {emptyMessage}
            </p>
          ) : (
            Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} className="mb-2">
                <p className="mb-1 px-2 text-xs font-semibold uppercase text-[var(--semantic-color-foreground-muted)]">
                  {category}
                </p>
                {categoryItems.map((item) => {
                  flatIndex++;
                  const isSelected = flatIndex === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { if (!item.disabled) { item.onSelect(); onOpenChange?.(false); } }}
                      disabled={item.disabled}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        isSelected && 'bg-[var(--semantic-color-background-subtle)]',
                        !isSelected && 'hover:bg-[var(--semantic-color-background-subtle)]',
                        item.disabled && 'cursor-not-allowed opacity-50'
                      )}
                    >
                      {item.icon && <span className="text-[var(--semantic-color-foreground-muted)]">{item.icon}</span>}
                      <div className="flex-1">
                        <p className="font-medium text-[var(--semantic-color-foreground-default)]">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-[var(--semantic-color-foreground-muted)]">{item.description}</p>
                        )}
                      </div>
                      {item.shortcut && (
                        <div className="flex gap-1">
                          {item.shortcut.map((key, i) => (
                            <kbd key={i} className="rounded border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-muted)] px-1.5 py-0.5 text-xs">
                              {key}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export { CommandPalette };
