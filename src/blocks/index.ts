// Marketing Blocks
export { HeroSection, type HeroSectionProps } from './marketing/HeroSection';
export { FeatureGrid, type FeatureGridProps, type Feature } from './marketing/FeatureGrid';
export { PricingCards, type PricingCardsProps, type PricingTier, type PricingFeature } from './marketing/PricingCards';
export { FAQ, type FAQProps, type FAQItem } from './marketing/FAQ';

// Application Blocks
export { StatsCards, type StatsCardsProps, type Stat } from './application/StatsCards';
export { DataTable, type DataTableProps, type Column, type SortDirection } from './application/DataTable';
export { ActivityFeed, type ActivityFeedProps, type ActivityItem, type ActivityType } from './application/ActivityFeed';
export { NotificationList, type NotificationListProps, type Notification, type NotificationType } from './application/NotificationList';

// AI Blocks
export {
  ImageUploader,
  type ImageUploaderProps,
  type UploadedImage,
} from './ai/ImageUploader';
export {
  AnalysisProgress,
  type AnalysisProgressProps,
  type AnalysisStep,
} from './ai/AnalysisProgress';
export {
  ConversationPanel,
  type ConversationPanelProps,
  type Message,
} from './ai/ConversationPanel';
export {
  AIResultsCard,
  type AIResultsCardProps,
  type Finding,
  type FindingSeverity,
} from './ai/AIResultsCard';
