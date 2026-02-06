'use client';

/**
 * PersonalizedRecommendations Component
 *
 * Shows project recommendations based on visitor intent and behavior.
 * Displays as a horizontal scroll on mobile, grid on desktop.
 */

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { usePersonalization } from '@/hooks/usePersonalization';
import type { ProjectRecommendation } from '@/lib/personalization/types';

// ============================================
// Project Images (placeholder mapping)
// ============================================

const PROJECT_IMAGES: Record<string, string> = {
  'air-india': '/images/projects/air-india-thumb.jpg',
  'cleara': '/images/cleara/watercolor/hero-fragment-1.png',
  // HIDDEN: Latent Space WIP
  // 'latent-space': '/images/projects/latent-space-thumb.jpg',
  'metamorphic-fractal-reflections': '/images/projects/metamorphic-thumb.jpg',
  'mythos': '/images/projects/mythos-thumb.jpg',
};

const PROJECT_CATEGORIES: Record<string, string> = {
  'air-india': 'System Design',
  'cleara': 'Digital Therapeutic',
  // HIDDEN: Latent Space WIP
  // 'latent-space': 'Speculative Design',
  'metamorphic-fractal-reflections': 'Generative Art',
  'mythos': 'Web Platform',
};

// ============================================
// Component
// ============================================

interface PersonalizedRecommendationsProps {
  className?: string;
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
}

export function PersonalizedRecommendations({
  className = '',
  title = 'Recommended for You',
  showViewAll = true,
  maxItems = 3,
}: PersonalizedRecommendationsProps) {
  const { state } = usePersonalization();
  const { recommendations, isReady, inferredIntent } = useMemo(
    () => ({
      recommendations: state.recommendations,
      isReady: state.isReady,
      inferredIntent: state.inferredIntent,
    }),
    [state.recommendations, state.isReady, state.inferredIntent]
  );

  // Don't render if not ready or no recommendations
  if (!isReady || recommendations.length === 0) {
    return null;
  }

  const displayedRecommendations = recommendations.slice(0, maxItems);

  // Generate subtitle based on intent
  const subtitle = getSubtitle(state.schema.visitor.intent, inferredIntent);

  return (
    <motion.section
      className={`${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--text-50)' }} />
            <h3
              className="font-medium"
              style={{
                color: 'var(--text-90)',
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              }}
            >
              {title}
            </h3>
          </div>
          {subtitle && (
            <p
              style={{
                color: 'var(--text-50)',
                fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {showViewAll && (
          <Link
            href="/work"
            className="flex items-center gap-1 text-sm transition-colors"
            style={{ color: 'var(--text-60)' }}
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedRecommendations.map((rec, index) => (
          <RecommendationCard
            key={rec.slug}
            recommendation={rec}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}

// ============================================
// Recommendation Card
// ============================================

interface RecommendationCardProps {
  recommendation: ProjectRecommendation;
  index: number;
}

function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const { slug, name, reason } = recommendation;
  const category = PROJECT_CATEGORIES[slug] || 'Project';
  const imageUrl = PROJECT_IMAGES[slug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/work/${slug}`}
        className="group block relative rounded-2xl overflow-hidden"
        style={{
          background: 'var(--glass-05)',
          border: '1px solid var(--glass-10)',
        }}
      >
        {/* Image placeholder */}
        <div
          className="aspect-[16/10] relative overflow-hidden"
          style={{ background: 'var(--glass-08)' }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ color: 'var(--text-30)' }}
            >
              <Sparkles className="w-8 h-8" />
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, var(--glass-60) 0%, transparent 50%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: 'var(--text-40)' }}
          >
            {category}
          </span>

          {/* Title */}
          <h4
            className="mt-1 font-medium transition-colors group-hover:text-[#d97757]"
            style={{
              color: 'var(--text-90)',
              fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)',
            }}
          >
            {name}
          </h4>

          {/* Reason */}
          <p
            className="mt-1 text-sm line-clamp-1"
            style={{ color: 'var(--text-50)' }}
          >
            {reason}
          </p>
        </div>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: '#d97757' }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
}

// ============================================
// Helpers
// ============================================

function getSubtitle(
  explicitIntent: string | null,
  inferredIntent: string
): string | null {
  if (explicitIntent) {
    switch (explicitIntent) {
      case 'hiring':
        return 'Projects that demonstrate professional impact';
      case 'inspiration':
        return 'Creative explorations and experiments';
      case 'learning':
        return 'In-depth case studies with process details';
      case 'collaboration':
        return 'Work that showcases collaboration potential';
      default:
        return null;
    }
  }

  // Use inferred intent
  switch (inferredIntent) {
    case 'hiring_evaluation':
      return 'Based on your professional interest';
    case 'peer_exploration':
      return 'Creative work you might enjoy';
    case 'learning_research':
      return 'Detailed case studies for learning';
    case 'collaboration_seeking':
      return 'Projects open to collaboration';
    default:
      return null;
  }
}

// ============================================
// Horizontal Scroll Variant (Mobile)
// ============================================

interface HorizontalRecommendationsProps {
  className?: string;
}

export function HorizontalRecommendations({
  className = '',
}: HorizontalRecommendationsProps) {
  const { state } = usePersonalization();
  const { recommendations, isReady } = state;

  if (!isReady || recommendations.length === 0) {
    return null;
  }

  return (
    <section className={className}>
      <div className="flex items-center gap-2 mb-3 px-4">
        <Sparkles className="w-4 h-4" style={{ color: 'var(--text-50)' }} />
        <h3
          className="font-medium"
          style={{ color: 'var(--text-90)', fontSize: '1rem' }}
        >
          For You
        </h3>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.slug}
            className="flex-shrink-0 w-64 snap-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/work/${rec.slug}`}
              className="block rounded-xl overflow-hidden"
              style={{
                background: 'var(--glass-05)',
                border: '1px solid var(--glass-10)',
              }}
            >
              <div
                className="aspect-video"
                style={{ background: 'var(--glass-08)' }}
              />
              <div className="p-3">
                <h4
                  className="font-medium"
                  style={{ color: 'var(--text-90)', fontSize: '0.9375rem' }}
                >
                  {rec.name}
                </h4>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: 'var(--text-50)' }}
                >
                  {rec.reason}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
