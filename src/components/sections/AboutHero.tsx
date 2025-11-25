'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { KnowledgeNode } from '@/types/knowledge-graph';

// Dynamic import for 3D graph (no SSR)
const KnowledgeGraph3D = dynamic(
  () => import('@/components/knowledge-graph/KnowledgeGraph3D'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid var(--text-20)',
            borderTopColor: 'var(--brand-red)',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
    ),
  }
);

// Get time-based greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

interface AboutHeroProps {
  onScrollToContent?: () => void;
}

export function AboutHero({ onScrollToContent }: AboutHeroProps) {
  const [hoveredNode, setHoveredNode] = useState<KnowledgeNode | null>(null);
  const [greeting] = useState(getGreeting);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll to content
  const handleScrollDown = () => {
    if (onScrollToContent) {
      onScrollToContent();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* 3D Knowledge Graph Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
        }}
      >
        {!isMobile ? (
          <KnowledgeGraph3D
            onNodeHover={setHoveredNode}
            autoRotate={true}
          />
        ) : (
          // Mobile fallback - simple animated background
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 50% 50%, var(--glass-05) 0%, transparent 70%)',
            }}
          />
        )}
      </div>

      {/* Content Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          pointerEvents: 'none',
        }}
      >
        {/* Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--glass-03)',
            backdropFilter: 'blur(40px) saturate(120%)',
            borderRadius: '28px',
            border: '1px solid var(--border-primary)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
            pointerEvents: 'auto',
          }}
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              color: 'var(--text-60)',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 200,
              color: 'var(--text-95)',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            I'm{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #DA0E29 0%, #FF6B6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 300,
              }}
            >
              Nihar
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-70)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}
          >
            Systems-thinking designer who ships in code.
            <br />
            <span style={{ color: 'var(--text-50)' }}>
              Exploring the connections between design, development, and everything in between.
            </span>
          </motion.p>

          {/* Graph hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-40)',
            }}
          >
            <Sparkles size={14} />
            <span>Drag to explore my knowledge graph</span>
          </motion.div>
        </motion.div>

        {/* Hovered Node Info */}
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'absolute',
              bottom: '120px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--glass-08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              padding: '0.75rem 1.25rem',
              border: '1px solid var(--border-primary)',
              pointerEvents: 'none',
            }}
          >
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-90)',
                fontWeight: 500,
              }}
            >
              {hoveredNode.label}
            </p>
            {hoveredNode.description && (
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-50)',
                  marginTop: '0.25rem',
                }}
              >
                {hoveredNode.description}
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={handleScrollDown}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-40)',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-70)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-40)')}
      >
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}

export default AboutHero;
