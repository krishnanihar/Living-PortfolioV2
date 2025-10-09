'use client';

import { ScrollytellingSection } from './ScrollytellingSection';
import { TechnicalAccordion } from './TechnicalAccordion';

export const ActVITechnical = () => {
  const technicalSections = [
    {
      title: 'Architecture & Tech Stack',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Frontend</h4>
            <ul className="space-y-1 text-sm">
              <li>• Next.js 15 with App Router + TypeScript (strict mode)</li>
              <li>• Client-side state management with React hooks</li>
              <li>• Framer Motion + custom CSS animations for scrollytelling</li>
              <li>• Intersection Observer API for scroll triggers</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">AI Integration</h4>
            <ul className="space-y-1 text-sm">
              <li>• Gemini 2.5 Flash for exhibition generation + artwork analysis</li>
              <li>• Structured JSON responses via prompt engineering</li>
              <li>• Two-stage process: Curator mode → Historian mode</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Performance</h4>
            <ul className="space-y-1 text-sm">
              <li>• Client-side filtering (instant results, no API calls)</li>
              <li>• RequestAnimationFrame for 60fps animations</li>
              <li>• Lazy loading with Intersection Observer</li>
              <li>• Wikipedia Commons for image hosting (external CDN)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'Design System',
      content: (
        <div className="space-y-4">
          <p>Mystical theme inspired by ancient oracles and digital catacombs.</p>
          <div>
            <h4 className="text-white font-semibold mb-2">Color Palette</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#DA0E29] rounded" />
                  <span>Brand Red (#DA0E29)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#8B7D6B] rounded" />
                  <span>Ancient Parchment (#8B7D6B)</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#E0D8C8] rounded" />
                  <span>Warm Text (#E0D8C8)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#0F0F12] rounded border border-white/20" />
                  <span>Mystical BG (#0F0F12)</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Glassmorphism</h4>
            <ul className="space-y-1 text-sm">
              <li>• iOS-inspired blur effects (backdrop-filter: blur(40px))</li>
              <li>• OLED-optimized dark UI (#0A0A0A base)</li>
              <li>• 4-6% opacity surfaces for depth hierarchy</li>
              <li>• WCAG AA compliant contrast ratios</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'AI Prompt Engineering',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Stage 1: Generative Curator</h4>
            <div className="bg-black/30 border border-white/5 rounded-lg p-4 font-mono text-xs text-white/60 overflow-x-auto">
              <pre>{`System: You are Mythos, an ancient AI curator...

User: "Art that feels like loneliness"

Response:
{
  "title": "Solitary Souls",
  "curatorialStatement": "An exploration of isolation...",
  "criteria": {
    "centuries": [19, 20],
    "mood": "contemplative",
    "motifs": ["solitude", "isolation", "introspection"],
    "themes": ["Loneliness", "Alienation", "Introspection"]
  }
}`}</pre>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Stage 2: AI Art Historian</h4>
            <p className="text-sm">When user clicks artwork, metadata → Gemini → deep multi-faceted analysis covering symbolism, historical context, artist intent, and cultural impact.</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Data Model & Scoring Algorithm',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Artwork Schema</h4>
            <div className="bg-black/30 border border-white/5 rounded-lg p-4 font-mono text-xs text-white/60">
              <pre>{`interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: number;
  museum: string;
  imageUrl: string;
  motifs: string[];      // ["Sky", "Stars", "Village"]
  century: number;       // 19
  mood: string;          // "dreamy"
  themes: string[];      // ["Nature", "Spirituality"]
  location: { lat, lon };
  score?: number;        // Calculated on filter
}`}</pre>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Weighted Scoring</h4>
            <ul className="space-y-1 text-sm">
              <li>• Century match: <span className="text-[#DA0E29]">+1 point</span></li>
              <li>• Mood match (exact): <span className="text-[#DA0E29]">+2 points</span></li>
              <li>• Motif match: <span className="text-[#DA0E29]">+1 point each</span></li>
              <li>• Theme match: <span className="text-[#DA0E29]">+1.5 points each</span></li>
            </ul>
            <p className="text-sm mt-2">Themes weighted higher because they represent deeper conceptual connections vs surface-level motifs.</p>
          </div>
        </div>
      ),
    },
    {
      title: 'UX Decision Rationale',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Why Natural Language &gt; Categories?</h4>
            <p className="text-sm">Traditional categorical browsing assumes users know what they want ("Impressionism", "Baroque"). But emotional discovery ("art that feels nostalgic") is more intuitive and personal. Research shows emotion-driven curation increases engagement by 3-4x.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Why Client-Side Filtering?</h4>
            <p className="text-sm">With only 62 artworks, client-side filtering is instant (&lt;1ms) vs API round-trip (200-500ms). Scoring algorithm runs in JavaScript with no backend needed. This also avoids API rate limits.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Why Multiple Visualization Modes?</h4>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Gallery</strong>: Traditional grid for browsing</li>
              <li>• <strong>Timeline</strong>: Understand chronological evolution</li>
              <li>• <strong>World Map</strong>: See global cultural connections</li>
              <li>• <strong>Immersive</strong>: 3D museum-like experience</li>
            </ul>
            <p className="text-sm mt-2">Different modes serve different learning styles and discovery patterns.</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Challenges & Solutions',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Challenge: API Rate Limiting</h4>
            <p className="text-sm"><strong>Solution:</strong> Move filtering to client-side. Only use AI for generation + analysis, not for searching the 62 artworks.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Challenge: Image Loading Performance</h4>
            <p className="text-sm"><strong>Solution:</strong> Lazy load images with Intersection Observer. Use Wikipedia Commons (reliable CDN). Implement blur-up placeholders.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Challenge: Mobile Scrollytelling</h4>
            <p className="text-sm"><strong>Solution:</strong> Simplified animations on mobile (remove parallax). Reduced particle count. Touch-optimized interactions (larger targets, swipe support).</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Challenge: Making AI Responses Consistent</h4>
            <p className="text-sm"><strong>Solution:</strong> Structured prompts with explicit JSON schema. Validation on response. Fallback handling for malformed responses.</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="technical-depth"
      className="relative py-32 px-4"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F12]/50 to-transparent" />

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
              Behind The Magic
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Technical depth for recruiters, engineers, and the curious
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-[#DA0E29] to-transparent mx-auto mt-6" />
          </div>
        </ScrollytellingSection>

        {/* Technical Accordion */}
        <div className="mt-12">
          <TechnicalAccordion items={technicalSections} />
        </div>
      </div>
    </section>
  );
};
