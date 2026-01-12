import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * AIResultsCard Block
 *
 * Professional results display for AI analysis workflows.
 * Features animated score gauge, expandable findings, and action buttons.
 *
 * @accessibility
 * - Score gauge with aria-label describing the score
 * - Expandable findings with aria-expanded and aria-controls
 * - All interactive elements have accessible names
 * - Color-independent severity indication via labels
 * - Images have descriptive alt text
 */

const cardVariants = cva(
  'rounded-2xl border overflow-hidden transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50',
        elevated: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-300/50 dark:shadow-slate-900/50',
        highlighted: 'border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type FindingSeverity = 'critical' | 'moderate' | 'minor' | 'info';

export interface Finding {
  id: string;
  title: string;
  description?: string;
  severity: FindingSeverity;
  category?: string;
  location?: string;
  costEstimate?: { min: number; max: number; currency?: string };
}

export interface AIResultsCardProps extends VariantProps<typeof cardVariants> {
  /** Overall score (0-100) */
  score: number;
  /** Score label (e.g., "Property Condition", "Skin Health") */
  scoreLabel?: string;
  /** Title of the analysis */
  title: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Timestamp of analysis */
  timestamp?: Date | string;
  /** Analysis findings */
  findings: Finding[];
  /** Maximum findings to show initially */
  maxVisibleFindings?: number;
  /** Summary text */
  summary?: string;
  /** Image preview */
  image?: string;
  /** Image alt text for accessibility */
  imageAlt?: string;
  /** Actions */
  actions?: React.ReactNode;
  /** Show export button */
  showExport?: boolean;
  /** Export handler */
  onExport?: () => void;
  /** Show share button */
  showShare?: boolean;
  /** Share handler */
  onShare?: () => void;
  /** Additional class name */
  className?: string;
}

const getScoreColor = (score: number): { text: string; bg: string; ring: string; gradient: string } => {
  if (score >= 80) return {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500',
    ring: 'ring-emerald-500/20',
    gradient: 'from-emerald-500 to-teal-500',
  };
  if (score >= 60) return {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500',
    ring: 'ring-amber-500/20',
    gradient: 'from-amber-500 to-orange-500',
  };
  return {
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-500',
    ring: 'ring-red-500/20',
    gradient: 'from-red-500 to-rose-500',
  };
};

const getScoreLabel = (score: number): string => {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Fair';
  if (score >= 60) return 'Needs Attention';
  return 'Critical Issues';
};

const getSeverityStyles = (severity: FindingSeverity) => {
  switch (severity) {
    case 'critical':
      return {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-800/30',
        text: 'text-red-700 dark:text-red-400',
        badge: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
        icon: 'text-red-500',
        dot: 'bg-red-500',
      };
    case 'moderate':
      return {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800/30',
        text: 'text-amber-700 dark:text-amber-400',
        badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
        icon: 'text-amber-500',
        dot: 'bg-amber-500',
      };
    case 'minor':
      return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800/30',
        text: 'text-blue-700 dark:text-blue-400',
        badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        icon: 'text-blue-500',
        dot: 'bg-blue-500',
      };
    default:
      return {
        bg: 'bg-slate-50 dark:bg-slate-800',
        border: 'border-slate-200 dark:border-slate-700',
        text: 'text-slate-700 dark:text-slate-400',
        badge: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
        icon: 'text-slate-400',
        dot: 'bg-slate-400',
      };
  }
};

