import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface AgentParameter {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'slider' | 'toggle' | 'textarea';
  value: string | number | boolean;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  required?: boolean;
}

export interface AgentConfig {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  parameters?: AgentParameter[];
  capabilities?: string[];
  isActive?: boolean;
}

export interface AgentConfigPanelProps {
  config: AgentConfig;
  onConfigChange?: (config: AgentConfig) => void;
  onSave?: (config: AgentConfig) => void;
  onReset?: () => void;
  onTest?: () => void;
  availableModels?: { id: string; name: string }[];
  showAdvanced?: boolean;
  className?: string;
}

const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({
  config,
  onConfigChange,
  onSave,
  onReset,
  onTest,
  availableModels = [
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
  ],
  showAdvanced = true,
  className,
}) => {
  const [localConfig, setLocalConfig] = React.useState(config);
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);

  React.useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const updateConfig = <K extends keyof AgentConfig>(key: K, value: AgentConfig[K]) => {
    const updated = { ...localConfig, [key]: value };
    setLocalConfig(updated);
    onConfigChange?.(updated);
  };

  const updateParameter = (paramId: string, value: string | number | boolean) => {
    const updatedParams = localConfig.parameters?.map((p) =>
      p.id === paramId ? { ...p, value } : p
    );
    updateConfig('parameters', updatedParams);
  };

  const renderParameter = (param: AgentParameter) => {
    switch (param.type) {
      case 'text':
        return (
          <input
            type="text"
            value={param.value as string}
            onChange={(e) => updateParameter(param.id, e.target.value)}
            className="w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm"
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={param.value as number}
            min={param.min}
            max={param.max}
            step={param.step}
            onChange={(e) => updateParameter(param.id, parseFloat(e.target.value))}
            className="w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm"
          />
        );
      case 'select':
        return (
          <select
            value={param.value as string}
            onChange={(e) => updateParameter(param.id, e.target.value)}
            className="w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm"
          >
            {param.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case 'slider':
        return (
          <div className="flex items-center gap-3">
            <input
              type="range"
              value={param.value as number}
              min={param.min || 0}
              max={param.max || 100}
              step={param.step || 1}
              onChange={(e) => updateParameter(param.id, parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="w-12 text-right text-sm text-[var(--semantic-color-foreground-muted)]">
              {param.value}
            </span>
          </div>
        );
      case 'toggle':
        return (
          <button
            onClick={() => updateParameter(param.id, !param.value)}
            className={cn(
              'relative h-6 w-11 rounded-full transition-colors',
              param.value ? 'bg-[var(--semantic-color-primary-default)]' : 'bg-[var(--semantic-color-muted-default)]'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                param.value ? 'left-[22px]' : 'left-0.5'
              )}
            />
          </button>
        );
      case 'textarea':
        return (
          <textarea
            value={param.value as string}
            onChange={(e) => updateParameter(param.id, e.target.value)}
            rows={3}
            className="w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm resize-none"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('rounded-lg border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-card-default)]', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--semantic-color-border-default)] p-4">
        <div className="flex items-center gap-3">
          {localConfig.icon && <div className="text-[var(--semantic-color-primary-default)]">{localConfig.icon}</div>}
          <div>
            <h3 className="font-semibold text-[var(--semantic-color-foreground-default)]">{localConfig.name}</h3>
            {localConfig.description && (
              <p className="text-sm text-[var(--semantic-color-foreground-muted)]">{localConfig.description}</p>
            )}
          </div>
        </div>
        <div className={cn(
          'rounded-full px-2 py-1 text-xs font-medium',
          localConfig.isActive
            ? 'bg-[var(--semantic-color-success-default)]/20 text-[var(--semantic-color-success-default)]'
            : 'bg-[var(--semantic-color-muted-default)] text-[var(--semantic-color-foreground-muted)]'
        )}>
          {localConfig.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>

      {/* Core Settings */}
      <div className="space-y-4 p-4">
        {/* Model Selection */}
        <div>
          <label htmlFor="agent-model" className="mb-1.5 block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
            Model
          </label>
          <select
            id="agent-model"
            value={localConfig.model || ''}
            onChange={(e) => updateConfig('model', e.target.value)}
            className="w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm"
          >
            {availableModels.map((model) => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>

        {/* Temperature */}
        <div>
          <label htmlFor="agent-temperature" className="mb-1.5 block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
            Temperature: {localConfig.temperature?.toFixed(1) || '0.7'}
          </label>
          <input
            id="agent-temperature"
            type="range"
            value={localConfig.temperature || 0.7}
            min={0}
            max={2}
            step={0.1}
            onChange={(e) => updateConfig('temperature', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[var(--semantic-color-foreground-muted)]">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div>
          <label htmlFor="agent-max-tokens" className="mb-1.5 block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
            Max Tokens
          </label>
          <input
            id="agent-max-tokens"
            type="number"
            value={localConfig.maxTokens || 2048}
            min={1}
            max={128000}
            onChange={(e) => updateConfig('maxTokens', parseInt(e.target.value))}
            className="w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm"
          />
        </div>

        {/* System Prompt */}
        <div>
          <label htmlFor="agent-system-prompt" className="mb-1.5 block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
            System Prompt
          </label>
          <textarea
            id="agent-system-prompt"
            value={localConfig.systemPrompt || ''}
            onChange={(e) => updateConfig('systemPrompt', e.target.value)}
            rows={4}
            className="w-full rounded-md border border-[var(--semantic-color-border-default)] bg-[var(--semantic-color-background-default)] px-3 py-2 text-sm resize-none"
            placeholder="Define the agent's behavior and role..."
          />
        </div>

        {/* Capabilities */}
        {localConfig.capabilities && localConfig.capabilities.length > 0 && (
          <div>
            <span className="mb-1.5 block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
              Capabilities
            </span>
            <div className="flex flex-wrap gap-1">
              {localConfig.capabilities.map((cap) => (
                <span key={cap} className="rounded-full bg-[var(--semantic-color-accent-default)] px-2 py-0.5 text-xs text-[var(--semantic-color-accent-foreground)]">
                  {cap}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Advanced Settings */}
      {showAdvanced && localConfig.parameters && localConfig.parameters.length > 0 && (
        <div className="border-t border-[var(--semantic-color-border-default)]">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex w-full items-center justify-between p-4 text-sm font-medium text-[var(--semantic-color-foreground-default)] hover:bg-[var(--semantic-color-background-subtle)]"
          >
            Advanced Settings
            <svg className={cn('h-4 w-4 transition-transform', isAdvancedOpen && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isAdvancedOpen && (
            <div className="space-y-4 px-4 pb-4">
              {localConfig.parameters.map((param) => (
                <div key={param.id}>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--semantic-color-foreground-default)]">
                    {param.name}
                    {param.required && <span className="text-[var(--semantic-color-destructive-default)]"> *</span>}
                  </label>
                  {param.description && (
                    <p className="mb-1.5 text-xs text-[var(--semantic-color-foreground-muted)]">{param.description}</p>
                  )}
                  {renderParameter(param)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-[var(--semantic-color-border-default)] p-4">
        <div className="flex gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="rounded-md border border-[var(--semantic-color-border-default)] px-3 py-1.5 text-sm text-[var(--semantic-color-foreground-default)] hover:bg-[var(--semantic-color-background-subtle)]"
            >
              Reset
            </button>
          )}
          {onTest && (
            <button
              onClick={onTest}
              className="rounded-md border border-[var(--semantic-color-primary-default)] px-3 py-1.5 text-sm text-[var(--semantic-color-primary-default)] hover:bg-[var(--semantic-color-primary-default)]/10"
            >
              Test
            </button>
          )}
        </div>
        {onSave && (
          <button
            onClick={() => onSave(localConfig)}
            className="rounded-md bg-[var(--semantic-color-primary-default)] px-4 py-1.5 text-sm font-medium text-[var(--semantic-color-primary-foreground)] hover:bg-[var(--semantic-color-primary-hover)]"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export { AgentConfigPanel };
