import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConversationPanel, type Message } from '../blocks/ai/ConversationPanel';

const meta = {
  title: 'AI Blocks/ConversationPanel',
  component: ConversationPanel,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    connectionStatus: {
      control: 'select',
      options: ['online', 'offline', 'connecting'],
    },
  },
} satisfies Meta<typeof ConversationPanel>;

export default meta;
type Story = StoryObj<typeof ConversationPanel>;

const sampleMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'I uploaded some photos of my roof. Can you check for any damage?',
    timestamp: new Date(Date.now() - 240000),
    senderName: 'John',
  },
  {
    id: '2',
    role: 'assistant',
    content: "I've analyzed the roof images you uploaded. Here's what I found:\n\n**Overall Condition: Good (78/100)**\n\n### Issues Detected:\n1. **Minor shingle lifting** in the northeast corner\n2. **Moss growth** along the ridge line (cosmetic)\n\n### Recommendations:\n- Schedule a professional inspection within 6 months\n- Consider moss treatment before winter\n\nWould you like me to estimate repair costs or explain any finding in more detail?",
    timestamp: new Date(Date.now() - 180000),
    senderName: 'HomeCheck AI',
  },
  {
    id: '3',
    role: 'user',
    content: 'Yes, please estimate the costs for fixing the shingle issue.',
    timestamp: new Date(Date.now() - 120000),
    senderName: 'John',
  },
  {
    id: '4',
    role: 'assistant',
    content: 'Based on the images and typical market rates:\n\n**Shingle Repair Estimate:**\n- Minor repair (5-10 shingles): $150 - $400\n- If additional damage found: $400 - $800\n\n**Factors that could affect cost:**\n- Roof accessibility\n- Shingle type matching\n- Local labor rates\n\n**Tip:** Get at least 3 quotes from licensed roofers for the best price.',
    timestamp: new Date(Date.now() - 60000),
    senderName: 'HomeCheck AI',
  },
];

const suggestions = [
  { id: '1', text: 'Analyze my property photos', category: 'Analysis' },
  { id: '2', text: 'Check for water damage signs', category: 'Inspection' },
  { id: '3', text: 'Estimate repair costs', category: 'Costs' },
  { id: '4', text: 'Create maintenance checklist', category: 'Planning' },
];

const ConversationDemo = (args: React.ComponentProps<typeof ConversationPanel>) => {
  const [messages, setMessages] = useState<Message[]>(args.messages || []);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);

  const handleSubmit = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      senderName: 'You',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand your question. Let me analyze that for you...\n\nBased on my analysis, here are my recommendations:\n\n1. **First step**: Review the current condition\n2. **Second step**: Consider preventive measures\n3. **Third step**: Schedule professional inspection if needed\n\nWould you like more details on any of these points?",
        timestamp: new Date(),
        senderName: 'HomeCheck AI',
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      setShowTyping(false);
    }, 2000);
  };

  return (
    <div className="h-[650px] max-w-3xl mx-auto">
      <ConversationPanel
        {...args}
        messages={messages}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        showTypingIndicator={showTyping}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages,
    title: 'HomeCheck AI',
    subtitle: 'Property Analysis Assistant',
    placeholder: 'Ask about your property...',
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px',
  },
};

export const Empty: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: [],
    title: 'HomeCheck AI',
    subtitle: 'Your property analysis assistant',
    placeholder: 'Ask me anything about your property...',
    suggestions,
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px',
  },
};

export const WithSuggestions: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: [],
    title: 'Property Assistant',
    subtitle: 'AI-powered property analysis',
    suggestions: [
      { id: '1', text: 'Analyze roof condition', category: 'Inspection' },
      { id: '2', text: 'Check foundation status', category: 'Inspection' },
      { id: '3', text: 'Estimate renovation costs', category: 'Costs' },
      { id: '4', text: 'Generate inspection report', category: 'Reports' },
    ],
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px',
  },
};

export const WithVoiceInput: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages.slice(0, 2),
    title: 'Voice-Enabled Assistant',
    subtitle: 'Speak or type your questions',
    showVoice: true,
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px',
  },
};

export const WithAttachments: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages.slice(0, 2),
    title: 'Image Analysis',
    subtitle: 'Upload photos for AI analysis',
    showAttachment: true,
    placeholder: 'Type a message or attach images...',
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px',
  },
};

export const FullFeatured: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages,
    title: 'HomeCheck AI Pro',
    subtitle: 'Complete property analysis suite',
    showVoice: true,
    showAttachment: true,
    placeholder: 'Ask about your property...',
    suggestions: [
      { id: '1', text: 'Generate detailed report', category: 'Reports' },
      { id: '2', text: 'Find local contractors', category: 'Services' },
    ],
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px',
  },
};

export const Connecting: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: [],
    title: 'Property Assistant',
    subtitle: 'Establishing connection...',
    showStatus: true,
    connectionStatus: 'connecting',
    suggestions,
    maxHeight: '450px',
  },
};

export const Offline: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages.slice(0, 2),
    title: 'Property Assistant',
    subtitle: 'Connection lost',
    showStatus: true,
    connectionStatus: 'offline',
    maxHeight: '450px',
  },
};

export const LongConversation: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: [
      ...sampleMessages,
      {
        id: '5',
        role: 'user',
        content: 'What about the moss on the roof?',
        timestamp: new Date(Date.now() - 50000),
        senderName: 'John',
      },
      {
        id: '6',
        role: 'assistant',
        content: "The moss growth is primarily cosmetic but can trap moisture over time. Here's what you can do:\n\n**DIY Treatment:**\n- Zinc strips along the ridge ($50-100)\n- Moss killer spray ($20-40)\n\n**Professional cleaning:** $200-500\n\nI recommend addressing it before the wet season to prevent potential damage.",
        timestamp: new Date(Date.now() - 40000),
        senderName: 'HomeCheck AI',
      },
      {
        id: '7',
        role: 'user',
        content: 'Thanks! Can you generate a full report I can share with my spouse?',
        timestamp: new Date(Date.now() - 30000),
        senderName: 'John',
      },
      {
        id: '8',
        role: 'assistant',
        content: "Absolutely! I've compiled a comprehensive report for you.\n\n**Property Inspection Report**\n- Date: Today\n- Overall Score: 78/100\n\nThe report includes:\n- All findings with photos\n- Cost estimates\n- Recommended timeline\n- Local contractor suggestions\n\nWould you like me to customize any section before sharing?",
        timestamp: new Date(),
        senderName: 'HomeCheck AI',
      },
    ],
    title: 'HomeCheck AI',
    subtitle: 'Property Analysis Complete',
    showStatus: true,
    connectionStatus: 'online',
    maxHeight: '450px',
  },
};

export const CustomHeader: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages.slice(0, 2),
    header: (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
            HC
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Custom Header</h2>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Premium Plan</p>
          </div>
        </div>
        <button className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          Settings
        </button>
      </div>
    ),
    maxHeight: '450px',
  },
};

export const MinimalStyle: Story = {
  render: (args) => <ConversationDemo {...args} />,
  args: {
    messages: sampleMessages,
    placeholder: 'Type your message...',
    maxHeight: '450px',
  },
};
