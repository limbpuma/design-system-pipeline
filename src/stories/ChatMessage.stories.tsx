import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ChatMessage, MessageActionButton } from '../components/ChatMessage';

/**
 * ChatMessage Component Stories
 *
 * Professional chat message component with rich visual feedback.
 * Features avatars with status indicators, animated typing, hover actions.
 */

// Chat container wrapper for better visual presentation
const ChatContainer: React.FC<{
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}> = ({ children, title = 'AI Assistant', subtitle = 'Online', showHeader = true }) => (
  <div className="w-full max-w-2xl mx-auto">
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Chat Header */}
      {showHeader && (
        <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors" aria-label="Settings">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Messages Area */}
      <div className="p-5 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900 min-h-[200px] max-h-[500px] overflow-y-auto">
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  </div>
);

// Simple message wrapper for single message stories
const SingleMessageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl min-h-[150px] flex items-center">
    <div className="w-full flex flex-col gap-4">
      {children}
    </div>
  </div>
);

const meta: Meta<typeof ChatMessage> = {
  title: 'AI/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'subtle',
      values: [
        { name: 'subtle', value: '#f8fafc' },
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    docs: {
      description: {
        component: `
A professional chat message component designed for AI-powered conversational interfaces.

## Features
- **Role-based styling**: Different visual styles for user, assistant, and system messages
- **Rich avatars**: Support for images, status indicators, and default AI/user icons
- **Interactive actions**: Hover actions for copy, regenerate, feedback
- **Animations**: Smooth entrance animations, typing indicators, streaming cursor
- **Reactions**: Emoji reactions with counts
- **Accessibility**: Full keyboard navigation and screen reader support
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'assistant', 'system'],
      description: 'The role of the message sender',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the message',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Online status indicator for avatar',
    },
    isStreaming: {
      control: 'boolean',
      description: 'Show streaming cursor animation',
    },
    isTyping: {
      control: 'boolean',
      description: 'Show typing indicator dots',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full min-w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

// Icons for action buttons
const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ThumbsUpIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

const ThumbsDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
  </svg>
);

/**
 * Default user message with clean, modern styling
 */
export const UserMessage: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'user',
    content: 'Can you analyze this image of my house roof for potential damage?',
    timestamp: new Date(),
    senderName: 'John',
    status: 'online',
  },
};

/**
 * AI assistant response with professional formatting
 */
export const AssistantMessage: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'assistant',
    content: "I've analyzed the image of your roof. I found 3 areas of concern:\n\n1. **Missing shingles** in the northeast corner\n2. **Moss growth** along the ridge line\n3. **Potential water damage** near the chimney flashing\n\nI recommend getting a professional inspection within the next 30 days.",
    timestamp: new Date(),
    senderName: 'AI Assistant',
    status: 'online',
  },
};

/**
 * System notification message with distinct styling
 */
export const SystemMessage: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'system',
    content: 'Analysis session started. Upload an image to begin.',
  },
};

/**
 * Message with streaming cursor animation
 */
export const StreamingMessage: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'assistant',
    content: 'Analyzing your image for structural damage...',
    isStreaming: true,
    timestamp: new Date(),
  },
};

/**
 * Animated typing indicator
 */
export const TypingIndicator: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'assistant',
    content: '',
    isTyping: true,
  },
};

/**
 * Error state with clear visual feedback
 */
export const ErrorMessage: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'assistant',
    content: 'I was unable to process your request.',
    error: 'Image format not supported. Please upload a JPG or PNG file.',
    timestamp: new Date(),
  },
};

/**
 * Message with custom avatar image
 */
export const WithAvatar: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'user',
    content: 'What issues do you see with my property?',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user123',
    senderName: 'Sarah',
    timestamp: new Date(),
    status: 'online',
  },
};

/**
 * Compact size variant
 */
export const SmallSize: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'assistant',
    content: 'Processing complete. No issues detected.',
    size: 'sm',
    timestamp: new Date(),
  },
};

/**
 * Large size variant for emphasis
 */
export const LargeSize: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'user',
    content: 'Can you provide a detailed breakdown of all the findings from the analysis?',
    size: 'lg',
    timestamp: new Date(),
    senderName: 'Michael',
  },
};

/**
 * Message with hover-activated action buttons
 */
export const WithHoverActions: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">
        Hover over the message to see action buttons
      </p>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'assistant',
    content: "Here's my analysis of the property condition. The overall score is 72/100, which indicates good condition with some areas needing attention.",
    timestamp: new Date(),
    actionsOnHover: true,
    actions: (
      <>
        <MessageActionButton icon={<CopyIcon />} label="Copy message" onClick={() => console.log('Copy')} />
        <MessageActionButton icon={<RefreshIcon />} label="Regenerate response" onClick={() => console.log('Regenerate')} />
        <MessageActionButton icon={<ThumbsUpIcon />} label="Good response" onClick={() => console.log('Thumbs up')} />
        <MessageActionButton icon={<ThumbsDownIcon />} label="Bad response" onClick={() => console.log('Thumbs down')} />
      </>
    ),
  },
};

/**
 * Message with always-visible actions
 */
export const WithPersistentActions: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'assistant',
    content: "Based on my analysis, I've identified 5 potential issues that need your attention.",
    timestamp: new Date(),
    actionsOnHover: false,
    actions: (
      <>
        <MessageActionButton icon={<CopyIcon />} label="Copy" onClick={() => console.log('Copy')} />
        <MessageActionButton icon={<RefreshIcon />} label="Regenerate" onClick={() => console.log('Regenerate')} />
      </>
    ),
  },
};

/**
 * Message with emoji reactions
 */
export const WithReactions: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'assistant',
    content: 'The analysis is complete! Your property scored 85/100 which is excellent.',
    timestamp: new Date(),
    reactions: [
      { emoji: '👍', count: 3, reacted: true },
      { emoji: '❤️', count: 1 },
      { emoji: '🎉', count: 2 },
    ],
    onReactionClick: (emoji: string) => console.log('Reaction clicked:', emoji),
  },
};

/**
 * User status: Away
 */
export const StatusAway: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'user',
    content: "I'll check back later for the results.",
    timestamp: new Date(),
    senderName: 'Alex',
    status: 'away',
  },
};

/**
 * User status: Busy
 */
export const StatusBusy: Story = {
  render: (args) => (
    <SingleMessageWrapper>
      <ChatMessage {...args} />
    </SingleMessageWrapper>
  ),
  args: {
    role: 'user',
    content: 'Please prioritize the roof inspection.',
    timestamp: new Date(),
    senderName: 'Chris',
    status: 'busy',
  },
};

/**
 * Full conversation flow demonstrating real-world usage
 */
export const Conversation: Story = {
  render: () => (
    <ChatContainer title="HomeCheck AI" subtitle="Ready to assist">
      <ChatMessage
        role="system"
        content="Welcome to HomeCheck AI. Upload an image of your property to begin analysis."
      />
      <ChatMessage
        role="user"
        content="I'd like to check the condition of my roof. Here's a photo I took yesterday."
        timestamp={new Date(Date.now() - 120000)}
        senderName="John"
        status="online"
      />
      <ChatMessage
        role="assistant"
        content="I'm analyzing the roof image now. This typically takes 10-15 seconds..."
        isStreaming
        timestamp={new Date(Date.now() - 60000)}
      />
      <ChatMessage
        role="assistant"
        content="Analysis complete! I found **2 areas of concern**:\n\n1. Several shingles appear to be curling in the northeast section\n2. There's visible algae growth that should be cleaned\n\nOverall condition score: **78/100** (Good)"
        timestamp={new Date()}
        reactions={[{ emoji: '👍', count: 1, reacted: true }]}
      />
      <ChatMessage
        role="user"
        content="Can you estimate the repair cost?"
        timestamp={new Date()}
        senderName="John"
        status="online"
      />
      <ChatMessage
        role="assistant"
        content=""
        isTyping
      />
    </ChatContainer>
  ),
};

/**
 * Long-form message with markdown formatting
 */
export const LongMessage: Story = {
  render: (args) => (
    <ChatContainer title="Property Inspector AI" subtitle="Generating report...">
      <ChatMessage
        role="user"
        content="Generate a full inspection report for my property."
        timestamp={new Date(Date.now() - 30000)}
        senderName="Client"
        status="online"
      />
      <ChatMessage {...args} />
    </ChatContainer>
  ),
  args: {
    role: 'assistant',
    content: `# Comprehensive Property Analysis Report

## Overview
Based on the images provided, I've conducted a thorough analysis of your property's exterior condition.

## Findings

### 1. Roof Condition (Score: 72/100)
- **Shingles**: Several curling shingles detected in the northeast quadrant
- **Flashing**: Minor gaps observed around chimney base
- **Gutters**: Debris accumulation suggests need for cleaning

### 2. Siding Analysis (Score: 85/100)
- Overall condition is good
- Minor paint peeling on south-facing wall
- No signs of water damage or rot

### 3. Foundation (Score: 90/100)
- No visible cracks
- Proper grading around perimeter
- Drainage appears adequate

## Recommendations
1. Schedule roof inspection within 30 days
2. Clean gutters before next rain season
3. Touch up paint on south wall

## Cost Estimates
| Item | Estimate |
|------|----------|
| Roof repairs | $500-$1,200 |
| Gutter cleaning | $150-$300 |
| Paint touch-up | $200-$400 |

**Total estimated range: $850-$1,900**`,
    timestamp: new Date(),
    actionsOnHover: true,
    actions: (
      <>
        <MessageActionButton icon={<CopyIcon />} label="Copy report" onClick={() => console.log('Copy')} />
        <MessageActionButton icon={<ThumbsUpIcon />} label="Good response" onClick={() => console.log('Thumbs up')} />
      </>
    ),
  },
};

/**
 * Multiple message sizes comparison
 */
export const SizeComparison: Story = {
  render: () => (
    <ChatContainer title="Size Comparison" subtitle="Visual reference" showHeader={false}>
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Small</p>
          <ChatMessage
            role="assistant"
            content="This is a small message variant."
            size="sm"
          />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Medium (Default)</p>
          <ChatMessage
            role="assistant"
            content="This is the medium/default message variant."
            size="md"
          />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Large</p>
          <ChatMessage
            role="assistant"
            content="This is a large message variant."
            size="lg"
          />
        </div>
      </div>
    </ChatContainer>
  ),
};

/**
 * All message roles comparison
 */
export const RolesComparison: Story = {
  render: () => (
    <ChatContainer title="Message Roles" subtitle="Visual reference" showHeader={false}>
      <div className="space-y-4">
        <ChatMessage
          role="user"
          content="This is a user message - aligned to the right with blue background."
          senderName="User"
          status="online"
        />
        <ChatMessage
          role="assistant"
          content="This is an assistant message - aligned to the left with neutral background and AI avatar."
          senderName="AI Assistant"
          status="online"
        />
        <ChatMessage
          role="system"
          content="This is a system message - centered with amber styling for notifications."
        />
      </div>
    </ChatContainer>
  ),
};

/**
 * Interactive states showcase
 */
export const InteractiveStates: Story = {
  render: () => (
    <ChatContainer title="Interactive States" subtitle="Animation showcase">
      <ChatMessage
        role="assistant"
        content="Normal message state"
        timestamp={new Date()}
      />
      <ChatMessage
        role="assistant"
        content="Streaming response with cursor animation..."
        isStreaming
        timestamp={new Date()}
      />
      <ChatMessage
        role="assistant"
        content=""
        isTyping
      />
      <ChatMessage
        role="assistant"
        content="Error state example"
        error="Connection timed out. Please try again."
        timestamp={new Date()}
      />
    </ChatContainer>
  ),
};
