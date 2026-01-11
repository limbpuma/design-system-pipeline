import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * SearchBar Component
 * Conversational search bar with voice support and suggestions
 * Designed for real estate and AI-first applications
 */

const searchBarVariants = cva(
  'relative flex items-center w-full transition-all duration-200',
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--semantic-color-card-default)]',
          'border border-[var(--semantic-color-border-default)]',
          'rounded-lg shadow-sm',
          'focus-within:ring-2 focus-within:ring-[var(--semantic-color-ring-default)]',
          'focus-within:border-[var(--semantic-color-primary-default)]',
        ].join(' '),
        hero: [
          'bg-[var(--semantic-color-card-default)]',
          'border-2 border-[var(--semantic-color-primary-default)]/20',
          'rounded-xl shadow-lg',
          'focus-within:ring-4 focus-within:ring-[var(--semantic-color-primary-default)]/20',
          'focus-within:border-[var(--semantic-color-primary-default)]',
        ].join(' '),
        minimal: [
          'bg-[var(--semantic-color-muted-default)]/50',
          'border-transparent rounded-md',
          'focus-within:bg-[var(--semantic-color-card-default)]',
          'focus-within:border focus-within:border-[var(--semantic-color-border-default)]',
        ].join(' '),
      },
      size: {
        sm: 'h-10 text-sm',
        md: 'h-12 text-base',
        lg: 'h-14 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'popular' | 'example' | 'autocomplete';
}

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof searchBarVariants> {
  /** Called when user submits a search */
  onSearch?: (query: string) => void;
  /** Show voice input button */
  showVoice?: boolean;
  /** Voice recording state (controlled externally) */
  isListening?: boolean;
  /** Called when voice button is clicked */
  onVoiceClick?: () => void;
  /** Show settings/filters button */
  showFiltersButton?: boolean;
  /** Called when filters button is clicked */
  onFiltersClick?: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Suggestions to show in dropdown */
  suggestions?: SearchSuggestion[];
  /** Called when suggestion is selected */
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  /** Show suggestions dropdown */
  showSuggestions?: boolean;
  /** Container class name */
  containerClassName?: string;
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right actions element (replaces default buttons) */
  rightActions?: React.ReactNode;
}

// Default search icon
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// Microphone icon
const MicIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

// Mic off icon
const MicOffIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" x2="22" y1="2" y2="22" />
    <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
    <path d="M5 10v2a7 7 0 0 0 12 5" />
    <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

// X icon
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Loader icon
const LoaderIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// Settings icon
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Clock icon for recent searches
const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// Sparkles icon for examples
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export function SearchBar({
  variant,
  size,
  onSearch,
  showVoice = false,
  isListening = false,
  onVoiceClick,
  showFiltersButton = false,
  onFiltersClick,
  isLoading = false,
  suggestions = [],
  onSuggestionSelect,
  showSuggestions = false,
  containerClassName,
  leftIcon,
  rightActions,
  className,
  placeholder = 'Search...',
  value,
  onChange,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? String(value) : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentValue.trim()) {
      onSearch?.(currentValue.trim());
    }
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    if (value === undefined) {
      setInternalValue('');
    }
    // Trigger onChange with empty value
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (value === undefined) {
      setInternalValue(suggestion.text);
    }
    onSuggestionSelect?.(suggestion);
    onSearch?.(suggestion.text);
  };

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    const iconClass = 'h-4 w-4 text-[var(--semantic-color-muted-foreground)]';
    switch (type) {
      case 'recent':
        return <ClockIcon className={iconClass} />;
      case 'example':
        return <SparklesIcon className={cn(iconClass, 'text-[var(--semantic-color-primary-default)]')} />;
      default:
        return <SearchIcon className={iconClass} />;
    }
  };

  const iconSize = size === 'lg' ? 'h-5 w-5' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const paddingLeft = size === 'lg' ? 'pl-14' : size === 'sm' ? 'pl-10' : 'pl-12';

  const shouldShowSuggestions = showSuggestions && isFocused && suggestions.length > 0;
  const suggestionsId = React.useId();

  return (
    <div ref={containerRef} className={cn('relative w-full', containerClassName)}>
      {/* Main search bar */}
      <div className={cn(searchBarVariants({ variant, size }), className)}>
        {/* Left icon */}
        <div className="absolute left-4 flex items-center pointer-events-none" aria-hidden="true">
          {isLoading ? (
            <LoaderIcon className={cn(iconSize, 'text-[var(--semantic-color-muted-foreground)]')} />
          ) : (
            leftIcon || <SearchIcon className={cn(iconSize, 'text-[var(--semantic-color-muted-foreground)]')} />
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? 'Listening...' : placeholder}
          className={cn(
            'flex-1 h-full bg-transparent outline-none',
            paddingLeft,
            'pr-24',
            'placeholder:text-[var(--semantic-color-muted-foreground)]',
            isListening && 'placeholder:text-[var(--semantic-color-primary-default)]'
          )}
          aria-label="Search"
          aria-expanded={shouldShowSuggestions}
          aria-haspopup="listbox"
          aria-controls={shouldShowSuggestions ? suggestionsId : undefined}
          aria-autocomplete="list"
          {...props}
        />

        {/* Right actions */}
        <div className="absolute right-2 flex items-center gap-1">
          {rightActions || (
            <>
              {/* Clear button */}
              {currentValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-2 rounded-md hover:bg-[var(--semantic-color-accent-default)] transition-colors"
                  aria-label="Clear search"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}

              {/* Voice button */}
              {showVoice && (
                <button
                  type="button"
                  onClick={onVoiceClick}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    isListening
                      ? 'bg-[var(--semantic-color-primary-default)] text-[var(--semantic-color-primary-foreground)] animate-pulse'
                      : 'hover:bg-[var(--semantic-color-accent-default)]'
                  )}
                  aria-label={isListening ? 'Stop recording' : 'Voice search'}
                >
                  {isListening ? (
                    <MicOffIcon className="h-4 w-4" />
                  ) : (
                    <MicIcon className="h-4 w-4" />
                  )}
                </button>
              )}

              {/* Filters button */}
              {showFiltersButton && (
                <button
                  type="button"
                  onClick={onFiltersClick}
                  className="p-2 rounded-md hover:bg-[var(--semantic-color-accent-default)] transition-colors"
                  aria-label="Open filters"
                >
                  <SettingsIcon className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Voice listening indicator */}
      {isListening && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          <span className="w-1 h-1 bg-[var(--semantic-color-primary-default)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-1 bg-[var(--semantic-color-primary-default)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-1 bg-[var(--semantic-color-primary-default)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}

      {/* Suggestions dropdown */}
      {shouldShowSuggestions && (
        <div
          id={suggestionsId}
          className={cn(
            'absolute z-50 w-full mt-2',
            'bg-[var(--semantic-color-popover-default)]',
            'border border-[var(--semantic-color-border-default)]',
            'rounded-lg shadow-lg py-2 max-h-80 overflow-auto',
            variant === 'hero' && 'rounded-xl'
          )}
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2',
                'text-left hover:bg-[var(--semantic-color-accent-default)] transition-colors',
                'focus:bg-[var(--semantic-color-accent-default)] focus:outline-none'
              )}
              role="option"
            >
              {getSuggestionIcon(suggestion.type)}
              <span className={cn(
                'flex-1 truncate',
                suggestion.type === 'example' && 'text-[var(--semantic-color-muted-foreground)]'
              )}>
                {suggestion.text}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { searchBarVariants };
export default SearchBar;
