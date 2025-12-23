'use client';

import React from 'react';

interface SkillTagsProps {
  skills: string[];
}

// Skill display names and colors
const SKILL_MAP: Record<string, { label: string; color: string }> = {
  // Design Tools
  figma: { label: 'Figma', color: 'rgba(162, 89, 255, 0.2)' },
  sketch: { label: 'Sketch', color: 'rgba(253, 173, 0, 0.2)' },
  adobe: { label: 'Adobe CC', color: 'rgba(255, 0, 0, 0.15)' },
  framer: { label: 'Framer', color: 'rgba(0, 0, 0, 0.15)' },
  principle: { label: 'Principle', color: 'rgba(128, 0, 255, 0.2)' },
  protopie: { label: 'ProtoPie', color: 'rgba(255, 85, 125, 0.2)' },

  // Development
  react: { label: 'React', color: 'rgba(97, 218, 251, 0.2)' },
  nextjs: { label: 'Next.js', color: 'rgba(255, 255, 255, 0.1)' },
  typescript: { label: 'TypeScript', color: 'rgba(49, 120, 198, 0.2)' },
  javascript: { label: 'JavaScript', color: 'rgba(240, 219, 79, 0.2)' },
  tailwind: { label: 'Tailwind CSS', color: 'rgba(56, 189, 248, 0.2)' },
  nodejs: { label: 'Node.js', color: 'rgba(104, 160, 99, 0.2)' },

  // Design Systems
  'design-systems': { label: 'Design Systems', color: 'rgba(218, 14, 41, 0.15)' },
  'design-tokens': { label: 'Design Tokens', color: 'rgba(139, 92, 246, 0.2)' },
  'component-library': { label: 'Component Libraries', color: 'rgba(16, 185, 129, 0.2)' },

  // Other
  'motion-design': { label: 'Motion Design', color: 'rgba(245, 158, 11, 0.2)' },
  'user-research': { label: 'User Research', color: 'rgba(59, 130, 246, 0.2)' },
  accessibility: { label: 'Accessibility', color: 'rgba(16, 185, 129, 0.2)' },
  'data-viz': { label: 'Data Visualization', color: 'rgba(236, 72, 153, 0.2)' },
  ai: { label: 'AI/ML', color: 'rgba(139, 92, 246, 0.2)' },
  'speculative-design': { label: 'Speculative Design', color: 'rgba(232, 121, 249, 0.2)' },
};

export function SkillTags({ skills }: SkillTagsProps) {
  // Map skills to display data, fallback to raw string if not in map
  const displaySkills = skills.slice(0, 8).map(skill => {
    const mapped = SKILL_MAP[skill.toLowerCase()];
    if (mapped) return mapped;
    // Fallback: capitalize and use default color
    return {
      label: skill.charAt(0).toUpperCase() + skill.slice(1).replace(/-/g, ' '),
      color: 'rgba(218, 14, 41, 0.12)',
    };
  });

  if (displaySkills.length === 0) return null;

  return (
    <div
      style={{
        marginTop: '0.75rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.375rem',
        opacity: 0,
        animation: 'messageSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
      }}
    >
      {displaySkills.map((skill, index) => (
        <span
          key={index}
          style={{
            padding: '0.375rem 0.75rem',
            background: skill.color,
            border: '1px solid var(--glass-10)',
            borderRadius: '16px',
            fontSize: '0.7rem',
            fontWeight: '500',
            color: 'var(--text-80)',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}
        >
          {skill.label}
        </span>
      ))}
    </div>
  );
}

export default SkillTags;
