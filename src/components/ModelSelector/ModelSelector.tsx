import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const modelSelectorVariants = cva(
  'relative w-full rounded-md border transition-colors',
  {
    variants: {
      variant: {
        default: 'border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)]',
        filled: 'border-transparent bg-[var(--semantic-color-background-muted)]',
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

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description?: string;
  contextWindow?: number;
  maxTokens?: number;
  capabilities?: string[];
  costPer1kTokens?: { input: number; output: number };
  isAvailable?: boolean;
}

export interface ModelSelectorProps extends VariantProps<typeof modelSelectorVariants> {
  models: AIModel[];
  selectedModel?: string;
  onModelChange?: (modelId: string) => void;
  label?: string;
  showDetails?: boolean;
  showCapabilities?: boolean;
  groupByProvider?: boolean;
  className?: string;
  disabled?: boolean;
}

const ModelSelector = React.forwardRef<HTMLDivElement, ModelSelectorProps>(
  ({ models, selectedModel, onModelChange, label, showDetails, showCapabilities, groupByProvider, variant, size, className, disabled }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selected = models.find(m => m.id === selectedModel);

    const groupedModels = React.useMemo(() => {
      if (!groupByProvider) return { '': models };
      return models.reduce((acc, model) => {
        const provider = model.provider || 'Other';
        if (!acc[provider]) acc[provider] = [];
        acc[provider].push(model);
        return acc;
      }, {} as Record<string, AIModel[]>);
    }, [models, groupByProvider]);

    const formatTokens = (num?: number) => {
      if (!num) return 'N/A';
      return num >= 1000 ? `${(num / 1000).toFixed(0)}K` : num.toString();
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
            {label}
          </label>
        )}
        <div className={cn(modelSelectorVariants({ variant, size }))}>
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className={cn(
              'flex w-full items-center justify-between px-3 py-2 text-left',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <div className="flex items-center gap-2">
              {selected ? (
                <>
                  <span className="font-medium text-[var(--semantic-color-foreground-default)]">{selected.name}</span>
                  <span className="text-[var(--semantic-color-foreground-muted)]">({selected.provider})</span>
                </>
              ) : (
                <span className="text-[var(--semantic-color-foreground-muted)]">Select a model...</span>
              )}
            </div>
            <svg className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-auto rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-popover-default)] shadow-lg">
              {Object.entries(groupedModels).map(([provider, providerModels]) => (
                <div key={provider}>
                  {provider && groupByProvider && (
                    <div className="sticky top-0 bg-[var(--semantic-color-background-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--semantic-color-foreground-muted)] uppercase">
                      {provider}
                    </div>
                  )}
                  {providerModels.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => { onModelChange?.(model.id); setIsOpen(false); }}
                      disabled={model.isAvailable === false}
                      className={cn(
                        'w-full px-3 py-2 text-left hover:bg-[var(--semantic-color-background-subtle)]',
                        selectedModel === model.id && 'bg-[var(--semantic-color-background-muted)]',
                        model.isAvailable === false && 'cursor-not-allowed opacity-50'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[var(--semantic-color-foreground-default)]">{model.name}</span>
                        {model.isAvailable === false && (
                          <span className="text-xs text-[var(--semantic-color-warning-default)]">Unavailable</span>
                        )}
                      </div>
                      {showDetails && (
                        <div className="mt-1 flex gap-3 text-xs text-[var(--semantic-color-foreground-muted)]">
                          <span>Context: {formatTokens(model.contextWindow)}</span>
                          <span>Max: {formatTokens(model.maxTokens)}</span>
                          {model.costPer1kTokens && (
                            <span>${model.costPer1kTokens.input}/${model.costPer1kTokens.output}</span>
                          )}
                        </div>
                      )}
                      {showCapabilities && model.capabilities && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {model.capabilities.map(cap => (
                            <span key={cap} className="rounded bg-[var(--semantic-color-accent-default)] px-1.5 py-0.5 text-xs text-[var(--semantic-color-accent-foreground)]">
                              {cap}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
ModelSelector.displayName = 'ModelSelector';

export { ModelSelector, modelSelectorVariants };
