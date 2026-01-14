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
3. Usa tokens semánticos CSS (var(--semantic-color-*))
4. Sigue reglas de accesibilidad de docs/accessibility/A11Y-ERROR-GUIDE.md:
   - Usa tokens semánticos para contraste automático
   - SVGs decorativos: aria-hidden="true"
   - Botones icon-only: aria-label obligatorio
5. Crea archivo .stories.tsx con decorator withA11yStoryWrapper
6. Dark mode automático via tokens semánticos (NO usar dark: prefix)
7. Agrega TypeScript types para todas las props

TOKENS SEMÁNTICOS (OBLIGATORIO):
✅ CORRECTO:
- bg-[var(--semantic-color-background-default)]
- text-[var(--semantic-color-foreground-default)]
- text-[var(--semantic-color-foreground-muted)]
- border-[var(--semantic-color-border-default)]

❌ INCORRECTO:
- bg-white dark:bg-gray-950
- text-gray-500 dark:text-gray-400

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
   - Mobile (responsive preview)

TOKENS SEMÁNTICOS (OBLIGATORIO):
Usar variables CSS semánticas en lugar de clases directas:
- bg-[var(--semantic-color-background-default)]
- text-[var(--semantic-color-foreground-default)]
- text-[var(--semantic-color-foreground-muted)]
- bg-[var(--semantic-color-primary-default)]

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
6. Dark mode automático via tokens semánticos

TOKENS SEMÁNTICOS (OBLIGATORIO):
✅ CORRECTO:
- bg-[var(--semantic-color-background-default)]
- bg-[var(--semantic-color-background-subtle)]
- text-[var(--semantic-color-foreground-default)]
- text-[var(--semantic-color-foreground-muted)]
- border-[var(--semantic-color-border-default)]

❌ INCORRECTO:
- bg-white dark:bg-gray-950
- text-gray-500 dark:text-gray-400

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

TOKENS SEMÁNTICOS (OBLIGATORIO):
Usar variables CSS para colores:
- Texto principal: text-[var(--semantic-color-foreground-default)]
- Texto muted: text-[var(--semantic-color-foreground-muted)]
- Fondo: bg-[var(--semantic-color-background-default)]
- Fondo sutil: bg-[var(--semantic-color-background-subtle)]

ACCESIBILIDAD ESPECÍFICA:
- Chat container: role="log" aria-live="polite"
- Mensajes nuevos anunciados a screen readers
- Input de mensaje: aria-label descriptivo
- Botón enviar: aria-label="Enviar mensaje"
- Typing indicator: aria-live="polite" aria-label="El asistente está escribiendo"

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

1. COLORES SIN TOKENS SEMÁNTICOS:
   ❌ text-gray-500 dark:text-gray-400
   ✅ text-[var(--semantic-color-foreground-muted)]

   ❌ bg-white dark:bg-gray-950
   ✅ bg-[var(--semantic-color-background-default)]

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
4. Migrar a tokens semánticos CSS
5. Re-ejecutar validación
6. Solo crear PR si pasa validación

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
6. Usar tokens semánticos CSS para todos los colores

TOKENS SEMÁNTICOS:
Si el componente usa clases directas de Tailwind, migrar a tokens:
- bg-white → bg-[var(--semantic-color-background-default)]
- text-gray-900 → text-[var(--semantic-color-foreground-default)]
- text-gray-500 → text-[var(--semantic-color-foreground-muted)]

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
5. Usar tokens semánticos CSS para TODOS los colores

TOKENS SEMÁNTICOS (OBLIGATORIO):
Ver src/styles/generated/variables.css para lista completa.
Variables principales:
- --semantic-color-background-default
- --semantic-color-background-subtle
- --semantic-color-foreground-default
- --semantic-color-foreground-muted
- --semantic-color-primary-default
- --semantic-color-border-default

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
- Stack: React 19 + TypeScript + Tailwind CSS
- Accesibilidad: WCAG 2.1 AA obligatorio
- Contraste: Automático via tokens semánticos

TOKENS SEMÁNTICOS CSS (OBLIGATORIO):
Usar variables CSS en lugar de clases directas de Tailwind:

✅ CORRECTO:
- bg-[var(--semantic-color-background-default)]
- bg-[var(--semantic-color-background-subtle)]
- text-[var(--semantic-color-foreground-default)]
- text-[var(--semantic-color-foreground-muted)]
- bg-[var(--semantic-color-primary-default)]
- text-[var(--semantic-color-primary-foreground)]
- border-[var(--semantic-color-border-default)]

❌ INCORRECTO:
- bg-white dark:bg-gray-950
- text-gray-900 dark:text-gray-50
- text-gray-500 dark:text-gray-400

PATRONES REQUERIDOS:
- Transiciones: transition-all duration-200 ease-out
- Focus: focus-visible:ring-2 focus-visible:ring-offset-2
- Disabled: disabled:pointer-events-none disabled:opacity-50
- Hover: hover:bg-[var(--semantic-color-*-hover)]
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
6. **Tokens semánticos**: SIEMPRE usar variables CSS, nunca clases directas

---

*Actualizado: Enero 2026 - Migrado a tokens semánticos CSS*
