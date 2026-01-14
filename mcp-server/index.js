#!/usr/bin/env node

/**
 * Design System MCP Server
 *
 * Exposes the design system to AI agents via Model Context Protocol.
 *
 * Usage:
 *   node mcp-server/index.js
 *
 * Configure in Claude Desktop:
 *   {
 *     "mcpServers": {
 *       "design-system": {
 *         "command": "node",
 *         "args": ["/path/to/design-system-pipeline/mcp-server/index.js"]
 *       }
 *     }
 *   }
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// Initialize MCP Server
const server = new Server(
  {
    name: "design-system-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// ============================================
// RESOURCES
// ============================================

const RESOURCES = [
  {
    uri: "design://tokens/primitives/colors",
    name: "Primitive Colors",
    description: "Base color palette (gray, blue, green, red, yellow, etc.)",
    mimeType: "application/json",
    path: "tokens/primitives/colors.json",
  },
  {
    uri: "design://tokens/primitives/typography",
    name: "Typography Tokens",
    description: "Font families, sizes, weights, line heights",
    mimeType: "application/json",
    path: "tokens/primitives/typography.json",
  },
  {
    uri: "design://tokens/primitives/spacing",
    name: "Spacing Tokens",
    description: "Spacing scale (4px base unit)",
    mimeType: "application/json",
    path: "tokens/primitives/spacing.json",
  },
  {
    uri: "design://tokens/primitives/shadows",
    name: "Shadow Tokens",
    description: "Box shadow definitions",
    mimeType: "application/json",
    path: "tokens/primitives/shadows.json",
  },
  {
    uri: "design://tokens/primitives/radii",
    name: "Border Radius Tokens",
    description: "Border radius values",
    mimeType: "application/json",
    path: "tokens/primitives/radii.json",
  },
  {
    uri: "design://tokens/semantic/colors",
    name: "Semantic Colors",
    description: "Primary, secondary, success, warning, destructive colors",
    mimeType: "application/json",
    path: "tokens/semantic/colors.json",
  },
  {
    uri: "design://tokens/semantic/colors-dark",
    name: "Dark Mode Colors",
    description: "Semantic colors for dark mode",
    mimeType: "application/json",
    path: "tokens/semantic/colors-dark.json",
  },
  {
    uri: "design://tokens/semantic/components",
    name: "Component Tokens",
    description: "Component-specific design tokens",
    mimeType: "application/json",
    path: "tokens/semantic/components.json",
  },
  {
    uri: "design://tokens/semantic/accessibility",
    name: "Accessibility Tokens",
    description: "Focus rings, touch targets, motion, contrast ratios",
    mimeType: "application/json",
    path: "tokens/semantic/accessibility.json",
  },
  {
    uri: "design://rules/accessibility",
    name: "Accessibility Rules",
    description: "WCAG 2.1 AA compliance requirements",
    mimeType: "text/markdown",
    path: "docs/ACCESSIBILITY.md",
  },
  {
    uri: "design://rules/development",
    name: "Development Rules",
    description: "Complete ruleset for AI and human developers",
    mimeType: "text/markdown",
    path: ".cursor/rules.md",
  },
  {
    uri: "design://rules/quality",
    name: "Design Quality Framework",
    description: "⚠️ MANDATORY - Quality standards for all components. MUST READ before creating components.",
    mimeType: "text/markdown",
    path: "docs/DESIGN-QUALITY-FRAMEWORK.md",
  },
  {
    uri: "design://system/instructions",
    name: "AI Agent Instructions",
    description: "🚨 CRITICAL - System instructions for AI agents. READ THIS FIRST.",
    mimeType: "text/markdown",
    path: "docs/AI-AGENT-INSTRUCTIONS.md",
  },
  {
    uri: "design://css/variables",
    name: "CSS Variables",
    description: "Generated CSS custom properties",
    mimeType: "text/css",
    path: "src/styles/generated/variables.css",
  },
  {
    uri: "design://tailwind/preset",
    name: "Tailwind Preset",
    description: "Tailwind CSS configuration preset",
    mimeType: "application/javascript",
    path: "src/styles/generated/tailwind.preset.js",
  },
];

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: RESOURCES.map(({ uri, name, description, mimeType }) => ({
    uri,
    name,
    description,
    mimeType,
  })),
}));

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const resource = RESOURCES.find((r) => r.uri === request.params.uri);

  if (!resource) {
    throw new Error(`Resource not found: ${request.params.uri}`);
  }

  const filePath = path.join(ROOT_DIR, resource.path);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return {
      contents: [
        {
          uri: resource.uri,
          mimeType: resource.mimeType,
          text: content,
        },
      ],
    };
  } catch (error) {
    throw new Error(`Failed to read resource: ${error.message}`);
  }
});

// ============================================
// TOOLS
// ============================================

const TOOLS = [
  {
    name: "list_components",
    description: "List all available React components in the design system",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_component",
    description: "Get the source code and props interface for a specific component",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Component name (e.g., Button, Card, Dialog)",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get_component_stories",
    description: "Get Storybook stories for a component",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Component name",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "validate_accessibility",
    description: "Get accessibility checklist for a component type, including AI-specific interfaces",
    inputSchema: {
      type: "object",
      properties: {
        componentType: {
          type: "string",
          enum: ["button", "dialog", "tabs", "combobox", "form", "navigation", "ai-chat", "ai-progress", "ai-results"],
          description: "Type of component to get accessibility requirements for. Use ai-chat, ai-progress, or ai-results for AI-specific components.",
        },
      },
      required: ["componentType"],
    },
  },
  {
    name: "get_color_token",
    description: "Get a specific color token value",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["semantic", "semantic-dark", "primitives"],
          description: "Token category (semantic = light mode semantic colors, primitives = base colors)",
        },
        name: {
          type: "string",
          description: "Token name path (e.g., semantic.color.primary.default, color.gray.500)",
        },
      },
      required: ["category", "name"],
    },
  },
  // ============================================
  // BLOCKS & LAYOUTS TOOLS
  // ============================================
  {
    name: "list_blocks",
    description: "List available UI blocks (page sections) with optional filtering. Includes AI-specific blocks for analysis workflows, chat interfaces, and AI results display.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["marketing", "application", "ecommerce", "authentication", "common", "ai"],
          description: "Filter by block category. Use 'ai' for AI-specific blocks like ImageUploader, AnalysisProgress, ConversationPanel, AIResultsCard.",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "Filter by tags (e.g., ['hero', 'conversion'])",
        },
      },
      required: [],
    },
  },
  {
    name: "get_block",
    description: "Get block source code and metadata",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Block ID (e.g., hero-section, feature-grid, stats-cards)",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "list_layouts",
    description: "List available page layouts",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["shell", "auth", "marketing", "minimal"],
          description: "Filter by layout category",
        },
      },
      required: [],
    },
  },
  {
    name: "get_layout",
    description: "Get layout source code and metadata",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Layout ID (e.g., app-shell, auth-layout, marketing-layout)",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "search_design_system",
    description: "Search across components, blocks, layouts, and templates",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query (e.g., 'dashboard', 'hero', 'authentication')",
        },
        type: {
          type: "string",
          enum: ["all", "components", "blocks", "layouts", "templates"],
          description: "Filter by type (default: all)",
        },
      },
      required: ["query"],
    },
  },
  // ============================================
  // TEMPLATES TOOLS
  // ============================================
  {
    name: "list_templates",
    description: "List available page templates with optional filtering. Includes AI-first templates for analysis workflows and conversational interfaces.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["marketing", "authentication", "dashboard", "ecommerce", "ai"],
          description: "Filter by template category. Use 'ai' for AI-specific templates like AIAnalysisPage and ChatInterface.",
        },
        layout: {
          type: "string",
          description: "Filter by layout used (e.g., AppShell, AuthLayout, MarketingLayout)",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "Filter by tags (e.g., ['login', 'complete-page'])",
        },
      },
      required: [],
    },
  },
  {
    name: "get_template",
    description: "Get template source code and metadata",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Template ID (e.g., login-page, dashboard-overview, landing-page)",
        },
      },
      required: ["id"],
    },
  },
  // ============================================
  // INPUT TOOLS (AI → Design System)
  // ============================================
  {
    name: "submit_component",
    description: "Submit a new React component to the design system from AI tools (Google Stitch, v0.dev, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Component name in PascalCase (e.g., FeatureCard, PricingTable)",
        },
        code: {
          type: "string",
          description: "Complete React/TypeScript component code with Tailwind CSS",
        },
        category: {
          type: "string",
          enum: ["primitives", "components", "blocks", "layouts", "templates"],
          description: "Component category in atomic design hierarchy",
        },
        description: {
          type: "string",
          description: "Brief description of the component's purpose",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "Tags for categorization (e.g., ['marketing', 'hero', 'cta'])",
        },
      },
      required: ["name", "code", "category"],
    },
  },
  {
    name: "validate_component",
    description: "Validate a React component for accessibility, TypeScript types, and design system compliance",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "Component code to validate",
        },
        checks: {
          type: "array",
          items: {
            type: "string",
            enum: ["accessibility", "typescript", "tailwind", "naming", "all"],
          },
          description: "Validation checks to perform (default: all)",
        },
      },
      required: ["code"],
    },
  },
  {
    name: "generate_story",
    description: "Auto-generate a Storybook story file for a component",
    inputSchema: {
      type: "object",
      properties: {
        componentName: {
          type: "string",
          description: "Name of the component",
        },
        componentPath: {
          type: "string",
          description: "Path to the component (e.g., components/Button)",
        },
        variants: {
          type: "array",
          items: { type: "string" },
          description: "Variants to generate stories for (e.g., ['primary', 'secondary', 'outline'])",
        },
      },
      required: ["componentName", "componentPath"],
    },
  },
  {
    name: "get_design_system_summary",
    description: "Get a complete summary of the design system for AI agents to understand available resources",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  // ============================================
  // COMPLIANCE TOOLS (ISO 27001 / WCAG 2.2 / SOC2)
  // ============================================
  {
    name: "security_scan",
    description: "Scan component code for security vulnerabilities (XSS, injection, exposed secrets, etc.)",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "Component code to scan for security issues",
        },
        severity: {
          type: "string",
          enum: ["all", "critical", "high", "medium"],
          description: "Minimum severity level to report (default: all)",
        },
      },
      required: ["code"],
    },
  },
  {
    name: "validate_compliance",
    description: "Run full compliance validation (security + accessibility + code quality + GDPR) on a component",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "Component code to validate",
        },
        checks: {
          type: "array",
          items: {
            type: "string",
            enum: ["security", "accessibility", "code-quality", "gdpr", "all"],
          },
          description: "Compliance checks to run (default: all)",
        },
      },
      required: ["code"],
    },
  },
  {
    name: "get_compliance_score",
    description: "Calculate compliance score and certification status for a component",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "Component code to score",
        },
      },
      required: ["code"],
    },
  },

  // =========================================
  // DESIGN QUALITY TOOLS
  // =========================================
  {
    name: "validate_design_quality",
    description: "Validate design quality of a component checking micro-interactions, animations, visual depth, and premium patterns",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "Component code to validate for design quality",
        },
        componentType: {
          type: "string",
          enum: ["primitive", "block", "template", "layout"],
          description: "Type of component (affects minimum score requirements)",
        },
      },
      required: ["code"],
    },
  },
  {
    name: "get_design_quality_score",
    description: "Calculate comprehensive design quality score with detailed breakdown",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "Component code to score",
        },
      },
      required: ["code"],
    },
  },
  {
    name: "suggest_design_improvements",
    description: "Get AI-powered suggestions to elevate component from 'functional' to 'exceptional'",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "Component code to analyze",
        },
        focusArea: {
          type: "string",
          enum: ["micro-interactions", "animations", "visual-depth", "feedback-states", "all"],
          description: "Specific area to focus improvements on",
        },
      },
      required: ["code"],
    },
  },
];

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "list_components": {
      const componentsDir = path.join(ROOT_DIR, "src/components");
      try {
        const entries = await fs.readdir(componentsDir, { withFileTypes: true });
        const components = entries
          .filter((e) => e.isDirectory())
          .map((e) => e.name);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  components,
                  count: components.length,
                  importExample: `import { ${components.join(", ")} } from '@limbpuma/design-system';`,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "get_component": {
      const componentName = args.name;
      const componentDir = path.join(ROOT_DIR, "src/components", componentName);

      try {
        const files = await fs.readdir(componentDir);
        const mainFile = files.find(
          (f) => f === `${componentName}.tsx` || f === "index.tsx"
        );

        if (!mainFile) {
          throw new Error(`Component file not found in ${componentDir}`);
        }

        const content = await fs.readFile(
          path.join(componentDir, mainFile),
          "utf-8"
        );

        return {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "get_component_stories": {
      const componentName = args.name;
      const storiesPath = path.join(
        ROOT_DIR,
        "src/components",
        componentName,
        `${componentName}.stories.tsx`
      );

      try {
        const content = await fs.readFile(storiesPath, "utf-8");
        return {
          content: [{ type: "text", text: content }],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "validate_accessibility": {
      const checklists = {
        button: `
## Button Accessibility Checklist

- [ ] Has accessible name (text content or aria-label)
- [ ] Uses <button> element (not div/span)
- [ ] Has type attribute (button/submit/reset)
- [ ] Disabled state uses aria-disabled, not disabled attribute (for focus)
- [ ] Focus ring visible (2px, #3b82f6)
- [ ] Minimum touch target 44x44px
- [ ] Contrast ratio 4.5:1 for text
- [ ] Icon-only buttons have aria-label

### ARIA States
- aria-pressed (for toggle buttons)
- aria-expanded (for menu triggers)
- aria-haspopup (for menu triggers)
- aria-disabled (for disabled state)
`,
        dialog: `
## Dialog Accessibility Checklist

- [ ] Uses role="dialog" or <dialog> element
- [ ] Has aria-labelledby pointing to title
- [ ] Has aria-describedby for description (optional)
- [ ] Focus trapped inside dialog
- [ ] Focus moves to first focusable element on open
- [ ] Focus returns to trigger on close
- [ ] Escape key closes dialog
- [ ] Click outside closes dialog (with aria-modal="true")
- [ ] Background content has aria-hidden="true"

### Required ARIA
- role="dialog"
- aria-modal="true"
- aria-labelledby="dialog-title"
`,
        tabs: `
## Tabs Accessibility Checklist

- [ ] Tab list has role="tablist"
- [ ] Each tab has role="tab"
- [ ] Each panel has role="tabpanel"
- [ ] aria-selected on active tab
- [ ] aria-controls links tab to panel
- [ ] aria-labelledby links panel to tab
- [ ] Arrow keys navigate between tabs
- [ ] Tab key moves to panel content
- [ ] Home/End keys for first/last tab

### Required ARIA
- role="tablist" on container
- role="tab" on each tab
- role="tabpanel" on each panel
- aria-selected="true/false"
- aria-controls="panel-id"
- aria-labelledby="tab-id"
`,
        combobox: `
## Combobox (SearchBar) Accessibility Checklist

- [ ] Input has role="combobox"
- [ ] aria-expanded reflects listbox visibility
- [ ] aria-controls points to listbox
- [ ] Listbox has role="listbox"
- [ ] Options have role="option"
- [ ] aria-activedescendant for visual focus
- [ ] Arrow keys navigate options
- [ ] Enter selects option
- [ ] Escape closes listbox
- [ ] Results announced to screen readers

### Required ARIA
- role="combobox"
- aria-expanded="true/false"
- aria-controls="listbox-id"
- aria-activedescendant="option-id"
- aria-autocomplete="list/both/none"
`,
        form: `
## Form Accessibility Checklist

- [ ] All inputs have associated labels
- [ ] Labels use for/id or wrapping
- [ ] Required fields marked with aria-required
- [ ] Error messages linked with aria-describedby
- [ ] aria-invalid on fields with errors
- [ ] Form has accessible name (aria-labelledby or <legend>)
- [ ] Submit button has clear text
- [ ] Validation errors announced

### Required ARIA for Errors
- aria-invalid="true"
- aria-describedby="error-id"
- role="alert" on error container (for live announcements)
`,
        navigation: `
## Navigation Accessibility Checklist

- [ ] Uses <nav> element
- [ ] Has aria-label if multiple navs
- [ ] Current page marked with aria-current="page"
- [ ] Links have meaningful text
- [ ] Skip link available
- [ ] Mobile menu is keyboard accessible
- [ ] Hamburger button has aria-expanded
- [ ] Focus visible on all items

### Required ARIA
- aria-label="Main navigation"
- aria-current="page" on current link
- aria-expanded on mobile toggle
`,
        "ai-chat": `
## AI Chat Interface Accessibility Checklist

- [ ] Chat container has role="log" with aria-live="polite"
- [ ] Messages are properly labeled (user vs assistant)
- [ ] Streaming text updates announced to screen readers
- [ ] Loading/typing indicators have aria-label
- [ ] Input field has proper label
- [ ] Send button is keyboard accessible
- [ ] Voice input button has aria-label and state
- [ ] Error messages announced with role="alert"
- [ ] Message timestamps accessible
- [ ] Skip to latest message option

### Required ARIA
- role="log" on message container
- aria-live="polite" for new messages
- aria-busy="true" during AI response
- role="status" for typing indicator

### AI-Specific Considerations
- Announce when AI starts/stops responding
- Provide text alternatives for voice input
- Allow users to pause streaming responses
- Offer transcript/history download
`,
        "ai-progress": `
## AI Analysis Progress Accessibility Checklist

- [ ] Progress uses role="progressbar" or role="status"
- [ ] aria-valuenow, aria-valuemin, aria-valuemax set
- [ ] Step status changes announced
- [ ] Current step clearly identified
- [ ] Estimated time remaining announced
- [ ] Error states have role="alert"
- [ ] Cancel button accessible
- [ ] Non-visual indication of progress

### Required ARIA
- role="progressbar" for deterministic progress
- role="status" for step-based progress
- aria-valuenow="{percent}"
- aria-valuemin="0"
- aria-valuemax="100"
- aria-label="Analysis progress"

### AI-Specific Considerations
- Announce each analysis phase completion
- Provide abort/cancel functionality
- Explain what AI is doing in plain language
- Allow users to skip progress animation
`,
        "ai-results": `
## AI Results Card Accessibility Checklist

- [ ] Results container has appropriate landmark
- [ ] Score announced with context (e.g., "75 out of 100")
- [ ] Findings list uses semantic markup (ul/li)
- [ ] Severity levels color-independent (icons + text)
- [ ] Export/Share buttons keyboard accessible
- [ ] Expandable sections use aria-expanded
- [ ] Cost estimates properly formatted
- [ ] Images have meaningful alt text

### Required ARIA
- aria-labelledby on results section
- role="list" on findings container
- aria-expanded on collapsible sections
- aria-describedby for additional context

### AI-Specific Considerations
- Explain confidence levels in plain language
- Provide text alternative to visual score gauge
- Link findings to relevant documentation
- Allow findings to be filtered/sorted accessibly
- Offer results in multiple formats (PDF, text)
`,
      };

      const checklist = checklists[args.componentType];
      if (!checklist) {
        return {
          content: [
            {
              type: "text",
              text: `Unknown component type: ${args.componentType}. Available: ${Object.keys(checklists).join(", ")}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [{ type: "text", text: checklist }],
      };
    }

    case "get_color_token": {
      const { category, name } = args;
      let tokenPath;

      switch (category) {
        case "semantic":
          tokenPath = path.join(ROOT_DIR, "tokens/semantic/colors.json");
          break;
        case "semantic-dark":
          tokenPath = path.join(ROOT_DIR, "tokens/semantic/colors-dark.json");
          break;
        case "primitives":
          tokenPath = path.join(ROOT_DIR, "tokens/primitives/colors.json");
          break;
        default:
          return {
            content: [{ type: "text", text: `Unknown category: ${category}. Available: semantic, semantic-dark, primitives` }],
            isError: true,
          };
      }

      try {
        const content = await fs.readFile(tokenPath, "utf-8");
        const tokens = JSON.parse(content);

        // Navigate to the token
        const parts = name.split(".");
        let value = tokens;
        for (const part of parts) {
          value = value?.[part];
        }

        if (!value) {
          return {
            content: [
              { type: "text", text: `Token not found: ${category}.${name}` },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(value, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    // ============================================
    // BLOCKS & LAYOUTS HANDLERS
    // ============================================

    case "list_blocks": {
      try {
        const registryPath = path.join(ROOT_DIR, "src/registry/blocks.registry.json");
        const content = await fs.readFile(registryPath, "utf-8");
        const registry = JSON.parse(content);

        let blocks = registry.blocks;

        // Filter by category
        if (args.category) {
          blocks = blocks.filter((b) => b.category === args.category);
        }

        // Filter by tags
        if (args.tags && args.tags.length > 0) {
          blocks = blocks.filter((b) =>
            args.tags.some((tag) => b.tags.includes(tag))
          );
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  total: blocks.length,
                  blocks: blocks.map((b) => ({
                    id: b.id,
                    name: b.name,
                    category: b.category,
                    tags: b.tags,
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "get_block": {
      try {
        const registryPath = path.join(ROOT_DIR, "src/registry/blocks.registry.json");
        const registryContent = await fs.readFile(registryPath, "utf-8");
        const registry = JSON.parse(registryContent);

        const block = registry.blocks.find((b) => b.id === args.id);
        if (!block) {
          return {
            content: [
              {
                type: "text",
                text: `Block not found: ${args.id}. Available: ${registry.blocks.map((b) => b.id).join(", ")}`,
              },
            ],
            isError: true,
          };
        }

        // Read block source code
        const blockDir = path.join(ROOT_DIR, "src", block.path);
        const files = await fs.readdir(blockDir);
        const mainFile = files.find((f) => f.endsWith(".tsx") && !f.includes(".stories.") && !f.includes(".test."));

        let sourceCode = "";
        let metadata = null;

        if (mainFile) {
          sourceCode = await fs.readFile(path.join(blockDir, mainFile), "utf-8");
        }

        // Try to read metadata
        const metadataFile = files.find((f) => f.endsWith(".metadata.json"));
        if (metadataFile) {
          const metaContent = await fs.readFile(path.join(blockDir, metadataFile), "utf-8");
          metadata = JSON.parse(metaContent);
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  id: block.id,
                  name: block.name,
                  category: block.category,
                  tags: block.tags,
                  metadata,
                  sourceCode,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "list_layouts": {
      try {
        const registryPath = path.join(ROOT_DIR, "src/registry/layouts.registry.json");
        const content = await fs.readFile(registryPath, "utf-8");
        const registry = JSON.parse(content);

        let layouts = registry.layouts;

        // Filter by category
        if (args.category) {
          layouts = layouts.filter((l) => l.category === args.category);
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  total: layouts.length,
                  layouts: layouts.map((l) => ({
                    id: l.id,
                    name: l.name,
                    category: l.category,
                    description: l.description,
                    features: l.features,
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "get_layout": {
      try {
        const registryPath = path.join(ROOT_DIR, "src/registry/layouts.registry.json");
        const registryContent = await fs.readFile(registryPath, "utf-8");
        const registry = JSON.parse(registryContent);

        const layout = registry.layouts.find((l) => l.id === args.id);
        if (!layout) {
          return {
            content: [
              {
                type: "text",
                text: `Layout not found: ${args.id}. Available: ${registry.layouts.map((l) => l.id).join(", ")}`,
              },
            ],
            isError: true,
          };
        }

        // Read layout source code
        const layoutDir = path.join(ROOT_DIR, "src", layout.path);
        const files = await fs.readdir(layoutDir);
        const mainFile = files.find((f) => f.endsWith(".tsx") && !f.includes(".stories.") && !f.includes(".test."));

        let sourceCode = "";
        if (mainFile) {
          sourceCode = await fs.readFile(path.join(layoutDir, mainFile), "utf-8");
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  id: layout.id,
                  name: layout.name,
                  category: layout.category,
                  description: layout.description,
                  features: layout.features,
                  sourceCode,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "search_design_system": {
      try {
        const query = args.query.toLowerCase();
        const searchType = args.type || "all";
        const results = { components: [], blocks: [], layouts: [], templates: [] };

        // Search components
        if (searchType === "all" || searchType === "components") {
          const componentsDir = path.join(ROOT_DIR, "src/components");
          const entries = await fs.readdir(componentsDir, { withFileTypes: true });
          const components = entries
            .filter((e) => e.isDirectory())
            .filter((e) => e.name.toLowerCase().includes(query))
            .map((e) => ({ name: e.name, type: "component" }));
          results.components = components;
        }

        // Search blocks
        if (searchType === "all" || searchType === "blocks") {
          const blocksRegistryPath = path.join(ROOT_DIR, "src/registry/blocks.registry.json");
          const blocksContent = await fs.readFile(blocksRegistryPath, "utf-8");
          const blocksRegistry = JSON.parse(blocksContent);
          const matchingBlocks = blocksRegistry.blocks.filter(
            (b) =>
              b.name.toLowerCase().includes(query) ||
              b.id.toLowerCase().includes(query) ||
              b.tags.some((t) => t.toLowerCase().includes(query))
          );
          results.blocks = matchingBlocks;
        }

        // Search layouts
        if (searchType === "all" || searchType === "layouts") {
          const layoutsRegistryPath = path.join(ROOT_DIR, "src/registry/layouts.registry.json");
          const layoutsContent = await fs.readFile(layoutsRegistryPath, "utf-8");
          const layoutsRegistry = JSON.parse(layoutsContent);
          const matchingLayouts = layoutsRegistry.layouts.filter(
            (l) =>
              l.name.toLowerCase().includes(query) ||
              l.id.toLowerCase().includes(query) ||
              l.description.toLowerCase().includes(query)
          );
          results.layouts = matchingLayouts;
        }

        // Search templates
        if (searchType === "all" || searchType === "templates") {
          const templatesRegistryPath = path.join(ROOT_DIR, "src/registry/templates.registry.json");
          const templatesContent = await fs.readFile(templatesRegistryPath, "utf-8");
          const templatesRegistry = JSON.parse(templatesContent);
          const matchingTemplates = templatesRegistry.templates.filter(
            (t) =>
              t.name.toLowerCase().includes(query) ||
              t.id.toLowerCase().includes(query) ||
              t.description.toLowerCase().includes(query) ||
              t.tags.some((tag) => tag.toLowerCase().includes(query))
          );
          results.templates = matchingTemplates;
        }

        const totalResults =
          results.components.length + results.blocks.length + results.layouts.length + results.templates.length;

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  query: args.query,
                  type: searchType,
                  totalResults,
                  results,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    // ============================================
    // TEMPLATES HANDLERS
    // ============================================

    case "list_templates": {
      try {
        const registryPath = path.join(ROOT_DIR, "src/registry/templates.registry.json");
        const content = await fs.readFile(registryPath, "utf-8");
        const registry = JSON.parse(content);

        let templates = registry.templates;

        // Filter by category
        if (args.category) {
          templates = templates.filter((t) => t.category === args.category);
        }

        // Filter by layout
        if (args.layout) {
          templates = templates.filter((t) => t.layout === args.layout);
        }

        // Filter by tags
        if (args.tags && args.tags.length > 0) {
          templates = templates.filter((t) =>
            args.tags.some((tag) => t.tags.includes(tag))
          );
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  total: templates.length,
                  templates: templates.map((t) => ({
                    id: t.id,
                    name: t.name,
                    category: t.category,
                    layout: t.layout,
                    blocks: t.blocks,
                    tags: t.tags,
                    description: t.description,
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "get_template": {
      try {
        const registryPath = path.join(ROOT_DIR, "src/registry/templates.registry.json");
        const registryContent = await fs.readFile(registryPath, "utf-8");
        const registry = JSON.parse(registryContent);

        const template = registry.templates.find((t) => t.id === args.id);
        if (!template) {
          return {
            content: [
              {
                type: "text",
                text: `Template not found: ${args.id}. Available: ${registry.templates.map((t) => t.id).join(", ")}`,
              },
            ],
            isError: true,
          };
        }

        // Read template source code
        const templateDir = path.join(ROOT_DIR, "src", template.path);
        const files = await fs.readdir(templateDir);
        const mainFile = files.find((f) => f.endsWith(".tsx") && !f.includes(".stories.") && !f.includes(".test."));

        let sourceCode = "";
        let metadata = null;

        if (mainFile) {
          sourceCode = await fs.readFile(path.join(templateDir, mainFile), "utf-8");
        }

        // Try to read metadata
        const metadataFile = files.find((f) => f.endsWith(".metadata.json"));
        if (metadataFile) {
          const metaContent = await fs.readFile(path.join(templateDir, metadataFile), "utf-8");
          metadata = JSON.parse(metaContent);
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  id: template.id,
                  name: template.name,
                  category: template.category,
                  layout: template.layout,
                  blocks: template.blocks,
                  tags: template.tags,
                  description: template.description,
                  metadata,
                  sourceCode,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    // ============================================
    // INPUT TOOLS HANDLERS (AI → Design System)
    // ============================================

    case "submit_component": {
      try {
        const { name: componentName, code, category, description, tags, skipQualityCheck = false } = args;

        // ============================================
        // MANDATORY QUALITY VALIDATION
        // ============================================
        const MINIMUM_QUALITY_SCORE = 70;

        // Run quality checks
        const qualityChecks = {
          microInteractions: {
            hasHoverState: /hover:/.test(code),
            hasFocusState: /focus:|focus-visible:/.test(code),
            hasActiveState: /active:/.test(code),
            hasDisabledState: /disabled:|:disabled/.test(code),
          },
          animations: {
            hasTransitions: /transition-|transition:/.test(code),
            hasDuration: /duration-/.test(code),
            usesEasing: /ease-|cubic-bezier/.test(code),
            hasTransformEffects: /translate-|scale-|rotate-/.test(code),
          },
          visualDepth: {
            hasShadows: /shadow-(?!none)/.test(code),
            hasMultiLayerShadows: /shadow-(lg|xl|2xl)/.test(code),
            hasGradients: /bg-gradient|from-|to-/.test(code),
            hasRingEffects: /ring-/.test(code),
          },
          accessibility: {
            hasAriaAttributes: /aria-/.test(code),
            hasSrOnly: /sr-only/.test(code),
            svgHasAriaHidden: !/<svg(?![^>]*aria-hidden)/.test(code) || /<svg[^>]*aria-hidden="true"/.test(code),
          },
          codeQuality: {
            usesCVA: /cva\(/.test(code),
            usesSemanticTokens: /var\(--semantic/.test(code),
            hasPropsInterface: /interface\s+\w+Props|type\s+\w+Props/.test(code),
          },
        };

        // Calculate score
        let score = 0;
        const weights = {
          microInteractions: { hasHoverState: 15, hasFocusState: 15, hasActiveState: 10, hasDisabledState: 10 },
          animations: { hasTransitions: 10, hasDuration: 5, usesEasing: 5, hasTransformEffects: 5 },
          visualDepth: { hasShadows: 5, hasMultiLayerShadows: 5, hasGradients: 5, hasRingEffects: 5 },
          accessibility: { hasAriaAttributes: 3, hasSrOnly: 2, svgHasAriaHidden: 5 },
          codeQuality: { usesCVA: 0, usesSemanticTokens: 0, hasPropsInterface: 0 }, // Bonus, not required
        };

        const failedChecks = [];
        const passedChecks = [];

        Object.entries(qualityChecks).forEach(([category, checks]) => {
          Object.entries(checks).forEach(([check, passed]) => {
            const weight = weights[category]?.[check] || 0;
            if (passed) {
              score += weight;
              passedChecks.push({ category, check, weight });
            } else if (weight > 0) {
              failedChecks.push({ category, check, weight, fix: getQualityFix(check) });
            }
          });
        });

        // Helper function for fix suggestions
        function getQualityFix(check) {
          const fixes = {
            hasHoverState: "Add hover: classes (e.g., hover:bg-blue-600, hover:-translate-y-0.5)",
            hasFocusState: "Add focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            hasActiveState: "Add active:scale-[0.98] for tactile feedback",
            hasDisabledState: "Add disabled:opacity-50 disabled:pointer-events-none",
            hasTransitions: "Add transition-all or transition-colors",
            hasDuration: "Add duration-200 or duration-150",
            usesEasing: "Add ease-out or ease-in-out",
            hasTransformEffects: "Add hover:-translate-y-0.5 for elevation effect",
            hasShadows: "Add shadow-lg or shadow-md for depth",
            hasMultiLayerShadows: "Add shadow-lg shadow-blue-500/25 for colored shadows",
            hasGradients: "Add bg-gradient-to-b from-white/10 to-transparent overlay",
            hasRingEffects: "Add ring-1 ring-inset ring-white/20 for definition",
            hasAriaAttributes: "Add aria-label, aria-hidden, or other ARIA attributes",
            hasSrOnly: "Add sr-only class for screen reader text where needed",
            svgHasAriaHidden: "Add aria-hidden=\"true\" to decorative SVG icons",
          };
          return fixes[check] || "Review design quality guidelines";
        }

        // Determine quality level
        let level;
        if (score >= 90) level = "EXCEPTIONAL";
        else if (score >= 80) level = "PREMIUM";
        else if (score >= 70) level = "GOOD";
        else if (score >= 60) level = "BASIC";
        else level = "NEEDS_WORK";

        // REJECT if below minimum and skipQualityCheck is not explicitly true
        if (score < MINIMUM_QUALITY_SCORE && !skipQualityCheck) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  rejected: true,
                  reason: "QUALITY_BELOW_MINIMUM",
                  message: `❌ Component REJECTED: Quality score ${score}/100 is below minimum ${MINIMUM_QUALITY_SCORE}`,
                  score,
                  level,
                  minimumRequired: MINIMUM_QUALITY_SCORE,
                  failedChecks: failedChecks.map(f => ({
                    issue: f.check,
                    category: f.category,
                    impact: `-${f.weight} points`,
                    fix: f.fix,
                  })),
                  instructions: [
                    "1. Fix the issues listed above",
                    "2. Run validate_design_quality to check your fixes",
                    "3. Ensure score ≥ 70 before resubmitting",
                    "4. Read design://rules/quality for full guidelines",
                  ],
                }, null, 2),
              },
            ],
            isError: true,
          };
        }

        // ============================================
        // COMPONENT CREATION (only if quality passes)
        // ============================================

        // Determine target directory based on category
        const categoryPaths = {
          primitives: "src/components",
          components: "src/components",
          blocks: "src/blocks",
          layouts: "src/layouts",
          templates: "src/templates",
        };

        const targetDir = path.join(ROOT_DIR, categoryPaths[category] || "src/components", componentName);

        // Create component directory
        await fs.mkdir(targetDir, { recursive: true });

        // Write component file
        const componentPath = path.join(targetDir, `${componentName}.tsx`);
        await fs.writeFile(componentPath, code, "utf-8");

        // Create index.ts for exports
        const indexContent = `export { ${componentName} } from './${componentName}';\nexport type { ${componentName}Props } from './${componentName}';\n`;
        await fs.writeFile(path.join(targetDir, "index.ts"), indexContent, "utf-8");

        // Create metadata file with quality info
        const metadata = {
          id: componentName.toLowerCase().replace(/([A-Z])/g, "-$1").slice(1),
          name: componentName,
          category,
          description: description || `AI-generated ${componentName} component`,
          tags: tags || [],
          source: "ai-generated",
          createdAt: new Date().toISOString(),
          quality: {
            score,
            level,
            validatedAt: new Date().toISOString(),
          },
        };
        await fs.writeFile(
          path.join(targetDir, `${componentName}.metadata.json`),
          JSON.stringify(metadata, null, 2),
          "utf-8"
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: `✅ Component ${componentName} created successfully`,
                quality: {
                  score,
                  level,
                  status: score >= 80 ? "PREMIUM ⭐" : "GOOD ✓",
                },
                path: targetDir,
                files: [`${componentName}.tsx`, "index.ts", `${componentName}.metadata.json`],
                nextSteps: [
                  "Run 'npm run lint' to check for issues",
                  "Run 'npm run storybook' to preview",
                  "Consider generating a story with 'generate_story' tool",
                ],
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error submitting component: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "validate_component": {
      try {
        const { code, checks = ["all"] } = args;
        const runAll = checks.includes("all");
        const results = { valid: true, issues: [], warnings: [] };

        // Accessibility checks
        if (runAll || checks.includes("accessibility")) {
          const a11yIssues = [];

          if (/<img(?![^>]*alt=)/.test(code)) {
            a11yIssues.push("Images missing alt attribute");
          }
          if (/<svg(?![^>]*aria-hidden)/.test(code)) {
            a11yIssues.push("SVG icons should have aria-hidden=\"true\"");
          }
          if (/<button(?![^>]*(type=|onClick))/.test(code)) {
            a11yIssues.push("Buttons should have type attribute");
          }
          if (!/<(button|a|input|select|textarea)/.test(code) && /onClick/.test(code)) {
            a11yIssues.push("Click handlers on non-interactive elements");
          }
          if (/<div[^>]*role="button"/.test(code)) {
            results.warnings.push("Consider using <button> instead of div with role=\"button\"");
          }

          if (a11yIssues.length > 0) {
            results.valid = false;
            results.issues.push({ category: "accessibility", items: a11yIssues });
          }
        }

        // TypeScript checks
        if (runAll || checks.includes("typescript")) {
          const tsIssues = [];

          if (!/interface\s+\w+Props/.test(code) && !/type\s+\w+Props/.test(code)) {
            tsIssues.push("Missing Props interface/type definition");
          }
          if (/: any(?![a-zA-Z])/.test(code)) {
            results.warnings.push("Avoid using 'any' type - use specific types");
          }
          if (!/export (const|function|default)/.test(code)) {
            tsIssues.push("Component should be exported");
          }

          if (tsIssues.length > 0) {
            results.valid = false;
            results.issues.push({ category: "typescript", items: tsIssues });
          }
        }

        // Tailwind checks
        if (runAll || checks.includes("tailwind")) {
          const tailwindIssues = [];

          if (/style=\{/.test(code) && !/style=\{\{/.test(code)) {
            results.warnings.push("Consider using Tailwind classes instead of inline styles");
          }
          if (/className="[^"]*bg-(white|black|gray-\d+)/.test(code)) {
            results.warnings.push("Use semantic color tokens (bg-[var(--semantic-color-*)]) instead of hardcoded colors");
          }

          if (tailwindIssues.length > 0) {
            results.issues.push({ category: "tailwind", items: tailwindIssues });
          }
        }

        // Naming checks
        if (runAll || checks.includes("naming")) {
          const namingIssues = [];

          if (/^(?!export\s+(const|function)\s+[A-Z])/.test(code.trim())) {
            namingIssues.push("Component name should be PascalCase");
          }
          if (/const\s+[a-z][a-zA-Z]*\s*=\s*\(/.test(code) && !/Props/.test(code)) {
            results.warnings.push("Consider naming props parameter explicitly");
          }

          if (namingIssues.length > 0) {
            results.valid = false;
            results.issues.push({ category: "naming", items: namingIssues });
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                valid: results.valid,
                checksPerformed: runAll ? ["accessibility", "typescript", "tailwind", "naming"] : checks,
                issues: results.issues,
                warnings: results.warnings,
                summary: results.valid
                  ? "Component passes all validation checks"
                  : `Found ${results.issues.reduce((sum, i) => sum + i.items.length, 0)} issues`,
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error validating component: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "generate_story": {
      try {
        const { componentName, componentPath, variants = [] } = args;

        const storyContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${componentPath.replace(/\//g, "/")}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'AI-generated ${componentName} component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Add argTypes based on component props
  },
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {},
};
${variants.map((variant) => `
export const ${variant.charAt(0).toUpperCase() + variant.slice(1)}: Story = {
  args: {
    variant: '${variant}',
  },
};`).join("\n")}
`;

        const storyPath = path.join(ROOT_DIR, "src", componentPath, `${componentName}.stories.tsx`);
        await fs.writeFile(storyPath, storyContent, "utf-8");

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: `Story file generated for ${componentName}`,
                path: storyPath,
                stories: ["Default", ...variants.map((v) => v.charAt(0).toUpperCase() + v.slice(1))],
                nextSteps: [
                  "Run 'npm run storybook' to preview",
                  "Customize story args based on component props",
                ],
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error generating story: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "get_design_system_summary": {
      try {
        // Gather all design system info
        const summary = {
          name: "Design System Pipeline",
          version: "1.0.0",

          // ⚠️ CRITICAL: Quality requirements for AI agents
          qualityRequirements: {
            warning: "🚨 MANDATORY: Read design://system/instructions BEFORE creating components",
            minimumScore: 70,
            requiredFeatures: [
              "hover: states",
              "focus-visible: states",
              "active: feedback (scale-[0.98])",
              "disabled: states",
              "transition-all/colors",
              "duration-200",
              "ease-out",
              "aria attributes",
            ],
            qualityTools: [
              "validate_design_quality - Check before submitting",
              "get_design_quality_score - Get numerical score",
              "suggest_design_improvements - Get fix suggestions",
            ],
            rejection: "Components with score < 70 will be AUTOMATICALLY REJECTED",
          },

          stack: {
            framework: "React 18+",
            styling: "Tailwind CSS + CSS Variables",
            storybook: "Storybook 8+",
            bundler: "Vite",
          },
          architecture: {
            atomicDesign: ["primitives", "components", "blocks", "layouts", "templates"],
            tokenLevels: ["primitives", "semantic"],
          },
          resources: {},
          tools: {},

          mandatoryResources: [
            "design://system/instructions - READ FIRST",
            "design://rules/quality - Quality standards",
            "design://rules/accessibility - WCAG requirements",
          ],
        };

        // Count components
        const componentsDir = path.join(ROOT_DIR, "src/components");
        try {
          const entries = await fs.readdir(componentsDir, { withFileTypes: true });
          summary.resources.components = entries.filter((e) => e.isDirectory()).length;
        } catch { summary.resources.components = 0; }

        // Count blocks
        try {
          const blocksRegistry = JSON.parse(await fs.readFile(path.join(ROOT_DIR, "src/registry/blocks.registry.json"), "utf-8"));
          summary.resources.blocks = blocksRegistry.blocks.length;
        } catch { summary.resources.blocks = 0; }

        // Count layouts
        try {
          const layoutsRegistry = JSON.parse(await fs.readFile(path.join(ROOT_DIR, "src/registry/layouts.registry.json"), "utf-8"));
          summary.resources.layouts = layoutsRegistry.layouts.length;
        } catch { summary.resources.layouts = 0; }

        // Count templates
        try {
          const templatesRegistry = JSON.parse(await fs.readFile(path.join(ROOT_DIR, "src/registry/templates.registry.json"), "utf-8"));
          summary.resources.templates = templatesRegistry.templates.length;
        } catch { summary.resources.templates = 0; }

        // List available MCP tools
        summary.tools = {
          output: ["list_components", "get_component", "list_blocks", "get_block", "list_layouts", "get_layout", "list_templates", "get_template", "search_design_system"],
          input: ["submit_component", "validate_component", "generate_story"],
          tokens: ["get_color_token"],
          validation: ["validate_accessibility", "validate_design_quality", "get_design_quality_score", "suggest_design_improvements"],
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(summary, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error getting summary: ${error.message}` }],
          isError: true,
        };
      }
    }

    // ============================================
    // COMPLIANCE TOOLS HANDLERS (ISO 27001 / WCAG 2.2 / SOC2)
    // ============================================

    case "security_scan": {
      try {
        const { code, severity = "all" } = args;
        const findings = [];

        // Security Policy Checks
        const policies = [
          { id: "SEC-001", name: "No Inline Scripts", severity: "critical", pattern: /on\w+\s*=\s*["'][^"']*["']/gi, message: "Inline event handlers detected - XSS risk" },
          { id: "SEC-002", name: "No Exposed Secrets", severity: "critical", pattern: /(api[_-]?key|secret|password|token)\s*[:=]\s*["'][^"']+["']/gi, message: "Potential exposed secret/API key" },
          { id: "SEC-003", name: "No eval()", severity: "critical", pattern: /\beval\s*\(/g, message: "eval() usage detected - code injection risk" },
          { id: "SEC-004", name: "No innerHTML", severity: "high", pattern: /\.innerHTML\s*=/g, message: "innerHTML assignment - XSS risk, use textContent or sanitize" },
          { id: "SEC-005", name: "No document.write", severity: "high", pattern: /document\.write/g, message: "document.write() detected - XSS risk" },
          { id: "SEC-006", name: "Secure External Links", severity: "medium", pattern: /target\s*=\s*["']_blank["'](?![^>]*rel\s*=)/gi, message: "External link without rel='noopener noreferrer'" },
          { id: "SEC-007", name: "No localStorage Secrets", severity: "high", pattern: /localStorage\.(setItem|getItem)\s*\(\s*["'](token|password|secret|key)/gi, message: "Sensitive data in localStorage" },
          { id: "SEC-008", name: "No Function Constructor", severity: "critical", pattern: /new\s+Function\s*\(/g, message: "Function constructor - code injection risk" },
          { id: "SEC-009", name: "HTTP Resources", severity: "medium", pattern: /["']http:\/\/(?!localhost)/g, message: "Non-HTTPS resource URL detected" },
          { id: "SEC-010", name: "dangerouslySetInnerHTML", severity: "high", pattern: /dangerouslySetInnerHTML/g, message: "dangerouslySetInnerHTML usage - ensure input is sanitized" },
        ];

        const severityLevels = { critical: 4, high: 3, medium: 2, low: 1 };
        const minSeverity = severity === "all" ? 0 : severityLevels[severity] || 0;

        for (const policy of policies) {
          if (severityLevels[policy.severity] >= minSeverity) {
            const matches = code.match(policy.pattern);
            if (matches) {
              findings.push({
                policyId: policy.id,
                name: policy.name,
                severity: policy.severity,
                occurrences: matches.length,
                message: policy.message,
                recommendation: `Review and fix ${matches.length} occurrence(s)`,
              });
            }
          }
        }

        const passed = !findings.some((f) => f.severity === "critical" || f.severity === "high");
        const score = Math.max(0, 100 - findings.reduce((sum, f) => {
          const weight = { critical: 25, high: 15, medium: 5, low: 2 };
          return sum + (weight[f.severity] || 0) * f.occurrences;
        }, 0));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                passed,
                score,
                totalFindings: findings.length,
                findings,
                summary: passed
                  ? "No critical or high severity issues found"
                  : `Found ${findings.filter((f) => f.severity === "critical").length} critical and ${findings.filter((f) => f.severity === "high").length} high severity issues`,
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error scanning: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "validate_compliance": {
      try {
        const { code, checks = ["all"] } = args;
        const runAll = checks.includes("all");
        const results = {
          security: { score: 100, issues: [] },
          accessibility: { score: 100, issues: [] },
          codeQuality: { score: 100, issues: [] },
          gdpr: { score: 100, issues: [] },
        };

        // Security Checks
        if (runAll || checks.includes("security")) {
          if (/dangerouslySetInnerHTML/.test(code)) {
            results.security.issues.push("Uses dangerouslySetInnerHTML");
            results.security.score -= 15;
          }
          if (/\beval\s*\(/.test(code)) {
            results.security.issues.push("Uses eval()");
            results.security.score -= 25;
          }
          if (/(api[_-]?key|secret|password)\s*[:=]\s*["']/gi.test(code)) {
            results.security.issues.push("Potential exposed secrets");
            results.security.score -= 25;
          }
        }

        // Accessibility Checks (WCAG 2.2)
        if (runAll || checks.includes("accessibility")) {
          if (/<img(?![^>]*alt=)/.test(code)) {
            results.accessibility.issues.push("Images missing alt attribute (WCAG 1.1.1)");
            results.accessibility.score -= 20;
          }
          if (/<svg(?![^>]*aria-hidden)/.test(code)) {
            results.accessibility.issues.push("SVG missing aria-hidden (WCAG 4.1.2)");
            results.accessibility.score -= 10;
          }
          if (/<(div|span)[^>]*onClick(?![^>]*role=)/.test(code)) {
            results.accessibility.issues.push("Clickable div/span without role (WCAG 4.1.2)");
            results.accessibility.score -= 15;
          }
          if (!/:focus/.test(code) && !/:focus-visible/.test(code) && !/focus/.test(code)) {
            results.accessibility.issues.push("No focus styles detected (WCAG 2.4.7)");
            results.accessibility.score -= 10;
          }
          if (/<input(?![^>]*id=)/.test(code) && /<label/.test(code)) {
            results.accessibility.issues.push("Input without id for label association (WCAG 1.3.1)");
            results.accessibility.score -= 15;
          }
        }

        // Code Quality Checks
        if (runAll || checks.includes("code-quality")) {
          if (!/interface\s+\w+Props|type\s+\w+Props/.test(code)) {
            results.codeQuality.issues.push("Missing Props type definition");
            results.codeQuality.score -= 15;
          }
          if (/: any(?![a-zA-Z])/.test(code)) {
            results.codeQuality.issues.push("Uses 'any' type");
            results.codeQuality.score -= 10;
          }
          if (!/export\s+(const|function|default)/.test(code)) {
            results.codeQuality.issues.push("Component not exported");
            results.codeQuality.score -= 20;
          }
          if (/console\.(log|warn|error)/.test(code)) {
            results.codeQuality.issues.push("Console statements in code");
            results.codeQuality.score -= 5;
          }
        }

        // GDPR Checks
        if (runAll || checks.includes("gdpr")) {
          if (/localStorage\.(setItem|getItem)/.test(code) && !/consent/.test(code.toLowerCase())) {
            results.gdpr.issues.push("localStorage usage without consent check");
            results.gdpr.score -= 15;
          }
          if (/(analytics|tracking|gtag|fbq)/.test(code.toLowerCase())) {
            results.gdpr.issues.push("Tracking code detected - ensure consent");
            results.gdpr.score -= 10;
          }
          if (/(email|phone|address|name)\s*[:=]/.test(code) && !/(encrypt|hash|sanitize)/.test(code.toLowerCase())) {
            results.gdpr.issues.push("Personal data handling - ensure proper protection");
            results.gdpr.score -= 10;
          }
        }

        // Ensure scores don't go below 0
        Object.keys(results).forEach((key) => {
          results[key].score = Math.max(0, results[key].score);
        });

        const overallScore = Math.round(
          (results.security.score * 0.25 +
            results.accessibility.score * 0.35 +
            results.codeQuality.score * 0.20 +
            results.gdpr.score * 0.20)
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                overallScore,
                certified: overallScore >= 85,
                grade: overallScore >= 90 ? "A" : overallScore >= 80 ? "B" : overallScore >= 70 ? "C" : overallScore >= 60 ? "D" : "F",
                checksPerformed: runAll ? ["security", "accessibility", "code-quality", "gdpr"] : checks,
                results,
                summary: overallScore >= 85
                  ? "Component meets compliance standards"
                  : `Component needs improvement in: ${Object.entries(results).filter(([_, v]) => v.score < 85).map(([k]) => k).join(", ")}`,
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error validating: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "get_compliance_score": {
      try {
        const { code } = args;

        // Run all compliance checks and calculate final score
        const scores = {
          security: 100,
          accessibility: 100,
          codeQuality: 100,
          documentation: 100,
          testing: 100,
        };

        // Security deductions
        if (/dangerouslySetInnerHTML/.test(code)) scores.security -= 15;
        if (/\beval\s*\(/.test(code)) scores.security -= 25;
        if (/(api[_-]?key|secret)\s*[:=]\s*["']/gi.test(code)) scores.security -= 25;

        // Accessibility deductions
        if (/<img(?![^>]*alt=)/.test(code)) scores.accessibility -= 20;
        if (/<svg(?![^>]*aria-hidden)/.test(code)) scores.accessibility -= 10;
        if (/<button(?![^>]*type=)/.test(code)) scores.accessibility -= 10;

        // Code quality deductions
        if (!/interface|type\s+\w+Props/.test(code)) scores.codeQuality -= 15;
        if (/: any(?![a-zA-Z])/.test(code)) scores.codeQuality -= 10;
        if (/console\.(log|warn|error)/.test(code)) scores.codeQuality -= 5;

        // Documentation deductions
        if (!/\/\*\*/.test(code)) scores.documentation -= 20; // No JSDoc
        if (!/description|@param|@returns/.test(code)) scores.documentation -= 15;

        // Testing (can't check without test files, assume neutral)
        scores.testing = 80; // Base assumption without test file

        // Clamp scores
        Object.keys(scores).forEach((key) => {
          scores[key] = Math.max(0, Math.min(100, scores[key]));
        });

        const overall = Math.round(
          scores.security * 0.25 +
          scores.accessibility * 0.35 +
          scores.codeQuality * 0.20 +
          scores.documentation * 0.10 +
          scores.testing * 0.10
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                overall,
                breakdown: scores,
                grade: overall >= 90 ? "A" : overall >= 80 ? "B" : overall >= 70 ? "C" : overall >= 60 ? "D" : "F",
                certified: overall >= 85,
                certificationStatus: overall >= 85 ? "CERTIFIED" : overall >= 70 ? "NEEDS_IMPROVEMENT" : "NOT_READY",
                badges: {
                  soc2: scores.security >= 90,
                  wcagAA: scores.accessibility >= 85,
                  gdpr: scores.security >= 85 && scores.codeQuality >= 80,
                },
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error calculating score: ${error.message}` }],
          isError: true,
        };
      }
    }

    // =========================================
    // DESIGN QUALITY TOOL HANDLERS
    // =========================================

    case "validate_design_quality": {
      try {
        const { code, componentType = "primitive" } = args;

        const checks = {
          // Micro-interactions (25 points max)
          microInteractions: {
            hasHoverState: /hover:/.test(code),
            hasFocusState: /focus:|focus-visible:/.test(code),
            hasActiveState: /active:/.test(code),
            hasDisabledState: /disabled:|:disabled/.test(code),
            hasLoadingState: /loading|isLoading|aria-busy/.test(code),
          },

          // Animations (20 points max)
          animations: {
            hasTransitions: /transition-|transition:/.test(code),
            correctDuration: /duration-(150|200|300|500)|150ms|200ms|300ms/.test(code),
            usesEasing: /ease-|cubic-bezier/.test(code),
            hasTransformEffects: /translate-|scale-|rotate-/.test(code),
          },

          // Visual Depth (15 points max)
          visualDepth: {
            usesShadows: /shadow-|box-shadow/.test(code),
            hasMultiLayerShadow: /shadow-\[|shadow-lg|shadow-xl|shadow-2xl/.test(code),
            usesGradients: /gradient-|bg-gradient/.test(code),
            hasRingEffects: /ring-|ring:/.test(code),
          },

          // Feedback States (15 points max)
          feedbackStates: {
            hasErrorState: /error|invalid|aria-invalid/.test(code),
            hasSuccessState: /success|valid|emerald|green/.test(code),
            hasSkeletonLoading: /skeleton|shimmer|animate-pulse/.test(code),
          },

          // Consistency (15 points max)
          consistency: {
            usesSemanticTokens: /var\(--semantic-|var\(--color-/.test(code),
            usesCVA: /cva\(/.test(code),
            usesVariants: /variants:\s*{/.test(code),
          },

          // Innovation (10 points max)
          innovation: {
            hasGlassmorphism: /backdrop-blur|backdrop-filter/.test(code),
            hasGradientText: /bg-clip-text|text-transparent/.test(code),
            hasGlowEffects: /shadow-.*\/\d+|shadow-\[0_0_/.test(code),
            hasSpringAnimation: /spring|bounce|ease-spring/.test(code),
          },
        };

        // Calculate scores
        const scores = {
          microInteractions: Object.values(checks.microInteractions).filter(Boolean).length * 5,
          animations: Object.values(checks.animations).filter(Boolean).length * 5,
          visualDepth: Object.values(checks.visualDepth).filter(Boolean).length * 4,
          feedbackStates: Object.values(checks.feedbackStates).filter(Boolean).length * 5,
          consistency: Object.values(checks.consistency).filter(Boolean).length * 5,
          innovation: Object.values(checks.innovation).filter(Boolean).length * 3,
        };

        const overall = Math.min(100,
          scores.microInteractions +
          scores.animations +
          scores.visualDepth +
          scores.feedbackStates +
          scores.consistency +
          scores.innovation
        );

        // Determine quality level
        const getLevel = (score) => {
          if (score >= 90) return "EXCEPTIONAL";
          if (score >= 80) return "PREMIUM";
          if (score >= 70) return "GOOD";
          if (score >= 60) return "BASIC";
          return "NEEDS_WORK";
        };

        // Minimum requirements by component type
        const minScores = {
          primitive: 80,
          block: 80,
          template: 70,
          layout: 70,
        };

        const minRequired = minScores[componentType] || 80;
        const passed = overall >= minRequired;

        // Generate issues
        const issues = [];
        if (!checks.microInteractions.hasHoverState) issues.push("Missing hover state");
        if (!checks.microInteractions.hasFocusState) issues.push("Missing focus-visible state");
        if (!checks.animations.hasTransitions) issues.push("No transition animations");
        if (!checks.animations.usesEasing) issues.push("No easing curves defined");
        if (!checks.visualDepth.usesShadows) issues.push("No shadow depth");
        if (!checks.consistency.usesCVA) issues.push("Not using CVA for variants");

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                passed,
                overall,
                level: getLevel(overall),
                minRequired,
                breakdown: scores,
                checks,
                issues,
                recommendation: passed
                  ? "Component meets design quality standards"
                  : `Score ${overall} is below minimum ${minRequired} for ${componentType}. Address the issues listed.`,
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "get_design_quality_score": {
      try {
        const { code } = args;

        // Comprehensive scoring
        const metrics = {
          microInteractions: {
            weight: 0.25,
            score: 0,
            max: 25,
            details: [],
          },
          animations: {
            weight: 0.20,
            score: 0,
            max: 20,
            details: [],
          },
          visualDepth: {
            weight: 0.15,
            score: 0,
            max: 15,
            details: [],
          },
          feedbackStates: {
            weight: 0.15,
            score: 0,
            max: 15,
            details: [],
          },
          consistency: {
            weight: 0.15,
            score: 0,
            max: 15,
            details: [],
          },
          innovation: {
            weight: 0.10,
            score: 0,
            max: 10,
            details: [],
          },
        };

        // Micro-interactions scoring
        if (/hover:/.test(code)) { metrics.microInteractions.score += 5; metrics.microInteractions.details.push("✓ Hover state"); }
        if (/focus-visible:/.test(code)) { metrics.microInteractions.score += 5; metrics.microInteractions.details.push("✓ Focus visible"); }
        if (/active:/.test(code)) { metrics.microInteractions.score += 5; metrics.microInteractions.details.push("✓ Active state"); }
        if (/disabled:/.test(code)) { metrics.microInteractions.score += 5; metrics.microInteractions.details.push("✓ Disabled state"); }
        if (/isLoading|loading/.test(code)) { metrics.microInteractions.score += 5; metrics.microInteractions.details.push("✓ Loading state"); }

        // Animations scoring
        if (/transition-/.test(code)) { metrics.animations.score += 5; metrics.animations.details.push("✓ Transitions"); }
        if (/duration-(150|200|300)/.test(code)) { metrics.animations.score += 5; metrics.animations.details.push("✓ Correct timing"); }
        if (/ease-out|ease-in-out/.test(code)) { metrics.animations.score += 5; metrics.animations.details.push("✓ Easing curves"); }
        if (/translate-|scale-/.test(code)) { metrics.animations.score += 5; metrics.animations.details.push("✓ Transform effects"); }

        // Visual depth scoring
        if (/shadow-sm|shadow-md|shadow-lg/.test(code)) { metrics.visualDepth.score += 5; metrics.visualDepth.details.push("✓ Shadow depth"); }
        if (/shadow-\[|shadow-xl/.test(code)) { metrics.visualDepth.score += 5; metrics.visualDepth.details.push("✓ Multi-layer shadows"); }
        if (/bg-gradient-/.test(code)) { metrics.visualDepth.score += 5; metrics.visualDepth.details.push("✓ Gradient effects"); }

        // Feedback states scoring
        if (/error|invalid|red-|destructive/.test(code)) { metrics.feedbackStates.score += 5; metrics.feedbackStates.details.push("✓ Error states"); }
        if (/success|emerald-|green-/.test(code)) { metrics.feedbackStates.score += 5; metrics.feedbackStates.details.push("✓ Success states"); }
        if (/skeleton|shimmer|animate-pulse/.test(code)) { metrics.feedbackStates.score += 5; metrics.feedbackStates.details.push("✓ Loading skeleton"); }

        // Consistency scoring
        if (/var\(--semantic-/.test(code)) { metrics.consistency.score += 5; metrics.consistency.details.push("✓ Semantic tokens"); }
        if (/cva\(/.test(code)) { metrics.consistency.score += 5; metrics.consistency.details.push("✓ CVA patterns"); }
        if (/defaultVariants/.test(code)) { metrics.consistency.score += 5; metrics.consistency.details.push("✓ Default variants"); }

        // Innovation scoring
        if (/backdrop-blur/.test(code)) { metrics.innovation.score += 3; metrics.innovation.details.push("✓ Glassmorphism"); }
        if (/bg-clip-text/.test(code)) { metrics.innovation.score += 3; metrics.innovation.details.push("✓ Gradient text"); }
        if (/-translate-y-0\.5|hover:-translate/.test(code)) { metrics.innovation.score += 4; metrics.innovation.details.push("✓ Hover elevation"); }

        // Calculate overall
        const overall = Math.round(
          metrics.microInteractions.score +
          metrics.animations.score +
          metrics.visualDepth.score +
          metrics.feedbackStates.score +
          metrics.consistency.score +
          metrics.innovation.score
        );

        const level = overall >= 90 ? "EXCEPTIONAL" :
                      overall >= 80 ? "PREMIUM" :
                      overall >= 70 ? "GOOD" :
                      overall >= 60 ? "BASIC" : "NEEDS_WORK";

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                overall,
                level,
                maxPossible: 100,
                metrics: Object.fromEntries(
                  Object.entries(metrics).map(([key, val]) => [
                    key,
                    {
                      score: val.score,
                      max: val.max,
                      percentage: Math.round((val.score / val.max) * 100),
                      details: val.details,
                    },
                  ])
                ),
                summary: {
                  strengths: Object.entries(metrics)
                    .filter(([_, v]) => v.score >= v.max * 0.7)
                    .map(([k]) => k),
                  improvements: Object.entries(metrics)
                    .filter(([_, v]) => v.score < v.max * 0.5)
                    .map(([k]) => k),
                },
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    case "suggest_design_improvements": {
      try {
        const { code, focusArea = "all" } = args;

        const suggestions = {
          "micro-interactions": [],
          "animations": [],
          "visual-depth": [],
          "feedback-states": [],
        };

        // Micro-interactions suggestions
        if (focusArea === "all" || focusArea === "micro-interactions") {
          if (!/hover:/.test(code)) {
            suggestions["micro-interactions"].push({
              issue: "Missing hover state",
              fix: "Add hover: prefix classes for color/shadow/transform changes",
              example: "hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5",
              priority: "HIGH",
            });
          }
          if (!/focus-visible:/.test(code)) {
            suggestions["micro-interactions"].push({
              issue: "Missing focus-visible state",
              fix: "Add visible focus ring for keyboard users",
              example: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              priority: "HIGH",
            });
          }
          if (!/active:/.test(code)) {
            suggestions["micro-interactions"].push({
              issue: "Missing active/pressed state",
              fix: "Add tactile feedback on click",
              example: "active:scale-[0.98] active:shadow-sm",
              priority: "MEDIUM",
            });
          }
        }

        // Animation suggestions
        if (focusArea === "all" || focusArea === "animations") {
          if (!/transition-/.test(code)) {
            suggestions["animations"].push({
              issue: "No transition animations",
              fix: "Add transition classes for smooth state changes",
              example: "transition-all duration-200 ease-out",
              priority: "HIGH",
            });
          }
          if (/transition/.test(code) && !/duration-/.test(code)) {
            suggestions["animations"].push({
              issue: "Missing duration specification",
              fix: "Add explicit duration (150-300ms recommended)",
              example: "duration-200",
              priority: "MEDIUM",
            });
          }
          if (!/ease-|cubic-bezier/.test(code)) {
            suggestions["animations"].push({
              issue: "No easing curve defined",
              fix: "Use natural easing for better feel",
              example: "ease-out (for exits) or ease-in-out (for full motion)",
              priority: "MEDIUM",
            });
          }
        }

        // Visual depth suggestions
        if (focusArea === "all" || focusArea === "visual-depth") {
          if (!/shadow-/.test(code)) {
            suggestions["visual-depth"].push({
              issue: "Flat design without shadows",
              fix: "Add shadow for depth and hierarchy",
              example: "shadow-sm hover:shadow-lg shadow-slate-200/50",
              priority: "MEDIUM",
            });
          }
          if (!/ring-/.test(code)) {
            suggestions["visual-depth"].push({
              issue: "No ring/border effects",
              fix: "Add subtle ring for definition",
              example: "ring-1 ring-inset ring-white/20",
              priority: "LOW",
            });
          }
        }

        // Feedback states suggestions
        if (focusArea === "all" || focusArea === "feedback-states") {
          if (!/skeleton|shimmer|animate-pulse/.test(code)) {
            suggestions["feedback-states"].push({
              issue: "No loading skeleton",
              fix: "Add skeleton state for async content",
              example: "Create a skeleton variant with animate-pulse or shimmer effect",
              priority: "MEDIUM",
            });
          }
        }

        // Count suggestions by priority
        const allSuggestions = Object.values(suggestions).flat();
        const highPriority = allSuggestions.filter(s => s.priority === "HIGH").length;
        const mediumPriority = allSuggestions.filter(s => s.priority === "MEDIUM").length;

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                totalSuggestions: allSuggestions.length,
                byPriority: {
                  HIGH: highPriority,
                  MEDIUM: mediumPriority,
                  LOW: allSuggestions.length - highPriority - mediumPriority,
                },
                suggestions: focusArea === "all" ? suggestions : { [focusArea]: suggestions[focusArea] },
                quickWins: allSuggestions
                  .filter(s => s.priority === "HIGH")
                  .slice(0, 3)
                  .map(s => s.example),
                estimatedScoreIncrease: highPriority * 5 + mediumPriority * 3,
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }

    default:
      return {
        content: [{ type: "text", text: `Unknown tool: ${name}` }],
        isError: true,
      };
  }
});

// ============================================
// START SERVER
// ============================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Design System MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
