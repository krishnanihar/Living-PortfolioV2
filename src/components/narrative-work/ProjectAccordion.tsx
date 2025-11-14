'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface ProjectDetails {
  id: string;
  category: string;
  title: string;
  badge: string;
  description: string;
  contribution: {
    owned: string;
    collaborated: string;
  };
  outcome: string;
  isWinner?: boolean;
  tags: string[];
}

interface ProjectAccordionProps {
  projects: ProjectDetails[];
  inView: boolean;
}

/**
 * Expandable accordion for project details
 * Extracted from AirIndiaWork for reuse
 */
export function ProjectAccordion({ projects, inView }: ProjectAccordionProps) {
  const [expandedProject, setExpandedProject] = React.useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  return (
    <div className="space-y-8">
      {projects.map((project, index) => {
        const isExpanded = expandedProject === project.id;
        const isHovered = hoveredProject === project.id;

        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid transparent',
            }}
          >
            {/* Animated outline on hover/expand */}
            {(isHovered || isExpanded) && (
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  padding: '1px',
                  background: 'linear-gradient(135deg, rgba(218, 14, 41, 0.6), rgba(218, 14, 41, 0.2), rgba(218, 14, 41, 0.6))',
                  backgroundSize: '200% 200%',
                  animation: 'borderShimmer 3s ease-in-out infinite',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
            )}

            {/* Project header - clickable */}
            <div
              onClick={() => setExpandedProject(isExpanded ? null : project.id)}
              className="p-8 cursor-pointer"
            >
              <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                <div>
                  <div
                    className="text-xs font-normal tracking-[0.1em] uppercase mb-2"
                    style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    {project.category}
                  </div>
                  <h3
                    className="text-2xl font-medium tracking-tight"
                    style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                  >
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className="inline-block px-4 py-2 rounded-xl text-xs uppercase tracking-[0.12em] font-semibold"
                    style={{
                      background: project.isWinner ? 'rgba(251, 146, 60, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: project.isWinner ? '1px solid rgba(251, 146, 60, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: project.isWinner ? 'rgba(251, 146, 60, 1)' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {project.badge}
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-white/70" />
                  ) : (
                    <ChevronDown size={20} className="text-white/70" />
                  )}
                </div>
              </div>

              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-light tracking-wide"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Expandable content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 space-y-6">
                    {/* Contribution */}
                    <div
                      className="p-6 rounded-xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <div
                        className="text-xs font-medium tracking-[0.1em] uppercase mb-3"
                        style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                      >
                        My Contribution
                      </div>
                      <div
                        className="text-sm leading-relaxed space-y-2"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        <p>
                          <strong className="text-white/90">Owned:</strong> {project.contribution.owned}
                        </p>
                        <p>
                          <strong className="text-white/90">Collaborated:</strong> {project.contribution.collaborated}
                        </p>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div
                      className="p-6 rounded-xl"
                      style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                      }}
                    >
                      <div
                        className="text-xs font-medium tracking-[0.1em] uppercase mb-3"
                        style={{ color: 'rgba(16, 185, 129, 0.9)' }}
                      >
                        Outcome
                      </div>
                      <div
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {project.outcome}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
