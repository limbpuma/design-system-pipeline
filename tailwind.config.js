import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themePath = path.resolve(__dirname, 'src/styles/generated/theme.json');

// Load generated theme synchronously
let generatedTheme = {};
if (fs.existsSync(themePath)) {
  try {
    const content = fs.readFileSync(themePath, 'utf-8');
    generatedTheme = JSON.parse(content);
  } catch (e) {
    console.warn('Warning: Could not parse theme.json');
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      ...generatedTheme
    }
  },
  plugins: []
};
