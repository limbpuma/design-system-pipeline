import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PromptInput, type PromptInputProps } from '../components/PromptInput';

const meta: Meta<typeof PromptInput> = {
  title: 'AI/PromptInput',
  component: PromptInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'floating'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PromptInputDemo = (args: Partial<PromptInputProps>) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <PromptInput
      {...args}
      value={value}
      onChange={setValue}
      onSubmit={(v) => {
        console.log('Submitted:', v);
        setValue('');
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Describe what you want to analyze...',
  },
};

export const WithSuggestions: Story = {
  render: (args) => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Ask about your property...',
    suggestions: [
      { id: '1', text: 'Analyze roof condition', icon: '🏠' },
      { id: '2', text: 'Check for water damage', icon: '💧' },
      { id: '3', text: 'Inspect foundation', icon: '🧱' },
      { id: '4', text: 'Review exterior siding', icon: '🪵' },
    ],
  },
};

export const WithVoiceInput: Story = {
  render: (args) => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Type or speak your question...',
    showVoice: true,
  },
};

export const WithAttachment: Story = {
  render: (args) => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Describe the image or attach a file...',
    showAttachment: true,
  },
};

export const FullFeatured: Story = {
  render: (args) => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Ask anything about your property...',
    showVoice: true,
    showAttachment: true,
    suggestions: [
      { id: '1', text: 'What issues do you see?', icon: '🔍' },
      { id: '2', text: 'Estimate repair costs', icon: '💰' },
      { id: '3', text: 'Priority recommendations', icon: '📋' },
    ],
  },
};

export const Loading: Story = {
  render: (args) => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Waiting for response...',
    isLoading: true,
    value: 'Analyze this property image',
  },
};

export const Disabled: Story = {
  render: (args) => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Input disabled',
    disabled: true,
  },
};

export const MinimalVariant: Story = {
  render: (args) => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Quick question...',
    variant: 'minimal',
  },
};

export const FloatingVariant: Story = {
  render: (args) => (
    <div className="relative h-64 bg-gray-100 rounded-lg p-4">
      <p className="text-gray-500">Chat content would appear here...</p>
      <div className="absolute bottom-4 left-4 right-4">
        <PromptInputDemo {...args} />
      </div>
    </div>
  ),
  args: {
    placeholder: 'Type your message...',
    variant: 'floating',
    showVoice: true,
  },
};

export const MaxLength: Story = {
  render: (args) => <PromptInputDemo {...args} />,
  args: {
    placeholder: 'Limited to 100 characters...',
    maxLength: 100,
  },
};
