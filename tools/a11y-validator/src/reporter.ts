/**
 * Accessibility Validation Reporter
 *
 * Formats validation results in various formats
 * with clear, actionable feedback.
 */

import type { ValidationResult, A11yError, Severity } from './types.js';

const SEVERITY_COLORS = {
  critical: '\x1b[31m', // Red
  serious: '\x1b[33m', // Yellow
  moderate: '\x1b[36m', // Cyan
  minor: '\x1b[90m', // Gray
};

const SEVERITY_ICONS = {
  critical: '🚫',
  serious: '⚠️',
  moderate: '📋',
  minor: '💡',
};

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

/**
 * Format result as console output with colors
 */
export function formatConsole(result: ValidationResult): string {
  const lines: string[] = [];

  // Header
  lines.push('');
  lines.push(`${BOLD}═══════════════════════════════════════════════════════════════${RESET}`);
  lines.push(`${BOLD}  VALIDACIÓN DE ACCESIBILIDAD - ${result.component}${RESET}`);
  lines.push(`${BOLD}═══════════════════════════════════════════════════════════════${RESET}`);
  lines.push('');

  // Status
  const statusColor = result.status === 'PASSED' ? '\x1b[32m' : result.status === 'BLOCKED' ? '\x1b[31m' : '\x1b[33m';
  const statusIcon = result.status === 'PASSED' ? '✅' : result.status === 'BLOCKED' ? '❌' : '⚠️';
  lines.push(`  Estado: ${statusColor}${statusIcon} ${result.status}${RESET}`);
  lines.push(`  Archivo: ${DIM}${result.file}${RESET}`);
  lines.push(`  Tiempo: ${DIM}${result.duration}ms${RESET}`);
  lines.push('');

  if (result.errors.length === 0) {
    lines.push(`  ${'\x1b[32m'}¡Sin errores de accesibilidad! Tu componente cumple WCAG 2.1 AA.${RESET}`);
    lines.push('');
    return lines.join('\n');
  }

  // Summary
  lines.push(`${BOLD}  RESUMEN${RESET}`);
  lines.push(`  ────────────────────────────────────────────────────────────`);
  lines.push(`  Total de errores: ${BOLD}${result.summary.total}${RESET}`);
  lines.push('');

  if (result.summary.bySeverity.critical > 0) {
    lines.push(`    ${SEVERITY_ICONS.critical} Críticos:  ${SEVERITY_COLORS.critical}${result.summary.bySeverity.critical}${RESET}`);
  }
  if (result.summary.bySeverity.serious > 0) {
    lines.push(`    ${SEVERITY_ICONS.serious} Serios:    ${SEVERITY_COLORS.serious}${result.summary.bySeverity.serious}${RESET}`);
  }
  if (result.summary.bySeverity.moderate > 0) {
    lines.push(`    ${SEVERITY_ICONS.moderate} Moderados: ${SEVERITY_COLORS.moderate}${result.summary.bySeverity.moderate}${RESET}`);
  }
  if (result.summary.bySeverity.minor > 0) {
    lines.push(`    ${SEVERITY_ICONS.minor} Menores:   ${SEVERITY_COLORS.minor}${result.summary.bySeverity.minor}${RESET}`);
  }

  if (result.summary.autoFixable > 0) {
    lines.push('');
    lines.push(`  🔧 Auto-corregibles: ${result.summary.autoFixable}`);
  }

  lines.push('');
  lines.push(`${BOLD}  ERRORES DETALLADOS${RESET}`);
  lines.push(`  ────────────────────────────────────────────────────────────`);

  // Group errors by category
  const byCategory = new Map<string, A11yError[]>();
  for (const error of result.errors) {
    const category = error.category;
    if (!byCategory.has(category)) {
      byCategory.set(category, []);
    }
    byCategory.get(category)!.push(error);
  }

  for (const [category, errors] of byCategory) {
    lines.push('');
    lines.push(`  ${BOLD}📁 ${category.toUpperCase()}${RESET} (${errors.length})`);

    for (const error of errors) {
      lines.push('');
      lines.push(`    ${SEVERITY_COLORS[error.severity]}${SEVERITY_ICONS[error.severity]} [${error.severity.toUpperCase()}] ${error.rule}${RESET}`);
      lines.push(`    ${error.message}`);
      lines.push('');
      lines.push(`    ${DIM}Elemento:${RESET}`);
      lines.push(`    ${DIM}${truncate(error.element, 100)}${RESET}`);
      lines.push('');
      lines.push(`    ${DIM}Selector:${RESET} ${error.selector}`);

      // Show context (e.g., color info)
      if (error.context) {
        lines.push('');
        lines.push(`    ${DIM}Contexto:${RESET}`);
        if (error.context.foreground) {
          lines.push(`      Texto: ${error.context.foreground}`);
        }
        if (error.context.background) {
          lines.push(`      Fondo: ${error.context.background}`);
        }
        if (error.context.ratio) {
          lines.push(`      Ratio actual: ${error.context.ratio}`);
        }
        if (error.context.requiredRatio) {
          lines.push(`      Ratio requerido: ${error.context.requiredRatio}`);
        }
      }

      // Show fixes
      if (error.fixes.length > 0) {
        lines.push('');
        lines.push(`    ${'\x1b[32m'}💡 CÓMO CORREGIR:${RESET}`);
        for (const fix of error.fixes) {
          lines.push(`    ┌─────────────────────────────────────────────────────────`);
          lines.push(`    │ ${fix.description}`);
          if (fix.autoFixable) {
            lines.push(`    │ ${DIM}(auto-corregible)${RESET}`);
          }
          lines.push(`    │`);
          lines.push(`    │ ${DIM}Ejemplo:${RESET}`);
          for (const line of fix.example.split('\n')) {
            lines.push(`    │   ${line}`);
          }
          if (fix.docsUrl) {
            lines.push(`    │`);
            lines.push(`    │ ${DIM}Docs: ${fix.docsUrl}${RESET}`);
          }
          lines.push(`    └─────────────────────────────────────────────────────────`);
        }
      }

      // WCAG criteria
      if (error.wcagCriteria && error.wcagCriteria.length > 0) {
        lines.push('');
        lines.push(`    ${DIM}WCAG: ${error.wcagCriteria.join(', ')}${RESET}`);
      }

      if (error.helpUrl) {
        lines.push(`    ${DIM}Más info: ${error.helpUrl}${RESET}`);
      }
    }
  }

  lines.push('');
  lines.push(`${BOLD}═══════════════════════════════════════════════════════════════${RESET}`);

  if (result.status === 'BLOCKED') {
    lines.push('');
    lines.push(`  ${'\x1b[31m'}❌ SUBMIT BLOQUEADO${RESET}`);
    lines.push(`  ${DIM}Corrige los errores críticos/serios antes de enviar.${RESET}`);
  }

  lines.push('');

  return lines.join('\n');
}

