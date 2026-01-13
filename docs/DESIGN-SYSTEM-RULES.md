# Design System Rules - Source of Truth

Este archivo contiene TODAS las reglas y valores del Design System.
Usado por: SWARM Agents, Stitch, Jules, Claude Code.

---

## 1. COLORES SEMÁNTICOS

### Light Mode
| Token | Valor | Hex | Uso |
|-------|-------|-----|-----|
| `background-default` | white | #ffffff | Fondo principal |
| `background-subtle` | gray-50 | #f9fafb | Fondo alternativo |
| `background-muted` | gray-100 | #f3f4f6 | Fondo deshabilitado |
| `foreground-default` | gray-900 | #111827 | Texto principal |
| `foreground-muted` | gray-500 | #6b7280 | Texto secundario (5.5:1 ✓) |
| `foreground-subtle` | gray-400 | #9ca3af | Solo decorativo (3.0:1 ✗) |
| `primary-default` | blue-600 | #2563eb | Acciones principales |
| `primary-hover` | blue-700 | #1d4ed8 | Hover de primary |
| `primary-foreground` | white | #ffffff | Texto sobre primary |
| `success-default` | green-600 | #16a34a | Estados exitosos |
| `success-strong` | green-700 | #15803d | Texto blanco sobre green |
| `destructive-default` | red-600 | #dc2626 | Errores, eliminar |
| `warning-default` | yellow-500 | #eab308 | Advertencias |
| `warning-foreground` | gray-900 | #111827 | Texto sobre warning |
| `border-default` | gray-200 | #e5e7eb | Bordes normales |
| `border-muted` | gray-100 | #f3f4f6 | Bordes sutiles |

### Dark Mode
| Token | Valor | Hex | Uso |
|-------|-------|-----|-----|
| `background-default` | gray-950 | #030712 | Fondo principal |
| `background-subtle` | gray-900 | #111827 | Fondo alternativo |
| `background-muted` | gray-800 | #1f2937 | Fondo elevado |
| `foreground-default` | gray-50 | #f9fafb | Texto principal |
| `foreground-muted` | gray-400 | #9ca3af | Texto secundario (5.4:1 ✓) |
| `foreground-subtle` | gray-500 | #6b7280 | NO USAR (3.75:1 ✗) |
| `primary-default` | blue-500 | #3b82f6 | Acciones principales |
| `primary-hover` | blue-400 | #60a5fa | Hover de primary |
| `border-default` | gray-800 | #1f2937 | Bordes normales |
| `border-muted` | gray-700 | #374151 | Bordes sutiles |

---

## 2. CONTRASTE WCAG 2.1 AA

### Requisitos Mínimos
| Elemento | Ratio Mínimo |
|----------|-------------|
| Texto normal (< 18px) | 4.5:1 |
| Texto grande (≥ 18px bold, ≥ 24px) | 3:1 |
| Componentes UI / Focus | 3:1 |

### Combinaciones APROBADAS ✅
```
Light Mode:
- text-gray-900 on bg-white → 15.5:1 ✅
- text-gray-500 on bg-white → 5.5:1 ✅
- text-white on bg-blue-600 → 4.7:1 ✅
- text-white on bg-green-700 → 5.4:1 ✅
- text-white on bg-red-600 → 4.6:1 ✅
- text-gray-900 on bg-yellow-500 → 8.5:1 ✅

Dark Mode:
- text-gray-50 on bg-gray-950 → 19.3:1 ✅
- text-gray-400 on bg-gray-950 → 5.4:1 ✅
- text-gray-400 on bg-gray-900 → 4.9:1 ✅
```

### Combinaciones PROHIBIDAS ❌
```
Light Mode:
- text-gray-400 on bg-white → 3.0:1 ❌ (insuficiente)
- text-white on bg-green-600 → 3.76:1 ❌
- text-white on bg-emerald-600 → 3.76:1 ❌
- text-white on bg-yellow-500 → 1.9:1 ❌

Dark Mode:
- text-gray-500 on bg-gray-900 → 3.75:1 ❌
- text-gray-500 on bg-gray-950 → 4.1:1 ❌ (borderline, evitar)
```

