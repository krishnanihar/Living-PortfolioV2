'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useInView, useAnimation } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ParticleField } from '@/components/effects/ParticleField';
import { prefersReducedMotion } from '@/lib/utils';

interface HeroProps {
  className?: string;
}


export function Hero({ className }: HeroProps) {
  const [greeting, setGreeting] = useState('');
  const [query, setQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isInView = useInView(heroRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning.');
    else if (hour < 18) setGreeting('Good afternoon.');
    else setGreeting('Good evening.');
  }, []);

  // Enhanced mouse parallax for hero title
  const handleMouseMove = (event: React.MouseEvent) => {
    if (prefersReducedMotion()) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((event.clientX - centerX) * 0.015); // Enhanced but still subtle
    mouseY.set((event.clientY - centerY) * 0.012);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Handle search/ask with animation
  const onAsk = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log('Ask:', query);
  };

  // Button click animations
  const handleButtonClick = (action: string) => {
    console.log(`Navigate to: ${action}`);
  };

  // Staggered content reveal with Framer Motion
  useEffect(() => {
    if (!isInView) return;

    controls.start('visible');
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <main className={cn('relative min-h-screen bg-black overflow-hidden', className)}>
      {/* Ultra-subtle particle background - barely visible dust */}
      <ParticleField
        className="z-0"
        variant="subtle"
        density="low"
        mouseInfluence={0.1}
        connectionDistance={0} // No connections
      />

      {/* Minimal ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(2000px circle at center, rgba(218, 14, 41, 0.005) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Ultra-minimal Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-48 pb-32">
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Content with generous Apple-level spacing */}
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Greeting - enhanced reveal */}
            <motion.div
              variants={itemVariants}
              className="mb-12"
            >
              <p className="text-greeting">{greeting}</p>
            </motion.div>

            {/* Hero title with enhanced mouse parallax */}
            <motion.div
              style={{ x: mouseX, y: mouseY }}
              variants={itemVariants}
              className="mb-16 transform-gpu will-change-transform"
            >
              <h1 className="text-hero drop-shadow-sm">Nihar Sunkara</h1>
            </motion.div>

            {/* Enhanced subtitle */}
            <motion.div
              variants={itemVariants}
              className="mb-24"
            >
              <p className="text-subtitle">I visualize complex data and craft digital experiences</p>
            </motion.div>

            {/* Enhanced floating search prompt */}
            <motion.div
              variants={itemVariants}
              className="mb-16"
            >
              <div className="max-w-2xl mx-auto">
                <motion.div
                  className="flex items-center gap-4 px-7 py-5 rounded-full glass-breath shadow-xl shadow-black/10 border border-white/10"
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything about my work..."
                    className="flex-1 bg-transparent text-white/90 placeholder:text-white/50 text-body outline-none selection:bg-[#DA0E29]/20"
                    onKeyDown={(e) => e.key === 'Enter' && onAsk()}
                  />
                  <motion.button
                    onClick={onAsk}
                    className="button-ghost rounded-full px-6 py-2 hover:shadow-md hover:shadow-[#DA0E29]/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-6 mb-32"
            >
              <motion.button
                className="button-primary rounded-full transform-gpu will-change-transform hover:shadow-xl hover:shadow-[#DA0E29]/20"
                onClick={() => handleButtonClick('work')}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                View Work
              </motion.button>
              <motion.button
                className="button-ghost rounded-full transform-gpu will-change-transform hover:shadow-lg hover:shadow-white/10"
                onClick={() => handleButtonClick('about')}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                About Me
              </motion.button>
              <motion.button
                className="button-ghost rounded-full transform-gpu will-change-transform hover:shadow-lg hover:shadow-white/10"
                onClick={() => handleButtonClick('contact')}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
            </motion.div>

            {/* Enhanced credentials */}
            <motion.div
              variants={itemVariants}
              className="pt-16 border-t border-white/06"
            >
              <p className="text-xs text-white/40 mb-8 tracking-wider uppercase text-center font-light">Trusted by</p>
              <div className="flex flex-wrap justify-center gap-12 text-body">
                {[
                  'Air India DesignLAB',
                  'National Institute of Design',
                  'Indian School of Business',
                  'Microsoft'
                ].map((company, index) => (
                  <motion.span
                    key={company}
                    className="hover:text-white/95 cursor-pointer transform-gpu will-change-transform"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 + index * 0.1 }}
                  >
                    {company}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Minimal scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown size={16} className="text-white/20 animate-bounce" />
        </motion.div>
      </section>
    </main>
  );
}