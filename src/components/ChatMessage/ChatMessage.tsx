import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * ChatMessage Component
 *
 * A professional chat message component with elegant visual design.
 * Features smooth animations, delivery status, reactions, and rich feedback.
 *
 * @accessibility
 * - Semantic article element for each message
 * - ARIA labels for roles and status
 * - Focusable action buttons with labels
 * - Screen reader friendly timestamps
 * - All decorative icons have aria-hidden
 */

const messageVariants = cva(
  'relative max-w-[80%] transition-all duration-200',
  {
    variants: {
      role: {
        user: 'ml-auto',
        assistant: 'mr-auto',
        system: 'mx-auto max-w-[90%]',
      },
    },
    defaultVariants: {
      role: 'user',
    },
  }
);

const bubbleVariants = cva(
  'relative px-4 py-3 rounded-2xl transition-all duration-200',
  {
    variants: {
      role: {
        user: [
          'bg-gradient-to-br from-blue-600 to-blue-700',
          'text-white',
          'rounded-br-md',
          'shadow-lg shadow-blue-500/20',
        ],
        assistant: [
          'bg-white dark:bg-slate-800',
          'text-slate-900 dark:text-slate-100',
          'rounded-bl-md',
          'border border-slate-200 dark:border-slate-700',
          'shadow-sm',
        ],
        system: [
          'bg-amber-50 dark:bg-amber-900/20',
          'text-amber-900 dark:text-amber-100',
          'border border-amber-200 dark:border-amber-800/50',
          'text-center text-sm',
        ],
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
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error';

export interface ChatMessageProps extends VariantProps<typeof bubbleVariants> {
  /** Message content */
  content: React.ReactNode;
  /** Role of the message sender */
  role: MessageRole;
  /** Timestamp */
  timestamp?: Date | string;
  /** Avatar URL */
  avatar?: string;
  /** Sender name */
  senderName?: string;
  /** Message is being streamed */
  isStreaming?: boolean;
  /** Show typing indicator */
  isTyping?: boolean;
  /** Delivery status */
  status?: MessageStatus;
  /** Online status for avatar */
  onlineStatus?: 'online' | 'offline' | 'away' | 'busy';
  /** Error message */
  error?: string;
  /** Action buttons */
  actions?: React.ReactNode;
  /** Show actions on hover */
  actionsOnHover?: boolean;
  /** Reactions */
  reactions?: Array<{ emoji: string; count: number; reacted?: boolean }>;
  /** Reaction click handler */
  onReactionClick?: (emoji: string) => void;
  /** Additional class */
  className?: string;
}

// Typing indicator
const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1 py-1" role="status" aria-label="Assistant is typing">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce"
        style={{ animationDelay: `${i * 150}ms`, animationDuration: '600ms' }}
        aria-hidden="true"
      />
    ))}
  </div>
);

// Streaming cursor
const StreamingCursor: React.FC = () => (
  <span className="inline-flex ml-0.5" aria-hidden="true">
    <span className="w-0.5 h-5 bg-current animate-pulse rounded-full" />
  </span>
);

// AI Avatar
const AIAvatar: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn(
    'w-10 h-10 rounded-xl',
    'bg-gradient-to-br from-violet-500 to-blue-600',
    'flex items-center justify-center',
    'shadow-lg shadow-violet-500/30',
    className
  )}>
    <svg
      className="w-5 h-5 text-white"
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
  </div>
);

