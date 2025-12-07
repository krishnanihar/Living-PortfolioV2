'use client';

import React, { useState, useEffect } from 'react';
import { JourneyCard } from './JourneyCard';
import { Beaker } from 'lucide-react';

/**
 * JourneySection Component
 *
 * Main container for the 3-card professional journey display
 * - NID (Foundation) - 280×420px
 * - Air India (Current) - 320×460px
 * - Future Research (Vision) - 360×500px (HERO)
 *
 * Features:
 * - Dramatic scale hierarchy
 * - Click-to-scroll navigation
 * - Responsive layout (flex desktop, stack mobile)
 * - Staggered reveal animations
 */
export function JourneySection() {
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to corresponding section when card is clicked
  const handleCardClick = (actId: string) => {
    // Define scroll positions for each act/section
    const actPositions: Record<string, number> = {
      innovation: 0.6,   // NID → Research triptych section (middle of page)
      industry: 0.3,     // Air India → Air India case study (early in page)
      experiments: 0.85, // Future → Experiments/research section (near bottom)
    };

    const position = actPositions[actId] || 0;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: scrollHeight * position,
      behavior: 'smooth',
    });
  };

  // Card data
  const cards = [
    {
      organization: 'National Institute of Design',
      role: 'M.Des Information & Interface Design',
      timeframe: '2021 - 2023',
      status: 'Education' as const,
      logo: 'nid.svg',
      description: 'Explored systems thinking, design research, and human-computer interaction through intensive studio practice and theory.',
      highlights: [
        { label: 'Research Papers', value: '3' },
        { label: 'Prototypes', value: '12+' },
      ],
      projects: ['Latent Space', 'Metamorphic Fractal', 'mythOS'],
      actId: 'innovation',
      color: '#2A9D8F', // Teal accent
      size: { width: 320, minHeight: 480 },
    },
    {
      organization: 'Air India',
      role: 'Lead Designer',
      timeframe: '2024 - Present',
      status: 'Current' as const,
      logo: 'air-india.svg',
      description: 'Leading design for India\'s flag carrier, creating enterprise systems that serve 10,000+ daily users across aviation operations.',
      highlights: [
        { label: 'Daily Users', value: '10K+' },
        { label: 'Systems', value: '5+' },
      ],
      projects: ['Pixel Radar', 'Aviation Analytics', 'Design Systems'],
      actId: 'industry',
      color: '#DA0E29', // Brand red
      size: { width: 360, minHeight: 520 },
    },
    {
      organization: 'Future Research & Experiments',
      role: 'Independent Research',
      timeframe: '2025+',
      status: 'Future' as const,
      icon: <Beaker size={64} strokeWidth={1.5} />,
      description: 'Exploring AI-augmented design tools, generative interfaces, and consciousness-aware interaction paradigms.',
      highlights: [
        { label: 'Focus Areas', value: '3' },
        { label: 'Experiments', value: 'Ongoing' },
      ],
      projects: ['AI Design Tools', 'Generative UI', 'Consciousness Research'],
      actId: 'experiments',
      color: '#8B5CF6', // Purple accent
      size: { width: 400, minHeight: 560 }, // HERO - tallest card
    },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '24px' : '40px',
      justifyContent: 'center',
      alignItems: isMobile ? 'center' : 'flex-start',
      maxWidth: '1400px',
      width: '100%',
      padding: isMobile ? '0 1rem' : '0 2rem',
    }}>
      {cards.map((card, index) => (
        <JourneyCard
          key={card.organization}
          {...card}
          onClick={() => handleCardClick(card.actId)}
        />
      ))}
    </div>
  );
}
