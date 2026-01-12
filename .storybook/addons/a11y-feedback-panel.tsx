/**
 * Enhanced Accessibility Feedback Panel
 *
 * Extends the default a11y addon with:
 * - Detailed fix suggestions
 * - Code examples
 * - Links to documentation
 * - Auto-fix capabilities (when available)
 */

import React, { useState, useEffect } from 'react';
import { useChannel, useStorybookState } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import { EVENTS } from '@storybook/addon-a11y';

// Fix suggestions database (simplified version for Storybook)
const FIX_DATABASE: Record<string, FixInfo> = {
  'color-contrast': {
    title: 'Contraste de Color Insuficiente',
    description: 'El texto no tiene suficiente contraste con el fondo para cumplir WCAG AA.',
    suggestions: [
      {
        title: 'Oscurecer el texto',
        code: `// Cambiar de slate-400 a slate-500 en light mode
// Cambiar de slate-500 a slate-400 en dark mode
className="text-slate-500 dark:text-slate-400"`,
      },
      {
        title: 'Reemplazar gradientes con colores sólidos',
        code: `// Antes (no calculable)
bg-gradient-to-br from-blue-500 to-violet-600

// Después (calculable)
bg-violet-600`,
      },
    ],
    docsUrl: '/docs/accessibility/color-contrast',
  },
  region: {
    title: 'Contenido Fuera de Landmarks',
    description: 'Todo el contenido debe estar dentro de elementos landmark como <main>, <nav>, etc.',
    suggestions: [
      {
        title: 'Envolver en elemento semántico',
        code: `// Antes
<div className="container">{content}</div>

// Después
<main className="container" role="main" aria-label="Contenido principal">
  {content}
</main>`,
      },
    ],
    docsUrl: '/docs/accessibility/landmarks',
  },
  'scrollable-region-focusable': {
    title: 'Región Scrollable No Accesible',
    description: 'Las regiones con scroll deben ser accesibles por teclado.',
    suggestions: [
      {
        title: 'Agregar tabIndex y roles ARIA',
        code: `<div
  className="overflow-y-auto max-h-[500px]"
  tabIndex={0}
  role="log"
  aria-label="Contenido scrollable"
>
  {content}
</div>`,
      },
    ],
    docsUrl: '/docs/accessibility/keyboard-navigation',
  },
  'button-name': {
    title: 'Botón Sin Nombre Accesible',
    description: 'Los botones deben tener un nombre accesible para lectores de pantalla.',
    suggestions: [
      {
        title: 'Agregar aria-label',
        code: `<button aria-label="Cerrar diálogo">
  <XIcon aria-hidden="true" />
</button>`,
      },
    ],
    docsUrl: '/docs/accessibility/button-names',
  },
};

interface FixInfo {
  title: string;
  description: string;
  suggestions: { title: string; code: string }[];
  docsUrl: string;
}

interface Violation {
  id: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  help: string;
  helpUrl: string;
  nodes: {
    html: string;
    target: string[];
    failureSummary?: string;
  }[];
}

