# Accessibility Guide - Design System Pipeline

## Overview

This design system targets **WCAG 2.1 Level AA** compliance. All components must be accessible to users with disabilities, including those using:

- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- Voice control software
- Screen magnification
- High contrast modes

---

## WCAG 2.1 AA Requirements

### 1. Perceivable

#### 1.1 Text Alternatives
| Element | Requirement | Example |
|---------|-------------|---------|
| Informative images | Descriptive `alt` text | `<img alt="House with red roof in Madrid">` |
| Decorative images | Empty `alt` | `<img alt="" aria-hidden="true">` |
| Icon buttons | `aria-label` | `<button aria-label="Close dialog">` |
| Complex images | Long description | `aria-describedby` pointing to description |

#### 1.3 Adaptable
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>`)
- Logical heading hierarchy (h1 > h2 > h3, no skipping)
- Form labels programmatically associated with inputs
- Reading order matches visual order

#### 1.4 Distinguishable
| Criterion | Requirement |
|-----------|-------------|
| Color contrast (text) | 4.5:1 minimum (3:1 for large text 18px+) |
| Color contrast (UI) | 3:1 for borders, icons, focus indicators |
| Color not sole indicator | Always pair color with icon/text/pattern |
| Text resize | Content works at 200% zoom |
| Reflow | No horizontal scroll at 320px width |

**Color Combinations to Use:**
```tsx
// High contrast - CORRECT
'bg-green-100 text-green-900'   // Light mode
'bg-green-900 text-green-100'   // Dark mode

// Low contrast - WRONG
'bg-green-50 text-green-400'    // Fails contrast
```

---

### 2. Operable

#### 2.1 Keyboard Accessible
ALL functionality must be available via keyboard:

| Key | Expected Action |
|-----|-----------------|
| `Tab` | Move to next focusable element |
| `Shift+Tab` | Move to previous focusable element |
| `Enter` | Activate button/link |
| `Space` | Activate button, toggle checkbox |
| `Escape` | Close modal/dropdown/popover |
| `Arrow keys` | Navigate within widgets (menus, tabs, listbox) |
| `Home/End` | Jump to first/last item in list |

**Implementation Pattern:**
```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      handleActivate();
      break;
    case 'Escape':
      handleClose();
      break;
    case 'ArrowDown':
      e.preventDefault();
      focusNextItem();
      break;
    case 'ArrowUp':
      e.preventDefault();
      focusPreviousItem();
      break;
  }
};
```

#### 2.4 Navigable
- **Focus visible**: Always show focus indicator
- **Focus order**: Logical tab sequence
- **Skip links**: Provide for complex pages
- **Page titles**: Descriptive and unique
- **Link purpose**: Clear from link text alone

**Focus Styles:**
```tsx
// Required on ALL interactive elements
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--semantic-color-ring-default)]'
```

#### 2.5 Input Modalities
- Touch targets: Minimum 44x44px
- Pointer gestures: Provide alternatives to complex gestures
- Motion actuation: Provide non-motion alternatives

---

### 3. Understandable

#### 3.1 Readable
- Declare page language: `<html lang="en">`
- Identify language changes: `<span lang="es">Hola</span>`

#### 3.2 Predictable
- Consistent navigation across pages
- Consistent identification of repeated elements
- No unexpected context changes on focus/input

#### 3.3 Input Assistance
- Error identification: Clear error messages
- Labels: Always visible (not just placeholders)
- Error suggestions: Provide correction hints
- Error prevention: Confirmation for destructive actions

**Form Pattern:**
```tsx
<div>
  <label htmlFor="email">Email address</label>
  <input
    id="email"
    type="email"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" role="alert" className="text-red-700">
      Please enter a valid email address
    </p>
  )}
</div>
```

---

### 4. Robust

#### 4.1 Compatible
- Valid HTML
- Correct use of ARIA
- Status messages announced to screen readers

---

## ARIA Patterns

### When to Use ARIA
1. **First**: Use native HTML (`<button>`, `<input>`, `<select>`)
2. **Only if needed**: Add ARIA for custom widgets
3. **Rule**: "No ARIA is better than bad ARIA"

### Common Patterns

#### Button
```tsx
// Native button - preferred
<button onClick={handleClick}>Submit</button>

// Icon-only button - needs aria-label
<button aria-label="Close dialog" onClick={handleClose}>
  <XIcon aria-hidden="true" />
</button>
```

#### Toggle Button
```tsx
<button
  aria-pressed={isPressed}
  onClick={() => setIsPressed(!isPressed)}
>
  {isPressed ? 'On' : 'Off'}
</button>
```

#### Link vs Button
```tsx
// Link - for navigation
<a href="/page">Go to page</a>

// Button - for actions
<button onClick={handleAction}>Save</button>

// WRONG - never do this
<a onClick={handleAction}>Save</a>
<div onClick={handleNavigation}>Go to page</div>
```

#### Dialog/Modal
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p id="dialog-desc">Are you sure you want to proceed?</p>
  <button>Cancel</button>
  <button>Confirm</button>
</div>
```

**Focus Management for Modals:**
1. Move focus to modal when opened (first focusable or modal itself)
2. Trap focus inside modal (Tab cycles within)
3. Return focus to trigger when closed
4. Close on Escape key

