import type { Meta, StoryObj } from '@storybook/react';
import { DashboardOverview } from './DashboardOverview';

const meta: Meta<typeof DashboardOverview> = {
  title: 'Templates/Dashboard/DashboardOverview',
  component: DashboardOverview,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DashboardOverview>;

const mockSidebar = (
  <nav className="p-4 space-y-2">
    <div className="font-bold text-lg mb-4">Dashboard</div>
    <button type="button" className="block w-full text-left px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600">
      Overview
    </button>
    <button type="button" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      Analytics
    </button>
    <button type="button" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      Reports
    </button>
    <button type="button" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      Settings
    </button>
  </nav>
);

const mockStats = [
  {
    id: '1',
    label: 'Total Revenue',
    value: '$45,231',
    change: { value: 12.5, trend: 'up' as const },
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: '2',
    label: 'Active Users',
    value: '2,350',
    change: { value: 8.2, trend: 'up' as const },
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: '3',
    label: 'Conversion Rate',
    value: '3.24%',
    change: { value: 2.1, trend: 'down' as const },
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: '4',
    label: 'Avg. Session',
    value: '4m 32s',
    change: { value: 5.8, trend: 'up' as const },
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const mockActivities = [
  { id: '1', message: 'New user registered: john.doe@example.com', time: '2 minutes ago', type: 'success' as const },
  { id: '2', message: 'Payment received: $299.00', time: '15 minutes ago', type: 'success' as const },
  { id: '3', message: 'Server CPU usage above 80%', time: '1 hour ago', type: 'warning' as const },
  { id: '4', message: 'Weekly report generated', time: '3 hours ago', type: 'info' as const },
  { id: '5', message: 'Backup completed successfully', time: '5 hours ago', type: 'success' as const },
];

export const Default: Story = {
  args: {
    stats: mockStats,
    activities: mockActivities,
    sidebar: mockSidebar,
    title: 'Dashboard Overview',
    subtitle: 'Welcome back! Here\'s what\'s happening with your business.',
  },
};

export const WithChartContent: Story = {
  args: {
    ...Default.args,
    chartContent: (
      <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">+24%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Revenue Growth This Month</div>
          <div className="mt-4 flex justify-center gap-4">
            <div className="w-16 h-24 bg-blue-200 dark:bg-blue-800 rounded-t-lg" />
            <div className="w-16 h-32 bg-blue-300 dark:bg-blue-700 rounded-t-lg" />
            <div className="w-16 h-28 bg-blue-400 dark:bg-blue-600 rounded-t-lg" />
            <div className="w-16 h-40 bg-blue-500 rounded-t-lg" />
          </div>
        </div>
      </div>
    ),
  },
};

export const MinimalStats: Story = {
  args: {
    ...Default.args,
    statsVariant: 'minimal',
    statsColumns: 2,
    stats: mockStats.slice(0, 2),
  },
};

export const BorderedStats: Story = {
  args: {
    ...Default.args,
    statsVariant: 'bordered',
    statsColumns: 3,
    stats: mockStats.slice(0, 3),
  },
};

export const EmptyActivity: Story = {
  args: {
    ...Default.args,
    activities: [],
  },
};

export const CollapsedSidebar: Story = {
  args: {
    ...Default.args,
    sidebarCollapsed: true,
  },
};

export const DarkMode: Story = {
  args: Default.args,
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
