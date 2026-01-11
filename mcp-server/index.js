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
