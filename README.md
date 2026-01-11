# Design System Pipeline

[![Tokens Sync](https://github.com/YOUR_USER/design-system-pipeline/actions/workflows/tokens-sync.yml/badge.svg)](https://github.com/YOUR_USER/design-system-pipeline/actions/workflows/tokens-sync.yml)
[![Deploy Storybook](https://github.com/YOUR_USER/design-system-pipeline/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/YOUR_USER/design-system-pipeline/actions/workflows/deploy-storybook.yml)

> Sistema de diseño automatizado y bidireccional: **Figma ↔ Design Tokens ↔ Tailwind CSS ↔ React ↔ Storybook ↔ MCP**

## Visión General

Este proyecto implementa un flujo de trabajo moderno para design systems que permite:

- **Diseñar en Figma** → Código Tailwind generado automáticamente
- **Crear desde código** → Sincronizar componentes a Figma
- **Versionado en Git** → Historial completo de cambios de diseño
- **AI-assisted** → Usar Claude Code/Cursor con contexto de diseño via MCP

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ARQUITECTURA DEL SISTEMA                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   FIGMA (Source of Truth)                                               │
│     │                                                                   │
│     ├──► Tokens Studio Plugin                                           │
│     │         │                                                         │
│     │         ▼                                                         │
│     │    tokens/*.json ◄────────────────────┐                          │
│     │         │                              │                          │
│     │         ▼                              │                          │
│     │    Style Dictionary                    │                          │
│     │         │                              │                          │
│     │    ┌────┴────┐                         │                          │
│     │    ▼         ▼                         │                          │
│     │  CSS      Tailwind                     │                          │
│     │  Vars     Preset                       │                          │
│     │    │         │                         │                          │
│     │    └────┬────┘                         │                          │
│     │         ▼                              │                          │
│     │    React Components                    │                          │
│     │         │                              │                          │
│     │         ▼                              │                          │
│     │    Storybook ──────────────────────────┤                          │
│     │         │                              │                          │
│     │         ▼                              │                          │
│     └──► Figma MCP ◄─────── Claude Code / Cursor                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Características

| Característica | Descripción |
|----------------|-------------|
| **Design Tokens** | Tokens primitivos y semánticos en JSON |
| **Auto-generación** | Style Dictionary → Tailwind + CSS Variables |
| **Componentes React** | Librería con CVA para variantes |
| **Storybook** | Documentación interactiva con Figma addon |
| **MCP Ready** | Configuración para Figma MCP bidireccional |
| **CI/CD** | GitHub Actions para sync y deploy automático |
| **TypeScript** | Tipado completo incluyendo tokens |

## Quick Start

### Prerrequisitos

- Node.js 18+
- npm o pnpm
- (Opcional) Figma con Tokens Studio plugin
- (Opcional) Cursor/VS Code con MCP support

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/YOUR_USER/design-system-pipeline.git
cd design-system-pipeline

# Instalar dependencias
npm install

# Generar tokens (IMPORTANTE: ejecutar primero)
npm run tokens:build

# Iniciar Storybook
npm run storybook
```

Abre http://localhost:6006 para ver la documentación de componentes.

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run tokens:build` | Genera Tailwind preset y CSS variables desde tokens |
| `npm run tokens:watch` | Watch mode para desarrollo de tokens |
| `npm run storybook` | Inicia Storybook en modo desarrollo |
| `npm run build:storybook` | Build estático de Storybook |
| `npm run build` | Build completo (tokens + componentes) |
| `npm run test` | Ejecuta tests unitarios |
| `npm run test:e2e` | Ejecuta tests end-to-end |
| `npm run lint` | Linting del código |

## Estructura del Proyecto

```
design-system-pipeline/
│
├── .cursor/                    # Reglas para Cursor AI
│   └── rules.md
│
├── .github/workflows/          # CI/CD
│   ├── tokens-sync.yml         # Auto-sync cuando cambian tokens
│   └── deploy-storybook.yml    # Deploy a GitHub Pages
│
├── .mcp/                       # Configuración MCP
│   └── README.md               # Guía de setup
│
├── .storybook/                 # Configuración Storybook
│   ├── main.ts
│   └── preview.ts
│
├── docs/
│   └── phases/
│       └── ROADMAP.md          # Roadmap detallado
│
├── scripts/
│   └── tokens/
│       └── build.js            # Script de Style Dictionary
│
├── src/
│   ├── components/             # Componentes React
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.stories.tsx
│   │       ├── Button.test.tsx
│   │       └── index.ts
│   │
│   ├── stories/                # Stories adicionales
│   │
│   ├── styles/
│   │   ├── generated/          # ⚡ AUTO-GENERADO
│   │   │   ├── tailwind.preset.js
│   │   │   ├── variables.css
│   │   │   └── tokens.d.ts
│   │   └── globals.css
│   │
│   └── index.ts                # Entry point
│
├── tokens/                     # 🎨 DESIGN TOKENS
│   ├── primitives/             # Tokens base
│   │   ├── colors.json
│   │   ├── spacing.json
│   │   ├── typography.json
│   │   ├── shadows.json
│   │   └── radii.json
│   │
│   └── semantic/               # Tokens semánticos
│       ├── colors.json         # primary, secondary, danger...
│       └── components.json     # button, input, card...
│
├── tests/
│   └── e2e/                    # Tests end-to-end
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Design Tokens

### Estructura de Tokens

Los tokens siguen una arquitectura de 3 niveles:

```
PRIMITIVOS          SEMÁNTICOS           COMPONENTES
────────────        ──────────           ───────────
color.blue.600  →   primary.default  →   button.background
spacing.4       →   spacing.md       →   button.padding
```

### Tokens Primitivos

Valores base sin contexto semántico:

```json
// tokens/primitives/colors.json
{
  "color": {
    "blue": {
      "500": { "value": "#3b82f6", "type": "color" },
      "600": { "value": "#2563eb", "type": "color" }
    }
  }
}
```

### Tokens Semánticos

Valores con significado de uso:

```json
// tokens/semantic/colors.json
{
  "semantic": {
    "color": {
      "primary": {
        "default": { "value": "{color.blue.600}", "type": "color" },
        "hover": { "value": "{color.blue.700}", "type": "color" }
      }
    }
  }
}
```

### Salida Generada

Después de `npm run tokens:build`:

**tailwind.preset.js**
```javascript
export default {
  theme: {
    extend: {
      colors: {
        color: {
          blue: {
            500: "#3b82f6",
            600: "#2563eb"
          }
        }
      }
    }
  }
};
```

**variables.css**
```css
:root {
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --semantic-color-primary-default: #2563eb;
}
```

## Componentes

### Crear un Nuevo Componente

```bash
# Estructura recomendada
src/components/
└── MyComponent/
    ├── MyComponent.tsx        # Componente
    ├── MyComponent.stories.tsx # Stories
    ├── MyComponent.test.tsx   # Tests
    └── index.ts               # Exports
```

### Ejemplo: Button

```tsx
// src/components/Button/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export function Button({ variant, size, children, ...props }) {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  );
}
```

## Integración con Figma

> **NOTA**: NO se requiere Figma Dev Mode (plan pago). Solo necesitas cuenta gratuita + API token.

### 1. Tokens Studio (Figma ↔ GitHub)

La forma más robusta de sincronizar tokens:

1. Instala [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978) en Figma
2. Configura sync con GitHub:
   - Settings → Sync → Provider: GitHub
   - Repository: `tu-usuario/design-system-pipeline`
   - File path: `tokens`
3. Los cambios en Figma se sincronizan automáticamente a GitHub
4. GitHub Actions regenera los archivos de estilo

### 2. Framelink MCP (Leer diseños - Recomendado)

No requiere Dev Mode, solo API token gratuito:

```json
// Cursor settings o ~/.claude/mcp.json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=YOUR_TOKEN", "--stdio"]
    }
  }
}
```

### 3. Talk to Figma MCP (Crear/Modificar diseños)

Flujo bidireccional - crear componentes en Figma desde código:

```bash
git clone https://github.com/sonnylazuardi/cursor-talk-to-figma-mcp
cd cursor-talk-to-figma-mcp && npm install && npm run build
```

Ver [.mcp/README.md](./.mcp/README.md) para configuración detallada y ejemplos de prompts.

## Testing

### Tests Unitarios

```bash
npm run test
```

### Tests End-to-End

```bash
# Ejecutar pipeline completo
npm run test:e2e
```

Los tests E2E verifican:
- ✅ Build de tokens genera archivos correctos
- ✅ Tailwind preset es válido
- ✅ CSS variables son correctas
- ✅ Storybook compila sin errores
- ✅ Componentes renderizan correctamente

## CI/CD

### Tokens Sync (`.github/workflows/tokens-sync.yml`)

Se ejecuta cuando cambian archivos en `tokens/`:
1. Build de tokens con Style Dictionary
2. Commit automático de archivos generados

### Deploy Storybook (`.github/workflows/deploy-storybook.yml`)

Se ejecuta en push a `main`:
1. Build de tokens
2. Build de Storybook
3. Deploy a GitHub Pages

## Uso como Paquete NPM

### Instalación

```bash
npm install @ai-first/design-system
```

### Uso

```tsx
import { Button } from '@ai-first/design-system';
import '@ai-first/design-system/styles';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

### Tailwind Preset

```javascript
// tailwind.config.js
import preset from '@ai-first/design-system/tailwind-preset';

export default {
  presets: [preset],
  // ...
};
```

## Roadmap

Ver [ROADMAP.md](./docs/phases/ROADMAP.md) para el plan detallado.

| Fase | Estado | Descripción |
|------|--------|-------------|
| 1. Design Tokens | ✅ Completo | Estructura de tokens |
| 2. Style Dictionary | ✅ Completo | Transformación automática |
| 3. Componentes | ✅ Completo | React + Storybook |
| 4. MCP Integration | ✅ Completo | Configuración Figma MCP |
| 5. CI/CD | ✅ Completo | GitHub Actions |

## Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Commit: `git commit -m 'Add mi feature'`
4. Push: `git push origin feature/mi-feature`
5. Abre un Pull Request

## Licencia

MIT © 2025
