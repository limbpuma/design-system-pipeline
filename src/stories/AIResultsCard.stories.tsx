import type { Meta, StoryObj } from '@storybook/react';
import { AIResultsCard, type Finding } from '../blocks/ai/AIResultsCard';

const meta: Meta<typeof AIResultsCard> = {
  title: 'AI Blocks/AIResultsCard',
  component: AIResultsCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'highlighted'],
    },
    score: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFindings: Finding[] = [
  {
    id: '1',
    title: 'Missing Roof Shingles',
    description: 'Several shingles are missing in the northeast corner, exposing the underlayment.',
    severity: 'critical',
    category: 'Roofing',
    location: 'Northeast corner',
    costEstimate: { min: 500, max: 1200, currency: 'USD' },
  },
  {
    id: '2',
    title: 'Gutter Damage',
    description: 'Gutters show signs of sagging and may need replacement.',
    severity: 'moderate',
    category: 'Drainage',
    location: 'Front facade',
    costEstimate: { min: 300, max: 600, currency: 'USD' },
  },
  {
    id: '3',
    title: 'Minor Paint Peeling',
    description: 'Some paint peeling observed on the south-facing trim.',
    severity: 'minor',
    category: 'Exterior',
    location: 'South side',
    costEstimate: { min: 200, max: 400, currency: 'USD' },
  },
  {
    id: '4',
    title: 'HVAC System Age',
    description: 'System appears to be 15+ years old. Consider planning for replacement.',
    severity: 'info',
    category: 'HVAC',
  },
];

export const Default: Story = {
  args: {
    score: 72,
    scoreLabel: 'Property Condition',
    title: 'HomeCheck AI Analysis',
    subtitle: '123 Main Street, Anytown USA',
    timestamp: new Date(),
    findings: sampleFindings,
    summary: 'The property is in fair condition with some issues requiring attention. The roof shows signs of wear and should be prioritized for repair.',
    showExport: true,
    onExport: () => console.log('Export clicked'),
    showShare: true,
    onShare: () => console.log('Share clicked'),
  },
};

export const ExcellentScore: Story = {
  args: {
    score: 95,
    scoreLabel: 'Overall Health',
    title: 'Property Inspection Complete',
    subtitle: 'Modern Home - Built 2020',
    timestamp: new Date(),
    findings: [
      {
        id: '1',
        title: 'Minor Landscaping Issue',
        description: 'Some bushes need trimming near the foundation.',
        severity: 'info',
        category: 'Landscaping',
      },
    ],
    summary: 'Excellent condition! This property is well-maintained with no significant issues detected.',
    variant: 'highlighted',
  },
};

export const PoorScore: Story = {
  args: {
    score: 35,
    scoreLabel: 'Condition Score',
    title: 'Urgent Issues Detected',
    subtitle: 'Historic Property - Needs Attention',
    timestamp: new Date(),
    findings: [
      {
        id: '1',
        title: 'Foundation Crack',
        description: 'Significant crack detected in the foundation wall.',
        severity: 'critical',
        category: 'Foundation',
        costEstimate: { min: 5000, max: 15000 },
      },
      {
        id: '2',
        title: 'Water Damage',
        description: 'Signs of water intrusion in the basement.',
        severity: 'critical',
        category: 'Water Damage',
        costEstimate: { min: 2000, max: 8000 },
      },
      {
        id: '3',
        title: 'Roof Replacement Needed',
        description: 'Roof is beyond repair and needs full replacement.',
        severity: 'critical',
        category: 'Roofing',
        costEstimate: { min: 8000, max: 20000 },
      },
      {
        id: '4',
        title: 'Electrical Panel Outdated',
        description: 'Electrical panel does not meet current safety codes.',
        severity: 'moderate',
        category: 'Electrical',
        costEstimate: { min: 1500, max: 3000 },
      },
    ],
    summary: 'This property has significant issues that require immediate attention. A professional inspection is strongly recommended before purchase.',
  },
};

export const WithImage: Story = {
  args: {
    score: 78,
    title: 'Roof Analysis Complete',
    subtitle: 'Analyzed from aerial drone image',
    timestamp: new Date(),
    findings: sampleFindings.slice(0, 2),
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
    summary: 'The roof shows moderate wear consistent with its age.',
  },
};

export const ElevatedVariant: Story = {
  args: {
    ...Default.args,
    variant: 'elevated',
    title: 'Premium Analysis Report',
  },
};

export const HighlightedVariant: Story = {
  args: {
    ...Default.args,
    variant: 'highlighted',
    score: 88,
    title: 'Featured Property Analysis',
  },
};

export const ManyFindings: Story = {
  args: {
    score: 65,
    title: 'Comprehensive Inspection',
    findings: [
      ...sampleFindings,
      {
        id: '5',
        title: 'Window Seals Degraded',
        description: 'Several windows showing signs of seal failure.',
        severity: 'moderate',
        category: 'Windows',
        costEstimate: { min: 800, max: 2000 },
      },
      {
        id: '6',
        title: 'Deck Boards Warped',
        description: 'Some deck boards are warped and need replacement.',
        severity: 'minor',
        category: 'Exterior',
        costEstimate: { min: 500, max: 1000 },
      },
      {
        id: '7',
        title: 'Insulation Check Recommended',
        description: 'Thermal imaging suggests possible insulation gaps.',
        severity: 'info',
        category: 'Insulation',
      },
    ],
    maxVisibleFindings: 3,
    timestamp: new Date(),
  },
};

export const NoFindings: Story = {
  args: {
    score: 100,
    scoreLabel: 'Perfect Score',
    title: 'Inspection Complete',
    subtitle: 'New Construction Home',
    timestamp: new Date(),
    findings: [],
    summary: 'No issues detected. This property is in excellent condition.',
  },
};

export const WithCustomActions: Story = {
  args: {
    ...Default.args,
    actions: (
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Get Quotes
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
          Schedule Inspection
        </button>
      </div>
    ),
  },
};

export const SkinCheckAI: Story = {
  args: {
    score: 82,
    scoreLabel: 'Skin Health',
    title: 'SkinCheck AI Analysis',
    subtitle: 'Daily skin assessment',
    timestamp: new Date(),
    findings: [
      {
        id: '1',
        title: 'Mild Dryness Detected',
        description: 'Skin appears slightly dehydrated in the T-zone area.',
        severity: 'minor',
        category: 'Hydration',
      },
      {
        id: '2',
        title: 'Sun Damage Signs',
        description: 'Early signs of photoaging detected. Consider SPF increase.',
        severity: 'moderate',
        category: 'UV Protection',
      },
      {
        id: '3',
        title: 'Healthy Complexion',
        description: 'Overall skin tone is even and healthy.',
        severity: 'info',
        category: 'General',
      },
    ],
    summary: 'Your skin is in good condition. Focus on hydration and sun protection for optimal results.',
  },
};
