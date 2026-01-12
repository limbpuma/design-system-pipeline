import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * PromptInput Component
 *
 * Professional AI prompt input with rich visual feedback.
 * Features voice input, file attachments, suggestions, and character count.
 *
 * @accessibility
 * - Proper labeling and ARIA attributes
 * - Keyboard navigation support
 * - Focus management for suggestions
 * - Screen reader announcements
 */

const inputVariants = cva(
  'w-full rounded-2xl border transition-all duration-300 backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: [
          'bg-white/80 dark:bg-slate-900/80',
          'border-slate-200 dark:border-slate-700',
          'focus-within:border-blue-400 dark:focus-within:border-blue-500',
          'focus-within:ring-4 focus-within:ring-blue-500/10 dark:focus-within:ring-blue-400/20',
          'focus-within:shadow-lg focus-within:shadow-blue-500/5',
        ],
        ghost: [
          'border-transparent',
          'bg-slate-100/80 dark:bg-slate-800/80',
          'focus-within:bg-white dark:focus-within:bg-slate-900',
          'focus-within:border-slate-200 dark:focus-within:border-slate-700',
          'focus-within:ring-4 focus-within:ring-slate-500/10',
        ],
        elevated: [
          'bg-white dark:bg-slate-900',
          'border-slate-200 dark:border-slate-700',
          'shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50',
          'focus-within:shadow-2xl focus-within:shadow-blue-500/10',
          'focus-within:border-blue-400 dark:focus-within:border-blue-500',
        ],
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

export interface PromptSuggestion {
  id: string;
  text: string;
  icon?: React.ReactNode;
  category?: string;
  description?: string;
}

export interface PromptInputProps extends VariantProps<typeof inputVariants> {
  /** Current value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Submit handler */
  onSubmit: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Suggestions to show */
  suggestions?: PromptSuggestion[];
  /** Handler for suggestion selection */
  onSuggestionSelect?: (suggestion: PromptSuggestion) => void;
  /** Show voice input button */
  showVoice?: boolean;
  /** Voice input active state */
  isVoiceActive?: boolean;
  /** Voice input handler */
  onVoiceToggle?: () => void;
  /** Show file attachment button */
  showAttachment?: boolean;
  /** File attachment handler */
  onAttachment?: () => void;
  /** Attached files preview */
  attachments?: Array<{ name: string; type: string; preview?: string }>;
  /** Remove attachment handler */
  onRemoveAttachment?: (index: number) => void;
  /** Loading/processing state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Auto-resize textarea */
  autoResize?: boolean;
  /** Maximum rows for auto-resize */
  maxRows?: number;
  /** Character limit */
  maxLength?: number;
  /** Show character count */
  showCharCount?: boolean;
  /** Additional class name */
  className?: string;
}

// Animated microphone for voice recording
const VoicePulse: React.FC = () => (
  <span className="relative flex h-5 w-5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
    <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-red-500">
      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
      </svg>
    </span>
  </span>
);

