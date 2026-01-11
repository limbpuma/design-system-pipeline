import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/Card';
import { Button } from '../components/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A container component for grouping related content with semantic tokens.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any React elements.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with form
export const WithForm: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Create</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with image
export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600" />
      <CardHeader>
        <CardTitle>Beautiful Gradient</CardTitle>
        <CardDescription>A card with a decorative header.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Cards can contain any content including images, gradients, or other media.
        </p>
      </CardContent>
    </Card>
  ),
};

// Minimal card
export const Minimal: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

// Stats card
export const Stats: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-3xl">$45,231</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-600">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card className="w-[200px]">
        <CardHeader className="pb-2">
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-3xl">2,350</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-600">+180 new this week</p>
        </CardContent>
      </Card>
    </div>
  ),
};
