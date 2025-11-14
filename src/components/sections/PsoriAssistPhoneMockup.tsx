'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import {
  Home, Camera, Activity, Settings, ChevronLeft,
  TrendingUp, Calendar, Heart, FileText, Award,
  Check, X, Info, Sparkles
} from 'lucide-react';

type Screen = 'home' | 'photo' | 'pasi' | 'meds' | 'mental' | 'triggers' | 'report' | 'settings';

// PsoriAssist Brand Color System (Portfolio-Grade)
const BRAND_COLORS = {
  // Primary Brand Colors
  primary: '#4A90E2',      // Trust blue
  secondary: '#50C878',    // Wellness green
  accent: '#FF9E67',       // Human warmth

  // Semantic Health Colors
  healing: '#50C878',
  improving: '#9B7EF2',
  stable: '#4A90E2',
  flareup: '#FF6B6B',
  moderate: '#FBD24C',

  // Gradients
  primaryGradient: 'linear-gradient(135deg, #4A90E2 0%, #50C878 100%)',
  warmGradient: 'linear-gradient(135deg, #FF9E67 0%, #FBD24C 100%)',
  healingGradient: 'linear-gradient(135deg, #50C878 0%, #9B7EF2 100%)',
  glowGradient: 'radial-gradient(circle, rgba(74,144,226,0.3) 0%, rgba(80,200,120,0.2) 100%)'
};

// iOS 17 Light Mode Design System (Enhanced)
const IOS_COLORS = {
  // Backgrounds
  systemBackground: '#FFFFFF',
  secondarySystemBackground: '#F2F2F7',
  tertiarySystemBackground: '#FFFFFF',
  groupedBackground: '#F2F2F7',

  // Labels
  label: '#000000',
  secondaryLabel: 'rgba(60, 60, 67, 0.6)',
  tertiaryLabel: 'rgba(60, 60, 67, 0.3)',
  quaternaryLabel: 'rgba(60, 60, 67, 0.18)',

  // System Colors - Using brand colors where applicable
  systemBlue: BRAND_COLORS.primary,
  systemGreen: BRAND_COLORS.healing,
  systemRed: '#FF3B30',
  systemPink: '#FF2D55',
  systemYellow: BRAND_COLORS.moderate,
  systemPurple: BRAND_COLORS.improving,
  systemOrange: BRAND_COLORS.accent,

  // Separators
  separator: 'rgba(60, 60, 67, 0.29)',
  opaqueSeparator: '#C6C6C8',

  // Fills (for buttons/controls)
  tertiarySystemFill: 'rgba(118, 118, 128, 0.12)',
  quaternarySystemFill: 'rgba(116, 116, 128, 0.08)'
};

// iOS 17 Typography Scale
const IOS_TYPOGRAPHY = {
  largeTitle: { size: 34, lineHeight: 41, weight: '700' as const, tracking: -0.38 },
  title1: { size: 28, lineHeight: 34, weight: '700' as const, tracking: -0.36 },
  title2: { size: 22, lineHeight: 28, weight: '700' as const, tracking: -0.26 },
  title3: { size: 20, lineHeight: 25, weight: '600' as const, tracking: -0.45 },
  headline: { size: 17, lineHeight: 22, weight: '600' as const, tracking: -0.43 },
  body: { size: 17, lineHeight: 22, weight: '400' as const, tracking: -0.41 },
  callout: { size: 16, lineHeight: 21, weight: '400' as const, tracking: -0.32 },
  subheadline: { size: 15, lineHeight: 20, weight: '400' as const, tracking: -0.24 },
  footnote: { size: 13, lineHeight: 18, weight: '400' as const, tracking: -0.08 },
  caption1: { size: 12, lineHeight: 16, weight: '400' as const, tracking: 0 },
  caption2: { size: 11, lineHeight: 13, weight: '400' as const, tracking: 0.06 }
};

// Advanced Shadow System (Portfolio-Grade - 4-6 layers)
const IOS_SHADOWS = {
  // Standard card with depth
  card: `
    0 2px 4px rgba(0,0,0,0.04),
    0 4px 8px rgba(0,0,0,0.06),
    0 8px 16px rgba(0,0,0,0.08),
    0 16px 32px rgba(0,0,0,0.10),
    inset 0 1px 0 rgba(255,255,255,0.9)
  `,

  // Button with subtle depth
  button: `
    0 2px 6px rgba(0,0,0,0.10),
    0 4px 12px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.8)
  `,

  // Elevated elements (modals, popovers)
  elevated: `
    0 20px 40px rgba(0,0,0,0.15),
    0 10px 20px rgba(0,0,0,0.10),
    0 4px 8px rgba(0,0,0,0.08),
    inset 0 1px 1px rgba(255,255,255,0.9)
  `,

  // Colored shadows for brand elements
  brandBlue: `
    0 8px 24px rgba(74,144,226,0.25),
    0 4px 12px rgba(74,144,226,0.15),
    0 2px 6px rgba(0,0,0,0.08)
  `,

  brandGreen: `
    0 8px 24px rgba(80,200,120,0.25),
    0 4px 12px rgba(80,200,120,0.15),
    0 2px 6px rgba(0,0,0,0.08)
  `,

  // Floating effect for interactive elements
  floating: `
    0 20px 40px rgba(0,0,0,0.15),
    0 10px 20px rgba(0,0,0,0.10),
    0 4px 8px rgba(0,0,0,0.08),
    inset 0 1px 1px rgba(255,255,255,1),
    inset 0 -1px 1px rgba(0,0,0,0.05)
  `
};

