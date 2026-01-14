import * as React from 'react';
import { AppShell } from '../../../layouts/AppShell';
import { ConversationPanel, type Message } from '../../../blocks/ai/ConversationPanel';
import { type PromptSuggestion } from '../../../components/PromptInput';
import { cn } from '../../../lib/utils';

/**
 * ChatInterface Template
 *
 * Full-page chat interface for conversational AI interactions.
 * Used for search refinement, customer support, or general AI chat.
 *
 * @accessibility
 * - Keyboard navigable
 * - Screen reader announcements for new messages
 * - Focus management
 */

export interface ChatContext {
  id: string;
  title: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface ChatInterfaceProps {
  /** Conversation messages */
  messages: Message[];
  /** Current input value */
  inputValue: string;
  /** Input change handler */
  onInputChange: (value: string) => void;
  /** Message submit handler */
  onSubmit: (message: string) => void;
  /** AI is responding */
  isLoading?: boolean;
  /** Show typing indicator */
  showTypingIndicator?: boolean;
  /** Suggestions */
  suggestions?: PromptSuggestion[];
  /** Suggestion select handler */
  onSuggestionSelect?: (suggestion: PromptSuggestion) => void;
  /** Show voice input */
  showVoice?: boolean;
  /** Voice active */
  isVoiceActive?: boolean;
  /** Voice toggle handler */
  onVoiceToggle?: () => void;
  /** Show attachment option */
  showAttachment?: boolean;
  /** Attachment handler */
  onAttachment?: () => void;
  /** Current context (optional refinement panel) */
  context?: ChatContext;
  /** Context panel content */
  contextPanel?: React.ReactNode;
  /** Show context panel */
  showContextPanel?: boolean;
  /** Toggle context panel */
  onToggleContextPanel?: () => void;
  /** Sidebar content */
  sidebar: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Chat title */
  title?: string;
  /** Clear conversation handler */
  onClear?: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Additional class name */
  className?: string;
}

export function ChatInterface({
  messages,
  inputValue,
  onInputChange,
  onSubmit,
  isLoading = false,
  showTypingIndicator = false,
  suggestions = [],
  onSuggestionSelect,
  showVoice = false,
  isVoiceActive = false,
  onVoiceToggle,
  showAttachment = false,
  onAttachment,
  context,
  contextPanel,
  showContextPanel = false,
  onToggleContextPanel,
  sidebar,
  header,
  title = 'AI Assistant',
  onClear,
  placeholder = 'Type your message...',
  className,
}: ChatInterfaceProps) {
  return (
    <AppShell sidebar={sidebar} header={header} className={className}>
      <div className="h-full flex flex-col lg:flex-row gap-6">
        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[var(--semantic-color-foreground-default)]">
                  {title}
                </h1>
                {context && (
                  <p className="text-sm text-[var(--semantic-color-foreground-muted)]">
                    {context.title}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Context panel toggle */}
              {contextPanel && onToggleContextPanel && (
                <button
                  onClick={onToggleContextPanel}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    showContextPanel
                      ? 'bg-[var(--semantic-color-primary-default)] text-white'
                      : 'text-[var(--semantic-color-foreground-muted)] hover:bg-[var(--semantic-color-background-subtle)]'
                  )}
                  aria-label={showContextPanel ? 'Hide context panel' : 'Show context panel'}
                  aria-pressed={showContextPanel}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </button>
              )}

              {/* Clear conversation */}
              {onClear && messages.length > 0 && (
                <button
                  onClick={onClear}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    'text-[var(--semantic-color-foreground-muted)]',
                    'hover:bg-[var(--semantic-color-background-subtle)]',
                    'hover:text-[var(--semantic-color-foreground-default)]'
                  )}
                  aria-label="Clear conversation"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Conversation panel */}
          <ConversationPanel
            messages={messages}
            inputValue={inputValue}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            suggestions={suggestions}
            onSuggestionSelect={onSuggestionSelect}
            isLoading={isLoading}
            showTypingIndicator={showTypingIndicator}
            showVoice={showVoice}
            isVoiceActive={isVoiceActive}
            onVoiceToggle={onVoiceToggle}
            showAttachment={showAttachment}
            onAttachment={onAttachment}
            placeholder={placeholder}
            maxHeight="calc(100vh - 300px)"
            className="flex-1"
          />
        </div>

        {/* Context panel (optional) - scrollable with keyboard access */}
        {contextPanel && showContextPanel && (
          <div
            className={cn(
              'w-full lg:w-80 flex-shrink-0',
              'rounded-xl border border-[var(--semantic-color-border-default)]',
              'bg-[var(--semantic-color-card-default)]',
              'p-4 overflow-y-auto',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--semantic-color-ring-default)]'
            )}
            style={{ maxHeight: 'calc(100vh - 200px)' }}
            tabIndex={0}
            role="complementary"
            aria-label="Context panel"
          >
            {context && (
              <div className="mb-4 pb-4 border-b border-[var(--semantic-color-border-default)]">
                <div className="flex items-center gap-2">
                  {context.icon}
                  <h2 className="font-medium text-[var(--semantic-color-foreground-default)]">
                    {context.title}
                  </h2>
                </div>
                {context.description && (
                  <p className="mt-1 text-sm text-[var(--semantic-color-foreground-muted)]">
                    {context.description}
                  </p>
                )}
              </div>
            )}
            {contextPanel}
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default ChatInterface;
