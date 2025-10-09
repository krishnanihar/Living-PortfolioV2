'use client';

import { ScrollytellingSection } from './ScrollytellingSection';
import { AnimatedCounter } from './AnimatedCounter';

export const ActIIProblem = () => {
  return (
    <section id="the-problem" className="relative py-32 px-4">
      {/* Parallax background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F12] to-transparent opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section heading */}
        <ScrollytellingSection animationType="fade-up" threshold={0.3}>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Art Galleries Are Intimidating
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#DA0E29] to-transparent mx-auto" />
          </div>
        </ScrollytellingSection>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image/Visual */}
          <ScrollytellingSection animationType="slide-right" threshold={0.3}>
            <div className="relative">
              {/* Decorative frame */}
              <div className="aspect-[4/5] bg-white/[.02] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="h-full flex flex-col justify-center space-y-8 text-white/40">
                  {/* Simulated museum categories - rigid and uninspiring */}
                  <div className="space-y-3">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-full" />
                    <div className="h-3 bg-white/10 rounded w-2/3" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-white/10 rounded w-full" />
                    <div className="h-3 bg-white/10 rounded w-5/6" />
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-white/10 rounded w-2/3" />
                    <div className="h-3 bg-white/10 rounded w-full" />
                    <div className="h-3 bg-white/10 rounded w-4/5" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-10">?</span>
                  </div>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#DA0E29]/10 rounded-full blur-3xl" />
            </div>
          </ScrollytellingSection>

          {/* Right: Problem statements */}
          <div className="space-y-8">
            <ScrollytellingSection animationType="slide-left" delay={200} threshold={0.3}>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#DA0E29]/20 flex items-center justify-center text-[#DA0E29] font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Rigid Categories
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Museums organize by period, region, or medium—but that's not how you <em>feel</em> art.
                  </p>
                </div>
              </div>
            </ScrollytellingSection>

            <ScrollytellingSection animationType="slide-left" delay={400} threshold={0.3}>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#DA0E29]/20 flex items-center justify-center text-[#DA0E29] font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Overwhelming Catalogs
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Thousands of works with no guidance. Where do you even start?
                  </p>
                </div>
              </div>
            </ScrollytellingSection>

            <ScrollytellingSection animationType="slide-left" delay={600} threshold={0.3}>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#DA0E29]/20 flex items-center justify-center text-[#DA0E29] font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    No Emotional Connection
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    There's no bridge between what you're feeling and what's on the walls.
                  </p>
                </div>
              </div>
            </ScrollytellingSection>
          </div>
        </div>

        {/* Transition statement */}
        <ScrollytellingSection animationType="fade-up" delay={800} threshold={0.3}>
          <div className="mt-20 text-center">
            <p className="text-2xl md:text-3xl font-semibold text-white/90 mb-8">
              What if art could find <span className="text-[#E0D8C8] gradient-shimmer">you</span>, instead?
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#DA0E29] mb-2">
                  <AnimatedCounter end={62} />
                </div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Masterworks</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#DA0E29] mb-2">
                  <AnimatedCounter end={1000} />
                </div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Years</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#DA0E29] mb-2">
                  ∞
                </div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Emotions</div>
              </div>
            </div>
          </div>
        </ScrollytellingSection>
      </div>
    </section>
  );
};
