/**
 * Theme Presets - Industry-Specific Color Palettes
 *
 * Based on industry color psychology and accessibility requirements.
 * All colors use OKLCH for perceptually uniform color manipulation.
 *
 * @see .claude/agents/industry-brand-specialist.md
 * @see .claude/agents/color-psychology-expert.md
 */

export interface ThemeColors {
  /** Primary brand color - main actions and identity */
  primary: {
    default: string;
    hover: string;
    active: string;
    foreground: string;
  };
  /** Secondary supporting color */
  secondary: {
    default: string;
    hover: string;
    active: string;
    foreground: string;
  };
  /** Accent color for highlights */
  accent: {
    default: string;
    hover: string;
    foreground: string;
  };
  /** Background colors */
  background: {
    default: string;
    subtle: string;
    muted: string;
  };
  /** Foreground/text colors */
  foreground: {
    default: string;
    muted: string;
    subtle: string;
  };
  /** Border colors */
  border: {
    default: string;
    strong: string;
    muted: string;
  };
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  industry: string;
  /** Psychological impact of this palette */
  psychology: {
    primary: string;
    secondary: string;
    overall: string;
  };
  /** Light mode colors */
  light: ThemeColors;
  /** Dark mode colors */
  dark: ThemeColors;
}

/**
 * Default theme - Tech/SaaS (Current design system)
 * Emotion: Trust, Innovation, Professional
 */
export const defaultTheme: ThemePreset = {
  id: 'default',
  name: 'Default',
  description: 'Blue-based professional theme for tech and SaaS products',
  industry: 'Technology',
  psychology: {
    primary: 'trust',
    secondary: 'stability',
    overall: 'Professional and reliable',
  },
  light: {
    primary: {
      default: 'oklch(0.546 0.215 262.89)',   // blue-600
      hover: 'oklch(0.488 0.217 264.38)',     // blue-700
      active: 'oklch(0.424 0.181 265.64)',    // blue-800
      foreground: 'oklch(1 0 0)',             // white
    },
    secondary: {
      default: 'oklch(0.967 0.003 264.51)',   // gray-100
      hover: 'oklch(0.928 0.006 264.52)',     // gray-200
      active: 'oklch(0.872 0.009 258.38)',    // gray-300
      foreground: 'oklch(0.21 0.032 264.67)', // gray-900
    },
    accent: {
      default: 'oklch(0.946 0.033 307.08)',   // purple-100
      hover: 'oklch(0.902 0.06 306.66)',      // purple-200
      foreground: 'oklch(0.381 0.166 304.98)', // purple-900
    },
    background: {
      default: 'oklch(1 0 0)',                 // white
      subtle: 'oklch(0.985 0.002 248.57)',    // gray-50
      muted: 'oklch(0.967 0.003 264.51)',     // gray-100
    },
    foreground: {
      default: 'oklch(0.21 0.032 264.67)',    // gray-900
      muted: 'oklch(0.551 0.023 264.37)',     // gray-500
      subtle: 'oklch(0.714 0.019 261.34)',    // gray-400
    },
    border: {
      default: 'oklch(0.928 0.006 264.52)',   // gray-200
      strong: 'oklch(0.872 0.009 258.38)',    // gray-300
      muted: 'oklch(0.967 0.003 264.51)',     // gray-100
    },
  },
  dark: {
    primary: {
      default: 'oklch(0.623 0.188 259.82)',   // blue-500
      hover: 'oklch(0.714 0.143 254.63)',     // blue-400
      active: 'oklch(0.809 0.096 251.83)',    // blue-300
      foreground: 'oklch(0.13 0.027 261.7)',  // gray-950
    },
    secondary: {
      default: 'oklch(0.278 0.03 256.86)',    // gray-800
      hover: 'oklch(0.373 0.031 259.74)',     // gray-700
      active: 'oklch(0.446 0.026 256.82)',    // gray-600
      foreground: 'oklch(0.985 0.002 248.57)', // gray-50
    },
    accent: {
      default: 'oklch(0.381 0.166 304.98)',   // purple-900
      hover: 'oklch(0.438 0.198 303.72)',     // purple-800
      foreground: 'oklch(0.946 0.033 307.08)', // purple-100
    },
    background: {
      default: 'oklch(0.13 0.027 261.7)',     // gray-950
      subtle: 'oklch(0.21 0.032 264.67)',     // gray-900
      muted: 'oklch(0.278 0.03 256.86)',      // gray-800
    },
    foreground: {
      default: 'oklch(0.985 0.002 248.57)',   // gray-50
      muted: 'oklch(0.714 0.019 261.34)',     // gray-400
      subtle: 'oklch(0.551 0.023 264.37)',    // gray-500
    },
    border: {
      default: 'oklch(0.278 0.03 256.86)',    // gray-800
      strong: 'oklch(0.373 0.031 259.74)',    // gray-700
      muted: 'oklch(0.21 0.032 264.67)',      // gray-900
    },
  },
};

