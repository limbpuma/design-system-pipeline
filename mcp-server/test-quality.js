#!/usr/bin/env node
/**
 * Test script for Design Quality Tools
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Read the Button component
const buttonCode = fs.readFileSync(
  path.join(ROOT, 'src/components/Button/Button.tsx'),
  'utf8'
);

console.log('=== Button Design Quality Analysis ===\n');

const checks = {
  hover: /hover:/.test(buttonCode),
  focusVisible: /focus-visible:/.test(buttonCode),
  active: /active:/.test(buttonCode),
  disabled: /disabled:/.test(buttonCode),
  loading: /isLoading/.test(buttonCode),
  transitions: /transition-/.test(buttonCode),
  easing: /ease-/.test(buttonCode),
  transforms: /translate-|scale-/.test(buttonCode),
  shadows: /shadow-/.test(buttonCode),
  gradients: /bg-gradient/.test(buttonCode),
  cva: /cva\(/.test(buttonCode),
  semanticTokens: /var\(--semantic/.test(buttonCode),
  ringEffects: /ring-/.test(buttonCode),
};

let score = 0;
console.log('Checks:');
Object.entries(checks).forEach(([k, v]) => {
  console.log('  ' + (v ? '[✓]' : '[✗]') + ' ' + k);
  if (v) score += 5;
});

console.log('\nTotal Score:', score + '/65');
console.log('Level:', score >= 55 ? 'GOOD' : score >= 45 ? 'BASIC' : 'NEEDS_WORK');

console.log('\nMissing for PREMIUM:');
if (!checks.active) console.log('  - Add active:scale-[0.98] for tactile feedback');
if (!checks.transforms) console.log('  - Add hover:-translate-y-0.5 for elevation');
if (!checks.shadows) console.log('  - Add shadow effects for depth');
if (!checks.gradients) console.log('  - Add gradient backgrounds');

// Test Card component too
console.log('\n\n=== Card Design Quality Analysis ===\n');

const cardCode = fs.readFileSync(
  path.join(ROOT, 'src/components/Card/Card.tsx'),
  'utf8'
);

const cardChecks = {
  hover: /hover:/.test(cardCode),
  focusVisible: /focus-visible:/.test(cardCode),
  active: /active:/.test(cardCode),
  disabled: /disabled:/.test(cardCode),
  transitions: /transition-/.test(cardCode),
  duration: /duration-/.test(cardCode),
  easing: /ease-/.test(cardCode),
  transforms: /translate-|scale-/.test(cardCode),
  shadows: /shadow-/.test(cardCode),
  multiShadow: /shadow-lg|shadow-xl/.test(cardCode),
  gradients: /bg-gradient/.test(cardCode),
  cva: /cva\(/.test(cardCode),
  ringEffects: /ring-/.test(cardCode),
};

let cardScore = 0;
console.log('Checks:');
Object.entries(cardChecks).forEach(([k, v]) => {
  console.log('  ' + (v ? '[✓]' : '[✗]') + ' ' + k);
  if (v) cardScore += 5;
});

console.log('\nTotal Score:', cardScore + '/65');
console.log('Level:', cardScore >= 55 ? 'GOOD' : cardScore >= 45 ? 'BASIC' : 'NEEDS_WORK');

console.log('\n=== Summary ===');
console.log('Button Score:', score, '- needs: active states, transforms, shadows, gradients');
console.log('Card Score:', cardScore, '- much better with hover effects and shadows');
