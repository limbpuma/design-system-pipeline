import type { Meta, StoryObj } from '@storybook/react';
import { AnalysisProgress, type AnalysisStep } from '../blocks/ai/AnalysisProgress';

const meta: Meta<typeof AnalysisProgress> = {
  title: 'AI Blocks/AnalysisProgress',
  component: AnalysisProgress,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['idle', 'processing', 'analyzing', 'success', 'error', 'warning'],
    },
    showDetails: {
      control: 'boolean',
    },
    compact: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default steps for various stories
const processingSteps: AnalysisStep[] = [
  {
    id: '1',
    label: 'Image Processing',
    description: 'Preparing images for analysis',
    status: 'complete',
    duration: 3,
  },
  {
    id: '2',
    label: 'AI Analysis',
    description: 'Running deep learning models',
    status: 'active',
    progress: 65,
  },
  {
    id: '3',
    label: 'Report Generation',
    description: 'Compiling findings and recommendations',
    status: 'pending',
  },
  {
    id: '4',
    label: 'Quality Check',
    description: 'Validating results',
    status: 'pending',
  },
];

export const Processing: Story = {
  args: {
    steps: processingSteps,
    overallProgress: 45,
    estimatedTime: 25,
    status: 'processing',
    statusMessage: 'Analyzing property images...',
    showDetails: true,
    animated: true,
  },
};

export const Starting: Story = {
  args: {
    steps: [
      { id: '1', label: 'Image Processing', description: 'Preparing images', status: 'active', progress: 20 },
      { id: '2', label: 'AI Analysis', description: 'Deep learning analysis', status: 'pending' },
      { id: '3', label: 'Report Generation', description: 'Creating report', status: 'pending' },
    ],
    overallProgress: 10,
    estimatedTime: 45,
    status: 'processing',
    statusMessage: 'Starting analysis...',
    animated: true,
  },
};

export const Analyzing: Story = {
  args: {
    steps: [
      { id: '1', label: 'Image Enhancement', description: 'Optimizing quality', status: 'complete', duration: 2 },
      { id: '2', label: 'Structure Detection', description: 'Identifying elements', status: 'complete', duration: 4 },
      { id: '3', label: 'Damage Assessment', description: 'AI scanning for damage', status: 'active', progress: 80 },
      { id: '4', label: 'Cost Estimation', description: 'Calculating repair costs', status: 'pending' },
      { id: '5', label: 'Report Compilation', description: 'Generating recommendations', status: 'pending' },
    ],
    overallProgress: 65,
    estimatedTime: 15,
    status: 'analyzing',
    statusMessage: 'Deep analysis in progress...',
    animated: true,
  },
};

export const NearComplete: Story = {
  args: {
    steps: [
      { id: '1', label: 'Image Processing', status: 'complete', duration: 2 },
      { id: '2', label: 'AI Analysis', status: 'complete', duration: 8 },
      { id: '3', label: 'Report Generation', status: 'complete', duration: 3 },
      { id: '4', label: 'Quality Check', description: 'Final validation', status: 'active', progress: 90 },
    ],
    overallProgress: 95,
    estimatedTime: 3,
    status: 'processing',
    statusMessage: 'Almost done...',
    animated: true,
  },
};

export const Complete: Story = {
  args: {
    steps: [
      { id: '1', label: 'Image Processing', status: 'complete', duration: 2 },
      { id: '2', label: 'AI Analysis', status: 'complete', duration: 12 },
      { id: '3', label: 'Report Generation', status: 'complete', duration: 4 },
      { id: '4', label: 'Quality Check', status: 'complete', duration: 2 },
    ],
    overallProgress: 100,
    status: 'success',
    statusMessage: 'Analysis complete',
    animated: false,
  },
};

export const WithError: Story = {
  args: {
    steps: [
      { id: '1', label: 'Image Processing', status: 'complete', duration: 2 },
      {
        id: '2',
        label: 'AI Analysis',
        status: 'error',
        error: 'Unable to process image: resolution too low. Please upload a higher quality image.'
      },
      { id: '3', label: 'Report Generation', status: 'pending' },
    ],
    overallProgress: 35,
    status: 'error',
    statusMessage: 'Analysis failed',
  },
};

export const Compact: Story = {
  args: {
    steps: processingSteps,
    overallProgress: 45,
    estimatedTime: 25,
    status: 'processing',
    statusMessage: 'Processing...',
    compact: true,
    animated: true,
  },
};

export const CompactComplete: Story = {
  args: {
    steps: [
      { id: '1', label: 'Upload', status: 'complete' },
      { id: '2', label: 'Process', status: 'complete' },
      { id: '3', label: 'Analyze', status: 'complete' },
      { id: '4', label: 'Report', status: 'complete' },
    ],
    overallProgress: 100,
    status: 'success',
    statusMessage: 'Done',
    compact: true,
    showDetails: false,
  },
};

export const NoDetails: Story = {
  args: {
    steps: processingSteps,
    overallProgress: 60,
    estimatedTime: 18,
    status: 'analyzing',
    statusMessage: 'Analyzing...',
    showDetails: false,
    animated: true,
  },
};

export const LongProcess: Story = {
  args: {
    steps: [
      { id: '1', label: 'Image Upload', description: 'Uploading high-res images', status: 'complete', duration: 5 },
      { id: '2', label: 'Pre-processing', description: 'Normalizing and enhancing', status: 'complete', duration: 8 },
      { id: '3', label: 'Object Detection', description: 'Identifying structures', status: 'complete', duration: 15 },
      { id: '4', label: 'Damage Analysis', description: 'ML model inference', status: 'complete', duration: 20 },
      { id: '5', label: 'Severity Scoring', description: 'Calculating severity levels', status: 'active', progress: 40 },
      { id: '6', label: 'Cost Estimation', description: 'Estimating repair costs', status: 'pending' },
      { id: '7', label: 'Report Generation', description: 'Creating detailed report', status: 'pending' },
      { id: '8', label: 'Quality Assurance', description: 'Final review', status: 'pending' },
    ],
    overallProgress: 55,
    estimatedTime: 120,
    status: 'analyzing',
    statusMessage: 'Comprehensive analysis in progress...',
    animated: true,
  },
};

export const Idle: Story = {
  args: {
    steps: [
      { id: '1', label: 'Upload Images', status: 'pending' },
      { id: '2', label: 'Process Images', status: 'pending' },
      { id: '3', label: 'Analyze', status: 'pending' },
      { id: '4', label: 'Generate Report', status: 'pending' },
    ],
    overallProgress: 0,
    status: 'idle',
    statusMessage: 'Ready to start',
  },
};