// Advanced Glassmorphism System (Portfolio-Grade)
const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`;

const IOS_GLASS = {
  card: {
    background: `
      linear-gradient(135deg,
        rgba(255,255,255,0.85) 0%,
        rgba(255,255,255,0.65) 100%
      )
    `,
    backdropFilter: 'blur(40px) saturate(180%) brightness(1.08)',
    border: '1px solid rgba(255,255,255,0.9)',
    boxShadow: `
      0 8px 32px rgba(0,0,0,0.08),
      inset 0 1px 1px rgba(255,255,255,1),
      inset 0 -1px 1px rgba(0,0,0,0.05)
    `,
    backgroundImage: NOISE_TEXTURE
  },

  cardSubtle: {
    background: `
      linear-gradient(135deg,
        rgba(255,255,255,0.70) 0%,
        rgba(255,255,255,0.50) 100%
      )
    `,
    backdropFilter: 'blur(30px) saturate(150%) brightness(1.05)',
    border: '1px solid rgba(255,255,255,0.6)',
    boxShadow: `
      0 4px 16px rgba(0,0,0,0.06),
      inset 0 1px 0.5px rgba(255,255,255,0.8)
    `,
    backgroundImage: NOISE_TEXTURE
  },

  // Brand-colored glass variants
  brandBlueGlass: {
    background: `
      linear-gradient(135deg,
        rgba(74,144,226,0.15) 0%,
        rgba(74,144,226,0.08) 100%
      )
    `,
    backdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
    border: '1px solid rgba(74,144,226,0.3)',
    boxShadow: `
      0 8px 32px rgba(74,144,226,0.15),
      0 4px 16px rgba(0,0,0,0.05),
      inset 0 1px 1px rgba(255,255,255,0.5),
      inset 0 -1px 1px rgba(74,144,226,0.1)
    `
  },

  brandGreenGlass: {
    background: `
      linear-gradient(135deg,
        rgba(80,200,120,0.15) 0%,
        rgba(80,200,120,0.08) 100%
      )
    `,
    backdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
    border: '1px solid rgba(80,200,120,0.3)',
    boxShadow: `
      0 8px 32px rgba(80,200,120,0.15),
      0 4px 16px rgba(0,0,0,0.05),
      inset 0 1px 1px rgba(255,255,255,0.5),
      inset 0 -1px 1px rgba(80,200,120,0.1)
    `
  },

  statusBar: {
    background: 'rgba(242, 242, 247, 0.75)',
    backdropFilter: 'blur(30px) saturate(180%)'
  },

  tabBar: {
    background: 'rgba(249, 249, 249, 0.82)',
    backdropFilter: 'blur(30px) saturate(180%)'
  }
};

// iOS-native spring animation constants
const SPRING_CONFIG = {
  screen: { type: 'spring' as const, stiffness: 300, damping: 30, mass: 0.8 },
  button: { type: 'spring' as const, stiffness: 400, damping: 17 },
  card: { type: 'spring' as const, stiffness: 260, damping: 26 },
  smooth: { type: 'spring' as const, stiffness: 200, damping: 20 },
  elastic: { type: 'spring' as const, stiffness: 150, damping: 12, mass: 1 }
};

// Confetti particle for checkbox celebrations
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  velocity: { x: number; y: number };
}

export function PsoriAssistPhoneMockup() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [photoOpacity, setPhotoOpacity] = useState(50);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [medicationChecked, setMedicationChecked] = useState([false, false, false]);
  const [streak, setStreak] = useState(14);
  const [showPasiResult, setShowPasiResult] = useState(false);
  const [compareSlider, setCompareSlider] = useState(50);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [pullToRefresh, setPullToRefresh] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const screenContainerRef = useRef<HTMLDivElement>(null);
  const dragY = useMotionValue(0);

  // 3D Perspective Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setShowPasiResult(true);
        setActiveScreen('pasi');
      }, 2000);
    }, 500);
  };

  const handleMedicationCheck = (index: number, event: React.MouseEvent) => {
    const newChecked = [...medicationChecked];
    newChecked[index] = !newChecked[index];
    setMedicationChecked(newChecked);

    // Confetti celebration when checking off
    if (newChecked[index] && !prefersReducedMotion) {
      triggerConfetti(event.clientX, event.clientY);
    }

    if (newChecked[index] && newChecked.every(c => c)) {
      setStreak(streak + 1);
    }
  };

  const triggerConfetti = (x: number, y: number) => {
    // Portfolio-Grade Confetti: 50+ particles with realistic physics
    const colors = [
      BRAND_COLORS.healing,      // Green
      BRAND_COLORS.primary,      // Blue
      BRAND_COLORS.accent,       // Orange
      BRAND_COLORS.moderate,     // Yellow
      BRAND_COLORS.improving     // Purple
    ];

    const newConfetti: ConfettiParticle[] = Array.from({ length: 50 }, (_, i) => {
      const angle = (i / 50) * Math.PI * 2; // Full 360° spread
      const speed = 3 + Math.random() * 3; // Variable speed for depth

      return {
        id: Date.now() + i,
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed - 4 // Initial upward burst
        }
      };
    });

    setConfetti(prev => [...prev, ...newConfetti]);
    setTimeout(() => {
      setConfetti(prev => prev.filter(p => !newConfetti.find(n => n.id === p.id)));
    }, 2000); // Longer duration for better celebration
  };

  // Swipe gesture handling
  const handleDragEnd = (_: any, info: PanInfo) => {
    const screens: Screen[] = ['home', 'photo', 'triggers', 'settings'];
    const currentIndex = screens.indexOf(activeScreen);

    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x < 0 && currentIndex < screens.length - 1) {
        setActiveScreen(screens[currentIndex + 1]);
      } else if (info.offset.x > 0 && currentIndex > 0) {
        setActiveScreen(screens[currentIndex - 1]);
      }
    }
  };

  // Pull-to-refresh handling
  const handlePullDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 80 && activeScreen === 'home') {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        setPullToRefresh(0);
      }, 1500);
    } else {
      setPullToRefresh(0);
    }
  };

  // 3D Perspective Tilt Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || prefersReducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Max tilt: 3 degrees for extremely subtle, premium micro-interaction
    const maxTilt = 3;
    const tiltX = -(mouseY / (rect.height / 2)) * maxTilt;
    const tiltY = (mouseX / (rect.width / 2)) * maxTilt;

    setRotateX(tiltX);
    setRotateY(tiltY);
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setRotateX(0);
    setRotateY(0);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem 2rem',
        position: 'relative',
        perspective: '1200px',
        perspectiveOrigin: 'center center'
      }}
    >
      {/* Environmental Gradient Spotlight - Follows Mouse for Depth */}
      <motion.div
        animate={{
          background: `radial-gradient(
            600px circle at ${50 + (mousePosition.x / 10)}% ${50 + (mousePosition.y / 10)}%,
            rgba(74, 144, 226, 0.15),
            rgba(80, 200, 120, 0.10) 40%,
            transparent 70%
          )`
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        style={{
          position: 'absolute',
          inset: '-200px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6
        }}
      />

      {/* iPhone 14 Pro Mockup Frame - 3D Interactive */}
      <motion.div
        animate={{
          rotateX,
          rotateY,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.3
          }
        }}
        style={{
          width: '393px',
          height: '852px',
          backgroundColor: '#1a1a1a',
          borderRadius: '60px',
          padding: '14px',
          // Premium 6-layer shadow system for 3D floating effect
          boxShadow: `
            0 50px 100px rgba(0, 0, 0, 0.30),
            0 30px 60px rgba(0, 0, 0, 0.25),
            0 20px 40px rgba(0, 0, 0, 0.20),
            0 10px 20px rgba(0, 0, 0, 0.15),
            0 5px 10px rgba(0, 0, 0, 0.10),
            0 2px 4px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.1)
          `,
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Screen Container */}
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: IOS_COLORS.groupedBackground,
          borderRadius: '48px',
          overflow: 'hidden',
          position: 'relative',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          maskImage: 'radial-gradient(white, black)'
        } as React.CSSProperties}>
          {/* Status Bar */}
          <div style={{
            height: '54px',
            background: `linear-gradient(180deg, ${IOS_GLASS.statusBar.background} 0%, rgba(242,242,247,0) 100%)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            paddingTop: '8px',
            backdropFilter: IOS_GLASS.statusBar.backdropFilter
          }}>
            <div style={{ fontSize: '15px', fontWeight: '600', color: IOS_COLORS.label }}>
              9:41
            </div>
            {/* Dynamic Island */}
            <div style={{
              width: '126px',
              height: '37px',
              backgroundColor: 'black',
              borderRadius: '20px',
              position: 'absolute',
              top: '11px',
              left: '50%',
              transform: 'translateX(-50%)'
            }} />
            <div style={{ fontSize: '15px', color: IOS_COLORS.label, display: 'flex', gap: '6px' }}>
              <span>100%</span>
              <span>●</span>
            </div>
          </div>

          {/* Screen Content with Swipe & Pull-to-Refresh */}
          <motion.div
            ref={screenContainerRef}
            drag={activeScreen === 'home' ? 'y' : 'x'}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={activeScreen === 'home' ? { top: 0.3, bottom: 0 } : 0.2}
            onDrag={(_, info) => {
              if (activeScreen === 'home' && info.offset.y > 0) {
                setPullToRefresh(Math.min(info.offset.y, 100));
              }
            }}
            onDragEnd={activeScreen === 'home' ? handlePullDragEnd : handleDragEnd}
            style={{
              position: 'absolute',
              inset: '54px 0 0 0',
              overflow: 'auto',
              overflowX: 'hidden',
              paddingBottom: '90px',
              paddingLeft: '4px',
              paddingRight: '4px',
              cursor: 'grab',
              WebkitOverflowScrolling: 'touch'
            } as React.CSSProperties}
          >
            {/* Pull-to-Refresh Indicator */}
            {activeScreen === 'home' && pullToRefresh > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: pullToRefresh / 100 }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10
                }}
              >
                <motion.div
                  animate={{
                    rotate: isRefreshing ? 360 : 0
                  }}
                  transition={{
                    duration: 1,
                    repeat: isRefreshing ? Infinity : 0,
                    ease: 'linear'
                  }}
                >
                  <Sparkles size={24} color={IOS_COLORS.systemBlue} />
                </motion.div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {activeScreen === 'home' && (
                <HomeScreen
                  setActiveScreen={setActiveScreen}
                  streak={streak}
                  prefersReducedMotion={prefersReducedMotion}
                />
              )}
              {activeScreen === 'photo' && (
                <PhotoScreen
                  setActiveScreen={setActiveScreen}
                  photoOpacity={photoOpacity}
                  setPhotoOpacity={setPhotoOpacity}
                  onCapture={handleCapture}
                  isCapturing={isCapturing}
                  isProcessing={isProcessing}
                />
              )}
              {activeScreen === 'pasi' && (
                <PasiResultScreen
                  setActiveScreen={setActiveScreen}
                  compareSlider={compareSlider}
                  setCompareSlider={setCompareSlider}
                />
              )}
              {activeScreen === 'meds' && (
                <MedicationScreen
                  setActiveScreen={setActiveScreen}
                  medicationChecked={medicationChecked}
                  onCheck={handleMedicationCheck}
                  streak={streak}
                  prefersReducedMotion={prefersReducedMotion}
                />
              )}
              {activeScreen === 'mental' && <MentalHealthScreen setActiveScreen={setActiveScreen} />}
              {activeScreen === 'triggers' && <TriggerScreen setActiveScreen={setActiveScreen} />}
              {activeScreen === 'report' && <ReportScreen setActiveScreen={setActiveScreen} />}
              {activeScreen === 'settings' && <SettingsScreen setActiveScreen={setActiveScreen} />}
            </AnimatePresence>
          </motion.div>

          {/* Confetti Layer */}
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 200
          }}>
            <AnimatePresence>
              {confetti.map((particle, i) => {
                // Realistic physics with gravity
                const gravity = 800; // Pixels per second squared
                const airResistance = 0.98;
                const finalX = particle.x + particle.velocity.x * 120 * airResistance;
                const finalY = particle.y + particle.velocity.y * 60 + gravity; // Gravity pulls down

                // Vary particle size for depth perception
                const size = 6 + Math.random() * 6; // 6-12px
                const isRounded = i % 3 === 0; // Mix of circles and squares

                return (
                  <motion.div
                    key={particle.id}
                    initial={{
                      x: particle.x,
                      y: particle.y,
                      opacity: 1,
                      scale: 1,
                      rotate: particle.rotation
                    }}
                    animate={{
                      x: finalX,
                      y: finalY,
                      opacity: 0,
                      scale: 0.3,
                      rotate: particle.rotation + (Math.random() > 0.5 ? 720 : -720) // Double spin
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2, // Longer celebration
                      ease: [0.25, 0.46, 0.45, 0.94] // Realistic easing with gravity
                    }}
                    style={{
                      position: 'absolute',
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: particle.color,
                      borderRadius: isRounded ? '50%' : '2px',
                      boxShadow: `0 0 ${size}px ${particle.color}40` // Subtle glow
                    }}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {/* Tab Bar */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '90px',
            backgroundColor: IOS_GLASS.tabBar.background,
            backdropFilter: IOS_GLASS.tabBar.backdropFilter,
            borderTop: `0.5px solid ${IOS_COLORS.separator}`,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            padding: '12px 0 24px'
          }}>
            <TabBarItem
              icon={Home}
              label="Home"
              active={activeScreen === 'home'}
              onClick={() => setActiveScreen('home')}
            />
            <TabBarItem
              icon={Camera}
              label="Track"
              active={activeScreen === 'photo'}
              onClick={() => setActiveScreen('photo')}
            />
            <TabBarItem
              icon={Activity}
              label="Insights"
              active={activeScreen === 'triggers'}
              onClick={() => setActiveScreen('triggers')}
            />
            <TabBarItem
              icon={Settings}
              label="More"
              active={activeScreen === 'settings'}
              onClick={() => setActiveScreen('settings')}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Screen Components

function HomeScreen({
  setActiveScreen,
  streak,
  prefersReducedMotion
}: {
  setActiveScreen: (s: Screen) => void;
  streak: number;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
      transition={prefersReducedMotion ? { duration: 0.2 } : SPRING_CONFIG.screen}
      style={{
        padding: '16px 16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif'
      }}
    >
      {/* Header with Gradient Text (Portfolio-Grade) */}
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{
          fontSize: `${IOS_TYPOGRAPHY.largeTitle.size}px`,
          fontWeight: IOS_TYPOGRAPHY.largeTitle.weight,
          background: BRAND_COLORS.primaryGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '2px',
          letterSpacing: `${IOS_TYPOGRAPHY.largeTitle.tracking}px`,
          lineHeight: `${IOS_TYPOGRAPHY.largeTitle.lineHeight}px`,
          textShadow: '0 2px 4px rgba(74,144,226,0.15)'
        } as React.CSSProperties}>
          Dashboard
        </h1>
        <p style={{
          fontSize: `${IOS_TYPOGRAPHY.body.size}px`,
          color: IOS_COLORS.secondaryLabel,
          lineHeight: `${IOS_TYPOGRAPHY.body.lineHeight}px`,
          letterSpacing: `${IOS_TYPOGRAPHY.body.tracking}px`
        }}>
          Welcome back, Alex 👋
        </p>
      </div>

      {/* PASI Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_CONFIG.card, delay: 0.1 }}
        style={{
          padding: '16px',
          borderRadius: '16px',
          background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
          borderLeft: `4px solid ${IOS_COLORS.systemBlue}`,
          border: IOS_GLASS.card.border,
          marginBottom: '12px',
          boxShadow: IOS_GLASS.card.boxShadow
        } as React.CSSProperties}>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
          color: IOS_COLORS.secondaryLabel,
          marginBottom: '4px',
          fontWeight: IOS_TYPOGRAPHY.footnote.weight,
          textTransform: 'uppercase',
          letterSpacing: `${IOS_TYPOGRAPHY.footnote.tracking}px`
        }}>
          Current PASI Score
        </div>
        <div style={{
          fontSize: '40px',
          fontWeight: '700',
          background: BRAND_COLORS.healingGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '8px',
          letterSpacing: '-1px',
          textShadow: '0 4px 8px rgba(80,200,120,0.2)'
        } as React.CSSProperties}>
          12.4
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <TrendingUp size={14} color={IOS_COLORS.systemGreen} />
          <span style={{
            fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
            color: IOS_COLORS.systemGreen,
            fontWeight: '600',
            letterSpacing: `${IOS_TYPOGRAPHY.subheadline.tracking}px`
          }}>
            ↓ 18% from last month
          </span>
        </div>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
          color: IOS_COLORS.secondaryLabel,
          lineHeight: `${IOS_TYPOGRAPHY.footnote.lineHeight}px`,
          marginBottom: '12px',
          fontStyle: 'italic'
        }}>
          Your skin is improving! Keep it up 🌟
        </div>
        {/* Mini Chart with Gradient Bars & Glow (Portfolio-Grade) */}
        <div style={{ height: '48px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
          {[65, 55, 58, 52, 48, 45, 42].map((height, i) => {
            // Color gradient based on severity (high=red, medium=yellow, low=green)
            const getBarColor = (value: number) => {
              if (value > 55) return { main: '#FF6B6B', glow: 'rgba(255,107,107,0.4)' }; // Red (flareup)
              if (value > 45) return { main: '#FBD24C', glow: 'rgba(251,210,76,0.4)' }; // Yellow (moderate)
              return { main: '#50C878', glow: 'rgba(80,200,120,0.4)' }; // Green (healing)
            };

            const colors = getBarColor(height);
            const isLastBar = i === 6; // Highlight current value

            return (
              <motion.div
                key={i}
                initial={{ height: 0, opacity: 0, scaleY: 0 }}
                animate={{
                  height: `${height}%`,
                  opacity: 1,
                  scaleY: 1
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.3, delay: i * 0.05 }
                    : {
                        ...SPRING_CONFIG.elastic,
                        delay: 0.2 + i * 0.08
                      }
                }
                style={{
                  flex: 1,
                  background: isLastBar
                    ? `linear-gradient(180deg, ${colors.main} 0%, ${colors.main}DD 100%)`
                    : colors.main,
                  borderRadius: '4px 4px 0 0',
                  transformOrigin: 'bottom',
                  boxShadow: isLastBar
                    ? `0 0 12px ${colors.glow}, 0 -2px 8px ${colors.glow}`
                    : 'none',
                  position: 'relative'
                }}
              >
                {isLastBar && (
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'rgba(255,255,255,0.8)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{
          fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
          fontWeight: IOS_TYPOGRAPHY.headline.weight,
          color: IOS_COLORS.label,
          marginBottom: '12px',
          letterSpacing: `${IOS_TYPOGRAPHY.headline.tracking}px`
        }}>
          Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          <QuickActionButton
            icon={Camera}
            label="Photo"
            color={IOS_COLORS.systemBlue}
            onClick={() => setActiveScreen('photo')}
          />
          <QuickActionButton
            icon={Check}
            label="Meds"
            color={IOS_COLORS.systemGreen}
            onClick={() => setActiveScreen('meds')}
          />
          <QuickActionButton
            icon={Heart}
            label="Check-in"
            color={IOS_COLORS.systemPink}
            onClick={() => setActiveScreen('mental')}
          />
        </div>
      </div>

      {/* Streak Card */}
      <div style={{
        padding: '16px',
        borderRadius: '16px',
        background: IOS_GLASS.card.background,
        backdropFilter: IOS_GLASS.card.backdropFilter,
        borderLeft: `4px solid ${IOS_COLORS.systemGreen}`,
        border: IOS_GLASS.card.border,
        marginBottom: '12px',
        boxShadow: IOS_GLASS.card.boxShadow
      } as React.CSSProperties}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
              color: IOS_COLORS.secondaryLabel,
              marginBottom: '2px'
            }}>
              Current Streak
            </div>
            <div style={{
              fontSize: `${IOS_TYPOGRAPHY.title1.size}px`,
              fontWeight: '700',
              color: IOS_COLORS.systemGreen
            }}>
              {streak} days
            </div>
          </div>
          <Award size={40} color={IOS_COLORS.systemGreen} />
        </div>
        <div style={{
          marginTop: '8px',
          fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
          color: IOS_COLORS.secondaryLabel,
          lineHeight: `${IOS_TYPOGRAPHY.footnote.lineHeight}px`,
          fontStyle: 'italic'
        }}>
          You're doing amazing! Just 16 days until your 30-day milestone 🎉
        </div>
      </div>

      {/* Upcoming Appointment */}
      <div style={{
        padding: '16px',
        borderRadius: '16px',
        background: IOS_GLASS.card.background,
        backdropFilter: IOS_GLASS.card.backdropFilter,
        borderLeft: `4px solid ${IOS_COLORS.systemYellow}`,
        border: IOS_GLASS.card.border,
        boxShadow: IOS_GLASS.card.boxShadow
      } as React.CSSProperties}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Calendar size={18} color={IOS_COLORS.systemYellow} />
          <span style={{
            fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
            fontWeight: IOS_TYPOGRAPHY.headline.weight,
            color: IOS_COLORS.label,
            letterSpacing: `${IOS_TYPOGRAPHY.headline.tracking}px`
          }}>
            Upcoming Appointment
          </span>
        </div>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
          color: IOS_COLORS.secondaryLabel,
          lineHeight: `${IOS_TYPOGRAPHY.subheadline.lineHeight}px`,
          marginBottom: '12px'
        }}>
          Dr. Sarah Johnson • Friday, Oct 25 at 2:30 PM
        </div>
        <button
          onClick={() => setActiveScreen('report')}
          style={{
            padding: '8px 14px',
            borderRadius: '10px',
            backgroundColor: IOS_COLORS.systemYellow,
            border: 'none',
            color: IOS_COLORS.systemBackground,
            fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: IOS_SHADOWS.button
          }}
        >
          Prepare Report →
        </button>
      </div>
    </motion.div>
  );
}

function PhotoScreen({
  setActiveScreen,
  photoOpacity,
  setPhotoOpacity,
  onCapture,
  isCapturing,
  isProcessing
}: {
  setActiveScreen: (s: Screen) => void;
  photoOpacity: number;
  setPhotoOpacity: (n: number) => void;
  onCapture: () => void;
  isCapturing: boolean;
  isProcessing: boolean;
}) {
  return (
    <motion.div
      key="photo"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={SPRING_CONFIG.screen}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: IOS_COLORS.groupedBackground,
        borderBottom: `1px solid ${IOS_COLORS.separator}`
      }}>
        <BackButton onClick={() => setActiveScreen('home')} />
        <h2 style={{
          fontSize: `${IOS_TYPOGRAPHY.title3.size}px`,
          fontWeight: IOS_TYPOGRAPHY.title3.weight,
          color: IOS_COLORS.label,
          letterSpacing: `${IOS_TYPOGRAPHY.title3.tracking}px`,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
        }}>
          Photo Tracking
        </h2>
      </div>

      {/* Camera View */}
      <div style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#000',
        overflow: 'hidden'
      }}>
        {isProcessing ? (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 50
          }}>
            {/* Shimmer Loading */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.3), rgba(168, 85, 247, 0.3))',
                boxShadow: '0 0 40px rgba(74, 144, 226, 0.4)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={32} color={IOS_COLORS.systemBlue} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}
            >
              Analyzing Photo...
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}
            >
              AI PASI scoring in progress
            </motion.div>

            {/* Progress Shimmer Bar */}
            <div style={{
              width: '200px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <motion.div
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  position: 'absolute',
                  width: '50%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgb(74, 144, 226), transparent)',
                  borderRadius: '2px'
                }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Ghost Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(236, 72, 153, 0.2))',
              opacity: photoOpacity / 100
            }}>
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '30%',
                width: '140px',
                height: '100px',
                borderRadius: '40% 60% 50% 50%',
                backgroundColor: 'rgba(255, 200, 200, 0.5)',
                filter: 'blur(6px)'
              }} />
            </div>

            {/* Current View */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.div
                animate={{
                  scale: isCapturing ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '140px',
                  height: '100px',
                  borderRadius: '40% 60% 50% 50%',
                  backgroundColor: 'rgba(255, 180, 180, 0.7)',
                  filter: 'blur(3px)'
                }}
              />
            </div>

            {/* 3x3 Grid */}
            <div style={{
              position: 'absolute',
              inset: '10%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              gap: '1px'
            }}>
              {[...Array(9)].map((_, i) => (
                <div key={i} style={{
                  border: '1px dashed rgba(74, 144, 226, 0.4)'
                }} />
              ))}
            </div>

            {/* Opacity Control with Haptic Notches */}
            <div style={{
              position: 'absolute',
              bottom: '120px',
              left: '20px',
              right: '20px',
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.8)'
              }}>
                <span>Ghost Opacity</span>
                <span style={{ fontWeight: '600', color: 'white' }}>{photoOpacity}%</span>
              </div>

              {/* Custom Slider with Notches */}
              <div style={{ position: 'relative' }}>
                {/* Notch Markers (25%, 50%, 75%) */}
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '0',
                  right: '0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 calc((80% - 20%) / 60 * 5)',
                  pointerEvents: 'none'
                }}>
                  {[25, 50, 75].map(val => (
                    <div
                      key={val}
                      style={{
                        width: '2px',
                        height: '12px',
                        backgroundColor: Math.abs(photoOpacity - val) < 3
                          ? IOS_COLORS.systemBlue
                          : 'rgba(255,255,255,0.2)',
                        borderRadius: '1px',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  ))}
                </div>

                <input
                  type="range"
                  min="20"
                  max="80"
                  value={photoOpacity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const notches = [25, 50, 75];

                    // Magnetic snapping to nearest notch within 3%
                    const nearestNotch = notches.find(n => Math.abs(val - n) < 3);
                    setPhotoOpacity(nearestNotch || val);
                  }}
                  style={{
                    width: '100%',
                    height: '4px',
                    marginTop: '8px',
                    accentColor: IOS_COLORS.systemBlue,
                    cursor: 'grab'
                  }}
                />
              </div>
            </div>

            {/* Capture Button */}
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onCapture}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  border: `4px solid ${IOS_COLORS.systemBlue}80`,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function PasiResultScreen({
  setActiveScreen,
  compareSlider,
  setCompareSlider
}: {
  setActiveScreen: (s: Screen) => void;
  compareSlider: number;
  setCompareSlider: (n: number) => void;
}) {
  return (
    <motion.div
      key="pasi"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '16px 16px 24px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <BackButton onClick={() => setActiveScreen('home')} />
        <h2 style={{
          fontSize: `${IOS_TYPOGRAPHY.title3.size}px`,
          fontWeight: IOS_TYPOGRAPHY.title3.weight,
          color: IOS_COLORS.label,
          letterSpacing: `${IOS_TYPOGRAPHY.title3.tracking}px`
        }}>
          PASI Results
        </h2>
      </div>

      {/* Overall Score */}
      <div style={{
        padding: '16px',
        borderRadius: '16px',
        background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
        borderLeft: `4px solid ${IOS_COLORS.systemGreen}`,
        marginBottom: '12px',
        textAlign: 'center',
        boxShadow: IOS_GLASS.card.boxShadow
      }}>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
          color: IOS_COLORS.secondaryLabel,
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: `${IOS_TYPOGRAPHY.footnote.tracking}px`
        }}>
          Overall PASI Score
        </div>
        <div style={{
          fontSize: '48px',
          fontWeight: '700',
          color: IOS_COLORS.systemGreen,
          marginBottom: '4px'
        }}>
          12.4
        </div>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
          color: IOS_COLORS.secondaryLabel
        }}>
          Moderate Severity
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{
          fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
          fontWeight: IOS_TYPOGRAPHY.headline.weight,
          color: IOS_COLORS.label,
          marginBottom: '12px',
          letterSpacing: `${IOS_TYPOGRAPHY.headline.tracking}px`
        }}>
          Breakdown
        </h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {[
            { label: 'Erythema (Redness)', value: 2.8, color: IOS_COLORS.systemRed },
            { label: 'Scaling', value: 3.1, color: IOS_COLORS.systemYellow },
            { label: 'Thickness', value: 2.5, color: IOS_COLORS.systemPurple },
            { label: 'Area Affected', value: 18, color: IOS_COLORS.systemBlue, suffix: '%' }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '12px',
              borderRadius: '12px',
              background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
              border: IOS_GLASS.card.border,
              boxShadow: IOS_GLASS.card.boxShadow
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{
                  fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
                  color: IOS_COLORS.label
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
                  fontWeight: '600',
                  color: item.color
                }}>
                  {item.value}{item.suffix || '/4.0'}
                </span>
              </div>
              <div style={{
                height: '4px',
                borderRadius: '2px',
                backgroundColor: IOS_COLORS.quaternarySystemFill,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${item.suffix ? item.value : (item.value / 4) * 100}%`,
                  height: '100%',
                  backgroundColor: item.color
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After Comparison */}
      <div style={{
        padding: '16px',
        borderRadius: '16px',
        background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
        border: IOS_GLASS.card.border,
        boxShadow: IOS_GLASS.card.boxShadow
      }}>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
          fontWeight: '600',
          color: IOS_COLORS.label,
          marginBottom: '12px'
        }}>
          Compare: {compareSlider < 50 ? 'Before' : 'After'}
        </div>
        <div style={{
          height: '160px',
          borderRadius: '12px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          {/* Before Image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(236, 72, 153, 0.3))'
          }} />
          {/* After Image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(80, 200, 120, 0.3), rgba(74, 144, 226, 0.3))',
            clipPath: `inset(0 ${100 - compareSlider}% 0 0)`
          }} />
          {/* Slider Line */}
          <div style={{
            position: 'absolute',
            left: `${compareSlider}%`,
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(255,255,255,0.5)'
          }} />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={compareSlider}
          onChange={(e) => {
            const val = Number(e.target.value);
            // Magnetic snapping to 50% (center)
            if (Math.abs(val - 50) < 5) {
              setCompareSlider(50);
            } else {
              setCompareSlider(val);
            }
          }}
          style={{
            width: '100%',
            accentColor: IOS_COLORS.systemBlue,
            cursor: 'grab'
          }}
        />
      </div>
    </motion.div>
  );
}

function MedicationScreen({
  setActiveScreen,
  medicationChecked,
  onCheck,
  streak,
  prefersReducedMotion
}: {
  setActiveScreen: (s: Screen) => void;
  medicationChecked: boolean[];
  onCheck: (i: number, e: React.MouseEvent) => void;
  streak: number;
  prefersReducedMotion: boolean;
}) {
  return (
    <motion.div
      key="meds"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={SPRING_CONFIG.screen}
      style={{ padding: '16px 16px 24px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <BackButton onClick={() => setActiveScreen('home')} />
        <h2 style={{
          fontSize: `${IOS_TYPOGRAPHY.title3.size}px`,
          fontWeight: IOS_TYPOGRAPHY.title3.weight,
          color: IOS_COLORS.label,
          letterSpacing: `${IOS_TYPOGRAPHY.title3.tracking}px`
        }}>
          Medications
        </h2>
      </div>

      {/* Streak Card */}
      <div style={{
        padding: '16px',
        borderRadius: '16px',
        background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
        borderLeft: `4px solid ${IOS_COLORS.systemGreen}`,
        marginBottom: '16px',
        textAlign: 'center',
        boxShadow: IOS_GLASS.card.boxShadow
      }}>
        <Award size={40} color={IOS_COLORS.systemGreen} style={{ margin: '0 auto 12px' }} />
        <div style={{
          fontSize: '36px',
          fontWeight: '700',
          color: IOS_COLORS.systemGreen,
          marginBottom: '4px'
        }}>
          {streak} Days
        </div>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
          color: IOS_COLORS.secondaryLabel
        }}>
          Current Streak
        </div>
        <div style={{
          marginTop: '12px',
          padding: '8px',
          borderRadius: '8px',
          backgroundColor: IOS_COLORS.quaternarySystemFill,
          fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
          color: IOS_COLORS.label
        }}>
          🎉 Next milestone: 30 days (16 days to go!)
        </div>
      </div>

      {/* Today's Schedule */}
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{
          fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
          fontWeight: IOS_TYPOGRAPHY.headline.weight,
          color: IOS_COLORS.label,
          marginBottom: '12px',
          letterSpacing: `${IOS_TYPOGRAPHY.headline.tracking}px`
        }}>
          Today's Schedule
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {[
            { time: '8:30 AM', name: 'Clobetasol Cream', area: 'Elbows & Knees', index: 0 },
            { time: '12:00 PM', name: 'Vitamin D Supplement', area: '1 capsule', index: 1 },
            { time: '9:00 PM', name: 'Clobetasol Cream', area: 'Elbows & Knees', index: 2 }
          ].map((med, i) => (
            <motion.div
              key={i}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              style={{
                padding: '14px',
                borderRadius: '14px',
                background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
                borderLeft: medicationChecked[med.index]
                  ? `4px solid ${IOS_COLORS.systemGreen}`
                  : `4px solid ${IOS_COLORS.separator}`,
                boxShadow: IOS_GLASS.card.boxShadow,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer'
              }}
              onClick={(e) => onCheck(med.index, e)}
            >
              <motion.div
                animate={{
                  scale: medicationChecked[med.index] ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${medicationChecked[med.index] ? IOS_COLORS.systemGreen : IOS_COLORS.separator}`,
                  backgroundColor: medicationChecked[med.index] ? IOS_COLORS.systemGreen : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {medicationChecked[med.index] && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={prefersReducedMotion ? { duration: 0.2 } : SPRING_CONFIG.button}
                  >
                    <Check size={16} color="white" />
                  </motion.div>
                )}
              </motion.div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
                  fontWeight: '600',
                  color: IOS_COLORS.label,
                  marginBottom: '2px'
                }}>
                  {med.name}
                </div>
                <div style={{
                  fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
                  color: IOS_COLORS.secondaryLabel
                }}>
                  {med.time} • {med.area}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Calendar Heatmap with Realistic Patterns (Portfolio-Grade) */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '12px' }}>
          Last 4 Weeks
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {[...Array(28)].map((_, i) => {
            const dayOfWeek = i % 7;
            const weekNumber = Math.floor(i / 7);
            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Sat, Sun

            // Realistic adherence pattern:
            // - Weekdays: 85-100% (better adherence)
            // - Weekends: 70-90% (slightly lower)
            // - Gradual improvement over 4 weeks
            // - Occasional missed days (1-2 per week)
            const improvementFactor = weekNumber * 0.05; // Each week gets 5% better
            const randomMiss = Math.random() > 0.85; // 15% chance of missed day

            let adherence;
            if (randomMiss) {
              adherence = 0; // Missed day
            } else if (isWeekend) {
              adherence = 0.70 + Math.random() * 0.20 + improvementFactor; // 70-90% + improvement
            } else {
              adherence = 0.85 + Math.random() * 0.15 + improvementFactor; // 85-100% + improvement
            }

            // Clamp to 0-1
            adherence = Math.min(1, Math.max(0, adherence));

            // Smooth color gradient: gray → light green → dark green
            const getColor = (value: number) => {
              if (value === 0) return 'rgba(255,255,255,0.08)'; // Missed (gray)
              if (value < 0.5) return `rgba(80, 200, 120, ${0.2 + value * 0.3})`; // Light green
              return `rgba(80, 200, 120, ${0.5 + value * 0.4})`; // Dark green
            };

            // Highlight current week
            const isCurrentWeek = weekNumber === 3;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (weekNumber * 7 + dayOfWeek) * 0.02, // Row-by-row reveal
                  duration: 0.3,
                  ease: 'easeOut'
                }}
                style={{
                  aspectRatio: '1',
                  borderRadius: '4px',
                  backgroundColor: getColor(adherence),
                  border: isCurrentWeek ? '1px solid rgba(80, 200, 120, 0.5)' : 'none',
                  boxShadow: adherence > 0.9 ? '0 0 8px rgba(80, 200, 120, 0.3)' : 'none'
                }}
              />
            );
          })}
        </div>
        <div style={{
          marginTop: '8px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          89% adherence rate • Your consistency is inspiring! 💚
        </div>
      </div>
    </motion.div>
  );
}

