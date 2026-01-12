# Google AI Pro - Integración con Design System Pipeline

Guía completa para aprovechar tu suscripción Google AI Pro ($19.99/mes) en el flujo de trabajo del Design System.

---

## Beneficios de Google AI Pro para Desarrolladores

| Herramienta | Límites Pro | Uso en Design System |
|-------------|-------------|---------------------|
| **Jules** | 100 tareas/día, 15 concurrentes | Fixes automáticos, tests, upgrades |
| **Gemini CLI** | Límites altos | Terminal integration |
| **Gemini Code Assist** | Límites altos | VS Code/JetBrains |
| **NotebookLM** | 20 Audio Overviews/día, 500 notebooks | Documentación, research |
| **Gemini 3 Pro** | Acceso completo | Modelo más inteligente |
| **AI Studio** | API access | Integraciones custom |
| **1,000 AI Credits** | Mensual | Video/imagen generation |

---

## Arquitectura de Integración

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DESIGN SYSTEM PIPELINE + GOOGLE AI PRO                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   STITCH    │───▶│   GITHUB    │───▶│   JULES     │───▶│   DEPLOY    │  │
│  │ UI Generate │    │  PR/Branch  │    │  Auto-Fix   │    │  Production │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘  │
│        │                  │                  │                  │          │
│        │                  │                  │                  │          │
│        ▼                  ▼                  ▼                  ▼          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   TOKENS    │    │   CI/CD     │    │  AGENTS.md  │    │  STORYBOOK  │  │
│  │ Design Sys  │    │  A11y Check │    │  Contexto   │    │   Deploy    │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    HERRAMIENTAS DE DESARROLLO                       │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  Gemini CLI    │  Code Assist  │  NotebookLM   │   AI Studio        │   │
│  │  (Terminal)    │  (VS Code)    │  (Research)   │   (API/Agents)     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Jules - Automatización de Código

### Dashboard
```
https://jules.google.com/repo/github/limbpuma/design-system-pipeline/
```

### Límites con AI Pro
- **100 tareas/día** (vs 15 gratis)
- **15 tareas concurrentes** (vs 3 gratis)
- **Gemini 3 Pro** para mejor razonamiento

### Configuración de Scheduled Tasks

#### Task 1: Validación A11y Diaria (Recomendado)
```yaml
Nombre: Daily A11y Validation
Frecuencia: Diaria (6:00 AM)
Prompt: |
  Run npm run a11y:validate on all story files in src/.

  If ANY critical or serious accessibility errors are found:
  1. Read docs/accessibility/A11Y-ERROR-GUIDE.md for fix patterns
  2. Apply fixes following the documented patterns
  3. Create a PR titled "fix(a11y): [date] automated accessibility fixes"
  4. Include a summary of all fixes in the PR description

  Common patterns to apply:
  - dark:text-slate-500 → dark:text-slate-400 (contrast)
  - Add aria-label to icon-only buttons
  - Add aria-hidden="true" to decorative SVGs
  - Add tabIndex={0} role="region" to scrollable areas

  If no errors found, skip PR creation.
```

#### Task 2: Dependency Updates Semanal
```yaml
Nombre: Weekly Dependency Check
Frecuencia: Semanal (Domingo 2:00 AM)
Prompt: |
  Check for outdated dependencies:
  1. Run npm outdated
  2. Update ONLY minor and patch versions (not major)
  3. Run npm run build to verify
  4. Run npm run test to verify
  5. Run npm run a11y:validate to verify

  If all checks pass, create PR with:
  - Title: "chore(deps): weekly dependency updates"
  - Body: List of updated packages with version changes

  If any check fails, do NOT create PR.
```

#### Task 3: Storybook Build Verification
```yaml
Nombre: Nightly Build Check
Frecuencia: Diaria (3:00 AM)
Prompt: |
  Run the full pipeline check:
  1. npm run tokens:build
  2. npm run build:storybook
  3. npm run lint

  If any step fails:
  1. Analyze the error
  2. If it's a simple fix, apply it and create PR
  3. If complex, create an Issue with error details

  Reference AGENTS.md for project conventions.
```

