'use client';

import { ScrollytellingSection } from './ScrollytellingSection';
import { ProcessDiagram } from './ProcessDiagram';

export const ActIIIInnovation = () => {
  const processSteps = [
    {
      number: 1,
      title: 'The Whisper',
      icon: 'mic' as const,
      description: 'You start by "whispering" a desire. This can be anything from "art about loneliness" to "dramatic use of light in the 17th century." The more poetic and descriptive, the better.',
      example: '"Art that feels like loneliness"',
    },
    {
      number: 2,
      title: 'The Summoning',
      icon: 'sparkles' as const,
      description: 'Your whisper is sent to Gemini 2.5 Flash. It acts as "Mythos" and responds with a structured exhibition containing a title, curatorial statement, and specific criteria.',
      example: [
        '{ centuries: [19, 20],',
        '  mood: "contemplative",',
        '  motifs: ["solitude", "isolation"],',
        '  themes: ["Isolation", "Introspection"] }',
      ],
    },
    {
      number: 3,
      title: 'The Revelation',
      icon: 'search' as const,
      description: 'The AI criteria are used to filter 62 masterworks. Each artwork is scored by how well it matches your emotional and thematic desires. The gallery instantly updates with the top 10 pieces.',
      example: 'Scoring: Century match (+1) • Mood match (+2) • Motif match (+1 each) • Theme match (+1.5 each)',
    },
    {
      number: 4,
      title: 'The Scrying',
      icon: 'scroll' as const,
      description: 'Click any artwork to send its metadata back to Gemini. The AI becomes an "Art Historian," generating deep insights on symbolism, historical context, artist intent, and cultural impact.',
      example: '"The Scream (1893): A visual manifestation of existential anxiety, where Munch captures the psychological weight of modern existence through distorted forms and intense color..."',
    },
  ];

  return (
    <section
      id="the-innovation"
      className="relative py-32 px-4"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(218,14,41,0.05),transparent)]" />

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
              How Mythos Works
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              A two-stage AI process that translates your emotions into curated exhibitions
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-[#DA0E29] to-transparent mx-auto mt-6" />
          </div>
        </ScrollytellingSection>

        {/* Process diagram */}
        <div className="mt-16">
          <ProcessDiagram steps={processSteps} />
        </div>

        {/* Key innovation callout */}
        <ScrollytellingSection animationType="scale" delay={600} threshold={0.3}>
          <div className="mt-20 p-8 md:p-12 bg-gradient-to-br from-[#DA0E29]/10 to-transparent border border-[#DA0E29]/20 rounded-3xl backdrop-blur-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                The Key Innovation
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Traditional galleries ask <span className="text-white font-semibold">"What do you want to see?"</span>
                {' '}—sorted by artist, period, or region.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mt-4">
                Mythos asks <span className="text-[#E0D8C8] font-semibold">"What do you want to feel?"</span>
                {' '}—and builds an exhibition around your emotional state.
              </p>
            </div>
          </div>
        </ScrollytellingSection>
      </div>
    </section>
  );
};
