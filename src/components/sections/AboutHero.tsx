'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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

  // Use refs for scroll tracking to avoid callback recreation
  const scrollProgressRef = useRef(0);
  const zoomCompleteRef = useRef(false);

  // State for UI updates only
  const [scrollProgress, setScrollProgress] = useState(0);
  const [zoomComplete, setZoomComplete] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const accumulatedScroll = useRef(0);

  // How much scroll distance maps to full zoom (in pixels)
  const SCROLL_DISTANCE = 600;

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle wheel events for scroll-controlled zoom
  // Using refs to avoid callback recreation on every scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    // Skip on mobile or if zoom is complete
    if (isMobile || zoomCompleteRef.current) return;

    // Always capture scroll until zoom is complete
    if (scrollProgressRef.current < 1) {
      e.preventDefault();

      // Accumulate scroll delta
      accumulatedScroll.current += e.deltaY;

      // Map accumulated scroll to progress (0-1)
      const newProgress = Math.min(1, Math.max(0, accumulatedScroll.current / SCROLL_DISTANCE));
      scrollProgressRef.current = newProgress;
      setScrollProgress(newProgress); // Update state for UI

      // Mark zoom complete when we reach the end
      if (newProgress >= 1) {
        zoomCompleteRef.current = true;
        setZoomComplete(true);
      }
    }
  }, [isMobile]); // Only isMobile as dependency - stable callback!

  // Add wheel listener
  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel, isMobile]);

  // Reset scroll position on mount to ensure zoom works from start
  useEffect(() => {
    if (window.scrollY > 0 && scrollProgressRef.current === 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Handle zoom complete callback
  const handleZoomComplete = useCallback(() => {
    zoomCompleteRef.current = true;
    setZoomComplete(true);
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
      >
        {!isMobile ? (
          <KnowledgeGraph3D
            onNodeHover={setHoveredNode}
            autoRotate={zoomComplete}
            scrollProgress={!zoomComplete ? scrollProgress : undefined}
            onZoomComplete={handleZoomComplete}
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

      {/* Zoom Progress Indicator */}
      {!zoomComplete && !isMobile && scrollProgress > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            width: '120px',
            height: '4px',
            background: 'var(--glass-10)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${scrollProgress * 100}%`,
              height: '100%',
              background: 'var(--brand-red)',
              borderRadius: '2px',
              transition: 'width 0.1s ease-out',
            }}
          />
        </div>
      )}

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
          {zoomComplete ? 'Scroll to explore' : 'Scroll to zoom out'}
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