/**
 * Finance Theme - Banking & Financial Services
 * Emotion: Trust, Stability, Security
 */
export const financeTheme: ThemePreset = {
  id: 'finance',
  name: 'Finance',
  description: 'Navy blue and gold palette for banking and financial applications',
  industry: 'Finance & Banking',
  psychology: {
    primary: 'trust',
    secondary: 'prosperity',
    overall: 'Secure and established',
  },
  light: {
    primary: {
      default: 'oklch(0.35 0.08 250)',        // Navy blue
      hover: 'oklch(0.30 0.09 250)',
      active: 'oklch(0.25 0.10 250)',
      foreground: 'oklch(1 0 0)',
    },
    secondary: {
      default: 'oklch(0.75 0.12 85)',         // Gold
      hover: 'oklch(0.70 0.13 85)',
      active: 'oklch(0.65 0.14 85)',
      foreground: 'oklch(0.20 0.03 250)',
    },
    accent: {
      default: 'oklch(0.65 0.15 155)',        // Emerald green (money)
      hover: 'oklch(0.60 0.16 155)',
      foreground: 'oklch(1 0 0)',
    },
    background: {
      default: 'oklch(0.99 0.002 250)',
      subtle: 'oklch(0.97 0.005 250)',
      muted: 'oklch(0.95 0.008 250)',
    },
    foreground: {
      default: 'oklch(0.20 0.03 250)',
      muted: 'oklch(0.45 0.02 250)',
      subtle: 'oklch(0.60 0.015 250)',
    },
    border: {
      default: 'oklch(0.90 0.01 250)',
      strong: 'oklch(0.85 0.015 250)',
      muted: 'oklch(0.95 0.005 250)',
    },
  },
  dark: {
    primary: {
      default: 'oklch(0.55 0.12 250)',
      hover: 'oklch(0.60 0.11 250)',
      active: 'oklch(0.65 0.10 250)',
      foreground: 'oklch(0.98 0.005 250)',
    },
    secondary: {
      default: 'oklch(0.65 0.14 85)',
      hover: 'oklch(0.70 0.13 85)',
      active: 'oklch(0.75 0.12 85)',
      foreground: 'oklch(0.15 0.02 250)',
    },
    accent: {
      default: 'oklch(0.55 0.14 155)',
      hover: 'oklch(0.60 0.15 155)',
      foreground: 'oklch(0.98 0.005 250)',
    },
    background: {
      default: 'oklch(0.15 0.02 250)',
      subtle: 'oklch(0.20 0.025 250)',
      muted: 'oklch(0.25 0.03 250)',
    },
    foreground: {
      default: 'oklch(0.97 0.005 250)',
      muted: 'oklch(0.75 0.015 250)',
      subtle: 'oklch(0.60 0.02 250)',
    },
    border: {
      default: 'oklch(0.30 0.03 250)',
      strong: 'oklch(0.40 0.025 250)',
      muted: 'oklch(0.20 0.02 250)',
    },
  },
};

/**
 * Healthcare Theme - Medical & Wellness
 * Emotion: Calm, Trust, Clean
 */
