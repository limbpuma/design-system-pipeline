import type { Meta, StoryObj } from '@storybook/react';

import { ThemeCustomizerAdvanced } from './ThemeCustomizerAdvanced';

const meta: Meta<typeof ThemeCustomizerAdvanced> = {
  title: 'Design System/ThemeCustomizerAdvanced',
  component: ThemeCustomizerAdvanced,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Advanced Theme Customizer

Full-featured theme studio with live preview, persistence, and export capabilities.

## Features

- **Live Preview**: Apply themes directly to the page
- **Theme Persistence**: Save and manage multiple custom themes
- **Export Options**: CSS, JSON, Tailwind config, Design Tokens
- **Dark Mode Toggle**: Switch between light and dark modes
- **Quick Presets**: Start with popular color combinations

## Usage

\`\`\`tsx
import { ThemeCustomizerAdvanced } from '@/components/ThemeCustomizer';

<ThemeCustomizerAdvanced
  enableLivePreview={true}
  enablePersistence={true}
  showExportPanel={true}
  onThemeApplied={(theme) => console.log('Applied:', theme.name)}
  onThemeSaved={(stored) => console.log('Saved:', stored.theme.name)}
/>
\`\`\`

## Integration with ThemeProvider

The advanced customizer integrates with the \`useRuntimeTheme\` hook to apply
themes at runtime without requiring a full page reload.
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
    enableLivePreview: {
      control: 'boolean',
    },
    enablePersistence: {
      control: 'boolean',
    },
    showExportPanel: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeCustomizerAdvanced>;

/**
 * Full-featured theme studio
 */
export const Default: Story = {
  args: {
    enableLivePreview: true,
    enablePersistence: true,
    showExportPanel: true,
    size: 'lg',
  },
};

/**
 * Without persistence (themes not saved)
 */
export const NoPersistence: Story = {
  args: {
    enableLivePreview: true,
    enablePersistence: false,
    showExportPanel: true,
    size: 'lg',
  },
};

/**
 * Customize only (no export panel)
 */
export const CustomizeOnly: Story = {
  args: {
    enableLivePreview: true,
    enablePersistence: true,
    showExportPanel: false,
    size: 'md',
  },
};

/**
 * With initial color
 */
export const WithInitialColor: Story = {
  args: {
    initialColor: '#8B5CF6',
    enableLivePreview: true,
    enablePersistence: true,
    showExportPanel: true,
    size: 'lg',
  },
};

/**
 * Compact version
 */
export const Compact: Story = {
  args: {
    enableLivePreview: true,
    enablePersistence: false,
    showExportPanel: false,
    size: 'sm',
  },
};

/**
 * With callbacks
 */
export const WithCallbacks: Story = {
  args: {
    enableLivePreview: true,
    enablePersistence: true,
    showExportPanel: true,
    onThemeApplied: (theme) => {
      console.log('Theme applied:', theme.name);
    },
    onThemeSaved: (stored) => {
      console.log('Theme saved:', stored.theme.name);
    },
  },
};
