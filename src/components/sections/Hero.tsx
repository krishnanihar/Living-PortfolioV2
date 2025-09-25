'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning.');
    else if (hour < 18) setGreeting('Good afternoon.');
    else setGreeting('Good evening.');
  }, []);

  // Ultra-subtle mouse tracking - only for hero title
  const handleMouseMove = (event: React.MouseEvent) => {
    if (prefersReducedMotion()) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((event.clientX - centerX) * 0.005); // Ultra-subtle movement
    mouseY.set((event.clientY - centerY) * 0.005);
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
          <div className="max-w-4xl mx-auto text-center"
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
          >
            {/* Greeting - ultra-clean */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-12"
            >
              <p className="text-greeting">{greeting}</p>
            </motion.div>

            {/* Hero title with ultra-subtle mouse follow */}
            <motion.div
              style={{ x: mouseX, y: mouseY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-16"
            >
              <h1 className="text-hero">Nihar Sunkara</h1>
            </motion.div>

            {/* Simple subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mb-24"
            >
              <p className="text-subtitle">I visualize complex data and craft digital experiences</p>
            </motion.div>

            {/* Minimal floating search prompt */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mb-16"
            >
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 px-6 py-4 rounded-full glass-breath">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything about my work..."
                    className="flex-1 bg-transparent text-white/90 placeholder:text-white/40 text-body outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && onAsk()}
                  />
                  <button
                    onClick={onAsk}
                    className="button-ghost rounded-full px-6 py-2"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Clean CTA buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="flex justify-center gap-6 mb-32"
            >
              <button className="button-primary rounded-full">
                View Work
              </button>
              <button className="button-ghost rounded-full">
                About Me
              </button>
              <button className="button-ghost rounded-full">
                Contact
              </button>
            </motion.div>

            {/* Minimal credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="pt-16 border-t border-white/03"
            >
              <p className="text-xs text-white/30 mb-8 tracking-wider uppercase text-center">Trusted by</p>
              <div className="flex flex-wrap justify-center gap-12 text-body">
                {[
                  'Air India DesignLAB',
                  'National Institute of Design',
                  'Indian School of Business',
                  'Microsoft'
                ].map((company, index) => (
                  <span
                    key={company}
                    className="hover:text-white/90 transition-colors duration-300 cursor-pointer"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
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