export const healthcareTheme: ThemePreset = {
  id: 'healthcare',
  name: 'Healthcare',
  description: 'Teal and green palette for medical and wellness applications',
  industry: 'Healthcare & Medical',
  psychology: {
    primary: 'calm',
    secondary: 'health',
    overall: 'Clean and caring',
  },
  light: {
    primary: {
      default: 'oklch(0.60 0.15 195)',        // Teal
      hover: 'oklch(0.55 0.16 195)',
      active: 'oklch(0.50 0.17 195)',
      foreground: 'oklch(1 0 0)',
    },
    secondary: {
      default: 'oklch(0.65 0.16 155)',        // Green
      hover: 'oklch(0.60 0.17 155)',
      active: 'oklch(0.55 0.18 155)',
      foreground: 'oklch(1 0 0)',
    },
    accent: {
      default: 'oklch(0.55 0.12 260)',        // Light blue
      hover: 'oklch(0.50 0.13 260)',
      foreground: 'oklch(1 0 0)',
    },
    background: {
      default: 'oklch(1 0 0)',                 // Pure white
      subtle: 'oklch(0.98 0.008 195)',
      muted: 'oklch(0.96 0.012 195)',
    },
    foreground: {
      default: 'oklch(0.25 0.02 195)',
      muted: 'oklch(0.50 0.02 195)',
      subtle: 'oklch(0.65 0.015 195)',
    },
    border: {
      default: 'oklch(0.92 0.015 195)',
      strong: 'oklch(0.88 0.02 195)',
      muted: 'oklch(0.96 0.01 195)',
    },
  },
  dark: {
    primary: {
      default: 'oklch(0.70 0.14 195)',
      hover: 'oklch(0.75 0.13 195)',
      active: 'oklch(0.80 0.12 195)',
      foreground: 'oklch(0.15 0.02 195)',
    },
    secondary: {
      default: 'oklch(0.70 0.15 155)',
      hover: 'oklch(0.75 0.14 155)',
      active: 'oklch(0.80 0.13 155)',
      foreground: 'oklch(0.15 0.02 155)',
    },
    accent: {
      default: 'oklch(0.65 0.11 260)',
      hover: 'oklch(0.70 0.10 260)',
      foreground: 'oklch(0.15 0.02 260)',
    },
    background: {
      default: 'oklch(0.15 0.02 195)',
      subtle: 'oklch(0.20 0.025 195)',
      muted: 'oklch(0.25 0.03 195)',
    },
    foreground: {
      default: 'oklch(0.97 0.008 195)',
      muted: 'oklch(0.75 0.015 195)',
      subtle: 'oklch(0.60 0.02 195)',
    },
    border: {
      default: 'oklch(0.30 0.03 195)',
      strong: 'oklch(0.40 0.025 195)',
      muted: 'oklch(0.20 0.02 195)',
    },
  },
};

/**
 * Salon Theme - Beauty & Hair Salon
 * Emotion: Elegance, Sophistication, Luxury
 */
