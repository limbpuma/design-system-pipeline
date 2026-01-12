# Templates de Prompts: Stitch → Jules

Estos templates están diseñados para usar en el campo de descripción cuando exportas de Stitch a Jules.

---

## Cómo Usar

1. En Stitch, genera tu diseño
2. Click **Export** → **Jules**
3. Selecciona repo: `limbpuma/design-system-pipeline`
4. En el campo de descripción, **copia el template correspondiente**
5. Personaliza los valores entre `[corchetes]`
6. Click **Create Task**

---

## Template 1: Nuevo Componente

```
Convierte este diseño en un componente React para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/[nombre-componente]

INSTRUCCIONES:
1. Lee AGENTS.md para entender patrones del proyecto
2. Usa CVA (class-variance-authority) para variantes
3. Usa tokens semánticos de tokens/semantic/colors.json
4. Sigue reglas de accesibilidad de docs/accessibility/A11Y-ERROR-GUIDE.md:
   - Contraste dark mode: dark:text-slate-400 (NUNCA slate-500)
   - SVGs decorativos: aria-hidden="true"
   - Botones icon-only: aria-label obligatorio
5. Crea archivo .stories.tsx con decorator withA11yStoryWrapper
6. Incluye soporte dark mode completo
7. Agrega TypeScript types para todas las props

ESTRUCTURA DE ARCHIVOS:
- src/components/[Nombre]/[Nombre].tsx
- src/components/[Nombre]/[Nombre].stories.tsx
- src/components/[Nombre]/index.ts

VALIDACIÓN OBLIGATORIA:
npm run a11y:validate debe pasar sin errores críticos

PR TITLE: feat(component): add [Nombre] component
```

---

## Template 2: Bloque de Marketing

```
Convierte este diseño en un bloque de marketing para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/block-[nombre]

INSTRUCCIONES:
1. Lee AGENTS.md para contexto del proyecto
2. Ubicar en src/blocks/marketing/[NombreBloque]/
3. REUTILIZAR componentes existentes de src/components/:
   - Button, Card, Input, Tabs, Dialog, Badge, Avatar
4. Incluir landmark regions apropiados:
   - <section aria-labelledby="...">
   - <article> para contenido independiente
5. Crear stories con variantes:
   - Default
   - WithImage
   - Dark (si aplica)
   - Mobile (responsive preview)

COMPONENTES DISPONIBLES:
Revisar src/components/ para lista completa antes de crear nuevos.

ACCESIBILIDAD:
- Headings jerárquicos (h2, h3, etc.)
- Alt text en todas las imágenes
- Links con texto descriptivo (no "click here")

VALIDACIÓN: npm run a11y:validate debe pasar

PR TITLE: feat(block): add [NombreBloque] marketing block
```

---

## Template 3: Página de Aplicación / Dashboard

```
Convierte este diseño en una página de aplicación para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/app-[nombre]

INSTRUCCIONES:
1. Lee AGENTS.md para patrones del proyecto
2. Ubicar en src/blocks/application/[NombrePagina]/
3. Usar layout responsive con Tailwind Grid/Flexbox
4. Reutilizar componentes existentes siempre que sea posible
5. Incluir manejo de estados:
   - Loading (skeleton)
   - Empty (mensaje + CTA)
   - Error (mensaje + retry)
6. Soporte completo dark mode

ACCESIBILIDAD CRÍTICA:
- Scrollable regions: tabIndex={0} role="region" aria-label="[descripción]"
- Tablas de datos:
  - <th scope="col"> o <th scope="row">
  - <caption> si la tabla no tiene heading visible
- Gráficos/Charts: texto alternativo descriptivo
- Live regions para actualizaciones: aria-live="polite"

ESTRUCTURA:
- src/blocks/application/[Nombre]/[Nombre].tsx
- src/blocks/application/[Nombre]/[Nombre].stories.tsx
- src/blocks/application/[Nombre]/index.ts

VALIDACIÓN: npm run a11y:validate debe pasar

PR TITLE: feat(app): add [Nombre] application page
```

---

## Template 4: Componente AI / Chat

```
Convierte este diseño en un componente de AI/Chat para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/ai-[nombre]

INSTRUCCIONES:
1. Lee AGENTS.md para patrones del proyecto
2. Ubicar en src/blocks/ai/[NombreComponente]/
3. Patrones específicos de chat/AI:
   - Messages con roles (user, assistant, system)
   - Timestamps accesibles
   - Loading indicators
   - Error states

ACCESIBILIDAD ESPECÍFICA:
- Chat container: role="log" aria-live="polite"
- Mensajes nuevos anunciados a screen readers
- Input de mensaje: aria-label descriptivo
- Botón enviar: aria-label="Enviar mensaje"
- Typing indicator: aria-live="polite" aria-label="El asistente está escribiendo"

CONTRASTE (CRÍTICO):
- Timestamps: text-slate-500 dark:text-slate-400
- Metadata: text-slate-600 dark:text-slate-400
- NUNCA usar dark:text-slate-500

VALIDACIÓN: npm run a11y:validate debe pasar

PR TITLE: feat(ai): add [Nombre] AI component
```

---

## Template 5: Fix de Accesibilidad

