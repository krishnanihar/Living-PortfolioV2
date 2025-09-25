'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const heroCardRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState('');
  const [currentIntro, setCurrentIntro] = useState('');
  const [glassPosition, setGlassPosition] = useState({ x: 0, y: 0 });
  const [showGlass, setShowGlass] = useState(false);

  // v1 cycling intro phrases
  const typingPhrases = [
    "I build living interfaces",
    "I reduce decision latency",
    "I craft design systems",
    "I visualize complex data",
    "I create with consciousness"
  ];

  // Initialize time-based greeting and cycling text (exactly like v1)
  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    let greetingText = '';
    if (hour < 6) greetingText = "Night owl detected.";
    else if (hour < 12) greetingText = "Good morning.";
    else if (hour < 18) greetingText = "Good afternoon.";
    else greetingText = "Good evening.";

    setGreeting(greetingText);
    setCurrentIntro(typingPhrases[0]);

    // Cycle through phrases every 3 seconds
    let currentIndex = 0;
    const cycleInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % typingPhrases.length;
      setCurrentIntro(typingPhrases[currentIndex]);
    }, 3000);

    return () => clearInterval(cycleInterval);
  }, []);

  // Full-screen 3D tilt effect (exactly like v1)
  useEffect(() => {
    const heroCard = heroCardRef.current;
    if (!heroCard || window.innerWidth <= 768) return;

    let rafId: number | null = null;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isActive = true;

    const animateTilt = () => {
      if (!isActive) return;

      const easing = 0.06;
      const deltaX = (targetX - currentX) * easing;
      const deltaY = (targetY - currentY) * easing;

      currentX += deltaX;
      currentY += deltaY;

      const rotX = Math.round(currentY * 100) / 100;
      const rotY = Math.round(currentX * 100) / 100;
      const scaleValue = 1 + Math.abs(currentX + currentY) * 0.001;

      heroCard.style.transform = `translate3d(0,0,20px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scaleValue})`;

      if (Math.abs(deltaX) > 0.0005 || Math.abs(deltaY) > 0.0005) {
        rafId = requestAnimationFrame(animateTilt);
      } else {
        rafId = null;
      }
    };

    // Full-screen mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const halfWidth = window.innerWidth * 0.5;
      const halfHeight = window.innerHeight * 0.5;

      const percentX = (e.clientX - halfWidth) / halfWidth;
      const percentY = (e.clientY - halfHeight) / halfHeight;

      targetX = Math.max(-10, Math.min(10, percentX * 6));
      targetY = Math.max(-6, Math.min(6, -percentY * 4));

      if (!rafId) {
        rafId = requestAnimationFrame(animateTilt);
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(animateTilt);
      }
    };

    // Pause/resume on visibility change
    const handleVisibilityChange = () => {
      isActive = !document.hidden;
      if (isActive && !rafId && (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01)) {
        rafId = requestAnimationFrame(animateTilt);
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isActive = false;
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Glass cursor effect (exactly like v1)
  useEffect(() => {
    // Skip on touch devices
    if (navigator.maxTouchPoints > 1 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;

    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;

    const animateCursor = () => {
      currentX += (glassPosition.x - currentX) * 0.15;
      currentY += (glassPosition.y - currentY) * 0.15;

      if (Math.abs(glassPosition.x - currentX) > 0.1 || Math.abs(glassPosition.y - currentY) > 0.1) {
        rafId = requestAnimationFrame(animateCursor);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setShowGlass(true);
      setGlassPosition({ x: e.clientX, y: e.clientY });

      if (!rafId) {
        rafId = requestAnimationFrame(animateCursor);
      }
    };

    const handleMouseLeave = () => {
      setShowGlass(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [glassPosition]);

  return (
    <>
      <section
        className={cn(
          // v1 hero structure
          'relative w-full min-h-screen',
          'grid place-items-center',
          'p-5 md:p-10 lg:p-20',
          'bg-transparent overflow-hidden',
          'z-[200]',
          // 3D setup
          'perspective-[1500px]',
          className
        )}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Hero Card - exactly like v1 */}
        <motion.div
          ref={heroCardRef}
          initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{
            duration: 1,
            ease: [0.34, 1.56, 0.64, 1], // v1 spring easing
          }}
          className={cn(
            // v1 hero-inner structure
            'relative w-full max-w-[680px] mx-auto',
            'p-6 md:p-10 lg:p-12',
            // v1 glassmorphism
            'bg-white/[0.01] border border-white/12',
            'rounded-3xl', // clamp(20px, 5vw, 32px) ≈ 24px
            '[data-theme="light"] &:bg-white/75 [data-theme="light"] &:border-black/6',
            // v1 shadow system
            'shadow-[0_2px_8px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.15),0_16px_32px_rgba(0,0,0,0.2),0_24px_48px_rgba(0,0,0,0.25)]',
            'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_-20px_40px_rgba(0,0,0,0.05)]',
            '[data-theme="light"] &:shadow-[0_2px_8px_rgba(0,0,0,0.03),0_8px_16px_rgba(0,0,0,0.04),0_16px_32px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.08)]',
            // 3D setup
            'z-[200]'
          )}
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            transition: 'transform 0.08s cubic-bezier(0.2, 0, 0.2, 1)',
            willChange: 'transform',
            backdropFilter: 'blur(12px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(12px) saturate(1.5)',
          }}
        >
          {/* Dynamic Title - exactly like v1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={cn(
              'mb-6 md:mb-8',
              'text-white [data-theme="light"] &:text-black/95'
            )}
          >
            {/* Time-based greeting */}
            <motion.span
              key="hero-greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'block text-xs md:text-sm font-light mb-2',
                'text-white/70 [data-theme="light"] &:text-black/70',
                'tracking-wider'
              )}
            >
              {greeting}
            </motion.span>

            {/* Cycling intro text */}
            <motion.span
              key="hero-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'block text-2xl md:text-3xl lg:text-4xl font-light',
                'leading-tight tracking-tight',
                'text-white [data-theme="light"] &:text-black'
              )}
            >
              {currentIntro}
            </motion.span>
          </motion.h1>

          {/* Chat Interface - exactly like v1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={cn(
              'flex gap-3 mb-8 md:mb-11',
              'bg-white/4 border border-white/8',
              'rounded-2xl p-2',
              '[data-theme="light"] &:bg-black/2 [data-theme="light"] &:border-black/8',
              'backdrop-blur-md transition-all duration-300',
              'focus-within:bg-white/6 focus-within:border-white/15',
              'focus-within:shadow-[0_0_30px_rgba(255,255,255,0.08)]',
              'focus-within:-translate-y-0.5'
            )}
          >
            <input
              type="text"
              placeholder="What makes Pixel Radar revolutionary?"
              className={cn(
                'flex-1 bg-transparent border-none',
                'px-3 py-2 md:px-4 md:py-3',
                'text-white [data-theme="light"] &:text-black',
                'placeholder:text-white/30 [data-theme="light"] &:placeholder:text-black/30',
                'text-sm md:text-base font-light',
                'outline-none min-w-0'
              )}
              autoComplete="off"
            />
            <button
              className={cn(
                'px-4 py-2 md:px-5 md:py-3',
                'text-white/70 hover:text-white/90',
                '[data-theme="light"] &:text-black/70 [data-theme="light"] &:hover:text-black/90',
                'text-sm font-normal transition-colors duration-200',
                'flex-shrink-0'
              )}
            >
              Send
            </button>
          </motion.div>

          {/* Navigation Pills - exactly like v1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className={cn(
              'grid gap-2 md:gap-3 mb-8 md:mb-11',
              // Responsive grid like v1
              'grid-cols-2 sm:grid-cols-3',
              // Large screens use flex
              'lg:flex lg:justify-center lg:flex-wrap'
            )}
          >
            {/* Primary CTA - Quick Tour */}
            <button
              className={cn(
                'px-3 py-2 md:px-4 md:py-3 rounded-full',
                'text-xs md:text-sm font-semibold text-center',
                'min-h-11 flex items-center justify-center',
                'transition-all duration-250 ease-out',
                // Primary styling with brand accent
                'bg-gradient-to-135 from-brand-red/12 to-brand-red/6',
                'border-1.5 border-brand-red/40',
                'text-white [data-theme="light"] &:text-black',
                'relative overflow-hidden',
                'shadow-[0_2px_8px_rgba(218,14,41,0.2)]',
                // Hover effects
                'hover:scale-[1.02] hover:-translate-y-0.5',
                'hover:shadow-[0_8px_16px_rgba(218,14,41,0.3)]',
                'active:scale-[0.98]',
                // Full width on small, spanning all columns
                'col-span-2 sm:col-span-3 lg:col-span-1'
              )}
            >
              <span className="relative z-10">Quick Tour</span>
              {/* Shimmer effect */}
              <div
                className={cn(
                  'absolute inset-0 -translate-x-full',
                  'bg-gradient-to-r from-transparent via-brand-red/20 to-transparent',
                  'animate-shimmer'
                )}
                style={{
                  animation: 'shimmer 3s infinite',
                }}
              />
            </button>

            {/* Secondary pills */}
            <button
              className={cn(
                'px-3 py-2 md:px-4 md:py-3 rounded-full',
                'text-xs md:text-sm font-normal text-center',
                'min-h-11 flex items-center justify-center',
                'transition-all duration-250 ease-out',
                // Secondary styling
                'bg-white/4 border border-white/8',
                '[data-theme="light"] &:bg-black/3 [data-theme="light"] &:border-black/8',
                'text-white/75 [data-theme="light"] &:text-black/75',
                // Hover effects
                'hover:bg-white/8 hover:border-white/20 hover:text-white',
                '[data-theme="light"] &:hover:bg-black/6 [data-theme="light"] &:hover:border-black/15 [data-theme="light"] &:hover:text-black/90',
                'hover:scale-[1.02] hover:-translate-y-0.5',
                'hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]',
                'active:scale-[0.98]'
              )}
              onClick={() => document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Show me work
            </button>

            <button
              className={cn(
                'px-3 py-2 md:px-4 md:py-3 rounded-full',
                'text-xs md:text-sm font-normal text-center',
                'min-h-11 flex items-center justify-center',
                'transition-all duration-250 ease-out',
                // Secondary styling
                'bg-white/4 border border-white/8',
                '[data-theme="light"] &:bg-black/3 [data-theme="light"] &:border-black/8',
                'text-white/75 [data-theme="light"] &:text-black/75',
                // Hover effects
                'hover:bg-white/8 hover:border-white/20 hover:text-white',
                '[data-theme="light"] &:hover:bg-black/6 [data-theme="light"] &:hover:border-black/15 [data-theme="light"] &:hover:text-black/90',
                'hover:scale-[1.02] hover:-translate-y-0.5',
                'hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]',
                'active:scale-[0.98]'
              )}
            >
              About me
            </button>
          </motion.div>

          {/* Trust Signals - exactly like v1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className={cn(
              'flex flex-wrap justify-center gap-3 md:gap-6',
              'mt-5 md:mt-8 pt-4 md:pt-7',
              'border-t border-white/6',
              '[data-theme="light"] &:border-black/6'
            )}
          >
            {[
              'Air India DesignLAB',
              'National Institute of Design',
              'Indian School of Business',
              'Microsoft'
            ].map((item, index) => (
              <span
                key={index}
                className={cn(
                  'text-xs font-light tracking-wide',
                  'text-white/50 [data-theme="light"] &:text-black/50',
                  'whitespace-nowrap'
                )}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Glass Cursor - exactly like v1 */}
      {showGlass && (
        <div
          className={cn(
            'fixed pointer-events-none z-[9999]',
            'w-[180px] h-[180px] rounded-full',
            'opacity-80 mix-blend-screen',
            'transition-opacity duration-300',
            // Hide on touch devices
            'hidden md:block'
          )}
          style={{
            left: glassPosition.x,
            top: glassPosition.y,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle at center,
              rgba(218, 14, 41, 0.2) 0%,
              rgba(218, 14, 41, 0.1) 40%,
              transparent 70%)`,
          }}
        />
      )}
    </>
  );
}