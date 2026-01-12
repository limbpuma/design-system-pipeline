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
// FORM COMPONENTS
// ============================================

// Input
export { Input, inputVariants } from './components/Input';
export type { InputProps } from './components/Input';

// Select
export { Select, selectVariants } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

// Checkbox
export { Checkbox, checkboxVariants } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

// Switch
export { Switch, switchVariants } from './components/Switch';
export type { SwitchProps } from './components/Switch';

// Textarea
export { Textarea, textareaVariants } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

// Slider
export { Slider, sliderVariants } from './components/Slider';
export type { SliderProps } from './components/Slider';

// ============================================
// THEME
// ============================================

// ThemeToggle
export { ThemeToggle, themeToggleVariants, useTheme } from './components/ThemeToggle';
export type { ThemeToggleProps, Theme, ResolvedTheme, UseThemeReturn } from './components/ThemeToggle';

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

// ModelSelector
export { ModelSelector, modelSelectorVariants } from './components/ModelSelector';
export type { ModelSelectorProps, AIModel } from './components/ModelSelector';

// TokenCounter
export { TokenCounter, tokenCounterVariants } from './components/TokenCounter';
export type { TokenCounterProps } from './components/TokenCounter';

// StreamingText
export { StreamingText } from './components/StreamingText';
export type { StreamingTextProps } from './components/StreamingText';

// CodeBlock
export { CodeBlock, codeBlockVariants } from './components/CodeBlock';
export type { CodeBlockProps } from './components/CodeBlock';

// ============================================
// FEEDBACK COMPONENTS
// ============================================

// Alert
export { Alert, alertVariants } from './components/Alert';
export type { AlertProps } from './components/Alert';

// Skeleton
export { Skeleton, SkeletonCard, SkeletonListItem, SkeletonTable, skeletonVariants } from './components/Skeleton';
export type { SkeletonProps, SkeletonCardProps, SkeletonListItemProps, SkeletonTableProps } from './components/Skeleton';

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
export { Sidebar, sidebarVariants, type SidebarProps, type NavItem } from './blocks/application/Sidebar';
export { CommandPalette, type CommandPaletteProps, type CommandItem } from './blocks/application/CommandPalette';
export { Toast, ToastProvider, useToast, toastVariants, type ToastData } from './blocks/application/Toast';

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
export {
  PromptLibrary,
  type PromptLibraryProps,
  type Prompt,
} from './blocks/ai/PromptLibrary';
export {
  AgentConfigPanel,
  type AgentConfigPanelProps,
  type AgentConfig,
  type AgentParameter,
} from './blocks/ai/AgentConfigPanel';

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
