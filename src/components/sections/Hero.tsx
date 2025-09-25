'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const [greeting, setGreeting] = useState('');
  const [query, setQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning.');
    else if (hour < 18) setGreeting('Good afternoon.');
    else setGreeting('Good evening.');
  }, []);

  // Handle search/ask
  const onAsk = (e?: React.FormEvent) => {
    e?.preventDefault();
    // Stub function - handle the query
    console.log('Ask:', query);
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAsk();
    }
  };

  return (
    <main className={cn('relative min-h-screen bg-black overflow-hidden', className)}>
      {/* Radial red haze background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at center, rgba(218, 14, 41, 0.08) 0%, transparent 60%)`
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[800px] mx-auto"
        >
          {/* Glassmorphic Hero Card */}
          <div className="relative p-8 md:p-12 rounded-2xl border backdrop-blur-xl bg-white/3 border-white/10 shadow-2xl">
            {/* Soft inner glow */}
            <div className="absolute inset-px rounded-2xl bg-gradient-to-t from-transparent to-white/5 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              {/* Greeting microcopy */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-sm text-white/65 mb-4 font-light tracking-wide"
              >
                {greeting}
              </motion.p>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/92 font-light tracking-tight mb-8"
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  lineHeight: '1.1'
                }}
              >
                I visualize complex data
              </motion.h1>

              {/* Search-like input */}
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                onSubmit={onAsk}
                className="flex items-center gap-3 p-3 rounded-2xl border backdrop-blur-md bg-white/6 border-white/10 mb-8 focus-within:bg-white/8 focus-within:border-white/20 focus-within:shadow-lg transition-all duration-300"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Try: What makes Pixel Radar unique?"
                  className="flex-1 bg-transparent text-white/92 placeholder:text-white/65 text-sm font-light outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#DA0E29] hover:bg-[#DA0E29]/90 text-white text-sm font-medium rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#DA0E29]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Send
                </button>
              </motion.form>

              {/* CTA Pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {/* Primary CTA */}
                <button className="px-6 py-3 bg-[#DA0E29] hover:bg-[#DA0E29]/90 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg hover:shadow-[#DA0E29]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0">
                  Quick Tour
                </button>

                {/* Ghost CTAs */}
                <button className="px-6 py-3 border border-white/10 bg-white/6 hover:bg-white/10 hover:border-white/20 text-white/65 hover:text-white/92 text-sm font-medium rounded-full transition-all duration-200 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0">
                  Show me work
                </button>

                <button className="px-6 py-3 border border-white/10 bg-white/6 hover:bg-white/10 hover:border-white/20 text-white/65 hover:text-white/92 text-sm font-medium rounded-full transition-all duration-200 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA0E29] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0">
                  About me
                </button>
              </motion.div>

              {/* Trusted by section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="pt-6 border-t border-white/10"
              >
                <div className="flex flex-wrap justify-center gap-6 text-xs text-white/65 font-light tracking-wide">
                  <span className="hover:text-white/80 transition-colors cursor-pointer">Air India DesignLAB</span>
                  <span className="hover:text-white/80 transition-colors cursor-pointer">National Institute of Design</span>
                  <span className="hover:text-white/80 transition-colors cursor-pointer">Indian School of Business</span>
                  <span className="hover:text-white/80 transition-colors cursor-pointer">Microsoft</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}