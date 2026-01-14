/**
 * Theme CSS Generator
 *
 * Generates CSS custom properties from theme presets.
 * Can be used at build time or runtime for dynamic theming.
 */

import type { ThemeColors, ThemePreset } from './presets';

/**
 * Generate CSS variable declarations from theme colors
 */
function generateColorVariables(
  colors: ThemeColors,
  prefix = '--semantic-color'
): string {
  const lines: string[] = [];

  // Primary colors
  lines.push(`${prefix}-primary-default: ${colors.primary.default};`);
  lines.push(`${prefix}-primary-hover: ${colors.primary.hover};`);
  lines.push(`${prefix}-primary-active: ${colors.primary.active};`);
  lines.push(`${prefix}-primary-foreground: ${colors.primary.foreground};`);

  // Secondary colors
  lines.push(`${prefix}-secondary-default: ${colors.secondary.default};`);
  lines.push(`${prefix}-secondary-hover: ${colors.secondary.hover};`);
  lines.push(`${prefix}-secondary-active: ${colors.secondary.active};`);
  lines.push(`${prefix}-secondary-foreground: ${colors.secondary.foreground};`);

  // Accent colors
  lines.push(`${prefix}-accent-default: ${colors.accent.default};`);
  lines.push(`${prefix}-accent-hover: ${colors.accent.hover};`);
  lines.push(`${prefix}-accent-foreground: ${colors.accent.foreground};`);

  // Background colors
  lines.push(`${prefix}-background-default: ${colors.background.default};`);
  lines.push(`${prefix}-background-subtle: ${colors.background.subtle};`);
  lines.push(`${prefix}-background-muted: ${colors.background.muted};`);

  // Foreground colors
  lines.push(`${prefix}-foreground-default: ${colors.foreground.default};`);
  lines.push(`${prefix}-foreground-muted: ${colors.foreground.muted};`);
  lines.push(`${prefix}-foreground-subtle: ${colors.foreground.subtle};`);

  // Border colors
  lines.push(`${prefix}-border-default: ${colors.border.default};`);
  lines.push(`${prefix}-border-strong: ${colors.border.strong};`);
  lines.push(`${prefix}-border-muted: ${colors.border.muted};`);

  // Additional semantic mappings for compatibility
  lines.push(`${prefix}-card-default: ${colors.background.default};`);
  lines.push(`${prefix}-card-foreground: ${colors.foreground.default};`);
  lines.push(`${prefix}-popover-default: ${colors.background.default};`);
  lines.push(`${prefix}-popover-foreground: ${colors.foreground.default};`);
  lines.push(`${prefix}-muted-default: ${colors.background.muted};`);
  lines.push(`${prefix}-muted-foreground: ${colors.foreground.muted};`);
  lines.push(`${prefix}-input-default: ${colors.border.default};`);
  lines.push(`${prefix}-input-focus: ${colors.primary.default};`);
  lines.push(`${prefix}-ring-default: ${colors.primary.default};`);

  return lines.map((line) => `    ${line}`).join('\n');
}

/**
 * Generate complete CSS for a theme preset
 */
export function generateThemeCSS(theme: ThemePreset): string {
  const lightVars = generateColorVariables(theme.light);
  const darkVars = generateColorVariables(theme.dark);

  return `/* Theme: ${theme.name} - ${theme.description} */
/* Industry: ${theme.industry} */
/* Psychology: ${theme.psychology.overall} */

.theme-${theme.id} {
${lightVars}
}

.theme-${theme.id}.dark,
.theme-${theme.id} .dark {
${darkVars}
}
`;
}

/**
 * Generate CSS for all theme presets
 */
export function generateAllThemesCSS(
  themes: Record<string, ThemePreset>
): string {
  const header = `/**
 * Design System Theme Presets
 * Auto-generated CSS custom properties for industry-specific themes
 *
 * Usage:
 *   Add theme class to root element: <html class="theme-finance">
 *   For dark mode: <html class="theme-finance dark">
 *
 * Available themes:
${Object.values(themes)
  .map((t) => ` *   - ${t.id}: ${t.name} (${t.industry})`)
  .join('\n')}
 */

`;

  const themesCSS = Object.values(themes)
    .map(generateThemeCSS)
    .join('\n');

  return header + themesCSS;
}

/**
 * Apply theme colors as CSS custom properties to an element
 * Useful for runtime theme switching
 */
export function applyThemeToElement(
  element: HTMLElement,
  colors: ThemeColors
): void {
  const setVar = (name: string, value: string) => {
    element.style.setProperty(`--semantic-color-${name}`, value);
  };

  // Primary
  setVar('primary-default', colors.primary.default);
  setVar('primary-hover', colors.primary.hover);
  setVar('primary-active', colors.primary.active);
  setVar('primary-foreground', colors.primary.foreground);

  // Secondary
  setVar('secondary-default', colors.secondary.default);
  setVar('secondary-hover', colors.secondary.hover);
  setVar('secondary-active', colors.secondary.active);
  setVar('secondary-foreground', colors.secondary.foreground);

  // Accent
  setVar('accent-default', colors.accent.default);
  setVar('accent-hover', colors.accent.hover);
  setVar('accent-foreground', colors.accent.foreground);

  // Background
  setVar('background-default', colors.background.default);
  setVar('background-subtle', colors.background.subtle);
  setVar('background-muted', colors.background.muted);

  // Foreground
  setVar('foreground-default', colors.foreground.default);
  setVar('foreground-muted', colors.foreground.muted);
  setVar('foreground-subtle', colors.foreground.subtle);

  // Border
  setVar('border-default', colors.border.default);
  setVar('border-strong', colors.border.strong);
  setVar('border-muted', colors.border.muted);

  // Compatibility mappings
  setVar('card-default', colors.background.default);
  setVar('card-foreground', colors.foreground.default);
  setVar('popover-default', colors.background.default);
  setVar('popover-foreground', colors.foreground.default);
  setVar('muted-default', colors.background.muted);
  setVar('muted-foreground', colors.foreground.muted);
  setVar('input-default', colors.border.default);
  setVar('input-focus', colors.primary.default);
  setVar('ring-default', colors.primary.default);
}

/**
 * Remove theme custom properties from an element
 */
export function removeThemeFromElement(element: HTMLElement): void {
  const properties = [
    'primary-default',
    'primary-hover',
    'primary-active',
    'primary-foreground',
    'secondary-default',
    'secondary-hover',
    'secondary-active',
    'secondary-foreground',
    'accent-default',
    'accent-hover',
    'accent-foreground',
    'background-default',
    'background-subtle',
    'background-muted',
    'foreground-default',
    'foreground-muted',
    'foreground-subtle',
    'border-default',
    'border-strong',
    'border-muted',
    'card-default',
    'card-foreground',
    'popover-default',
    'popover-foreground',
    'muted-default',
    'muted-foreground',
    'input-default',
    'input-focus',
    'ring-default',
  ];

  properties.forEach((prop) => {
    element.style.removeProperty(`--semantic-color-${prop}`);
  });
}
