# Design Quality Framework

> Elevando componentes de "funcionales" a "excepcionales"

## El Problema

Los componentes actuales son **técnicamente correctos pero visualmente genéricos**. Cumplen con:
- ✅ Accesibilidad (WCAG AA)
- ✅ TypeScript estricto
- ✅ Tokens semánticos
- ✅ CVA para variantes

Pero les falta:
- ❌ Micro-interacciones refinadas
- ❌ Animaciones de estado suaves
- ❌ Efectos visuales modernos
- ❌ Detalles de polish profesional
- ❌ Feedback táctil satisfactorio

---

## 1. Principios de Diseño de Alta Calidad

### 1.1 La Regla de los 3 Segundos

> Un usuario debe sentir que el componente es "premium" en los primeros 3 segundos de interacción.

Esto se logra con:
1. **Respuesta inmediata** - < 16ms de feedback visual
2. **Animaciones suaves** - Curvas de easing naturales
3. **Feedback multi-sensorial** - Visual + háptico (en móvil)

### 1.2 Jerarquía de Calidad

```
Nivel 1: FUNCIONAL     → Hace lo que debe hacer
Nivel 2: PULIDO        → Tiene animaciones y estados completos
Nivel 3: DELEITOSO     → Sorprende y satisface al usuario
Nivel 4: MEMORABLE     → El usuario lo recuerda y lo comenta
```

**Objetivo mínimo: Nivel 3 (DELEITOSO)**

---

## 2. Checklist de Calidad por Componente

### 2.1 Estados Interactivos (OBLIGATORIO)

```typescript
interface InteractiveStates {
  // TODOS los componentes interactivos DEBEN tener:
  rest: string;          // Estado base
  hover: string;         // Mouse sobre el elemento
  focus: string;         // Focus visible (teclado)
  active: string;        // Click/tap activo
  disabled: string;      // Deshabilitado

  // Opcionales pero recomendados:
  loading: string;       // Cargando
  error: string;         // Estado de error
  success: string;       // Estado de éxito
}
```

### 2.2 Animaciones Requeridas

| Tipo | Duración | Easing | Ejemplo |
|------|----------|--------|---------|
| **Hover** | 150-200ms | ease-out | Cambio de color, elevación |
| **Focus** | 100ms | ease-in-out | Ring de focus |
| **Active** | 50-100ms | ease-in | Scale down (0.98) |
| **Enter** | 200-300ms | ease-out | Fade in, slide up |
| **Exit** | 150-200ms | ease-in | Fade out |
| **Loading** | 1000-1500ms | linear (loop) | Spinner, skeleton pulse |

### 2.3 Curvas de Easing Estándar

```css
/* Movimiento natural - usar para la mayoría */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);

/* Entrada suave */
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* Movimiento completo */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring effect - para acciones satisfactorias */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Bounce - para confirmaciones */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## 3. Patrones de Diseño Premium

### 3.1 Button Premium

```tsx
// ❌ MALO - Button genérico
const BadButton = () => (
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    Click me
  </button>
);

// ✅ BUENO - Button con micro-interacciones
const GoodButton = () => (
  <button
    className={cn(
      // Base
      "relative inline-flex items-center justify-center gap-2",
      "px-4 py-2.5 rounded-xl font-medium text-sm",

      // Colores con gradiente sutil
      "bg-gradient-to-b from-blue-500 to-blue-600",
      "text-white shadow-lg shadow-blue-500/25",

      // Borde interno para profundidad
      "ring-1 ring-inset ring-white/20",

      // Hover con elevación
      "hover:shadow-xl hover:shadow-blue-500/30",
      "hover:-translate-y-0.5",
      "hover:from-blue-400 hover:to-blue-500",

      // Active con feedback táctil
      "active:translate-y-0 active:shadow-md",
      "active:scale-[0.98]",

      // Focus visible
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-blue-400",
      "focus-visible:ring-offset-2",

      // Transiciones suaves
      "transition-all duration-200 ease-out",

      // Disabled
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "disabled:hover:translate-y-0 disabled:hover:shadow-lg"
    )}
  >
    {/* Efecto de brillo en hover */}
    <span className="absolute inset-0 rounded-xl overflow-hidden">
      <span className={cn(
        "absolute inset-0 -translate-x-full",
        "bg-gradient-to-r from-transparent via-white/10 to-transparent",
        "group-hover:translate-x-full transition-transform duration-700"
      )} />
    </span>

    <span className="relative">Click me</span>
  </button>
);
```

### 3.2 Card Premium

```tsx
// ❌ MALO - Card plana
const BadCard = () => (
  <div className="bg-white border rounded-lg p-4 shadow">
    Content
  </div>
);

