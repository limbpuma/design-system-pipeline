/**
 * Registry Schema Types
 * Defines metadata structure for blocks, layouts, and templates
 * Used by MCP server for AI agent discovery
 */

// =============================================================================
// BASE TYPES
// =============================================================================

export interface BaseMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  tags: string[];
}

export interface AccessibilityInfo {
  wcag: 'A' | 'AA' | 'AAA';
  landmarks?: string[];
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  ariaPatterns?: string[];
  keyboardNav?: boolean;
  screenReaderOptimized?: boolean;
}

export interface PropDefinition {
  type: 'string' | 'number' | 'boolean' | 'enum' | 'array' | 'object' | 'ReactNode';
  required?: boolean;
  default?: unknown;
  values?: string[]; // For enum types
  description?: string;
}

// =============================================================================
// BLOCK METADATA
// =============================================================================

export interface BlockMetadata extends BaseMetadata {
  category: 'marketing' | 'application' | 'ecommerce' | 'authentication' | 'common';

  useCase: string[];

  composition: {
    components: string[];
    tokens: string[];
  };

  variants: Record<string, string[]>;

  props: Record<string, PropDefinition>;

  accessibility: AccessibilityInfo;

  responsive?: {
    breakpoints: ('mobile' | 'tablet' | 'desktop')[];
    behavior?: string;
  };
}

// =============================================================================
// LAYOUT METADATA
// =============================================================================

export interface LayoutMetadata extends BaseMetadata {
  category: 'shell' | 'auth' | 'marketing' | 'minimal';

  slots: {
    name: string;
    required: boolean;
    description: string;
  }[];

  features: {
    sidebar?: boolean;
    header?: boolean;
    footer?: boolean;
    responsive?: boolean;
    darkMode?: boolean;
  };

  variants: Record<string, string[]>;

  props: Record<string, PropDefinition>;

  accessibility: AccessibilityInfo;
}

// =============================================================================
// TEMPLATE METADATA
// =============================================================================

export interface TemplateBlockReference {
  id: string;
  props?: Record<string, unknown>;
  slot?: string;
}

export interface TemplateMetadata extends BaseMetadata {
  category: 'marketing' | 'authentication' | 'dashboard' | 'ecommerce' | 'settings';

  layout: string;

  blocks: TemplateBlockReference[];

  variants: Record<string, string[]>;

  seo?: {
    titleTemplate?: string;
    metaDescription?: boolean;
    ogImage?: boolean;
  };

  dataRequirements?: {
    name: string;
    type: string;
    description: string;
  }[];

  accessibility: AccessibilityInfo;
}

// =============================================================================
// REGISTRY TYPES
// =============================================================================

export interface RegistryEntry {
  id: string;
  path: string;
  category: string;
  metadata: string; // Path to metadata JSON file
}

export interface BlocksRegistry {
  version: string;
  lastUpdated: string;
  blocks: RegistryEntry[];
}

export interface LayoutsRegistry {
  version: string;
  lastUpdated: string;
  layouts: RegistryEntry[];
}

export interface TemplatesRegistry {
  version: string;
  lastUpdated: string;
  templates: RegistryEntry[];
}

// =============================================================================
// MCP QUERY TYPES
// =============================================================================

export interface BlockQuery {
  category?: BlockMetadata['category'];
  tags?: string[];
  useCase?: string;
  hasVariant?: { name: string; value: string };
}

export interface TemplateQuery {
  category?: TemplateMetadata['category'];
  layout?: string;
  tags?: string[];
  blocksInclude?: string[];
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  query: Record<string, unknown>;
}
