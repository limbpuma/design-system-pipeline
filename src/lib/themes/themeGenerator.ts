/**
 * Theme Generator
 *
 * Generate complete theme palettes from a single base color.
 * Creates accessible color combinations with proper contrast ratios.
 */

import type { ThemeColors, ThemePreset } from './presets';
import {
  type OklchColor,
  generateNeutralScale,
  getAccessibleForeground,
  getComplementary,
  getSplitComplementary,
  parseOklch,
  rotateHue,
  toOklchString,
} from './colorUtils';

/**
 * Theme generation options
 */
export interface ThemeGeneratorOptions {
  /** Primary brand color (OKLCH string or hex) */
  primaryColor: string;
  /** Theme name */
  name: string;
  /** Theme description */
  description?: string;
  /** Industry/use case */
  industry?: string;
  /** Color harmony type */
  harmony?: 'complementary' | 'analogous' | 'triadic' | 'split-complementary';
  /** Override secondary color */
  secondaryColor?: string;
  /** Override accent color */
  accentColor?: string;
}

/**
 * Convert sRGB component to linear RGB
 * Formula: c <= 0.04045 ? c/12.92 : pow((c+0.055)/1.055, 2.4)
 */
function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Convert hex color to OKLCH using proper color science
 * Pipeline: HEX -> sRGB -> Linear RGB -> XYZ (D65) -> OKLab -> OKLCH
 */
function hexToOklch(hex: string): OklchColor {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse sRGB values (0-1 range)
  const sR = parseInt(cleanHex.slice(0, 2), 16) / 255;
  const sG = parseInt(cleanHex.slice(2, 4), 16) / 255;
  const sB = parseInt(cleanHex.slice(4, 6), 16) / 255;

  // Convert sRGB to linear RGB
  const linR = srgbToLinear(sR);
  const linG = srgbToLinear(sG);
  const linB = srgbToLinear(sB);

  // Linear RGB to XYZ (D65 illuminant)
  // Using sRGB to XYZ matrix
  const x = 0.4124564 * linR + 0.3575761 * linG + 0.1804375 * linB;
  const y = 0.2126729 * linR + 0.7151522 * linG + 0.0721750 * linB;
  const z = 0.0193339 * linR + 0.1191920 * linG + 0.9503041 * linB;

  // XYZ to OKLab using the M1 matrix (XYZ to LMS cone response)
  const l_ = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m_ = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s_ = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

  // Apply cube root (non-linear response)
  const l_cbrt = Math.cbrt(l_);
  const m_cbrt = Math.cbrt(m_);
  const s_cbrt = Math.cbrt(s_);

  // LMS to OKLab using the M2 matrix
  const L = 0.2104542553 * l_cbrt + 0.7936177850 * m_cbrt - 0.0040720468 * s_cbrt;
  const a = 1.9779984951 * l_cbrt - 2.4285922050 * m_cbrt + 0.4505937099 * s_cbrt;
  const b = 0.0259040371 * l_cbrt + 0.7827717662 * m_cbrt - 0.8086757660 * s_cbrt;

  // OKLab to OKLCH
  const C = Math.sqrt(a * a + b * b);
  let H = Math.atan2(b, a) * (180 / Math.PI);
  if (H < 0) H += 360;

  return {
    l: Math.max(0, Math.min(1, L)),
    c: Math.max(0, C),
    h: H % 360,
  };
}

/**
 * Parse any color format to OKLCH
 */
function parseColor(color: string): OklchColor {
  if (color.startsWith('oklch')) {
    return parseOklch(color);
  }
  if (color.startsWith('#') || /^[0-9a-f]{6}$/i.test(color)) {
    return hexToOklch(color);
  }
  throw new Error(`Unsupported color format: ${color}`);
}

/**
 * Generate secondary color based on harmony type
 */
function generateSecondaryColor(
  primary: OklchColor,
  harmony: ThemeGeneratorOptions['harmony'] = 'complementary'
): OklchColor {
  switch (harmony) {
    case 'complementary':
      return getComplementary(primary);
    case 'analogous':
      return rotateHue(primary, 30);
    case 'triadic':
      return rotateHue(primary, 120);
    case 'split-complementary':
      return getSplitComplementary(primary)[0];
    default:
      return getComplementary(primary);
  }
}

