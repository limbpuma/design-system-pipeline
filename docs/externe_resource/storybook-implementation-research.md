# Storybook.js & Chromatic - Investigación de Implementación

## Resumen Ejecutivo

Este documento investiga la viabilidad de implementar **Storybook.js** y **Chromatic** como herramienta de desarrollo de UI Components para proyectos LAB, basándose en el ticket #64487.

---

## 1. ¿Es Posible Implementar?

### Respuesta: **Sí, es totalmente viable**

Existen múltiples opciones de implementación según el stack tecnológico:

| Stack | Solución | Madurez |
|-------|----------|---------|
| Laravel/Blade (Statamic) | [Blast](https://github.com/area17/blast) | Estable |
| Vue.js/Nuxt | @storybook/vue3 | Estable (Nuxt 4 aún con limitaciones) |
| Web Components (Lit) | @storybook/web-components | Estable |
| React/Vite | @storybook/react-vite | Muy estable |

### Limitaciones Conocidas

- **Nuxt 4**: Actualmente no soportado completamente por el addon nuxt-storybook
- **Hot Reload en Lit**: Web Components con Lit requieren full reload en cada cambio
- **Storybook 10**: Algunos addons aún no actualizados

---

## 2. Opciones de Implementación

### Opción A: Blast para Laravel/Blade (Statamic Boilerplate)

```bash
# Instalación
composer require area17/blast

# Publicar configuración
php artisan vendor:publish --provider="A17\Blast\BlastServiceProvider" --tag="blast-config"

# Iniciar Storybook
php artisan blast:launch
```

**Ventajas:**
- Integración nativa con Blade templates
- Soporte para Tailwind CSS (auto-detecta config)
- Compatible con Vite

**Desventajas:**
- Solo para proyectos Laravel/Blade
- No genera Web Components reutilizables

### Opción B: Web Components con Lit (Master Library)

```bash
# Crear proyecto
npm create vite@latest lab-components -- --template lit-ts

# Inicializar Storybook
npx storybook@latest init --builder storybook-builder-vite

# Instalar dependencias
npm install lit
```

**Ventajas:**
- Componentes reutilizables en cualquier framework
- Publicables como paquete NPM
- Framework-agnostic

**Desventajas:**
- Curva de aprendizaje
- Sin hot reload nativo

### Opción C: Vue Components Library

```bash
# Crear proyecto Vue
npm create vite@latest lab-vue-components -- --template vue-ts

# Inicializar Storybook
npx storybook@latest init
```

**Ventajas:**
- Familiar para el equipo
- Hot reload funcional
- Buena integración con Tailwind

---

## 3. Automatización Posible

### 3.1 GitLab CI/CD Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

variables:
  GIT_DEPTH: 0  # Importante para Chromatic

build-storybook:
  stage: build
  image: node:20
  script:
    - npm ci
    - npm run build-storybook
  artifacts:
    paths:
      - storybook-static/
    expire_in: 1 week

chromatic:
  stage: test
  image: node:20
  script:
    - npm ci
    - npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN
  only:
    - develop
    - main
  interruptible: true

pages:
  stage: deploy
  script:
    - mv storybook-static public
  artifacts:
    paths:
      - public
  only:
    - main
```

### 3.2 Design Tokens Automation

```yaml
# Workflow: Figma → GitHub → Storybook
sync-design-tokens:
  stage: build
  script:
    # Tokens Studio exporta JSON a repo
    - npm run import-tokens
    # Style Dictionary transforma a CSS vars
    - npm run build:tokens
    # Rebuild Storybook con nuevos tokens
    - npm run build-storybook
  only:
    changes:
      - tokens/**/*.json
```

### 3.3 Publicación NPM Automática

```yaml
publish-npm:
  stage: deploy
  script:
    - npm ci
    - npm run build
    - echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
    - npm publish --access public
  only:
    - tags
```

---

## 4. Integración con Design Tokens (Figma)

### Workflow Propuesto

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌───────────┐
│   Figma     │ --> │ Tokens Studio│ --> │   GitHub    │ --> │ Storybook │
│  (Design)   │     │   (Export)   │     │  (Actions)  │     │   (Dev)   │
└─────────────┘     └──────────────┘     └─────────────┘     └───────────┘
                           │
                           v
                    ┌──────────────┐
                    │ Style        │
                    │ Dictionary   │
                    └──────────────┘
                           │
                           v
                    ┌──────────────┐
                    │ CSS Variables│
                    │ Tailwind     │
                    └──────────────┘
```

### Integración con Boilerplate Existente

El boilerplate ya tiene `scripts/import-style-tokens.js` que:
1. Lee tokens JSON de Figma/Tokens Studio
2. Genera `design_tokens.css` con variables CSS
3. Integra con Tailwind v4

**Extensión para Storybook:**
```javascript
// .storybook/preview.js
import '../resources/css/design_tokens.css';
import '../resources/css/tailwind.css';

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: 'var(--color-surface-primary)' },
      { name: 'dark', value: 'var(--color-surface-invert)' },
    ],
  },
};
```

---

## 5. Chromatic - Análisis

### Planes y Costos

| Plan | Precio | Características |
|------|--------|-----------------|
| Free | $0 | 5,000 snapshots/mes, proyectos ilimitados |
| Pro | $179/mes | 35,000 snapshots, colaboración |
| Enterprise | $399/mes | Dominio propio, SSO, SLA |

### Funcionalidades Clave

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Visual Testing | ✅ | ✅ | ✅ |
| UI Review | ✅ | ✅ | ✅ |
| Storybook Hosting | ✅ | ✅ | ✅ |
| Cross-browser Testing | ❌ | ✅ | ✅ |
| A11y Testing | ❌ | ✅ | ✅ |
| Custom Domain | ❌ | ❌ | ✅ |

### Alternativa: GitLab Pages (Gratis)

```yaml
# Deploy Storybook a GitLab Pages
pages:
  stage: deploy
  script:
    - npm run build-storybook
    - mv storybook-static public
  artifacts:
    paths:
      - public
  only:
    - main
```

URL resultante: `https://<grupo>.gitlab.io/<proyecto>/`

---

## 6. Casos de Uso Recomendados

### Use Case 1: LAB Master Library
**Recomendación: Web Components (Lit) + Storybook**

```
Componentes reutilizables → NPM Package → Importar en cualquier proyecto
```

### Use Case 2: Proyectos Statamic
**Recomendación: Blast + Storybook**

```
Blade components → Storybook local → GitLab Pages
```

### Use Case 3: Proyectos con Microservicios
**Recomendación: Web Components + Chromatic Pro**

```
Shared Components → NPM → Multiple Apps → Visual Regression Testing
```

### Use Case 4: Alta exigencia A11y
**Recomendación: KoliBri + Storybook**

Referencia: [public-ui.github.io](https://public-ui.github.io/docs/concepts/styling/theming)

---

## 7. Setup Recomendado para Boilerplate

### Estructura de Archivos

```
boilerplate-statamic/
├── .storybook/
│   ├── main.js
│   ├── preview.js
│   └── manager.js
├── stories/
│   ├── components/
│   │   ├── Button.stories.js
│   │   └── Card.stories.js
│   └── patterns/
│       ├── Header.stories.js
│       └── Footer.stories.js
├── resources/
│   ├── css/
│   │   └── design_tokens.css
│   └── views/
│       └── components/
└── package.json
```

### Configuración Base

```javascript
// .storybook/main.js
export default {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
};
```

### Scripts NPM

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build -o storybook-static",
    "chromatic": "chromatic --project-token=$CHROMATIC_TOKEN"
  }
}
```

---

## 8. Integración Figma ↔ Storybook

### Opción A: Storybook Connect (Chromatic)

**Requisitos:**
- Cuenta Chromatic
- Plugin Figma "Storybook Connect"

**Limitaciones:**
- Requiere vincular manualmente cada componente
- Último update hace >7 meses
- Solo lectura desde Figma

### Opción B: story.to.design

**Características:**
- Genera componentes Figma desde Storybook
- Soporta Design Tokens
- Bidireccional

### Opción C: Anima

**Características:**
- Exporta Storybook a Figma
- Convierte tokens a Figma styles
- Addon disponible en NPM

---

## 9. Testing Automatizado

### A11y Testing

```javascript
// .storybook/main.js
addons: ['@storybook/addon-a11y']
```

```javascript
// Button.stories.js
export default {
  title: 'Components/Button',
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
};
```

### Visual Regression Testing

**Local (Gratis):**
```bash
npm install @storybook/test-runner
npx test-storybook
```

**Chromatic (Pro):**
```bash
npx chromatic --project-token=xxx
```

---

## 10. Recomendación Final

### Para LAB Proyectos Generales

| Aspecto | Recomendación |
|---------|---------------|
| Herramienta | Storybook + GitLab Pages |
| Componentes | Blade (Blast) o Web Components (Lit) |
| Design Tokens | Tokens Studio → import-style-tokens.js |
| CI/CD | GitLab CI (ver ejemplo arriba) |
| Visual Testing | Local por defecto, Chromatic si presupuesto |

### Próximos Pasos

1. **Fase 1**: Integrar Storybook en boilerplate (Blast o HTML/Vite)
2. **Fase 2**: Configurar GitLab Pages para hosting
3. **Fase 3**: Conectar con pipeline de Design Tokens existente
4. **Fase 4**: Evaluar Chromatic Pro para proyectos grandes

---

## 11. Referencias

### Documentación Oficial
- [Storybook Docs](https://storybook.js.org/)
- [Chromatic Docs](https://www.chromatic.com/docs/)
- [Blast for Laravel](https://github.com/area17/blast)

### Integraciones
- [Storybook + Tailwind](https://storybook.js.org/recipes/tailwindcss)
- [Storybook + Figma](https://storybook.js.org/docs/sharing/design-integrations)
- [Chromatic + GitLab](https://www.chromatic.com/docs/gitlab/)

### Ejemplos
- [Lit + Vite + Storybook](https://github.com/leon/blog-vite-lit-storybook)
- [Design Tokens + Storybook](https://github.com/joshdstockdale/lit-vite-tailwind-storybook-design-tokens)
- [Telekom Scale Design System](https://telekom.github.io/scale/)

### Recursos Adicionales
- [Design Token Automation](https://matthewrea.com/blog/design-token-automation-from-figma-to-storybook/)
- [KoliBri A11y Components](https://public-ui.github.io/)
- [story.to.design](https://story.to.design/)
