'use client';

import { Icons } from './mythos-Icons';
import { ScrollytellingSection } from './ScrollytellingSection';

interface HeroNewProps {
  onSummon: (prompt: string) => void;
  isLoading: boolean;
}

export const HeroNew = ({ onSummon, isLoading }: HeroNewProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get('prompt') as string;
    if (prompt.trim()) {
      onSummon(prompt);
    }
  };

  const examplePrompts = [
    "Water and transformation across all centuries",
    "Art that feels like loneliness",
    "Dramatic use of light in the 17th century",
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center text-center px-4 overflow-hidden"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          top: '-50%',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(218, 14, 41, 0.18), rgba(255, 255, 255, 0))',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => {
          // Deterministic positions based on index (prevents hydration mismatch)
          const seed = i / 20; // 0 to 1
          const left = ((seed * 87.3 + 13.7 + i * 4.2) % 100);
          const top = ((seed * 73.1 + 17.3 + i * 5.7) % 100);
          const delay = ((seed * 5.5 + 0.5 + i * 0.3) % 6);
          const opacity = ((seed * 0.35) + 0.35 + (i % 3) * 0.05);

          return (
            <div
              key={i}
              className="mystical-particle absolute w-2 h-2 bg-[#DA0E29] rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                opacity: opacity,
                boxShadow: '0 0 8px rgba(218, 14, 41, 0.6)',
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-4xl mx-auto w-full"
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Badge */}
        <ScrollytellingSection animationType="fade-in" delay={300}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <Icons.oracle className="w-4 h-4 text-[#DA0E29]" />
            <span className="text-sm font-medium text-white/80">Mythos</span>
          </div>
        </ScrollytellingSection>

        {/* Main heading */}
        <ScrollytellingSection animationType="fade-up" delay={600}>
          <h1
            className="font-bold text-white tracking-[-0.03em] text-[clamp(2.5rem,8vw,5rem)]"
            style={{
              lineHeight: '1.1',
              textAlign: 'center',
              background: 'linear-gradient(90deg, #E0D8C8, #fff, #DA0E29, #E0D8C8)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-shimmer 5s ease-in-out infinite',
            }}
          >
            The Archive Awakens
          </h1>
        </ScrollytellingSection>

        {/* Subheading */}
        <ScrollytellingSection animationType="fade-up" delay={900}>
          <p
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/90"
            style={{
              lineHeight: '1.7',
              textAlign: 'center',
            }}
          >
            Whisper your desire—from <span className="text-[#E0D8C8] font-medium">"art that feels like loneliness"</span> to{' '}
            <span className="text-[#E0D8C8] font-medium">"dramatic light in the 17th century."</span>
          </p>
        </ScrollytellingSection>

        {/* Value prop */}
        <ScrollytellingSection animationType="fade-up" delay={1200}>
          <p
            className="max-w-3xl mx-auto text-base md:text-lg text-white/70"
            style={{
              lineHeight: '1.8',
              textAlign: 'center',
            }}
          >
            An ancient AI curator materializes a personal exhibition from{' '}
            <span className="text-white font-semibold">62 masterworks</span> spanning{' '}
            <span className="text-white font-semibold">1,000 years</span> of human expression.
          </p>
        </ScrollytellingSection>

        {/* Input form */}
        <ScrollytellingSection animationType="scale" delay={1500}>
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-4"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              className="relative max-w-2xl mx-auto"
              style={{
                width: '100%',
                maxWidth: '42rem',
              }}
            >
              <input
                type="text"
                name="prompt"
                placeholder="Speak or type your desire to Mythos..."
                disabled={isLoading}
                className="w-full h-16 px-6 pr-20 bg-white/5 border border-white/10 focus:border-[#DA0E29] focus:ring-2 focus:ring-[#DA0E29]/50 rounded-2xl text-white placeholder-white/40 transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors bg-transparent text-white/50 hover:text-white hover:bg-white/10"
                aria-label="Use voice input"
              >
                <Icons.mic className="w-5 h-5" />
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-[#DA0E29] text-white font-semibold rounded-xl disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed hover:bg-red-500 transition-all duration-300 flex items-center justify-center gap-2 mx-auto shadow-lg shadow-[#DA0E29]/30 hover:shadow-[#DA0E29]/50 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Summoning...
                </>
              ) : (
                <>
                  <Icons.sparkles className="w-5 h-5" />
                  Summon Exhibition
                </>
              )}
            </button>
          </form>
        </ScrollytellingSection>

        {/* Example prompts */}
        <ScrollytellingSection animationType="fade-in" delay={1800}>
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span className="text-white/50 text-sm">Try whispering:</span>
            <div
              className="flex flex-wrap justify-center gap-3"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.75rem',
              }}
            >
              {examplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => onSummon(prompt)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#DA0E29] transition-all duration-300 text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </ScrollytellingSection>

        {/* Scroll indicator */}
        <ScrollytellingSection animationType="fade-in" delay={2100}>
          <a
            href="#the-problem"
            className="inline-flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors mt-16"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '4rem',
              textAlign: 'center',
            }}
          >
            <span className="text-xs uppercase tracking-wider">Scroll to discover</span>
            <Icons.arrowDown className="w-6 h-6 animate-scroll-down" />
          </a>
        </ScrollytellingSection>
      </div>
    </section>
  );
};
