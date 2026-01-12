# Design System Context for Google Stitch

Copia este contenido como contexto/instrucciones cuando uses Google Stitch para generar UIs.

---

## INSTRUCCIONES PARA STITCH

Genera interfaces siguiendo estas reglas estrictas de mi Design System:

### COLORES SEMÁNTICOS (OBLIGATORIO)

Usa SOLO estos colores semánticos, NO colores arbitrarios:

```
LIGHT MODE:
- Background: white (#ffffff)
- Background subtle: gray-50 (#f9fafb)
- Foreground (texto): gray-900 (#111827)
- Foreground muted: gray-500 (#6b7280) - RATIO 4.5:1 ✓
- Primary: blue-600 (#2563eb)
- Success: green-600 (#16a34a) - usar green-700 para texto blanco
- Destructive: red-600 (#dc2626)
- Warning: yellow-500 (#eab308) - texto OSCURO, no blanco
- Border: gray-200 (#e5e7eb)

DARK MODE:
- Background: gray-950 (#030712)
- Background subtle: gray-900 (#111827)
- Foreground: gray-50 (#f9fafb)
- Foreground muted: gray-400 (#9ca3af) - NO gray-500 (contraste insuficiente)
- Primary: blue-500 (#3b82f6)
- Border: gray-800 (#1f2937)
```

### REGLAS DE CONTRASTE (WCAG 2.1 AA)

**OBLIGATORIO:** Ratio mínimo 4.5:1 para texto normal

```
✅ CORRECTO:
- text-gray-500 en fondo blanco (5.5:1)
- text-gray-400 en fondo gray-900 (5.4:1)
- text-white en bg-blue-600 (4.5:1)
- text-white en bg-green-700 (5.4:1)

❌ INCORRECTO (NO USAR):
- text-gray-400 en fondo blanco (3.0:1)
- text-gray-500 en fondo gray-900 (3.75:1)
- text-white en bg-green-600 (3.76:1)
- text-white en bg-emerald-600 (3.76:1)
```

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
```
- Padding: px-4 py-2 (md), px-3 py-1.5 (sm), px-6 py-3 (lg)
- Border radius: rounded-md (6px)
- Font: font-medium
- States: hover, focus-visible:ring-2, disabled:opacity-50
```

**Inputs:**
```
- Padding: px-3 py-2
- Border: border border-gray-200 dark:border-gray-700
- Border radius: rounded-md
- Focus: focus:ring-2 focus:ring-blue-500
```

**Cards:**
```
- Padding: p-6
- Border radius: rounded-lg (8px)
- Shadow: shadow-md
- Border: border border-gray-200 dark:border-gray-800
```

### ACCESIBILIDAD (OBLIGATORIO)

1. **Todos los botones icon-only:** `aria-label="descripción"`
2. **Todos los SVG decorativos:** `aria-hidden="true"`
3. **Todos los inputs:** label asociado o `aria-label`
4. **Regiones scrollables:** `tabIndex={0} role="region" aria-label="..."`
5. **Contenido principal:** envuelto en `<main>`

### EJEMPLO DE CÓDIGO CORRECTO

```tsx
// Botón primario
<button
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700
             text-white font-medium rounded-md
             focus-visible:ring-2 focus-visible:ring-blue-500
             focus-visible:ring-offset-2
             disabled:opacity-50 disabled:cursor-not-allowed
             transition-colors"
>
  Guardar
</button>

// Texto secundario (contraste correcto)
<p className="text-gray-500 dark:text-gray-400 text-sm">
  Última actualización hace 5 minutos
</p>

// Card
<div className="p-6 bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                rounded-lg shadow-md">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
    Título
  </h3>
  <p className="mt-2 text-gray-500 dark:text-gray-400">
    Descripción
  </p>
</div>

// Botón con solo icono
<button
  aria-label="Cerrar modal"
  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
>
  <svg aria-hidden="true" className="w-5 h-5">...</svg>
</button>
```

### NO USAR (ERRORES COMUNES)

```tsx
// ❌ Contraste insuficiente en dark mode
<p className="text-gray-500 dark:text-gray-500">

// ❌ Sin aria-label en botón icon-only
<button><XIcon /></button>

// ❌ SVG sin aria-hidden
<svg className="w-5 h-5">

// ❌ Verde claro con texto blanco
<div className="bg-green-600 text-white">

// ❌ Gradientes (contraste no calculable)
<div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
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
   CONTEXTO: Usa mi Design System con colores semánticos,
   contraste WCAG AA (4.5:1), y accesibilidad completa.

   GENERA: Una interfaz de chat con:
   - Lista de mensajes con burbujas
   - Input de texto con botón enviar
   - Modo claro y oscuro
   - Botones icon-only con aria-labels
   ```
