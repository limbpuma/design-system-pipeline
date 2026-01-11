# ROADMAP - Design System Pipeline

## Visión General

Crear un sistema de diseño completamente automatizado y bidireccional entre Figma y código, permitiendo:

1. **Figma → Código**: Diseñar en Figma y generar código Tailwind automáticamente
2. **Código → Figma**: Crear/modificar diseños en Figma desde Claude Code
3. **Sincronización**: Mantener tokens y componentes sincronizados vía Git

---

## FASE 1: Design Tokens Foundation

### Objetivo
Establecer la base de tokens de diseño que servirá como fuente única de verdad.

### Entregables
- [ ] Estructura de tokens primitivos (colors, spacing, typography, shadows, radii)
- [ ] Estructura de tokens semánticos (primary, secondary, success, warning, error)
- [ ] Tokens de componentes (button, input, card, etc.)
- [ ] Soporte para temas (light/dark mode)
- [ ] Formato JSON compatible con Tokens Studio

### Archivos a crear
```
tokens/
├── primitives/
│   ├── colors.json
│   ├── spacing.json
│   ├── typography.json
│   ├── shadows.json
│   └── radii.json
├── semantic/
│   ├── colors.json
│   ├── components.json
│   └── themes/
│       ├── light.json
│       └── dark.json
└── $metadata.json
```

### Dependencias
- Tokens Studio plugin instalado en Figma
- Conocimiento de la estructura de Tokens Studio

### Criterios de éxito
- Tokens exportables desde Tokens Studio
- Estructura compatible con Style Dictionary
- Documentación de naming conventions

---

## FASE 2: Style Dictionary + Tailwind Integration

### Objetivo
Transformar tokens JSON en configuración Tailwind utilizable.

### Entregables
- [ ] Configuración de Style Dictionary
- [ ] Transforms personalizados para Tailwind
- [ ] Generación de tailwind.preset.js
- [ ] Generación de CSS variables
- [ ] Scripts de build automatizados

### Archivos a crear
```
scripts/tokens/
├── style-dictionary.config.js
├── transforms/
│   ├── tailwind.js
│   └── css-variables.js
└── build.js

src/styles/generated/
├── tailwind.preset.js
├── variables.css
└── tokens.d.ts (TypeScript types)
```

### Dependencias
```json
{
  "style-dictionary": "^4.0.0",
  "tailwindcss": "^4.0.0"
}
```

### Criterios de éxito
- `npm run tokens:build` genera archivos correctamente
- Tailwind config usa tokens generados
- CSS variables disponibles para runtime theming

---

## FASE 3: Component Library + Storybook

### Objetivo
Crear librería de componentes React documentada en Storybook.

### Entregables
- [ ] Componentes base (Button, Input, Card, Badge, etc.)
- [ ] Configuración Storybook 8+
- [ ] Stories con controles interactivos
- [ ] Documentación MDX
- [ ] Addon de Figma integrado
- [ ] Tests de accesibilidad (a11y addon)

### Archivos a crear
```
src/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   ├── Button.test.tsx
│   └── index.ts
├── Input/
├── Card/
└── index.ts

storybook/
├── main.ts
├── preview.ts
└── manager.ts
```

### Dependencias
```json
{
  "@storybook/react": "^8.0.0",
  "@storybook/addon-essentials": "^8.0.0",
  "@storybook/addon-designs": "^8.0.0",
  "@storybook/addon-a11y": "^8.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

### Criterios de éxito
- Storybook muestra todos los componentes
- Componentes usan tokens de Tailwind
- Links a Figma funcionando
- Tests de accesibilidad pasando

---

## FASE 4: MCP Integration

### Objetivo
Conectar el sistema con Figma vía MCP para flujo bidireccional.

### Entregables
- [ ] Configuración Figma MCP Server (oficial - lectura)
- [ ] Configuración Talk to Figma MCP (escritura)
- [ ] Reglas de Cursor para el proyecto
- [ ] Prompts predefinidos para tareas comunes
- [ ] Documentación de uso

### Archivos a crear
```
.mcp/
├── figma-official.json
├── talk-to-figma.json
└── README.md

.cursor/
├── rules.md
└── prompts/
    ├── create-component.md
    ├── update-tokens.md
    └── sync-figma.md
```

### Dependencias
- Figma Desktop App
- Cuenta Figma Professional/Enterprise (para MCP oficial)
- Node.js para Talk to Figma MCP

### Criterios de éxito
- Cursor puede leer diseños de Figma
- Cursor puede crear/modificar elementos en Figma
- Prompts predefinidos funcionan correctamente

---

## FASE 5: CI/CD & Automation

### Objetivo
Automatizar todo el flujo con GitHub Actions.

### Entregables
- [ ] Workflow: Tokens sync (Figma → GitHub → Build)
- [ ] Workflow: Component build & publish
- [ ] Workflow: Storybook deploy (Chromatic/GitHub Pages)
- [ ] Workflow: Visual regression tests
- [ ] Webhooks de Tokens Studio

### Archivos a crear
```
.github/workflows/
├── tokens-sync.yml
├── build-components.yml
├── deploy-storybook.yml
└── visual-tests.yml

package.json (scripts adicionales)
```

### Dependencias
- GitHub Actions
- Chromatic (opcional, para visual testing)
- npm registry o GitHub Packages (para publicar)

### Criterios de éxito
- Push a tokens/ dispara rebuild automático
- Storybook se despliega automáticamente
- PRs muestran diff visual de cambios

---

## Diagrama de Dependencias entre Fases

```
FASE 1 ──────► FASE 2 ──────► FASE 3
   │              │              │
   │              │              │
   └──────────────┴──────────────┼──────► FASE 4
                                 │
                                 └──────► FASE 5
```

---

## Timeline Sugerido

| Fase | Complejidad | Notas |
|------|-------------|-------|
| 1 | Baja | Fundacional, crítico hacerlo bien |
| 2 | Media | Requiere entender Style Dictionary |
| 3 | Media-Alta | Mayor volumen de trabajo |
| 4 | Media | Experimental, APIs en beta |
| 5 | Baja | Mayormente configuración |

---

## Próximos Pasos

1. Revisar y aprobar este roadmap
2. Comenzar con Fase 1: Crear estructura de tokens
3. Iterar basado en feedback

---

## Referencias

- [Tokens Studio Docs](https://tokens.studio/docs)
- [Style Dictionary](https://amzn.github.io/style-dictionary)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Storybook](https://storybook.js.org/)
- [Figma MCP Server](https://www.figma.com/developers/mcp)
- [Talk to Figma MCP](https://github.com/sonnylazuardi/cursor-talk-to-figma-mcp)