### Gradientes
**NO USAR gradientes con texto superpuesto** - contraste no calculable.
```tsx
// ❌ PROHIBIDO
<div className="bg-gradient-to-r from-blue-500 to-purple-500">
  <span className="text-white">Texto</span>
</div>

// ✅ PERMITIDO (sin texto superpuesto)
<div className="bg-gradient-to-r from-blue-500 to-purple-500" aria-hidden="true" />
```

---

## 3. TIPOGRAFÍA

### Font Family
```css
--font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
```

### Scale
| Token | Size | Line Height | Uso |
|-------|------|-------------|-----|
| `text-xs` | 12px (0.75rem) | 16px | Labels pequeños |
| `text-sm` | 14px (0.875rem) | 20px | Texto secundario |
| `text-base` | 16px (1rem) | 24px | Texto principal |
| `text-lg` | 18px (1.125rem) | 28px | Subtítulos |
| `text-xl` | 20px (1.25rem) | 28px | Títulos pequeños |
| `text-2xl` | 24px (1.5rem) | 32px | Títulos medianos |
| `text-3xl` | 30px (1.875rem) | 36px | Títulos grandes |
| `text-4xl` | 36px (2.25rem) | 40px | Headings |

### Weights
| Token | Valor | Uso |
|-------|-------|-----|
| `font-normal` | 400 | Texto body |
| `font-medium` | 500 | Énfasis, labels |
| `font-semibold` | 600 | Subtítulos, buttons |
| `font-bold` | 700 | Headings |

---

## 4. ESPACIADO

### Scale (base 4px)
| Token | Valor | Pixels |
|-------|-------|--------|
| `spacing-1` | 0.25rem | 4px |
| `spacing-2` | 0.5rem | 8px |
| `spacing-3` | 0.75rem | 12px |
| `spacing-4` | 1rem | 16px |
| `spacing-5` | 1.25rem | 20px |
| `spacing-6` | 1.5rem | 24px |
| `spacing-8` | 2rem | 32px |
| `spacing-10` | 2.5rem | 40px |
| `spacing-12` | 3rem | 48px |
| `spacing-16` | 4rem | 64px |

### Uso Típico
```
Padding interno componentes: 8px-16px (spacing-2 a spacing-4)
Gap entre elementos: 8px-12px (spacing-2 a spacing-3)
Secciones: 24px-48px (spacing-6 a spacing-12)
Página margins: 16px-64px (spacing-4 a spacing-16)
```

---

## 5. BORDER RADIUS

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-sm` | 2px | Badges pequeños |
| `rounded` | 4px | Inputs, default |
| `rounded-md` | 6px | Buttons, cards pequeñas |
| `rounded-lg` | 8px | Cards, modals |
| `rounded-xl` | 12px | Cards destacadas |
| `rounded-2xl` | 16px | Containers grandes |
| `rounded-full` | 9999px | Avatars, pills |

---

## 6. SOMBRAS

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-sm` | 0 1px 2px 0 rgb(0 0 0 / 0.05) | Elevación sutil |
| `shadow` | 0 1px 3px 0 rgb(0 0 0 / 0.1) | Default |
| `shadow-md` | 0 4px 6px -1px rgb(0 0 0 / 0.1) | Cards, dropdowns |
| `shadow-lg` | 0 10px 15px -3px rgb(0 0 0 / 0.1) | Modals, popovers |
| `shadow-xl` | 0 20px 25px -5px rgb(0 0 0 / 0.1) | Overlays prominentes |

---

## 7. ACCESIBILIDAD

### SVG Icons (OBLIGATORIO)
```tsx
// ✅ SIEMPRE
<svg aria-hidden="true" className="w-4 h-4">...</svg>

// ❌ NUNCA
<svg className="w-4 h-4">...</svg>
```

### Botones Icon-Only
```tsx
// ✅ SIEMPRE aria-label
<button aria-label="Cerrar" className="p-2">
  <XIcon aria-hidden="true" />
</button>

// ❌ NUNCA sin label
<button className="p-2">
  <XIcon />
</button>
```

### Focus States (OBLIGATORIO)
```tsx
// ✅ Focus visible con ring
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'

// ❌ Sin focus visible
'focus:outline-none' // Accesibilidad rota
```

### Inputs
```tsx
// ✅ Label asociado
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ O aria-label
<input aria-label="Buscar" type="search" />

// ❌ Sin label
<input type="text" placeholder="Email" />
```

