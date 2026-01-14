/**
 * Design System Themes
 *
 * Industry-specific color palettes with psychology-based color selection.
 *
 * @example
 * ```tsx
 * import { ThemeProvider, useTheme, themePresets } from '@/lib/themes';
 *
 * // Wrap your app
 * <ThemeProvider defaultTheme="finance">
 *   <App />
 * </ThemeProvider>
 *
 * // Use in components
 * const { theme, setTheme, toggleColorMode } = useTheme();
 * ```
 */

// Theme presets and types
export {
  defaultTheme,
  financeTheme,
  floristTheme,
  getThemePreset,
  getThemePresetIds,
  healthcareTheme,
  restaurantTheme,
  salonTheme,
  themePresets,
  type ThemeColors,
  type ThemePreset,
  type ThemePresetId,
} from './presets';

// Theme provider and hooks
export {
  ThemeProvider,
  useTheme,
  useThemePreset,
  type ColorMode,
} from './ThemeProvider';

// CSS generator utilities
export {
  applyThemeToElement,
  generateAllThemesCSS,
  generateThemeCSS,
  removeThemeFromElement,
} from './generator';

// Color utilities for theme manipulation
export {
  type OklchColor,
  parseOklch,
  toOklchString,
  adjustLightness,
  adjustChroma,
  rotateHue,
  getComplementary,
  getAnalogous,
  getTriadic,
  getSplitComplementary,
  generateColorScale,
  generateNeutralScale,
  getContrastRatio,
  meetsContrastAA,
  getAccessibleForeground,
  blendColors,
  desaturate,
  saturate,
  lighten,
  darken,
} from './colorUtils';

// Theme generator from base color
export {
  type ThemeGeneratorOptions,
  generateTheme,
  generateThemeFromHex,
  generateThemeVariables,
  quickPresets,
} from './themeGenerator';