/**
 * Interpolate between two hue values, handling the 0/360 wrap-around correctly
 * Returns the midpoint hue taking the shortest path around the color wheel
 */
function interpolateHue(h1: number, h2: number): number {
  // Normalize hues to 0-360 range
  const hue1 = ((h1 % 360) + 360) % 360;
  const hue2 = ((h2 % 360) + 360) % 360;

  // Calculate the difference
  let diff = hue2 - hue1;

  // Take the shortest path around the wheel
  if (diff > 180) {
    diff -= 360;
  } else if (diff < -180) {
    diff += 360;
  }

  // Calculate midpoint and normalize to 0-360
  const midHue = hue1 + diff / 2;
  return ((midHue % 360) + 360) % 360;
}

/**
 * Generate accent color
 */
function generateAccentColor(
  primary: OklchColor,
  secondary: OklchColor
): OklchColor {
  // Use a color between primary and secondary, shifted by 90 degrees
  // interpolateHue handles the 0/360 wrap-around correctly
  const midHue = interpolateHue(primary.h, secondary.h);
  return {
    l: 0.65,
    c: Math.max(primary.c, secondary.c) * 0.8,
    h: ((midHue + 90) % 360 + 360) % 360,
  };
}

/**
 * Generate light mode colors from base colors
 */
function generateLightModeColors(
  primary: OklchColor,
  secondary: OklchColor,
  accent: OklchColor
): ThemeColors {
  const neutralScale = generateNeutralScale(primary.h);

  return {
    primary: {
      default: toOklchString({ ...primary, l: 0.52 }),
      hover: toOklchString({ ...primary, l: 0.45 }),
      active: toOklchString({ ...primary, l: 0.38 }),
      foreground: toOklchString(getAccessibleForeground({ ...primary, l: 0.52 })),
    },
    secondary: {
      default: toOklchString(neutralScale['100']),
      hover: toOklchString(neutralScale['200']),
      active: toOklchString(neutralScale['300']),
      foreground: toOklchString(neutralScale['900']),
    },
    accent: {
      default: toOklchString({ ...accent, l: 0.92, c: accent.c * 0.3 }),
      hover: toOklchString({ ...accent, l: 0.88, c: accent.c * 0.4 }),
      foreground: toOklchString({ ...accent, l: 0.35 }),
    },
    background: {
      default: toOklchString({ l: 1, c: 0, h: 0 }),
      subtle: toOklchString(neutralScale['50']),
      muted: toOklchString(neutralScale['100']),
    },
    foreground: {
      default: toOklchString(neutralScale['900']),
      muted: toOklchString(neutralScale['500']),
      subtle: toOklchString(neutralScale['400']),
    },
    border: {
      default: toOklchString(neutralScale['200']),
      strong: toOklchString(neutralScale['300']),
      muted: toOklchString(neutralScale['100']),
    },
  };
}

/**
 * Generate dark mode colors from base colors
 */
function generateDarkModeColors(
  primary: OklchColor,
  secondary: OklchColor,
  accent: OklchColor
): ThemeColors {
  const neutralScale = generateNeutralScale(primary.h);

  return {
    primary: {
      default: toOklchString({ ...primary, l: 0.62 }),
      hover: toOklchString({ ...primary, l: 0.70 }),
      active: toOklchString({ ...primary, l: 0.78 }),
      foreground: toOklchString({ l: 0.13, c: 0.02, h: primary.h }),
    },
    secondary: {
      default: toOklchString(neutralScale['800']),
      hover: toOklchString(neutralScale['700']),
      active: toOklchString(neutralScale['600']),
      foreground: toOklchString(neutralScale['50']),
    },
    accent: {
      default: toOklchString({ ...accent, l: 0.38, c: accent.c * 0.8 }),
      hover: toOklchString({ ...accent, l: 0.45, c: accent.c * 0.9 }),
      foreground: toOklchString({ ...accent, l: 0.92 }),
    },
    background: {
      default: toOklchString(neutralScale['950']),
      subtle: toOklchString(neutralScale['900']),
      muted: toOklchString(neutralScale['800']),
    },
    foreground: {
      default: toOklchString(neutralScale['50']),
      muted: toOklchString(neutralScale['400']),
      subtle: toOklchString(neutralScale['500']),
    },
    border: {
      default: toOklchString(neutralScale['800']),
      strong: toOklchString(neutralScale['700']),
      muted: toOklchString(neutralScale['900']),
    },
  };
}