export const salonTheme: ThemePreset = {
  id: 'salon',
  name: 'Salon',
  description: 'Black and gold palette for beauty and hair salon applications',
  industry: 'Beauty & Salon',
  psychology: {
    primary: 'elegance',
    secondary: 'luxury',
    overall: 'Sophisticated and premium',
  },
  light: {
    primary: {
      default: 'oklch(0.20 0.01 0)',           // Near black
      hover: 'oklch(0.25 0.01 0)',
      active: 'oklch(0.30 0.01 0)',
      foreground: 'oklch(1 0 0)',
    },
    secondary: {
      default: 'oklch(0.75 0.12 85)',          // Gold
      hover: 'oklch(0.70 0.13 85)',
      active: 'oklch(0.65 0.14 85)',
      foreground: 'oklch(0.15 0.01 0)',
    },
    accent: {
      default: 'oklch(0.75 0.10 350)',         // Rose/blush
      hover: 'oklch(0.70 0.11 350)',
      foreground: 'oklch(0.25 0.05 350)',
    },
    background: {
      default: 'oklch(0.98 0.01 80)',          // Cream
      subtle: 'oklch(0.96 0.015 80)',
      muted: 'oklch(0.94 0.02 80)',
    },
    foreground: {
      default: 'oklch(0.15 0.01 0)',
      muted: 'oklch(0.40 0.01 0)',
      subtle: 'oklch(0.55 0.008 0)',
    },
    border: {
      default: 'oklch(0.88 0.02 80)',
      strong: 'oklch(0.80 0.025 80)',
      muted: 'oklch(0.94 0.015 80)',
    },
  },
  dark: {
    primary: {
      default: 'oklch(0.95 0.005 0)',          // Near white
      hover: 'oklch(0.90 0.008 0)',
      active: 'oklch(0.85 0.01 0)',
      foreground: 'oklch(0.10 0.01 0)',
    },
    secondary: {
      default: 'oklch(0.70 0.13 85)',
      hover: 'oklch(0.75 0.12 85)',
      active: 'oklch(0.80 0.11 85)',
      foreground: 'oklch(0.10 0.01 0)',
    },
    accent: {
      default: 'oklch(0.65 0.12 350)',
      hover: 'oklch(0.70 0.11 350)',
      foreground: 'oklch(0.95 0.01 350)',
    },
    background: {
      default: 'oklch(0.10 0.008 0)',
      subtle: 'oklch(0.15 0.01 0)',
      muted: 'oklch(0.20 0.012 0)',
    },
    foreground: {
      default: 'oklch(0.97 0.005 0)',
      muted: 'oklch(0.75 0.01 0)',
      subtle: 'oklch(0.55 0.012 0)',
    },
    border: {
      default: 'oklch(0.25 0.015 0)',
      strong: 'oklch(0.35 0.018 0)',
      muted: 'oklch(0.18 0.012 0)',
    },
  },
};

/**
 * Florist Theme - Nature & Flowers
 * Emotion: Natural, Fresh, Organic
 */
export const floristTheme: ThemePreset = {
  id: 'florist',
  name: 'Florist',
  description: 'Green and pink palette for florist and nature applications',
  industry: 'Florist & Nature',
  psychology: {
    primary: 'growth',
    secondary: 'freshness',
    overall: 'Natural and vibrant',
  },
  light: {
    primary: {
      default: 'oklch(0.50 0.14 145)',         // Forest green
      hover: 'oklch(0.45 0.15 145)',
      active: 'oklch(0.40 0.16 145)',
      foreground: 'oklch(1 0 0)',
    },
    secondary: {
      default: 'oklch(0.70 0.15 350)',         // Pink
      hover: 'oklch(0.65 0.16 350)',
      active: 'oklch(0.60 0.17 350)',
      foreground: 'oklch(0.20 0.05 350)',
    },
    accent: {
      default: 'oklch(0.80 0.08 90)',          // Soft yellow
      hover: 'oklch(0.75 0.09 90)',
      foreground: 'oklch(0.30 0.08 90)',
    },
    background: {
      default: 'oklch(0.98 0.015 90)',         // Cream
      subtle: 'oklch(0.96 0.02 90)',
      muted: 'oklch(0.94 0.025 90)',
    },
    foreground: {
      default: 'oklch(0.25 0.04 145)',
      muted: 'oklch(0.45 0.03 145)',
      subtle: 'oklch(0.60 0.02 145)',
    },
    border: {
      default: 'oklch(0.90 0.025 145)',
      strong: 'oklch(0.85 0.03 145)',
      muted: 'oklch(0.94 0.02 145)',
    },
  },
  dark: {
    primary: {
      default: 'oklch(0.65 0.13 145)',
      hover: 'oklch(0.70 0.12 145)',
      active: 'oklch(0.75 0.11 145)',
      foreground: 'oklch(0.15 0.03 145)',
    },
    secondary: {
      default: 'oklch(0.65 0.14 350)',
      hover: 'oklch(0.70 0.13 350)',
      active: 'oklch(0.75 0.12 350)',
      foreground: 'oklch(0.15 0.04 350)',
    },
    accent: {
      default: 'oklch(0.70 0.10 90)',
      hover: 'oklch(0.75 0.09 90)',
      foreground: 'oklch(0.20 0.06 90)',
    },
    background: {
      default: 'oklch(0.15 0.025 145)',
      subtle: 'oklch(0.20 0.03 145)',
      muted: 'oklch(0.25 0.035 145)',
    },
    foreground: {
      default: 'oklch(0.96 0.015 90)',
      muted: 'oklch(0.75 0.02 145)',
      subtle: 'oklch(0.55 0.025 145)',
    },
    border: {
      default: 'oklch(0.30 0.035 145)',
      strong: 'oklch(0.40 0.04 145)',
      muted: 'oklch(0.20 0.03 145)',
    },
  },
};

