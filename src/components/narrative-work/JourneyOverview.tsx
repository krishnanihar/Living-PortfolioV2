'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Briefcase, Lightbulb, ArrowRight } from 'lucide-react';

interface Act {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  projects: string[];
}

const acts: Act[] = [
  {
    id: 'foundation',
    title: 'Act I: Foundation',
    description: 'College projects and early experiments in consciousness and generative art',
    icon: Palette,
    color: 'rgba(147, 51, 234, 0.8)',
    projects: ['Metamorphic Fractal Reflections'],
  },
  {
    id: 'industry',
    title: 'Act II: Industry',
    description: 'Professional work designing at scale for Air India',
    icon: Briefcase,
    color: 'rgba(218, 14, 41, 0.8)',
    projects: ['Pixel Radar', 'Aviation Analytics', 'Mobile Patterns', 'Design Systems'],
  },
  {
    id: 'innovation',
    title: 'Act III: Innovation',
    description: 'Research and speculative futures in AI and health tech',
    icon: Lightbulb,
    color: 'rgba(14, 165, 233, 0.8)',
    projects: ['Latent Space', 'mythOS', 'PsoriAssist'],
  },
];

/**
 * Interactive timeline preview showing the 3-act journey structure
 * Users can see what's ahead and jump to specific acts
 */
export function JourneyOverview() {
  const [hoveredAct, setHoveredAct] = React.useState<string | null>(null);

  const scrollToAct = (actId: string) => {
    const actPositions = {
      foundation: 0.15, // Scroll to 15% of page
      industry: 0.5, // Scroll to 50% of page
      innovation: 0.8, // Scroll to 80% of page
    };

    const position = actPositions[actId as keyof typeof actPositions] || 0;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: scrollHeight * position,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Section title */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.p
          className="text-sm font-light tracking-[0.2em] uppercase text-white/60 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Journey Ahead
        </motion.p>
        <motion.h2
          className="text-3xl md:text-4xl font-extralight text-white/90 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Three Acts of Design
        </motion.h2>
        <motion.p
          className="text-white/60 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          This is a story of exploration across design, systems, and speculation
        </motion.p>
      </div>

      {/* Act timeline */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {acts.map((act, index) => {
            const Icon = act.icon;
            const isHovered = hoveredAct === act.id;

            return (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredAct(act.id)}
                onMouseLeave={() => setHoveredAct(null)}
                onClick={() => scrollToAct(act.id)}
              >
                {/* Card */}
                <div
                  className="relative overflow-hidden rounded-2xl p-6 md:p-8 h-full transition-all duration-500"
                  style={{
                    background: isHovered
                      ? `${act.color.replace('0.8', '0.08')}`
                      : 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(40px)',
                    border: `1px solid ${isHovered ? act.color.replace('0.8', '0.3') : 'rgba(255, 255, 255, 0.06)'}`,
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  }}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500"
                      style={{
                        background: isHovered ? act.color : 'rgba(255, 255, 255, 0.05)',
                        boxShadow: isHovered ? `0 0 30px ${act.color}` : 'none',
                      }}
                    >
                      <Icon
                        size={20}
                        style={{
                          color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl md:text-2xl font-light mb-3 transition-colors duration-500"
                    style={{
                      color: isHovered ? act.color : 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    {act.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/60 mb-6 leading-relaxed">
                    {act.description}
                  </p>

                  {/* Projects */}
                  <div className="space-y-2">
                    {act.projects.map((project, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-white/50 transition-colors duration-300"
                        style={{
                          color: isHovered ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        <div
                          className="w-1 h-1 rounded-full transition-all duration-300"
                          style={{
                            background: isHovered ? act.color : 'rgba(255, 255, 255, 0.3)',
                            boxShadow: isHovered ? `0 0 8px ${act.color}` : 'none',
                          }}
                        />
                        {project}
                      </div>
                    ))}
                  </div>

                  {/* Hover arrow */}
                  <motion.div
                    className="absolute bottom-6 right-6"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight
                      size={20}
                      style={{ color: act.color }}
                    />
                  </motion.div>

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${act.color.replace('0.8', '0.1')} 0%, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Timeline connector (desktop only) */}
                {index < acts.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-4 transform translate-x-full -translate-y-1/2">
                    <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Click instruction */}
        <motion.p
          className="text-center text-xs text-white/40 mt-8 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Click any act to jump ahead →
        </motion.p>
      </div>
    </section>
  );
}
