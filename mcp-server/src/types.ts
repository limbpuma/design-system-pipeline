/**
 * MCP Server Types for Design System Pipeline
 * 🤖 AI Integration Specialist
 */

// =============================================================================
// COMPONENT TYPES
// =============================================================================

export interface ComponentInfo {
  id: string;
  name: string;
  path: string;
  category: string;
  description?: string;
  variants?: string[];
  props?: PropInfo[];
  accessibility?: AccessibilityInfo;
}

export interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  default?: unknown;
  description?: string;
}

export interface AccessibilityInfo {
  wcagLevel: 'A' | 'AA' | 'AAA';
  keyboard: boolean;
  screenReader: boolean;
  ariaPatterns?: string[];
}

// =============================================================================
// BLOCK TYPES
// =============================================================================

export interface BlockInfo {
  id: string;
  name: string;
  path: string;
  category: 'marketing' | 'application' | 'ai' | 'ecommerce' | 'authentication';
  tags: string[];
  description?: string;
  components?: string[];
}

// =============================================================================
// TEMPLATE TYPES
// =============================================================================

export interface TemplateInfo {
  id: string;
  name: string;
  path: string;
  category: string;
  layout: string;
  blocks: string[];
  tags: string[];
  description?: string;
}

// =============================================================================
// LAYOUT TYPES
// =============================================================================

export interface LayoutInfo {
  id: string;
  name: string;
  path: string;
  category: string;
  description?: string;
  features: string[];
}

// =============================================================================
// TOKEN TYPES
// =============================================================================

export interface TokenValue {
  value: string;
  type: string;
}

export interface TokenCategory {
  [key: string]: TokenValue | TokenCategory;
}

export interface DesignTokens {
  colors: TokenCategory;
  spacing?: TokenCategory;
  typography?: TokenCategory;
  radii?: TokenCategory;
  shadows?: TokenCategory;
}

// =============================================================================
// QUERY TYPES
// =============================================================================

export interface SearchQuery {
  category?: string;
  tags?: string[];
  keyword?: string;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  query: SearchQuery;
}

// =============================================================================
// REGISTRY TYPES
// =============================================================================

export interface Registry<T> {
  version: string;
  lastUpdated: string;
  items: T[];
}

export interface BlocksRegistry {
  version: string;
  lastUpdated: string;
  blocks: BlockInfo[];
}

export interface TemplatesRegistry {
  version: string;
  lastUpdated: string;
  templates: TemplateInfo[];
}

export interface LayoutsRegistry {
  version: string;
  lastUpdated: string;
  layouts: LayoutInfo[];
}
