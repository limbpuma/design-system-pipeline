# Design System Context for Google Stitch

Copia este contenido como contexto/instrucciones cuando uses Google Stitch para generar UIs.

---

## INSTRUCCIONES PARA STITCH

Genera interfaces siguiendo estas reglas estrictas de mi Design System:

### TOKENS SEMÁNTICOS CSS (OBLIGATORIO)

⚠️ **IMPORTANTE**: Usa variables CSS semánticas, NO clases directas de Tailwind.

```tsx
// ✅ CORRECTO - Tokens semánticos (dark mode automático)
'bg-[var(--semantic-color-background-default)]'
'bg-[var(--semantic-color-background-subtle)]'
'text-[var(--semantic-color-foreground-default)]'
'text-[var(--semantic-color-foreground-muted)]'
'bg-[var(--semantic-color-primary-default)]'
'text-[var(--semantic-color-primary-foreground)]'
'border-[var(--semantic-color-border-default)]'

// ❌ INCORRECTO - Clases directas (requiere dark: prefix)
'bg-white dark:bg-gray-950'
'text-gray-900 dark:text-gray-50'
'text-gray-500 dark:text-gray-400'
```

### VARIABLES CSS DISPONIBLES

| Variable | Descripción |
|----------|-------------|
| `--semantic-color-background-default` | Fondo principal |
| `--semantic-color-background-subtle` | Fondo secundario |
| `--semantic-color-background-muted` | Fondo terciario |
| `--semantic-color-foreground-default` | Texto principal |
| `--semantic-color-foreground-muted` | Texto secundario |
| `--semantic-color-foreground-subtle` | Texto terciario |
| `--semantic-color-primary-default` | Color primario |
| `--semantic-color-primary-hover` | Primario hover |
| `--semantic-color-primary-foreground` | Texto sobre primario |
| `--semantic-color-secondary-default` | Color secundario |
| `--semantic-color-secondary-foreground` | Texto sobre secundario |
| `--semantic-color-accent-default` | Color acento |
| `--semantic-color-accent-foreground` | Texto sobre acento |
| `--semantic-color-border-default` | Borde principal |
| `--semantic-color-border-strong` | Borde fuerte |
| `--semantic-color-border-muted` | Borde suave |
| `--semantic-color-destructive-default` | Color destructivo |
| `--semantic-color-destructive-foreground` | Texto sobre destructivo |
| `--semantic-color-success-default` | Color éxito |
| `--semantic-color-success-foreground` | Texto sobre éxito |
| `--semantic-color-warning-default` | Color advertencia |
| `--semantic-color-warning-foreground` | Texto sobre advertencia |

### REGLAS DE CONTRASTE (WCAG 2.1 AA)

**OBLIGATORIO:** Ratio mínimo 4.5:1 para texto normal

Los tokens semánticos ya están validados para contraste WCAG AA:
- `foreground-default` sobre `background-default`: ✅ 4.5:1+
- `foreground-muted` sobre `background-default`: ✅ 4.5:1+
- `primary-foreground` sobre `primary-default`: ✅ 4.5:1+

### TIPOGRAFÍA

```
Font Family: Inter, system-ui, sans-serif
Font Mono: ui-monospace, SFMono-Regular, Menlo

Sizes:
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)

Weights:
- normal: 400
- medium: 500
- semibold: 600
- bold: 700
```

### ESPACIADO

```
Scale (rem):
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
```

### BORDER RADIUS

```
sm: 0.125rem (2px)
base: 0.25rem (4px)
md: 0.375rem (6px)
lg: 0.5rem (8px)
xl: 0.75rem (12px)
2xl: 1rem (16px)
full: 9999px
```

### SOMBRAS

```
sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
base: 0 1px 3px 0 rgb(0 0 0 / 0.1)
md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
```

### COMPONENTES ESTÁNDAR

**Buttons:**
```tsx
// Botón primario con tokens semánticos
<button
  className="px-4 py-2
             bg-[var(--semantic-color-primary-default)]
             hover:bg-[var(--semantic-color-primary-hover)]
             text-[var(--semantic-color-primary-foreground)]
             font-medium rounded-md
             focus-visible:ring-2 focus-visible:ring-offset-2
             disabled:opacity-50 disabled:pointer-events-none
             transition-all duration-200 ease-out"
>
  Guardar
</button>
```