/**
 * Restaurant Theme - Food & Dining
 * Emotion: Appetite, Warmth, Elegance
 */
export const restaurantTheme: ThemePreset = {
  id: 'restaurant',
  name: 'Restaurant',
  description: 'Red and gold palette for restaurant and food applications',
  industry: 'Food & Restaurant',
  psychology: {
    primary: 'appetite',
    secondary: 'warmth',
    overall: 'Inviting and appetizing',
  },
  light: {
    primary: {
      default: 'oklch(0.50 0.18 25)',          // Deep red/burgundy
      hover: 'oklch(0.45 0.19 25)',
      active: 'oklch(0.40 0.20 25)',
      foreground: 'oklch(1 0 0)',
    },
    secondary: {
      default: 'oklch(0.75 0.12 75)',          // Warm gold
      hover: 'oklch(0.70 0.13 75)',
      active: 'oklch(0.65 0.14 75)',
      foreground: 'oklch(0.20 0.03 25)',
    },
    accent: {
      default: 'oklch(0.50 0.10 50)',          // Terracotta
      hover: 'oklch(0.45 0.11 50)',
      foreground: 'oklch(1 0 0)',
    },
    background: {
      default: 'oklch(0.98 0.01 50)',          // Warm white
      subtle: 'oklch(0.96 0.015 50)',
      muted: 'oklch(0.94 0.02 50)',
    },
    foreground: {
      default: 'oklch(0.15 0.02 25)',
      muted: 'oklch(0.40 0.02 25)',
      subtle: 'oklch(0.55 0.015 25)',
    },
    border: {
      default: 'oklch(0.90 0.02 50)',
      strong: 'oklch(0.85 0.025 50)',
      muted: 'oklch(0.94 0.015 50)',
    },
  },
  dark: {
    primary: {
      default: 'oklch(0.60 0.17 25)',
      hover: 'oklch(0.65 0.16 25)',
      active: 'oklch(0.70 0.15 25)',
      foreground: 'oklch(0.98 0.005 0)',
    },
    secondary: {
      default: 'oklch(0.70 0.13 75)',
      hover: 'oklch(0.75 0.12 75)',
      active: 'oklch(0.80 0.11 75)',
      foreground: 'oklch(0.15 0.02 25)',
    },
    accent: {
      default: 'oklch(0.55 0.11 50)',
      hover: 'oklch(0.60 0.10 50)',
      foreground: 'oklch(0.98 0.005 0)',
    },
    background: {
      default: 'oklch(0.12 0.015 25)',
      subtle: 'oklch(0.17 0.02 25)',
      muted: 'oklch(0.22 0.025 25)',
    },
    foreground: {
      default: 'oklch(0.97 0.01 50)',
      muted: 'oklch(0.75 0.015 50)',
      subtle: 'oklch(0.55 0.02 50)',
    },
    border: {
      default: 'oklch(0.28 0.025 25)',
      strong: 'oklch(0.38 0.03 25)',
      muted: 'oklch(0.18 0.02 25)',
    },
  },
};

/**
 * All available theme presets
 */
export const themePresets: Record<string, ThemePreset> = {
  default: defaultTheme,
  finance: financeTheme,
  healthcare: healthcareTheme,
  salon: salonTheme,
  florist: floristTheme,
  restaurant: restaurantTheme,
};

/**
 * Theme preset IDs for type safety
 */
export type ThemePresetId = keyof typeof themePresets;

/**
 * Get a theme preset by ID
 */
export function getThemePreset(id: ThemePresetId): ThemePreset {
  return themePresets[id] || defaultTheme;
}

/**
 * Get all available theme preset IDs
 */
export function getThemePresetIds(): ThemePresetId[] {
  return Object.keys(themePresets) as ThemePresetId[];
}
