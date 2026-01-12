/**
 * Accessibility Validator Types
 *
 * These types define the structure of validation results
 * and provide detailed feedback for fixing issues.
 */

export type Severity = 'critical' | 'serious' | 'moderate' | 'minor';

export type RuleCategory =
  | 'color-contrast'
  | 'landmarks'
  | 'keyboard'
  | 'aria'
  | 'forms'
  | 'images'
  | 'links'
  | 'tables'
  | 'structure';

export interface SourceLocation {
  file: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
}

export interface ColorInfo {
  foreground: string;
  background: string;
  ratio: string;
  requiredRatio: string;
}

export interface FixSuggestion {
  /** Short description of the fix */
  description: string;
  /** Code example showing how to fix */
  example: string;
  /** Whether this can be auto-fixed */
  autoFixable: boolean;
  /** Link to documentation */
  docsUrl?: string;
}

export interface A11yError {
  /** Unique identifier for this error instance */
  id: string;
  /** The rule that was violated */
  rule: string;
  /** Category of the rule */
  category: RuleCategory;
  /** Severity of the violation */
  severity: Severity;
  /** Human-readable error message */
  message: string;
  /** The HTML element that caused the error */
  element: string;
  /** CSS selector to find the element */
  selector: string;
  /** Location in source code (if available) */
  location?: SourceLocation;
  /** Additional context (e.g., color values) */
  context?: Record<string, unknown>;
  /** Suggested fixes with examples */
  fixes: FixSuggestion[];
  /** WCAG criteria violated */
  wcagCriteria?: string[];
  /** Help URL for more information */
  helpUrl?: string;
}

export interface ValidationSummary {
  /** Total number of errors */
  total: number;
  /** Count by severity */
  bySeverity: Record<Severity, number>;
  /** Count by category */
  byCategory: Record<RuleCategory, number>;
  /** Number of auto-fixable errors */
  autoFixable: number;
  /** Pass/fail status */
  passed: boolean;
}

export interface ValidationResult {
  /** Status of the validation */
  status: 'PASSED' | 'BLOCKED' | 'WARNING';
  /** Component or file being validated */
  component: string;
  /** File path */
  file: string;
  /** Timestamp of validation */
  timestamp: string;
  /** List of errors found */
  errors: A11yError[];
  /** Summary statistics */
  summary: ValidationSummary;
  /** Time taken to validate (ms) */
  duration: number;
}

export interface ValidatorConfig {
  /** Rules to enable/disable */
  rules?: Record<string, boolean | 'warn' | 'error'>;
  /** Minimum severity to report */
  minSeverity?: Severity;
  /** Include fix suggestions */
  includeFixes?: boolean;
  /** Output format */
  format?: 'json' | 'console' | 'html';
  /** Fail on warnings */
  failOnWarnings?: boolean;
}
