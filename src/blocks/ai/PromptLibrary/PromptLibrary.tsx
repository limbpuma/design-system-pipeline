import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  description?: string;
  category?: string;
  tags?: string[];
  variables?: string[];
  isFavorite?: boolean;
  usageCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PromptLibraryProps {
  prompts: Prompt[];
  onSelectPrompt?: (prompt: Prompt) => void;
  onEditPrompt?: (prompt: Prompt) => void;
  onDeletePrompt?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onCreatePrompt?: () => void;
  selectedPromptId?: string;
  searchable?: boolean;
  showCategories?: boolean;
  showUsageStats?: boolean;
  className?: string;
}

const PromptLibrary: React.FC<PromptLibraryProps> = ({
  prompts,
  onSelectPrompt,
  onEditPrompt,
  onDeletePrompt,
  onToggleFavorite,
  onCreatePrompt,
  selectedPromptId,
  searchable = true,
  showCategories = true,
  showUsageStats = false,
  className,
}) => {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false);

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    prompts.forEach((p) => p.category && cats.add(p.category));
    return Array.from(cats);
  }, [prompts]);

  const filteredPrompts = React.useMemo(() => {
    return prompts.filter((p) => {
      if (showFavoritesOnly && !p.isFavorite) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [prompts, search, selectedCategory, showFavoritesOnly]);

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Header */}
      <div className="border-b border-[var(--semantic-color-border-default)] p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[var(--semantic-color-foreground-default)]">
            Prompt Library
          </h2>
          {onCreatePrompt && (
            <button
              onClick={onCreatePrompt}
              className="flex items-center gap-1 rounded-md bg-[var(--semantic-color-primary-default)] px-3 py-1.5 text-sm text-[var(--semantic-color-primary-foreground)] hover:bg-[var(--semantic-color-primary-hover)]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New
            </button>
          )}
        </div>

        {searchable && (
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--semantic-color-foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts..."
              className="w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] py-2 pl-9 pr-3 text-sm placeholder-[var(--semantic-color-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--semantic-color-ring-default)]"
            />
          </div>
        )}

        {/* Filters */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={cn(
              'flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors',
              showFavoritesOnly
                ? 'bg-[var(--semantic-color-warning-default)]/20 text-[var(--semantic-color-warning-default)]'
                : 'bg-[var(--semantic-color-background-muted)] text-[var(--semantic-color-foreground-muted)] hover:bg-[var(--semantic-color-background-subtle)]'
            )}
          >
            <svg className="h-3 w-3" fill={showFavoritesOnly ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Favorites
          </button>
          {showCategories && categories.length > 0 && (
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-2 py-1 text-xs"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Prompt List - scrollable */}
      <div
        role="region"
        aria-label="Prompt list"
        className={cn(
          'flex-1 overflow-y-auto p-2'
        )}
      >
        {filteredPrompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="h-12 w-12 text-[var(--semantic-color-foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-sm text-[var(--semantic-color-foreground-muted)]">No prompts found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredPrompts.map((prompt) => (
              <button
                type="button"
                key={prompt.id}
                onClick={() => onSelectPrompt?.(prompt)}
                className={cn(
                  'w-full text-left cursor-pointer rounded-lg border p-3 transition-colors',
                  selectedPromptId === prompt.id
                    ? 'border-[var(--semantic-color-primary-default)] bg-[var(--semantic-color-primary-default)]/5'
                    : 'border-[var(--semantic-color-border-default)] hover:border-[var(--semantic-color-border-strong)]'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-[var(--semantic-color-foreground-default)]">{prompt.title}</h3>
                      {prompt.isFavorite && (
                        <svg className="h-4 w-4 text-[var(--semantic-color-warning-default)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      )}
                    </div>
                    {prompt.description && (
                      <p className="mt-1 text-sm text-[var(--semantic-color-foreground-muted)] line-clamp-2">{prompt.description}</p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {prompt.category && (
                        <span className="rounded bg-[var(--semantic-color-accent-default)] px-1.5 py-0.5 text-xs text-[var(--semantic-color-accent-foreground)]">
                          {prompt.category}
                        </span>
                      )}
                      {prompt.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded bg-[var(--semantic-color-background-muted)] px-1.5 py-0.5 text-xs text-[var(--semantic-color-foreground-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {showUsageStats && prompt.usageCount !== undefined && (
                      <p className="mt-2 text-xs text-[var(--semantic-color-foreground-muted)]">
                        Used {prompt.usageCount} times
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="toolbar" aria-label="Prompt actions">
                    {onToggleFavorite && (
                      <button
                        onClick={() => onToggleFavorite(prompt.id)}
                        className="rounded p-1 hover:bg-[var(--semantic-color-background-subtle)]"
                        aria-label={prompt.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <svg className={cn('h-4 w-4', prompt.isFavorite ? 'text-[var(--semantic-color-warning-default)]' : 'text-[var(--semantic-color-foreground-muted)]')} fill={prompt.isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    )}
                    {onEditPrompt && (
                      <button
                        onClick={() => onEditPrompt(prompt)}
                        className="rounded p-1 hover:bg-[var(--semantic-color-background-subtle)]"
                        aria-label="Edit prompt"
                      >
                        <svg className="h-4 w-4 text-[var(--semantic-color-foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                    {onDeletePrompt && (
                      <button
                        onClick={() => onDeletePrompt(prompt.id)}
                        className="rounded p-1 hover:bg-[var(--semantic-color-destructive-default)]/10"
                        aria-label="Delete prompt"
                      >
                        <svg className="h-4 w-4 text-[var(--semantic-color-destructive-default)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { PromptLibrary };
