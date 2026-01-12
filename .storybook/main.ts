import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
  ],
  // Custom manager for enhanced a11y feedback panel
  managerHead: (head) => `
    ${head}
    <style>
      /* Enhanced A11y Panel Styles */
      .a11y-feedback-panel { font-family: system-ui, sans-serif; }
    </style>
  `,
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
