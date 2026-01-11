import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * ChatMessage Component
 *
 * Professional chat message component with rich visual feedback.
 * Features avatars with status indicators, animated typing, hover actions.
 *
 * @accessibility
 * - Semantic article element for each message
 * - Screen reader friendly with role attribution
 * - Timestamp formatted for accessibility
 * - Focus visible states for interactive elements
 */

const messageVariants = cva(
  'relative max-w-[85%] rounded-2xl px-4 py-3 transition-all duration-200',
  {
    variants: {
      role: {
        user: 'ml-auto bg-blue-600 text-white rounded-br-sm shadow-sm',
        assistant: 'mr-auto bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 rounded-bl-sm shadow-sm',
        system: 'mx-auto bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200 text-center text-sm max-w-[90%] border border-amber-200 dark:border-amber-800/30',
      },
      size: {
        sm: 'text-sm px-3 py-2',
        md: 'text-base px-4 py-3',
        lg: 'text-lg px-5 py-4',
      },
    },
    defaultVariants: {
      role: 'user',
      size: 'md',
    },
  }
);

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessageProps extends VariantProps<typeof messageVariants> {
  /** Message content - can be string or React node */
  content: React.ReactNode;
  /** Role of the message sender */
  role: MessageRole;
  /** Timestamp of the message */
  timestamp?: Date | string;
  /** Avatar URL or element */
  avatar?: string | React.ReactNode;
  /** Sender name */
  senderName?: string;
  /** Whether the message is being streamed */
  isStreaming?: boolean;
  /** Whether to show typing indicator */
  isTyping?: boolean;
  /** Online status for avatar */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Error state */
  error?: string;
  /** Actions available for this message */
  actions?: React.ReactNode;
  /** Show actions on hover only */
  actionsOnHover?: boolean;
  /** Reactions on the message */
  reactions?: Array<{ emoji: string; count: number; reacted?: boolean }>;
  /** Callback when reaction is clicked */
  onReactionClick?: (emoji: string) => void;
  /** Additional class name */
  className?: string;
}

// Typing indicator with staggered bounce animation
const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1.5 py-1" aria-label="Typing...">
    <span
      className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
      style={{ animationDelay: '0ms', animationDuration: '600ms' }}
    />
    <span
      className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
      style={{ animationDelay: '150ms', animationDuration: '600ms' }}
    />
    <span
      className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
      style={{ animationDelay: '300ms', animationDuration: '600ms' }}
    />
  </div>
);

// Streaming cursor animation
const StreamingCursor: React.FC = () => (
  <span className="inline-flex items-center ml-0.5">
    <span className="w-0.5 h-4 bg-current animate-pulse rounded-full" />
  </span>
);

// AI sparkle icon with gradient
const AIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('w-5 h-5', className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
    />
  </svg>
);

