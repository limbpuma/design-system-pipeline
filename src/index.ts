// ============================================
// COMPONENTS
// ============================================

// Button
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

// ============================================
// AI COMPONENTS
// ============================================

// AIStatusIndicator
export { AIStatusIndicator } from './components/AIStatusIndicator';
export type { AIStatusIndicatorProps, AIStatus } from './components/AIStatusIndicator';

// ChatMessage
export { ChatMessage } from './components/ChatMessage';
export type { ChatMessageProps, MessageRole } from './components/ChatMessage';

// PromptInput
export { PromptInput } from './components/PromptInput';
export type { PromptInputProps, PromptSuggestion } from './components/PromptInput';

// ============================================
// UTILITIES
// ============================================

export { cn } from './lib/utils';

// ============================================
// BLOCKS
// ============================================

// Marketing Blocks
export { HeroSection, type HeroSectionProps } from './blocks/marketing/HeroSection';
export { FeatureGrid, type FeatureGridProps, type Feature } from './blocks/marketing/FeatureGrid';

// Application Blocks
export { StatsCards, type StatsCardsProps, type Stat } from './blocks/application/StatsCards';

// AI Blocks
export {
  ImageUploader,
  type ImageUploaderProps,
  type UploadedImage,
} from './blocks/ai/ImageUploader';
export {
  AnalysisProgress,
  type AnalysisProgressProps,
  type AnalysisStep,
} from './blocks/ai/AnalysisProgress';
export {
  ConversationPanel,
  type ConversationPanelProps,
  type Message,
} from './blocks/ai/ConversationPanel';
export {
  AIResultsCard,
  type AIResultsCardProps,
  type Finding,
  type FindingSeverity,
} from './blocks/ai/AIResultsCard';

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

// AI Templates
export {
  AIAnalysisPage,
  type AIAnalysisPageProps,
  type AnalysisPhase,
  type AnalysisResult,
} from './templates/ai/AIAnalysisPage';
export {
  ChatInterface,
  type ChatInterfaceProps,
  type ChatContext,
} from './templates/ai/ChatInterface';

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
