import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    // Accessibility addon configuration - STRICT MODE
    a11y: {
      // Run axe-core on every story
      config: {
        rules: [
          // WCAG 2.1 AA - All critical rules enabled
          { id: 'color-contrast', enabled: true },
          { id: 'valid-aria-role', enabled: true },
          { id: 'aria-valid-attr', enabled: true },
          { id: 'aria-valid-attr-value', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'image-alt', enabled: true },
          { id: 'input-button-name', enabled: true },
          { id: 'label', enabled: true },
          { id: 'link-name', enabled: true },
          { id: 'list', enabled: true },
          { id: 'listitem', enabled: true },
          { id: 'document-title', enabled: true },
          { id: 'html-has-lang', enabled: true },
          { id: 'html-lang-valid', enabled: true },
          { id: 'meta-viewport', enabled: true },
          { id: 'duplicate-id', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'landmark-one-main', enabled: false }, // Disabled for individual components
          { id: 'region', enabled: false }, // Disabled for individual components
        ],
      },
      // Show violations prominently
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
        { name: 'gray', value: '#f3f4f6' },
      ],
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
