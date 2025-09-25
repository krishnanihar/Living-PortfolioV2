'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ParticleField } from '@/components/effects/ParticleField';
import { AnimatedHeading, MagneticText, MorphingText } from '@/components/ui';
import { useMagneticEffect, useGlowEffect, baseVariants, transitions } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: () => void;
}

function MagneticButton({ children, variant = 'primary', className = '', onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.15);
  const { x: glowX, y: glowY, opacity: glowOpacity, updateGlow, hideGlow } = useGlowEffect();

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      updateGlow(event.nativeEvent, buttonRef.current);
    }
  };

  const baseClasses = "relative px-6 py-3 rounded-full font-medium transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-black group overflow-hidden";

  const variantClasses = {
    primary: "bg-[#DA0E29] hover:bg-[#DA0E29]/90 text-white shadow-lg hover:shadow-xl hover:shadow-[#DA0E29]/30",
    secondary: "bg-white/8 hover:bg-white/12 border border-white/10 hover:border-white/20 text-white/90 hover:text-white glass-interactive",
    ghost: "bg-transparent hover:bg-white/6 border border-white/8 hover:border-white/16 text-white/70 hover:text-white/95 glass-glow"
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{ x, y }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={transitions.spring}
      className={cn(baseClasses, variantClasses[variant], className)}
      onMouseMove={(e) => {
        if (buttonRef.current) {
          handleMouseMove(e.nativeEvent, buttonRef.current);
          updateGlow(e.nativeEvent, buttonRef.current);
        }
      }}
      onMouseLeave={() => {
        handleMouseLeave();
        hideGlow();
      }}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {/* Glow background */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.1), transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Shimmer effect for primary button */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.button>
  );
}

