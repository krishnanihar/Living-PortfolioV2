'use client';

import { ScrollytellingSection } from './ScrollytellingSection';
import { AnimatedCounter } from './AnimatedCounter';
import type { Artwork } from '@/types/mythos';

interface ActVImpactProps {
  artworks: Artwork[];
}

export const ActVImpact = ({ artworks }: ActVImpactProps) => {
  // Calculate unique stats
  const uniqueCities = new Set(artworks.map(a => a.museum.split(',')[1]?.trim() || a.museum)).size;
  const uniqueMuseums = new Set(artworks.map(a => a.museum)).size;
  const uniqueCenturies = new Set(artworks.map(a => a.century)).size;
  const uniqueMoods = new Set(artworks.map(a => a.mood)).size;

  // Group artworks by century
  const centuryGroups = artworks.reduce((acc, art) => {
    if (!acc[art.century]) acc[art.century] = [];
    acc[art.century].push(art);
    return acc;
  }, {} as Record<number, Artwork[]>);

  const sortedCenturies = Object.keys(centuryGroups)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <section
      id="global-impact"
      className="relative py-32 px-4"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(139,125,107,0.05),transparent)]" />

      <div
        className="relative z-10 max-w-6xl mx-auto"
        style={{
          maxWidth: '72rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
        }}
      >
        {/* Section heading */}
        <ScrollytellingSection animationType="fade-up" threshold={0.3}>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              A Museum Without Walls
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              From 11th century China to 20th century Nigeria—explore art that transcends borders, united by emotion, not geography
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-[#8B7D6B] to-transparent mx-auto mt-6" />
          </div>
        </ScrollytellingSection>

        {/* Stats Grid */}
        <ScrollytellingSection animationType="fade-up" delay={200} threshold={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20">
            <div className="text-center p-6 bg-white/[.02] border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/[.04] transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-[#8B7D6B] mb-2">
                <AnimatedCounter end={artworks.length} />
              </div>
              <div className="text-sm text-white/50 uppercase tracking-wider">Artworks</div>
            </div>

            <div className="text-center p-6 bg-white/[.02] border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/[.04] transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-[#8B7D6B] mb-2">
                <AnimatedCounter end={uniqueCities} />
              </div>
              <div className="text-sm text-white/50 uppercase tracking-wider">Cities</div>
            </div>

            <div className="text-center p-6 bg-white/[.02] border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/[.04] transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-[#8B7D6B] mb-2">
                <AnimatedCounter end={uniqueMuseums} />
              </div>
              <div className="text-sm text-white/50 uppercase tracking-wider">Museums</div>
            </div>

            <div className="text-center p-6 bg-white/[.02] border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/[.04] transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-[#8B7D6B] mb-2">
                <AnimatedCounter end={uniqueCenturies} />
              </div>
              <div className="text-sm text-white/50 uppercase tracking-wider">Centuries</div>
            </div>

            <div className="text-center p-6 bg-white/[.02] border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/[.04] transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-[#8B7D6B] mb-2">
                <AnimatedCounter end={uniqueMoods} />
              </div>
              <div className="text-sm text-white/50 uppercase tracking-wider">Moods</div>
            </div>
          </div>
        </ScrollytellingSection>

        {/* Timeline Visualization */}
        <ScrollytellingSection animationType="fade-up" delay={400} threshold={0.3}>
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Journey Through Time
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B7D6B]/20 via-[#8B7D6B]/50 to-[#8B7D6B]/20" />

              {/* Century markers */}
              <div className="relative flex justify-between items-start pb-4">
                {sortedCenturies.map((century, index) => (
                  <ScrollytellingSection
                    key={century}
                    animationType="fade-up"
                    delay={index * 150}
                    threshold={0.2}
                  >
                    <div className="flex flex-col items-center">
                      {/* Dot */}
                      <div className="w-4 h-4 bg-[#8B7D6B] rounded-full border-2 border-black shadow-lg shadow-[#8B7D6B]/50 mb-2" />

                      {/* Century label */}
                      <div className="text-center">
                        <div className="text-sm font-bold text-white mb-1">
                          {century}th
                        </div>
                        <div className="text-xs text-white/50">
                          {centuryGroups[century].length} works
                        </div>
                      </div>

                      {/* Sample artworks */}
                      <div className="mt-4 flex flex-col gap-2 min-w-[80px]">
                        {centuryGroups[century].slice(0, 2).map((art) => (
                          <div
                            key={art.id}
                            className="text-xs text-white/60 text-center line-clamp-1"
                            title={art.title}
                          >
                            {art.title}
                          </div>
                        ))}
                        {centuryGroups[century].length > 2 && (
                          <div className="text-xs text-white/40 text-center">
                            +{centuryGroups[century].length - 2}
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollytellingSection>
                ))}
              </div>
            </div>
          </div>
        </ScrollytellingSection>

        {/* Global Reach callout */}
        <ScrollytellingSection animationType="scale" delay={600} threshold={0.3}>
          <div className="p-8 md:p-12 bg-gradient-to-br from-[#8B7D6B]/10 to-transparent border border-[#8B7D6B]/20 rounded-3xl backdrop-blur-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Every Culture, Every Era, One Emotion
              </h3>
              <p className="text-lg text-white/70 leading-relaxed">
                Mythos doesn't care if you're looking at Chinese landscape painting or Mexican muralism.
                It finds the emotional throughline that connects humanity across time and space.
              </p>
            </div>
          </div>
        </ScrollytellingSection>
      </div>
    </section>
  );
};