function MentalHealthScreen({ setActiveScreen }: { setActiveScreen: (s: Screen) => void }) {
  const [hasRecentCheckIn] = useState(false); // Empty state demo

  return (
    <motion.div
      key="mental"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={SPRING_CONFIG.screen}
      style={{ padding: '16px 16px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <BackButton onClick={() => setActiveScreen('home')} />
        <h2 style={{
          fontSize: `${IOS_TYPOGRAPHY.title3.size}px`,
          fontWeight: IOS_TYPOGRAPHY.title3.weight,
          color: IOS_COLORS.label,
          letterSpacing: `${IOS_TYPOGRAPHY.title3.tracking}px`
        }}>
          Wellness Check-in
        </h2>
      </div>

      <div style={{
        padding: '16px',
        borderRadius: '16px',
        background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
        borderLeft: `4px solid ${IOS_COLORS.systemPink}`,
        marginBottom: '16px',
        textAlign: 'center',
        boxShadow: IOS_GLASS.card.boxShadow
      }}>
        <Heart size={32} color={IOS_COLORS.systemPink} style={{ margin: '0 auto 12px' }} />
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
          fontWeight: IOS_TYPOGRAPHY.headline.weight,
          color: IOS_COLORS.label,
          marginBottom: '6px',
          letterSpacing: `${IOS_TYPOGRAPHY.headline.tracking}px`
        }}>
          PHQ-9 Depression Screening
        </div>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
          color: IOS_COLORS.secondaryLabel,
          lineHeight: `${IOS_TYPOGRAPHY.subheadline.lineHeight}px`
        }}>
          Quick 9-question assessment to track your mental health. All responses are private.
        </div>
      </div>

      {!hasRecentCheckIn ? (
        // Empty State
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: '40px 20px',
            borderRadius: '16px',
            background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
            border: IOS_GLASS.card.border,
            textAlign: 'center',
            boxShadow: IOS_GLASS.card.boxShadow
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Heart size={56} color={IOS_COLORS.systemPink} style={{ margin: '0 auto 16px', opacity: 0.6 }} />
          </motion.div>

          <h3 style={{
            fontSize: `${IOS_TYPOGRAPHY.title3.size}px`,
            fontWeight: IOS_TYPOGRAPHY.title3.weight,
            color: IOS_COLORS.label,
            marginBottom: '8px',
            letterSpacing: `${IOS_TYPOGRAPHY.title3.tracking}px`
          }}>
            No Check-ins Yet
          </h3>
          <p style={{
            fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
            color: IOS_COLORS.secondaryLabel,
            lineHeight: `${IOS_TYPOGRAPHY.subheadline.lineHeight}px`,
            marginBottom: '20px'
          }}>
            Start your first wellness check-in to track your mental health over time.
          </p>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              backgroundColor: IOS_COLORS.systemPink,
              border: 'none',
              color: 'white',
              fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: IOS_SHADOWS.button
            }}
          >
            Begin Check-in
          </motion.button>
        </motion.div>
      ) : (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            padding: '16px',
            borderRadius: '16px',
            background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
            border: IOS_GLASS.card.border,
            marginBottom: '12px',
            boxShadow: IOS_GLASS.card.boxShadow
          }}>
            <div style={{
              fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
              color: IOS_COLORS.label,
              marginBottom: '12px',
              lineHeight: `${IOS_TYPOGRAPHY.subheadline.lineHeight}px`
            }}>
              Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {['Not at all', 'Several days', 'More than half', 'Nearly every day'].map((option) => (
                <div key={option} style={{
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: IOS_COLORS.tertiarySystemFill,
                  border: IOS_GLASS.card.border,
                  fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
                  color: IOS_COLORS.label,
                  cursor: 'pointer'
                }}>
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div style={{
            padding: '12px',
            borderRadius: '12px',
            background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
            borderLeft: `4px solid ${IOS_COLORS.systemBlue}`,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            boxShadow: IOS_GLASS.card.boxShadow
          }}>
            <Info size={18} color={IOS_COLORS.systemBlue} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{
              fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
              color: IOS_COLORS.secondaryLabel,
              lineHeight: `${IOS_TYPOGRAPHY.footnote.lineHeight}px`
            }}>
              Your responses help identify if you may benefit from additional support. Results are shared only with your permission.
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function TriggerScreen({ setActiveScreen }: { setActiveScreen: (s: Screen) => void }) {
  return (
    <motion.div
      key="triggers"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={SPRING_CONFIG.screen}
      style={{ padding: '16px 20px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveScreen('home')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
          Trigger Insights
        </h2>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
          fontWeight: '600',
          color: IOS_COLORS.secondaryLabel,
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Likely Triggers
        </h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {[
            { trigger: 'High Stress', confidence: 87, color: IOS_COLORS.systemRed },
            { trigger: 'Cold Weather', confidence: 76, color: IOS_COLORS.systemBlue },
            { trigger: 'Missed Applications', confidence: 64, color: IOS_COLORS.systemYellow }
          ].map((item, i) => (
            <div key={i} style={{
              padding: '12px',
              borderRadius: '14px',
              background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
              border: IOS_GLASS.card.border,
              boxShadow: IOS_GLASS.card.boxShadow
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{
                  fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
                  fontWeight: '600',
                  color: IOS_COLORS.label
                }}>
                  {item.trigger}
                </span>
                <span style={{
                  fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
                  fontWeight: '600',
                  color: item.color
                }}>
                  {item.confidence}%
                </span>
              </div>
              <div style={{
                height: '6px',
                borderRadius: '3px',
                backgroundColor: IOS_COLORS.quaternarySystemFill,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${item.confidence}%`,
                  height: '100%',
                  backgroundColor: item.color
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '16px',
        borderRadius: '16px',
        background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
        borderLeft: `4px solid ${IOS_COLORS.systemPurple}`,
        boxShadow: IOS_GLASS.card.boxShadow
      }}>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
          fontWeight: '600',
          color: IOS_COLORS.label,
          marginBottom: '12px'
        }}>
          Correlation Chart
        </div>
        <div style={{
          height: '180px',
          borderRadius: '12px',
          backgroundColor: IOS_COLORS.tertiarySystemFill,
          position: 'relative',
          padding: '20px'
        }}>
          {/* Simple scatter plot visualization */}
          <div style={{ position: 'relative', height: '100%' }}>
            {[...Array(20)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${Math.random() * 90}%`,
                bottom: `${Math.random() * 90}%`,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: IOS_COLORS.systemPurple,
                opacity: 0.6
              }} />
            ))}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '20px',
            right: '20px',
            height: '1px',
            backgroundColor: IOS_COLORS.separator
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '20px',
            top: '20px',
            width: '1px',
            backgroundColor: IOS_COLORS.separator
          }} />
        </div>
        <div style={{
          marginTop: '12px',
          fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
          color: IOS_COLORS.secondaryLabel,
          textAlign: 'center'
        }}>
          Stress Level vs PASI Score (r = 0.72, p &lt; 0.001)
        </div>
      </div>
    </motion.div>
  );
}

function ReportScreen({ setActiveScreen }: { setActiveScreen: (s: Screen) => void }) {
  return (
    <motion.div
      key="report"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={SPRING_CONFIG.screen}
      style={{ padding: '16px 20px 24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveScreen('home')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
          Provider Report
        </h2>
      </div>

      <div style={{
        padding: '16px',
        borderRadius: '16px',
        background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
        borderLeft: `4px solid ${IOS_COLORS.systemBlue}`,
        boxShadow: IOS_GLASS.card.boxShadow,
        marginBottom: '20px'
      }}>
        <FileText size={40} color={IOS_COLORS.systemBlue} style={{ marginBottom: '12px' }} />
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
          fontWeight: '600',
          color: IOS_COLORS.label,
          marginBottom: '8px'
        }}>
          3-Month Summary Report
        </div>
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
          color: IOS_COLORS.secondaryLabel,
          marginBottom: '16px'
        }}>
          Ready to share with Dr. Sarah Johnson
        </div>
        <div style={{
          padding: '12px',
          borderRadius: '12px',
          backgroundColor: IOS_COLORS.tertiarySystemFill,
          fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
          color: IOS_COLORS.label,
          lineHeight: '1.6'
        }}>
          ✓ Photo progression (12 weeks)<br/>
          ✓ PASI trend chart<br/>
          ✓ Medication adherence (89%)<br/>
          ✓ Mental health screening<br/>
          ✓ Trigger analysis
        </div>
      </div>

      <div style={{
        height: '300px',
        borderRadius: '16px',
        background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
        border: IOS_GLASS.card.border,
        boxShadow: IOS_GLASS.card.boxShadow,
        padding: '16px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        {/* PDF Preview Mockup */}
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.caption1.size}px`,
          fontWeight: '600',
          color: IOS_COLORS.label,
          marginBottom: '12px',
          letterSpacing: '0.5px'
        }}>
          PSORIASIS PROGRESS REPORT
        </div>
        <div style={{
          height: '2px',
          backgroundColor: IOS_COLORS.systemBlue,
          opacity: 0.3,
          marginBottom: '12px'
        }} />
        <div style={{
          fontSize: `${IOS_TYPOGRAPHY.caption2.size}px`,
          color: IOS_COLORS.secondaryLabel,
          marginBottom: '16px'
        }}>
          Patient: Alex Thompson • Period: Jul 1 - Oct 1, 2024
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{
              aspectRatio: '1',
              borderRadius: '8px',
              backgroundColor: IOS_COLORS.tertiarySystemFill,
              border: `1px solid ${IOS_COLORS.separator}`
            }} />
          ))}
        </div>
        <div style={{
          height: '80px',
          borderRadius: '8px',
          backgroundColor: IOS_COLORS.tertiarySystemFill,
          border: IOS_GLASS.card.border,
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          gap: '8px'
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', height: '40px', gap: '2px' }}>
            {[70, 62, 58, 55, 50, 47, 45, 42].map((h, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${h}%`,
                backgroundColor: IOS_COLORS.systemBlue,
                opacity: 0.7,
                borderRadius: '2px 2px 0 0'
              }} />
            ))}
          </div>
        </div>
      </div>

      <button
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '14px',
          backgroundColor: IOS_COLORS.systemBlue,
          border: 'none',
          color: IOS_COLORS.systemBackground,
          fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '12px',
          boxShadow: IOS_SHADOWS.button
        }}
      >
        Email to Provider
      </button>

      <button
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '14px',
          backgroundColor: IOS_COLORS.tertiarySystemFill,
          border: IOS_GLASS.card.border,
          color: IOS_COLORS.systemBlue,
          fontSize: `${IOS_TYPOGRAPHY.headline.size}px`,
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: IOS_SHADOWS.button
        }}
      >
        Export PDF
      </button>
    </motion.div>
  );
}

