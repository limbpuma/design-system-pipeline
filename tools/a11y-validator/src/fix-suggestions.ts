/**
 * Fix Suggestions Database
 *
 * Maps accessibility violations to actionable fix suggestions
 * with code examples specific to this design system.
 */

import type { FixSuggestion, RuleCategory } from './types.js';

interface RuleFix {
  description: string;
  fixes: FixSuggestion[];
}

/**
 * Color contrast fix suggestions based on common patterns
 */
export const colorContrastFixes: Record<string, RuleFix> = {
  'text-slate-400-dark': {
    description: 'Texto slate-400 en modo oscuro tiene contraste insuficiente',
    fixes: [
      {
        description: 'Cambiar a slate-300 en dark mode para mejor contraste',
        example: `// Antes (contraste insuficiente)
className="text-slate-400 dark:text-slate-500"

// Después (contraste correcto)
className="text-slate-500 dark:text-slate-400"`,
        autoFixable: true,
        docsUrl: '/docs/accessibility/color-contrast#dark-mode',
      },
    ],
  },
  'text-slate-500-dark': {
    description: 'Texto slate-500 en modo oscuro tiene contraste insuficiente',
    fixes: [
      {
        description: 'Invertir los colores light/dark para mantener contraste',
        example: `// Antes (contraste 3.75:1)
className="text-slate-400 dark:text-slate-500"

// Después (contraste 5.5:1)
className="text-slate-500 dark:text-slate-400"`,
        autoFixable: true,
        docsUrl: '/docs/accessibility/color-contrast#slate-colors',
      },
    ],
  },
  'white-on-emerald-600': {
    description: 'Texto blanco sobre emerald-600 no cumple WCAG AA',
    fixes: [
      {
        description: 'Usar emerald-700 o emerald-800 como fondo',
        example: `// Antes (contraste 3.76:1)
className="bg-emerald-600 text-white"

// Después (contraste 5.4:1)
className="bg-emerald-700 text-white"`,
        autoFixable: true,
        docsUrl: '/docs/accessibility/color-contrast#emerald',
      },
    ],
  },
  'white-on-blue-500': {
    description: 'Texto blanco sobre blue-500 tiene contraste borderline',
    fixes: [
      {
        description: 'Usar blue-600 o blue-700 como fondo',
        example: `// Antes (contraste ~4.5:1)
className="bg-blue-500 text-white"

// Después (contraste 5.9:1)
className="bg-blue-600 text-white"`,
        autoFixable: true,
        docsUrl: '/docs/accessibility/color-contrast#blue',
      },
    ],
  },
  'gradient-background': {
    description: 'Los gradientes impiden el cálculo de contraste por axe-core',
    fixes: [
      {
        description: 'Reemplazar gradiente con color sólido',
        example: `// Antes (no calculable)
className="bg-gradient-to-br from-blue-500 to-violet-600 text-white"

// Después (calculable)
className="bg-violet-600 text-white"`,
        autoFixable: false,
        docsUrl: '/docs/accessibility/color-contrast#gradients',
      },
      {
        description: 'Si el gradiente es decorativo, usar aria-hidden',
        example: `// Gradiente decorativo sin texto
<div className="bg-gradient-to-br from-blue-500 to-violet-600" aria-hidden="true" />`,
        autoFixable: false,
        docsUrl: '/docs/accessibility/decorative-elements',
      },
    ],
  },
};

/**
 * Landmark and structure fix suggestions
 */
export const landmarkFixes: Record<string, RuleFix> = {
  'region': {
    description: 'Todo el contenido debe estar dentro de landmarks',
    fixes: [
      {
        description: 'Envolver contenido en un elemento <main>',
        example: `// Antes
<div className="container">
  {content}
</div>

// Después
<main className="container" role="main" aria-label="Contenido principal">
  {content}
</main>`,
        autoFixable: true,
        docsUrl: '/docs/accessibility/landmarks',
      },
      {
        description: 'Usar elementos semánticos apropiados',
        example: `// Estructura recomendada
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>`,
        autoFixable: false,
        docsUrl: '/docs/accessibility/semantic-html',
      },
    ],
  },
  'scrollable-region-focusable': {
    description: 'Regiones scrollables deben ser accesibles por teclado',
    fixes: [
      {
        description: 'Agregar tabIndex={0} y roles ARIA apropiados',
        example: `// Antes (no accesible por teclado)
<div className="overflow-y-auto max-h-[500px]">
  {scrollableContent}
</div>

// Después (accesible)
<div
  className="overflow-y-auto max-h-[500px] focus:outline-none focus-visible:ring-2"
  tabIndex={0}
  role="log"
  aria-label="Mensajes del chat"
>
  {scrollableContent}
</div>`,
        autoFixable: true,
        docsUrl: '/docs/accessibility/keyboard-navigation#scrollable',
      },
    ],
  },
};

