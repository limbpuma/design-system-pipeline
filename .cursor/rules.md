# Cursor Rules - Design System Pipeline

## Project Context

This is a design system project that bridges Figma designs with React/Tailwind code.

## Design Tokens

- All design values (colors, spacing, typography) come from `tokens/` directory
- Never hardcode values - always reference tokens
- Tokens are transformed via Style Dictionary to Tailwind preset

## Component Guidelines

1. **Naming**: Use PascalCase for components
2. **Location**: Components in `src/components/[ComponentName]/`
3. **Structure**:
   - `ComponentName.tsx` - Main component
   - `ComponentName.stories.tsx` - Storybook stories
   - `ComponentName.test.tsx` - Tests
   - `index.ts` - Exports

## Styling Rules

1. Use Tailwind utility classes exclusively
2. Use CVA (class-variance-authority) for component variants
3. Use `cn()` helper for conditional classes
4. Reference semantic colors: `bg-primary`, `text-secondary`, etc.

## MCP Integration

When implementing Figma designs:
1. First analyze the design structure via Figma MCP
2. Map Figma variables to our token system
3. Generate code using our component patterns
4. Ensure pixel-perfect implementation

## Code Style

- TypeScript strict mode
- Functional components with hooks
- Props interfaces named `{Component}Props`
- Export both named and default exports

## Commands

```bash
npm run tokens:build  # Rebuild tokens from JSON
npm run storybook     # Start Storybook dev server
npm run build         # Build for production
```
