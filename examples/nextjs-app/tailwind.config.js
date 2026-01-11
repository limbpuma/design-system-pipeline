/** @type {import('tailwindcss').Config} */

// Import the design system preset
// When using from npm: import preset from '@limbpuma/design-system/tailwind-preset';
import preset from '@limbpuma/design-system/tailwind-preset';

export default {
  // Use the design system preset
  presets: [preset],

  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Include design system components
    './node_modules/@limbpuma/design-system/dist/**/*.js'
  ],

  theme: {
    extend: {
      // Add project-specific customizations here
      // They will extend the design system tokens
    }
  },

  plugins: []
};
