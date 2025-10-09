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
      <div className="absolute inset-0 -top-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(218,14,41,0.1),rgba(255,255,255,0))] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="mystical-particle absolute w-1 h-1 bg-[#DA0E29] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-4xl mx-auto w-full space-y-8"
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
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
            className="font-bold text-white tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,8vw,5rem)] gradient-shimmer"
            style={{
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            The Archive Awakens
          </h1>
        </ScrollytellingSection>

        {/* Subheading */}
        <ScrollytellingSection animationType="fade-up" delay={900}>
          <p
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed"
            style={{
              lineHeight: '1.7',
              marginBottom: '1.5rem',
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
            className="max-w-3xl mx-auto text-base md:text-lg text-white/70 leading-relaxed"
            style={{
              lineHeight: '1.8',
              marginBottom: '2rem',
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
                className="w-full h-16 px-6 pr-16 bg-white/5 border border-white/10 focus:border-[#DA0E29] focus:ring-2 focus:ring-[#DA0E29]/50 rounded-2xl text-white placeholder-white/40 transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="flex flex-wrap items-center justify-center gap-3 text-sm"
            style={{
              marginTop: '1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span className="text-white/50">Try whispering:</span>
            {examplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => onSummon(prompt)}
                disabled={isLoading}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#DA0E29] transition-all duration-300 text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
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