/**
 * ARIA and focus fix suggestions
 */
export const ariaFixes: Record<string, RuleFix> = {
  'button-name': {
    description: 'Botones deben tener un nombre accesible',
    fixes: [
      {
        description: 'Agregar aria-label para botones con solo iconos',
        example: `// Antes
<button onClick={handleClose}>
  <XIcon />
</button>

// Después
<button onClick={handleClose} aria-label="Cerrar diálogo">
  <XIcon aria-hidden="true" />
</button>`,
        autoFixable: false,
        docsUrl: '/docs/accessibility/button-names',
      },
    ],
  },
  'svg-img-alt': {
    description: 'SVGs decorativos deben ocultarse de lectores de pantalla',
    fixes: [
      {
        description: 'Agregar aria-hidden="true" a SVGs decorativos',
        example: `// Antes
<svg className="w-5 h-5" viewBox="0 0 24 24">
  <path d="..." />
</svg>

// Después
<svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
  <path d="..." />
</svg>`,
        autoFixable: true,
        docsUrl: '/docs/accessibility/svg-accessibility',
      },
    ],
  },
  'focus-visible': {
    description: 'Elementos interactivos deben mostrar indicador de foco',
    fixes: [
      {
        description: 'Agregar estilos de focus-visible',
        example: `// Agregar a elementos interactivos
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"`,
        autoFixable: true,
        docsUrl: '/docs/accessibility/focus-indicators',
      },
    ],
  },
};

/**
 * Get fix suggestions for a specific rule violation
 */
export function getFixSuggestions(
  rule: string,
  category: RuleCategory,
  context?: Record<string, unknown>
): FixSuggestion[] {
  // Check category-specific fixes first
  switch (category) {
    case 'color-contrast':
      return getColorContrastFix(rule, context);
    case 'landmarks':
      return getLandmarkFix(rule);
    case 'aria':
      return getAriaFix(rule);
    default:
      return getGenericFix(rule);
  }
}

function getColorContrastFix(rule: string, context?: Record<string, unknown>): FixSuggestion[] {
  // Check if it's a gradient issue
  if (context?.background?.toString().includes('gradient')) {
    return colorContrastFixes['gradient-background']?.fixes || [];
  }

  // Check specific color combinations
  const fg = context?.foreground?.toString().toLowerCase();
  const bg = context?.background?.toString().toLowerCase();

  if (fg === '#ffffff' && bg === '#059669') {
    return colorContrastFixes['white-on-emerald-600']?.fixes || [];
  }

  if (fg === '#64748b') {
    return colorContrastFixes['text-slate-500-dark']?.fixes || [];
  }

  if (fg === '#94a3b8') {
    return colorContrastFixes['text-slate-400-dark']?.fixes || [];
  }

  // Generic color contrast fix
  return [
    {
      description: 'Aumentar el contraste entre texto y fondo',
      example: `Ratio actual: ${context?.ratio || 'desconocido'}
Ratio requerido: 4.5:1 para texto normal, 3:1 para texto grande

Opciones:
1. Oscurecer el color del texto
2. Aclarar el color del fondo
3. Usar la herramienta de contraste: https://webaim.org/resources/contrastchecker/`,
      autoFixable: false,
      docsUrl: '/docs/accessibility/color-contrast',
    },
  ];
}

function getLandmarkFix(rule: string): FixSuggestion[] {
  return landmarkFixes[rule]?.fixes || [
    {
      description: 'Agregar estructura semántica al contenido',
      example: 'Usar elementos como <main>, <nav>, <header>, <footer>',
      autoFixable: false,
      docsUrl: '/docs/accessibility/landmarks',
    },
  ];
}

function getAriaFix(rule: string): FixSuggestion[] {
  return ariaFixes[rule]?.fixes || [
    {
      description: 'Revisar uso de atributos ARIA',
      example: 'Consultar la documentación de ARIA para el patrón correcto',
      autoFixable: false,
      docsUrl: '/docs/accessibility/aria-patterns',
    },
  ];
}

function getGenericFix(rule: string): FixSuggestion[] {
  return [
    {
      description: `Revisar la documentación para la regla: ${rule}`,
      example: 'Consultar la guía de accesibilidad del design system',
      autoFixable: false,
      docsUrl: `/docs/accessibility/rules/${rule}`,
    },
  ];
}
