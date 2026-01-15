# Importador de Design Tokens desde Figma

## Resumen

El boilerplate incluye una herramienta para importar **Design Tokens** exportados desde **Figma/Tokens Studio** y convertirlos automáticamente en variables CSS compatibles con **Tailwind v4**.

---

## Archivos del Sistema

| Archivo | Descripción |
|---------|-------------|
| `.bin/utils/import-design-tokens` | Script bash principal que orquesta el proceso |
| `scripts/import-style-tokens.js` | Script Node.js que procesa los tokens JSON y genera CSS |

---

## Uso

### Comando
```bash
./.bin/utils/import-design-tokens <tokens-export-folder>
```

### Ejemplo
```bash
./.bin/utils/import-design-tokens ./figma-tokens-export
```

### Parámetros del script Node.js
```bash
node scripts/import-style-tokens.js --input <folder> --output <file>
```

| Parámetro | Descripción | Default |
|-----------|-------------|---------|
| `--input`, `-i` | Carpeta con tokens exportados | `figma-tokens-export` |
| `--output`, `-o` | Archivo CSS de salida | `resources/css/design_tokens.css` |

---

## Proceso de Importación

1. **Lee** archivos JSON exportados de Tokens Studio/Figma (recursivamente)
2. **Procesa** y resuelve referencias entre tokens
3. **Genera** archivo CSS con variables `@theme` para Tailwind v4
4. **Actualiza** `tailwind.css` para importar el archivo generado
5. **Elimina** la carpeta de input (si está dentro del repo)

---

## Estructura de Tokens Esperada

El importador espera la siguiente estructura de carpetas:

```
figma-tokens-export/
├── color/
│   ├── light.tokens.json    # Colores modo claro
│   └── dark.tokens.json     # Colores modo oscuro
├── primitive/
│   └── primitive.tokens.json # Colores base, números, strings
├── typography/
│   └── typography.tokens.json # Tipografía
└── spacing/
    ├── screen-xs.tokens.json  # Spacing para breakpoint xs
    ├── screen-md.tokens.json  # Spacing para breakpoint md
    ├── screen-lg.tokens.json  # Spacing para breakpoint lg
    └── screen-xl.tokens.json  # Spacing para breakpoint xl
```

---

## Tokens Procesados

### Colores

| Origen | Variable CSS generada |
|--------|----------------------|
| `color/light.tokens.json` | `--color-{nombre}` (default) |
| `color/dark.tokens.json` | `--color-{nombre}` (en `.dark`) |
| `primitive/primitive.tokens.json` | `--color-{nombre}` (paleta base) |

### Breakpoints

| Token | Variable CSS |
|-------|-------------|
| `breakpoint.screen-width` en `screen-xs.json` | `--breakpoint-xs` |
| `breakpoint.screen-width` en `screen-md.json` | `--breakpoint-md` |
| `breakpoint.screen-width` en `screen-lg.json` | `--breakpoint-lg` |
| `breakpoint.screen-width` en `screen-xl.json` | `--breakpoint-xl` |

### Spacing

| Token | Variable CSS |
|-------|-------------|
| `size.scale.*` | `--spacing-scale-{nombre}` |
| `pattern.padding.default` | `--spacing-pattern-padding-default-{bp}` |
| `pattern.padding.large` | `--spacing-pattern-padding-large-{bp}` |

### Radii (Border Radius)

| Token | Variable CSS |
|-------|-------------|
| `size.radius.*` | `--radius-{nombre}` |

### Tipografía

| Token | Variable CSS |
|-------|-------------|
| `*.size` | `--typography-{nombre}-size` |
| `*.line-height` | `--typography-{nombre}-line-height` |
| `*.tracking` | `--typography-{nombre}-tracking` |
| `font.family.sans` | `--font-sans` |
| `font.family.serif` | `--font-serif` |
| `font.family.mono` | `--font-mono` |

### Aliases para Tailwind

El script genera aliases para usar directamente con Tailwind:

| Variable generada | Uso en Tailwind |
|-------------------|-----------------|
| `--text-body-lg` | `class="text-body-lg"` |
| `--text-body-lg--line-height` | Aplicado automáticamente |
| `--text-body-lg--letter-spacing` | Aplicado automáticamente |

---

## Utilidades CSS Generadas

El script genera clases de utilidad responsivas:

### Padding de Página

| Clase | Descripción |
|-------|-------------|
| `.p-page`, `.p-default`, `.default-padding` | Padding completo responsivo |
| `.px-page` | Padding horizontal responsivo |
| `.py-page` | Padding vertical responsivo |

### Padding Grande

| Clase | Descripción |
|-------|-------------|
| `.p-page-large`, `.p-default-large`, `.default-padding-large` | Padding grande responsivo |
| `.px-page-large` | Padding horizontal grande |
| `.py-page-large` | Padding vertical grande |

---

## Soporte Dark Mode

El sistema genera automáticamente variables para dark mode:

```css
/* Modo claro (default) */
@theme {
  --color-surface-primary: #ffffff;
  --color-text-default: #1a1a1a;
}

/* Modo oscuro */
@layer base {
  .dark {
    --color-surface-primary: #1a1a1a;
    --color-text-default: #ffffff;
  }
}
```

Para activar dark mode, agregar clase `.dark` al elemento raíz:
```html
<html class="dark">
```

---

## Aliases Semánticos

El script genera aliases de compatibilidad:

| Alias | Referencia |
|-------|------------|
| `--bg-primary` | `var(--color-surface-primary)` |
| `--bg-secondary` | `var(--color-surface-secondary)` |
| `--text-primary` | `var(--color-text-default-primary)` |
| `--text-secondary` | `var(--color-text-default-secondary)` |
| `--border-color` | `var(--color-border-default)` |
| `--surface-invert` | `var(--color-surface-invert)` |
| `--text-invert` | `var(--color-text-default-invert)` |

---

## Archivo de Salida

El archivo generado `resources/css/design_tokens.css` tiene la siguiente estructura:

```css
/*
  GENERATED FILE — DO NOT EDIT
  Generated by scripts/import-style-tokens.js from figma-tokens-export/**/*.json
  Generated at: 14 Jan 2026, 10:30:00 CET
*/

@theme {
  /* Breakpoints */
  --breakpoint-xs: 320px;
  --breakpoint-md: 768px;
  /* ... */

  /* Colores */
  --color-surface-primary: #ffffff;
  /* ... */

  /* Spacing */
  --spacing-scale-1: 4px;
  /* ... */

  /* Tipografía */
  --typography-body-lg-size: 18px;
  /* ... */
}

@layer base {
  :root {
    --bg-primary: var(--color-surface-primary);
    /* ... aliases ... */
  }
}

@layer base {
  .dark {
    --color-surface-primary: #1a1a1a;
    /* ... dark overrides ... */
  }
}

@layer utilities {
  .p-page {
    padding: var(--spacing-pattern-padding-default-xs, 16px);
  }
  /* ... responsive utilities ... */
}
```

---

## Integración con Tailwind

El script actualiza automáticamente `resources/css/tailwind.css`:

```css
@import "tailwindcss";

/* Design tokens (generated from Figma) */
@import "./design_tokens.css";
```

---

## Notas Importantes

1. **No editar manualmente** el archivo `design_tokens.css` - se sobrescribe en cada importación
2. La carpeta de tokens se **elimina automáticamente** después de una importación exitosa
3. Los tokens deben seguir el formato de **Tokens Studio** (JSON con `$type` y `$value`)
4. El script resuelve **referencias entre tokens** automáticamente (ej: `{color.primary.500}`)