### Touch Targets
- **Mínimo 44x44px** para elementos interactivos en móvil
- Padding adicional si el contenido es menor

### Keyboard Navigation
| Componente | Teclas |
|------------|--------|
| Button | Enter, Space |
| Link | Enter |
| Dialog | Escape (cerrar), Tab (trap focus) |
| Tabs | Arrow Left/Right, Home, End |
| Menu | Arrow Up/Down, Enter, Escape |
| Select | Arrow Up/Down, Enter, Space |

---

## 8. ESTADOS DE COMPONENTES

### Estados Requeridos
```tsx
// Todos los componentes interactivos DEBEN tener:
const baseStates = `
  transition-all duration-200 ease-out
  hover:...
  focus-visible:ring-2 focus-visible:ring-offset-2
  active:scale-[0.98]
  disabled:pointer-events-none disabled:opacity-50
`;
```

### Ejemplo Button
```tsx
const button = `
  // Base
  px-4 py-2 rounded-md font-medium

  // Transitions
  transition-all duration-200 ease-out

  // Hover
  hover:bg-blue-700 hover:-translate-y-0.5

  // Focus
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-blue-500
  focus-visible:ring-offset-2

  // Active
  active:scale-[0.98]

  // Disabled
  disabled:pointer-events-none
  disabled:opacity-50
`;
```

---

## 9. PATRONES PREMIUM (Score 70+)

### Requeridos para Quality Score ≥ 70
```tsx
// Transiciones suaves
'transition-all duration-200 ease-out'

// Hover con elevación
'hover:-translate-y-0.5'
'hover:shadow-lg'

// Active feedback
'active:scale-[0.98]'

// Sombras con color
'shadow-lg shadow-blue-500/25'

// Glass effects (opcional)
'ring-1 ring-inset ring-white/20'
'bg-gradient-to-b from-white/10'
```

---

## 10. CÓDIGO DE REFERENCIA

### Button Primario Completo
```tsx
<button
  className={`
    inline-flex items-center justify-center
    px-4 py-2 rounded-md
    bg-blue-600 text-white font-medium

    transition-all duration-200 ease-out
    hover:bg-blue-700 hover:-translate-y-0.5
    hover:shadow-lg hover:shadow-blue-500/25

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-blue-500
    focus-visible:ring-offset-2

    active:scale-[0.98]

    disabled:pointer-events-none
    disabled:opacity-50
  `}
>
  <span>Guardar</span>
</button>
```

### Card Completa
```tsx
<div
  className={`
    p-6 rounded-lg
    bg-white dark:bg-gray-900
    border border-gray-200 dark:border-gray-800
    shadow-md

    transition-all duration-200 ease-out
    hover:shadow-lg hover:-translate-y-1
  `}
>
  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
    Título
  </h3>
  <p className="mt-2 text-gray-500 dark:text-gray-400">
    Descripción con contraste correcto.
  </p>
</div>
```

### Input Completo
```tsx
<div>
  <label
    htmlFor="email"
    className="block text-sm font-medium text-gray-900 dark:text-gray-50"
  >
    Email
  </label>
  <input
    id="email"
    type="email"
    className={`
      mt-1 w-full px-3 py-2 rounded-md
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-700
      text-gray-900 dark:text-gray-50
      placeholder:text-gray-400 dark:placeholder:text-gray-500

      transition-colors duration-200
      hover:border-gray-300 dark:hover:border-gray-600

      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:border-blue-500

      disabled:bg-gray-100 dark:disabled:bg-gray-800
      disabled:cursor-not-allowed
    `}
    placeholder="tu@email.com"
  />
</div>
```

---

## USO DE ESTE DOCUMENTO

### Para SWARM Agents
```
Los agentes deben consultar este archivo para valores específicos.
Referencia: docs/DESIGN-SYSTEM-RULES.md
```

### Para Stitch
```
Incluir secciones 1-7 en el prompt de contexto.
Script: scripts/automation/stitch-prompt.ps1
```

### Para Jules
```
AGENTS.md referencia este archivo.
Jules debe seguir estos valores al generar código.
```

### Para Claude Code
```
Validar código generado contra estas reglas.
Usar component-review.ps1 para verificación automática.
```
