# Google AI Ecosystem Integration

Guía para integrar el Design System con el ecosistema de herramientas AI de Google.

## Herramientas Disponibles

| Herramienta | Propósito | URL |
|-------------|-----------|-----|
| **Jules** | Agente de código autónomo | https://jules.google.com/repo/github/limbpuma/design-system-pipeline/ |
| **Stitch** | Generación de UI con IA | https://stitch.withgoogle.com/ |
| **AI Studio** | Desarrollo con Gemini API | https://aistudio.google.com/ |
| **Firebase Studio** | Desarrollo de apps | https://firebase.google.com/studio |

---

## 1. Jules - Agente de Código

### Dashboard del Repo
```
https://jules.google.com/repo/github/limbpuma/design-system-pipeline/
```

### AGENTS.md (Configuración del Repo)

Jules lee automáticamente el archivo `AGENTS.md` en la raíz del repo para entender:
- Comandos de build y test
- Estructura del proyecto
- Patrones de accesibilidad requeridos
- Reglas de design tokens
- Workflow de git

**Archivo:** `/AGENTS.md`

### Instalación CLI
```bash
npm install -g @google/jules
# o
npx @google/jules
```

### Scheduled Tasks (Tareas Programadas)

Configurar en el tab "Scheduled" del dashboard:

#### Tarea 1: Validación de Accesibilidad Semanal
```
Nombre: Weekly A11y Audit
Frecuencia: Semanal (Lunes 9:00 AM)
Prompt:
  Run npm run a11y:validate on all story files.
  If any critical or serious errors are found, create a PR
  with fixes following the patterns in docs/accessibility/A11Y-ERROR-GUIDE.md.
  Focus on color contrast issues (use text-slate-500 dark:text-slate-400 pattern).
```

#### Tarea 2: Actualización de Dependencias Mensual
```
Nombre: Monthly Dependency Update
Frecuencia: Mensual (1er día)
Prompt:
  Check for outdated dependencies using npm outdated.
  Update minor and patch versions.
  Run tests and build to verify nothing breaks.
  Create PR with changelog of updated packages.
```

#### Tarea 3: Lint Fix Diario
```
Nombre: Nightly Lint Fix
Frecuencia: Diario (2:00 AM)
Prompt:
  Run npm run lint -- --fix on all source files.
  If any files were modified, create a PR with the fixes.
  Skip if no issues found.
```

### Uso con Issues de GitHub

Agrega el label `jules` a cualquier issue para que Jules lo trabaje:

```markdown
## Issue: Fix contrast in ChatMessage component

The timestamp text has insufficient contrast in dark mode.
Current: text-slate-500
Should be: text-slate-400

Label: jules, accessibility, bug
```

Jules automáticamente:
1. Lee el issue
2. Clona el repo en una VM
3. Crea un plan
4. Implementa el fix
5. Abre un PR

---

## 2. Stitch → Jules Flow

### Flujo Automatizado

```
┌─────────────────────────────────────────────────────────────────┐
│                 STITCH → JULES → DEPLOY                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. STITCH: Generas UI con prompt + Design System context       │
│     ↓                                                           │
│  2. STITCH: Exportas a GitHub (crea branch/PR)                  │
│     ↓                                                           │
│  3. GITHUB ACTIONS: Ejecuta a11y-validation.yml                 │
│     ↓                                                           │
│  4. Si hay errores → JULES recibe tarea automática              │
│     ↓                                                           │
│  5. JULES: Aplica fixes según A11Y-ERROR-GUIDE.md               │
│     ↓                                                           │
│  6. JULES: Actualiza el PR con correcciones                     │
│     ↓                                                           │
│  7. GITHUB ACTIONS: Re-valida → Pasa ✅                         │
│     ↓                                                           │
│  8. Ready to merge                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Configurar GitHub Action para Trigger Jules

Agregar al workflow `.github/workflows/a11y-validation.yml`:

```yaml
  # Después del job de validación, si falla:
  auto-fix-with-jules:
    name: Auto-fix with Jules
    runs-on: ubuntu-latest
    needs: a11y-validation
    if: failure()

    steps:
      - name: Trigger Jules Fix
        uses: actions/github-script@v7
        with:
          script: |
            // Agregar label 'jules' al PR para que Jules lo procese
            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              labels: ['jules', 'a11y-autofix']
            });

            // Agregar comentario con instrucciones para Jules
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `## 🤖 Jules Auto-Fix Requested

              @jules please fix the accessibility errors in this PR.

              **Instructions:**
              1. Read the a11y validation results above
              2. Apply fixes following \`docs/accessibility/A11Y-ERROR-GUIDE.md\`
              3. Common fixes:
                 - \`dark:text-slate-500\` → \`dark:text-slate-400\`
                 - Add \`aria-label\` to icon buttons
                 - Add \`aria-hidden="true"\` to decorative SVGs
              4. Push the fixes to this branch
              `
            });
```

---

## 3. AI Studio Integration

### Crear Agente Personalizado

En AI Studio, puedes crear un agente con conocimiento de tu Design System:

```
System Instructions:

You are a Design System expert for the limbpuma/design-system-pipeline project.

You know:
- All design tokens (colors, spacing, typography)
- WCAG 2.1 AA accessibility requirements
- Component patterns (Button, Card, Input, etc.)
- Tailwind CSS conventions

When asked to create components:
1. Use semantic color tokens
2. Ensure 4.5:1 contrast ratio minimum
3. Include proper ARIA attributes
4. Support dark mode with correct color inversions

Reference files:
- tokens/semantic/colors.json
- docs/STITCH-SYSTEM-PROMPT.md
- docs/accessibility/A11Y-ERROR-GUIDE.md
```

---

## 4. Comandos Útiles

### Jules CLI
```bash
# Crear nueva tarea
npx @google/jules remote new "Fix all a11y errors in src/components"

# Listar tareas activas
npx @google/jules remote list

# Aplicar cambios localmente
npx @google/jules remote apply <task-id>

# Dashboard interactivo
npx @google/jules
```

### Scripts del Proyecto
```bash
# Validar accesibilidad
npm run a11y:validate

# Generar reporte
npm run a11y:report

# Ejecutar Storybook
npm run storybook
```

---

## 5. Checklist de Configuración

- [x] Repo conectado a Jules
- [x] AGENTS.md creado (Jules lee este archivo para entender el repo)
- [ ] Scheduled Tasks configuradas
- [ ] Label "jules" creado en GitHub
- [ ] Workflow actualizado para trigger Jules
- [ ] AI Studio agent creado
- [ ] Stitch conectado al repo

---

## 6. Próximos Pasos

1. **Accede al dashboard de Jules:**
   https://jules.google.com/repo/github/limbpuma/design-system-pipeline/

2. **Crea tu primer Scheduled Task** (validación a11y semanal)

3. **Prueba el flujo Stitch → GitHub → Jules:**
   - Genera una UI en Stitch
   - Exporta al repo
   - Verifica que el workflow se ejecute
   - Si hay errores, agrega label "jules"

4. **Opcional: Configura alertas en Slack/Discord via Jules API**