function SettingsScreen({ setActiveScreen }: { setActiveScreen: (s: Screen) => void }) {
  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={SPRING_CONFIG.screen}
      style={{ padding: '16px 20px 24px' }}
    >
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          fontSize: `${IOS_TYPOGRAPHY.largeTitle.size}px`,
          fontWeight: IOS_TYPOGRAPHY.largeTitle.weight,
          color: IOS_COLORS.label,
          marginBottom: '4px',
          letterSpacing: `${IOS_TYPOGRAPHY.largeTitle.tracking}px`
        }}>
          Settings
        </h2>
        <p style={{
          fontSize: `${IOS_TYPOGRAPHY.subheadline.size}px`,
          color: IOS_COLORS.secondaryLabel
        }}>
          Manage your account and preferences
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <SettingsSection title="Account">
          <SettingsItem label="Profile" value="Alex Thompson" />
          <SettingsItem label="Email" value="alex@example.com" />
          <SettingsItem label="Phone" value="+1 (555) 123-4567" />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsItem label="Medication Reminders" value="On" />
          <SettingsItem label="Photo Reminders" value="Weekly" />
          <SettingsItem label="Provider Messages" value="On" />
        </SettingsSection>

        <SettingsSection title="Privacy & Data">
          <SettingsItem label="Data Sync" value="Enabled" />
          <SettingsItem label="Share with Provider" value="Automatic" />
          <SettingsItem label="Research Participation" value="Opt-in" />
        </SettingsSection>

        <SettingsSection title="About">
          <SettingsItem label="Version" value="1.0.0" />
          <SettingsItem label="Support" value="help@psoriassist.com" />
        </SettingsSection>
      </div>
    </motion.div>
  );
}

