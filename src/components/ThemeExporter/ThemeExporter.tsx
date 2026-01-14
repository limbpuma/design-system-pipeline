/**
 * Theme Exporter Component
 *
 * Export theme configurations in various formats:
 * - CSS (custom properties)
 * - JSON (complete theme data)
 * - Tailwind config (colors only)
 * - Tokens (design token format)
 */

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { generateThemeCSS, type ThemePreset } from '@/lib/themes';

const themeExporterVariants = cva(
  'rounded-lg border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] p-6',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * Export format types
 */
export type ExportFormat = 'css' | 'json' | 'tailwind' | 'tokens';

/**
 * Export format configuration
 */
interface FormatConfig {
  id: ExportFormat;
  label: string;
  description: string;
  fileExtension: string;
  mimeType: string;
}

const exportFormats: FormatConfig[] = [
  {
    id: 'css',
    label: 'CSS Variables',
    description: 'CSS custom properties ready for use',
    fileExtension: 'css',
    mimeType: 'text/css',
  },
  {
    id: 'json',
    label: 'JSON',
    description: 'Complete theme configuration',
    fileExtension: 'json',
    mimeType: 'application/json',
  },
  {
    id: 'tailwind',
    label: 'Tailwind Config',
    description: 'Colors for tailwind.config.js',
    fileExtension: 'js',
    mimeType: 'text/javascript',
  },
  {
    id: 'tokens',
    label: 'Design Tokens',
    description: 'W3C design token format',
    fileExtension: 'json',
    mimeType: 'application/json',
  },
];

export interface ThemeExporterProps
  extends VariantProps<typeof themeExporterVariants> {
  /** Theme to export */
  theme: ThemePreset;
  /** Show preview panel */
  showPreview?: boolean;
  /** Callback when export is triggered */
  onExport?: (format: ExportFormat, content: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Generate export content based on format
 */
function generateExportContent(theme: ThemePreset, format: ExportFormat): string {
  switch (format) {
    case 'css':
      return generateThemeCSS(theme);

    case 'json':
      return JSON.stringify(
        {
          $schema: 'https://design-system.dev/theme-schema.json',
          version: '1.0.0',
          name: theme.name,
          description: theme.description,
          industry: theme.industry,
          psychology: theme.psychology,
          light: theme.light,
          dark: theme.dark,
        },
        null,
        2
      );

    case 'tailwind':
      return generateTailwindConfig(theme);

    case 'tokens':
      return generateDesignTokens(theme);

    default:
      return '';
  }
}

/**
 * Generate Tailwind config format
 */
function generateTailwindConfig(theme: ThemePreset): string {
  const colors = {
    primary: {
      DEFAULT: 'var(--semantic-color-primary-default)',
      hover: 'var(--semantic-color-primary-hover)',
      active: 'var(--semantic-color-primary-active)',
      foreground: 'var(--semantic-color-primary-foreground)',
    },
    secondary: {
      DEFAULT: 'var(--semantic-color-secondary-default)',
      hover: 'var(--semantic-color-secondary-hover)',
      active: 'var(--semantic-color-secondary-active)',
      foreground: 'var(--semantic-color-secondary-foreground)',
    },
    accent: {
      DEFAULT: 'var(--semantic-color-accent-default)',
      hover: 'var(--semantic-color-accent-hover)',
      foreground: 'var(--semantic-color-accent-foreground)',
    },
    background: {
      DEFAULT: 'var(--semantic-color-background-default)',
      subtle: 'var(--semantic-color-background-subtle)',
      muted: 'var(--semantic-color-background-muted)',
    },
    foreground: {
      DEFAULT: 'var(--semantic-color-foreground-default)',
      muted: 'var(--semantic-color-foreground-muted)',
      subtle: 'var(--semantic-color-foreground-subtle)',
    },
    border: {
      DEFAULT: 'var(--semantic-color-border-default)',
      strong: 'var(--semantic-color-border-strong)',
      muted: 'var(--semantic-color-border-muted)',
    },
  };

  return `/**
 * Tailwind CSS Configuration - ${theme.name}
 * ${theme.description}
 *
 * Add to your tailwind.config.js:
 */

module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 6).replace(/"/g, "'")}
    }
  }
}`;
}

/**
 * Generate W3C Design Tokens format
 */
function generateDesignTokens(theme: ThemePreset): string {
  const createColorToken = (value: string, description: string) => ({
    $value: value,
    $type: 'color',
    $description: description,
  });

  const tokens = {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    theme: {
      name: { $value: theme.name, $type: 'string' },
      description: { $value: theme.description, $type: 'string' },
    },
    color: {
      light: {
        primary: {
          default: createColorToken(theme.light.primary.default, 'Primary brand color'),
          hover: createColorToken(theme.light.primary.hover, 'Primary hover state'),
          active: createColorToken(theme.light.primary.active, 'Primary active state'),
          foreground: createColorToken(theme.light.primary.foreground, 'Text on primary'),
        },
        secondary: {
          default: createColorToken(theme.light.secondary.default, 'Secondary color'),
          hover: createColorToken(theme.light.secondary.hover, 'Secondary hover'),
          foreground: createColorToken(theme.light.secondary.foreground, 'Text on secondary'),
        },
        accent: {
          default: createColorToken(theme.light.accent.default, 'Accent highlight'),
          hover: createColorToken(theme.light.accent.hover, 'Accent hover'),
          foreground: createColorToken(theme.light.accent.foreground, 'Text on accent'),
        },
        background: {
          default: createColorToken(theme.light.background.default, 'Default background'),
          subtle: createColorToken(theme.light.background.subtle, 'Subtle background'),
          muted: createColorToken(theme.light.background.muted, 'Muted background'),
        },
        foreground: {
          default: createColorToken(theme.light.foreground.default, 'Default text'),
          muted: createColorToken(theme.light.foreground.muted, 'Muted text'),
          subtle: createColorToken(theme.light.foreground.subtle, 'Subtle text'),
        },
        border: {
          default: createColorToken(theme.light.border.default, 'Default border'),
          strong: createColorToken(theme.light.border.strong, 'Strong border'),
          muted: createColorToken(theme.light.border.muted, 'Muted border'),
        },
      },
      dark: {
        primary: {
          default: createColorToken(theme.dark.primary.default, 'Primary brand color (dark)'),
          hover: createColorToken(theme.dark.primary.hover, 'Primary hover (dark)'),
          active: createColorToken(theme.dark.primary.active, 'Primary active (dark)'),
          foreground: createColorToken(theme.dark.primary.foreground, 'Text on primary (dark)'),
        },
        secondary: {
          default: createColorToken(theme.dark.secondary.default, 'Secondary color (dark)'),
          hover: createColorToken(theme.dark.secondary.hover, 'Secondary hover (dark)'),
          foreground: createColorToken(theme.dark.secondary.foreground, 'Text on secondary (dark)'),
        },
        accent: {
          default: createColorToken(theme.dark.accent.default, 'Accent highlight (dark)'),
          hover: createColorToken(theme.dark.accent.hover, 'Accent hover (dark)'),
          foreground: createColorToken(theme.dark.accent.foreground, 'Text on accent (dark)'),
        },
        background: {
          default: createColorToken(theme.dark.background.default, 'Default background (dark)'),
          subtle: createColorToken(theme.dark.background.subtle, 'Subtle background (dark)'),
          muted: createColorToken(theme.dark.background.muted, 'Muted background (dark)'),
        },
        foreground: {
          default: createColorToken(theme.dark.foreground.default, 'Default text (dark)'),
          muted: createColorToken(theme.dark.foreground.muted, 'Muted text (dark)'),
          subtle: createColorToken(theme.dark.foreground.subtle, 'Subtle text (dark)'),
        },
        border: {
          default: createColorToken(theme.dark.border.default, 'Default border (dark)'),
          strong: createColorToken(theme.dark.border.strong, 'Strong border (dark)'),
          muted: createColorToken(theme.dark.border.muted, 'Muted border (dark)'),
        },
      },
    },
  };

  return JSON.stringify(tokens, null, 2);
}

/**
 * ThemeExporter Component
 */
export function ThemeExporter({
  theme,
  showPreview = true,
  onExport,
  size,
  className,
}: ThemeExporterProps) {
  const [selectedFormat, setSelectedFormat] = React.useState<ExportFormat>('css');
  const [copied, setCopied] = React.useState(false);
  const [exportContent, setExportContent] = React.useState('');

  // Generate content when format or theme changes
  React.useEffect(() => {
    setExportContent(generateExportContent(theme, selectedFormat));
  }, [theme, selectedFormat]);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Download file
  const handleDownload = () => {
    const format = exportFormats.find((f) => f.id === selectedFormat);
    if (!format) return;

    const blob = new Blob([exportContent], { type: format.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.id}-theme.${format.fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    onExport?.(selectedFormat, exportContent);
  };

  return (
    <div className={themeExporterVariants({ size, className })}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--semantic-color-foreground-default)]">
          Export Theme
        </h2>
        <p className="mt-1 text-sm text-[var(--semantic-color-foreground-muted)]">
          Export &quot;{theme.name}&quot; in your preferred format
        </p>
      </div>

      {/* Format selector */}
      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-medium text-[var(--semantic-color-foreground-default)]">
          Export Format
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {exportFormats.map((format) => (
            <button
              key={format.id}
              type="button"
              onClick={() => setSelectedFormat(format.id)}
              className={`rounded-lg border p-3 text-left transition-all duration-200 ${
                selectedFormat === format.id
                  ? 'border-[var(--semantic-color-primary-default)] bg-[var(--semantic-color-primary-default)] text-white'
                  : 'border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] text-[var(--semantic-color-foreground-default)] hover:border-[var(--semantic-color-border-strong)]'
              }`}
            >
              <span className="block text-sm font-medium">{format.label}</span>
              <span className="mt-1 block text-xs opacity-75">
                .{format.fileExtension}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-[var(--semantic-color-foreground-muted)]">
          {exportFormats.find((f) => f.id === selectedFormat)?.description}
        </p>
      </fieldset>

      {/* Preview */}
      {showPreview && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--semantic-color-foreground-default)]">
              Preview
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md bg-[var(--semantic-color-secondary-default)] px-3 py-1.5 text-sm font-medium text-[var(--semantic-color-secondary-foreground)] transition-all duration-200 hover:bg-[var(--semantic-color-secondary-hover)] active:scale-[0.98]"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-md bg-[var(--semantic-color-primary-default)] px-3 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[var(--semantic-color-primary-hover)] active:scale-[0.98]"
              >
                Download
              </button>
            </div>
          </div>
          <pre className="mt-3 max-h-80 overflow-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-100">
            <code>{exportContent}</code>
          </pre>
        </div>
      )}

      {/* Quick actions (when preview is hidden) */}
      {!showPreview && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 rounded-md bg-[var(--semantic-color-secondary-default)] px-4 py-2 text-sm font-medium text-[var(--semantic-color-secondary-foreground)] transition-all duration-200 hover:bg-[var(--semantic-color-secondary-hover)] active:scale-[0.98]"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 rounded-md bg-[var(--semantic-color-primary-default)] px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[var(--semantic-color-primary-hover)] active:scale-[0.98]"
          >
            Download File
          </button>
        </div>
      )}
    </div>
  );
}

export default ThemeExporter;