```
Corrige los errores de accesibilidad en este componente/diseño.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: fix/a11y-[componente]

GUÍA DE REFERENCIA: docs/accessibility/A11Y-ERROR-GUIDE.md

ERRORES COMUNES A BUSCAR Y CORREGIR:

1. CONTRASTE:
   - dark:text-slate-500 → dark:text-slate-400
   - dark:text-gray-500 → dark:text-gray-400
   - Ratio mínimo: 4.5:1 para texto normal

2. ICONOS Y SVGs:
   - Agregar aria-hidden="true" a SVGs decorativos
   - Botones icon-only necesitan aria-label

3. INTERACTIVIDAD:
   - Scrollable: tabIndex={0} role="region" aria-label
   - Custom controls: role + aria-* apropiados

4. ESTRUCTURA:
   - Headings jerárquicos
   - Landmarks apropiados
   - Links descriptivos

5. FORMULARIOS:
   - Labels asociados a inputs
   - Error messages con aria-describedby
   - Required fields con aria-required

PROCESO:
1. Ejecutar npm run a11y:validate
2. Listar todos los errores
3. Aplicar fixes siguiendo A11Y-ERROR-GUIDE.md
4. Re-ejecutar validación
5. Solo crear PR si pasa validación

VALIDACIÓN OBLIGATORIA: npm run a11y:validate debe pasar

PR TITLE: fix(a11y): resolve accessibility issues in [componente]
```

---

## Template 6: Actualización de Componente Existente

```
Actualiza el componente existente según este nuevo diseño.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: update/[nombre-componente]

COMPONENTE A ACTUALIZAR: src/components/[Nombre]/

INSTRUCCIONES:
1. Lee el código existente primero
2. Mantener compatibilidad hacia atrás (no breaking changes)
3. Agregar nuevas variantes/props según el diseño
4. Actualizar stories para reflejar cambios
5. Mantener o mejorar accesibilidad existente

CONSIDERACIONES:
- No eliminar props existentes sin deprecation
- Documentar nuevas props con JSDoc
- Agregar stories para nuevas variantes
- Verificar que tests existentes siguen pasando

VALIDACIÓN:
- npm run a11y:validate
- npm run test (si existen tests)
- npm run lint

PR TITLE: update([componente]): [descripción breve del cambio]
```

---

## Template 7: Solución de Diseño Completa (Multi-página)

```
Implementa esta solución de diseño completa para el Design System.

REPOSITORIO: limbpuma/design-system-pipeline
BRANCH: feature/[nombre-solucion]

DESCRIPCIÓN DE LA SOLUCIÓN:
[Describir el caso de uso: ej. "Sistema de onboarding con 3 pasos"]

INSTRUCCIONES:
1. Lee AGENTS.md para entender el proyecto
2. Analizar qué componentes existentes se pueden reutilizar
3. Crear nuevos componentes SOLO si no existen equivalentes
4. Estructura modular y reutilizable

ESTRUCTURA SUGERIDA:
src/
├── components/
│   └── [NuevosComponentes]/   # Solo si necesarios
└── blocks/
    └── [categoria]/
        └── [NombreSolucion]/
            ├── [Paso1].tsx
            ├── [Paso2].tsx
            ├── [Paso3].tsx
            ├── index.ts
            └── [NombreSolucion].stories.tsx

ACCESIBILIDAD:
- Navegación por teclado entre pasos
- Progress indicator accesible
- Focus management al cambiar de paso
- Anunciar cambios a screen readers

VALIDACIÓN: npm run a11y:validate debe pasar

PR TITLE: feat([categoria]): add [nombre solución] flow
```

---

## Prompt de Contexto para Stitch

Antes de generar el diseño en Stitch, incluye este contexto:

```
CONTEXTO DE DESIGN SYSTEM:
- Proyecto: limbpuma/design-system-pipeline
- Stack: React 18 + TypeScript + Tailwind CSS
- Accesibilidad: WCAG 2.1 AA obligatorio
- Contraste mínimo: 4.5:1

COLORES SEMÁNTICOS:
Light Mode:
- Background: white (#ffffff)
- Foreground: gray-900 (#111827)
- Muted text: slate-500 (#64748b) - 5.5:1 ratio
- Primary: blue-600 (#2563eb)
- Destructive: red-600 (#dc2626)
- Border: gray-200 (#e5e7eb)

Dark Mode:
- Background: gray-950 (#030712)
- Foreground: gray-50 (#f9fafb)
- Muted text: slate-400 (#94a3b8) - NUNCA slate-500
- Primary: blue-500 (#3b82f6)
- Border: gray-800 (#1f2937)

PATRONES REQUERIDOS:
- Transiciones: transition-all duration-200 ease-out
- Focus: focus-visible:ring-2 focus-visible:ring-offset-2
- Disabled: disabled:pointer-events-none disabled:opacity-50
- Hover: hover:bg-[semantic-color-hover]
- Active: active:scale-[0.98]

---

DISEÑO SOLICITADO:
[Tu solicitud aquí]
```

---

## Consejos

1. **Sé específico**: Cuanto más detallado el prompt, mejor resultado
2. **Referencia archivos**: Jules puede leer cualquier archivo del repo
3. **Indica validación**: Siempre incluir que debe pasar `a11y:validate`
4. **Branch naming**: Usar convención `feat/`, `fix/`, `update/`
5. **Reutilizar**: Mencionar componentes existentes que deben usarse
