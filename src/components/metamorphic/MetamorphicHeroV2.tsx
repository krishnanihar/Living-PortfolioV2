'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Atropos from 'atropos';
import 'atropos/css';
import { useAtroposGyroscope } from '@/hooks/useAtroposGyroscope';

/**
 * MetamorphicHeroV2 - Air India-Style 3D Parallax Hero
 *
 * Full-viewport hero with:
 * - 3D parallax image layers using Atropos
 * - Glassmorphic centered content card
 * - Purple accent theme integration
 * - Smooth scroll indicator
 */

// Shimmer placeholder for image loading
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1a1a1a" offset="20%" />
      <stop stop-color="#2a2a2a" offset="50%" />
      <stop stop-color="#1a1a1a" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1a1a1a" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const blurDataURL = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

interface MetamorphicHeroV2Props {
  /** Callback when CTA is clicked */
  onEnterPortal?: () => void;
}

export function MetamorphicHeroV2({ onEnterPortal }: MetamorphicHeroV2Props) {
  const [isClient, setIsClient] = useState(false);
  const [inView, setInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Atropos refs
  const atroposRef = useRef<HTMLDivElement>(null);
  const rotateRef = useRef<HTMLDivElement>(null);
  const atroposInstance = useRef<ReturnType<typeof Atropos> | null>(null);

  // Gyroscope for mobile (Android only)
  useAtroposGyroscope(rotateRef, {
    maxRotateX: 1,
    maxRotateY: 1,
    enabled: isMobile,
  });

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Atropos 3D parallax
  useEffect(() => {
    if (atroposRef.current && !isMobile && isClient) {
      atroposInstance.current = Atropos({
        el: atroposRef.current,
        activeOffset: 60,
        rotateXMax: 1,
        rotateYMax: 1,
        shadow: false,
        highlight: false,
        duration: 300,
        alwaysActive: false,
        commonOrigin: true,
      });
    }

    return () => {
      if (atroposInstance.current) {
        atroposInstance.current.destroy();
      }
    };
  }, [isMobile, isClient]);

  const handleScrollDown = () => {
    if (onEnterPortal) {
      onEnterPortal();
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  if (!isClient) {
    return (
      <section
        style={{
          height: '100vh',
          background: 'var(--metamorphic-bg-primary)',
        }}
      />
    );
  }

  return (
    <header
      id="metamorphic-hero"
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Atropos Container - 3D Parallax Wrapper */}
      <div
        ref={atroposRef}
        className="atropos"
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        <div className="atropos-scale" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
          <div ref={rotateRef} className="atropos-rotate" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
            <div className="atropos-inner" style={{ width: '100%', height: '100%', position: 'relative' }}>

              {/* LAYER 1: Background Image - Furthest Back */}
              <div
                data-atropos-offset="-8"
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  zIndex: 1,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/images/meta_back.png"
                  alt="Metamorphic background - bathroom installation"
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={blurDataURL(1920, 1080)}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 40%',
                    transform: 'scale(1.2)',
                  }}
                  quality={95}
                />
              </div>

              {/* LAYER 2: Foreground Image - Closer */}
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
                  alt="Metamorphic foreground - mirror installation"
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURL(1920, 1080)}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 40%',
                    transform: 'scale(1.2)',
                  }}
                  quality={95}
                />
              </div>

              {/* Purple Gradient Overlay */}
              <div
                data-atropos-offset="-3"
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 3,
                  background: `radial-gradient(ellipse at center,
                    rgba(147, 51, 234, 0.15) 0%,
                    transparent 60%)`,
                  pointerEvents: 'none',
                }}
              />


              {/* Centered Content Card - Glassmorphism */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  width: '90%',
                  maxWidth: '580px',
                  padding: isMobile ? '2rem' : '2.5rem 3rem',
                  pointerEvents: 'auto',
                  // Glassmorphism
                  background: `
                    linear-gradient(135deg, var(--glass-04) 0%, var(--glass-02) 50%, var(--glass-03) 100%),
                    var(--overlay-45)
                  `,
                  backdropFilter: 'blur(60px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                  borderRadius: '32px',
                  border: '1px solid var(--glass-04)',
                  boxShadow: `
                    0 40px 80px var(--overlay-20),
                    0 20px 40px var(--overlay-15),
                    inset 0 1px 0 var(--glass-05),
                    inset 0 0 20px var(--overlay-10)
                  `,
                  textAlign: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Gradient Border Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '32px',
                  padding: '1px',
                  background: 'linear-gradient(135deg, var(--glass-06) 0%, var(--glass-02) 50%, var(--glass-04) 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  pointerEvents: 'none',
                }} />

                {/* Top Highlight */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '10%',
                  right: '10%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)',
                  pointerEvents: 'none',
                }} />

                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: '500',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Case Study
                </motion.div>

                {/* Purple Accent Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {/* NID Logo */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(147, 51, 234, 0.1))',
                      border: '1px solid rgba(147, 51, 234, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px',
                    }}
                  >
                    {/* NID Logo - CSS mask for automatic theme color */}
                    <div
                      role="img"
                      aria-label="NID Logo"
                      style={{
                        width: '40px',
                        height: '28px',
                        backgroundColor: 'var(--text-90)',
                        maskImage: 'url(/logos/nid.svg)',
                        WebkitMaskImage: 'url(/logos/nid.svg)',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  style={{
                    fontSize: isMobile
                      ? 'clamp(1.75rem, 6vw, 2.25rem)'
                      : 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 200,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: 'var(--text-95)',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-newsreader)',
                  }}
                >
                  Metamorphic Fractal Reflections
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.85 }}
                  style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    fontWeight: 300,
                    color: 'var(--text-60)',
                    marginBottom: '1.5rem',
                    lineHeight: 1.5,
                  }}
                >
                  An immersive installation exploring consciousness through ego dissolution
                </motion.p>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    flexWrap: 'wrap',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 400,
                      color: 'var(--text-50)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ color: 'rgba(147, 51, 234, 0.8)' }}>●</span>
                    NID 2023
                  </span>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 400,
                      color: 'var(--text-50)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ color: 'rgba(147, 51, 234, 0.8)' }}>●</span>
                    Installation Art
                  </span>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.15 }}
                  onClick={handleScrollDown}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.75rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--text-95)',
                    background: 'rgba(147, 51, 234, 0.15)',
                    border: '1px solid rgba(147, 51, 234, 0.3)',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Explore the Installation
                  <ChevronDown size={16} />
                </motion.button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </header>
  );
}

export default MetamorphicHeroV2;
