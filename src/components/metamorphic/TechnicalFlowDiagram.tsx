'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Droplets, Cpu, Monitor, Camera, Zap, Volume2 } from 'lucide-react';
import { animate, stagger, createTimeline } from 'animejs';

/**
 * TechnicalFlowDiagram - Animated System Architecture
 *
 * Shows the technical flow of the installation:
 * Water Tap → Rotary Encoder → Arduino → Relay/Serial → TouchDesigner → Display
 *
 * Features:
 * - Looping data flow animation
 * - Scroll-triggered activation
 * - Responsive layout (horizontal on desktop, vertical on mobile)
 */

interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

const FLOW_NODES: FlowNode[] = [
  { id: 'tap', label: 'Water Tap', sublabel: 'Rotary Encoder', icon: Droplets },
  { id: 'arduino', label: 'Arduino Uno', sublabel: 'Controller', icon: Cpu },
  { id: 'relay', label: 'Relay Switch', sublabel: 'Lighting Control', icon: Zap },
  { id: 'touchdesigner', label: 'TouchDesigner', sublabel: 'Visual Processing', icon: Monitor },
  { id: 'camera', label: 'Webcam', sublabel: 'Reflection Capture', icon: Camera },
  { id: 'output', label: 'TV Display', sublabel: 'Audio + Visuals', icon: Volume2 },
];

export function TechnicalFlowDiagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<SVGLineElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    setIsMobile(window.innerWidth < 1024);

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll-triggered animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);

          if (!prefersReducedMotion) {
            // Stagger reveal nodes with anime.js v4
            animate(nodesRef.current, {
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: stagger(100, { start: 200 }),
              duration: 600,
              ease: 'outExpo',
              onComplete: () => {
                // Start looping flow animation after reveal
                setIsAnimating(true);
              },
            });
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible, prefersReducedMotion]);

  // Looping flow animation
  useEffect(() => {
    if (!isAnimating || prefersReducedMotion) return;

    const flowTimeline = createTimeline({
      loop: true,
      defaults: { ease: 'inOutSine' },
    });

    // Animate each node sequentially with pulse effect
    nodesRef.current.forEach((node, i) => {
      if (!node) return;

      flowTimeline.add(node, {
        scale: [1, 1.1, 1],
        boxShadow: [
          '0 0 0 rgba(147, 51, 234, 0)',
          '0 0 30px rgba(147, 51, 234, 0.4)',
          '0 0 0 rgba(147, 51, 234, 0)',
        ],
        duration: 600,
      }, i * 400);
    });

    return () => {
      flowTimeline.pause();
    };
  }, [isAnimating, prefersReducedMotion]);

  // Desktop layout (horizontal)
  const renderDesktopLayout = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}
    >
      {FLOW_NODES.map((node, index) => {
        const Icon = node.icon;
        const isLast = index === FLOW_NODES.length - 1;

        return (
          <React.Fragment key={node.id}>
            {/* Node */}
            <div
              ref={(el) => {
                if (el) nodesRef.current[index] = el;
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.25rem 1.5rem',
                background: 'var(--glass-04)',
                border: '1px solid var(--glass-10)',
                borderRadius: '16px',
                minWidth: '120px',
                opacity: prefersReducedMotion ? 1 : 0,
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  background: 'rgba(var(--metamorphic-accent-rgb), 0.1)',
                }}
              >
                <Icon
                  size={24}
                  style={{ color: 'rgba(var(--metamorphic-accent-rgb), 0.9)' }}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--text-90)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {node.label}
                </div>
                {node.sublabel && (
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-50)',
                    }}
                  >
                    {node.sublabel}
                  </div>
                )}
              </div>
            </div>

            {/* Arrow connector */}
            {!isLast && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 0.25rem',
                }}
              >
                <svg width="32" height="16" viewBox="0 0 32 16">
                  <path
                    d="M0 8 L24 8 M20 4 L28 8 L20 12"
                    fill="none"
                    stroke="rgba(var(--metamorphic-accent-rgb), 0.4)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  // Mobile layout (vertical with zigzag)
  const renderMobileLayout = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {FLOW_NODES.map((node, index) => {
        const Icon = node.icon;
        const isLast = index === FLOW_NODES.length - 1;

        return (
          <React.Fragment key={node.id}>
            {/* Node */}
            <div
              ref={(el) => {
                if (el) nodesRef.current[index] = el;
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'var(--glass-04)',
                border: '1px solid var(--glass-10)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '300px',
                opacity: prefersReducedMotion ? 1 : 0,
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  background: 'rgba(var(--metamorphic-accent-rgb), 0.1)',
                  flexShrink: 0,
                }}
              >
                <Icon
                  size={22}
                  style={{ color: 'rgba(var(--metamorphic-accent-rgb), 0.9)' }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: 'var(--text-90)',
                  }}
                >
                  {node.label}
                </div>
                {node.sublabel && (
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-50)',
                    }}
                  >
                    {node.sublabel}
                  </div>
                )}
              </div>
            </div>

            {/* Arrow connector */}
            {!isLast && (
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M12 0 L12 16 M8 12 L12 20 L16 12"
                  fill="none"
                  stroke="rgba(var(--metamorphic-accent-rgb), 0.4)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="technical-system"
      style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        background: `linear-gradient(180deg,
          var(--bg-primary) 0%,
          var(--metamorphic-bg-primary) 50%,
          var(--bg-primary) 100%)`,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '2.5rem' : '3.5rem',
            opacity: isVisible || prefersReducedMotion ? 1 : 0,
            transform:
              isVisible || prefersReducedMotion
                ? 'translateY(0)'
                : 'translateY(30px)',
            transition: 'all 0.6s ease-out',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(var(--metamorphic-accent-rgb), 0.8)',
            }}
          >
            Technical Architecture
          </span>
          <h2
            style={{
              fontSize: isMobile
                ? 'clamp(1.75rem, 6vw, 2.25rem)'
                : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 200,
              letterSpacing: '-0.02em',
              color: 'var(--text-95)',
              marginTop: '0.75rem',
            }}
          >
            How It Works
          </h2>
          <p
            style={{
              fontSize: isMobile ? '1rem' : '1.0625rem',
              color: 'var(--text-60)',
              maxWidth: '600px',
              margin: '1rem auto 0',
              lineHeight: 1.7,
            }}
          >
            A seamless integration of physical interaction, embedded computing,
            and real-time visual processing.
          </p>
        </div>

        {/* Flow diagram */}
        {isMobile ? renderMobileLayout() : renderDesktopLayout()}

        {/* Tech stack tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: isMobile ? '2.5rem' : '3.5rem',
            opacity: isVisible || prefersReducedMotion ? 1 : 0,
            transform:
              isVisible || prefersReducedMotion
                ? 'translateY(0)'
                : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.4s',
          }}
        >
          {[
            'TouchDesigner',
            'Arduino',
            'Deforum Stable Diffusion',
            'WebSocket',
            'Real-time Processing',
          ].map((tech) => (
            <span
              key={tech}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.8125rem',
                fontWeight: 400,
                color: 'var(--text-60)',
                background: 'var(--glass-05)',
                border: '1px solid var(--glass-10)',
                borderRadius: '100px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnicalFlowDiagram;
