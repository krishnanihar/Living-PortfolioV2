'use client';

import { forwardRef, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Atropos from 'atropos';
import 'atropos/css';
import { useAtroposGyroscope } from '@/hooks/useAtroposGyroscope';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  brandColor: { r: number; g: number; b: number };
  year: string;
  link: string;
  tags: string[];
}

interface Props {
  project: Project;
  index: number;
  isActive: boolean;
}

const ConceptWorkPlaceholder = forwardRef<HTMLDivElement, Props>(
  ({ project, index, isActive }, ref) => {
    const brandRgb = `${project.brandColor.r}, ${project.brandColor.g}, ${project.brandColor.b}`;
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const atroposRef = useRef<HTMLDivElement>(null);
    const rotateRef = useRef<HTMLDivElement>(null);
    const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);
    const isAirIndia = project.id === 'air-india';

    // Gyroscope for mobile (Android only)
    useAtroposGyroscope(rotateRef, {
      maxRotateX: 1.5,
      maxRotateY: 1.5,
      enabled: isMobile,
    });

    // Mount state (SSR safety)
    useEffect(() => {
      setMounted(true);
    }, []);

    // Mobile detection
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Atropos init - ONCE on mount, not on isActive change
    useEffect(() => {
      if (mounted && !isMobile && atroposRef.current) {
        atroposInstance.current = Atropos({
          el: atroposRef.current,
          activeOffset: 60,
          rotateXMax: 1.5,
          rotateYMax: 1.5,
          shadow: false,
          highlight: false,
          duration: 800,
        });
      }

      return () => {
        if (atroposInstance.current) {
          atroposInstance.current.destroy();
        }
      };
    }, [mounted, isMobile]);

    return (
      <div
        ref={ref}
        className="work-placeholder-wrapper"
        style={{
          height: '100dvh',
          position: 'relative',
          zIndex: 100,
          // Faded state transitions - smooth easing, no overshoot
          opacity: isActive ? 1 : 0.5,
          filter: isActive ? 'none' : 'saturate(0.8) brightness(0.9)',
          transition: 'opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1), filter 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Full-height container - controlled snap handles navigation */}
        <div
          className="work-placeholder-inner"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: '0px',
            transform: 'scale(1)',
            willChange: 'transform, border-radius',
            transformOrigin: 'center center',
            background: '#000',
          }}
        >
          {/* Atropos wrapper - ALWAYS has class */}
          <div
            ref={atroposRef}
            className="atropos"
            style={{ position: 'absolute', inset: 0 }}
          >
            <div className="atropos-scale" style={{ height: '100%' }}>
              <div ref={rotateRef} className="atropos-rotate" style={{ height: '100%' }}>
                <div
                  className="atropos-inner"
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  {/* Giant Editorial Number - Parallax BACK */}
                  <div
                    data-atropos-offset="-8"
                    style={{
                      position: 'absolute',
                      top: isMobile ? '6%' : '6%',
                      left: isMobile ? '4%' : '4%',
                      fontSize: isMobile ? '28vw' : 'clamp(220px, 30vw, 450px)',
                      fontWeight: '200',
                      color: `rgba(${brandRgb}, 0.15)`,
                      lineHeight: '0.85',
                      letterSpacing: '-0.05em',
                      pointerEvents: 'none',
                      zIndex: 5,
                      textShadow: `0 0 150px rgba(${brandRgb}, 0.3)`,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Multi-Layer Parallax Images */}
                  {project.id === 'air-india' ? (
                    <>
                      {/* LAYER 1: Sky Background - Furthest Back */}
                      <div
                        data-atropos-offset="-10"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 1,
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src="/images/home/hero-sky.png"
                          alt="Sky background"
                          fill
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transform: 'scale(1.2)',
                          }}
                          quality={95}
                          priority
                        />
                      </div>

                      {/* LAYER 2: Clouds - Middle Depth */}
                      <div
                        data-atropos-offset="-5"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src="/images/home/hero-clouds.png"
                          alt="Clouds"
                          fill
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transform: 'scale(1.2)',
                          }}
                          quality={95}
                        />
                      </div>

                      {/* LAYER 3: Aircraft - Center */}
                      <div
                        data-atropos-offset="0"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src="/images/home/hero-aircraft.png"
                          alt="Air India Aircraft"
                          fill
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transform: 'scale(1.2)',
                          }}
                          quality={95}
                        />
                      </div>

                      {/* Light gradient overlay for glass panel readability */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          background: `linear-gradient(180deg,
                            transparent 0%,
                            transparent 70%,
                            var(--overlay-40) 100%
                          )`,
                          pointerEvents: 'none',
                          zIndex: 4,
                        }}
                      />
                    </>
                  ) : project.id === 'cleara' ? (
                    <>
                      {/* LAYER 1: Background */}
                      <div
                        data-atropos-offset="-10"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 1,
                          overflow: 'hidden',
                          background: '#FAF8F5',
                        }}
                      >
                        <Image
                          src="/images/cleara/cleara_bg.png"
                          alt=""
                          fill
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transform: 'scale(1.2)',
                          }}
                          quality={95}
                          priority
                        />
                      </div>

                      {/* LAYER 2: Features - Middle */}
                      <div
                        data-atropos-offset="0"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src="/images/cleara/cleara_features.png"
                          alt="Cleara Features"
                          fill
                          style={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                            transform: 'scale(0.9)',
                          }}
                          quality={95}
                          priority
                        />
                      </div>

                      {/* LAYER 3: Phone - Foreground */}
                      <div
                        data-atropos-offset="5"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src="/images/cleara/cleara_phone.png"
                          alt="Cleara App"
                          fill
                          style={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                            transform: 'scale(0.75)',
                          }}
                          quality={95}
                          priority
                        />
                      </div>
                    </>
                  ) : project.id === 'metamorphic' ? (
                    <>
                      {/* LAYER 1: Background - Furthest Back */}
                      <div
                        data-atropos-offset="-10"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 1,
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src="/images/meta_back.png"
                          alt=""
                          fill
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transform: 'scale(1.2)',
                          }}
                          quality={95}
                          priority
                        />
                      </div>

                      {/* LAYER 2: Foreground - Center */}
                      <div
                        data-atropos-offset="0"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src="/images/meta_front.png"
                          alt="Metamorphic Fractal Installation"
                          fill
                          style={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                            transform: 'scale(0.9)',
                          }}
                          quality={95}
                          priority
                        />
                      </div>
                    </>
                  ) : project.id === 'origen' ? (
                    <>
                      {/* LAYER 1: Grid Background - Furthest Back */}
                      <div
                        data-atropos-offset="-10"
                        className="origen-grid"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 1,
                          overflow: 'hidden',
                          background: `
                            linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px),
                            linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
                            linear-gradient(180deg, #0c0c10 0%, #0f172a 50%, #0c0c10 100%)
                          `,
                          backgroundSize: '40px 40px, 40px 40px, 100% 100%',
                        }}
                      />

                      {/* LAYER 2: Radial Gradient Glows */}
                      <div
                        data-atropos-offset="-5"
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          zIndex: 2,
                          background: `
                            radial-gradient(ellipse at 25% 25%, rgba(168, 85, 247, 0.18) 0%, transparent 50%),
                            radial-gradient(ellipse at 75% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                            radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.22) 0%, transparent 45%)
                          `,
                        }}
                      />

                      {/* LAYER 3: SVG Orbital Rings */}
                      <div
                        data-atropos-offset="-2"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          zIndex: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          viewBox="0 0 400 400"
                          style={{
                            width: isMobile ? '85%' : '70%',
                            height: isMobile ? '85%' : '70%',
                            overflow: 'visible',
                          }}
                        >
                          {/* Outer ring - purple (tokens) - tilted wrapper + spinning ellipse */}
                          <g style={{ transform: 'rotate(-20deg)', transformOrigin: '200px 200px' }}>
                            <ellipse
                              cx="200"
                              cy="200"
                              rx="150"
                              ry="55"
                              fill="none"
                              stroke="#A855F7"
                              strokeWidth="0.75"
                              opacity="0.35"
                              strokeDasharray="6 4"
                              className="origen-orbit-1"
                            />
                          </g>
                          {/* Middle ring - blue (react) - tilted wrapper + spinning ellipse */}
                          <g style={{ transform: 'rotate(15deg)', transformOrigin: '200px 200px' }}>
                            <ellipse
                              cx="200"
                              cy="200"
                              rx="120"
                              ry="45"
                              fill="none"
                              stroke="#3B82F6"
                              strokeWidth="1"
                              opacity="0.45"
                              strokeDasharray="8 3"
                              className="origen-orbit-2"
                            />
                          </g>
                          {/* Inner ring - green (mcp) - tilted wrapper + spinning ellipse */}
                          <g style={{ transform: 'rotate(40deg)', transformOrigin: '200px 200px' }}>
                            <ellipse
                              cx="200"
                              cy="200"
                              rx="90"
                              ry="35"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="0.75"
                              opacity="0.4"
                              strokeDasharray="4 6"
                              className="origen-orbit-3"
                            />
                          </g>
                          {/* Central hub glow */}
                          <circle
                            cx="200"
                            cy="200"
                            r="25"
                            fill="url(#hubGradient)"
                            opacity="0.6"
                          />
                          <circle
                            cx="200"
                            cy="200"
                            r="18"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="1"
                            opacity="0.5"
                          />
                          {/* Gradient definitions */}
                          <defs>
                            <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                              <stop offset="70%" stopColor="#A855F7" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="transparent" />
                            </radialGradient>
                          </defs>
                        </svg>
                      </div>

                      {/* LAYER 4: Package Nodes */}
                      <div
                        data-atropos-offset="0"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          zIndex: 4,
                          pointerEvents: 'none',
                        }}
                      >
                        {/* Tokens node - top left */}
                        <div
                          className="origen-node-1"
                          style={{
                            position: 'absolute',
                            top: isMobile ? '22%' : '25%',
                            left: isMobile ? '18%' : '22%',
                            width: isMobile ? '36px' : '44px',
                            height: isMobile ? '36px' : '44px',
                            borderRadius: '50%',
                            background: 'rgba(168, 85, 247, 0.12)',
                            border: '1px solid rgba(168, 85, 247, 0.35)',
                            boxShadow: '0 0 30px rgba(168, 85, 247, 0.25), inset 0 0 15px rgba(168, 85, 247, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                          </svg>
                        </div>
                        {/* React node - center right (uses wrapper for positioning) */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            right: isMobile ? '15%' : '20%',
                            transform: 'translateY(-50%)',
                          }}
                        >
                          <div
                            className="origen-node-2"
                            style={{
                              width: isMobile ? '40px' : '50px',
                              height: isMobile ? '40px' : '50px',
                              borderRadius: '50%',
                              background: 'rgba(59, 130, 246, 0.15)',
                              border: '1px solid rgba(59, 130, 246, 0.4)',
                              boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5">
                              <rect x="3" y="3" width="7" height="7" rx="1" />
                              <rect x="14" y="3" width="7" height="7" rx="1" />
                              <rect x="3" y="14" width="7" height="7" rx="1" />
                              <rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                          </div>
                        </div>
                        {/* MCP node - bottom left */}
                        <div
                          className="origen-node-3"
                          style={{
                            position: 'absolute',
                            bottom: isMobile ? '28%' : '28%',
                            left: isMobile ? '25%' : '28%',
                            width: isMobile ? '36px' : '44px',
                            height: isMobile ? '36px' : '44px',
                            borderRadius: '50%',
                            background: 'rgba(16, 185, 129, 0.12)',
                            border: '1px solid rgba(16, 185, 129, 0.35)',
                            boxShadow: '0 0 30px rgba(16, 185, 129, 0.25), inset 0 0 15px rgba(16, 185, 129, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" rx="1" />
                            <line x1="9" y1="2" x2="9" y2="4" />
                            <line x1="15" y1="2" x2="15" y2="4" />
                            <line x1="9" y1="20" x2="9" y2="22" />
                            <line x1="15" y1="20" x2="15" y2="22" />
                          </svg>
                        </div>
                      </div>

                      {/* LAYER 5: Floating Code Snippets */}
                      {!isMobile && (
                        <div
                          data-atropos-offset="4"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 5,
                            pointerEvents: 'none',
                          }}
                        >
                          {/* Top right snippet */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '18%',
                              right: '12%',
                              padding: '10px 14px',
                              background: 'var(--glass-06)',
                              backdropFilter: 'blur(20px)',
                              WebkitBackdropFilter: 'blur(20px)',
                              borderRadius: '10px',
                              border: '1px solid rgba(59, 130, 246, 0.15)',
                              fontFamily: 'ui-monospace, monospace',
                              fontSize: '11px',
                              color: 'rgba(59, 130, 246, 0.8)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            get_tokens(&#123; category: &apos;colors&apos; &#125;)
                          </div>
                          {/* Bottom left snippet */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '22%',
                              left: '10%',
                              padding: '10px 14px',
                              background: 'var(--glass-06)',
                              backdropFilter: 'blur(20px)',
                              WebkitBackdropFilter: 'blur(20px)',
                              borderRadius: '10px',
                              border: '1px solid rgba(16, 185, 129, 0.15)',
                              fontFamily: 'ui-monospace, monospace',
                              fontSize: '11px',
                              color: 'rgba(16, 185, 129, 0.8)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            compose_interface(&#123; ... &#125;)
                          </div>
                        </div>
                      )}

                      {/* Light gradient overlay for glass panel readability */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: '-10%',
                          background: `linear-gradient(180deg,
                            transparent 0%,
                            transparent 60%,
                            var(--overlay-50) 100%
                          )`,
                          pointerEvents: 'none',
                          zIndex: 6,
                        }}
                      />

                    </>
                  ) : null}

                  {/* Floating Glass Panel - Parallax FORWARD */}
                  <div
                    data-atropos-offset="4"
                    style={{
                      position: 'absolute',
                      bottom: isMobile ? '18%' : '15%',
                      right: isMobile ? '5%' : '8%',
                      width: isMobile ? '90%' : 'clamp(340px, 32vw, 420px)',
                      zIndex: 10,
                      background: `linear-gradient(135deg, var(--glass-04) 0%, var(--glass-02) 50%, var(--glass-03) 100%), var(--overlay-65)`,
                      backdropFilter: 'blur(40px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                      borderRadius: '24px',
                      border: `1px solid rgba(${brandRgb}, 0.2)`,
                      padding: isMobile ? '1.75rem' : '2.25rem',
                      boxShadow: `
                        0 32px 64px var(--overlay-20),
                        0 0 0 1px var(--glass-05),
                        inset 0 1px 0 var(--glass-10),
                        0 0 80px rgba(${brandRgb}, 0.08)
                      `,
                    }}
                  >
                    {/* Category Tag */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          color: isAirIndia ? 'var(--text-50)' : `rgba(${brandRgb}, 0.9)`,
                        }}
                      >
                        {project.category}
                      </span>
                      <span style={{ color: 'var(--text-25)', fontSize: '0.65rem' }}>•</span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          color: 'var(--text-50)',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>

                    {/* Title or Logo */}
                    {project.id === 'air-india' ? (
                      <div
                        data-atropos-offset="2"
                        style={{ margin: '0 0 0.875rem 0' }}
                      >
                        <Image
                          src="/logos/air-india.svg"
                          alt="Air India"
                          width={180}
                          height={64}
                          style={{
                            objectFit: 'contain',
                            opacity: 0.95,
                          }}
                        />
                      </div>
                    ) : (
                      <h2
                        data-atropos-offset="2"
                        style={{
                          fontSize: isMobile ? '1.75rem' : 'clamp(1.875rem, 3vw, 2.5rem)',
                          fontWeight: '300',
                          color: 'var(--text-95)',
                          lineHeight: '1.15',
                          letterSpacing: '-0.02em',
                          margin: '0 0 0.875rem 0',
                        }}
                      >
                        {project.title}
                      </h2>
                    )}

                    {/* Divider line */}
                    <div
                      style={{
                        width: '48px',
                        height: '2px',
                        background: isAirIndia
                          ? 'linear-gradient(90deg, var(--text-20), transparent)'
                          : `linear-gradient(90deg, rgba(${brandRgb}, 0.6), transparent)`,
                        marginBottom: '1rem',
                        borderRadius: '1px',
                      }}
                    />

                    {/* Description */}
                    <p
                      style={{
                        fontSize: isMobile ? '0.875rem' : '0.9375rem',
                        fontWeight: '300',
                        lineHeight: '1.7',
                        color: 'var(--text-60)',
                        margin: '0 0 1.25rem 0',
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: '500',
                            color: 'var(--text-50)',
                            background: isAirIndia ? 'var(--glass-05)' : `rgba(${brandRgb}, 0.08)`,
                            border: isAirIndia ? '1px solid var(--text-10)' : `1px solid rgba(${brandRgb}, 0.12)`,
                            borderRadius: '6px',
                            padding: '0.35rem 0.65rem',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button - Pops out MOST */}
                    <Link
                      href={project.link}
                      draggable="false"
                      data-atropos-offset="3"
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.625rem',
                        padding: '0.875rem 1.5rem',
                        background: isButtonHovered
                          ? (isAirIndia ? 'var(--glass-10)' : `rgba(${brandRgb}, 0.2)`)
                          : (isAirIndia ? 'var(--glass-05)' : `rgba(${brandRgb}, 0.1)`),
                        border: isAirIndia
                          ? `1px solid var(--text-${isButtonHovered ? '25' : '15'})`
                          : `1px solid rgba(${brandRgb}, ${isButtonHovered ? 0.4 : 0.25})`,
                        borderRadius: '14px',
                        color: 'var(--text-95)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isButtonHovered
                          ? (isAirIndia
                              ? '0 12px 32px rgba(0, 0, 0, 0.35)'
                              : `0 12px 32px rgba(0, 0, 0, 0.35), 0 0 24px rgba(${brandRgb}, 0.15)`)
                          : '0 6px 20px rgba(0, 0, 0, 0.25)',
                        position: 'relative',
                        zIndex: 20,
                        pointerEvents: 'auto',
                      }}
                    >
                      <span>View Project</span>
                      <ArrowRight
                        size={16}
                        style={{
                          color: isAirIndia ? (isButtonHovered ? 'var(--text-90)' : 'var(--text-60)') : undefined,
                          transition: 'all 0.3s ease',
                          transform: isButtonHovered ? 'translateX(4px)' : 'translateX(0)',
                        }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Atropos pointer-events fix + Origen animations */}
        <style jsx global>{`
          .atropos-scale {
            pointer-events: none !important;
          }
          .atropos-rotate {
            pointer-events: all !important;
          }
          .atropos a,
          .atropos button {
            pointer-events: all !important;
            position: relative;
            z-index: 10;
          }
          @keyframes gridPulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.6; }
          }
          @keyframes orbitalSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes orbitalSpinReverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          @keyframes nodePulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.08);
              opacity: 0.85;
            }
          }
          .origen-orbit-1 {
            animation: orbitalSpin 80s linear infinite;
            transform-origin: 200px 200px;
          }
          .origen-orbit-2 {
            animation: orbitalSpinReverse 60s linear infinite;
            transform-origin: 200px 200px;
          }
          .origen-orbit-3 {
            animation: orbitalSpin 100s linear infinite;
            transform-origin: 200px 200px;
          }
          .origen-node-1 {
            animation: nodePulse 3s ease-in-out infinite;
          }
          .origen-node-2 {
            animation: nodePulse 3s ease-in-out infinite 0.5s;
          }
          .origen-node-3 {
            animation: nodePulse 3s ease-in-out infinite 1s;
          }
          .origen-grid {
            animation: gridPulse 8s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }
);

ConceptWorkPlaceholder.displayName = 'ConceptWorkPlaceholder';
export default ConceptWorkPlaceholder;
