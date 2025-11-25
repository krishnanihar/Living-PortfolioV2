'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
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

interface AboutHeroProps {
  onScrollToContent?: () => void;
}

export function AboutHero({ onScrollToContent }: AboutHeroProps) {
  const [hoveredNode, setHoveredNode] = useState<KnowledgeNode | null>(null);
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

      {/* Hovered Node Info Overlay */}
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
            zIndex: 10,
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

      {/* Explore Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={handleScrollDown}
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1.5rem',
          background: 'var(--glass-08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-primary)',
          borderRadius: '100px',
          cursor: 'pointer',
          color: 'var(--text-70)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--glass-15)';
          e.currentTarget.style.color = 'var(--text-95)';
          e.currentTarget.style.borderColor = 'var(--text-20)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--glass-08)';
          e.currentTarget.style.color = 'var(--text-70)';
          e.currentTarget.style.borderColor = 'var(--border-primary)';
        }}
      >
        <span style={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.02em' }}>
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
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
