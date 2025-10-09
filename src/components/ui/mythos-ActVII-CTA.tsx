'use client';

import { Icons } from './mythos-Icons';
import { ScrollytellingSection } from './ScrollytellingSection';
import Link from 'next/link';

interface ActVIICTAProps {
  onSummon: (prompt: string) => void;
  isLoading: boolean;
}

export const ActVIICTA = ({ onSummon, isLoading }: ActVIICTAProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get('prompt') as string;
    if (prompt.trim()) {
      onSummon(prompt);
      // Scroll to experience section
      document.getElementById('the-experience')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const emotionChips = [
    { emoji: '🌊', label: 'Water', prompt: 'Art featuring water and transformation' },
    { emoji: '❤️', label: 'Love', prompt: 'Art about love and intimacy' },
    { emoji: '⚔️', label: 'Drama', prompt: 'Dramatic art with high emotional intensity' },
    { emoji: '🌙', label: 'Dreams', prompt: 'Dreamlike and surreal artworks' },
    { emoji: '🌅', label: 'Hope', prompt: 'Art that inspires hope and renewal' },
    { emoji: '💀', label: 'Mortality', prompt: 'Art exploring death and mortality' },
  ];

  return (
    <section id="final-cta" className="relative py-40 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(218,14,41,0.15),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <ScrollytellingSection animationType="fade-up" threshold={0.3}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 gradient-shimmer">
              Your Exhibition Awaits
            </h2>
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              What emotion, theme, or moment calls to you?
            </p>
          </div>
        </ScrollytellingSection>

        {/* Main CTA Form */}
        <ScrollytellingSection animationType="scale" delay={300} threshold={0.3}>
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="relative">
              <textarea
                name="prompt"
                placeholder="Whisper your desire to the archive..."
                disabled={isLoading}
                rows={3}
                className="w-full px-6 py-6 bg-white/5 border-2 border-white/20 focus:border-[#DA0E29] focus:ring-4 focus:ring-[#DA0E29]/30 rounded-3xl text-white text-lg placeholder-white/40 transition-all duration-300 outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-lg"
              />
              <button
                type="button"
                className="absolute right-6 top-6 p-3 rounded-xl transition-colors bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
                aria-label="Use voice input"
              >
                <Icons.mic className="w-6 h-6" />
              </button>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative px-12 py-5 bg-[#DA0E29] text-white font-bold text-lg rounded-2xl disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed hover:bg-red-500 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-[#DA0E29]/50 hover:shadow-[#DA0E29]/70 hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Summoning...
                  </>
                ) : (
                  <>
                    <Icons.sparkles className="w-6 h-6 group-hover:animate-pulse" />
                    Summon My Exhibition
                    <Icons.sparkles className="w-6 h-6 group-hover:animate-pulse" />
                  </>
                )}
              </button>
            </div>
          </form>
        </ScrollytellingSection>

        {/* Emotion chips */}
        <ScrollytellingSection animationType="fade-up" delay={600} threshold={0.3}>
          <div className="mb-16">
            <p className="text-center text-white/50 text-sm mb-6 uppercase tracking-wider">
              Or explore by emotion
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {emotionChips.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onSummon(chip.prompt);
                    document.getElementById('the-experience')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  disabled={isLoading}
                  className="group px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#DA0E29] hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform">
                    {chip.emoji}
                  </span>
                  <span className="text-white/70 group-hover:text-white font-medium">
                    {chip.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </ScrollytellingSection>

        {/* Divider */}
        <ScrollytellingSection animationType="fade-in" delay={800} threshold={0.3}>
          <div className="relative py-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 bg-[#0A0A0A] text-white/40 text-sm uppercase tracking-wider">
                Or explore other work
              </span>
            </div>
          </div>
        </ScrollytellingSection>

        {/* Navigation to other work */}
        <ScrollytellingSection animationType="fade-up" delay={1000} threshold={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/work/air-india"
              className="group px-8 py-4 bg-white/[.04] border border-white/10 rounded-2xl hover:bg-white/[.08] hover:border-white/20 transition-all duration-300 flex items-center gap-3"
            >
              <Icons.arrowLeft className="w-5 h-5 text-white/50 group-hover:text-white group-hover:-translate-x-1 transition-all" />
              <span className="text-white/70 group-hover:text-white font-medium">
                Air India
              </span>
            </Link>

            <Link
              href="/work"
              className="px-8 py-4 bg-white/[.04] border border-white/10 rounded-2xl hover:bg-white/[.08] hover:border-white/20 transition-all duration-300"
            >
              <span className="text-white/70 hover:text-white font-medium">
                All Work
              </span>
            </Link>

            <Link
              href="/labs"
              className="group px-8 py-4 bg-white/[.04] border border-white/10 rounded-2xl hover:bg-white/[.08] hover:border-white/20 transition-all duration-300 flex items-center gap-3"
            >
              <span className="text-white/70 group-hover:text-white font-medium">
                Labs
              </span>
              <Icons.arrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </ScrollytellingSection>
      </div>
    </section>
  );
};
