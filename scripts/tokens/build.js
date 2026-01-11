/**
 * Design Tokens Build Script
 * Transforms tokens from JSON to Tailwind CSS and CSS Variables
 */

import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '../..');

// Ensure output directory exists
const outputDir = resolve(rootDir, 'src/styles/generated');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

console.log('🎨 Building design tokens...\n');

// Helper to build tokens object for Tailwind
function buildTailwindTokens(dictionary) {
  const tokens = {};

  // Process colors
  const colors = {};
  dictionary.allTokens
    .filter(token => token.type === 'color')
    .forEach(token => {
      setNestedValue(colors, token.path, token.value);
    });
  if (Object.keys(colors).length) tokens.colors = colors;

  // Process spacing
  const spacing = {};
  dictionary.allTokens
    .filter(token => token.type === 'spacing')
    .forEach(token => {
      spacing[token.path[token.path.length - 1]] = token.value;
    });
  if (Object.keys(spacing).length) tokens.spacing = spacing;

  // Process font sizes
  const fontSize = {};
  dictionary.allTokens
    .filter(token => token.type === 'fontSizes')
    .forEach(token => {
      fontSize[token.path[token.path.length - 1]] = token.value;
    });
  if (Object.keys(fontSize).length) tokens.fontSize = fontSize;

  // Process font weights
  const fontWeight = {};
  dictionary.allTokens
    .filter(token => token.type === 'fontWeights')
    .forEach(token => {
      fontWeight[token.path[token.path.length - 1]] = token.value;
    });
  if (Object.keys(fontWeight).length) tokens.fontWeight = fontWeight;

  // Process font families
  const fontFamily = {};
  dictionary.allTokens
    .filter(token => token.type === 'fontFamilies')
    .forEach(token => {
      fontFamily[token.path[token.path.length - 1]] = token.value.split(', ');
    });
  if (Object.keys(fontFamily).length) tokens.fontFamily = fontFamily;

  // Process border radius
  const borderRadius = {};
  dictionary.allTokens
    .filter(token => token.type === 'borderRadius')
    .forEach(token => {
      borderRadius[token.path[token.path.length - 1]] = token.value;
    });
  if (Object.keys(borderRadius).length) tokens.borderRadius = borderRadius;

  // Process box shadows
  const boxShadow = {};
  dictionary.allTokens
    .filter(token => token.type === 'boxShadow')
    .forEach(token => {
      boxShadow[token.path[token.path.length - 1]] = token.value;
    });
  if (Object.keys(boxShadow).length) tokens.boxShadow = boxShadow;

  // Process line heights
  const lineHeight = {};
  dictionary.allTokens
    .filter(token => token.type === 'lineHeights')
    .forEach(token => {
      lineHeight[token.path[token.path.length - 1]] = token.value;
    });
  if (Object.keys(lineHeight).length) tokens.lineHeight = lineHeight;

  // Process letter spacing
  const letterSpacing = {};
  dictionary.allTokens
    .filter(token => token.type === 'letterSpacing')
    .forEach(token => {
      letterSpacing[token.path[token.path.length - 1]] = token.value;
    });
  if (Object.keys(letterSpacing).length) tokens.letterSpacing = letterSpacing;

  return tokens;
}

// Custom format for Tailwind preset (JS module)
StyleDictionary.registerFormat({
  name: 'tailwind/preset',
  format: ({ dictionary }) => {
    const tokens = buildTailwindTokens(dictionary);

    return `/**
 * Tailwind CSS Preset
 * Auto-generated from design tokens
 * DO NOT EDIT DIRECTLY
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: ${JSON.stringify(tokens, null, 4).replace(/"([^"]+)":/g, '$1:')}
  }
};
`;
  }
});

// Custom format for Tailwind theme JSON (for config import)
StyleDictionary.registerFormat({
  name: 'tailwind/json',
  format: ({ dictionary }) => {
    const tokens = buildTailwindTokens(dictionary);
    return JSON.stringify(tokens, null, 2);
  }
});

// Custom format for CSS variables
StyleDictionary.registerFormat({
  name: 'css/variables-flat',
  format: ({ dictionary }) => {
    let css = `/**
 * CSS Custom Properties
 * Auto-generated from design tokens
 * DO NOT EDIT DIRECTLY
 */

:root {\n`;

    dictionary.allTokens.forEach(token => {
      const name = token.path.join('-');
      css += `  --${name}: ${token.value};\n`;
    });

    css += '}\n';
    return css;
  }
});

// Custom format for TypeScript types
StyleDictionary.registerFormat({
  name: 'typescript/tokens',
  format: ({ dictionary }) => {
    const tokenNames = dictionary.allTokens.map(token => `'${token.path.join('-')}'`);

    return `/**
 * Design Token Types
 * Auto-generated from design tokens
 * DO NOT EDIT DIRECTLY
 */

export type TokenName = ${tokenNames.join(' | ') || 'never'};

export const tokenNames = [
  ${tokenNames.join(',\n  ')}
] as const;

export type TokenValue = typeof tokenNames[number];
`;
  }
});

// Helper function to set nested object values
function setNestedValue(obj, path, value) {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]]) {
      current[path[i]] = {};
    }
    current = current[path[i]];
  }
  current[path[path.length - 1]] = value;
}

// Configure Style Dictionary
const sd = new StyleDictionary({
  source: [
    'tokens/**/*.json'
  ],
  platforms: {
    tailwind: {
      transformGroup: 'web',
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'tailwind.preset.js',
          format: 'tailwind/preset'
        },
        {
          destination: 'theme.json',
          format: 'tailwind/json'
        }
      ]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables-flat'
        }
      ]
    },
    typescript: {
      transformGroup: 'web',
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/tokens'
        }
      ]
    }
  }
});

// Build all platforms
try {
  await sd.buildAllPlatforms();
  console.log('\n✅ Design tokens built successfully!\n');
  console.log('Generated files:');
  console.log('  - src/styles/generated/tailwind.preset.js');
  console.log('  - src/styles/generated/theme.json');
  console.log('  - src/styles/generated/variables.css');
  console.log('  - src/styles/generated/tokens.d.ts');
} catch (error) {
  console.error('❌ Error building tokens:', error);
  process.exit(1);
}
