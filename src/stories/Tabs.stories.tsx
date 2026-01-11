import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Button } from '../components/Button';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An accessible tabbed interface built on Radix UI with keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input id="name" defaultValue="John Doe" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input id="email" defaultValue="john@example.com" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="current" className="text-sm font-medium">Current password</label>
              <input id="current" type="password" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-1">
              <label htmlFor="new" className="text-sm font-medium">New password</label>
              <input id="new" type="password" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab3">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure your preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="notifications" className="rounded" />
              <label htmlFor="notifications" className="text-sm">Enable notifications</label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

// Tabs with icons
export const WithContent: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4">
        <h3 className="text-lg font-semibold mb-2">Dashboard Overview</h3>
        <p className="text-sm text-gray-600">
          Welcome to your dashboard. Here you can see a summary of your account activity.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="p-4">
        <h3 className="text-lg font-semibold mb-2">Analytics</h3>
        <p className="text-sm text-gray-600">
          View detailed analytics about your performance.
        </p>
        <div className="h-32 bg-gray-100 rounded-lg mt-4 flex items-center justify-center text-gray-400">
          Chart placeholder
        </div>
      </TabsContent>
      <TabsContent value="reports" className="p-4">
        <h3 className="text-lg font-semibold mb-2">Reports</h3>
        <p className="text-sm text-gray-600">
          Download and manage your reports.
        </p>
        <div className="mt-4">
          <Button variant="outline" size="sm">Download Report</Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// Vertical tabs style
export const Minimal: Story = {
  render: () => (
    <Tabs defaultValue="music" className="w-[300px]">
      <TabsList>
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
        <TabsTrigger value="live" disabled>Live</TabsTrigger>
      </TabsList>
      <TabsContent value="music" className="p-4 text-sm">
        Listen to your favorite music.
      </TabsContent>
      <TabsContent value="podcasts" className="p-4 text-sm">
        Discover new podcasts.
      </TabsContent>
    </Tabs>
  ),
};
