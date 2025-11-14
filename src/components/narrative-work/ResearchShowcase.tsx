'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface ResearchProject {
  title: string;
  description: string;
  category: string;
  stats?: Array<{ label: string; value: string }>;
  image?: string;
  videoUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  color: string; // RGB format
}

interface ResearchShowcaseProps {
  project: ResearchProject;
  inView: boolean;
  index?: number;
}

/**
 * Flexible showcase for research projects
 * Supports images, videos, stats, and CTAs
 */
export function ResearchShowcase({ project, inView, index = 0 }: ResearchShowcaseProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(60px) saturate(150%)',
        border: `1px solid ${isHovered ? `rgba(${project.color}, 0.3)` : 'rgba(255, 255, 255, 0.06)'}`,
        transition: 'all 0.5s ease',
      }}
    >
      <div className="p-8 md:p-12">
        {/* Category & Title */}
        <div className="mb-8">
          <p
            className="text-xs font-light tracking-[0.2em] uppercase mb-3"
            style={{ color: `rgb(${project.color})` }}
          >
            {project.category}
          </p>
          <h3
            className="text-3xl md:text-4xl font-light mb-4"
            style={{ color: 'rgba(255, 255, 255, 0.95)' }}
          >
            {project.title}
          </h3>
          <p
            className="text-base md:text-lg leading-relaxed max-w-3xl"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            {project.description}
          </p>
        </div>

        {/* Stats grid (if provided) */}
        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {project.stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div
                  className="text-2xl font-light mb-1"
                  style={{ color: `rgb(${project.color})` }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-wide"
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video embed (if provided) */}
        {project.videoUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <iframe
              src={project.videoUrl}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          {project.caseStudyUrl && (
            <Link
              href={project.caseStudyUrl as any}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300"
              style={{
                background: isHovered ? `rgba(${project.color}, 0.15)` : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isHovered ? `rgba(${project.color}, 0.3)` : 'rgba(255, 255, 255, 0.1)'}`,
                color: isHovered ? `rgb(${project.color})` : 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <span>View Case Study</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              <span>Try Demo</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Hover glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(${project.color}, 0.08) 0%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}
