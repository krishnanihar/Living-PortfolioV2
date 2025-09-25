'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const maxRotation = 15; // degrees
      const rotateX = ((e.clientY - centerY) / rect.height) * -maxRotation;
      const rotateY = ((e.clientX - centerX) / rect.width) * maxRotation;

      setMousePos({ x: rotateY, y: rotateX });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <section
      className={cn(
        'min-h-screen flex items-center justify-center',
        'px-4 py-20',
        'perspective-1000',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: mousePos.y,
          rotateY: mousePos.x,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          rotateX: { duration: 0.1 },
          rotateY: { duration: 0.1 },
        }}
        className="w-full max-w-4xl mx-auto"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <Card
          ref={cardRef}
          variant="glass"
          padding="xl"
          className={cn(
            'text-center relative overflow-hidden',
            'transform-gpu transition-all duration-100',
            'hover:shadow-2xl',
            isHovered && 'scale-[1.02]'
          )}
          onMouseEnter={() => setIsHovered(true)}
        >
          {/* Background glow effect */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `
                radial-gradient(
                  600px circle at ${mousePos.x * 2 + 50}% ${mousePos.y * 2 + 50}%,
                  rgba(218, 14, 41, 0.05),
                  transparent 40%
                )
              `,
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={cn(
                'text-sm font-light tracking-wide mb-6',
                'text-white/70 [data-theme="light"] &:text-black/70',
                'uppercase letter-spacing-wider'
              )}
            >
              Hello, I'm Nihar
            </motion.p>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={cn(
                'text-4xl md:text-6xl lg:text-7xl font-extralight mb-8',
                'text-white/95 [data-theme="light"] &:text-black/95',
                'leading-tight tracking-tight',
                'text-gradient'
              )}
            >
              Product & New Media
              <br />
              <span className="font-light">Designer</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={cn(
                'text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto',
                'text-white/80 [data-theme="light"] &:text-black/80'
              )}
            >
              Crafting consciousness-aware interfaces that breathe life into digital experiences.
              Currently transforming aviation UX at{' '}
              <span className="text-brand-red font-medium">Air India</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button variant="primary" size="lg" className="min-w-[160px]">
                View My Work
              </Button>
              <Button variant="glass" size="lg" className="min-w-[160px]">
                Let's Connect
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className={cn(
                'mt-16 pt-8 border-t border-white/10',
                '[data-theme="light"] &:border-black/10'
              )}
            >
              <p className={cn(
                'text-xs font-medium tracking-wide mb-4',
                'text-white/50 [data-theme="light"] &:text-black/50',
                'uppercase'
              )}>
                Trusted by 450+ daily users
              </p>
              <div className="flex justify-center items-center gap-8 opacity-50">
                {/* Placeholder for logos/metrics */}
                <div className={cn(
                  'text-sm font-light',
                  'text-white/40 [data-theme="light"] &:text-black/40'
                )}>
                  Air India × Microsoft Hackathon Winner
                </div>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}