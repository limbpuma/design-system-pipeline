import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const codeBlockVariants = cva(
  'relative rounded-lg border overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-muted)]',
        dark: 'border-gray-700 bg-gray-900',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface CodeBlockProps extends VariantProps<typeof codeBlockVariants> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  copyable?: boolean;
  maxHeight?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'text',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  copyable = true,
  maxHeight = '400px',
  variant,
  size,
  className,
}) => {
  const [copied, setCopied] = React.useState(false);
  const lines = code.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(codeBlockVariants({ variant, size }), className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-subtle)] px-4 py-2">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-[var(--semantic-color-foreground-muted)]">{filename}</span>
          )}
          <span className="rounded bg-[var(--semantic-color-accent-default)] px-1.5 py-0.5 text-xs text-[var(--semantic-color-accent-foreground)]">
            {language}
          </span>
        </div>
        {copyable && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[var(--semantic-color-foreground-muted)] hover:bg-[var(--semantic-color-background-muted)] hover:text-[var(--semantic-color-foreground-default)] transition-colors"
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Content - scrollable with keyboard access */}
      <div
        className={cn(
          'overflow-auto',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--semantic-color-ring-default)]'
        )}
        style={{ maxHeight }}
        tabIndex={0}
        role="region"
        aria-label={`Code block${filename ? `: ${filename}` : ''}`}
      >
        <pre className="p-4">
          <code className="font-mono">
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightLines.includes(lineNumber);
              return (
                <div
                  key={index}
                  className={cn(
                    'flex',
                    isHighlighted && 'bg-[var(--semantic-color-warning-default)]/10 -mx-4 px-4'
                  )}
                >
                  {showLineNumbers && (
                    <span className="mr-4 inline-block w-8 select-none text-right text-[var(--semantic-color-foreground-muted)]">
                      {lineNumber}
                    </span>
                  )}
                  <span className={cn(
                    'flex-1',
                    variant === 'dark' ? 'text-gray-100' : 'text-[var(--semantic-color-foreground-default)]'
                  )}>
                    {line || ' '}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};

export { CodeBlock, codeBlockVariants };
