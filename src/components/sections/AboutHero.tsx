'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
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

// Dynamic import for 2D graph (mobile fallback)
const KnowledgeGraph2D = dynamic(
  () => import('@/components/knowledge-graph/KnowledgeGraph2D'),
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [introTimedOut, setIntroTimedOut] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress for zoom effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolled = -rect.top;

      // Calculate progress (0 to 1) over the first 50% of section scroll
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-hide intro text after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroTimedOut(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide intro text after timeout, interaction, or scroll
  const showIntroText = !introTimedOut && scrollProgress < 0.3 && !isInteracting && !hoveredNode;

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
      ref={sectionRef}
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
        onPointerDown={() => setIsInteracting(true)}
      >
        {!isMobile ? (
          <KnowledgeGraph3D
            onNodeHover={setHoveredNode}
            autoRotate={!isInteracting}
            scrollProgress={scrollProgress}
          />
        ) : (
          // Mobile fallback - 2D interactive graph
          <KnowledgeGraph2D
            onNodeHover={setHoveredNode}
          />
        )}
      </div>

      {/* Hero Text Introduction Overlay */}
      <AnimatePresence>
        {showIntroText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              padding: '2rem',
            }}
          >
            {/* Glassmorphic container */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                background: 'var(--glass-06)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '24px',
                padding: 'clamp(2rem, 4vw, 3rem)',
                border: '1px solid var(--text-08)',
                maxWidth: '480px',
                textAlign: 'center',
              }}
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '100px',
                  background: 'var(--glass-08)',
                  border: '1px solid var(--text-06)',
                  marginBottom: '1.5rem',
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--brand-red)' }} />
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-60)',
                  }}
                >
                  Knowledge Graph
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 200,
                  color: 'var(--text-95)',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                Nihar Sunkara
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: 300,
                  color: 'var(--text-60)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                Systems-thinking designer who ships in code
              </motion.p>

              {/* Interaction hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-40)',
                  letterSpacing: '0.05em',
                }}
              >
                Click and drag to explore the graph
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hovered Node Info Overlay */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            position: 'absolute',
            bottom: 'calc(64px + env(safe-area-inset-bottom) + 7rem)',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: 'var(--glass-08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              padding: '0.75rem 1.25rem',
              border: '1px solid var(--border-primary)',
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
          </div>
        </motion.div>
      )}

      {/* Explore Button - Centered Container */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(64px + env(safe-area-inset-bottom) + 3rem)',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 20,
        }}
      >
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={handleScrollDown}
          className="btn-secondary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>About Me</span>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>

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
