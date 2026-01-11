import type { Meta, StoryObj } from '@storybook/react';
import { AIStatusIndicator } from '../components/AIStatusIndicator';

const meta: Meta<typeof AIStatusIndicator> = {
  title: 'AI/AIStatusIndicator',
  component: AIStatusIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['idle', 'processing', 'analyzing', 'success', 'error', 'warning'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    animated: {
      control: 'boolean',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: {
    status: 'idle',
    label: 'Ready',
  },
};

export const Processing: Story = {
  args: {
    status: 'processing',
    label: 'Processing...',
    animated: true,
  },
};

export const Analyzing: Story = {
  args: {
    status: 'analyzing',
    label: 'Analyzing image...',
    animated: true,
    progress: 45,
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    label: 'Analysis complete',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    label: 'Analysis failed',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    label: 'Low confidence',
  },
};

export const WithProgress: Story = {
  args: {
    status: 'analyzing',
    label: 'Processing 75%',
    progress: 75,
    animated: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <AIStatusIndicator status="processing" size="sm" label="Small" animated />
      <AIStatusIndicator status="processing" size="md" label="Medium" animated />
      <AIStatusIndicator status="processing" size="lg" label="Large" animated />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AIStatusIndicator status="idle" label="Idle - Ready to start" />
      <AIStatusIndicator status="processing" label="Processing - Working..." animated />
      <AIStatusIndicator status="analyzing" label="Analyzing - AI thinking..." animated progress={60} />
      <AIStatusIndicator status="success" label="Success - Complete!" />
      <AIStatusIndicator status="warning" label="Warning - Check results" />
      <AIStatusIndicator status="error" label="Error - Something went wrong" />
    </div>
  ),
};
