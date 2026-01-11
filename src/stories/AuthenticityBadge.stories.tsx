import type { Meta, StoryObj } from '@storybook/react';
import { AuthenticityBadge, AuthenticityScore, type AuthenticityIndicator } from '../components/AuthenticityBadge';

const meta: Meta<typeof AuthenticityBadge> = {
  title: 'Components/AuthenticityBadge',
  component: AuthenticityBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Visual indicator for image authenticity scores. Key differentiator for AI-powered real estate verification.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    score: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Authenticity score from 0 to 100',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    isAIGenerated: {
      control: 'boolean',
      description: 'Whether images appear AI-generated',
    },
    isEdited: {
      control: 'boolean',
      description: 'Whether images appear digitally edited',
    },
    showDetails: {
      control: 'boolean',
      description: 'Show detailed tooltip on click',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show label text alongside score',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Verified (high score)
export const Verified: Story = {
  args: {
    score: 95,
    showLabel: true,
  },
};

// Caution (medium score)
export const Caution: Story = {
  args: {
    score: 75,
    showLabel: true,
  },
};

// Alert (low score)
export const Alert: Story = {
  args: {
    score: 45,
    showLabel: true,
  },
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AuthenticityBadge score={95} size="sm" />
      <AuthenticityBadge score={95} size="md" />
      <AuthenticityBadge score={95} size="lg" />
    </div>
  ),
};

// All status levels
export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AuthenticityBadge score={95} showLabel />
      <AuthenticityBadge score={78} showLabel />
      <AuthenticityBadge score={45} showLabel />
    </div>
  ),
};

// With AI generated indicator
export const AIGenerated: Story = {
  args: {
    score: 35,
    isAIGenerated: true,
    showLabel: true,
  },
};

// With edited indicator
export const Edited: Story = {
  args: {
    score: 65,
    isEdited: true,
    showLabel: true,
  },
};

// With both indicators
export const AIGeneratedAndEdited: Story = {
  args: {
    score: 25,
    isAIGenerated: true,
    isEdited: true,
    showLabel: true,
  },
};

// Interactive with details
const sampleIndicators: AuthenticityIndicator[] = [
  { type: 'verified', description: 'Original images verified', severity: 'positive' },
  { type: 'metadata', description: 'Consistent metadata', severity: 'positive' },
  { type: 'lighting', description: 'Natural lighting detected', severity: 'positive' },
];

export const WithDetails: Story = {
  args: {
    score: 95,
    showDetails: true,
    showLabel: true,
    indicators: sampleIndicators,
  },
  render: (args) => (
    <div className="w-[400px] flex justify-center">
      <AuthenticityBadge {...args} />
      <p className="absolute bottom-4 text-sm text-gray-500">
        Click the badge to see details
      </p>
    </div>
  ),
};

// Detailed with warnings
const warningIndicators: AuthenticityIndicator[] = [
  { type: 'lighting', description: 'Possible lighting manipulation', severity: 'medium' },
  { type: 'metadata', description: 'Modified EXIF data detected', severity: 'high' },
];

export const WithWarnings: Story = {
  args: {
    score: 58,
    showDetails: true,
    showLabel: true,
    isEdited: true,
    indicators: warningIndicators,
  },
  render: (args) => (
    <div className="w-[400px] flex justify-center">
      <AuthenticityBadge {...args} />
    </div>
  ),
};

// Compact score component
export const CompactScore: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AuthenticityScore score={95} />
      <AuthenticityScore score={75} />
      <AuthenticityScore score={45} />
    </div>
  ),
};

// In a card context
export const InCardContext: Story = {
  render: () => (
    <div className="w-[300px] p-4 bg-white rounded-xl shadow-lg border">
      <div className="relative aspect-video bg-gray-200 rounded-lg mb-3">
        <div className="absolute top-2 left-2">
          <AuthenticityScore score={92} />
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded text-xs font-medium">
          Idealista
        </div>
      </div>
      <h3 className="font-semibold">Bright renovated apartment</h3>
      <p className="text-sm text-gray-500">Madrid, Chamberí</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">285.000 €</span>
        <AuthenticityBadge score={92} size="sm" showDetails indicators={sampleIndicators} />
      </div>
    </div>
  ),
};

// Comparison example
export const Comparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg">Authenticity Score Comparison</h3>
        <p className="text-sm text-gray-500">How different scores are displayed</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <AuthenticityBadge score={95} size="lg" showLabel showDetails indicators={[
            { type: 'verified', description: 'All images verified', severity: 'positive' },
          ]} />
          <p className="mt-2 text-sm text-green-900">High Trust</p>
          <p className="text-xs text-green-800">90-100 points</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <AuthenticityBadge score={75} size="lg" showLabel showDetails indicators={[
            { type: 'warning', description: 'Minor edits detected', severity: 'medium' },
          ]} />
          <p className="mt-2 text-sm text-yellow-900">Needs Review</p>
          <p className="text-xs text-yellow-800">70-89 points</p>
        </div>

        <div className="p-4 bg-red-100 rounded-lg text-center">
          <AuthenticityBadge score={45} size="lg" showLabel isAIGenerated showDetails indicators={[
            { type: 'alert', description: 'Possible manipulation', severity: 'high' },
          ]} />
          <p className="mt-2 text-sm text-red-900">Alert</p>
          <p className="text-xs text-red-800">0-69 points</p>
        </div>
      </div>
    </div>
  ),
};
