# Example: Next.js App with Design System

This example demonstrates how to use `@limbpuma/design-system` in a Next.js project.

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Key Files

- `tailwind.config.js` - Uses the design system preset
- `app/layout.tsx` - Imports design system styles
- `app/page.tsx` - Uses Button component from design system

## How it Works

### 1. Import the Tailwind Preset

```js
// tailwind.config.js
import preset from '@limbpuma/design-system/tailwind-preset';

export default {
  presets: [preset],
  // ...
};
```

### 2. Import CSS Variables

```tsx
// app/layout.tsx
import '@limbpuma/design-system/styles';
```

### 3. Use Components

```tsx
import { Button } from '@limbpuma/design-system';

<Button variant="primary">Click me</Button>
```

## When Design System Updates

```bash
# Update to latest version
npm update @limbpuma/design-system

# Rebuild
npm run build
```

All tokens, components, and styles will update automatically.
