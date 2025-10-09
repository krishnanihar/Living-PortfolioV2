'use client';

import { useState } from 'react';
import { Icons } from './mythos-Icons';
import { ScrollytellingSection } from './ScrollytellingSection';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface TechnicalAccordionProps {
  items: AccordionItem[];
}

export const TechnicalAccordion = ({ items }: TechnicalAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <ScrollytellingSection
            key={index}
            animationType="fade-up"
            delay={index * 100}
            threshold={0.2}
          >
            <div className="bg-white/[.04] backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
              {/* Header */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left group"
                aria-expanded={isOpen}
              >
                <h3 className="text-xl font-bold text-white group-hover:text-[#E0D8C8] transition-colors">
                  {item.title}
                </h3>
                <Icons.chevronDown
                  className={`w-6 h-6 text-white/50 group-hover:text-white transition-all duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Content */}
              <div
                className={`grid transition-all duration-500 ease-smooth ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-2 text-white/70 leading-relaxed border-t border-white/5">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          </ScrollytellingSection>
        );
      })}
    </div>
  );
};
