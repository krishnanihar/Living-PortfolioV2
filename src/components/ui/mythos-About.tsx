'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/ui/mythos-Icons';

const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left font-semibold text-white/90"
            >
                {title}
                <Icons.chevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="pb-4 text-white/70">{children}</div>
                </div>
            </div>
        </div>
    );
};

export const About = () => {
    return (
        <section style={{
            paddingTop: 'var(--space-16)',
            paddingBottom: 'var(--space-16)',
            marginTop: 'var(--space-16)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">About mythOS</h2>
                <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">An experiment in generative art curation and analysis.</p>
            </div>

            <div className="space-y-12 max-w-4xl mx-auto">
                <div>
                    <h3 className="text-xl font-bold text-[#E0D8C8] mb-4">Why mythOS Exists</h3>
                    <p className="text-white/70 leading-relaxed">
                        Art galleries can be intimidating. mythOS was created to break down those barriers, transforming art discovery into a personal conversation. Instead of relying on pre-defined categories, it invites you to express a feeling, a theme, or a fragment of an idea, and watch as a unique exhibition materializes from the digital ether. It's about finding art that speaks to you, personally.
                    </p>
                </div>

                 <div>
                    <h3 className="text-xl font-bold text-[#E0D8C8] mb-4">The Key Innovation</h3>
                    <p className="text-white/70 leading-relaxed">
                        The core of mythOS is its two-stage AI process. First, it acts as a "Generative Curator," translating your natural language into structured, filterable exhibition criteria. Then, when you select an artwork, it becomes an "AI Art Historian," providing a deep, multi-faceted analysis on demand. This creates a dynamic, responsive, and deeply educational journey through art history.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-[#E0D8C8] mb-4">How It Works</h3>
                    <div className="mt-4 space-y-2">
                        <AccordionItem title="1. The Whisper (Your Input)">
                           You start by "whispering" a desire into the summoning chamber. This can be anything from "art about loneliness" to "dramatic use of light in the 17th century." The more poetic and descriptive, the better.
                        </AccordionItem>
                        <AccordionItem title="2. The Summoning (Exhibition Generation)">
                            Your whisper is sent to the Gemini 2.5 Flash model. It's been instructed to act as "Mythos" and respond with a structured JSON object containing an exhibition title, a curatorial statement, and specific criteria (motifs, mood, centuries, themes).
                        </AccordionItem>
                        <AccordionItem title="3. The Revelation (Filtering)">
                            The criteria from the AI are used to filter a local database of artworks. The gallery instantly updates to show only the pieces that match Mythos's vision.
                        </AccordionItem>
                         <AccordionItem title="4. The Scrying (Artwork Analysis)">
                           When you click on an artwork, its metadata is sent back to Gemini. The AI then performs a detailed analysis, generating insights on everything from symbolism to historical context, again returning a structured JSON object.
                        </AccordionItem>
                    </div>
                </div>
            </div>
        </section>
    );
};