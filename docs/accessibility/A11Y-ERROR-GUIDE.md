# Guía de Errores de Accesibilidad

Esta guía documenta los errores de accesibilidad más comunes en el Design System y cómo corregirlos.

## Índice

1. [Color Contrast](#color-contrast)
2. [Landmarks](#landmarks)
3. [Button Names](#button-names)
4. [Scrollable Regions](#scrollable-regions)
5. [Form Labels](#form-labels)
6. [Image Alt Text](#image-alt-text)

---

## Color Contrast

### Error: `color-contrast`

**Severidad:** Seria/Crítica
**WCAG:** 1.4.3 Contrast (Minimum) - Level AA

El contraste entre el color de texto y fondo debe ser al menos **4.5:1** para texto normal y **3:1** para texto grande (18px+ o 14px bold).

### Errores Comunes en Este Proyecto

#### 1. `dark:text-slate-500` en modo oscuro

**Problema:** `slate-500` (#64748b) sobre `slate-900` (#0f172a) tiene contraste de **3.75:1** (insuficiente).

```tsx
// ❌ INCORRECTO
<span className="text-slate-400 dark:text-slate-500">
  Texto secundario
</span>

// ✅ CORRECTO - Invertir colores light/dark
<span className="text-slate-500 dark:text-slate-400">
  Texto secundario
</span>
```

**Ratios resultantes:**
- Light mode: `slate-500` sobre blanco = **5.5:1** ✅
- Dark mode: `slate-400` sobre `slate-900` = **5.4:1** ✅

#### 2. Texto blanco sobre `emerald-600`

**Problema:** Blanco (#ffffff) sobre `emerald-600` (#059669) tiene contraste de **3.76:1**.

```tsx
// ❌ INCORRECTO
<div className="bg-emerald-600 text-white">Texto</div>

// ✅ CORRECTO - Usar emerald-700 o más oscuro
<div className="bg-emerald-700 text-white">Texto</div>
// Ratio: 5.4:1 ✅
```

#### 3. Gradientes no calculables

Los gradientes hacen imposible calcular el contraste exacto. Usar colores sólidos.

```tsx
// ❌ INCORRECTO - Contraste no calculable
<div className="bg-gradient-to-br from-blue-500 to-violet-600 text-white">

// ✅ CORRECTO - Color sólido
<div className="bg-violet-600 text-white">
// Ratio: 4.56:1 ✅
```

### Tabla de Colores Seguros

| Color de Texto | Fondo Claro | Fondo Oscuro |
|---------------|-------------|--------------|
| `slate-500`   | blanco ✅   | `slate-900` ❌ |
| `slate-400`   | blanco ❌   | `slate-900` ✅ |
| `slate-600`   | blanco ✅   | `slate-900` ✅ |
| `white`       | `violet-600` ✅ | - |
| `white`       | `emerald-600` ❌ | - |
| `white`       | `emerald-700` ✅ | - |

---

## Landmarks

### Error: `region`

**Severidad:** Moderada
**WCAG:** 1.3.1 Info and Relationships - Level A

Todo el contenido de la página debe estar dentro de elementos landmark semánticos.

### Solución

```tsx
// ❌ INCORRECTO
<div className="container">
  {content}
</div>

// ✅ CORRECTO - Usar elementos semánticos
<main className="container" aria-label="Contenido principal">
  {content}
</main>

// Para secciones específicas:
<nav aria-label="Navegación principal">{menu}</nav>
<aside aria-label="Panel lateral">{sidebar}</aside>
<footer aria-label="Pie de página">{footer}</footer>
```

### Decorator para Stories

Usa el decorator `withA11yStoryWrapper` para envolver tus stories automáticamente:

```tsx
import { withA11yStoryWrapper } from '../utils/storyDecorators';

const meta: Meta<typeof MyComponent> = {
  decorators: [withA11yStoryWrapper],
};
```

---

## Button Names

### Error: `button-name`

**Severidad:** Crítica
**WCAG:** 4.1.2 Name, Role, Value - Level A

Los botones deben tener un nombre accesible para lectores de pantalla.

### Solución

```tsx
// ❌ INCORRECTO - Botón sin nombre
<button onClick={handleClose}>
  <XIcon />
</button>

// ✅ CORRECTO - Con aria-label
<button onClick={handleClose} aria-label="Cerrar diálogo">
  <XIcon aria-hidden="true" />
</button>

// ✅ ALTERNATIVA - Con texto visible + sr-only
<button onClick={handleClose}>
  <XIcon aria-hidden="true" />
  <span className="sr-only">Cerrar diálogo</span>
</button>
```

### Iconos SVG

**SIEMPRE** agregar `aria-hidden="true"` a iconos decorativos:

```tsx
// ❌ INCORRECTO
<svg className="w-5 h-5">...</svg>

// ✅ CORRECTO
<svg className="w-5 h-5" aria-hidden="true">...</svg>
```

---

## Scrollable Regions

### Error: `scrollable-region-focusable`

**Severidad:** Seria
**WCAG:** 2.1.1 Keyboard - Level A

Las regiones con scroll deben ser accesibles por teclado.

### Solución

```tsx
// ❌ INCORRECTO
<div className="overflow-y-auto max-h-96">
  {content}
</div>

// ✅ CORRECTO - Con accesibilidad por teclado
<div
  className="overflow-y-auto max-h-96"
  tabIndex={0}
  role="region"
  aria-label="Lista de mensajes"
>
  {content}
</div>

// Para logs o feeds:
<div
  className="overflow-y-auto max-h-96"
  tabIndex={0}
  role="log"
  aria-label="Historial de conversación"
  aria-live="polite"
>
  {messages}
</div>
```

---

## Form Labels

### Error: `label`

**Severidad:** Crítica
**WCAG:** 1.3.1 Info and Relationships - Level A

Todos los campos de formulario deben tener labels asociados.

### Solución

```tsx
// ❌ INCORRECTO
<input type="email" placeholder="Tu email" />

// ✅ CORRECTO - Label visible
<label htmlFor="email" className="block mb-1">
  Email
</label>
<input id="email" type="email" />

// ✅ CORRECTO - Label oculto pero accesible
<label htmlFor="search" className="sr-only">
  Buscar
</label>
<input id="search" type="search" placeholder="Buscar..." />

// ✅ CORRECTO - aria-label para casos especiales
<input
  type="search"
  aria-label="Buscar en el chat"
  placeholder="Buscar..."
/>
```

---

## Image Alt Text

### Error: `image-alt`

**Severidad:** Crítica
**WCAG:** 1.1.1 Non-text Content - Level A

Todas las imágenes deben tener texto alternativo descriptivo.

### Solución

```tsx
// ❌ INCORRECTO
<img src="/avatar.jpg" />

// ✅ CORRECTO - Imagen informativa
<img src="/avatar.jpg" alt="Avatar de Juan Pérez" />

// ✅ CORRECTO - Imagen decorativa
<img src="/decorative-bg.jpg" alt="" role="presentation" />

// Para avatares en componentes:
<Avatar
  src={user.avatar}
  alt={`Avatar de ${user.name}`}
/>
```

---

## Comandos Útiles

```bash
# Validar todos los stories
npm run a11y:validate

# Generar reporte JSON
npm run a11y:validate:json

# Generar reporte HTML
npm run a11y:report

# Validar archivo específico
npx tsx tools/a11y-validator/src/cli.ts src/components/Button/Button.stories.tsx
```

---

## Flujo de Corrección

```
┌─────────────────────────────────────────────────────────────────┐
│                     FLUJO DE CORRECCIÓN                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. npm run a11y:validate                                       │
│     ↓                                                          │
│  2. Identificar errores CRITICAL/SERIOUS                        │
│     ↓                                                          │
│  3. Buscar solución en esta guía                                │
│     ↓                                                          │
│  4. Aplicar fix en código                                       │
│     ↓                                                          │
│  5. npm run a11y:validate (verificar)                           │
│     ↓                                                          │
│  6. git commit (pre-commit hook valida automáticamente)         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Recursos Externos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Deque axe-core Rules](https://dequeuniversity.com/rules/axe/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN ARIA Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

---

## Soporte

Si encuentras un error no documentado aquí:

1. Ejecuta `npm run a11y:report` para obtener detalles
2. Consulta el panel "♿ A11y Feedback" en Storybook
3. Revisa el `helpUrl` en el error para documentación de Deque
4. Actualiza esta guía con la solución encontrada
