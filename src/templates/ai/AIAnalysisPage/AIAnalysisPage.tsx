import * as React from 'react';
import { AppShell } from '../../../layouts/AppShell';
import { ImageUploader, type UploadedImage } from '../../../blocks/ai/ImageUploader';
import { AnalysisProgress, type AnalysisStep } from '../../../blocks/ai/AnalysisProgress';
import { AIResultsCard, type Finding } from '../../../blocks/ai/AIResultsCard';
import { AIStatusIndicator, type AIStatus } from '../../../components/AIStatusIndicator';
import { cn } from '../../../lib/utils';

/**
 * AIAnalysisPage Template
 *
 * Complete page template for AI analysis workflows (HomeCheck AI, SkinCheck AI, etc.).
 * Handles the full flow: upload → analysis → results.
 *
 * @accessibility
 * - Step-by-step workflow with clear progress indication
 * - Screen reader announcements for state changes
 * - Keyboard navigable throughout
 */

export type AnalysisPhase = 'upload' | 'analyzing' | 'results' | 'error';

export interface AnalysisResult {
  id: string;
  score: number;
  title: string;
  subtitle?: string;
  summary: string;
  findings: Finding[];
  timestamp: Date;
  image?: string;
}

export interface AIAnalysisPageProps {
  /** Current phase of the analysis */
  phase: AnalysisPhase;
  /** Uploaded images */
  images: UploadedImage[];
  /** Handler for file selection */
  onFilesSelected: (files: File[]) => void;
  /** Handler for image removal */
  onRemoveImage: (id: string) => void;
  /** Handler to start analysis */
  onStartAnalysis: () => void;
  /** Analysis steps for progress display */
  analysisSteps?: AnalysisStep[];
  /** Overall progress (0-100) */
  analysisProgress?: number;
  /** Estimated time remaining */
  estimatedTime?: number;
  /** Analysis status */
  analysisStatus?: AIStatus;
  /** Analysis status message */
  statusMessage?: string;
  /** Analysis results */
  results?: AnalysisResult;
  /** Handler for new analysis */
  onNewAnalysis?: () => void;
  /** Handler for export */
  onExport?: () => void;
  /** Handler for share */
  onShare?: () => void;
  /** Error message */
  error?: string;
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Sidebar content */
  sidebar: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Branding/logo for analysis type */
  branding?: {
    name: string;
    icon?: React.ReactNode;
    tagline?: string;
  };
  /** Tips for upload phase */
  uploadTips?: string[];
  /** Additional class name */
  className?: string;
}

const defaultSteps: AnalysisStep[] = [
  { id: '1', label: 'Uploading images', status: 'pending' },
  { id: '2', label: 'Pre-processing', status: 'pending' },
  { id: '3', label: 'AI Analysis', status: 'pending' },
  { id: '4', label: 'Generating report', status: 'pending' },
];

export function AIAnalysisPage({
  phase,
  images,
  onFilesSelected,
  onRemoveImage,
  onStartAnalysis,
  analysisSteps = defaultSteps,
  analysisProgress = 0,
  estimatedTime,
  analysisStatus = 'idle',
  statusMessage,
  results,
  onNewAnalysis,
  onExport,
  onShare,
  error,
  title = 'AI Analysis',
  description = 'Upload images to start the analysis',
  sidebar,
  header,
  branding,
  uploadTips = [
    'Use clear, well-lit photos',
    'Capture multiple angles',
    'Include close-ups of problem areas',
    'Avoid blurry or dark images',
  ],
  className,
}: AIAnalysisPageProps) {
  const canStartAnalysis = images.length > 0 && images.every((img) => img.status === 'complete');

  return (
    <AppShell sidebar={sidebar} header={header} className={className}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page header */}
        <div className="flex items-start justify-between">
          <div>
            {branding && (
              <div className="flex items-center gap-3 mb-2">
                {branding.icon && (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                    {branding.icon}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-[var(--semantic-color-foreground-default)]">
                    {branding.name}
                  </h1>
                  {branding.tagline && (
                    <p className="text-sm text-[var(--semantic-color-foreground-muted)]">
                      {branding.tagline}
                    </p>
                  )}
                </div>
              </div>
            )}
            {!branding && (
              <>
                <h1 className="text-2xl font-bold text-[var(--semantic-color-foreground-default)]">
                  {title}
                </h1>
                <p className="mt-1 text-[var(--semantic-color-foreground-muted)]">
                  {description}
                </p>
              </>
            )}
          </div>

          {/* Phase indicator */}
          <AIStatusIndicator
            status={
              phase === 'upload' ? 'idle' :
              phase === 'analyzing' ? 'analyzing' :
              phase === 'results' ? 'success' :
              'error'
            }
            label={
              phase === 'upload' ? 'Ready' :
              phase === 'analyzing' ? (statusMessage || 'Analyzing...') :
              phase === 'results' ? 'Complete' :
              'Error'
            }
          />
        </div>

        {/* Error state */}
        {phase === 'error' && error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-500 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-200">
                  Analysis failed
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {error}
                </p>
                {onNewAnalysis && (
                  <button
                    onClick={onNewAnalysis}
                    className="mt-3 text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
                  >
                    Try again
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Upload phase */}
        {phase === 'upload' && (
          <div className="space-y-6">
            <ImageUploader
              images={images}
              onFilesSelected={onFilesSelected}
              onRemove={onRemoveImage}
              maxImages={10}
              variant="elevated"
              size="lg"
            />

            {/* Upload tips */}
            {uploadTips.length > 0 && (
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Tips for best results
                </h3>
                <ul className="space-y-1">
                  {uploadTips.map((tip, index) => (
                    <li
                      key={index}
                      className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Start analysis button */}
            <div className="flex justify-center">
              <button
                onClick={onStartAnalysis}
                disabled={!canStartAnalysis}
                className={cn(
                  'px-8 py-3 rounded-xl font-medium text-lg transition-all',
                  'bg-gradient-to-r from-purple-500 to-blue-500 text-white',
                  'hover:from-purple-600 hover:to-blue-600',
                  'shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
                  'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                )}
              >
                {images.length === 0
                  ? 'Upload images to start'
                  : `Analyze ${images.length} image${images.length !== 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        )}

        {/* Analyzing phase */}
        {phase === 'analyzing' && (
          <AnalysisProgress
            steps={analysisSteps}
            overallProgress={analysisProgress}
            estimatedTime={estimatedTime}
            status={analysisStatus}
            statusMessage={statusMessage}
          />
        )}

        {/* Results phase */}
        {phase === 'results' && results && (
          <div className="space-y-6">
            <AIResultsCard
              score={results.score}
              title={results.title}
              subtitle={results.subtitle}
              summary={results.summary}
              findings={results.findings}
              timestamp={results.timestamp}
              image={results.image}
              onExport={onExport}
              onShare={onShare}
              variant="elevated"
            />

            {/* Action buttons */}
            <div className="flex justify-center gap-4">
              {onNewAnalysis && (
                <button
                  onClick={onNewAnalysis}
                  className={cn(
                    'px-6 py-2.5 rounded-lg font-medium transition-colors',
                    'bg-[var(--semantic-color-primary-default)] text-white',
                    'hover:bg-[var(--semantic-color-primary-hover)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--semantic-color-primary-default)] focus:ring-offset-2'
                  )}
                >
                  New Analysis
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default AIAnalysisPage;
