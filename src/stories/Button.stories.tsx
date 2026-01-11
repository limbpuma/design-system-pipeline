import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes.',
      },
    },
    // Figma design link (update with your actual Figma URL)
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/YOUR_FILE_ID/Design-System?node-id=BUTTON_NODE_ID',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary button (default)
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

// Outline button
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'md',
  },
};

// Ghost button
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'md',
  },
};

// Danger button
export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
    size: 'md',
  },
};

// Success button
export const Success: Story = {
  args: {
    children: 'Confirm',
    variant: 'success',
    size: 'md',
  },
};

// Size variations
export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

// Loading state
export const Loading: Story = {
  args: {
    children: 'Loading...',
    variant: 'primary',
    size: 'md',
    isLoading: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
