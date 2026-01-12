/**
 * Design System Accessibility Validator
 *
 * A comprehensive accessibility validation tool that provides
 * detailed feedback and fix suggestions for WCAG compliance.
 *
 * @example
 * ```typescript
 * import { validateHTML, format } from '@design-system/a11y-validator';
 *
 * const result = await validateHTML(html, 'MyComponent', 'src/MyComponent.tsx');
 *
 * if (result.status === 'BLOCKED') {
 *   console.log(format(result, 'console'));
 *   // Shows detailed errors with fix suggestions
 * }
 * ```
 */

export { validateHTML, validateComponent, DEFAULT_CONFIG } from './validator.js';
export { format, formatConsole, formatJSON, formatHTML } from './reporter.js';
export { getFixSuggestions, colorContrastFixes, landmarkFixes, ariaFixes } from './fix-suggestions.js';
export type {
  A11yError,
  ValidationResult,
  ValidationSummary,
  ValidatorConfig,
  Severity,
  RuleCategory,
  SourceLocation,
  ColorInfo,
  FixSuggestion,
} from './types.js';
