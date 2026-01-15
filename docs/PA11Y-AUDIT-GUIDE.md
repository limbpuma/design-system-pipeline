# Pa11y Audit Guide

> Guía de auditoría de accesibilidad para el Design System Coordinator

---

## Resumen

Pa11y está **integrado como dependencia del proyecto** (`devDependencies`).
Se instala automáticamente con `npm install`.

**Dos propósitos:**
1. **Sistema (CI/CD)**: Validación automática en cada PR
2. **Coordinator/Swarm**: Auditorías manuales por el equipo de diseño

---

## Instalación

```bash
# Pa11y se instala con las dependencias del proyecto
npm install
```

---

## Comandos Disponibles

```bash
# Pa11y directo (cualquier URL)
npm run pa11y -- http://localhost:6006
npm run pa11y -- --standard WCAG2AA http://localhost:6006

# CI/CD - Ejecutar con configuración .pa11yci
npm run pa11y:ci

# Check de contraste en composiciones (CRÍTICO)
npm run pa11y:composition

# Storybook + Pa11y automático
npm run pa11y:storybook

# Instrucciones de auditoría completa
npm run pa11y:audit

# Resumen rápido
npm run pa11y:quick
```

---

## Para el Design System Coordinator

### Workflow de Auditoría Manual

```
Paso 1: Iniciar Storybook
$ npm run storybook

Paso 2: En otra terminal, ejecutar auditoría
$ npm run pa11y:audit

Paso 3: Revisar composiciones (CRÍTICO)
$ npm run pa11y:composition

Paso 4: Revisar reportes
→ reports/pa11y/audit-{timestamp}.json
→ reports/pa11y/*.png (screenshots)
```

### Check de Composition Contrast (CRÍTICO)

El comando `pa11y:composition` verifica específicamente el gap que el swarm NO detectaba:

```
$ npm run pa11y:composition

Composition Contrast Check
=====================================
Checking for icon/element visibility issues...

❌ Icon inside dark Card
   Parent: bg-gray-900
   Child: text-gray-900
   Contrast Ratio: 1:1
   Status: FAIL (< 3:1 for UI elements)

❌ Icon inside dark Button
   Parent: bg-gray-800
   Child: text-gray-700
   Contrast Ratio: 1.35:1
   Status: FAIL (< 3:1 for UI elements)
```

### Requisitos WCAG para Contraste

| Elemento | Mínimo AA | Recomendado AAA |
|----------|-----------|-----------------|
| Texto normal | 4.5:1 | 7:1 |
| Texto grande (18pt+) | 3:1 | 4.5:1 |
| Componentes UI (iconos) | 3:1 | 3:1 |
| Indicadores de focus | 3:1 | 3:1 |

---

## Configuración

### Archivo `.pa11yci`

```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"],
    "timeout": 30000,
    "wait": 2000
  },
  "urls": [
    {
      "url": "http://localhost:6006/iframe.html?id=primitives-button--primary",
      "screenCapture": "./reports/pa11y/button-primary.png"
    }
  ]
}
```

### Agregar Nuevos Componentes

Editar `.pa11yci` y agregar URL del componente:

```json
{
  "url": "http://localhost:6006/iframe.html?id=primitives-{component}--{variant}",
  "screenCapture": "./reports/pa11y/{component}-{variant}.png"
}
```

---

## Integración con Swarm

### Fase 3.5: Pa11y Validation

```
Agents: 🌈 + ♿ + 👑
Tasks:
  - npm run pa11y:composition (CRÍTICO)
  - npm run pa11y:audit (si Storybook activo)
  - Revisar reportes en reports/pa11y/
  - RECHAZAR si composition contrast < 3:1
```

### Checklist del Coordinator

```
Antes de aprobar un componente:
[ ] npm run pa11y:composition - PASS
[ ] npm run pa11y:audit - 0 errores críticos
[ ] Verificar screenshots en reports/pa11y/
[ ] Confirmar iconos visibles en ambos modos (light/dark)
```

---

## Interpretación de Resultados

### Códigos de Salida

| Código | Significado |
|--------|-------------|
| 0 | Todos los tests pasaron |
| 1 | Al menos un error encontrado |
| 2 | Error de configuración |

### Tipos de Issues

| Tipo | Severidad | Acción |
|------|-----------|--------|
| `error` | Alta | DEBE corregirse |
| `warning` | Media | Revisar y decidir |
| `notice` | Baja | Informativo |

### Ejemplo de Reporte

```json
{
  "summary": {
    "total": 8,
    "passed": 6,
    "failed": 2,
    "errors": 0,
    "passRate": "75%"
  },
  "results": [
    {
      "component": "button--primary",
      "status": "PASS",
      "issueCount": 0
    },
    {
      "component": "card--default",
      "status": "FAIL",
      "issueCount": 2,
      "issues": [
        {
          "code": "WCAG2AA.Principle1.Guideline1_4.1_4_11.G195",
          "message": "Element has insufficient contrast ratio",
          "type": "error"
        }
      ]
    }
  ]
}
```

---

## Troubleshooting

### Error: "Cannot find module 'pa11y'"

```bash
# Instalar dependencias
npm run pa11y:install
```

### Error: "Connection refused to localhost:6006"

```bash
# Storybook debe estar corriendo
npm run storybook
# En otra terminal
npm run pa11y:audit
```

### Screenshots no se generan

```bash
# Verificar que existe el directorio
mkdir -p reports/pa11y

# Ejecutar con permisos
npm run pa11y:audit
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Pa11y Accessibility
on: [pull_request]

jobs:
  pa11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Install pa11y
        run: npm run pa11y:install

      - name: Build Storybook
        run: npm run build:storybook

      - name: Serve Storybook
        run: npx http-server storybook-static -p 6006 &

      - name: Wait for server
        run: npx wait-on http://localhost:6006

      - name: Run Pa11y
        run: npm run pa11y:ci

      - name: Upload reports
        uses: actions/upload-artifact@v4
        with:
          name: pa11y-reports
          path: reports/pa11y/
```

---

## Referencias

- [Pa11y Documentation](https://pa11y.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe-core Rules](https://dequeuniversity.com/rules/axe/)
- `.claude/agents/accessibility-specialist.md`
- `.claude/agents/color-accessibility-expert.md`

---

*Documentación de Pa11y Audit - Design System Pipeline - Enero 2026*