/**
 * Format result as JSON
 */
export function formatJSON(result: ValidationResult): string {
  return JSON.stringify(result, null, 2);
}

/**
 * Format result as HTML report
 */
export function formatHTML(result: ValidationResult): string {
  const severityClass = (severity: Severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'serious':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'moderate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte de Accesibilidad - ${result.component}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen p-8">
  <div class="max-w-4xl mx-auto">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Reporte de Accesibilidad</h1>
      <p class="text-gray-600 mt-2">${result.component} - ${result.file}</p>
    </header>

    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <span class="text-lg font-semibold ${
            result.status === 'PASSED'
              ? 'text-green-600'
              : result.status === 'BLOCKED'
              ? 'text-red-600'
              : 'text-yellow-600'
          }">
            ${result.status === 'PASSED' ? '✅' : result.status === 'BLOCKED' ? '❌' : '⚠️'}
            ${result.status}
          </span>
        </div>
        <div class="text-sm text-gray-500">
          ${result.summary.total} errores encontrados
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4 mt-6">
        <div class="text-center p-3 bg-red-50 rounded-lg">
          <div class="text-2xl font-bold text-red-600">${result.summary.bySeverity.critical}</div>
          <div class="text-sm text-red-800">Críticos</div>
        </div>
        <div class="text-center p-3 bg-yellow-50 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">${result.summary.bySeverity.serious}</div>
          <div class="text-sm text-yellow-800">Serios</div>
        </div>
        <div class="text-center p-3 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">${result.summary.bySeverity.moderate}</div>
          <div class="text-sm text-blue-800">Moderados</div>
        </div>
        <div class="text-center p-3 bg-gray-50 rounded-lg">
          <div class="text-2xl font-bold text-gray-600">${result.summary.bySeverity.minor}</div>
          <div class="text-sm text-gray-800">Menores</div>
        </div>
      </div>
    </div>

    ${result.errors
      .map(
        (error) => `
    <div class="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 ${severityClass(error.severity)}">
      <div class="flex items-start justify-between">
        <div>
          <span class="inline-block px-2 py-1 text-xs font-semibold rounded ${severityClass(error.severity)}">
            ${error.severity.toUpperCase()}
          </span>
          <h3 class="text-lg font-semibold mt-2">${error.rule}</h3>
          <p class="text-gray-600 mt-1">${error.message}</p>
        </div>
      </div>

      <div class="mt-4 p-3 bg-gray-50 rounded font-mono text-sm overflow-x-auto">
        ${escapeHtml(error.element)}
      </div>

      ${
        error.fixes.length > 0
          ? `
      <div class="mt-4">
        <h4 class="font-semibold text-green-700">💡 Cómo corregir:</h4>
        ${error.fixes
          .map(
            (fix) => `
        <div class="mt-2 p-3 bg-green-50 rounded border border-green-200">
          <p class="font-medium">${fix.description}</p>
          <pre class="mt-2 p-2 bg-white rounded text-sm overflow-x-auto">${escapeHtml(fix.example)}</pre>
          ${fix.docsUrl ? `<a href="${fix.docsUrl}" class="text-blue-600 hover:underline text-sm">Ver documentación</a>` : ''}
        </div>
        `
          )
          .join('')}
      </div>
      `
          : ''
      }
    </div>
    `
      )
      .join('')}
  </div>
</body>
</html>`;
}

function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function format(
  result: ValidationResult,
  format: 'console' | 'json' | 'html' = 'console'
): string {
  switch (format) {
    case 'json':
      return formatJSON(result);
    case 'html':
      return formatHTML(result);
    default:
      return formatConsole(result);
  }
}
