/**
 * Core Accessibility Validator
 *
 * Uses axe-core to validate HTML/React components
 * and provides detailed feedback with fix suggestions.
 */

import axe, { type AxeResults, type Result } from 'axe-core';
import { JSDOM } from 'jsdom';
import type {
  A11yError,
  ValidationResult,
  ValidationSummary,
  ValidatorConfig,
  Severity,
  RuleCategory,
} from './types.js';
import { getFixSuggestions } from './fix-suggestions.js';

const DEFAULT_CONFIG: ValidatorConfig = {
  minSeverity: 'minor',
  includeFixes: true,
  format: 'json',
  failOnWarnings: false,
};

/**
 * Map axe-core impact to our severity levels
 */
function mapSeverity(impact: string | null | undefined): Severity {
  switch (impact) {
    case 'critical':
      return 'critical';
    case 'serious':
      return 'serious';
    case 'moderate':
      return 'moderate';
    default:
      return 'minor';
  }
}

/**
 * Map axe-core rule ID to category
 */
function mapCategory(ruleId: string): RuleCategory {
  const categoryMap: Record<string, RuleCategory> = {
    'color-contrast': 'color-contrast',
    'link-in-text-block': 'color-contrast',
    'region': 'landmarks',
    'landmark-one-main': 'landmarks',
    'landmark-complementary-is-top-level': 'landmarks',
    'scrollable-region-focusable': 'keyboard',
    'focus-order-semantics': 'keyboard',
    'tabindex': 'keyboard',
    'aria-allowed-attr': 'aria',
    'aria-hidden-body': 'aria',
    'aria-hidden-focus': 'aria',
    'aria-required-attr': 'aria',
    'aria-roles': 'aria',
    'aria-valid-attr': 'aria',
    'button-name': 'aria',
    'label': 'forms',
    'autocomplete-valid': 'forms',
    'input-button-name': 'forms',
    'image-alt': 'images',
    'svg-img-alt': 'images',
    'link-name': 'links',
    'table-fake-caption': 'tables',
    'td-headers-attr': 'tables',
    'heading-order': 'structure',
    'page-has-heading-one': 'structure',
  };

  return categoryMap[ruleId] || 'structure';
}

/**
 * Extract color information from axe node data
 */
function extractColorInfo(node: Result['nodes'][0]): Record<string, unknown> | undefined {
  const data = node.any?.[0]?.data as Record<string, unknown> | undefined;
  if (!data) return undefined;

  return {
    foreground: data.fgColor,
    background: data.bgColor,
    ratio: data.contrastRatio ? `${(data.contrastRatio as number).toFixed(2)}:1` : undefined,
    requiredRatio: data.expectedContrastRatio,
    fontSize: data.fontSize,
    fontWeight: data.fontWeight,
  };
}

/**
 * Convert axe-core result to our A11yError format
 */
function convertToA11yError(violation: Result, config: ValidatorConfig): A11yError[] {
  const category = mapCategory(violation.id);

  return violation.nodes.map((node, index) => {
    const colorInfo = extractColorInfo(node);

    const error: A11yError = {
      id: `${violation.id}-${index}`,
      rule: violation.id,
      category,
      severity: mapSeverity(node.impact),
      message: violation.help,
      element: node.html,
      selector: node.target.join(' > '),
      context: colorInfo,
      fixes: config.includeFixes
        ? getFixSuggestions(violation.id, category, colorInfo)
        : [],
      wcagCriteria: violation.tags
        .filter((tag) => tag.startsWith('wcag'))
        .map((tag) => tag.toUpperCase()),
      helpUrl: violation.helpUrl,
    };

    return error;
  });
}

/**
 * Calculate summary statistics
 */
function calculateSummary(errors: A11yError[], config: ValidatorConfig): ValidationSummary {
  const summary: ValidationSummary = {
    total: errors.length,
    bySeverity: {
      critical: 0,
      serious: 0,
      moderate: 0,
      minor: 0,
    },
    byCategory: {
      'color-contrast': 0,
      'landmarks': 0,
      'keyboard': 0,
      'aria': 0,
      'forms': 0,
      'images': 0,
      'links': 0,
      'tables': 0,
      'structure': 0,
    },
    autoFixable: 0,
    passed: false,
  };

  for (const error of errors) {
    summary.bySeverity[error.severity]++;
    summary.byCategory[error.category]++;

    if (error.fixes.some((fix) => fix.autoFixable)) {
      summary.autoFixable++;
    }
  }

  // Determine pass/fail
  const hasCritical = summary.bySeverity.critical > 0;
  const hasSerious = summary.bySeverity.serious > 0;
  const hasWarnings = summary.bySeverity.moderate > 0 || summary.bySeverity.minor > 0;

  if (hasCritical || hasSerious) {
    summary.passed = false;
  } else if (hasWarnings && config.failOnWarnings) {
    summary.passed = false;
  } else {
    summary.passed = errors.length === 0;
  }

  return summary;
}

/**
 * Validate HTML string using axe-core
 */
export async function validateHTML(
  html: string,
  componentName: string,
  filePath: string,
  config: Partial<ValidatorConfig> = {}
): Promise<ValidationResult> {
  const startTime = Date.now();
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Create a DOM from the HTML
  const dom = new JSDOM(html, {
    runScripts: 'outside-only',
  });

  // Configure axe
  axe.configure({
    rules: [
      { id: 'color-contrast', enabled: true },
      { id: 'region', enabled: true },
      { id: 'scrollable-region-focusable', enabled: true },
    ],
  });

  // Run axe-core
  let results: AxeResults;
  try {
    results = await axe.run(dom.window.document);
  } finally {
    dom.window.close();
  }

  // Convert violations to our format
  const errors: A11yError[] = results.violations.flatMap((violation) =>
    convertToA11yError(violation, mergedConfig)
  );

  // Filter by minimum severity
  const severityOrder: Severity[] = ['critical', 'serious', 'moderate', 'minor'];
  const minIndex = severityOrder.indexOf(mergedConfig.minSeverity || 'minor');
  const filteredErrors = errors.filter(
    (error) => severityOrder.indexOf(error.severity) <= minIndex
  );

  const summary = calculateSummary(filteredErrors, mergedConfig);

  return {
    status: summary.passed ? 'PASSED' : filteredErrors.some((e) => e.severity === 'critical' || e.severity === 'serious') ? 'BLOCKED' : 'WARNING',
    component: componentName,
    file: filePath,
    timestamp: new Date().toISOString(),
    errors: filteredErrors,
    summary,
    duration: Date.now() - startTime,
  };
}

/**
 * Validate a React component file
 * This extracts JSX and validates it
 */
export async function validateComponent(
  filePath: string,
  config: Partial<ValidatorConfig> = {}
): Promise<ValidationResult> {
  // For now, we'll need the rendered HTML
  // In a full implementation, this would render the component
  throw new Error(
    'Component validation requires rendered HTML. Use validateHTML() with rendered output.'
  );
}

export { DEFAULT_CONFIG };
