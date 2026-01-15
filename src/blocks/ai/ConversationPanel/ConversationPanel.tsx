import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { ChatMessage, type MessageRole, type MessageStatus } from '../../../components/ChatMessage';
import { PromptInput, type PromptSuggestion } from '../../../components/PromptInput';

/**
 * ConversationPanel Block
 *
 * A professional conversational interface for AI interactions.
 * Features elegant message threading, animated states, and smart suggestions.
 *
 * @accessibility
 * - Keyboard navigation for messages
 * - Screen reader announcements for new messages
 * - Focus management on input
 * - ARIA live regions for real-time updates
 */

const panelVariants = cva(
  'relative flex flex-col overflow-hidden transition-all duration-300',
  {
    variants: {
      variant: {
        default: [
          'rounded-2xl',
          'border border-slate-200 dark:border-slate-700',
          'bg-white dark:bg-slate-900',
          'shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50',
        ],
        embedded: [
          'bg-slate-50 dark:bg-slate-800/50',
        ],
        floating: [
          'rounded-2xl',
          'bg-white dark:bg-slate-900',
          'shadow-2xl shadow-slate-300/50 dark:shadow-slate-900/50',
          'ring-1 ring-slate-200 dark:ring-slate-700',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  error?: string;
  avatar?: string;
  senderName?: string;
  status?: MessageStatus;
}

export interface ConversationPanelProps extends VariantProps<typeof panelVariants> {
  /** Message history */
  messages: Message[];
  /** Current input value */
  inputValue: string;
  /** Input change handler */
  onInputChange: (value: string) => void;
  /** Message submit handler */
  onSubmit: (message: string) => void;
  /** Suggestions */
  suggestions?: PromptSuggestion[];
  /** Suggestion select handler */
  onSuggestionSelect?: (suggestion: PromptSuggestion) => void;
  /** Loading state (AI is responding) */
  isLoading?: boolean;
  /** Show typing indicator */
  showTypingIndicator?: boolean;
  /** Show voice input */
  showVoice?: boolean;
  /** Voice active state */
  isVoiceActive?: boolean;
  /** Voice toggle handler */
  onVoiceToggle?: () => void;
  /** Show attachments option */
  showAttachment?: boolean;
  /** Attachment handler */
  onAttachment?: () => void;
  /** Header content */
  header?: React.ReactNode;
  /** Empty state content */
  emptyState?: React.ReactNode;
  /** Placeholder text */
  placeholder?: string;
  /** Max height for message area */
  maxHeight?: string;
  /** Title for the panel */
  title?: string;
  /** Subtitle/description */
  subtitle?: string;
  /** Show connection status indicator */
  showStatus?: boolean;
  /** Connection status */
  connectionStatus?: 'online' | 'offline' | 'connecting';
  /** Additional class name */
  className?: string;
}

// Sparkle icon for AI
const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('w-5 h-5', className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
    />
  </svg>
);

// Connection status component
const ConnectionStatus: React.FC<{ status: 'online' | 'offline' | 'connecting' }> = ({ status }) => {
  const config = {
    online: { color: 'bg-emerald-500', label: 'Connected', pulse: false },
    offline: { color: 'bg-slate-400', label: 'Offline', pulse: false },
    connecting: { color: 'bg-amber-500', label: 'Connecting...', pulse: true },
  }[status];

  return (
    <div className="flex items-center gap-2" role="status" aria-label={config.label}>
      <span className="relative flex h-2.5 w-2.5">
        {config.pulse && (
          <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping', config.color)} aria-hidden="true" />
        )}
        <span className={cn('relative inline-flex rounded-full h-2.5 w-2.5', config.color)} aria-hidden="true" />
      </span>
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{config.label}</span>
    </div>
  );
};

// Quick suggestion card
const QuickSuggestion: React.FC<{
  suggestion: PromptSuggestion;
  onClick: () => void;
  index: number;
}> = ({ suggestion, onClick, index }) => {
  const icons = [
    <path key="chat" strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />,
    <path key="lightbulb" strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />,
    <path key="rocket" strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />,
    <path key="code" strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />,
  ];

  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex items-start gap-3 p-4 rounded-xl text-left w-full',
        'bg-white dark:bg-slate-800',
        'border border-slate-200 dark:border-slate-700',
        'hover:border-blue-300 dark:hover:border-blue-600',
        'hover:shadow-lg hover:shadow-blue-500/10',
        'transition-all duration-200',
        'animate-in fade-in slide-in-from-bottom-2',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
      )}
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className={cn(
        'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
        'bg-blue-100 dark:bg-blue-900/30',
        'group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40',
        'transition-colors duration-200'
      )}>
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          {icons[index % icons.length]}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {suggestion.text}
        </p>
        {suggestion.category && (
          <span className="text-xs text-slate-500 dark:text-slate-400">{suggestion.category}</span>
        )}
      </div>
      <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
};

export function ConversationPanel({
  messages,
  inputValue,
  onInputChange,
  onSubmit,
  suggestions = [],
  onSuggestionSelect,
  isLoading = false,
  showTypingIndicator = false,
  showVoice = false,
  isVoiceActive = false,
  onVoiceToggle,
  showAttachment = false,
  onAttachment,
  header,
  emptyState,
  placeholder = 'Type your message...',
  maxHeight = '500px',
  title,
  subtitle,
  showStatus = false,
  connectionStatus = 'online',
  variant,
  className,
}: ConversationPanelProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = React.useState(true);

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showTypingIndicator, isAtBottom]);

  // Track scroll position
  const handleScroll = React.useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 100);
    }
  }, []);

  const handleSubmit = (value: string) => {
    if (value.trim() && !isLoading) {
      onSubmit(value);
    }
  };

  const handleSuggestionClick = (suggestion: PromptSuggestion) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    } else {
      onSubmit(suggestion.text);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Default header
  const defaultHeader = (title || showStatus) && (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <SparkleIcon className="text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            {title || 'AI Assistant'}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
      {showStatus && <ConnectionStatus status={connectionStatus} />}
    </div>
  );

  // Default empty state
  const defaultEmptyState = (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-in fade-in duration-500">
      {/* AI Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-violet-600 flex items-center justify-center shadow-xl shadow-violet-500/25">
          <SparkleIcon className="w-8 h-8 text-white animate-pulse" />
        </div>
        <div className="absolute inset-0 -m-2 rounded-2xl border-2 border-blue-500/20 animate-ping" style={{ animationDuration: '3s' }} aria-hidden="true" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {title || 'Start a conversation'}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-8">
        {subtitle || 'Ask anything or choose a suggestion below to get started.'}
      </p>

      {/* Quick suggestions */}
      {suggestions.length > 0 && (
        <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.slice(0, 4).map((suggestion, index) => (
            <QuickSuggestion
              key={suggestion.id}
              suggestion={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Keyboard hints */}
      <div className="mt-8 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <kbd className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono">Enter</kbd>
        <span>to send</span>
        <span className="mx-1">·</span>
        <kbd className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono">Shift + Enter</kbd>
        <span>for new line</span>
      </div>
    </div>
  );

  return (
    <div className={cn(panelVariants({ variant }), className)}>
      {/* Header */}
      {(header || defaultHeader) && (
        <div className={cn(
          'flex-shrink-0 px-5 py-4',
          'border-b border-slate-100 dark:border-slate-800',
          'bg-slate-50/50 dark:bg-slate-800/50'
        )}>
          {header || defaultHeader}
        </div>
      )}

      {/* Messages area - scrollable */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={cn(
          'flex-1 overflow-y-auto p-5 space-y-4',
          'scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600',
          'scrollbar-track-transparent'
        )}
        style={{ maxHeight }}
        role="log"
        aria-label="Conversation messages"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          emptyState || defaultEmptyState
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
                isStreaming={message.isStreaming}
                error={message.error}
                avatar={message.avatar}
                senderName={message.senderName}
                status={message.status}
              />
            ))}

            {/* Typing indicator */}
            {showTypingIndicator && (
              <ChatMessage
                role="assistant"
                content=""
                isTyping
                timestamp={new Date()}
              />
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Scroll to bottom button */}
      {!isAtBottom && messages.length > 0 && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={scrollToBottom}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full',
              'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300',
              'border border-slate-200 dark:border-slate-700',
              'shadow-lg',
              'hover:bg-slate-50 dark:hover:bg-slate-700',
              'transition-all duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
            )}
            aria-label="Scroll to latest messages"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-sm font-medium">New messages</span>
          </button>
        </div>
      )}

      {/* Input area */}
      <div className={cn(
        'flex-shrink-0 p-4',
        'border-t border-slate-100 dark:border-slate-800',
        'bg-slate-50/30 dark:bg-slate-800/30'
      )}>
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 animate-in fade-in duration-200">
            <div className="flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            <span className="text-sm text-blue-600 dark:text-blue-400">AI is thinking...</span>
          </div>
        )}

        <PromptInput
          value={inputValue}
          onChange={onInputChange}
          onSubmit={handleSubmit}
          placeholder={placeholder}
          suggestions={messages.length === 0 ? [] : suggestions}
          onSuggestionSelect={onSuggestionSelect}
          showVoice={showVoice}
          isVoiceActive={isVoiceActive}
          onVoiceToggle={onVoiceToggle}
          showAttachment={showAttachment}
          onAttachment={onAttachment}
          isLoading={isLoading}
          variant="elevated"
        />

        {/* Footer disclaimer */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>AI responses may not always be accurate</span>
        </div>
      </div>
    </div>
  );
}

export default ConversationPanel;
