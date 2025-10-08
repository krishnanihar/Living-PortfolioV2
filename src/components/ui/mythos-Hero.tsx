'use client';

import React from 'react';
import { Icons } from '@/components/ui/mythos-Icons';

const ValueProp = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2 text-[#E0D8C8]">
            {icon}
            <h3 className="font-semibold text-white">{title}</h3>
        </div>
        <p className="text-white/70 text-sm">{children}</p>
    </div>
);

export const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center text-center relative overflow-hidden">
            <div
                className="absolute inset-0 -top-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(218,14,41,0.1),rgba(255,255,255,0))] pointer-events-none"></div>

            <div className="relative z-10 px-4">
                <div style={{ animationDelay: '0.3s' }} className="animate-fade-in-up inline-block mb-6">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full animate-badge-pulse backdrop-blur-sm">
                        <Icons.oracle className="w-4 h-4 text-[#DA0E29]"/>
                        <span className="text-sm font-medium text-white/80">Mythos</span>
                    </div>
                </div>

                <h1 style={{ animationDelay: '0.6s' }}
                    className="animate-fade-in-up font-bold text-white tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,8vw,5rem)]">
                    The Archive Awakens
                </h1>
                <h1 style={{ animationDelay: '0.9s' }}
                    className="animate-fade-in-up font-bold tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,8vw,5rem)] gradient-shimmer">
                    Speak Your Desire
                </h1>

                <p style={{ animationDelay: '1.2s' }}
                   className="animate-fade-in-up max-w-2xl mx-auto mt-6 text-base md:text-lg text-white/70">
                    Deep in the digital catacombs, an ancient AI has stirred. It holds the memory of every brushstroke, every canvas, every masterpiece. Whisper your vision, and it will conjure an exhibition just for you. No ancient knowledge required.
                </p>

                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-12 text-left">
                    <div style={{ animationDelay: '1.5s' }} className="animate-fade-in-up">
                        <ValueProp icon={<Icons.eye className="w-5 h-5"/>} title="Understands Intent">
                            It deciphers the poetry behind your words, grasping mood, theme, and aesthetic.
                        </ValueProp>
                    </div>
                    <div style={{ animationDelay: '1.7s' }} className="animate-fade-in-up">
                        <ValueProp icon={<Icons.link className="w-5 h-5"/>} title="Sees Connections">
                            It finds the hidden threads connecting art across centuries, cultures, and styles.
                        </ValueProp>
                    </div>
                    <div style={{ animationDelay: '1.9s' }} className="animate-fade-in-up">
                        <ValueProp icon={<Icons.lightbulb className="w-5 h-5"/>} title="Explains Why">
                            Mythos reveals its reasoning, teaching you to see art through its ancient eyes.
                        </ValueProp>
                    </div>
                </div>
            </div>
            
            <a href="#main-content" aria-label="Scroll to main content" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-scroll-down">
                <Icons.arrowDown className="w-8 h-8 text-white/50" />
            </a>
        </section>
    );
};