// User icon
const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={cn('w-5 h-5', className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

// Status indicator colors
const statusColors: Record<string, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-400',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
};

// Avatar with status indicator
interface StatusAvatarProps {
  avatar?: string | React.ReactNode;
  role: MessageRole;
  senderName?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const StatusAvatar: React.FC<StatusAvatarProps> = ({ avatar, role, senderName, status }) => {
  const renderAvatarContent = () => {
    if (avatar) {
      if (typeof avatar === 'string') {
        return (
          <img
            src={avatar}
            alt={senderName || role}
            className="w-full h-full rounded-full object-cover"
          />
        );
      }
      return avatar;
    }

    // Default avatars with improved styling
    if (role === 'assistant') {
      return (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white shadow-inner">
          <AIIcon className="w-5 h-5" />
        </div>
      );
    }

    return (
      <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
        <UserIcon className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="relative flex-shrink-0">
      <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white dark:ring-slate-900 shadow-sm">
        {renderAvatarContent()}
      </div>
      {status && (
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900',
            statusColors[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

// Message actions component - uses CSS group-hover for accessibility
interface MessageActionsProps {
  children: React.ReactNode;
  position: 'left' | 'right';
  alwaysVisible?: boolean;
}

const MessageActions: React.FC<MessageActionsProps> = ({ children, position, alwaysVisible = false }) => (
  <div
    className={cn(
      'absolute top-0 flex items-center gap-1 transition-all duration-200',
      position === 'left' ? '-left-2 -translate-x-full' : '-right-2 translate-x-full',
      alwaysVisible
        ? 'opacity-100 visible'
        : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible'
    )}
  >
    <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-1">
      {children}
    </div>
  </div>
);

// Action button component
export const MessageActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700 transition-colors"
    aria-label={label}
  >
    {icon}
  </button>
);

// Reactions component
interface ReactionsProps {
  reactions: Array<{ emoji: string; count: number; reacted?: boolean }>;
  onReactionClick?: (emoji: string) => void;
}

const Reactions: React.FC<ReactionsProps> = ({ reactions, onReactionClick }) => {
  if (!reactions || reactions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {reactions.map(({ emoji, count, reacted }) => (
        <button
          key={emoji}
          onClick={() => onReactionClick?.(emoji)}
          className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all',
            'border hover:scale-105 active:scale-95',
            reacted
              ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300'
              : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
          )}
        >
          <span>{emoji}</span>
          <span>{count}</span>
        </button>
      ))}
    </div>
  );
};

export function ChatMessage({
  content,
  role,
  timestamp,
  avatar,
  senderName,
  isStreaming = false,
  isTyping = false,
  status,
  error,
  actions,
  actionsOnHover = true,
  reactions,
  onReactionClick,
  size,
  className,
}: ChatMessageProps) {
  const formattedTime = React.useMemo(() => {
    if (!timestamp) return null;
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }, [timestamp]);

  // System messages have simpler rendering
  if (role === 'system') {
    return (
      <div
        className={cn(messageVariants({ role, size }), 'animate-in fade-in slide-in-from-top-2 duration-300', className)}
        role="status"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{content}</span>
        </div>
      </div>
    );
  }

  const isUser = role === 'user';

  return (
    <article
      className={cn(
        'flex gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-300',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className
      )}
      aria-label={`${senderName || role} message`}
    >
      {/* Avatar with status */}
      <StatusAvatar
        avatar={avatar}
        role={role}
        senderName={senderName}
        status={status}
      />

      {/* Message Content */}
      <div className={cn('flex flex-col gap-1 min-w-0', isUser ? 'items-end' : 'items-start')}>
        {/* Sender name and time */}
        {(senderName || formattedTime) && (
          <div className={cn(
            'flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400',
            isUser && 'flex-row-reverse'
          )}>
            {senderName && <span className="font-medium text-slate-700 dark:text-slate-300">{senderName}</span>}
            {formattedTime && (
              <time
                dateTime={timestamp?.toString()}
                className="text-slate-400 dark:text-slate-500"
              >
                {formattedTime}
              </time>
            )}
          </div>
        )}

        {/* Message bubble with relative positioning for actions */}
        <div className="relative">
          {/* Hover actions - shown on hover via CSS group-hover */}
          {actions && actionsOnHover && (
            <MessageActions position={isUser ? 'left' : 'right'}>
              {actions}
            </MessageActions>
          )}
          {/* Always visible actions */}
          {actions && !actionsOnHover && (
            <MessageActions position={isUser ? 'left' : 'right'} alwaysVisible>
              {actions}
            </MessageActions>
          )}

          <div
            className={cn(
              messageVariants({ role, size }),
              'hover:shadow-md transition-shadow duration-200',
              error && 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30'
            )}
          >
            {isTyping ? (
              <TypingIndicator />
            ) : error ? (
              <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <span className="font-medium">Error</span>
                  <p className="text-sm mt-0.5">{error}</p>
                </div>
              </div>
            ) : (
              <div className={cn(
                'prose prose-sm max-w-none break-words',
                isUser
                  ? 'prose-invert prose-p:text-white prose-headings:text-white prose-strong:text-white prose-code:text-blue-200'
                  : 'prose-slate dark:prose-invert prose-p:text-slate-700 dark:prose-p:text-slate-200 prose-headings:text-slate-900 dark:prose-headings:text-white'
              )}>
                {content}
                {isStreaming && !isTyping && <StreamingCursor />}
              </div>
            )}
          </div>

          {/* Reactions */}
          <Reactions reactions={reactions || []} onReactionClick={onReactionClick} />
        </div>

      </div>
    </article>
  );
}

export default ChatMessage;