// Sparkle icon for AI suggestions
const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={cn('w-4 h-4', className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
  </svg>
);

export function PromptInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Ask anything...',
  suggestions = [],
  onSuggestionSelect,
  showVoice = false,
  isVoiceActive = false,
  onVoiceToggle,
  showAttachment = false,
  onAttachment,
  attachments = [],
  onRemoveAttachment,
  isLoading = false,
  disabled = false,
  autoResize = true,
  maxRows = 6,
  maxLength,
  showCharCount = false,
  variant,
  size,
  className,
}: PromptInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = React.useState(-1);
  const [isFocused, setIsFocused] = React.useState(false);

  // Auto-resize logic
  React.useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight);
      const maxHeight = lineHeight * maxRows;
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;
    }
  }, [value, autoResize, maxRows]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showSuggestions && selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
        onSuggestionSelect?.(suggestions[selectedSuggestion]);
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
      } else if (value.trim() && !isLoading && !disabled) {
        onSubmit(value);
      }
    } else if (e.key === 'ArrowDown' && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp' && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestion((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = maxLength ? e.target.value.slice(0, maxLength) : e.target.value;
    onChange(newValue);
    setShowSuggestions(newValue.length > 0 && suggestions.length > 0);
    setSelectedSuggestion(-1);
  };

  const handleSubmit = () => {
    if (value.trim() && !isLoading && !disabled) {
      onSubmit(value);
    }
  };

  const charCountColor = React.useMemo(() => {
    if (!maxLength) return 'text-slate-400';
    const ratio = value.length / maxLength;
    if (ratio >= 0.9) return 'text-red-500';
    if (ratio >= 0.75) return 'text-amber-500';
    return 'text-slate-400';
  }, [value.length, maxLength]);

  return (
    <div className={cn('relative', className)}>
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 animate-in slide-in-from-bottom-2 duration-300">
          {attachments.map((file, index) => (
            <div
              key={index}
              className={cn(
                'group flex items-center gap-2 px-3 py-2 rounded-xl',
                'bg-slate-100 dark:bg-slate-800',
                'border border-slate-200 dark:border-slate-700',
                'hover:border-slate-300 dark:hover:border-slate-600',
                'transition-all duration-200'
              )}
            >
              {file.preview ? (
                <div className="w-8 h-8 rounded-lg overflow-hidden ring-2 ring-white dark:ring-slate-900 shadow-sm">
                  <img src={file.preview} alt={`Preview of ${file.name}`} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                  {file.name}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{file.type.split('/')[1]?.toUpperCase()}</span>
              </div>
              {onRemoveAttachment && (
                <button
                  onClick={() => onRemoveAttachment(index)}
                  className={cn(
                    'ml-1 p-1 rounded-full',
                    'text-slate-400 hover:text-red-500',
                    'hover:bg-red-50 dark:hover:bg-red-900/30',
                    'opacity-0 group-hover:opacity-100',
                    'transition-all duration-200'
                  )}
                  aria-label={`Remove ${file.name}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main input container */}
      <div className={cn(inputVariants({ variant, size }), isFocused && 'ring-4')}>
        <div className="flex items-end gap-2 p-3">
          {/* Attachment button */}
          {showAttachment && (
            <button
              type="button"
              onClick={onAttachment}
              disabled={disabled || isLoading}
              className={cn(
                'flex-shrink-0 p-2.5 rounded-xl transition-all duration-200',
                'text-slate-500 dark:text-slate-400',
                'hover:bg-slate-100 dark:hover:bg-slate-800',
                'hover:text-slate-600 dark:hover:text-slate-300',
                'active:scale-95',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label="Attach file"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          )}

          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                setIsFocused(true);
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              placeholder={placeholder}
              disabled={disabled || isLoading}
              rows={1}
              className={cn(
                'w-full resize-none bg-transparent border-0 focus:outline-none focus:ring-0',
                'text-slate-900 dark:text-slate-100',
                'placeholder:text-slate-400 dark:placeholder:text-slate-500',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                size === 'sm' && 'text-sm py-1.5',
                size === 'md' && 'text-base py-2',
                size === 'lg' && 'text-lg py-2.5'
              )}
              aria-label="Prompt input"
            />

            {/* Character count */}
            {showCharCount && maxLength && (
              <div className={cn('absolute right-0 bottom-0 text-xs transition-colors', charCountColor)}>
                {value.length}/{maxLength}
              </div>
            )}
          </div>

          {/* Voice button */}
          {showVoice && (
            <button
              type="button"
              onClick={onVoiceToggle}
              disabled={disabled || isLoading}
              className={cn(
                'flex-shrink-0 p-2.5 rounded-xl transition-all duration-200',
                isVoiceActive
                  ? 'bg-red-50 dark:bg-red-900/30'
                  : [
                      'text-slate-500 dark:text-slate-400',
                      'hover:bg-slate-100 dark:hover:bg-slate-800',
                      'hover:text-slate-600 dark:hover:text-slate-300',
                    ],
                'active:scale-95',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
              aria-label={isVoiceActive ? 'Stop voice input' : 'Start voice input'}
            >
              {isVoiceActive ? (
                <VoicePulse />
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
            </button>
          )}

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || isLoading || !value.trim()}
            className={cn(
              'flex-shrink-0 p-2.5 rounded-xl transition-all duration-200',
              'bg-gradient-to-r from-blue-600 to-blue-500',
              'hover:from-blue-700 hover:to-blue-600',
              'text-white shadow-lg shadow-blue-500/25',
              'hover:shadow-xl hover:shadow-blue-500/30',
              'active:scale-95',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none'
            )}
            aria-label="Send message"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            className={cn(
              'absolute bottom-full left-0 right-0 mb-2 z-20',
              'bg-white dark:bg-slate-900',
              'border border-slate-200 dark:border-slate-700',
              'rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50',
              'overflow-hidden',
              'animate-in fade-in slide-in-from-bottom-2 duration-200'
            )}
          >
            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <SparkleIcon className="text-violet-500" />
                <span>Suggestions</span>
              </div>
            </div>
            <ul
              className={cn(
                'max-h-60 overflow-y-auto',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--semantic-color-ring-default)]'
              )}
              tabIndex={0}
              role="listbox"
              aria-label="Prompt suggestions"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  className={cn(
                    'px-4 py-3 cursor-pointer transition-all duration-150',
                    'hover:bg-slate-50 dark:hover:bg-slate-800',
                    index === selectedSuggestion && 'bg-blue-50 dark:bg-blue-900/30'
                  )}
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => {
                      onSuggestionSelect?.(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                  <div className="flex items-start gap-3">
                    {suggestion.icon ? (
                      <span className="text-slate-400 mt-0.5">
                        {suggestion.icon}
                      </span>
                    ) : (
                      <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mt-0.5">
                        <SparkleIcon className="text-violet-500 w-3.5 h-3.5" />
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-slate-700 dark:text-slate-200 truncate">
                          {suggestion.text}
                        </span>
                        {suggestion.category && (
                          <span className={cn(
                            'text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0',
                            'bg-slate-100 text-slate-600',
                            'dark:bg-slate-800 dark:text-slate-400'
                          )}>
                            {suggestion.category}
                          </span>
                        )}
                      </div>
                      {suggestion.description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          {suggestion.description}
                        </p>
                      )}
                    </div>
                    <svg
                      className={cn(
                        'w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0 mt-1',
                        'transition-transform duration-150',
                        index === selectedSuggestion && 'translate-x-1 text-blue-500'
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Hint text */}
      {!isFocused && !value && suggestions.length > 0 && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center animate-in fade-in duration-500">
          Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px]">↑</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px]">↓</kbd> to browse suggestions
        </p>
      )}
    </div>
  );
}

export default PromptInput;