// Helper Components

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96, transition: SPRING_CONFIG.button }}
      whileHover={{ scale: 1.02, transition: SPRING_CONFIG.smooth }}
      style={{
        minWidth: '44px',
        minHeight: '44px',
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        backgroundColor: IOS_COLORS.tertiarySystemFill,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: IOS_SHADOWS.button
      }}
    >
      <ChevronLeft size={20} color={IOS_COLORS.systemBlue} />
    </motion.button>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
  color,
  onClick
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  color: string;
  onClick: () => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileTap={{
        scale: 0.96,
        transition: SPRING_CONFIG.button
      }}
      onClick={onClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '12px 8px',
        minHeight: '76px',
        borderRadius: '14px',
        background: isHovered ? IOS_COLORS.tertiarySystemFill : IOS_GLASS.cardSubtle.background,
        backdropFilter: IOS_GLASS.cardSubtle.backdropFilter,
        border: IOS_GLASS.cardSubtle.border,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        cursor: 'pointer',
        boxShadow: isFocused
          ? `${IOS_GLASS.cardSubtle.boxShadow}, 0 0 0 3px ${color}40`
          : IOS_GLASS.cardSubtle.boxShadow,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
        outline: 'none',
        transition: 'background 0.2s ease, box-shadow 0.2s ease'
      } as React.CSSProperties}
    >
      <Icon size={20} color={color} />
      <span style={{
        fontSize: `${IOS_TYPOGRAPHY.caption1.size}px`,
        fontWeight: '600',
        color: IOS_COLORS.label,
        letterSpacing: `${IOS_TYPOGRAPHY.caption1.tracking}px`
      }}>
        {label}
      </span>
    </motion.button>
  );
}

