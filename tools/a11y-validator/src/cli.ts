#!/usr/bin/env node
/**
 * Accessibility Validator CLI
 *
 * Usage:
 *   a11y-validate <file-or-pattern> [options]
 *
 * Examples:
 *   a11y-validate src/components/Button/Button.tsx
 *   a11y-validate "src/**\/*.stories.tsx"
 *   a11y-validate --format json > report.json
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, basename, dirname } from 'path';
import { glob } from 'glob';
import { validateHTML } from './validator.js';
import { format } from './reporter.js';
import type { ValidationResult, ValidatorConfig } from './types.js';

interface CLIOptions {
  files: string[];
  format: 'console' | 'json' | 'html';
  output?: string;
  minSeverity: 'critical' | 'serious' | 'moderate' | 'minor';
  failOnWarnings: boolean;
  help: boolean;
  version: boolean;
}

const VERSION = '1.0.0';

const HELP_TEXT = `
${'\x1b[1m'}🔍 Design System Accessibility Validator${'\x1b[0m'}

${'\x1b[33m'}USO:${'\x1b[0m'}
  a11y-validate <archivo-o-patrón> [opciones]

${'\x1b[33m'}EJEMPLOS:${'\x1b[0m'}
  a11y-validate src/components/Button/Button.tsx
  a11y-validate "src/**/*.stories.tsx"
  a11y-validate --format json --output report.json
  a11y-validate --min-severity serious

${'\x1b[33m'}OPCIONES:${'\x1b[0m'}
  -f, --format <tipo>       Formato de salida: console, json, html (default: console)
  -o, --output <archivo>    Guardar reporte en archivo
  -s, --min-severity <n>    Severidad mínima: critical, serious, moderate, minor
  -w, --fail-on-warnings    Fallar también con warnings (no solo errores)
  -h, --help                Mostrar esta ayuda
  -v, --version             Mostrar versión

${'\x1b[33m'}CÓDIGOS DE SALIDA:${'\x1b[0m'}
  0   Todos los archivos pasan la validación
  1   Errores críticos o serios encontrados (BLOCKED)
  2   Solo warnings encontrados (si --fail-on-warnings)

${'\x1b[33m'}INTEGRACIÓN CON GIT:${'\x1b[0m'}
  Agregar a .husky/pre-commit:
    npx a11y-validate "src/**/*.tsx" --min-severity serious

${'\x1b[33m'}MÁS INFO:${'\x1b[0m'}
  Documentación: /docs/accessibility
  Reglas: /docs/accessibility/rules
`;

function parseArgs(args: string[]): CLIOptions {
  const options: CLIOptions = {
    files: [],
    format: 'console',
    minSeverity: 'minor',
    failOnWarnings: false,
    help: false,
    version: false,
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    switch (arg) {
      case '-h':
      case '--help':
        options.help = true;
        break;
      case '-v':
      case '--version':
        options.version = true;
        break;
      case '-f':
      case '--format':
        options.format = args[++i] as 'console' | 'json' | 'html';
        break;
      case '-o':
      case '--output':
        options.output = args[++i];
        break;
      case '-s':
      case '--min-severity':
        options.minSeverity = args[++i] as CLIOptions['minSeverity'];
        break;
      case '-w':
      case '--fail-on-warnings':
        options.failOnWarnings = true;
        break;
      default:
        if (!arg.startsWith('-')) {
          options.files.push(arg);
        }
    }
    i++;
  }

  return options;
}

/**
 * Extract HTML from story file for testing
 * This is a simplified version - in production, we'd render the components
 */
function extractHTMLFromStory(filePath: string): string | null {
  // For now, we'll read the storybook-static output
  // In a full implementation, this would render the component
  const staticPath = filePath
    .replace('src/stories/', 'storybook-static/')
    .replace('.stories.tsx', '.html');

  if (existsSync(staticPath)) {
    return readFileSync(staticPath, 'utf-8');
  }

  return null;
}

/**
 * Mock HTML for testing (remove in production)
 */
function getMockHTML(componentName: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><title>${componentName}</title></head>
<body>
  <div class="container">
    <span class="text-slate-500" style="color: #64748b; background-color: #0f172a;">
      Texto con bajo contraste
    </span>
  </div>
</body>
</html>
`;
}

