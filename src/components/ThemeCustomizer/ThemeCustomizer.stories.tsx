import type { Meta, StoryObj } from '@storybook/react';
import { ThemeCustomizer } from './ThemeCustomizer';

const meta: Meta<typeof ThemeCustomizer> = {
  title: 'Design System/Theme Customizer',
  component: ThemeCustomizer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Theme Customizer

Interactive UI component for generating custom color themes from a single base color.

## Features

- **Color Picker**: Select any primary color as the base
- **Color Harmony**: Choose from complementary, analogous, triadic, or split-complementary
- **Quick Presets**: Pre-defined theme options (Ocean, Forest, Sunset, etc.)
- **Live Preview**: See light and dark mode colors in real-time
- **CSS Export**: Copy generated CSS variables to clipboard

## Usage

\`\`\`tsx
import { ThemeCustomizer } from '@/components/ThemeCustomizer';

function MyApp() {
  const handleThemeGenerated = (theme, css) => {
    console.log('Generated theme:', theme.name);
    // Apply CSS or save theme
  };

  return (
    <ThemeCustomizer
      initialColor="#3B82F6"
      onThemeGenerated={handleThemeGenerated}
    />
  );
}
\`\`\`

## Psychology-Based Colors

The generated themes include color psychology metadata:
- **Primary emotion**: The feeling evoked by the primary color
- **Secondary emotion**: The feeling from the harmony color
- **Overall effect**: Combined psychological impact

## Accessibility

All generated color combinations are validated for WCAG 2.1 AA compliance:
- Minimum 4.5:1 contrast for normal text
- Minimum 3:1 contrast for large text and UI elements
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Size of the customizer container',
    },
    initialColor: {
      control: 'color',
      description: 'Initial primary color',
    },
    showCssOutput: {
      control: 'boolean',
      description: 'Show CSS output panel',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeCustomizer>;

/**
 * Default theme customizer with all features enabled
 */
export const Default: Story = {
  args: {
    initialColor: '#3B82F6',
    showCssOutput: true,
    size: 'lg',
  },
};

/**
 * Compact version for smaller spaces
 */
export const Compact: Story = {
  args: {
    initialColor: '#8B5CF6',
    showCssOutput: false,
    size: 'sm',
  },
};

/**
 * Starting with a warm color
 */
export const WarmColors: Story = {
  args: {
    initialColor: '#F97316',
    showCssOutput: true,
    size: 'md',
  },
};

/**
 * Starting with a cool color
 */
export const CoolColors: Story = {
  args: {
    initialColor: '#06B6D4',
    showCssOutput: true,
    size: 'md',
  },
};

/**
 * Full width version
 */
export const FullWidth: Story = {
  args: {
    initialColor: '#22C55E',
    showCssOutput: true,
    size: 'full',
  },
};

/**
 * With callback handler
 */
export const WithCallback: Story = {
  args: {
    initialColor: '#EC4899',
    showCssOutput: true,
    size: 'md',
    onThemeGenerated: (theme, css) => {
      console.log('Theme generated:', theme.name);
      console.log('CSS length:', css.length);
    },
  },
};

/**
 * Finance-inspired starting color
 */
export const FinanceTheme: Story = {
  args: {
    initialColor: '#1E3A5F',
    showCssOutput: true,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Starting with a navy blue color typical of finance/banking brands.',
      },
    },
  },
};

/**
 * Healthcare-inspired starting color
 */
export const HealthcareTheme: Story = {
  args: {
    initialColor: '#0D9488',
    showCssOutput: true,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Starting with a teal color often used in healthcare/wellness brands.',
      },
    },
  },
};
