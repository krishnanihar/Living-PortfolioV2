'use client';

import { ScrollytellingSection } from './ScrollytellingSection';
import { ExhibitionBuilder } from './mythos-ExhibitionBuilder';
import type { Exhibition, Artwork } from '@/types/mythos';

interface ActIVExperienceProps {
  onSummon: (prompt: string) => void;
  isLoading: boolean;
  error: string | null;
  exhibition: Exhibition | null;
  filteredArtworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

export const ActIVExperience = ({
  onSummon,
  isLoading,
  error,
  exhibition,
  filteredArtworks,
  onArtworkClick,
}: ActIVExperienceProps) => {
  return (
    <section
      id="the-experience"
      className="relative py-32 px-4"
      style={{
        paddingLeft: 'clamp(1rem, 5vw, 3rem)',
        paddingRight: 'clamp(1rem, 5vw, 3rem)',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />

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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See It In Action
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Try whispering a desire and watch as Mythos conjures a curated exhibition just for you
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-[#DA0E29] to-transparent mx-auto mt-6" />
          </div>
        </ScrollytellingSection>

        {/* Exhibition Builder - Sticky */}
        <ScrollytellingSection animationType="fade-up" delay={200} threshold={0.3}>
          <div className="mb-12">
            <ExhibitionBuilder
              onSummon={onSummon}
              isLoading={isLoading}
              error={error}
              isSticky={false}
            />
          </div>
        </ScrollytellingSection>

        {/* Exhibition Results */}
        {exhibition && (
          <ScrollytellingSection animationType="fade-up" delay={400} threshold={0.2}>
            <div className="mt-12 space-y-8">
              {/* Exhibition Header */}
              <div className="bg-white/[.04] backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#DA0E29]/20 rounded-xl flex items-center justify-center text-[#DA0E29]">
                    🏛️
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {exhibition.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {exhibition.statement}
                    </p>
                  </div>
                </div>

                {/* Criteria badges */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Exhibition Criteria:</span>
                  {exhibition.criteria.centuries.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/70"
                    >
                      {c}th Century
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/70">
                    {exhibition.criteria.mood}
                  </span>
                  {exhibition.criteria.motifs.slice(0, 3).map((m, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Artwork Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredArtworks.slice(0, 8).map((artwork, index) => (
                  <ScrollytellingSection
                    key={artwork.id}
                    animationType="scale"
                    delay={index * 100}
                    threshold={0.1}
                  >
                    <button
                      onClick={() => onArtworkClick(artwork)}
                      className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#DA0E29]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DA0E29]/20"
                    >
                      {/* Placeholder for artwork image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5" />

                      {/* Info overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-sm font-semibold text-white mb-1 line-clamp-1">
                            {artwork.title}
                          </p>
                          <p className="text-xs text-white/70 line-clamp-1">
                            {artwork.artist}
                          </p>
                          <p className="text-xs text-white/50 mt-1">
                            {artwork.year}
                          </p>
                        </div>
                      </div>

                      {/* Score badge */}
                      {artwork.score && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-[#DA0E29] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          {artwork.score.toFixed(1)}
                        </div>
                      )}
                    </button>
                  </ScrollytellingSection>
                ))}
              </div>

              {/* CTA to explore more */}
              {filteredArtworks.length > 8 && (
                <div className="text-center mt-8">
                  <p className="text-white/50 text-sm">
                    + {filteredArtworks.length - 8} more artworks in this exhibition
                  </p>
                </div>
              )}
            </div>
          </ScrollytellingSection>
        )}

        {/* No exhibition yet - show example */}
        {!exhibition && !isLoading && (
          <ScrollytellingSection animationType="fade-in" delay={600} threshold={0.3}>
            <div className="mt-12 text-center p-12 bg-white/[.02] border border-white/5 rounded-2xl">
              <p className="text-white/50 text-lg mb-6">
                Try one of the example prompts above to see the magic ✨
              </p>
              <p className="text-white/30 text-sm">
                Or craft your own poetic whisper...
              </p>
            </div>
          </ScrollytellingSection>
        )}
      </div>
    </section>
  );
};
