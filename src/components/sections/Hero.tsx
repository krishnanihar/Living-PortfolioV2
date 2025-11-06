'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useInView, useAnimation } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMagneticEffect, useScrollReveal } from '@/lib/micro-interactions';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const [greeting, setGreeting] = useState('');
  const [query, setQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isInView = useInView(heroRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  // Apply magnetic effects to key elements
  useMagneticEffect(heroCardRef, {
    strength: 0.1,
    radius: 200,
    scale: 1.02,
    rotation: true,
  });

  useMagneticEffect(titleRef, {
    strength: 0.15,
    radius: 300,
    scale: 1.01,
  });

  useMagneticEffect(searchRef, {
    strength: 0.2,
    radius: 150,
    scale: 1.05,
    glow: true,
  });

  // Scroll reveal for elements
  const { observe } = useScrollReveal();

  useEffect(() => {
    if (heroCardRef.current) {
      observe(heroCardRef.current, {
        direction: 'up',
        distance: 50,
        duration: 800,
        delay: 200,
      });
    }
  }, [observe]);

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning.');
    else if (hour < 18) setGreeting('Good afternoon.');
    else setGreeting('Good evening.');
  }, []);

  // Enhanced mouse parallax
  const handleMouseMove = (event: React.MouseEvent) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Sophisticated parallax with depth
    const normalizedX = (event.clientX - centerX) / rect.width;
    const normalizedY = (event.clientY - centerY) / rect.height;

    mouseX.set(normalizedX * 20);
    mouseY.set(normalizedY * 15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Enhanced interaction handlers
  const onAsk = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log('Ask:', query);
  };

  const handleButtonClick = (action: string, ref?: React.RefObject<HTMLButtonElement>) => {
    console.log(`Navigate to: ${action}`);
  };

  // Advanced staggered animations
  useEffect(() => {
    if (!isInView) return;

    controls.start('visible');
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const heroCardVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateX: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4,
      },
    },
  };

  return (
    <main className={cn('relative min-h-screen overflow-hidden', className)}>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Main hero card with 3D effects */}
          <motion.div
            ref={heroCardRef}
            variants={heroCardVariants}
            initial="hidden"
            animate={controls}
            style={{
              rotateX: mouseY,
              rotateY: mouseX,
            }}
            className="glass-hero rounded-3xl p-12 md:p-16 lg:p-20 transform-gpu will-change-transform"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="max-w-5xl mx-auto text-center"
            >
              {/* Greeting */}
              <motion.div variants={itemVariants} className="mb-8">
                <p className="text-micro text-[var(--text-muted)] mb-6">{greeting}</p>
              </motion.div>

              {/* Hero Title with advanced typography */}
              <motion.div variants={itemVariants} className="mb-12">
                <h1
                  ref={titleRef}
                  className="text-display text-[var(--text-primary)] drop-shadow-sm transform-gpu will-change-transform"
                  style={{
                    background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Krishna Nihar
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={itemVariants} className="mb-16">
                <p className="text-subheading text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
                  I visualize complex data and craft digital experiences that bridge the gap between insight and action
                </p>
              </motion.div>

              {/* Enhanced search prompt */}
              <motion.div variants={itemVariants} className="mb-16">
                <div className="max-w-2xl mx-auto">
                  <motion.div
                    ref={searchRef}
                    className="glass-card rounded-full p-2 transform-gpu will-change-transform"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(218, 14, 41, 0.1)',
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4 px-6 py-4">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask me anything about my work..."
                        className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-body outline-none selection:bg-[var(--brand-red)]/20"
                        onKeyDown={(e) => e.key === 'Enter' && onAsk()}
                      />
                      <motion.button
                        onClick={onAsk}
                        className="btn-primary flex items-center gap-2 px-6 py-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="mb-20">
                <div className="flex flex-wrap justify-center gap-6">
                  <motion.button
                    className="btn-primary"
                    onClick={() => handleButtonClick('work')}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(218, 14, 41, 0.3)',
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                  </motion.button>
                  <motion.button
                    className="btn-secondary"
                    onClick={() => handleButtonClick('about')}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    About Me
                  </motion.button>
                  <motion.button
                    className="btn-secondary"
                    onClick={() => handleButtonClick('contact')}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </motion.button>
                </div>
              </motion.div>

              {/* Sophisticated credentials section */}
              <motion.div variants={itemVariants} className="pt-12 border-t border-[var(--border-primary)]">
                <p className="text-micro text-[var(--text-muted)] mb-8 text-center">
                  Trusted by
                </p>
                <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                  {[
                    'Air India DesignLAB',
                    'National Institute of Design',
                    'Indian School of Business',
                    'Microsoft',
                  ].map((company, index) => (
                    <motion.span
                      key={company}
                      className="text-body text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer transform-gpu will-change-transform transition-colors duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5 + index * 0.1, duration: 0.6 }}
                    >
                      {company}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Sophisticated scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-micro text-[var(--text-muted)]">Scroll</span>
            <ChevronDown size={16} className="text-[var(--text-muted)]" />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}