export function Hero({ className }: HeroProps) {
  const [greeting, setGreeting] = useState('');
  const [query, setQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D perspective effects
  const rotateX = useTransform(mouseY, [-300, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [-300, 300], [-2, 2]);

  // Scroll-based effects
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Dynamic taglines for morphing text
  const taglines = [
    "I visualize complex data",
    "I craft digital experiences",
    "I design with intention",
    "I build the future"
  ];

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning.');
    else if (hour < 18) setGreeting('Good afternoon.');
    else setGreeting('Good evening.');
  }, []);

  // Mouse tracking for 3D effects
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((event.clientX - centerX) * 0.1);
    mouseY.set((event.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Handle search/ask
  const onAsk = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log('Ask:', query);
  };

  return (
    <main className={cn('relative min-h-screen bg-black overflow-hidden', className)}>
      {/* Enhanced particle background */}
      <ParticleField
        className="z-0"
        variant="ambient"
        density="medium"
        mouseInfluence={0.4}
        connectionDistance={140}
      />

      {/* Ambient background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px circle at 30% 30%, rgba(218, 14, 41, 0.06) 0%, transparent 50%),
              radial-gradient(800px circle at 70% 70%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
              radial-gradient(600px circle at center bottom, rgba(218, 14, 41, 0.03) 0%, transparent 70%)
            `
          }}
        />

        {/* Breathing ambient light */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            background: 'radial-gradient(1500px circle at center, rgba(218, 14, 41, 0.03) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
        style={{ perspective: '1500px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={heroRef}
          style={{
            opacity: scrollOpacity,
            scale: scrollScale,
            rotateX: !prefersReducedMotion() ? rotateX : 0,
            rotateY: !prefersReducedMotion() ? rotateY : 0,
          }}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-full max-w-[900px] mx-auto"
        >
          {/* Premium Hero Glass Card */}
          <div className="relative p-8 md:p-16 rounded-3xl hero-glass noise-texture transform-gpu">
            {/* Enhanced inner glow with multiple layers */}
            <div className="absolute inset-1 rounded-3xl bg-gradient-to-br from-white/8 via-transparent to-white/4 pointer-events-none" />
            <div className="absolute inset-px rounded-3xl bg-gradient-to-t from-transparent via-white/3 to-white/6 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              {/* Greeting with enhanced animation */}
              <motion.div
                variants={baseVariants.slideUp}
                initial="initial"
                animate="animate"
                transition={{ ...transitions.base, delay: 0.4 }}
                className="mb-6"
              >
                <MagneticText
                  className="text-sm text-white/60 font-light tracking-wider uppercase"
                  strength={0.1}
                  splitByLetters={false}
                >
                  {greeting}
                </MagneticText>
              </motion.div>

              {/* Main animated heading with morphing taglines */}
              <div className="mb-8">
                <AnimatedHeading
                  level={1}
                  variant="magnetic"
                  className="text-white/95 font-light tracking-tight"
                  style={{
                    fontSize: 'clamp(32px, 5vw, 64px)',
                    lineHeight: '1.1'
                  }}
                  magneticStrength={0.4}
                  splitByLetters={true}
                  glowEffect={true}
                  variableFont={true}
                  shimmerEffect={true}
                  chromaticAberration={false}
                >
                  Nihar Sunkara
                </AnimatedHeading>

                <motion.div
                  variants={baseVariants.slideUp}
                  initial="initial"
                  animate="animate"
                  transition={{ ...transitions.base, delay: 0.8 }}
                  className="mt-4"
                >
                  <MorphingText
                    texts={taglines}
                    className="text-white/80 font-light tracking-tight text-xl md:text-2xl"
                    duration={3500}
                    morphingEffect="smooth"
                    direction="up"
                  />
                </motion.div>
              </div>

              {/* Enhanced search interface */}
              <motion.form
                variants={baseVariants.slideUp}
                initial="initial"
                animate="animate"
                transition={{ ...transitions.base, delay: 1.0 }}
                onSubmit={onAsk}
                className="relative mb-10 group"
              >
                <div className="flex items-center gap-3 p-4 rounded-2xl glass-layer-2 focus-within:glass-layer-3 transition-all duration-500">
                  <Sparkles size={18} className="text-white/40 group-focus-within:text-[#DA0E29] transition-colors duration-300" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything about my work, experience, or projects..."
                    className="flex-1 bg-transparent text-white/95 placeholder:text-white/50 text-base font-light outline-none"
                  />
                  <MagneticButton variant="primary" onClick={onAsk}>
                    <ArrowRight size={16} />
                  </MagneticButton>
                </div>
              </motion.form>

              {/* Enhanced CTA buttons with magnetic effects */}
              <motion.div
                variants={baseVariants.staggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-wrap gap-4 mb-12"
              >
                <motion.div variants={baseVariants.slideUp}>
                  <MagneticButton variant="primary">
                    View My Work
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                </motion.div>

                <motion.div variants={baseVariants.slideUp}>
                  <MagneticButton variant="secondary">
                    About Me
                  </MagneticButton>
                </motion.div>

                <motion.div variants={baseVariants.slideUp}>
                  <MagneticButton variant="ghost">
                    Let's Connect
                  </MagneticButton>
                </motion.div>
              </motion.div>

              {/* Enhanced trusted by section */}
              <motion.div
                variants={baseVariants.slideUp}
                initial="initial"
                animate="animate"
                transition={{ ...transitions.base, delay: 1.4 }}
                className="pt-8 border-t border-white/8"
              >
                <p className="text-white/40 text-sm mb-6 text-center">Trusted by industry leaders</p>
                <div className="flex flex-wrap justify-center gap-8 text-sm text-white/60 font-light">
                  {[
                    'Air India DesignLAB',
                    'National Institute of Design',
                    'Indian School of Business',
                    'Microsoft'
                  ].map((company, index) => (
                    <motion.span
                      key={company}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                      className="hover:text-white/90 transition-colors cursor-pointer relative group"
                    >
                      <MagneticText strength={0.1} splitByLetters={false}>
                        {company}
                      </MagneticText>
                      <motion.div
                        className="absolute inset-0 rounded bg-white/5"
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1.1 }}
                        transition={transitions.base}
                      />
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Enhanced floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#DA0E29]/20 to-transparent blur-xl"
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            <motion.div
              className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-2xl"
              animate={{
                y: [10, -10, 10],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2
              }}
            />
          </div>
        </motion.div>

        {/* Premium scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-white/40 cursor-pointer group"
          >
            <span className="text-xs uppercase tracking-widest font-light group-hover:text-white/60 transition-colors">
              Scroll to explore
            </span>
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2 group-hover:border-white/40 transition-colors">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 bg-white/40 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}