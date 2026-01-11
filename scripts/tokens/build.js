/**
 * Design Tokens Build Script
 * Transforms tokens from JSON to Tailwind CSS and CSS Variables
 * Supports OKLCH color format and dark mode
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

// Convert HEX to OKLCH
function hexToOklch(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse hex to RGB
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  // Convert to linear RGB
  const toLinear = (c) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  // Convert to XYZ (D65)
  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb;
  const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb;

  // Convert XYZ to LMS
  const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

  // Convert to L'M'S' (cube root)
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // Convert to OKLab
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // Convert OKLab to OKLCH
  const C = Math.sqrt(A * A + B * B);
  let H = Math.atan2(B, A) * 180 / Math.PI;
  if (H < 0) H += 360;

  // Round values
  const lightness = Math.round(L * 1000) / 1000;
  const chroma = Math.round(C * 1000) / 1000;
  const hue = Math.round(H * 100) / 100;

  // Return OKLCH format
  if (chroma < 0.001) {
    return `oklch(${lightness} 0 0)`;
  }
  return `oklch(${lightness} ${chroma} ${hue})`;
}

// Register OKLCH transform
StyleDictionary.registerTransform({
  name: 'color/oklch',
  type: 'value',
  transitive: true,
  filter: (token) => token.type === 'color' && token.value && token.value.startsWith('#'),
  transform: (token) => hexToOklch(token.value)
});

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

    // Convert JSON to valid JS object notation, keeping quotes for keys starting with numbers
    const jsObject = JSON.stringify(tokens, null, 4)
      .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, '$1:'); // Only unquote valid JS identifiers

    return `/**
 * Tailwind CSS Preset
 * Auto-generated from design tokens
 * DO NOT EDIT DIRECTLY
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: ${jsObject}
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

// Custom format for CSS variables with dark mode support
StyleDictionary.registerFormat({
  name: 'css/variables-with-dark',
  format: ({ dictionary }) => {
    const lightTokens = [];
    const darkTokens = [];

    dictionary.allTokens.forEach(token => {
      const name = token.path.join('-');

      // Separate dark mode tokens
      if (token.path[0] === 'dark') {
        const darkName = token.path.slice(1).join('-');
        darkTokens.push({ name: darkName, value: token.value });
      } else {
        lightTokens.push({ name, value: token.value });
      }
    });

    let css = `/**
 * CSS Custom Properties with Dark Mode Support
 * Auto-generated from design tokens using OKLCH color space
 * DO NOT EDIT DIRECTLY
 */

@layer base {
  :root {
`;

    lightTokens.forEach(({ name, value }) => {
      css += `    --${name}: ${value};\n`;
    });

    css += `  }

  .dark {
`;

    darkTokens.forEach(({ name, value }) => {
      css += `    --${name}: ${value};\n`;
    });

    css += `  }
}
`;
    return css;
  }
});

// Custom format for CSS variables (legacy, no dark mode)
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
    const tokenNames = dictionary.allTokens
      .filter(token => token.path[0] !== 'dark')
      .map(token => `'${token.path.join('-')}'`);

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

// Configure Style Dictionary with OKLCH transform
const sd = new StyleDictionary({
  source: [
    'tokens/**/*.json'
  ],
  platforms: {
    tailwind: {
      transforms: ['attribute/cti', 'name/kebab', 'color/oklch'],
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
      transforms: ['attribute/cti', 'name/kebab', 'color/oklch'],
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables-with-dark'
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
  console.log('  - src/styles/generated/variables.css (with dark mode)');
  console.log('  - src/styles/generated/tokens.d.ts');
  console.log('\n🎨 Colors converted to OKLCH format for better perception');
} catch (error) {
  console.error('❌ Error building tokens:', error);
  process.exit(1);
}