async function validateFile(filePath: string, config: ValidatorConfig): Promise<ValidationResult> {
  const componentName = basename(filePath, '.tsx').replace('.stories', '');
  const fullPath = resolve(process.cwd(), filePath);

  // Try to get rendered HTML
  let html = extractHTMLFromStory(fullPath);

  // For demonstration, use mock HTML if no static output
  if (!html) {
    console.warn(`⚠️  No se encontró HTML renderizado para ${filePath}`);
    console.warn(`   Ejecuta 'npm run build-storybook' primero para validación completa.`);
    html = getMockHTML(componentName);
  }

  return validateHTML(html, componentName, filePath, config);
}

async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.help) {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  if (options.version) {
    console.log(`v${VERSION}`);
    process.exit(0);
  }

  if (options.files.length === 0) {
    console.error('❌ Error: No se especificaron archivos para validar.');
    console.error('   Usa --help para ver las opciones.');
    process.exit(1);
  }

  // Expand glob patterns
  const allFiles: string[] = [];
  for (const pattern of options.files) {
    const matches = await glob(pattern, { cwd: process.cwd() });
    allFiles.push(...matches);
  }

  if (allFiles.length === 0) {
    console.error('❌ Error: No se encontraron archivos que coincidan con el patrón.');
    process.exit(1);
  }

  console.log(`\n🔍 Validando ${allFiles.length} archivo(s)...\n`);

  const config: ValidatorConfig = {
    minSeverity: options.minSeverity,
    includeFixes: true,
    format: options.format,
    failOnWarnings: options.failOnWarnings,
  };

  const results: ValidationResult[] = [];
  let hasBlockers = false;
  let hasWarnings = false;

  for (const file of allFiles) {
    try {
      const result = await validateFile(file, config);
      results.push(result);

      if (result.status === 'BLOCKED') {
        hasBlockers = true;
      } else if (result.status === 'WARNING') {
        hasWarnings = true;
      }

      // Print individual result for console format
      if (options.format === 'console') {
        console.log(format(result, 'console'));
      }
    } catch (error) {
      console.error(`❌ Error validando ${file}:`, error);
    }
  }

  // Output combined results for json/html
  if (options.format !== 'console') {
    const combinedOutput =
      options.format === 'json'
        ? JSON.stringify(results, null, 2)
        : results.map((r) => format(r, 'html')).join('\n');

    if (options.output) {
      writeFileSync(options.output, combinedOutput);
      console.log(`📄 Reporte guardado en: ${options.output}`);
    } else {
      console.log(combinedOutput);
    }
  }

  // Summary
  const totalErrors = results.reduce((sum, r) => sum + r.summary.total, 0);
  const passedCount = results.filter((r) => r.status === 'PASSED').length;

  console.log('\n' + '═'.repeat(65));
  console.log(`  RESUMEN FINAL: ${passedCount}/${results.length} archivos pasaron`);
  console.log(`  Total de errores: ${totalErrors}`);
  console.log('═'.repeat(65) + '\n');

  // Exit code
  if (hasBlockers) {
    console.log('❌ SUBMIT BLOQUEADO - Corrige los errores críticos/serios antes de continuar.\n');
    process.exit(1);
  }

  if (hasWarnings && options.failOnWarnings) {
    console.log('⚠️  Warnings encontrados (--fail-on-warnings activo).\n');
    process.exit(2);
  }

  console.log('✅ Validación completada.\n');
  process.exit(0);
}

main().catch((error) => {
  console.error('Error fatal:', error);
  process.exit(1);
});