function TabBarItem({
  icon: Icon,
  label,
  active,
  onClick
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <button
      onClick={onClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        minWidth: '60px',
        borderRadius: '12px',
        outline: 'none',
        boxShadow: isFocused ? `0 0 0 2px ${IOS_COLORS.systemBlue}99` : 'none',
        transition: 'box-shadow 0.2s ease'
      }}
    >
      <Icon
        size={24}
        color={active ? IOS_COLORS.systemBlue : IOS_COLORS.secondaryLabel}
      />
      <span style={{
        fontSize: `${IOS_TYPOGRAPHY.caption2.size}px`,
        fontWeight: active ? '600' : '400',
        color: active ? IOS_COLORS.systemBlue : IOS_COLORS.secondaryLabel,
        letterSpacing: `${IOS_TYPOGRAPHY.caption2.tracking}px`
      }}>
        {label}
      </span>
    </button>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{
        fontSize: `${IOS_TYPOGRAPHY.footnote.size}px`,
        fontWeight: '600',
        color: IOS_COLORS.tertiaryLabel,
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {title}
      </h3>
      <div style={{
        borderRadius: '14px',
        background: IOS_GLASS.card.background,
          backdropFilter: IOS_GLASS.card.backdropFilter,
        border: IOS_GLASS.card.border,
        boxShadow: IOS_GLASS.card.boxShadow,
        overflow: 'hidden'
      }}>
        {children}
      </div>
    </div>
  );
}

function SettingsItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      padding: '14px 16px',
      borderBottom: `1px solid ${IOS_COLORS.separator}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{
        fontSize: `${IOS_TYPOGRAPHY.body.size}px`,
        color: IOS_COLORS.label
      }}>{label}</span>
      <span style={{
        fontSize: `${IOS_TYPOGRAPHY.body.size}px`,
        color: IOS_COLORS.secondaryLabel
      }}>{value}</span>
    </div>
  );
}
