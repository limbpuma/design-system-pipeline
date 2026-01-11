# Design System Pipeline - Gap Analysis

**Fecha**: 2026-01-11
**Estado**: Análisis completo del sistema

---

## Resumen Ejecutivo

El sistema tiene una **base sólida** con tokens, componentes y documentación, pero presenta gaps en:
1. Testing (crítico)
2. Consistencia de estructura
3. MCP server implementation
4. Tokens semánticos faltantes

---

## Gaps Identificados

### 1. CRÍTICO: Sin Unit Tests

**Estado actual**: No existen tests unitarios para componentes
**Impacto**: Alto - No hay garantía de que los componentes funcionen correctamente

```
❌ No existe vitest.config.ts
❌ No existen archivos *.test.tsx en src/
❌ El script "test" existe pero no hay tests que ejecutar
```

**Recomendación**:
```bash
# Crear configuración de vitest
# Crear tests para cada componente
# Agregar testing-library/react
```

**Archivos necesarios**:
- `vitest.config.ts`
- `src/components/Button/Button.test.tsx`
- `src/components/Card/Card.test.tsx`
- etc.

---

### 2. ALTO: Stories No Co-localizadas

**Estado actual**: Stories en `src/stories/` separadas de componentes
**Impacto**: Medio - Dificulta mantenimiento y descubrimiento

```
❌ Actual:
src/
├── components/Button/Button.tsx
└── stories/Button.stories.tsx  ← Separado

✅ Recomendado:
src/components/Button/
├── Button.tsx
├── Button.stories.tsx  ← Co-localizado
├── Button.test.tsx
└── index.ts
```

---

### 3. ALTO: MCP Server Incompleto

**Estado actual**: Server creado pero sin package.json ni dependencias
**Impacto**: Alto - No se puede ejecutar

**Archivos necesarios**:
```
mcp-server/
├── package.json     ← FALTA
├── index.js         ✅ Existe
└── README.md        ← FALTA
```

**package.json requerido**:
```json
{
  "name": "design-system-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  }
}
```

---

### 4. MEDIO: Documentación MCP Inconsistente

**Estado actual**: MCP docs referencian archivos que no existen
**Impacto**: Medio - Confusión para usuarios de MCP

**Referencias rotas**:
```
❌ tokens/semantic/brand.json - NO EXISTE
❌ tokens/semantic/feedback.json - NO EXISTE
✅ tokens/semantic/colors.json - EXISTE (contiene brand y feedback)
```

**Opción A**: Crear archivos separados brand.json y feedback.json
**Opción B**: Actualizar documentación para usar colors.json

---

### 5. MEDIO: Vitest No Configurado

**Estado actual**: vitest en devDependencies pero sin configuración
**Impacto**: Medio - Tests no funcionan

**Archivo necesario**: `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

---

### 6. BAJO: Falta tests E2E Storybook

**Estado actual**: `test:a11y` script existe pero depende de `@storybook/test-runner` no instalado
**Impacto**: Bajo - A11y testing en CI no funciona

**En package.json**:
```json
"@storybook/test-runner": "^0.17.0"  // ← FALTA en devDependencies
```

---

### 7. BAJO: TypeScript Strict Mode Incompleto

**Estado actual**: `strict: true` pero podría tener más reglas
**Impacto**: Bajo

**Recomendaciones adicionales**:
```json
{
  "compilerOptions": {
    "exactOptionalPropertyTypes": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

---

## Matriz de Prioridades

| Gap | Prioridad | Esfuerzo | Impacto |
|-----|-----------|----------|---------|
| Unit Tests | 🔴 Crítico | Alto | Alto |
| Stories Co-localizadas | 🟡 Alto | Medio | Medio |
| MCP Server package.json | 🟡 Alto | Bajo | Alto |
| Docs MCP Inconsistentes | 🟡 Medio | Bajo | Medio |
| Vitest Config | 🟡 Medio | Bajo | Medio |
| Storybook Test Runner | 🟢 Bajo | Bajo | Bajo |
| TypeScript Strict | 🟢 Bajo | Bajo | Bajo |

---

## Lo Que Está Bien ✅

### Tokens
- ✅ Estructura primitives → semantic clara
- ✅ Accessibility tokens definidos (focus, touch, motion)
- ✅ Dark mode support (colors-dark.json)
- ✅ Style Dictionary configurado

### Componentes
- ✅ CVA para variants
- ✅ Radix UI para accesibilidad base
- ✅ TypeScript tipado
- ✅ Exportaciones limpias en index.ts

### Documentación
- ✅ ARCHITECTURE.md completo
- ✅ ACCESSIBILITY.md con WCAG 2.1 AA
- ✅ COMPONENT-GUIDELINES.md detallado
- ✅ MCP-INTEGRATION.md (aunque con refs rotas)
- ✅ Rules en .cursor/rules.md

### CI/CD
- ✅ Deploy to GitHub Pages
- ✅ A11y testing en workflow (aunque continue-on-error)

### ESLint
- ✅ jsx-a11y plugin configurado
- ✅ Reglas estrictas de accesibilidad

### Storybook
- ✅ Addon a11y configurado
- ✅ WCAG rules en preview.ts
- ✅ Backgrounds y viewports

---

## Plan de Acción Recomendado

### Fase 1: Testing (1-2 días)
1. Crear `vitest.config.ts`
2. Instalar `@testing-library/react` y `jsdom`
3. Crear tests básicos para cada componente
4. Instalar `@storybook/test-runner`

### Fase 2: Estructura (1 día)
1. Mover stories a carpetas de componentes
2. Crear MCP server package.json
3. Actualizar imports en Storybook

### Fase 3: Documentación (medio día)
1. Corregir referencias en MCP-INTEGRATION.md
2. O crear brand.json y feedback.json separados

### Fase 4: Mejoras (opcional)
1. Agregar más reglas TypeScript
2. Configurar husky para pre-commit hooks
3. Agregar commitlint

---

## Archivos a Crear/Modificar

### Crear
- [ ] `vitest.config.ts`
- [ ] `src/test/setup.ts`
- [ ] `src/components/*/ComponentName.test.tsx` (6 archivos)
- [ ] `mcp-server/package.json`
- [ ] `mcp-server/README.md`

### Modificar
- [ ] `package.json` - agregar test dependencies
- [ ] `docs/MCP-INTEGRATION.md` - corregir referencias
- [ ] Mover stories de `src/stories/` a `src/components/*/`

### Opcional
- [ ] `tokens/semantic/brand.json`
- [ ] `tokens/semantic/feedback.json`
- [ ] `.husky/pre-commit`
- [ ] `commitlint.config.js`

---

## Conclusión

El sistema está **75% completo** y bien estructurado. Los gaps principales son:

1. **Testing** - Crítico para producción
2. **MCP Server** - Necesita package.json para funcionar
3. **Consistencia** - Stories deberían estar co-localizadas

Con las correcciones propuestas, el sistema estará listo para:
- Consumo por AI agents vía MCP
- Desarrollo colaborativo con humanos
- Deploy a producción con confianza
