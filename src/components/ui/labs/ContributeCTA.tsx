'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Send } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function ContributeCTA() {
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct mailto link
    const subject = encodeURIComponent('Labs Idea Submission');
    const body = encodeURIComponent(`From: ${email}\n\nIdea:\n${idea}`);
    window.open(`mailto:nihar@example.com?subject=${subject}&body=${body}`, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      setIdea('');
    }, 1000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div
        className={cn(
          'relative overflow-hidden',
          'p-16 rounded-3xl',
          'bg-white/[0.08] border border-white/[0.20]',
          '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]',
          'shadow-2xl'
        )}
        style={{
          backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
          WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(218, 14, 41, 0.15) 0%, transparent 50%)',
            mixBlendMode: 'soft-light',
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--brand-red)]/20 border border-[var(--brand-red)]/30 mb-6"
          >
            <Lightbulb className="w-8 h-8 text-[var(--brand-red)]" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-white [data-theme='light'] &:text-black mb-4">
            Have an idea for the lab?
          </h2>

          <p className="text-lg text-white/70 [data-theme='light'] &:text-black/70 mb-10">
            Got a wild experiment idea? A prototype that needs building?
            <br />
            Let's collaborate and bring it to life.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cn(
                'w-full px-6 py-4 rounded-2xl',
                'bg-white/[0.08] border border-white/[0.20]',
                '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]',
                'text-white placeholder:text-white/40',
                '[data-theme="light"] &:text-black [data-theme="light"] &:placeholder:text-black/40',
                'focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]/50',
                'transition-all duration-200'
              )}
              style={{
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
              }}
            />

            <textarea
              placeholder="Describe your idea..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
              rows={4}
              className={cn(
                'w-full px-6 py-4 rounded-2xl resize-none',
                'bg-white/[0.08] border border-white/[0.20]',
                '[data-theme="light"] &:bg-black/[0.08] [data-theme="light"] &:border-black/[0.20]',
                'text-white placeholder:text-white/40',
                '[data-theme="light"] &:text-black [data-theme="light"] &:placeholder:text-black/40',
                'focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]/50',
                'transition-all duration-200'
              )}
              style={{
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
              }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl',
                'bg-[var(--brand-red)] text-white font-medium',
                'hover:bg-[var(--brand-red)]/90',
                'shadow-xl shadow-[var(--brand-red)]/30',
                'hover:shadow-2xl hover:shadow-[var(--brand-red)]/40',
                'transition-all duration-300',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <Send size={18} />
              <span>{isSubmitting ? 'Sending...' : 'Submit Idea'}</span>
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
