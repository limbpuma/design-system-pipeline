/**
 * E2E Tests - Design System Pipeline
 *
 * Verifica el flujo completo:
 * 1. Build de tokens
 * 2. Generación de archivos
 * 3. Validación de Tailwind preset
 * 4. Validación de CSS variables
 * 5. Build de Storybook
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '../..');

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(name, passed, details = '') {
  const icon = passed ? '✅' : '❌';
  const color = passed ? 'green' : 'red';
  log(`${icon} ${name}`, color);
  if (details && !passed) {
    log(`   ${details}`, 'yellow');
  }
}

function logSection(title) {
  console.log();
  log(`${'═'.repeat(60)}`, 'blue');
  log(`${colors.bold}${title}`, 'blue');
  log(`${'═'.repeat(60)}`, 'blue');
  console.log();
}

// Test results
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function test(name, fn) {
  try {
    fn();
    results.passed++;
    results.tests.push({ name, passed: true });
    logTest(name, true);
  } catch (error) {
    results.failed++;
    results.tests.push({ name, passed: false, error: error.message });
    logTest(name, false, error.message);
  }
}

// ============================================================
// TESTS
// ============================================================

logSection('1. TOKENS SOURCE FILES');

test('tokens/primitives/colors.json exists', () => {
  const path = resolve(rootDir, 'tokens/primitives/colors.json');
  if (!existsSync(path)) throw new Error('File not found');
  const content = JSON.parse(readFileSync(path, 'utf-8'));
  if (!content.color) throw new Error('Missing "color" key');
});

test('tokens/primitives/spacing.json exists', () => {
  const path = resolve(rootDir, 'tokens/primitives/spacing.json');
  if (!existsSync(path)) throw new Error('File not found');
  const content = JSON.parse(readFileSync(path, 'utf-8'));
  if (!content.spacing) throw new Error('Missing "spacing" key');
});

test('tokens/primitives/typography.json exists', () => {
  const path = resolve(rootDir, 'tokens/primitives/typography.json');
  if (!existsSync(path)) throw new Error('File not found');
});

test('tokens/semantic/colors.json exists', () => {
  const path = resolve(rootDir, 'tokens/semantic/colors.json');
  if (!existsSync(path)) throw new Error('File not found');
  const content = JSON.parse(readFileSync(path, 'utf-8'));
  if (!content.semantic?.color?.primary) throw new Error('Missing semantic color definitions');
});

test('tokens/semantic/components.json exists', () => {
  const path = resolve(rootDir, 'tokens/semantic/components.json');
  if (!existsSync(path)) throw new Error('File not found');
});

// ============================================================
logSection('2. TOKENS BUILD');

test('npm run tokens:build executes successfully', () => {
  try {
    execSync('npm run tokens:build', {
      cwd: rootDir,
      stdio: 'pipe',
      encoding: 'utf-8'
    });
  } catch (error) {
    throw new Error(`Build failed: ${error.message}`);
  }
});

// ============================================================
logSection('3. GENERATED FILES');

test('tailwind.preset.js is generated', () => {
  const path = resolve(rootDir, 'src/styles/generated/tailwind.preset.js');
  if (!existsSync(path)) throw new Error('File not found');
});

test('variables.css is generated', () => {
  const path = resolve(rootDir, 'src/styles/generated/variables.css');
  if (!existsSync(path)) throw new Error('File not found');
});

test('tokens.d.ts is generated', () => {
  const path = resolve(rootDir, 'src/styles/generated/tokens.d.ts');
  if (!existsSync(path)) throw new Error('File not found');
});

// ============================================================
logSection('4. TAILWIND PRESET VALIDATION');

test('tailwind.preset.js exports valid config', async () => {
  const presetPath = resolve(rootDir, 'src/styles/generated/tailwind.preset.js');
  const preset = (await import(`file://${presetPath}`)).default;
  if (!preset.theme?.extend) throw new Error('Missing theme.extend');
});

test('tailwind.preset.js contains colors', async () => {
  const presetPath = resolve(rootDir, 'src/styles/generated/tailwind.preset.js');
  const preset = (await import(`file://${presetPath}`)).default;
  if (!preset.theme?.extend?.colors) throw new Error('Missing colors in preset');
});

test('tailwind.preset.js contains spacing', async () => {
  const presetPath = resolve(rootDir, 'src/styles/generated/tailwind.preset.js');
  const preset = (await import(`file://${presetPath}`)).default;
  if (!preset.theme?.extend?.spacing) throw new Error('Missing spacing in preset');
});

test('tailwind.preset.js contains typography', async () => {
  const presetPath = resolve(rootDir, 'src/styles/generated/tailwind.preset.js');
  const preset = (await import(`file://${presetPath}`)).default;
  const hasTypography = preset.theme?.extend?.fontSize ||
                        preset.theme?.extend?.fontFamily ||
                        preset.theme?.extend?.fontWeight;
  if (!hasTypography) throw new Error('Missing typography in preset');
});

// ============================================================
logSection('5. CSS VARIABLES VALIDATION');

test('variables.css contains :root', () => {
  const path = resolve(rootDir, 'src/styles/generated/variables.css');
  const content = readFileSync(path, 'utf-8');
  if (!content.includes(':root')) throw new Error('Missing :root selector');
});

test('variables.css contains color variables', () => {
  const path = resolve(rootDir, 'src/styles/generated/variables.css');
  const content = readFileSync(path, 'utf-8');
  if (!content.includes('--color-')) throw new Error('Missing color variables');
});

test('variables.css contains spacing variables', () => {
  const path = resolve(rootDir, 'src/styles/generated/variables.css');
  const content = readFileSync(path, 'utf-8');
  if (!content.includes('--spacing-')) throw new Error('Missing spacing variables');
});

test('variables.css contains semantic variables', () => {
  const path = resolve(rootDir, 'src/styles/generated/variables.css');
  const content = readFileSync(path, 'utf-8');
  if (!content.includes('--semantic-')) throw new Error('Missing semantic variables');
});

// ============================================================
logSection('6. COMPONENT FILES');

test('Button component exists', () => {
  const path = resolve(rootDir, 'src/components/Button/Button.tsx');
  if (!existsSync(path)) throw new Error('File not found');
});

test('Button exports correctly', () => {
  const path = resolve(rootDir, 'src/components/Button/index.ts');
  if (!existsSync(path)) throw new Error('File not found');
  const content = readFileSync(path, 'utf-8');
  if (!content.includes('export')) throw new Error('Missing exports');
});

test('Button story exists', () => {
  const path = resolve(rootDir, 'src/stories/Button.stories.tsx');
  if (!existsSync(path)) throw new Error('File not found');
});

// ============================================================
logSection('7. STORYBOOK BUILD');

test('Storybook builds successfully', () => {
  try {
    execSync('npm run build:storybook', {
      cwd: rootDir,
      stdio: 'pipe',
      encoding: 'utf-8',
      timeout: 120000 // 2 minutes timeout
    });
  } catch (error) {
    throw new Error(`Storybook build failed: ${error.stderr || error.message}`);
  }
});

test('storybook-static directory is created', () => {
  const path = resolve(rootDir, 'storybook-static');
  if (!existsSync(path)) throw new Error('Directory not found');
});

test('storybook-static/index.html exists', () => {
  const path = resolve(rootDir, 'storybook-static/index.html');
  if (!existsSync(path)) throw new Error('File not found');
});

// ============================================================
logSection('8. CONFIGURATION FILES');

test('package.json has required scripts', () => {
  const path = resolve(rootDir, 'package.json');
  const pkg = JSON.parse(readFileSync(path, 'utf-8'));
  const requiredScripts = ['tokens:build', 'storybook', 'build:storybook'];
  for (const script of requiredScripts) {
    if (!pkg.scripts?.[script]) {
      throw new Error(`Missing script: ${script}`);
    }
  }
});

test('tailwind.config.js exists', () => {
  const path = resolve(rootDir, 'tailwind.config.js');
  if (!existsSync(path)) throw new Error('File not found');
});

test('tsconfig.json exists', () => {
  const path = resolve(rootDir, 'tsconfig.json');
  if (!existsSync(path)) throw new Error('File not found');
});

test('.storybook/main.ts exists', () => {
  const path = resolve(rootDir, '.storybook/main.ts');
  if (!existsSync(path)) throw new Error('File not found');
});

// ============================================================
// SUMMARY
// ============================================================

logSection('TEST SUMMARY');

const total = results.passed + results.failed;
const passRate = ((results.passed / total) * 100).toFixed(1);

console.log();
log(`Total:  ${total} tests`, 'bold');
log(`Passed: ${results.passed}`, 'green');
log(`Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
log(`Rate:   ${passRate}%`, passRate === '100.0' ? 'green' : 'yellow');
console.log();

if (results.failed > 0) {
  log('Failed tests:', 'red');
  results.tests
    .filter(t => !t.passed)
    .forEach(t => {
      log(`  - ${t.name}: ${t.error}`, 'red');
    });
  console.log();
  process.exit(1);
} else {
  log('🎉 All tests passed! Pipeline is working correctly.', 'green');
  console.log();
  process.exit(0);
}
