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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    }}>
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
            style={{
              position: 'relative',
              borderRadius: '1rem',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid transparent',
            }}
          >
            {/* Animated outline on hover/expand */}
            {(isHovered || isExpanded) && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  borderRadius: '1rem',
                  pointerEvents: 'none',
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
              style={{
                padding: '2rem',
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '400',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    {project.category}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '500',
                      letterSpacing: '-0.025em',
                      color: 'rgba(255, 255, 255, 0.95)',
                    }}
                  >
                    {project.title}
                  </h3>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <span
                    style={{
                      display: 'inline-block',
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      borderRadius: '0.75rem',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontWeight: '600',
                      background: project.isWinner ? 'rgba(251, 146, 60, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: project.isWinner ? '1px solid rgba(251, 146, 60, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: project.isWinner ? 'rgba(251, 146, 60, 1)' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {project.badge}
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={20} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  ) : (
                    <ChevronDown size={20} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  )}
                </div>
              </div>

              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.625',
                  marginBottom: '1rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                {project.description}
              </p>

              {/* Tech tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      paddingLeft: '0.625rem',
                      paddingRight: '0.625rem',
                      paddingTop: '0.25rem',
                      paddingBottom: '0.25rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '300',
                      letterSpacing: '0.025em',
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
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    paddingBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                  }}>
                    {/* Contribution */}
                    <div
                      style={{
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginBottom: '0.75rem',
                          color: 'rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        My Contribution
                      </div>
                      <div
                        style={{
                          fontSize: '0.875rem',
                          lineHeight: '1.625',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        <p>
                          <strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Owned:</strong> {project.contribution.owned}
                        </p>
                        <p>
                          <strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Collaborated:</strong> {project.contribution.collaborated}
                        </p>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div
                      style={{
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        background: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginBottom: '0.75rem',
                          color: 'rgba(16, 185, 129, 0.9)',
                        }}
                      >
                        Outcome
                      </div>
                      <div
                        style={{
                          fontSize: '0.875rem',
                          lineHeight: '1.625',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
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
