'use client';

import React from 'react';
import { ProjectCarousel, ContactCard, ActionGrid, SkillTags } from './cards';

interface ParsedCard {
  type: 'projects' | 'contact' | 'actions' | 'skills';
  data: string[];
}

interface CardRendererProps {
  content: string;
  onClose?: () => void;
}

/**
 * Parse card blocks from message content
 * Format: [CARD:type]data1,data2[/CARD]
 */
export function parseCards(content: string): { cleanContent: string; cards: ParsedCard[] } {
  const cards: ParsedCard[] = [];
  let cleanContent = content;

  // Match all card blocks
  const cardRegex = /\[CARD:(projects|contact|actions|skills)\]([\s\S]*?)\[\/CARD\]/g;
  let match;

  while ((match = cardRegex.exec(content)) !== null) {
    const type = match[1] as ParsedCard['type'];
    const rawData = match[2].trim();

    // Parse comma-separated data (if any)
    const data = rawData
      ? rawData.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    cards.push({ type, data });
  }

  // Remove card blocks from content
  cleanContent = content.replace(cardRegex, '').trim();

  return { cleanContent, cards };
}

/**
 * Render cards based on parsed card data
 */
export function CardRenderer({ content, onClose }: CardRendererProps) {
  const { cards } = parseCards(content);

  if (cards.length === 0) return null;

  return (
    <>
      {cards.map((card, index) => {
        switch (card.type) {
          case 'projects':
            return (
              <ProjectCarousel
                key={`card-${index}`}
                projectSlugs={card.data.length > 0 ? card.data : ['air-india', 'cleara', 'mythos']}
                onClose={onClose}
              />
            );

          case 'contact':
            return <ContactCard key={`card-${index}`} onClose={onClose} />;

          case 'actions':
            return (
              <ActionGrid
                key={`card-${index}`}
                actions={card.data.length > 0 ? card.data : ['projects', 'contact', 'resume', 'about']}
                onClose={onClose}
              />
            );

          case 'skills':
            return (
              <SkillTags
                key={`card-${index}`}
                skills={card.data.length > 0 ? card.data : ['figma', 'react', 'design-systems', 'typescript']}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}

export default CardRenderer;
