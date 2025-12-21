'use client';

import { forwardRef, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Atropos from 'atropos';
import 'atropos/css';

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
    const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);
    const isAirIndia = project.id === 'air-india';

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
              <div className="atropos-rotate" style={{ height: '100%' }}>
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
                  ) : project.id === 'psoriassist' ? (
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
                          src="/images/Psori_back.png"
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

                      {/* LAYER 2: iPhone - Center */}
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
                          src="/images/Psori_front.png"
                          alt="PsoriAssist App on iPhone"
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

        {/* Atropos pointer-events fix */}
        <style jsx>{`
          :global(.atropos-scale) {
            pointer-events: none !important;
          }
          :global(.atropos-rotate) {
            pointer-events: all !important;
          }
          :global(.atropos a),
          :global(.atropos button) {
            pointer-events: all !important;
            position: relative;
            z-index: 10;
          }
        `}</style>
      </div>
    );
  }
);

ConceptWorkPlaceholder.displayName = 'ConceptWorkPlaceholder';
export default ConceptWorkPlaceholder;
