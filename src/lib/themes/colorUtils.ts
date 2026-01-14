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
 * Convert OKLCH to approximate sRGB values.
 *
 * This is an approximation that converts OKLCH -> OKLab -> Linear RGB -> sRGB.
 * The conversion is not 100% accurate but provides much better WCAG compliance
 * calculations than using OKLCH lightness directly.
 *
 * Note: Some colors may be slightly out of sRGB gamut; they are clamped to [0,1].
 *
 * @internal
 */
function oklchToApproximateSrgb(color: OklchColor): { r: number; g: number; b: number } {
  const { l, c, h } = color;

  // Convert OKLCH to OKLab
  // OKLab uses L (lightness), a (green-red), b (blue-yellow)
  const hRad = (h * Math.PI) / 180;
  const labL = l;
  const labA = c * Math.cos(hRad);
  const labB = c * Math.sin(hRad);

  // Convert OKLab to linear RGB
  // Using the OKLab to linear sRGB matrix transformation
  // First, convert OKLab to LMS (cone responses)
  const l_ = labL + 0.3963377774 * labA + 0.2158037573 * labB;
  const m_ = labL - 0.1055613458 * labA - 0.0638541728 * labB;
  const s_ = labL - 0.0894841775 * labA - 1.2914855480 * labB;

  // Cube the values to get LMS
  const lms_l = l_ * l_ * l_;
  const lms_m = m_ * m_ * m_;
  const lms_s = s_ * s_ * s_;

  // Convert LMS to linear RGB using the inverse matrix
  const linearR = +4.0767416621 * lms_l - 3.3077115913 * lms_m + 0.2309699292 * lms_s;
  const linearG = -1.2684380046 * lms_l + 2.6097574011 * lms_m - 0.3413193965 * lms_s;
  const linearB = -0.0041960863 * lms_l - 0.7034186147 * lms_m + 1.7076147010 * lms_s;

  // Convert linear RGB to sRGB (gamma correction)
  // sRGB transfer function: if linear <= 0.0031308, srgb = 12.92 * linear
  // else srgb = 1.055 * linear^(1/2.4) - 0.055
  const linearToSrgb = (linear: number): number => {
    const clamped = Math.max(0, Math.min(1, linear));
    if (clamped <= 0.0031308) {
      return 12.92 * clamped;
    }
    return 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  return {
    r: Math.max(0, Math.min(1, linearToSrgb(linearR))),
    g: Math.max(0, Math.min(1, linearToSrgb(linearG))),
    b: Math.max(0, Math.min(1, linearToSrgb(linearB))),
  };
}

/**
 * Linearize an sRGB channel value for luminance calculation.
 *
 * Per WCAG 2.1 specification:
 * - If sRGB <= 0.04045: linear = sRGB / 12.92
 * - Else: linear = ((sRGB + 0.055) / 1.055) ^ 2.4
 *
 * @internal
 */
function linearizeSrgbChannel(channel: number): number {
  if (channel <= 0.04045) {
    return channel / 12.92;
  }
  return Math.pow((channel + 0.055) / 1.055, 2.4);
}

/**
 * Calculate relative luminance for WCAG contrast calculations.
 *
 * Implements the WCAG 2.1 relative luminance formula:
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 *
 * Where R, G, B are linearized sRGB values.
 *
 * This function first converts OKLCH to approximate sRGB, then calculates
 * the relative luminance according to WCAG specifications.
 *
 * Note: This is an approximation due to the OKLCH -> sRGB conversion.
 * For critical accessibility compliance, verify with actual sRGB/hex values.
 *
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getRelativeLuminance(color: OklchColor): number {
  // Convert OKLCH to sRGB
  const srgb = oklchToApproximateSrgb(color);

  // Linearize sRGB channels
  const rLinear = linearizeSrgbChannel(srgb.r);
  const gLinear = linearizeSrgbChannel(srgb.g);
  const bLinear = linearizeSrgbChannel(srgb.b);

  // Calculate relative luminance using WCAG coefficients
  // These coefficients represent the human eye's sensitivity to each color
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors per WCAG 2.1 specification.
 *
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 * Where L1 is the lighter color's luminance and L2 is the darker color's luminance.
 *
 * The result is a ratio from 1:1 (no contrast) to 21:1 (maximum contrast, black on white).
 *
 * WCAG Requirements:
 * - AA Normal text: 4.5:1
 * - AA Large text: 3:1
 * - AAA Normal text: 7:1
 * - AAA Large text: 4.5:1
 *
 * Note: Uses approximate OKLCH -> sRGB conversion. For critical compliance,
 * verify with actual sRGB/hex color values.
 *
 * @see https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
export function getContrastRatio(
  color1: OklchColor,
  color2: OklchColor
): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);

  // L1 should be the lighter (higher luminance) value
  const l1 = Math.max(lum1, lum2);
  const l2 = Math.min(lum1, lum2);

  // WCAG contrast ratio formula
  return (l1 + 0.05) / (l2 + 0.05);
}

/**
 * Check if contrast meets WCAG AA requirements.
 *
 * WCAG 2.1 Level AA requirements:
 * - Normal text (< 18pt or < 14pt bold): 4.5:1 minimum
 * - Large text (>= 18pt or >= 14pt bold): 3:1 minimum
 *
 * Note: Uses approximate OKLCH -> sRGB conversion for luminance calculation.
 * For critical accessibility compliance, verify with actual sRGB/hex values.
 *
 * @param foreground - The text or foreground color
 * @param background - The background color
 * @param isLargeText - True if text is >= 18pt (24px) or >= 14pt (18.5px) bold
 * @returns True if the contrast ratio meets WCAG AA requirements
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