// Animated score gauge with accessibility
const ScoreGauge: React.FC<{ score: number; label: string }> = ({ score, label }) => {
  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const progress = (score / 100) * circumference;
  const scoreDescription = `${label}: ${score} out of 100, rated as ${getScoreLabel(score)}`;

  return (
    <div
      className="relative flex flex-col items-center"
      role="img"
      aria-label={scoreDescription}
    >
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          {/* Background circle */}
          <circle
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <circle
            className={cn('transition-all duration-1000 ease-out', colors.text)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
          <span className={cn('text-3xl font-bold', colors.text)}>{score}</span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>
      <div className="mt-2 text-center" aria-hidden="true">
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className={cn('text-sm font-semibold', colors.text)}>{getScoreLabel(score)}</p>
      </div>
    </div>
  );
};

// Finding card component with accessibility
const FindingCard: React.FC<{
  finding: Finding;
  expanded?: boolean;
  onToggle?: () => void;
}> = ({ finding, expanded = false, onToggle }) => {
  const styles = getSeverityStyles(finding.severity);
  const contentId = `finding-content-${finding.id}`;

  const formatCurrency = (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('default', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-200',
        styles.bg,
        styles.border,
        'hover:shadow-md',
        expanded && 'ring-1 ring-slate-200 dark:ring-slate-700'
      )}
      role="listitem"
    >
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset rounded-xl"
        aria-expanded={expanded}
        aria-controls={contentId}
        aria-label={`${finding.title}, ${finding.severity} severity${finding.category ? `, ${finding.category}` : ''}. Click to ${expanded ? 'collapse' : 'expand'} details.`}
      >
        <span className={cn('w-2 h-2 rounded-full mt-2 flex-shrink-0', styles.dot)} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h5 className="font-medium text-slate-900 dark:text-white truncate">
              {finding.title}
            </h5>
            <span className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium capitalize flex-shrink-0',
              styles.badge
            )}>
              {finding.severity}
            </span>
          </div>
          {finding.category && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {finding.category}
              {finding.location && ` · ${finding.location}`}
            </p>
          )}
        </div>
        <svg
          className={cn(
            'w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0',
            expanded && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id={contentId}
        className={cn(
          'overflow-hidden transition-all duration-200',
          expanded ? 'max-h-96' : 'max-h-0'
        )}
        aria-hidden={!expanded}
      >
        <div className="px-4 pb-4 pt-0">
          {finding.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 pl-5">
              {finding.description}
            </p>
          )}
          {finding.costEstimate && (
            <div className="pl-5 flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Est. repair:</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {formatCurrency(finding.costEstimate.min, finding.costEstimate.currency)} -{' '}
                {formatCurrency(finding.costEstimate.max, finding.costEstimate.currency)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function AIResultsCard({
  score,
  scoreLabel = 'Score',
  title,
  subtitle,
  timestamp,
  findings,
  maxVisibleFindings = 3,
  summary,
  image,
  imageAlt,
  actions,
  showExport = true,
  onExport,
  showShare = true,
  onShare,
  variant,
  className,
}: AIResultsCardProps) {
  const [showAllFindings, setShowAllFindings] = React.useState(false);
  const [expandedFinding, setExpandedFinding] = React.useState<string | null>(null);

  const visibleFindings = showAllFindings
    ? findings
    : findings.slice(0, maxVisibleFindings);

  const criticalCount = findings.filter((f) => f.severity === 'critical').length;
  const moderateCount = findings.filter((f) => f.severity === 'moderate').length;
  const minorCount = findings.filter((f) => f.severity === 'minor').length;

  const formattedTime = React.useMemo(() => {
    if (!timestamp) return null;
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    return new Intl.DateTimeFormat('default', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  }, [timestamp]);

  return (
    <article
      className={cn(cardVariants({ variant }), className)}
      aria-labelledby="results-title"
    >
      {/* Header */}
      <div className="relative p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900">
        <div className="flex items-start gap-6">
          {/* Score gauge */}
          <ScoreGauge score={score} label={scoreLabel} />

          {/* Title and info */}
          <div className="flex-1 min-w-0">
            <h3 id="results-title" className="text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {subtitle}
              </p>
            )}
            {formattedTime && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <time dateTime={timestamp?.toString()}>{formattedTime}</time>
              </p>
            )}

            {/* Summary stats */}
            <div className="flex items-center gap-3 mt-4 flex-wrap" role="group" aria-label="Findings summary">
              {criticalCount > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30">
                  <span className="w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />
                  <span className="text-xs font-medium text-red-700 dark:text-red-300">
                    {criticalCount} Critical
                  </span>
                </div>
              )}
              {moderateCount > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
                  <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                    {moderateCount} Moderate
                  </span>
                </div>
              )}
              {minorCount > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <span className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true" />
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                    {minorCount} Minor
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Image preview */}
          {image && (
            <div className="flex-shrink-0">
              <img
                src={image}
                alt={imageAlt || `Preview image for ${title}`}
                className="w-24 h-24 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
              />
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {summary}
            </p>
          </div>
        </div>
      )}

      {/* Findings list */}
      {findings.length > 0 && (
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Findings ({findings.length})
            </h4>
            {findings.length > maxVisibleFindings && (
              <button
                onClick={() => setShowAllFindings(!showAllFindings)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
                aria-expanded={showAllFindings}
              >
                {showAllFindings ? 'Show less' : `Show all ${findings.length}`}
              </button>
            )}
          </div>

          <ul className="space-y-2" aria-label="Analysis findings">
            {visibleFindings.map((finding) => (
              <FindingCard
                key={finding.id}
                finding={finding}
                expanded={expandedFinding === finding.id}
                onToggle={() => setExpandedFinding(
                  expandedFinding === finding.id ? null : finding.id
                )}
              />
            ))}
          </ul>
        </div>
      )}

      {/* No findings */}
      {findings.length === 0 && (
        <div className="px-6 py-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3" aria-hidden="true">
            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">No issues found</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Everything looks great!</p>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="group" aria-label="Report actions">
            {showExport && onExport && (
              <button
                onClick={onExport}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  'bg-white dark:bg-slate-800',
                  'border border-slate-200 dark:border-slate-700',
                  'text-slate-700 dark:text-slate-200',
                  'hover:bg-slate-50 dark:hover:bg-slate-700',
                  'hover:shadow-md',
                  'active:scale-95',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                )}
                aria-label="Export analysis report as PDF"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export PDF
              </button>
            )}
            {showShare && onShare && (
              <button
                onClick={onShare}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  'text-slate-500 dark:text-slate-400',
                  'hover:bg-white dark:hover:bg-slate-800',
                  'hover:text-slate-700 dark:hover:text-slate-200',
                  'active:scale-95',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                )}
                aria-label="Share analysis report"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            )}
          </div>
          {actions}
        </div>
      </div>
    </article>
  );
}

export default AIResultsCard;