// ✅ BUENO - Card con profundidad y movimiento
const GoodCard = () => (
  <article
    className={cn(
      // Base con múltiples capas de sombra
      "relative bg-white rounded-2xl overflow-hidden",
      "border border-slate-200/60",

      // Sombra multi-capa para profundidad
      "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]",

      // Hover state
      "hover:shadow-[0_8px_30px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]",
      "hover:border-slate-200",
      "hover:-translate-y-1",

      // Transición suave
      "transition-all duration-300 ease-out",

      // Dark mode
      "dark:bg-slate-900 dark:border-slate-800/60",
      "dark:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.2)]"
    )}
  >
    {/* Gradient border effect */}
    <div className={cn(
      "absolute inset-0 rounded-2xl",
      "bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10",
      "opacity-0 group-hover:opacity-100",
      "transition-opacity duration-500"
    )} />

    <div className="relative p-6">
      Content
    </div>
  </article>
);
```

### 3.3 Input Premium

```tsx
// ✅ Input con estados completos y animaciones
const PremiumInput = () => (
  <div className="relative group">
    {/* Label flotante animado */}
    <label
      className={cn(
        "absolute left-3 px-1 bg-white",
        "text-sm text-slate-500",
        "transition-all duration-200 ease-out",
        "pointer-events-none",

        // Estado normal
        "top-1/2 -translate-y-1/2",

        // Estado activo (con input:focus o :not(:placeholder-shown))
        "peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600",
        "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
      )}
    >
      Email
    </label>

    <input
      type="email"
      placeholder=" " // Para el selector :placeholder-shown
      className={cn(
        "peer w-full px-4 py-3 rounded-xl",
        "bg-slate-50 border-2 border-transparent",
        "text-slate-900 placeholder-transparent",

        // Focus
        "focus:outline-none focus:bg-white",
        "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",

        // Error state
        "aria-[invalid=true]:border-red-500",
        "aria-[invalid=true]:focus:ring-red-500/10",

        // Transición
        "transition-all duration-200"
      )}
    />

    {/* Icono de validación animado */}
    <span className={cn(
      "absolute right-3 top-1/2 -translate-y-1/2",
      "opacity-0 scale-50",
      "peer-valid:opacity-100 peer-valid:scale-100",
      "transition-all duration-300 ease-spring"
    )}>
      <CheckIcon className="w-5 h-5 text-emerald-500" />
    </span>
  </div>
);
```

---

## 4. Efectos Visuales Modernos

### 4.1 Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.glass-dark {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

### 4.2 Gradient Text

```tsx
<h1 className={cn(
  "text-4xl font-bold",
  "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
  "bg-clip-text text-transparent",
  "animate-gradient-x" // Animación opcional
)}>
  Gradient Heading
</h1>
```

### 4.3 Glow Effects

```css
/* Glow para elementos destacados */
.glow-blue {
  box-shadow:
    0 0 20px rgba(59, 130, 246, 0.3),
    0 0 40px rgba(59, 130, 246, 0.2),
    0 0 60px rgba(59, 130, 246, 0.1);
}

/* Glow pulsante para llamar atención */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
}

