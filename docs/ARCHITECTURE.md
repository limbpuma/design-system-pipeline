# Arquitectura del Sistema - Design System Pipeline

## Índice

1. [Visión General](#visión-general)
2. [Flujo de Datos](#flujo-de-datos)
3. [Componentes del Sistema](#componentes-del-sistema)
4. [Design Tokens en Detalle](#design-tokens-en-detalle)
5. [Proceso de Transformación](#proceso-de-transformación)
6. [Integración con Tailwind](#integración-con-tailwind)
7. [Storybook y Documentación](#storybook-y-documentación)
8. [Integración con Figma](#integración-con-figma)
9. [CI/CD y Automatización](#cicd-y-automatización)

---

## Visión General

Este sistema implementa un **Design System Pipeline** que automatiza el flujo entre diseño y desarrollo:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐          │
│   │          │     │          │     │          │     │          │          │
│   │  FIGMA   │────►│  TOKENS  │────►│  BUILD   │────►│   CODE   │          │
│   │          │     │  (JSON)  │     │ PROCESS  │     │          │          │
│   └──────────┘     └──────────┘     └──────────┘     └──────────┘          │
│        │                                                   │                │
│        │           ┌──────────────────────────────────────┘                │
│        │           │                                                        │
│        │           ▼                                                        │
│        │      ┌──────────┐     ┌──────────┐                                │
│        │      │          │     │          │                                │
│        └─────►│ STORYBOOK│────►│   MCP    │◄──── Claude Code / Cursor     │
│               │          │     │          │                                │
│               └──────────┘     └──────────┘                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Principios Clave

1. **Single Source of Truth**: Los tokens JSON son la fuente única de verdad
2. **Automatización**: Todo cambio en tokens regenera automáticamente el código
3. **Bidireccional**: Se puede leer de Figma Y escribir a Figma
4. **Versionado**: Todo está en Git con historial completo

---

## Flujo de Datos

### Flujo Principal (Diseño → Código)

```
PASO 1: DEFINICIÓN
──────────────────
Figma (Tokens Studio)
        │
        │ Sync automático a GitHub
        ▼
tokens/*.json (en repositorio)


PASO 2: TRANSFORMACIÓN
──────────────────────
tokens/*.json
        │
        │ npm run tokens:build
        │ (Style Dictionary)
        ▼
┌───────────────────────────────────┐
│  src/styles/generated/            │
│  ├── tailwind.preset.js           │
│  ├── theme.json                   │
│  ├── variables.css                │
│  └── tokens.d.ts                  │
└───────────────────────────────────┘


PASO 3: CONSUMO
───────────────
Archivos generados
        │
        ├──► tailwind.config.js (importa theme.json)
        │           │
        │           ▼
        │    Clases Tailwind disponibles
        │    (bg-color-blue-500, spacing-4, etc.)
        │
        ├──► Componentes React
        │    (usan clases Tailwind)
        │
        └──► Storybook
             (documenta componentes)
```

### Flujo Inverso (Código → Diseño)

```
Claude Code / Cursor
        │
        │ "Crea un botón en Figma"
        ▼
Talk to Figma MCP
        │
        │ WebSocket / API
        ▼
Figma Plugin
        │
        ▼
Componente creado en Figma
```

---

## Componentes del Sistema

### 1. Tokens (tokens/)

Los tokens son **valores de diseño en formato JSON** que definen colores, espaciados, tipografía, etc.

```
tokens/
├── primitives/          # Valores base (sin contexto semántico)
│   ├── colors.json      # Paleta de colores: blue-500, gray-100...
│   ├── spacing.json     # Escala de espaciado: 1, 2, 4, 8...
│   ├── typography.json  # Fuentes, tamaños, pesos
│   ├── shadows.json     # Sombras
│   └── radii.json       # Border radius
│
└── semantic/            # Valores con significado de uso
    ├── colors.json      # primary, secondary, danger, success...
    └── components.json  # Tokens específicos de componentes
```

**Ejemplo de token primitivo:**
```json
{
  "color": {
    "blue": {
      "500": { "value": "#3b82f6", "type": "color" },
      "600": { "value": "#2563eb", "type": "color" }
    }
  }
}
```

**Ejemplo de token semántico (referencia a primitivo):**
```json
{
  "semantic": {
    "color": {
      "primary": {
        "default": { "value": "{color.blue.600}", "type": "color" }
      }
    }
  }
}
```

### 2. Script de Build (scripts/tokens/build.js)

Este script usa **Style Dictionary** para transformar los tokens JSON en múltiples formatos.

```javascript
// Flujo interno del script:

1. Lee todos los archivos en tokens/**/*.json
2. Resuelve referencias ({color.blue.600} → #2563eb)
3. Aplica transformaciones (web, css, etc.)
4. Genera archivos de salida:
   - tailwind.preset.js (módulo JS)
   - theme.json (JSON para config)
   - variables.css (CSS custom properties)
   - tokens.d.ts (tipos TypeScript)
```

### 3. Archivos Generados (src/styles/generated/)

| Archivo | Propósito | Consumido por |
|---------|-----------|---------------|
| `theme.json` | Objeto JSON con valores | `tailwind.config.js` |
| `tailwind.preset.js` | Preset de Tailwind | Referencia/documentación |
| `variables.css` | CSS Custom Properties | Runtime theming |
| `tokens.d.ts` | Tipos TypeScript | IDE autocompletado |

**theme.json generado:**
```json
{
  "colors": {
    "color": {
      "blue": {
        "500": "#3b82f6",
        "600": "#2563eb"
      }
    }
  },
  "spacing": {
    "1": "0.25rem",
    "2": "0.5rem",
    "4": "1rem"
  }
}
```

**variables.css generado:**
```css
:root {
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
}
```

### 4. Tailwind Config (tailwind.config.js)

Lee el `theme.json` generado y lo inyecta en la configuración de Tailwind:

```javascript
import fs from 'fs';

// Lee el theme generado
const themePath = 'src/styles/generated/theme.json';
let generatedTheme = {};
if (fs.existsSync(themePath)) {
  generatedTheme = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
}

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...generatedTheme  // Inyecta colores, spacing, etc.
    }
  }
};
```

**Resultado:** Puedes usar clases como `bg-color-blue-500`, `p-spacing-4`, etc.

### 5. Componentes React (src/components/)

Los componentes usan **Class Variance Authority (CVA)** para manejar variantes:

```typescript
// src/components/Button/Button.tsx

import { cva } from 'class-variance-authority';

// Define variantes con clases Tailwind
const buttonVariants = cva(
  // Clases base (siempre aplicadas)
  'inline-flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      // Variante de estilo
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
      },
      // Variante de tamaño
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    // Valores por defecto
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Componente
export function Button({ variant, size, children, ...props }) {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  );
}
```

### 6. Storybook (src/stories/, .storybook/)

Documenta los componentes con ejemplos interactivos:

```typescript
// src/stories/Button.stories.tsx

import { Button } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  // Controles interactivos en Storybook
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

// Historia: Button primario
export const Primary = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
  },
};

// Historia: Todas las variantes
export const AllVariants = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
```

---

## Design Tokens en Detalle

### Arquitectura de 3 Niveles

```
NIVEL 1: PRIMITIVOS              NIVEL 2: SEMÁNTICOS           NIVEL 3: COMPONENTES
─────────────────────            ───────────────────           ────────────────────

color.blue.600          ───►     primary.default       ───►    button.background
"#2563eb"                        "{color.blue.600}"            "{primary.default}"

color.blue.700          ───►     primary.hover         ───►    button.background-hover
"#1d4ed8"                        "{color.blue.700}"            "{primary.hover}"

spacing.4               ───►     spacing.md            ───►    button.padding-x
"1rem"                           "{spacing.4}"                 "{spacing.md}"
```

### ¿Por qué 3 niveles?

| Nivel | Propósito | Ejemplo |
|-------|-----------|---------|
| **Primitivos** | Valores raw sin contexto | `blue-600: #2563eb` |
| **Semánticos** | Significado de uso | `primary: {blue.600}` |
| **Componentes** | Aplicación específica | `button.bg: {primary}` |

**Ventaja:** Si cambias `primary` de azul a verde, todos los componentes que usan `primary` cambian automáticamente.

### Formato de Token

```json
{
  "tokenName": {
    "value": "#3b82f6",      // El valor real
    "type": "color",         // Tipo (color, spacing, etc.)
    "description": "..."     // Opcional: documentación
  }
}
```

### Referencias entre Tokens

```json
// Primitivo
{ "color": { "blue": { "600": { "value": "#2563eb" } } } }

// Semántico (referencia al primitivo)
{ "primary": { "value": "{color.blue.600}" } }
//                       ▲
//                       └── Sintaxis de referencia
```

Style Dictionary resuelve `{color.blue.600}` → `#2563eb` durante el build.

---

## Proceso de Transformación

### Style Dictionary

```
┌─────────────────────────────────────────────────────────────────┐
│                      STYLE DICTIONARY                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ENTRADA                    PROCESO                  SALIDA    │
│   ───────                    ───────                  ──────    │
│                                                                 │
│   tokens/                                                       │
│   ├── primitives/    ───►   1. Parsear JSON                    │
│   │   ├── colors            2. Resolver refs     ───►  JS      │
│   │   ├── spacing           3. Transformar       ───►  JSON    │
│   │   └── ...               4. Formatear         ───►  CSS     │
│   └── semantic/                                  ───►  TS      │
│       └── ...                                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Transformaciones Aplicadas

```javascript
// Transform Group: 'web'
// Convierte valores a formato web

"1rem"     →  "1rem"      (sin cambio)
"#3b82f6"  →  "#3b82f6"   (sin cambio)
"16px"     →  "16px"      (sin cambio)

// Transform Group: 'css'
// Optimiza para CSS

"transparent" → "rgba(0, 0, 0, 0)"
```

### Formatos de Salida

#### 1. tailwind/preset (JS)
```javascript
export default {
  theme: {
    extend: {
      colors: { blue: { 500: "#3b82f6" } },
      spacing: { 4: "1rem" }
    }
  }
};
```

#### 2. tailwind/json (JSON)
```json
{
  "colors": { "blue": { "500": "#3b82f6" } },
  "spacing": { "4": "1rem" }
}
```

#### 3. css/variables-flat (CSS)
```css
:root {
  --color-blue-500: #3b82f6;
  --spacing-4: 1rem;
}
```

#### 4. typescript/tokens (TypeScript)
```typescript
export type TokenName = 'color-blue-500' | 'spacing-4' | ...;
export const tokenNames = ['color-blue-500', 'spacing-4', ...] as const;
```

---

## Integración con Tailwind

### Cómo se conectan los tokens con Tailwind

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  theme.json     │────►│ tailwind.config │────►│ Clases CSS      │
│  (generado)     │     │                 │     │ generadas       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘

theme.json:               tailwind.config.js:     Clases disponibles:
{                         extend: {               .bg-color-blue-500
  "colors": {               ...generatedTheme     .text-color-gray-900
    "color": {            }                       .p-spacing-4
      "blue": {                                   .rounded-borderRadius-md
        "500": "#3b82f6"
      }
    }
  }
}
```

### Uso en Componentes

```tsx
// ❌ Antes (hardcoded)
<button className="bg-[#3b82f6] px-[16px] py-[8px]">

// ✅ Ahora (usando tokens via Tailwind)
<button className="bg-color-blue-600 px-spacing-4 py-spacing-2">
```

---

## Storybook y Documentación

### Estructura de Storybook

```
.storybook/
├── main.ts       # Configuración principal
└── preview.ts    # Configuración de preview

src/stories/
└── Button.stories.tsx  # Stories del botón
```

### Addons Configurados

| Addon | Propósito |
|-------|-----------|
| `@storybook/addon-essentials` | Controles, docs, acciones |
| `@storybook/addon-a11y` | Tests de accesibilidad |
| `@storybook/addon-designs` | Link a diseños de Figma |

### Cómo funcionan los Stories

```typescript
// 1. Metadata del componente
export default {
  title: 'Components/Button',  // Ubicación en sidebar
  component: Button,           // Componente a documentar
  argTypes: { ... },           // Controles interactivos
};

// 2. Historia individual
export const Primary = {
  args: {                      // Props del componente
    variant: 'primary',
    children: 'Click me',
  },
};

// 3. Historia con render custom
export const AllVariants = {
  render: () => (
    <div>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  ),
};
```

---

## Integración con Figma

### Sin Dev Mode (cuenta gratuita)

```
┌─────────────────────────────────────────────────────────────────┐
│                    OPCIONES SIN DEV MODE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. TOKENS STUDIO (Figma Plugin)                               │
│     ─────────────────────────────                               │
│     Figma ──► Plugin ──► GitHub ──► tokens/*.json              │
│                                                                 │
│     • Define tokens en Figma                                    │
│     • Sync bidireccional con GitHub                            │
│     • Dispara CI/CD automáticamente                            │
│                                                                 │
│  2. FRAMELINK MCP (Leer diseños)                               │
│     ──────────────────────────────                              │
│     Claude Code ──► MCP ──► Figma API ──► Diseño               │
│                                                                 │
│     • Lee estructura de frames                                  │
│     • Extrae estilos y propiedades                             │
│     • Genera código desde diseño                               │
│                                                                 │
│  3. TALK TO FIGMA MCP (Crear/Modificar)                        │
│     ─────────────────────────────────────                       │
│     Claude Code ──► MCP ──► Plugin ──► Figma                   │
│                                                                 │
│     • Crea componentes en Figma                                │
│     • Modifica propiedades                                      │
│     • Flujo bidireccional completo                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tokens Studio - Flujo Detallado

```
FIGMA                          GITHUB                      LOCAL
─────                          ──────                      ─────

┌──────────────┐
│ Tokens Studio│
│   Plugin     │
└──────┬───────┘
       │
       │ 1. Define tokens
       ▼
┌──────────────┐
│ Collections: │
│ • Colors     │
│ • Spacing    │
│ • Typography │
└──────┬───────┘
       │
       │ 2. Push to GitHub
       ▼
                           ┌──────────────┐
                           │ tokens/      │
                           │ ├── colors   │
                           │ └── spacing  │
                           └──────┬───────┘
                                  │
                                  │ 3. GitHub Action
                                  ▼
                           ┌──────────────┐
                           │ npm run      │
                           │ tokens:build │
                           └──────┬───────┘
                                  │
                                  │ 4. Commit generated
                                  ▼
                           ┌──────────────┐
                           │ generated/   │
                           │ ├── theme    │
                           │ └── css      │
                           └──────────────┘
                                  │
                                  │ 5. Pull
                                  ▼
                                              ┌──────────────┐
                                              │ Desarrollador│
                                              │ usa nuevos   │
                                              │ tokens       │
                                              └──────────────┘
```

---

## CI/CD y Automatización

### GitHub Actions

#### 1. tokens-sync.yml

```yaml
# Se ejecuta cuando cambian tokens
on:
  push:
    paths:
      - 'tokens/**/*.json'

jobs:
  build:
    steps:
      - npm run tokens:build
      - git commit generated files
```

#### 2. deploy-storybook.yml

```yaml
# Se ejecuta en push a main
on:
  push:
    branches: [main]

jobs:
  deploy:
    steps:
      - npm run tokens:build
      - npm run build:storybook
      - Deploy to GitHub Pages
```

### Flujo Automatizado Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    PIPELINE AUTOMATIZADO                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Designer                Developer               CI/CD          │
│  ────────                ─────────               ─────          │
│                                                                 │
│  Cambia token     ──────────────────────────►  Detecta cambio  │
│  en Figma                                       en tokens/      │
│       │                                              │          │
│       │                                              ▼          │
│       │                                        Build tokens     │
│       │                                              │          │
│       │                                              ▼          │
│       │                                        Commit archivos  │
│       │                                        generados        │
│       │                                              │          │
│       │                                              ▼          │
│       │           ◄────────────────────────    Build Storybook │
│       │                                              │          │
│       │                                              ▼          │
│       │           ◄────────────────────────    Deploy a        │
│       │                                        GitHub Pages     │
│       ▼                                              │          │
│  Ve cambios                                          │          │
│  reflejados        ◄─────────────────────────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Resumen

### Archivos Clave

| Archivo | Rol |
|---------|-----|
| `tokens/**/*.json` | Fuente de verdad para valores de diseño |
| `scripts/tokens/build.js` | Transforma tokens a múltiples formatos |
| `src/styles/generated/*` | Archivos generados automáticamente |
| `tailwind.config.js` | Consume theme.json para clases CSS |
| `src/components/*` | Componentes React con variantes |
| `src/stories/*` | Documentación en Storybook |
| `.github/workflows/*` | Automatización CI/CD |

### Comandos Principales

```bash
npm run tokens:build     # Genera archivos desde tokens
npm run storybook        # Inicia documentación local
npm run test:e2e         # Verifica todo el pipeline
npm run build            # Build de producción
```

### Beneficios del Sistema

1. **Consistencia**: Un cambio en tokens se propaga a todo el código
2. **Velocidad**: Generación automática elimina trabajo manual
3. **Documentación**: Storybook siempre actualizado
4. **Colaboración**: Designers y developers trabajan con los mismos valores
5. **Versionado**: Git trackea todos los cambios de diseño
6. **AI-Ready**: MCP permite automatización con Claude Code