### Uso con GitHub Issues

Agrega el label `jules` a cualquier issue:

```markdown
## Issue: Add dark mode support to new component

The FilterDropdown component needs dark mode styles.

Requirements:
- Use semantic tokens from tokens/semantic/colors.json
- Follow contrast patterns in A11Y-ERROR-GUIDE.md
- Include Storybook stories with dark mode toggle

Labels: jules, enhancement, component
```

### Jules CLI (Terminal)

```bash
# Instalar
npm install -g @google/jules

# Crear tarea desde terminal
npx @google/jules remote new "Fix all color-contrast errors in src/components"

# Listar tareas activas
npx @google/jules remote list

# Ver estado de tarea
npx @google/jules remote status <task-id>

# Aplicar cambios localmente (para revisar antes de PR)
npx @google/jules remote apply <task-id>

# Dashboard interactivo
npx @google/jules
```

---

## 2. Stitch - Generación de UI

### URL
```
https://stitch.withgoogle.com/
```

### Flujo Optimizado para Design System

#### Paso 1: Preparar Contexto
Copia el contenido de `docs/STITCH-SYSTEM-PROMPT.md` antes de tu prompt.

#### Paso 2: Prompt Structure
```
CONTEXTO DE DESIGN SYSTEM:
[pegar contenido de STITCH-SYSTEM-PROMPT.md]

---

GENERAR:
[Tu solicitud específica]

REQUISITOS:
- Seguir los colores semánticos del contexto
- Contraste mínimo 4.5:1 (WCAG AA)
- Incluir soporte dark mode con inversión correcta
- Agregar aria-labels a botones icon-only
- Usar patrones CVA para variantes
```

#### Paso 3: Exportar a GitHub
1. En Stitch, selecciona "Export to GitHub"
2. Selecciona repo: `limbpuma/design-system-pipeline`
3. Crea nueva branch: `stitch/[nombre-descriptivo]`
4. Stitch crea PR automáticamente

#### Paso 4: Validación Automática
1. GitHub Actions ejecuta `a11y-validation.yml`
2. Si hay errores, agrega label `jules`
3. Jules aplica fixes automáticamente
4. PR actualizado y listo para review

### Ejemplos de Prompts Efectivos

```
GENERAR: Dashboard de métricas para Design System con:
- KPI cards mostrando: componentes, cobertura a11y, tokens
- Gráfico de progreso de accesibilidad
- Lista de issues pendientes
- Modo claro y oscuro

COMPONENTES EXISTENTES A USAR:
- Card (src/components/Card)
- Button (src/components/Button)
- Tabs (src/components/Tabs)

ESTILO:
- Layout responsive (mobile-first)
- Espaciado consistente con tokens
- Sombras sutiles (shadow-md)
```

---

## 3. Gemini Code Assist (VS Code)

### Instalación
```
1. VS Code Extensions → buscar "Gemini Code Assist"
2. Instalar extensión oficial de Google
3. Sign in con tu cuenta Google AI Pro
```

### Configuración para Design System

Crear `.vscode/settings.json`:
```json
{
  "gemini.codeAssist.enable": true,
  "gemini.codeAssist.suggestions": {
    "enabled": true,
    "triggerMode": "automatic"
  },
  "gemini.workspace.contextFiles": [
    "AGENTS.md",
    "docs/STITCH-SYSTEM-PROMPT.md",
    "docs/accessibility/A11Y-ERROR-GUIDE.md"
  ]
}
```

### Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `Ctrl+I` | Chat inline con Gemini |
| `Ctrl+Shift+I` | Panel de chat completo |
| `/explain` | Explicar código seleccionado |
| `/fix` | Sugerir fix para error |
| `/test` | Generar tests |
| `/docs` | Generar documentación |

### Prompts Contextuales

```
@workspace /fix Este componente tiene errores de accesibilidad.
Revisa A11Y-ERROR-GUIDE.md y aplica los patrones correctos.
```