/**
 * Generate a complete theme from a primary color
 *
 * @example
 * ```ts
 * const theme = generateTheme({
 *   primaryColor: '#3B82F6',
 *   name: 'Ocean Blue',
 *   harmony: 'complementary',
 * });
 * ```
 */
export function generateTheme(options: ThemeGeneratorOptions): ThemePreset {
  const {
    primaryColor,
    name,
    description = `Custom theme based on ${primaryColor}`,
    industry = 'Custom',
    harmony = 'complementary',
    secondaryColor,
    accentColor,
  } = options;

  // Parse primary color
  const primary = parseColor(primaryColor);

  // Generate or parse secondary color
  const secondary = secondaryColor
    ? parseColor(secondaryColor)
    : generateSecondaryColor(primary, harmony);

  // Generate or parse accent color
  const accent = accentColor
    ? parseColor(accentColor)
    : generateAccentColor(primary, secondary);

  // Generate theme ID from name
  const id = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id,
    name,
    description,
    industry,
    psychology: {
      primary: getPsychologyForHue(primary.h),
      secondary: getPsychologyForHue(secondary.h),
      overall: `${name} - Custom generated theme`,
    },
    light: generateLightModeColors(primary, secondary, accent),
    dark: generateDarkModeColors(primary, secondary, accent),
  };
}

/**
 * Get color psychology description for a hue value
 */
function getPsychologyForHue(hue: number): string {
  // Normalize hue to 0-360
  const h = ((hue % 360) + 360) % 360;

  if (h >= 0 && h < 30) return 'energy';
  if (h >= 30 && h < 60) return 'warmth';
  if (h >= 60 && h < 90) return 'optimism';
  if (h >= 90 && h < 150) return 'growth';
  if (h >= 150 && h < 210) return 'calm';
  if (h >= 210 && h < 270) return 'trust';
  if (h >= 270 && h < 330) return 'creativity';
  return 'passion';
}

/**
 * Generate CSS variables from a generated theme
 * Note: Import generator dynamically to avoid circular dependency
 */
export async function generateThemeVariables(theme: ThemePreset): Promise<string> {
  const { generateThemeCSS } = await import('./generator');
  return generateThemeCSS(theme);
}

/**
 * Quick theme presets based on popular color combinations
 */
export const quickPresets = {
  /** Ocean - Calm blue tones */
  ocean: () =>
    generateTheme({
      primaryColor: 'oklch(0.55 0.18 240)',
      name: 'Ocean',
      description: 'Calm ocean blue theme',
      industry: 'Technology',
      harmony: 'analogous',
    }),

  /** Forest - Natural greens */
  forest: () =>
    generateTheme({
      primaryColor: 'oklch(0.50 0.15 145)',
      name: 'Forest',
      description: 'Natural forest green theme',
      industry: 'Nature',
      harmony: 'analogous',
    }),

  /** Sunset - Warm oranges and pinks */
  sunset: () =>
    generateTheme({
      primaryColor: 'oklch(0.60 0.20 30)',
      name: 'Sunset',
      description: 'Warm sunset gradient theme',
      industry: 'Creative',
      harmony: 'analogous',
    }),

  /** Royal - Deep purples */
  royal: () =>
    generateTheme({
      primaryColor: 'oklch(0.45 0.22 300)',
      name: 'Royal',
      description: 'Luxurious royal purple theme',
      industry: 'Luxury',
      harmony: 'split-complementary',
    }),

  /** Coral - Vibrant coral and teal */
  coral: () =>
    generateTheme({
      primaryColor: 'oklch(0.65 0.18 15)',
      name: 'Coral',
      description: 'Vibrant coral reef theme',
      industry: 'Lifestyle',
      harmony: 'complementary',
    }),

  /** Mint - Fresh and clean */
  mint: () =>
    generateTheme({
      primaryColor: 'oklch(0.70 0.12 170)',
      name: 'Mint',
      description: 'Fresh mint green theme',
      industry: 'Health',
      harmony: 'triadic',
    }),
};

/**
 * Generate theme from hex color (convenience function)
 */
export function generateThemeFromHex(
  hex: string,
  name: string,
  options?: Partial<ThemeGeneratorOptions>
): ThemePreset {
  return generateTheme({
    primaryColor: hex,
    name,
    ...options,
  });
}