const ImpactBadge: React.FC<{ impact: string }> = ({ impact }) => {
  const colors: Record<string, string> = {
    critical: 'bg-red-100 text-red-800 border-red-200',
    serious: 'bg-orange-100 text-orange-800 border-orange-200',
    moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    minor: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const icons: Record<string, string> = {
    critical: '🚫',
    serious: '⚠️',
    moderate: '📋',
    minor: '💡',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded border ${colors[impact] || colors.minor}`}
    >
      {icons[impact]} {impact.toUpperCase()}
    </span>
  );
};

const FixSuggestion: React.FC<{ fix: FixInfo }> = ({ fix }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-3 border border-green-200 rounded-lg bg-green-50 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-green-100 transition-colors"
      >
        <span className="font-medium text-green-800 flex items-center gap-2">
          💡 Cómo Corregir
        </span>
        <span className="text-green-600">{expanded ? '▼' : '▶'}</span>
      </button>

      {expanded && (
        <div className="p-3 pt-0 space-y-3">
          <p className="text-sm text-green-700">{fix.description}</p>

          {fix.suggestions.map((suggestion, i) => (
            <div key={i} className="bg-white rounded border border-green-200 p-3">
              <h5 className="font-medium text-sm text-green-800 mb-2">{suggestion.title}</h5>
              <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded overflow-x-auto">
                {suggestion.code}
              </pre>
            </div>
          ))}

          <a
            href={fix.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            📚 Ver documentación completa
          </a>
        </div>
      )}
    </div>
  );
};

const ViolationCard: React.FC<{ violation: Violation }> = ({ violation }) => {
  const [expanded, setExpanded] = useState(true);
  const fix = FIX_DATABASE[violation.id];

  return (
    <div className="border rounded-lg mb-4 overflow-hidden shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <ImpactBadge impact={violation.impact} />
          <span className="font-medium text-gray-900">{violation.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{violation.nodes.length} elemento(s)</span>
          <span className="text-gray-400">{expanded ? '▼' : '▶'}</span>
        </div>
      </button>

      {expanded && (
        <div className="p-4 pt-0 bg-gray-50">
          <p className="text-sm text-gray-600 mb-3">{violation.help}</p>

          {/* Affected elements */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Elementos afectados:</h4>
            {violation.nodes.slice(0, 3).map((node, i) => (
              <div key={i} className="bg-white rounded border p-2">
                <code className="text-xs text-gray-700 block overflow-x-auto whitespace-pre">
                  {node.html.length > 150 ? node.html.substring(0, 150) + '...' : node.html}
                </code>
                <p className="text-xs text-gray-500 mt-1">
                  Selector: <code>{node.target.join(' > ')}</code>
                </p>
              </div>
            ))}
            {violation.nodes.length > 3 && (
              <p className="text-xs text-gray-500">
                ...y {violation.nodes.length - 3} más
              </p>
            )}
          </div>

          {/* Fix suggestion */}
          {fix && <FixSuggestion fix={fix} />}

          {/* Help URL */}
          <a
            href={violation.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-3"
          >
            🔗 Más información en Deque
          </a>
        </div>
      )}
    </div>
  );
};

const A11yFeedbackPanel: React.FC<{ active: boolean }> = ({ active }) => {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [passes, setPasses] = useState<number>(0);
  const [status, setStatus] = useState<'running' | 'done' | 'error'>('running');

  useChannel({
    [EVENTS.RESULT]: (results: { violations: Violation[]; passes: unknown[] }) => {
      setViolations(results.violations || []);
      setPasses(results.passes?.length || 0);
      setStatus('done');
    },
    [EVENTS.ERROR]: () => {
      setStatus('error');
    },
    [EVENTS.RUNNING]: () => {
      setStatus('running');
    },
  });

  if (!active) return null;

  const criticalCount = violations.filter((v) => v.impact === 'critical').length;
  const seriousCount = violations.filter((v) => v.impact === 'serious').length;
  const wouldBlock = criticalCount > 0 || seriousCount > 0;

  return (
    <AddonPanel active={active}>
      <div className="p-4 h-full overflow-auto" style={{ fontFamily: 'system-ui, sans-serif' }}>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            🔍 Validación de Accesibilidad
          </h2>

          {status === 'running' && (
            <div className="flex items-center gap-2 text-blue-600">
              <span className="animate-spin">⏳</span>
              Analizando...
            </div>
          )}

          {status === 'done' && (
            <div
              className={`p-3 rounded-lg ${
                wouldBlock
                  ? 'bg-red-50 border border-red-200'
                  : violations.length > 0
                  ? 'bg-yellow-50 border border-yellow-200'
                  : 'bg-green-50 border border-green-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-semibold ${
                    wouldBlock
                      ? 'text-red-800'
                      : violations.length > 0
                      ? 'text-yellow-800'
                      : 'text-green-800'
                  }`}
                >
                  {wouldBlock
                    ? '❌ SUBMIT BLOQUEADO'
                    : violations.length > 0
                    ? '⚠️ Warnings Encontrados'
                    : '✅ Sin Errores de Accesibilidad'}
                </span>
                <span className="text-sm text-gray-600">
                  {violations.length} errores | {passes} pasaron
                </span>
              </div>

              {wouldBlock && (
                <p className="text-sm text-red-600 mt-2">
                  Corrige los errores críticos/serios antes de enviar al sistema.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        {status === 'done' && violations.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="text-center p-2 bg-red-50 rounded border border-red-200">
              <div className="text-xl font-bold text-red-600">{criticalCount}</div>
              <div className="text-xs text-red-800">Críticos</div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded border border-orange-200">
              <div className="text-xl font-bold text-orange-600">{seriousCount}</div>
              <div className="text-xs text-orange-800">Serios</div>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded border border-yellow-200">
              <div className="text-xl font-bold text-yellow-600">
                {violations.filter((v) => v.impact === 'moderate').length}
              </div>
              <div className="text-xs text-yellow-800">Moderados</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded border border-gray-200">
              <div className="text-xl font-bold text-gray-600">
                {violations.filter((v) => v.impact === 'minor').length}
              </div>
              <div className="text-xs text-gray-800">Menores</div>
            </div>
          </div>
        )}

        {/* Violations */}
        {status === 'done' && violations.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Errores Encontrados:</h3>
            {violations
              .sort((a, b) => {
                const order = ['critical', 'serious', 'moderate', 'minor'];
                return order.indexOf(a.impact) - order.indexOf(b.impact);
              })
              .map((violation, i) => (
                <ViolationCard key={i} violation={violation} />
              ))}
          </div>
        )}

        {/* Empty state */}
        {status === 'done' && violations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              ¡Excelente! Tu componente es accesible
            </h3>
            <p className="text-sm text-gray-600">
              Cumple con los estándares WCAG 2.1 AA y está listo para ser enviado.
            </p>
          </div>
        )}
      </div>
    </AddonPanel>
  );
};

export default A11yFeedbackPanel;
