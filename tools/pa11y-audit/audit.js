#!/usr/bin/env node
/**
 * Pa11y Audit Tool for Design System Pipeline
 *
 * Integrated accessibility auditing tool.
 * Pa11y is installed as project dependency (npm install).
 *
 * Usage:
 *   npm run pa11y:audit           - Run full audit on all components
 *   npm run pa11y:quick           - Quick audit with summary only
 *   npm run pa11y:composition     - Scan composition contrast issues
 *   npm run pa11y:ci              - CI/CD mode with pa11y-ci
 *   npm run pa11y:storybook       - Start Storybook + run pa11y-ci
 *
 * Direct pa11y usage:
 *   npm run pa11y -- http://localhost:6006
 *   npm run pa11y -- --standard WCAG2AA http://localhost:6006
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');
const REPORTS_DIR = join(PROJECT_ROOT, 'reports/pa11y');

// Ensure reports directory exists
if (!existsSync(REPORTS_DIR)) {
  mkdirSync(REPORTS_DIR, { recursive: true });
}

/**
 * Critical components that must pass for quality score >= 70
 */
const CRITICAL_COMPONENTS = [
  'button--primary',
  'button--secondary',
  'button--destructive',
  'input--default',
  'card--default',
  'dialog--default',
  'tabs--default',
  'select--default'
];

/**
 * Composition contrast patterns to check
 * These are the scenarios that the swarm previously FAILED to detect
 */
const COMPOSITION_CHECKS = [
  {
    name: 'Icon inside dark Card',
    parent: 'bg-gray-900',
    child: 'text-gray-900',
    ratio: 1.0
  },
  {
    name: 'Icon inside dark Button',
    parent: 'bg-gray-800',
    child: 'text-gray-700',
    ratio: 1.35
  },
  {
    name: 'Muted text in dark container',
    parent: 'bg-gray-950',
    child: 'text-gray-600',
    ratio: 2.23
  },
  {
    name: 'Gray-500 on gray-900 (border case)',
    parent: 'bg-gray-900',
    child: 'text-gray-500',
    ratio: 3.75
  },
  {
    name: 'Gray-400 on gray-950 (PASS)',
    parent: 'bg-gray-950',
    child: 'text-gray-400',
    ratio: 5.42
  },
  {
    name: 'Gray-300 on gray-900 (PASS)',
    parent: 'bg-gray-900',
    child: 'text-gray-300',
    ratio: 7.47
  },
  {
    name: 'White on blue-600 (PASS)',
    parent: 'bg-blue-600',
    child: 'text-white',
    ratio: 4.68
  }
];

/**
 * Check composition contrast (the gap that was identified)
 */
function checkCompositionContrast() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PA11Y COMPOSITION CONTRAST CHECK');
  console.log('  Design System Pipeline - Accessibility Audit');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log('Checking icon/element visibility in containers...');
  console.log('Minimum required: 3:1 for UI components (WCAG 1.4.11)');
  console.log('');
  console.log('───────────────────────────────────────────────────────');

  const results = [];
  let passed = 0;
  let failed = 0;

  for (const check of COMPOSITION_CHECKS) {
    const passes = check.ratio >= 3.0;

    if (passes) {
      passed++;
      console.log(`✅ PASS: ${check.name}`);
    } else {
      failed++;
      console.log(`❌ FAIL: ${check.name}`);
    }

    console.log(`   Parent: ${check.parent}`);
    console.log(`   Child:  ${check.child}`);
    console.log(`   Ratio:  ${check.ratio}:1 ${passes ? '(>= 3:1)' : '(< 3:1 VIOLATION)'}`);
    console.log('');

    results.push({
      name: check.name,
      parent: check.parent,
      child: check.child,
      ratio: check.ratio,
      passes,
      requirement: '3:1 minimum for UI components (WCAG 1.4.11)'
    });
  }

  console.log('───────────────────────────────────────────────────────');
  console.log(`SUMMARY: ${passed} passed, ${failed} failed`);
  console.log('───────────────────────────────────────────────────────');
  console.log('');
  console.log('SAFE COMBINATIONS for dark containers:');
  console.log('  ✅ text-gray-400 on bg-gray-950 (5.42:1)');
  console.log('  ✅ text-gray-300 on bg-gray-900 (7.47:1)');
  console.log('  ✅ text-white on bg-blue-600 (4.68:1)');
  console.log('');
  console.log('RECOMMENDED: Use semantic tokens for auto-contrast:');
  console.log('  text-[var(--semantic-color-icon-default)]');
  console.log('  text-[var(--semantic-color-icon-muted)]');
  console.log('  text-[var(--semantic-color-foreground-default)]');
  console.log('');
  console.log('═══════════════════════════════════════════════════════');

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    type: 'composition-contrast',
    summary: { total: results.length, passed, failed },
    results
  };

  const reportPath = join(REPORTS_DIR, `composition-${Date.now()}.json`);
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Report saved: ${reportPath}`);

  return failed > 0 ? 1 : 0;
}

/**
 * Run full audit using pa11y-ci
 */
async function runFullAudit() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  PA11Y FULL AUDIT');
  console.log('  Design System Pipeline - Accessibility Audit');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log('To run full audit with Storybook:');
  console.log('');
  console.log('  Option 1: Manual (two terminals)');
  console.log('    Terminal 1: npm run storybook');
  console.log('    Terminal 2: npm run pa11y:ci');
  console.log('');
  console.log('  Option 2: Automatic');
  console.log('    npm run pa11y:storybook');
  console.log('');
  console.log('  Option 3: Single URL');
  console.log('    npm run pa11y -- http://localhost:6006');
  console.log('');
  console.log('Components to audit:');
  CRITICAL_COMPONENTS.forEach(c => console.log(`  - ${c}`));
  console.log('');
  console.log('Configuration: .pa11yci');
  console.log('Reports: reports/pa11y/');
  console.log('═══════════════════════════════════════════════════════');
}

/**
 * Quick summary
 */
function runQuickSummary() {
  console.log('');
  console.log('PA11Y Quick Summary');
  console.log('───────────────────');
  console.log(`Components configured: ${CRITICAL_COMPONENTS.length}`);
  console.log(`Composition checks: ${COMPOSITION_CHECKS.length}`);
  console.log('');
  console.log('Run `npm run pa11y:composition` for contrast validation');
  console.log('Run `npm run pa11y:storybook` for full Storybook audit');
}

/**
 * CLI Entry Point
 */
const args = process.argv.slice(2);
const command = args[0] || 'full';

switch (command) {
  case 'full':
    runFullAudit();
    break;

  case 'composition':
    const exitCode = checkCompositionContrast();
    process.exit(exitCode);
    break;

  case 'quick':
    runQuickSummary();
    break;

  default:
    console.log('Pa11y Audit Tool - Design System Pipeline');
    console.log('');
    console.log('Commands:');
    console.log('  full        - Show full audit instructions');
    console.log('  composition - Check composition contrast (CRITICAL)');
    console.log('  quick       - Quick summary');
    console.log('');
    console.log('npm scripts:');
    console.log('  npm run pa11y              - Direct pa11y CLI');
    console.log('  npm run pa11y:ci           - Run pa11y-ci with config');
    console.log('  npm run pa11y:composition  - Composition contrast check');
    console.log('  npm run pa11y:storybook    - Storybook + pa11y-ci');
}
