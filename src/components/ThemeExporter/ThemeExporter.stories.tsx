import type { Meta, StoryObj } from '@storybook/react';

import { themePresets, generateTheme } from '@/lib/themes';

import { ThemeExporter } from './ThemeExporter';

const meta: Meta<typeof ThemeExporter> = {
  title: 'Design System/ThemeExporter',
  component: ThemeExporter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Theme Exporter

Export theme configurations in various formats for use in different environments.

## Export Formats

| Format | Extension | Use Case |
|--------|-----------|----------|
| CSS Variables | .css | Direct browser use |
| JSON | .json | Theme import/export |
| Tailwind Config | .js | Tailwind CSS projects |
| Design Tokens | .json | W3C design token format |

## Usage

\`\`\`tsx
import { ThemeExporter } from '@/components/ThemeExporter';
import { generateTheme } from '@/lib/themes';

const customTheme = generateTheme({
  primaryColor: '#3B82F6',
  name: 'My Custom Theme',
});

<ThemeExporter
  theme={customTheme}
  onExport={(format, content) => console.log(format, content)}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    showPreview: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeExporter>;

// Sample custom theme
const customTheme = generateTheme({
  primaryColor: '#8B5CF6',
  name: 'Purple Dream',
  description: 'A vibrant purple theme for creative projects',
  industry: 'Creative',
  harmony: 'split-complementary',
});

/**
 * Default exporter with all features
 */
export const Default: Story = {
  args: {
    theme: customTheme,
    showPreview: true,
    size: 'md',
  },
};

/**
 * Export a preset theme (Finance)
 */
export const PresetTheme: Story = {
  args: {
    theme: themePresets.finance,
    showPreview: true,
    size: 'md',
  },
};

/**
 * Compact version without preview
 */
export const Compact: Story = {
  args: {
    theme: customTheme,
    showPreview: false,
    size: 'sm',
  },
};

/**
 * Full width version
 */
export const FullWidth: Story = {
  args: {
    theme: themePresets.healthcare,
    showPreview: true,
    size: 'full',
  },
};

/**
 * With export callback
 */
export const WithCallback: Story = {
  args: {
    theme: customTheme,
    showPreview: true,
    onExport: (format, content) => {
      console.log(`Exported as ${format}:`, content.substring(0, 100) + '...');
      alert(`Theme exported as ${format}!`);
    },
  },
};

/**
 * All preset themes available for export
 */
export const AllPresets: Story = {
  render: () => (
    <div className="space-y-8">
      {Object.values(themePresets).map((preset) => (
        <ThemeExporter
          key={preset.id}
          theme={preset}
          showPreview={false}
          size="full"
        />
      ))}
    </div>
  ),
};