.glow-pulse {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

### 4.4 Skeleton Loading Premium

```tsx
const PremiumSkeleton = () => (
  <div className={cn(
    "relative overflow-hidden",
    "bg-slate-100 dark:bg-slate-800",
    "rounded-lg"
  )}>
    {/* Shimmer effect */}
    <div className={cn(
      "absolute inset-0",
      "bg-gradient-to-r",
      "from-transparent via-white/60 to-transparent",
      "dark:via-white/10",
      "-translate-x-full animate-shimmer"
    )} />
  </div>
);

// En tailwind.config.js
// animation: {
//   shimmer: 'shimmer 2s infinite',
// },
// keyframes: {
//   shimmer: {
//     '100%': { transform: 'translateX(100%)' },
//   },
// },
```

---

## 5. Sistema de Puntuación de Calidad

### 5.1 Criterios de Evaluación

| Categoría | Peso | Descripción |
|-----------|------|-------------|
| **Micro-interacciones** | 25% | Hover, focus, active, disabled states |
| **Animaciones** | 20% | Transiciones suaves, timing correcto |
| **Profundidad Visual** | 15% | Sombras, bordes, gradientes |
| **Feedback** | 15% | Estados de loading, error, success |
| **Consistencia** | 15% | Uso de tokens, patrones establecidos |
| **Innovación** | 10% | Detalles únicos, sorpresa positiva |

### 5.2 Niveles de Calidad

```typescript
interface QualityScore {
  score: number;        // 0-100
  level: QualityLevel;
  issues: QualityIssue[];
  suggestions: string[];
}

type QualityLevel =
  | 'EXCEPTIONAL'  // 90-100: Listo para portfolio
  | 'PREMIUM'      // 80-89:  Producción de alta calidad
  | 'GOOD'         // 70-79:  Aceptable con mejoras menores
  | 'BASIC'        // 60-69:  Funcional pero genérico
  | 'NEEDS_WORK';  // <60:    Requiere rediseño
```

### 5.3 Umbrales de Aprobación

| Tipo de Componente | Mínimo Requerido |
|-------------------|------------------|
| Primitivos (Button, Input) | PREMIUM (80+) |
| Blocks (Hero, Cards) | PREMIUM (80+) |
| Templates | GOOD (70+) |
| Layouts | GOOD (70+) |

---

## 6. Reglas de Validación (MCP Tool)

### 6.1 validate_design_quality

```typescript
interface DesignQualityCheck {
  // Micro-interacciones (25 puntos)
  hasHoverState: boolean;           // 5 pts
  hasFocusState: boolean;           // 5 pts
  hasActiveState: boolean;          // 5 pts
  hasDisabledState: boolean;        // 5 pts
  hasLoadingState: boolean;         // 5 pts (bonus)

  // Animaciones (20 puntos)
  hasTransitions: boolean;          // 5 pts
  correctDuration: boolean;         // 5 pts (150-300ms)
  usesEasing: boolean;              // 5 pts (no linear)
  smoothAnimations: boolean;        // 5 pts (no jarring)

  // Profundidad Visual (15 puntos)
  usesShadows: boolean;             // 5 pts
  hasDepthVariation: boolean;       // 5 pts
  usesGradients: boolean;           // 5 pts (optional)

  // Feedback (15 puntos)
  hasErrorState: boolean;           // 5 pts
  hasSuccessState: boolean;         // 5 pts
  hasSkeletonLoading: boolean;      // 5 pts

  // Consistencia (15 puntos)
  usesSemanticTokens: boolean;      // 5 pts
  followsPatterns: boolean;         // 5 pts
  consistentSpacing: boolean;       // 5 pts

  // Innovación (10 puntos)
  hasUniqueDetails: boolean;        // 5 pts
  delightfulInteractions: boolean;  // 5 pts
}
```

---

## 7. Referencias de Alta Calidad

### 7.1 Design Systems de Referencia

| Sistema | Fortaleza | URL |
|---------|-----------|-----|
| **Linear** | Micro-interacciones, performance | linear.app |
| **Vercel** | Minimalismo elegante, animaciones | vercel.com/design |
| **Stripe** | Gradientes, profundidad | stripe.com |
| **Raycast** | Glassmorphism, teclado-first | raycast.com |
| **shadcn/ui** | Composición, accesibilidad | ui.shadcn.com |
| **Radix** | Primitivos robustos | radix-ui.com |

### 7.2 Bibliotecas de Animación

- **Framer Motion** - Animaciones declarativas
- **React Spring** - Física natural
- **AutoAnimate** - Animaciones automáticas
- **GSAP** - Animaciones complejas

### 7.3 Herramientas de Análisis

- **Lighthouse** - Performance y accesibilidad
- **Storybook a11y addon** - Accesibilidad
- **axe DevTools** - Validación WCAG
- **Contrast Checker** - Ratios de contraste

---

## 8. Proceso de Elevación de Calidad

### 8.1 Para Componentes Nuevos

```
1. Diseñar con micro-interacciones desde el inicio
2. Prototipar animaciones en Figma/Framer
3. Implementar todos los estados
4. Validar con design_quality tool
5. Iterar hasta alcanzar PREMIUM (80+)
```

### 8.2 Para Componentes Existentes

```
1. Auditar con design_quality tool
2. Identificar gaps principales
3. Priorizar: hover → focus → active → loading
4. Agregar animaciones y transiciones
5. Añadir efectos de profundidad
6. Re-validar hasta PREMIUM
```

---

## 9. Ejemplos Antes/Después

### Button

| Aspecto | Antes | Después |
|---------|-------|---------|
| Hover | Solo cambio de color | Color + elevación + shadow |
| Active | Ninguno | Scale 0.98 + shadow reducido |
| Transición | 0ms | 200ms ease-out |
| Profundidad | Plano | Gradient + ring interno |

### Card

| Aspecto | Antes | Después |
|---------|-------|---------|
| Sombra | shadow-sm | Multi-layer shadow |
| Hover | Ninguno | Elevación + shadow + border |
| Borde | solid 1px | Gradient border subtle |
| Loading | Ninguno | Skeleton con shimmer |

---

*Última actualización: 2025-01-12*
*Versión: 1.0.0*
