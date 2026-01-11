import * as React from 'react';
import { MarketingLayout } from '../../../layouts/MarketingLayout';
import { HeroSection, type HeroSectionProps } from '../../../blocks/marketing/HeroSection';
import { FeatureGrid, type Feature } from '../../../blocks/marketing/FeatureGrid';
import { cn } from '../../../lib/utils';
import { buttonVariants } from '../../../components/Button';

/**
 * LandingPage Template
 *
 * Complete marketing landing page with hero, features, testimonials slot,
 * pricing slot, and CTA section. Uses MarketingLayout for navigation.
 *
 * @accessibility
 * - Semantic section structure
 * - Proper heading hierarchy (h1 in hero, h2 for sections)
 * - Skip link from MarketingLayout
 */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
}

export interface LandingPageProps {
  /** Navigation content */
  nav: React.ReactNode;
  /** Hero section props */
  hero: Pick<HeroSectionProps, 'title' | 'subtitle' | 'image' | 'imageAlt' | 'ctaText' | 'ctaHref' | 'secondaryCtaText' | 'secondaryCtaHref' | 'badge' | 'layout' | 'size' | 'theme'>;
  /** Features list */
  features: Feature[];
  /** Features section title */
  featuresTitle?: string;
  /** Features section subtitle */
  featuresSubtitle?: string;
  /** Testimonials list */
  testimonials?: Testimonial[];
  /** Testimonials section title */
  testimonialsTitle?: string;
  /** Custom pricing section content */
  pricingContent?: React.ReactNode;
  /** Final CTA section */
  ctaSection?: {
    title: string;
    subtitle?: string;
    ctaText: string;
    ctaHref: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
  };
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional sections slot */
  additionalSections?: React.ReactNode;
  /** Additional class name */
  className?: string;
}

export function LandingPage({
  nav,
  hero,
  features,
  featuresTitle = 'Features',
  featuresSubtitle,
  testimonials = [],
  testimonialsTitle = 'What our customers say',
  pricingContent,
  ctaSection,
  footer,
  additionalSections,
  className,
}: LandingPageProps) {
  return (
    <MarketingLayout
      nav={nav}
      footer={footer}
      className={className}
    >
      {/* Hero Section */}
      <HeroSection
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        imageAlt={hero.imageAlt}
        ctaText={hero.ctaText}
        ctaHref={hero.ctaHref}
        secondaryCtaText={hero.secondaryCtaText}
        secondaryCtaHref={hero.secondaryCtaHref}
        badge={hero.badge}
        layout={hero.layout}
        size={hero.size}
        theme={hero.theme}
      />

      {/* Features Section */}
      <section
        className="py-16 lg:py-24 bg-[var(--semantic-color-background-subtle)]"
        aria-labelledby="features-title"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              id="features-title"
              className="text-3xl lg:text-4xl font-bold text-[var(--semantic-color-foreground-default)]"
            >
              {featuresTitle}
            </h2>
            {featuresSubtitle && (
              <p className="mt-4 text-lg text-[var(--semantic-color-foreground-muted)] max-w-2xl mx-auto">
                {featuresSubtitle}
              </p>
            )}
          </div>
          <FeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section
          className="py-16 lg:py-24"
          aria-labelledby="testimonials-title"
        >
          <div className="container mx-auto px-6">
            <h2
              id="testimonials-title"
              className="text-3xl lg:text-4xl font-bold text-[var(--semantic-color-foreground-default)] text-center mb-12"
            >
              {testimonialsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    'p-6 rounded-xl',
                    'bg-[var(--semantic-color-card-default)]',
                    'border border-[var(--semantic-color-border-default)]'
                  )}
                >
                  <blockquote>
                    <p className="text-[var(--semantic-color-foreground-default)] italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[var(--semantic-color-primary-default)] flex items-center justify-center text-white font-medium">
                        {testimonial.author.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-[var(--semantic-color-foreground-default)]">
                        {testimonial.author}
                      </p>
                      {(testimonial.role || testimonial.company) && (
                        <p className="text-sm text-[var(--semantic-color-foreground-muted)]">
                          {testimonial.role}
                          {testimonial.role && testimonial.company && ' at '}
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {pricingContent && (
        <section
          className="py-16 lg:py-24 bg-[var(--semantic-color-background-subtle)]"
          aria-labelledby="pricing-title"
        >
          <div className="container mx-auto px-6">
            {pricingContent}
          </div>
        </section>
      )}

      {/* Additional Sections */}
      {additionalSections}

      {/* Final CTA Section */}
      {ctaSection && (
        <section
          className={cn(
            'py-16 lg:py-24',
            'bg-gradient-to-br from-[var(--semantic-color-primary-default)] to-[var(--semantic-color-accent-default)]'
          )}
          aria-labelledby="cta-title"
        >
          <div className="container mx-auto px-6 text-center">
            <h2
              id="cta-title"
              className="text-3xl lg:text-4xl font-bold text-white"
            >
              {ctaSection.title}
            </h2>
            {ctaSection.subtitle && (
              <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                {ctaSection.subtitle}
              </p>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={ctaSection.ctaHref}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'bg-white text-[var(--semantic-color-primary-default)] hover:bg-white/90'
                )}
              >
                {ctaSection.ctaText}
              </a>
              {ctaSection.secondaryCtaText && ctaSection.secondaryCtaHref && (
                <a
                  href={ctaSection.secondaryCtaHref}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'border-white text-white hover:bg-white/10'
                  )}
                >
                  {ctaSection.secondaryCtaText}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </MarketingLayout>
  );
}

export default LandingPage;