```
@workspace /test Genera tests de accesibilidad para este
componente usando @testing-library/react y jest-dom.
```

---

## 4. Gemini CLI (Terminal)

### Instalación
```bash
npm install -g @anthropic/gemini-cli
# o
brew install google/gemini-cli
```

### Uso con Design System

```bash
# Análisis de accesibilidad
gemini "Analiza src/components/Button/Button.tsx y sugiere
mejoras de accesibilidad según WCAG 2.1 AA"

# Generación de componente
gemini "Genera un componente Tooltip siguiendo los patrones
de src/components/Button/Button.tsx y usando CVA"

# Review de PR
gemini "Revisa los cambios en git diff HEAD~1 y verifica
que cumplen con las reglas de AGENTS.md"

# Debug de error
gemini "Este error aparece al ejecutar npm run a11y:validate:
[pegar error]. ¿Cómo lo corrijo?"
```

### Script de Integración

Crear `scripts/gemini-review.sh`:
```bash
#!/bin/bash
# Usar Gemini CLI para revisar cambios antes de commit

CHANGES=$(git diff --cached --name-only)

if [ -z "$CHANGES" ]; then
  echo "No hay cambios staged"
  exit 0
fi

echo "🔍 Revisando cambios con Gemini..."

gemini "Revisa estos archivos modificados y verifica:
1. Accesibilidad según A11Y-ERROR-GUIDE.md
2. Patrones según AGENTS.md
3. Tokens semánticos correctos

Archivos: $CHANGES

Responde con PASS si todo está bien, o lista los problemas."
```

---

## 5. NotebookLM (Documentación/Research)

### URL
```
https://notebooklm.google.com/
```

### Uso para Design System

#### Notebook 1: Design System Knowledge Base
```
Fuentes a agregar:
- AGENTS.md
- docs/STITCH-SYSTEM-PROMPT.md
- docs/accessibility/A11Y-ERROR-GUIDE.md
- tokens/semantic/colors.json
- README.md

Usar para:
- Consultas rápidas sobre tokens
- Explicaciones de patrones
- Onboarding de nuevos contribuidores
```

#### Notebook 2: WCAG Reference
```
Fuentes:
- WCAG 2.1 Guidelines (URL)
- axe-core rules documentation (URL)
- A11Y-ERROR-GUIDE.md

Usar para:
- Entender criterios específicos
- Encontrar soluciones a errores
- Crear Audio Overviews para training
```

#### Audio Overviews (20/día con Pro)
Generar podcasts explicativos sobre:
- "Cómo funciona el sistema de tokens"
- "Errores de accesibilidad comunes y soluciones"
- "Guía de contribución al Design System"

---

## 6. AI Studio (Agentes Personalizados)

### URL
```
https://aistudio.google.com/
```

### Crear Agente "Design System Expert"

```
System Instructions:

You are a Design System expert for the limbpuma/design-system-pipeline project.

Your knowledge includes:
- All design tokens (colors, spacing, typography) from tokens/
- WCAG 2.1 AA accessibility requirements
- Component patterns (Button, Card, Input, Dialog, Tabs, etc.)
- Tailwind CSS conventions with semantic tokens
- CVA (class-variance-authority) patterns

When asked to create or review components:
1. ALWAYS use semantic color tokens, never arbitrary colors
2. Ensure minimum 4.5:1 contrast ratio for text
3. Include proper ARIA attributes for accessibility
4. Support dark mode with correct color inversions
5. Follow CVA pattern for variants

Critical contrast rules:
- Light mode muted text: text-slate-500 (5.5:1 on white)
- Dark mode muted text: text-slate-400 (5.4:1 on slate-900)
- NEVER use text-slate-500 in dark mode (only 3.75:1)

Reference files in the repository:
- tokens/semantic/colors.json
- docs/STITCH-SYSTEM-PROMPT.md
- docs/accessibility/A11Y-ERROR-GUIDE.md
- AGENTS.md
```

### Crear API Key para Automatización

