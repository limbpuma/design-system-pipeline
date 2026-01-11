// Registry Schema Types
export * from './schema';

// Registry Data
import blocksRegistryData from './blocks.registry.json';
import layoutsRegistryData from './layouts.registry.json';
import templatesRegistryData from './templates.registry.json';

export const blocksRegistry = blocksRegistryData;
export const layoutsRegistry = layoutsRegistryData;
export const templatesRegistry = templatesRegistryData;

// Utility functions for querying registries
export function getBlockById(id: string) {
  return blocksRegistry.blocks.find(b => b.id === id);
}

export function getBlocksByCategory(category: string) {
  return blocksRegistry.blocks.filter(b => b.category === category);
}

export function getBlocksByTag(tag: string) {
  return blocksRegistry.blocks.filter(b => b.tags.includes(tag));
}

export function getLayoutById(id: string) {
  return layoutsRegistry.layouts.find(l => l.id === id);
}

export function getLayoutsByCategory(category: string) {
  return layoutsRegistry.layouts.filter(l => l.category === category);
}

export function searchBlocks(query: {
  category?: string;
  tags?: string[];
  search?: string;
}) {
  let results = blocksRegistry.blocks;

  if (query.category) {
    results = results.filter(b => b.category === query.category);
  }

  if (query.tags && query.tags.length > 0) {
    results = results.filter(b =>
      query.tags!.some(tag => b.tags.includes(tag))
    );
  }

  if (query.search) {
    const searchLower = query.search.toLowerCase();
    results = results.filter(b =>
      b.name.toLowerCase().includes(searchLower) ||
      b.tags.some(t => t.includes(searchLower))
    );
  }

  return results;
}

// Template utility functions
export function getTemplateById(id: string) {
  return templatesRegistry.templates.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string) {
  return templatesRegistry.templates.filter(t => t.category === category);
}

export function getTemplatesByLayout(layout: string) {
  return templatesRegistry.templates.filter(t => t.layout === layout);
}

export function getTemplatesByTag(tag: string) {
  return templatesRegistry.templates.filter(t => t.tags.includes(tag));
}

export function searchTemplates(query: {
  category?: string;
  layout?: string;
  tags?: string[];
  search?: string;
}) {
  let results = templatesRegistry.templates;

  if (query.category) {
    results = results.filter(t => t.category === query.category);
  }

  if (query.layout) {
    results = results.filter(t => t.layout === query.layout);
  }

  if (query.tags && query.tags.length > 0) {
    results = results.filter(t =>
      query.tags!.some(tag => t.tags.includes(tag))
    );
  }

  if (query.search) {
    const searchLower = query.search.toLowerCase();
    results = results.filter(t =>
      t.name.toLowerCase().includes(searchLower) ||
      t.description.toLowerCase().includes(searchLower) ||
      t.tags.some(tag => tag.includes(searchLower))
    );
  }

  return results;
}