#### Tabs
```tsx
<div role="tablist" aria-label="Content sections">
  <button
    role="tab"
    id="tab-1"
    aria-selected={activeTab === 0}
    aria-controls="panel-1"
    tabIndex={activeTab === 0 ? 0 : -1}
  >
    Tab 1
  </button>
  <button
    role="tab"
    id="tab-2"
    aria-selected={activeTab === 1}
    aria-controls="panel-2"
    tabIndex={activeTab === 1 ? 0 : -1}
  >
    Tab 2
  </button>
</div>
<div
  role="tabpanel"
  id="panel-1"
  aria-labelledby="tab-1"
  hidden={activeTab !== 0}
>
  Panel 1 content
</div>
```

**Keyboard for Tabs:**
- `Arrow Left/Right`: Navigate between tabs
- `Home`: First tab
- `End`: Last tab
- `Enter/Space`: Activate tab (if not auto-activated)

#### Combobox/Autocomplete
```tsx
<div>
  <label htmlFor="search">Search</label>
  <input
    id="search"
    type="text"
    role="combobox"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-controls="suggestions"
    aria-autocomplete="list"
    aria-activedescendant={activeId}
  />
  {isOpen && (
    <ul id="suggestions" role="listbox">
      {items.map((item, i) => (
        <li
          key={item.id}
          id={`option-${i}`}
          role="option"
          aria-selected={activeIndex === i}
        >
          {item.label}
        </li>
      ))}
    </ul>
  )}
</div>
```

#### Alert/Status Messages
```tsx
// For important, time-sensitive messages
<div role="alert">
  Error: Your session has expired
</div>

// For status updates (less urgent)
<div role="status" aria-live="polite">
  3 items added to cart
</div>

// For live regions with custom announcements
<div aria-live="assertive" aria-atomic="true">
  {announcement}
</div>
```

#### Tooltip (Non-interactive)
```tsx
<button aria-describedby="tooltip-1">
  Info
</button>
<div id="tooltip-1" role="tooltip">
  Additional information
</div>
```

**Note**: For interactive content, use `role="dialog"` not `role="tooltip"`.

---

## Testing Checklist

### Manual Testing
- [ ] Navigate entire UI with keyboard only
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Check focus visibility on all interactive elements
- [ ] Verify color contrast with browser DevTools
- [ ] Test at 200% zoom
- [ ] Test with high contrast mode
- [ ] Test with reduced motion preference

### Automated Testing
- [ ] axe-core in CI pipeline
- [ ] Storybook a11y addon (all stories green)
- [ ] ESLint jsx-a11y plugin

### Screen Reader Testing Script
1. Can you identify all interactive elements?
2. Are form fields properly labeled?
3. Are error messages announced?
4. Can you navigate by headings?
5. Are images described appropriately?
6. Do buttons announce their state?
7. Are dialogs announced when opened?

---

## Common Mistakes

### 1. Div with onClick
```tsx
// WRONG
<div onClick={handleClick} className="button">Click me</div>

// CORRECT
<button onClick={handleClick}>Click me</button>
```

### 2. Missing Labels
```tsx
// WRONG
<input placeholder="Enter email" />

// CORRECT
<label htmlFor="email">Email</label>
<input id="email" placeholder="Enter email" />
```

### 3. Title Instead of aria-label
```tsx
// WRONG - screen readers may not read title
<button title="Close">X</button>

// CORRECT
<button aria-label="Close dialog">X</button>
```

### 4. Decorative Icons/SVGs Read Aloud (CRITICAL)

**EVERY decorative SVG MUST have `aria-hidden="true"`**

```tsx
// WRONG - icon read by screen reader
<button>
  <SearchIcon /> Search
</button>

// CORRECT
<button>
  <SearchIcon aria-hidden="true" /> Search
</button>
```

#### Mandatory SVG Patterns

**Pattern 1: Inline SVG**
```tsx
<svg
  className="w-4 h-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  aria-hidden="true"  // ← ALWAYS REQUIRED
>
  <path strokeLinecap="round" strokeLinejoin="round" d="..." />
</svg>
```

**Pattern 2: Icon Component**
```tsx
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"  // ← ALWAYS REQUIRED
  >
    <path d="..." />
  </svg>
);
```

**Pattern 3: Single-line SVG**
```tsx
<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="..." />
</svg>
```

#### Verification

Before committing, verify all SVGs have aria-hidden:
```bash
# Check for SVGs missing aria-hidden
grep -r "<svg" src/components/YourComponent --include="*.tsx" | grep -v "aria-hidden"
# Should return NO results
```

### 5. Color-Only Indication
```tsx
// WRONG
<span className="text-red-500">Required</span>

// CORRECT
<span className="text-red-700">
  <span aria-hidden="true">*</span> Required
</span>
```

### 6. Interactive Tooltip
```tsx
// WRONG - tooltip shouldn't have interactive content
<div role="tooltip">
  <button>Click me</button>
</div>

// CORRECT - use dialog for interactive content
<div role="dialog" aria-label="Options">
  <button>Click me</button>
</div>
```

---

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
