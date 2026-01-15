import type { Meta, StoryObj } from '@storybook/react';
import { LandingPage } from './LandingPage';

const meta: Meta<typeof LandingPage> = {
  title: 'Templates/Marketing/LandingPage',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LandingPage>;

const mockNav = (
  <nav className="flex items-center justify-between w-full">
    <div className="font-bold text-xl">DesignSystem</div>
    <div className="flex gap-6">
      <a href="#features" className="text-sm hover:text-blue-600">Features</a>
      <a href="#pricing" className="text-sm hover:text-blue-600">Pricing</a>
      <a href="#contact" className="text-sm hover:text-blue-600">Contact</a>
    </div>
  </nav>
);

const mockFeatures = [
  {
    id: '1',
    title: 'Lightning Fast',
    description: 'Built for performance with optimized components.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Accessible',
    description: 'WCAG 2.1 AA compliant out of the box.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Customizable',
    description: 'Semantic tokens for easy theming.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: '4',
    title: 'TypeScript Ready',
    description: 'Full type safety with comprehensive types.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

export const Default: Story = {
  args: {
    nav: mockNav,
    hero: {
      title: 'Build Beautiful Interfaces',
      subtitle: 'A modern design system with semantic tokens, accessibility-first components, and dark mode support.',
      ctaText: 'Get Started',
      ctaHref: '#',
      secondaryCtaText: 'View Docs',
      secondaryCtaHref: '#',
      badge: 'New Release v1.0',
      layout: 'centered',
      size: 'lg',
    },
    features: mockFeatures,
    featuresTitle: 'Everything you need',
    featuresSubtitle: 'Our design system provides all the building blocks for creating professional applications.',
    ctaSection: {
      title: 'Ready to get started?',
      subtitle: 'Join thousands of developers building with our design system.',
      ctaText: 'Start Building',
      ctaHref: '#',
    },
  },
};

export const WithTestimonials: Story = {
  args: {
    ...Default.args,
    testimonials: [
      {
        id: '1',
        quote: 'This design system has completely transformed how we build UIs.',
        author: 'Sarah Chen',
        role: 'Lead Developer',
        company: 'TechCorp',
      },
      {
        id: '2',
        quote: 'The accessibility features saved us weeks of development time.',
        author: 'Mike Johnson',
        role: 'Product Manager',
        company: 'StartupXYZ',
      },
    ],
    testimonialsTitle: 'Loved by developers',
  },
};

export const DarkMode: Story = {
  args: Default.args,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
