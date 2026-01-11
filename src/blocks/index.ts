// Marketing Blocks
export { HeroSection, type HeroSectionProps } from './marketing/HeroSection';
export { FeatureGrid, type FeatureGridProps, type Feature } from './marketing/FeatureGrid';

// Application Blocks
export { StatsCards, type StatsCardsProps, type Stat } from './application/StatsCards';

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
