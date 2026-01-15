import type { Meta, StoryObj } from '@storybook/react';
import { AIAnalysisPage } from './AIAnalysisPage';

const meta: Meta<typeof AIAnalysisPage> = {
  title: 'Templates/AI/AIAnalysisPage',
  component: AIAnalysisPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AIAnalysisPage>;

const mockSidebar = (
  <nav className="p-4 space-y-2">
    <div className="font-bold text-lg mb-4">AI Analysis</div>
    <button type="button" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      Dashboard
    </button>
    <button type="button" className="block w-full text-left px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600">
      New Analysis
    </button>
    <button type="button" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      History
    </button>
    <button type="button" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      Settings
    </button>
  </nav>
);

const mockBranding = {
  name: 'HomeCheck AI',
  tagline: 'AI-powered property analysis',
  icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
};

export const UploadPhase: Story = {
  args: {
    phase: 'upload',
    images: [],
    sidebar: mockSidebar,
    branding: mockBranding,
    onFilesSelected: () => {},
    onRemoveImage: () => {},
    onStartAnalysis: () => {},
  },
};

export const WithImagesUploaded: Story = {
  args: {
    phase: 'upload',
    images: [
      { id: '1', file: new File([], 'room1.jpg'), preview: 'https://placehold.co/400x300/e2e8f0/64748b?text=Room+1', status: 'complete', progress: 100 },
      { id: '2', file: new File([], 'kitchen.jpg'), preview: 'https://placehold.co/400x300/e2e8f0/64748b?text=Kitchen', status: 'complete', progress: 100 },
      { id: '3', file: new File([], 'bathroom.jpg'), preview: 'https://placehold.co/400x300/e2e8f0/64748b?text=Bathroom', status: 'uploading', progress: 65 },
    ],
    sidebar: mockSidebar,
    branding: mockBranding,
    onFilesSelected: () => {},
    onRemoveImage: () => {},
    onStartAnalysis: () => {},
  },
};

export const AnalyzingPhase: Story = {
  args: {
    phase: 'analyzing',
    images: [
      { id: '1', file: new File([], 'room1.jpg'), preview: 'https://placehold.co/400x300/e2e8f0/64748b?text=Room+1', status: 'complete', progress: 100 },
      { id: '2', file: new File([], 'kitchen.jpg'), preview: 'https://placehold.co/400x300/e2e8f0/64748b?text=Kitchen', status: 'complete', progress: 100 },
    ],
    sidebar: mockSidebar,
    branding: mockBranding,
    analysisSteps: [
      { id: '1', label: 'Uploading images', status: 'complete' },
      { id: '2', label: 'Pre-processing', status: 'complete' },
      { id: '3', label: 'AI Analysis', status: 'active' },
      { id: '4', label: 'Generating report', status: 'pending' },
    ],
    analysisProgress: 65,
    estimatedTime: 30,
    analysisStatus: 'analyzing',
    statusMessage: 'Analyzing structural elements...',
    onFilesSelected: () => {},
    onRemoveImage: () => {},
    onStartAnalysis: () => {},
  },
};

export const ResultsPhase: Story = {
  args: {
    phase: 'results',
    images: [
      { id: '1', file: new File([], 'room1.jpg'), preview: 'https://placehold.co/400x300/e2e8f0/64748b?text=Room+1', status: 'complete', progress: 100 },
    ],
    sidebar: mockSidebar,
    branding: mockBranding,
    results: {
      id: 'result-1',
      score: 85,
      title: 'Property Analysis Complete',
      subtitle: '3 areas analyzed',
      summary: 'Overall the property is in good condition with minor maintenance items identified. The structure appears sound with no major concerns.',
      findings: [
        { id: '1', type: 'success', title: 'Structural Integrity', description: 'Foundation and walls are in excellent condition.' },
        { id: '2', type: 'warning', title: 'Minor Paint Wear', description: 'Some areas show paint wear that should be addressed within 6 months.' },
        { id: '3', type: 'info', title: 'Energy Efficiency', description: 'Consider upgrading windows for better insulation.' },
      ],
      timestamp: new Date(),
    },
    onFilesSelected: () => {},
    onRemoveImage: () => {},
    onStartAnalysis: () => {},
    onNewAnalysis: () => {},
    onExport: () => {},
    onShare: () => {},
  },
};

export const ErrorPhase: Story = {
  args: {
    phase: 'error',
    images: [
      { id: '1', file: new File([], 'room1.jpg'), preview: 'https://placehold.co/400x300/e2e8f0/64748b?text=Room+1', status: 'complete', progress: 100 },
    ],
    sidebar: mockSidebar,
    branding: mockBranding,
    error: 'Analysis failed due to insufficient image quality. Please upload clearer images and try again.',
    onFilesSelected: () => {},
    onRemoveImage: () => {},
    onStartAnalysis: () => {},
    onNewAnalysis: () => {},
  },
};

export const DarkMode: Story = {
  args: UploadPhase.args,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