**Inputs:**
```tsx
<input
  className="px-3 py-2
             bg-[var(--semantic-color-background-default)]
             border border-[var(--semantic-color-border-default)]
             text-[var(--semantic-color-foreground-default)]
             placeholder:text-[var(--semantic-color-foreground-muted)]
             rounded-md
             focus:ring-2 focus:ring-[var(--semantic-color-primary-default)]"
/>
```

**Cards:**
```tsx
<div className="p-6
                bg-[var(--semantic-color-background-default)]
                border border-[var(--semantic-color-border-default)]
                rounded-lg shadow-md">
  <h3 className="text-lg font-semibold text-[var(--semantic-color-foreground-default)]">
    Título
  </h3>
  <p className="mt-2 text-[var(--semantic-color-foreground-muted)]">
    Descripción
  </p>
</div>
```

### ACCESIBILIDAD (OBLIGATORIO)

1. **Todos los botones icon-only:** `aria-label="descripción"`
2. **Todos los SVG decorativos:** `aria-hidden="true"`
3. **Todos los inputs:** label asociado o `aria-label`
4. **Regiones scrollables:** `tabIndex={0} role="region" aria-label="..."`
5. **Contenido principal:** envuelto en `<main>`

### EJEMPLO DE CÓDIGO CORRECTO

```tsx
// Botón primario con tokens semánticos
<button
  className="px-4 py-2
             bg-[var(--semantic-color-primary-default)]
             hover:bg-[var(--semantic-color-primary-hover)]
             text-[var(--semantic-color-primary-foreground)]
             font-medium rounded-md
             focus-visible:ring-2 focus-visible:ring-offset-2
             disabled:opacity-50 disabled:pointer-events-none
             transition-all duration-200 ease-out
             active:scale-[0.98]"
>
  Guardar
</button>

// Texto secundario (tokens semánticos = contraste automático)
<p className="text-[var(--semantic-color-foreground-muted)] text-sm">
  Última actualización hace 5 minutos
</p>

// Card con tokens semánticos
<div className="p-6
                bg-[var(--semantic-color-background-default)]
                border border-[var(--semantic-color-border-default)]
                rounded-lg shadow-md">
  <h3 className="text-lg font-semibold text-[var(--semantic-color-foreground-default)]">
    Título
  </h3>
  <p className="mt-2 text-[var(--semantic-color-foreground-muted)]">
    Descripción
  </p>
</div>

// Botón con solo icono
<button
  aria-label="Cerrar modal"
  className="p-2 rounded-md
             hover:bg-[var(--semantic-color-secondary-default)]
             transition-colors"
>
  <svg aria-hidden="true" className="w-5 h-5">...</svg>
</button>
```

### NO USAR (ERRORES COMUNES)

```tsx
// ❌ Clases directas de Tailwind (no usar)
<p className="text-gray-500 dark:text-gray-400">

// ✅ Tokens semánticos (usar siempre)
<p className="text-[var(--semantic-color-foreground-muted)]">

// ❌ Sin aria-label en botón icon-only
<button><XIcon /></button>

// ❌ SVG sin aria-hidden
<svg className="w-5 h-5">

// ❌ Fondo directo sin tokens
<div className="bg-white dark:bg-gray-950">

// ✅ Fondo con tokens
<div className="bg-[var(--semantic-color-background-default)]">
```

---

## USO EN STITCH

1. Copia todo el contenido de arriba
2. En Stitch, antes de tu prompt, agrega:
   ```
   CONTEXTO DE DESIGN SYSTEM:
   [pega el contenido]

   AHORA GENERA:
   [tu solicitud específica]
   ```

3. Ejemplo de prompt completo:
   ```
   CONTEXTO: Usa mi Design System con tokens semánticos CSS
   (var(--semantic-color-*)), contraste WCAG AA automático,
   y accesibilidad completa.

   GENERA: Una interfaz de chat con:
   - Lista de mensajes con burbujas
   - Input de texto con botón enviar
   - Usa tokens semánticos para todos los colores
   - Botones icon-only con aria-labels
   - SVGs con aria-hidden="true"
   ```

---

*Actualizado: Enero 2026 - Migrado a tokens semánticos CSS*
