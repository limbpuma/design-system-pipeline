// Components
export { Button, buttonVariants } from './components/Button';
export type { ButtonProps } from './components/Button';

// Card
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/Card';

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/Dialog';

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';

// SearchBar
export { SearchBar, searchBarVariants } from './components/SearchBar';
export type { SearchBarProps, SearchSuggestion } from './components/SearchBar';

// AuthenticityBadge
export { AuthenticityBadge, AuthenticityScore, badgeVariants } from './components/AuthenticityBadge';
export type { AuthenticityBadgeProps, AuthenticityIndicator } from './components/AuthenticityBadge';

// Utilities
export { cn } from './lib/utils';

// ============================================
// BLOCKS
// ============================================

// Marketing Blocks
export { HeroSection, type HeroSectionProps } from './blocks/marketing/HeroSection';
export { FeatureGrid, type FeatureGridProps, type Feature } from './blocks/marketing/FeatureGrid';

// Application Blocks
export { StatsCards, type StatsCardsProps, type Stat } from './blocks/application/StatsCards';

// ============================================
// LAYOUTS
// ============================================

export { AppShell, type AppShellProps } from './layouts/AppShell';
export { AuthLayout, type AuthLayoutProps } from './layouts/AuthLayout';
export { MarketingLayout, type MarketingLayoutProps } from './layouts/MarketingLayout';

// ============================================
// TEMPLATES
// ============================================

// Authentication Templates
export { LoginPage, type LoginPageProps } from './templates/authentication/LoginPage';

// Dashboard Templates
export { DashboardOverview, type DashboardOverviewProps, type Activity } from './templates/dashboard/DashboardOverview';

// Marketing Templates
export { LandingPage, type LandingPageProps, type Testimonial } from './templates/marketing/LandingPage';

// ============================================
// REGISTRY (for MCP/AI consumption)
// ============================================

export {
  blocksRegistry,
  layoutsRegistry,
  templatesRegistry,
  getBlockById,
  getBlocksByCategory,
  getBlocksByTag,
  getLayoutById,
  getLayoutsByCategory,
  searchBlocks,
  getTemplateById,
  getTemplatesByCategory,
  getTemplatesByLayout,
  getTemplatesByTag,
  searchTemplates,
} from './registry';

export type {
  BlockMetadata,
  LayoutMetadata,
  TemplateMetadata,
  BlocksRegistry,
  LayoutsRegistry,
  TemplatesRegistry,
  BlockQuery,
  TemplateQuery,
} from './registry';

// Styles (importable)
// import '@limbpuma/design-system/styles'