1. AI Studio → "Get API Key"
2. Crear nuevo proyecto o usar existente
3. Copiar API key
4. Usar en scripts de automatización

### Script de Validación con Gemini API

```javascript
// scripts/gemini-validate.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function validateComponent(code) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Analiza este componente React y verifica:
    1. Cumple WCAG 2.1 AA
    2. Usa tokens semánticos
    3. Soporta dark mode correctamente
    4. Tiene aria-labels apropiados

    Código:
    ${code}

    Responde en JSON:
    {
      "passed": boolean,
      "issues": ["lista de problemas"],
      "suggestions": ["lista de mejoras"]
    }
  `;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
```

---

## 7. Flujo de Trabajo Integrado

### Día Típico con Google AI Pro

```
08:00 - Jules completó Task nocturna
        → Revisar PRs automáticos de a11y fixes

09:00 - Nuevo feature request
        → Usar Stitch para generar UI base
        → Exportar a GitHub como PR

10:00 - Refinar código en VS Code
        → Gemini Code Assist sugiere mejoras
        → /fix para corregir errores detectados

12:00 - PR listo para review
        → CI ejecuta a11y-validation
        → Si falla, Jules auto-fix

14:00 - Documentar nuevo componente
        → NotebookLM genera Audio Overview
        → Actualizar docs con ayuda de Gemini

16:00 - Planificar siguiente sprint
        → Crear Issues con label "jules"
        → Configurar Scheduled Tasks para weekend
```

### Comandos Rápidos

```bash
# Validar antes de commit
npm run a11y:validate

# Crear tarea para Jules
npx @google/jules remote new "Fix contrast errors in ChatMessage"

# Review con Gemini CLI
gemini "Review $(git diff --cached)"

# Build completo
npm run pipeline:check
```

---

## 8. Métricas y Monitoreo

### KPIs a Trackear

| Métrica | Target | Herramienta |
|---------|--------|-------------|
| A11y Score | 100% pass | a11y-validator |
| Auto-fixes/semana | 10+ | Jules dashboard |
| PRs desde Stitch | 5+/mes | GitHub insights |
| Tiempo fix promedio | <2 horas | Jules metrics |

### Dashboard Jules
```
https://jules.google.com/repo/github/limbpuma/design-system-pipeline/metrics
```

---

## 9. Checklist de Setup Completo

### Configuración Inicial
- [x] Cuenta Google AI Pro activa
- [x] Repo conectado a Jules
- [x] AGENTS.md en raíz del repo
- [ ] Scheduled Tasks configuradas (3 tareas)
- [ ] Label "jules" creado en GitHub
- [ ] Gemini Code Assist en VS Code
- [ ] Gemini CLI instalado
- [ ] NotebookLM notebooks creados
- [ ] AI Studio agent configurado

### Verificación
```bash
# Verificar Jules CLI
npx @google/jules --version

# Verificar Gemini CLI
gemini --version

# Verificar conexión
npx @google/jules remote list
```

---

## 10. Troubleshooting

### Jules no procesa Issue
1. Verificar que label "jules" está aplicado
2. Verificar que Issue tiene descripción clara
3. Revisar logs en Jules dashboard

### Stitch genera código con errores de a11y
1. Verificar que incluiste el contexto de STITCH-SYSTEM-PROMPT.md
2. Ser más específico en el prompt sobre requisitos de contraste
3. Dejar que Jules corrija automáticamente

### Gemini Code Assist no sugiere
1. Verificar sign-in con cuenta AI Pro
2. Verificar archivos de contexto en settings.json
3. Reiniciar VS Code

---

## Recursos

- [Jules Documentation](https://jules.google/)
- [Stitch](https://stitch.withgoogle.com/)
- [AI Studio](https://aistudio.google.com/)
- [Gemini Code Assist](https://cloud.google.com/gemini/docs/codeassist)
- [NotebookLM](https://notebooklm.google.com/)
- [Google AI Pro Features](https://one.google.com/about/google-ai-plans/)