// User Avatar
const UserAvatar: React.FC<{ src?: string; name?: string; className?: string }> = ({ src, name, className }) => (
  <div className={cn(
    'w-10 h-10 rounded-xl overflow-hidden',
    'bg-slate-200 dark:bg-slate-700',
    'flex items-center justify-center',
    'ring-2 ring-white dark:ring-slate-900',
    className
  )}>
    {src ? (
      <img src={src} alt={name || 'User'} className="w-full h-full object-cover" />
    ) : (
      <svg
        className="w-5 h-5 text-slate-500 dark:text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    )}
  </div>
);

// Online status indicator
const OnlineIndicator: React.FC<{ status: 'online' | 'offline' | 'away' | 'busy' }> = ({ status }) => {
  const colors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    away: 'bg-amber-500',
    busy: 'bg-red-500',
  };

  return (
    <span
      className={cn(
        'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full',
        'border-2 border-white dark:border-slate-900',
        colors[status]
      )}
      role="status"
      aria-label={`Status: ${status}`}
    />
  );
};

// Delivery status icons
const StatusIcon: React.FC<{ status: MessageStatus }> = ({ status }) => {
  if (status === 'sending') {
    return (
      <svg className="w-3.5 h-3.5 text-slate-400 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    );
  }

  if (status === 'sent') {
    return (
      <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }

  if (status === 'delivered') {
    return (
      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7M5 19l4 4L19 13" />
      </svg>
    );
  }

  if (status === 'read') {
    return (
      <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7M5 19l4 4L19 13" />
      </svg>
    );
  }

  if (status === 'error') {
    return (
      <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  return null;
};

// Reactions component
const Reactions: React.FC<{
  reactions: Array<{ emoji: string; count: number; reacted?: boolean }>;
  onReactionClick?: (emoji: string) => void;
  isUser?: boolean;
}> = ({ reactions, onReactionClick, isUser }) => {
  if (!reactions?.length) return null;

  return (
    <div
      className={cn('flex flex-wrap gap-1 mt-2', isUser && 'justify-end')}
      role="group"
      aria-label="Message reactions"
    >
      {reactions.map(({ emoji, count, reacted }) => (
        <button
          key={emoji}
          onClick={() => onReactionClick?.(emoji)}
          className={cn(
            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
            'transition-all duration-200 hover:scale-105 active:scale-95',
            reacted
              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-300 dark:ring-blue-700'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          )}
          aria-label={`${reacted ? 'Remove' : 'Add'} ${emoji} reaction, ${count} total`}
          aria-pressed={reacted}
        >
          <span aria-hidden="true">{emoji}</span>
          <span>{count}</span>
        </button>
      ))}
    </div>
  );
};

// Message actions
const MessageActions: React.FC<{
  children: React.ReactNode;
  position: 'left' | 'right';
  visible?: boolean;
}> = ({ children, position, visible }) => (
  <div
    className={cn(
      'absolute top-1/2 -translate-y-1/2 z-10',
      'flex items-center gap-1 p-1',
      'bg-white dark:bg-slate-800 rounded-lg',
      'shadow-lg border border-slate-200 dark:border-slate-700',
      'transition-all duration-200',
      position === 'left' ? '-left-2 -translate-x-full' : '-right-2 translate-x-full',
      visible
        ? 'opacity-100 visible'
        : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible'
    )}
  >
    {children}
  </div>
);

// Action button
export const MessageActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'p-1.5 rounded-md',
      'text-slate-500 dark:text-slate-400',
      'hover:text-slate-700 dark:hover:text-slate-200',
      'hover:bg-slate-100 dark:hover:bg-slate-700',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
      'transition-colors duration-200'
    )}
    aria-label={label}
  >
    {icon}
  </button>
);

export function ChatMessage({
  content,
  role,
  timestamp,
  avatar,
  senderName,
  isStreaming = false,
  isTyping = false,
  status,
  onlineStatus,
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

  // System message
  if (role === 'system') {
    return (
      <div
        className={cn(messageVariants({ role }), 'animate-in fade-in slide-in-from-top-2 duration-300', className)}
        role="status"
      >
        <div className={cn(bubbleVariants({ role, size }))}>
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{content}</span>
          </div>
        </div>
      </div>
    );
  }

  const isUser = role === 'user';

  return (
    <article
      className={cn(
        messageVariants({ role }),
        'flex gap-3 group',
        'animate-in fade-in slide-in-from-bottom-2 duration-300',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className
      )}
      aria-label={`Message from ${senderName || role}`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0 self-end">
        {isUser ? (
          <UserAvatar src={avatar} name={senderName} />
        ) : (
          <AIAvatar />
        )}
        {onlineStatus && <OnlineIndicator status={onlineStatus} />}
      </div>

      {/* Message content */}
      <div className={cn('flex flex-col gap-1 min-w-0', isUser ? 'items-end' : 'items-start')}>
        {/* Header: name and time */}
        {(senderName || formattedTime) && (
          <div className={cn('flex items-center gap-2 text-xs px-1', isUser && 'flex-row-reverse')}>
            {senderName && (
              <span className="font-medium text-slate-700 dark:text-slate-300">{senderName}</span>
            )}
            {formattedTime && (
              <time dateTime={timestamp?.toString()} className="text-slate-400 dark:text-slate-500">
                {formattedTime}
              </time>
            )}
          </div>
        )}

        {/* Bubble */}
        <div className="relative">
          {/* Actions */}
          {actions && (
            <MessageActions position={isUser ? 'left' : 'right'} visible={!actionsOnHover}>
              {actions}
            </MessageActions>
          )}

          <div
            className={cn(
              bubbleVariants({ role, size }),
              'group-hover:shadow-md',
              error && 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50'
            )}
          >
            {isTyping ? (
              <TypingIndicator />
            ) : error ? (
              <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                  ? 'prose-invert'
                  : 'prose-slate dark:prose-invert'
              )}>
                {content}
                {isStreaming && <StreamingCursor />}
              </div>
            )}
          </div>

          {/* Reactions */}
          <Reactions reactions={reactions || []} onReactionClick={onReactionClick} isUser={isUser} />
        </div>

        {/* Footer: status */}
        {isUser && status && (
          <div className="flex items-center gap-1 px-1">
            <StatusIcon status={status} />
            <span className="text-[10px] text-slate-400 dark:text-slate-500 capitalize">
              {status === 'read' ? 'Seen' : status}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export default ChatMessage;
