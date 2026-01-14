/**
 * Color Utilities for Theme Generation
 *
 * Uses OKLCH color space for perceptually uniform color manipulation.
 * Generates full theme palettes from a single base color.
 */

/**
 * OKLCH color representation
 */
export interface OklchColor {
  /** Lightness (0-1) */
  l: number;
  /** Chroma (0-0.4+) */
  c: number;
  /** Hue (0-360) */
  h: number;
  /** Alpha (0-1), optional */
  a?: number;
}

/**
 * Parse OKLCH string to object
 * @example parseOklch('oklch(0.55 0.15 260)') => { l: 0.55, c: 0.15, h: 260 }
 */
export function parseOklch(oklchString: string): OklchColor {
  const match = oklchString.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/
  );

  if (!match) {
    throw new Error(`Invalid OKLCH string: ${oklchString}`);
  }

  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
    a: match[4] ? parseFloat(match[4]) : undefined,
  };
}

/**
 * Convert OKLCH object to CSS string
 */
export function toOklchString(color: OklchColor): string {
  const { l, c, h, a } = color;
  if (a !== undefined && a < 1) {
    return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(2)} / ${a.toFixed(2)})`;
  }
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(2)})`;
}

/**
 * Adjust lightness of a color
 */
export function adjustLightness(color: OklchColor, delta: number): OklchColor {
  return {
    ...color,
    l: Math.max(0, Math.min(1, color.l + delta)),
  };
}

/**
 * Adjust chroma (saturation) of a color
 */
export function adjustChroma(color: OklchColor, delta: number): OklchColor {
  return {
    ...color,
    c: Math.max(0, Math.min(0.4, color.c + delta)),
  };
}

/**
 * Rotate hue
 */
export function rotateHue(color: OklchColor, degrees: number): OklchColor {
  return {
    ...color,
    h: ((color.h + degrees) % 360 + 360) % 360,
  };
}

/**
 * Get complementary color (opposite on color wheel)
 */
export function getComplementary(color: OklchColor): OklchColor {
  return rotateHue(color, 180);
}

/**
 * Get analogous colors (adjacent on color wheel)
 */
export function getAnalogous(
  color: OklchColor,
  angle = 30
): [OklchColor, OklchColor] {
  return [rotateHue(color, -angle), rotateHue(color, angle)];
}

/**
 * Get triadic colors
 */
export function getTriadic(color: OklchColor): [OklchColor, OklchColor] {
  return [rotateHue(color, 120), rotateHue(color, 240)];
}

/**
 * Get split-complementary colors
 */
export function getSplitComplementary(
  color: OklchColor
): [OklchColor, OklchColor] {
  return [rotateHue(color, 150), rotateHue(color, 210)];
}

/**
 * Generate a color scale from a base color
 * Returns 11 variants from lightest (50) to darkest (950)
 */
export function generateColorScale(
  baseColor: OklchColor
): Record<string, OklchColor> {
  const { c, h } = baseColor;

  return {
    '50': { l: 0.97, c: c * 0.1, h },
    '100': { l: 0.93, c: c * 0.2, h },
    '200': { l: 0.88, c: c * 0.35, h },
    '300': { l: 0.80, c: c * 0.55, h },
    '400': { l: 0.70, c: c * 0.80, h },
    '500': { l: 0.60, c: c, h },
    '600': { l: 0.52, c: c, h },
    '700': { l: 0.45, c: c * 0.95, h },
    '800': { l: 0.38, c: c * 0.85, h },
    '900': { l: 0.30, c: c * 0.70, h },
    '950': { l: 0.20, c: c * 0.50, h },
  };
}

/**
 * Calculate relative luminance for WCAG contrast
 * Approximate conversion from OKLCH
 */
export function getRelativeLuminance(color: OklchColor): number {
  // Simplified: OKLCH lightness is already perceptually uniform
  // For accurate WCAG, would need conversion to sRGB first
  return color.l;
}

/**
 * Calculate approximate contrast ratio between two colors
 */
export function getContrastRatio(
  color1: OklchColor,
  color2: OklchColor
): number {
  const l1 = Math.max(color1.l, color2.l);
  const l2 = Math.min(color1.l, color2.l);

  // Simplified contrast calculation
  // For accurate WCAG compliance, use proper luminance conversion
  return (l1 + 0.05) / (l2 + 0.05);
}

/**
 * Check if contrast meets WCAG AA requirements
 */
export function meetsContrastAA(
  foreground: OklchColor,
  background: OklchColor,
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Auto-adjust foreground color for accessibility
 * Returns white or black depending on background lightness
 */
export function getAccessibleForeground(background: OklchColor): OklchColor {
  return background.l > 0.6
    ? { l: 0.15, c: 0, h: 0 } // Near black
    : { l: 0.98, c: 0, h: 0 }; // Near white
}

/**
 * Generate neutral gray scale with slight hue tint
 */
export function generateNeutralScale(
  hueTint: number
): Record<string, OklchColor> {
  const baseTint = 0.015; // Very subtle tint

  return {
    '50': { l: 0.985, c: baseTint * 0.3, h: hueTint },
    '100': { l: 0.967, c: baseTint * 0.4, h: hueTint },
    '200': { l: 0.928, c: baseTint * 0.5, h: hueTint },
    '300': { l: 0.872, c: baseTint * 0.6, h: hueTint },
    '400': { l: 0.714, c: baseTint * 0.8, h: hueTint },
    '500': { l: 0.551, c: baseTint, h: hueTint },
    '600': { l: 0.446, c: baseTint, h: hueTint },
    '700': { l: 0.373, c: baseTint, h: hueTint },
    '800': { l: 0.278, c: baseTint, h: hueTint },
    '900': { l: 0.210, c: baseTint, h: hueTint },
    '950': { l: 0.130, c: baseTint, h: hueTint },
  };
}

/**
 * Blend two colors
 */
export function blendColors(
  color1: OklchColor,
  color2: OklchColor,
  ratio = 0.5
): OklchColor {
  const r = Math.max(0, Math.min(1, ratio));

  // Handle hue interpolation correctly (shortest path)
  const h1 = color1.h;
  const h2 = color2.h;
  let hDiff = h2 - h1;

  if (hDiff > 180) hDiff -= 360;
  if (hDiff < -180) hDiff += 360;

  const blendedHue = ((h1 + hDiff * r) % 360 + 360) % 360;

  return {
    l: color1.l * (1 - r) + color2.l * r,
    c: color1.c * (1 - r) + color2.c * r,
    h: blendedHue,
  };
}

/**
 * Desaturate a color
 */
export function desaturate(color: OklchColor, amount = 0.5): OklchColor {
  return {
    ...color,
    c: color.c * (1 - amount),
  };
}

/**
 * Make color more vibrant
 */
export function saturate(color: OklchColor, amount = 0.2): OklchColor {
  return {
    ...color,
    c: Math.min(0.4, color.c + amount),
  };
}

/**
 * Lighten a color
 */
export function lighten(color: OklchColor, amount = 0.1): OklchColor {
  return adjustLightness(color, amount);
}

/**
 * Darken a color
 */
export function darken(color: OklchColor, amount = 0.1): OklchColor {
  return adjustLightness(color, -amount);
}
