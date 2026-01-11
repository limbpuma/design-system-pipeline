import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessage, MessageActionButton } from '../components/ChatMessage';

const meta: Meta<typeof ChatMessage> = {
  title: 'AI/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'assistant', 'system'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const UserMessage: Story = {
  args: {
    role: 'user',
    content: 'Can you analyze this image of my house roof for potential damage?',
    timestamp: new Date(),
    senderName: 'John',
    status: 'online',
  },
};

export const AssistantMessage: Story = {
  args: {
    role: 'assistant',
    content: "I've analyzed the image of your roof. I found 3 areas of concern:\n\n1. **Missing shingles** in the northeast corner\n2. **Moss growth** along the ridge line\n3. **Potential water damage** near the chimney flashing\n\nI recommend getting a professional inspection within the next 30 days.",
    timestamp: new Date(),
    senderName: 'AI Assistant',
    status: 'online',
  },
};

export const SystemMessage: Story = {
  args: {
    role: 'system',
    content: 'Analysis session started. Upload an image to begin.',
  },
};

export const StreamingMessage: Story = {
  args: {
    role: 'assistant',
    content: 'Analyzing your image for structural damage...',
    isStreaming: true,
    timestamp: new Date(),
  },
};

export const TypingIndicator: Story = {
  args: {
    role: 'assistant',
    content: '',
    isTyping: true,
  },
};

export const ErrorMessage: Story = {
  args: {
    role: 'assistant',
    content: 'I was unable to process your request.',
    error: 'Image format not supported. Please upload a JPG or PNG file.',
    timestamp: new Date(),
  },
};

export const WithAvatar: Story = {
  args: {
    role: 'user',
    content: 'What issues do you see with my property?',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user123',
    senderName: 'Sarah',
    timestamp: new Date(),
    status: 'online',
  },
};

export const SmallSize: Story = {
  args: {
    role: 'assistant',
    content: 'Processing complete. No issues detected.',
    size: 'sm',
    timestamp: new Date(),
  },
};

export const LargeSize: Story = {
  args: {
    role: 'user',
    content: 'Can you provide a detailed breakdown of all the findings from the analysis?',
    size: 'lg',
    timestamp: new Date(),
    senderName: 'Michael',
  },
};

export const WithHoverActions: Story = {
  args: {
    role: 'assistant',
    content: "Here's my analysis of the property condition. The overall score is 72/100.",
    timestamp: new Date(),
    actionsOnHover: true,
    actions: (
      <>
        <MessageActionButton icon={<CopyIcon />} label="Copy" onClick={() => console.log('Copy')} />
        <MessageActionButton icon={<RefreshIcon />} label="Regenerate" onClick={() => console.log('Regenerate')} />
        <MessageActionButton icon={<ThumbsUpIcon />} label="Good response" onClick={() => console.log('Thumbs up')} />
      </>
    ),
  },
};

export const WithPersistentActions: Story = {
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

export const WithReactions: Story = {
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

export const StatusAway: Story = {
  args: {
    role: 'user',
    content: 'I\'ll check back later for the results.',
    timestamp: new Date(),
    senderName: 'Alex',
    status: 'away',
  },
};

export const StatusBusy: Story = {
  args: {
    role: 'user',
    content: 'Please prioritize the roof inspection.',
    timestamp: new Date(),
    senderName: 'Chris',
    status: 'busy',
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-2xl">
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
    </div>
  ),
};

export const LongMessage: Story = {
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
- Roof repairs: $500-$1,200
- Gutter cleaning: $150-$300
- Paint touch-up: $200-$400

**Total estimated range: $850-$1,900**`,
    timestamp: new Date(),
  },
};
