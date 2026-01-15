# UI-Komponenten-Workflow mit Storybook.js & Chromatic

## Vollständiger Implementierungsbericht

**Ticket**: #64487 - UI-Komponenten-Workflow mit storybook.js (& ggf. chromatic.com) auf LABtauglichkeit testen
**Status**: Gelöst
**Aufgewendete Zeit**: 8.50 h
**Datum**: Januar 2026

---

## Inhaltsverzeichnis

1. [Executive Summary](#1-executive-summary)
2. [Use Cases](#2-use-cases)
3. [Technische Analyse](#3-technische-analyse)
4. [Implementierungsoptionen](#4-implementierungsoptionen)
5. [Design Tokens Integration](#5-design-tokens-integration)
6. [Chromatic Analyse](#6-chromatic-analyse)
7. [GitLab CI/CD Automatisierung](#7-gitlab-cicd-automatisierung)
8. [Figma Integration](#8-figma-integration)
9. [Testing & Qualitätssicherung](#9-testing--qualitätssicherung)
10. [Kostenanalyse](#10-kostenanalyse)
11. [Empfehlungen](#11-empfehlungen)
12. [Implementierungsplan](#12-implementierungsplan)
13. [Referenzen](#13-referenzen)

---

## 1. Executive Summary

### Was ist Storybook?

> "Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. It's open source and free."

### Kernfrage

Derzeit werden Patterns aus Figma direkt im CMS umgesetzt. Die Wiederverwendbarkeit für andere Projekte, insbesondere in anderen Technologien oder Microservices, ist begrenzt. Storybook bietet die Möglichkeit, UI-Komponenten isoliert zu entwickeln und in verschiedene Projekte zu importieren.

### Ergebnis der Untersuchung

| Aspekt | Bewertung |
|--------|-----------|
| Machbarkeit | ✅ Vollständig umsetzbar |
| Aufwand (Initial) | Mittel (2-4 Tage Setup) |
| Aufwand (Laufend) | Gering (Teil des Dev-Workflows) |
| ROI | Hoch bei wiederverwendbaren Komponenten |
| Integration mit Boilerplate | ✅ Kompatibel |

---

## 2. Use Cases

### 2.1 Wann macht eine UI Component Library Sinn?

| Use Case | Beschreibung | Empfehlung |
|----------|--------------|------------|
| **LAB Master Library** | Wiederverwendbare Komponenten für alle LAB-Projekte | ⭐⭐⭐ Hoch |
| **Design System Produkt** | LAB entwickelt nur das Design System (App/CMS durch andere Devs) | ⭐⭐⭐ Hoch |
| **Verteilte Systeme** | Web, Shop, Intranet, App, Microservices | ⭐⭐⭐ Hoch |
| **Web Apps** | Single Page Applications | ⭐⭐ Mittel |
| **UI Library Nutzung** | Material, Daisy, Preline, KoliBri | ⭐⭐ Mittel |
| **A11y Fokus** | Öffentlicher Sektor, WCAG-Compliance | ⭐⭐⭐ Hoch |
| **Einzelprojekt CMS** | Klassisches Statamic-Projekt | ⭐ Niedrig |

### 2.2 Use Case Details

#### Use Case 1: LAB Master Library

```
Komponenten entwickeln → NPM Package → Import in beliebige Projekte
```

**Vorteile:**
- Einheitliches Look & Feel
- A11y bereits integriert
- Microdata-Standards
- Framework-agnostisch (Web Components)

**Technologie:** Web Components mit Lit

#### Use Case 2: Design System als Produkt

```
Figma Design → Storybook → NPM Package → Kunde integriert selbst
```

**Vorteile:**
- Klare Trennung Design ↔ Implementierung
- Dokumentation inklusive
- Versionierung

#### Use Case 3: Microservices/Verteilte Systeme

```
Shared Components → NPM → Web | Shop | App | Intranet
```

**Beispiel Uni Münster** (Referenz: Orga #63729)

---

## 3. Technische Analyse

### 3.1 Storybook Architektur

```
┌─────────────────────────────────────────────────────────┐
│                     STORYBOOK                           │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Stories  │  │  Addons  │  │   Docs   │  │  Tests  │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
├─────────────────────────────────────────────────────────┤
│                    RENDERER                              │
│  ┌────────┐ ┌─────┐ ┌───────┐ ┌─────┐ ┌──────────────┐ │
│  │ React  │ │ Vue │ │Angular│ │ Lit │ │Web Components│ │
│  └────────┘ └─────┘ └───────┘ └─────┘ └──────────────┘ │
├─────────────────────────────────────────────────────────┤
│                     BUILDER                              │
│         ┌──────────┐        ┌──────────┐                │
│         │   Vite   │        │ Webpack  │                │
│         └──────────┘        └──────────┘                │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Unterstützte Frameworks

| Framework | Package | Status | Hot Reload |
|-----------|---------|--------|------------|
| React | @storybook/react | ✅ Stabil | ✅ |
| Vue 3 | @storybook/vue3 | ✅ Stabil | ✅ |
| Angular | @storybook/angular | ✅ Stabil | ✅ |
| Svelte | @storybook/svelte | ✅ Stabil | ✅ |
| Web Components | @storybook/web-components | ✅ Stabil | ⚠️ Full Reload |
| Lit | @storybook/lit | ✅ Stabil | ⚠️ Full Reload |
| HTML | @storybook/html | ✅ Stabil | ✅ |
| Nuxt 3 | @nuxtjs/storybook | ✅ Stabil | ✅ |
| Nuxt 4 | @nuxtjs/storybook | ❌ Nicht unterstützt | - |

### 3.3 Storybook Version

| Version | Status | Empfehlung |
|---------|--------|------------|
| Storybook 8.x | Stabil | ✅ Empfohlen |
| Storybook 9.x | Beta | ⚠️ Warten |
| Storybook 10.x | Alpha | ❌ Nicht für Produktion |

---

## 4. Implementierungsoptionen

### 4.1 Option A: Blast für Laravel/Blade (Statamic)

**Beschreibung:** Storybook-Integration speziell für Laravel Blade Templates

**Installation:**

```bash
# Composer Package installieren
composer require area17/blast

# Konfiguration veröffentlichen
php artisan vendor:publish --provider="A17\Blast\BlastServiceProvider" --tag="blast-config"

# Storybook starten
php artisan blast:launch
```

**Konfiguration (config/blast.php):**

```php
<?php

return [
    'storybook_server_url' => env('STORYBOOK_SERVER_URL', 'http://localhost:6006'),
    'storybook_statuses' => [
        'released' => ['background' => '#0000ff', 'color' => '#ffffff'],
        'deprecated' => ['background' => '#ff0000', 'color' => '#ffffff'],
        'wip' => ['background' => '#ffff00', 'color' => '#000000'],
    ],
    'build_timeout' => 300,
    'vendor_path' => resource_path('views/vendor'),
    'components_path' => resource_path('views/components'),
    'stories_path' => resource_path('views/stories'),
    'tailwind_config_path' => base_path('tailwind.config.js'),
    'assets' => [
        public_path('build/assets/app.css'),
        public_path('build/assets/app.js'),
    ],
];
```

**Story Beispiel (resources/views/stories/button.blade.php):**

```blade
@storybook([
    'name' => 'Button',
    'status' => 'released',
    'args' => [
        'label' => 'Click me',
        'variant' => 'primary',
        'disabled' => false,
    ],
    'argTypes' => [
        'variant' => [
            'control' => 'select',
            'options' => ['primary', 'secondary', 'danger'],
        ],
    ],
])

<x-button
    :variant="$variant"
    :disabled="$disabled"
>
    {{ $label }}
</x-button>
```

**Vorteile:**
- Native Blade-Integration
- Tailwind Auto-Detection
- Vite-kompatibel
- Einfache Installation

**Nachteile:**
- Nur für Laravel/Blade
- Keine NPM-Distribution der Komponenten
- Gebunden an Projekt

---

### 4.2 Option B: Web Components mit Lit (Master Library)

**Beschreibung:** Framework-agnostische Komponenten, die überall verwendet werden können

**Projektstruktur:**

```
lab-component-library/
├── .storybook/
│   ├── main.ts
│   ├── preview.ts
│   └── manager.ts
├── src/
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.ts
│   │   │   ├── button.styles.ts
│   │   │   └── button.stories.ts
│   │   ├── card/
│   │   └── index.ts
│   ├── tokens/
│   │   └── design-tokens.css
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

**Installation:**

```bash
# Projekt erstellen
npm create vite@latest lab-component-library -- --template lit-ts
cd lab-component-library

# Storybook initialisieren
npx storybook@latest init --builder @storybook/builder-vite

# Zusätzliche Addons
npm install -D @storybook/addon-a11y @storybook/addon-themes
```

**Storybook Konfiguration (.storybook/main.ts):**

```typescript
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
};

export default config;
```

**Preview Konfiguration (.storybook/preview.ts):**

```typescript
import type { Preview } from '@storybook/web-components';
import '../src/tokens/design-tokens.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--color-surface-primary, #ffffff)' },
        { name: 'dark', value: 'var(--color-surface-invert, #1a1a1a)' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

**Button Component (src/components/button/button.ts):**

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lab-button')
export class LabButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      padding: var(--spacing-scale-2, 8px) var(--spacing-scale-4, 16px);
      border-radius: var(--radius-md, 4px);
      border: none;
      cursor: pointer;
      font-family: var(--font-sans, system-ui);
      font-size: var(--typography-body-md-size, 16px);
      transition: background-color 0.2s ease;
    }

    button.primary {
      background-color: var(--color-state-emphasis-default, #0066cc);
      color: var(--color-text-default-invert, #ffffff);
    }

    button.primary:hover {
      background-color: var(--color-state-emphasis-hover, #0052a3);
    }

    button.secondary {
      background-color: var(--color-surface-secondary, #f0f0f0);
      color: var(--color-text-default-primary, #1a1a1a);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  @property({ type: String }) variant: 'primary' | 'secondary' = 'primary';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = '';

  render() {
    return html`
      <button
        class="${this.variant}"
        ?disabled="${this.disabled}"
        @click="${this._handleClick}"
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('lab-click', {
        detail: { originalEvent: e },
        bubbles: true,
        composed: true,
      }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lab-button': LabButton;
  }
}
```

**Button Story (src/components/button/button.stories.ts):**

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button';

const meta: Meta = {
  title: 'Components/Button',
  component: 'lab-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Button variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Button label',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A reusable button component with multiple variants.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
    disabled: false,
  },
  render: (args) => html`
    <lab-button
      variant="${args.variant}"
      ?disabled="${args.disabled}"
      label="${args.label}"
    ></lab-button>
  `,
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
    disabled: false,
  },
  render: (args) => html`
    <lab-button
      variant="${args.variant}"
      ?disabled="${args.disabled}"
      label="${args.label}"
    ></lab-button>
  `,
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: 'Disabled Button',
    disabled: true,
  },
  render: (args) => html`
    <lab-button
      variant="${args.variant}"
      ?disabled="${args.disabled}"
      label="${args.label}"
    ></lab-button>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <lab-button variant="primary" label="Primary"></lab-button>
      <lab-button variant="secondary" label="Secondary"></lab-button>
      <lab-button variant="primary" label="Disabled" disabled></lab-button>
    </div>
  `,
};
```

**Package.json für NPM Distribution:**

```json
{
  "name": "@lab/component-library",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./button": {
      "import": "./dist/components/button/button.js",
      "types": "./dist/components/button/button.d.ts"
    }
  },
  "files": [
    "dist",
    "!dist/**/*.stories.*"
  ],
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build -o storybook-static",
    "chromatic": "chromatic --project-token=${CHROMATIC_TOKEN}",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "lit": "^3.0.0"
  },
  "devDependencies": {
    "lit": "^3.1.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@storybook/web-components-vite": "^8.0.0",
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/addon-a11y": "^8.0.0",
    "chromatic": "^11.0.0"
  }
}
```

**Vorteile:**
- Framework-agnostisch
- NPM-publishable
- Wiederverwendbar in jedem Projekt
- Design Tokens integriert

**Nachteile:**
- Lernkurve für Lit
- Kein Hot Reload
- Separates Repository notwendig

---

### 4.3 Option C: Vue Component Library

**Installation:**

```bash
npm create vite@latest lab-vue-components -- --template vue-ts
cd lab-vue-components
npx storybook@latest init
```

**Konfiguration (.storybook/main.ts):**

```typescript
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
};

export default config;
```

---

## 5. Design Tokens Integration

### 5.1 Aktueller Workflow im Boilerplate

```
┌─────────────┐     ┌───────────────┐     ┌──────────────────┐
│   Figma     │ --> │ Tokens Studio │ --> │ JSON Export      │
│             │     │ (Plugin)      │     │                  │
└─────────────┘     └───────────────┘     └────────┬─────────┘
                                                    │
                                                    v
                    ┌───────────────────────────────────────────┐
                    │ .bin/utils/import-design-tokens           │
                    │ scripts/import-style-tokens.js            │
                    └───────────────────────────────┬───────────┘
                                                    │
                                                    v
                    ┌───────────────────────────────────────────┐
                    │ resources/css/design_tokens.css           │
                    │ - @theme variables                        │
                    │ - CSS Custom Properties                   │
                    │ - Tailwind v4 kompatibel                  │
                    └───────────────────────────────────────────┘
```

### 5.2 Integration mit Storybook

**Schritt 1: Design Tokens in Storybook importieren**

```typescript
// .storybook/preview.ts
import '../resources/css/design_tokens.css';
import '../resources/css/tailwind.css';
```

**Schritt 2: Theme Switcher konfigurieren**

```typescript
// .storybook/preview.ts
export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: 'var(--color-surface-primary)' },
      { name: 'dark', value: 'var(--color-surface-invert)' },
    ],
  },
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    return Story();
  },
];
```

### 5.3 Automatisierte Token-Synchronisation

```yaml
# .gitlab-ci.yml
sync-tokens:
  stage: build
  image: node:20
  script:
    - npm ci
    - ./.bin/utils/import-design-tokens ./figma-tokens-export
    - npm run build-storybook
  only:
    changes:
      - figma-tokens-export/**/*.json
  artifacts:
    paths:
      - resources/css/design_tokens.css
      - storybook-static/
```

---

## 6. Chromatic Analyse

### 6.1 Was ist Chromatic?

Chromatic ist ein Cloud-basierter Wrapper für Storybook, der Builds, Tests, Versionen und Änderungen in einem Dashboard zur Verfügung stellt.

### 6.2 Features

| Feature | Beschreibung | Free | Pro ($179/mo) | Enterprise ($399/mo) |
|---------|--------------|------|---------------|----------------------|
| **Storybook Hosting** | Cloud-Hosting | ✅ | ✅ | ✅ |
| **Visual Testing** | Screenshot-Vergleiche | ✅ 5k/mo | ✅ 35k/mo | ✅ Unlimited |
| **UI Review** | Änderungs-Review | ✅ | ✅ | ✅ |
| **Cross-Browser** | Chrome, Firefox, Safari | ❌ | ✅ | ✅ |
| **A11y Testing** | Accessibility-Tests | ❌ | ✅ | ✅ |
| **Custom Domain** | Eigene Domain | ❌ | ❌ | ✅ |
| **SSO** | Single Sign-On | ❌ | ❌ | ✅ |
| **SLA** | Verfügbarkeitsgarantie | ❌ | ❌ | ✅ |

### 6.3 Chromatic Setup

```bash
# Installation
npm install -D chromatic

# Projekt verbinden
npx chromatic --project-token=<token>
```

**GitLab CI Integration:**

```yaml
chromatic:
  stage: test
  image: node:20
  variables:
    GIT_DEPTH: 0
  script:
    - npm ci
    - npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN --exit-zero-on-changes
  only:
    - develop
    - main
    - merge_requests
  interruptible: true
```

### 6.4 Alternative: GitLab Pages (Kostenlos)

```yaml
pages:
  stage: deploy
  image: node:20
  script:
    - npm ci
    - npm run build-storybook
    - mv storybook-static public
  artifacts:
    paths:
      - public
  only:
    - main
```

**URL:** `https://<gruppe>.gitlab.io/<projekt>/`

---

## 7. GitLab CI/CD Automatisierung

### 7.1 Vollständige Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - install
  - tokens
  - build
  - test
  - deploy

variables:
  GIT_DEPTH: 0
  NODE_VERSION: "20"

# Cache für npm
.npm-cache: &npm-cache
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
    policy: pull-push

# ============================================
# INSTALL
# ============================================
install:
  stage: install
  image: node:${NODE_VERSION}
  <<: *npm-cache
  script:
    - npm ci
  only:
    - develop
    - main
    - merge_requests

# ============================================
# DESIGN TOKENS
# ============================================
sync-design-tokens:
  stage: tokens
  image: node:${NODE_VERSION}
  <<: *npm-cache
  script:
    - npm ci
    - |
      if [ -d "figma-tokens-export" ]; then
        ./.bin/utils/import-design-tokens ./figma-tokens-export
      fi
  artifacts:
    paths:
      - resources/css/design_tokens.css
    expire_in: 1 hour
  only:
    changes:
      - figma-tokens-export/**/*
  allow_failure: true

# ============================================
# BUILD
# ============================================
build-storybook:
  stage: build
  image: node:${NODE_VERSION}
  <<: *npm-cache
  script:
    - npm ci
    - npm run build-storybook
  artifacts:
    paths:
      - storybook-static/
    expire_in: 1 week
  only:
    - develop
    - main
    - merge_requests

build-components:
  stage: build
  image: node:${NODE_VERSION}
  <<: *npm-cache
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - tags

# ============================================
# TEST
# ============================================
test-a11y:
  stage: test
  image: node:${NODE_VERSION}
  <<: *npm-cache
  script:
    - npm ci
    - npx test-storybook --url http://localhost:6006
  services:
    - name: node:${NODE_VERSION}
      alias: storybook
      command: ["npm", "run", "storybook", "--", "--ci"]
  allow_failure: true
  only:
    - develop
    - main
    - merge_requests

chromatic:
  stage: test
  image: node:${NODE_VERSION}
  <<: *npm-cache
  script:
    - npm ci
    - npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN --exit-zero-on-changes
  only:
    - develop
    - main
  when: manual
  allow_failure: true

# ============================================
# DEPLOY
# ============================================
pages:
  stage: deploy
  image: node:${NODE_VERSION}
  script:
    - mv storybook-static public
  artifacts:
    paths:
      - public
  dependencies:
    - build-storybook
  only:
    - main

publish-npm:
  stage: deploy
  image: node:${NODE_VERSION}
  <<: *npm-cache
  script:
    - npm ci
    - echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
    - npm publish --access public
  dependencies:
    - build-components
  only:
    - tags
  when: manual
```

### 7.2 Pipeline Übersicht

```
┌──────────┐   ┌────────┐   ┌───────┐   ┌──────┐   ┌────────┐
│ Install  │ → │ Tokens │ → │ Build │ → │ Test │ → │ Deploy │
└──────────┘   └────────┘   └───────┘   └──────┘   └────────┘
                   │             │           │          │
                   │             │           │          ├─ GitLab Pages
                   │             │           │          └─ NPM Publish
                   │             │           │
                   │             │           ├─ A11y Tests
                   │             │           └─ Chromatic
                   │             │
                   │             ├─ Storybook
                   │             └─ Components (Dist)
                   │
                   └─ Design Tokens CSS
```

---

## 8. Figma Integration

### 8.1 Storybook Connect (Chromatic)

**Voraussetzungen:**
- Chromatic Account
- Figma Plugin "Storybook Connect"

**Workflow:**
1. Stories werden in Chromatic gehostet
2. Designer installiert Figma Plugin
3. Links werden manuell für jedes Element eingefügt
4. Devs sehen Figma-Stand, Designer sehen Storybook-Stand

**Bewertung:**
- ⚠️ Manuelles Linking erforderlich
- ⚠️ Plugin nicht mehr aktiv gepflegt (>7 Monate)
- ✅ Bidirektionale Ansicht

### 8.2 Designs Addon (Kostenlos)

```bash
npm install -D @storybook/addon-designs
```

```typescript
// .storybook/main.ts
addons: ['@storybook/addon-designs']
```

```typescript
// Button.stories.ts
export const Primary = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xxx/Design-System?node-id=123',
    },
  },
};
```

### 8.3 story.to.design

**Features:**
- Generiert Figma-Komponenten aus Storybook
- Unterstützt Design Tokens
- Bidirektional

**Workflow:**
```
Storybook → story.to.design → Figma Components
```

### 8.4 Anima

```bash
npm install -D storybook-anima
```

```typescript
// .storybook/preview.ts
export const parameters = {
  anima: {
    designTokens: './tokens/design-tokens.json',
  },
};
```

---

## 9. Testing & Qualitätssicherung

### 9.1 A11y Testing

**Addon installieren:**

```bash
npm install -D @storybook/addon-a11y
```

**Konfiguration:**

```typescript
// .storybook/main.ts
addons: ['@storybook/addon-a11y']
```

**Story-Level Konfiguration:**

```typescript
export const Primary = {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'landmark-one-main', enabled: false },
        ],
      },
    },
  },
};
```

### 9.2 Visual Regression Testing

**Lokal (test-storybook):**

```bash
npm install -D @storybook/test-runner playwright

# Tests ausführen
npx test-storybook
```

**Chromatic (Cloud):**

```bash
npx chromatic --project-token=xxx
```

**Vergleich:**

| Aspekt | test-storybook | Chromatic |
|--------|----------------|-----------|
| Kosten | Kostenlos | Ab Free (5k snapshots) |
| Cross-Browser | Nur lokal installierte | Chrome, Firefox, Safari |
| CI Integration | Manuell | Out-of-the-box |
| Diff UI | Terminal | Web Dashboard |
| Review Workflow | ❌ | ✅ |

### 9.3 Interaction Testing

```typescript
// Button.stories.ts
import { within, userEvent, expect } from '@storybook/test';

export const ClickTest = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);

    await expect(button).toHaveAttribute('aria-pressed', 'true');
  },
};
```

---

## 10. Kostenanalyse

### 10.1 Tooling Kosten

| Tool | Free | Pro | Enterprise |
|------|------|-----|------------|
| **Storybook** | ✅ Kostenlos | - | - |
| **Chromatic** | 5k snapshots/mo | $179/mo | $399/mo |
| **GitLab Pages** | ✅ Kostenlos | - | - |
| **Figma Plugins** | ✅ Kostenlos | - | - |

### 10.2 Aufwand Schätzung

| Phase | Aufwand | Beschreibung |
|-------|---------|--------------|
| Initial Setup | 2-4 Tage | Storybook, CI/CD, erste Komponenten |
| Pro Komponente | 2-4 Stunden | Story, Dokumentation, Tests |
| Maintenance | 1-2 h/Woche | Updates, Fixes |
| Design Token Sync | 1 Tag (einmalig) | Pipeline-Integration |

### 10.3 ROI Betrachtung

**Lohnt sich bei:**
- > 5 Projekten mit gleichen Komponenten
- Microservices-Architektur
- Design System als Produkt
- Hohe A11y-Anforderungen

**Lohnt sich weniger bei:**
- Einzelprojekten
- Sehr spezifischen Designs ohne Wiederverwendung

---

## 11. Empfehlungen

### 11.1 Für LAB Standard-Projekte (Statamic)

| Komponente | Empfehlung |
|------------|------------|
| Storybook | Blast (Laravel/Blade) |
| Hosting | GitLab Pages |
| Design Tokens | Bestehender import-style-tokens.js |
| Testing | Lokal + A11y Addon |
| Chromatic | Nur bei größeren Projekten |

### 11.2 Für Master Library / Design System

| Komponente | Empfehlung |
|------------|------------|
| Technologie | Web Components (Lit) |
| Storybook | @storybook/web-components-vite |
| Distribution | NPM Package |
| Hosting | GitLab Pages + Chromatic (optional) |
| Testing | Chromatic Pro |

### 11.3 Für Microservices / Verteilte Systeme

| Komponente | Empfehlung |
|------------|------------|
| Technologie | Web Components (Lit) |
| Distribution | Private NPM Registry |
| Testing | Chromatic Pro |
| Versionierung | Semantic Versioning |

---

## 12. Implementierungsplan

### Phase 1: Proof of Concept (1 Woche)

- [ ] Storybook im Boilerplate installieren (Blast oder HTML)
- [ ] 3-5 Basis-Komponenten erstellen
- [ ] Design Tokens integrieren
- [ ] Lokal testen

### Phase 2: CI/CD Integration (1 Woche)

- [ ] GitLab Pages konfigurieren
- [ ] Build-Pipeline erstellen
- [ ] A11y-Tests integrieren
- [ ] Dokumentation

### Phase 3: Rollout (2 Wochen)

- [ ] Team-Schulung
- [ ] Weitere Komponenten hinzufügen
- [ ] Chromatic evaluieren
- [ ] KB-Eintrag erstellen

### Phase 4: Optimierung (Ongoing)

- [ ] Performance-Optimierung
- [ ] Cross-Browser-Testing (wenn nötig)
- [ ] NPM-Publishing (wenn Master Library)

---

## 13. Referenzen

### Offizielle Dokumentation

- [Storybook Docs](https://storybook.js.org/docs)
- [Chromatic Docs](https://www.chromatic.com/docs/)
- [Lit Documentation](https://lit.dev/docs/)
- [Blast for Laravel](https://github.com/area17/blast)

### Integrationen

- [Storybook + Tailwind CSS](https://storybook.js.org/recipes/tailwindcss)
- [Storybook + Figma](https://storybook.js.org/docs/sharing/design-integrations)
- [Chromatic + GitLab](https://www.chromatic.com/docs/gitlab/)
- [Design Token Automation](https://matthewrea.com/blog/design-token-automation-from-figma-to-storybook/)

### Beispiele & Showcases

- [Storybook Showcase](https://storybook.js.org/showcase)
- [Telekom Scale Design System](https://telekom.github.io/scale/)
- [KoliBri (A11y)](https://public-ui.github.io/)
- [Lit + Vite + Storybook](https://github.com/leon/blog-vite-lit-storybook)
- [Design Tokens + Storybook](https://github.com/joshdstockdale/lit-vite-tailwind-storybook-design-tokens)

### Verwandte Tickets

- Design #63761: Design-Tokens für effizientere Dev-Handoff nutzbar machen
- Design #64487: Figma Webdesign Workflow: KB-Eintrag aktualisieren
- Feature #63772: Design to Code via Figma MCP Server testen
- Feature #64910: Storybook im Web zugänglich machen

---

## Anhang A: Aktuelle Storybook-Instanz

**Live Demo:** https://695e7f011d92a9a88b0a5280-cmncvhtjef.chromatic.com/

**Repository:** https://github.com/laborb/storybook

**Chromatic Login:** Bitwarden → chromatic.com dev-user

---

## Anhang B: Checkliste für neue Projekte

```markdown
## Storybook Setup Checkliste

### Voraussetzungen
- [ ] Node.js 18+
- [ ] npm oder yarn
- [ ] Git Repository

### Installation
- [ ] Storybook initialisiert
- [ ] Addons installiert (essentials, a11y, themes)
- [ ] Design Tokens importiert
- [ ] Tailwind konfiguriert

### Komponenten
- [ ] Basis-Komponenten erstellt (Button, Card, Input)
- [ ] Stories geschrieben
- [ ] Dokumentation hinzugefügt
- [ ] A11y-Tests bestanden

### CI/CD
- [ ] Build-Pipeline konfiguriert
- [ ] GitLab Pages aktiviert
- [ ] (Optional) Chromatic verbunden

### Dokumentation
- [ ] README aktualisiert
- [ ] Contribution Guide erstellt
- [ ] Team informiert
```
