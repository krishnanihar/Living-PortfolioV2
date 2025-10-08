'use client';

import React, { useEffect, useState } from 'react';
import { Artwork, AIAnalysis } from '@/types/mythos';
import { Icons } from '@/components/ui/mythos-Icons';
import { ANALYSIS_MESSAGES } from '@/data/mythos-artworks';

interface ArtworkModalProps {
    artwork: Artwork;
    analysis: AIAnalysis | null;
    imageUrl: string;
    isLoading: boolean;
    error: string | null;
    onClose: () => void;
    onRetry: () => void;
    onSummonFromTag: (prompt: string) => void;
}

const AnalysisSection = ({ title, children, icon }: { title: string; children: React.ReactNode; icon: React.ReactNode }) => (
    <div className="mb-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-white/90 mb-2">
            {icon} {title}
        </h3>
        <div className="text-white/70 space-y-2">{children}</div>
    </div>
);

export const ArtworkModal = ({ artwork, analysis, imageUrl, isLoading, error, onClose, onRetry, onSummonFromTag }: ArtworkModalProps) => {
    const [loadingMessage, setLoadingMessage] = useState(ANALYSIS_MESSAGES[0]);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup speech synthesis on close
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.speechSynthesis?.cancel();
        }
    }, [onClose]);
    
     useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = ANALYSIS_MESSAGES.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % ANALYSIS_MESSAGES.length;
                    return ANALYSIS_MESSAGES[nextIndex];
                });
            }, 800);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    const handleListen = () => {
        if (!analysis || !window.speechSynthesis) return;

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const textToSpeak = `
            Analysis for ${artwork.title} by ${artwork.artist}.
            Visual Analysis: ${analysis.visualAnalysis}.
            Symbolism: ${analysis.symbolism.map(s => `${s.element}: ${s.meaning}`).join('. ')}.
            Historical Context: ${analysis.historicalContext}.
            Cultural Significance: ${analysis.culturalSignificance}.
        `;

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in-up" style={{ animationDuration: '0.4s' }}>
            <div className="absolute inset-0 bg-[#0A0A12]/90 backdrop-blur-md" onClick={onClose}></div>
            <div className="absolute inset-0 scanline"></div>

            <div className="relative z-10 w-full max-w-6xl h-full md:h-[90vh] bg-[#101018] border border-white/10 rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden">
                 <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-[#DA0E29] hover:rotate-90 transition-all duration-300 z-20">
                    <Icons.close className="w-7 h-7"/>
                </button>

                <div className="w-full md:w-1/2 h-1/3 md:h-full relative overflow-hidden bg-[#111]">
                     <img src={imageUrl} alt={artwork.title} className="w-full h-full object-cover"/>
                     
                     {analysis && analysis.identifiedObjects && (
                         <div className="artwork-overlay-container">
                             {analysis.identifiedObjects.map((obj, index) => (
                                 <button
                                     key={index}
                                     className="artwork-overlay-box"
                                     style={{
                                         left: `${obj.boundingBox.x * 100}%`,
                                         top: `${obj.boundingBox.y * 100}%`,
                                         width: `${obj.boundingBox.width * 100}%`,
                                         height: `${obj.boundingBox.height * 100}%`,
                                     }}
                                     onClick={() => onSummonFromTag(`Art featuring: ${obj.label}`)}
                                     aria-label={`Summon an exhibition about ${obj.label}`}
                                 >
                                     <span className="artwork-overlay-label">{obj.label}</span>
                                 </button>
                             ))}
                         </div>
                     )}

                     <div className="absolute inset-0 bg-gradient-to-t from-[#101018] md:bg-gradient-to-r md:from-[#101018] to-transparent pointer-events-none"></div>
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                    <div className="flex items-start justify-between">
                        <div>
                             <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">{artwork.title}</h2>
                             <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/50 mb-6">
                                <span className="flex items-center gap-1.5"><Icons.artist className="w-4 h-4"/> {artwork.artist}</span>
                                <span className="flex items-center gap-1.5"><Icons.calendar className="w-4 h-4"/> {artwork.year}</span>
                                <span className="flex items-center gap-1.5"><Icons.museum className="w-4 h-4"/> {artwork.museum}</span>
                            </div>
                        </div>
                        {!artwork.isCapstone && (
                            <button onClick={handleListen} className={`ml-4 p-2.5 bg-white/5 rounded-full hover:bg-[#DA0E29] hover:text-white transition-colors ${isSpeaking ? 'text-[#DA0E29]' : 'text-white/70'}`} aria-label="Listen to analysis">
                                {isSpeaking ? <Icons.pause className="w-5 h-5"/> : <Icons.play className="w-5 h-5"/>}
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {artwork.motifs.map(motif => (
                            <span key={motif} className="px-2 py-0.5 text-xs bg-white/5 border border-white/10 text-white/70 rounded-full">{motif}</span>
                        ))}
                    </div>
                    
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-1/2 text-white/70">
                            <div className="relative w-16 h-16 mb-4">
                               <div className="absolute inset-0 bg-[#DA0E29]/20 rounded-full animate-mystical-breathe"></div>
                               <div className="absolute inset-2 border-2 border-[#DA0E29] rounded-full animate-spin [animation-duration:3s]"></div>
                           </div>
                            <p>{loadingMessage}</p>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center justify-center h-1/2 text-[#DA0E29]">
                            <Icons.alert className="w-10 h-10 mb-4"/>
                            <p className="font-semibold">{error}</p>
                             <button onClick={onRetry} className="mt-4 px-4 py-2 bg-white/10 border border-[#DA0E29] text-white rounded-lg hover:bg-[#DA0E29]/20 transition-colors">Retry</button>
                        </div>
                    )}
                    
                    {artwork.isCapstone && (
                        <div className="flex flex-col items-center justify-center h-1/2 text-white/70">
                           <Icons.wand className="w-12 h-12 text-[#DA0E29] mb-4"/>
                           <h3 className="text-xl font-bold text-white">A New Vision</h3>
                           <p className="text-center mt-2">This capstone was generated by Mythos from the ether, a unique masterpiece for your exhibition.</p>
                        </div>
                    )}

                    {analysis && (
                        <div className="animate-fade-in-up" style={{ animationDuration: '0.6s' }}>
                            <AnalysisSection title="Visual Analysis" icon={<Icons.eye className="w-5 h-5"/>}>
                                <p>{analysis.visualAnalysis}</p>
                            </AnalysisSection>
                            <AnalysisSection title="Symbolism" icon={<Icons.key className="w-5 h-5"/>}>
                               <ul className="space-y-2">
                                   {analysis.symbolism.map(s => (
                                       <li key={s.element}><strong>{s.element}:</strong> {s.meaning}</li>
                                   ))}
                               </ul>
                            </AnalysisSection>
                            <AnalysisSection title="Historical Context" icon={<Icons.scroll className="w-5 h-5"/>}>
                                <p>{analysis.historicalContext}</p>
                            </AnalysisSection>
                             <AnalysisSection title="Cultural Significance" icon={<Icons.globe className="w-5 h-5"/>}>
                                <p>{analysis.culturalSignificance}</p>
                            </AnalysisSection>
                             <AnalysisSection title="Personal Connection" icon={<Icons.heart className="w-5 h-5"/>}>
                                <p>{analysis.personalConnection}</p>
                            </AnalysisSection>
                            
                            {analysis.worldlyEchoes && (analysis.worldlyEchoes.summary || analysis.worldlyEchoes.sources.length > 0) && (
                                <AnalysisSection title="Worldly Echoes" icon={<Icons.search className="w-5 h-5"/>}>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                        <p className="text-sm italic text-white/70">{analysis.worldlyEchoes.summary}</p>
                                        {analysis.worldlyEchoes.sources.length > 0 && (
                                            <div className="mt-4 pt-3 border-t border-white/10">
                                                <h4 className="font-semibold text-xs text-white/50 mb-2 uppercase tracking-wider">Sources</h4>
                                                <ul className="space-y-1">
                                                    {analysis.worldlyEchoes.sources.map((source, index) => (
                                                        <li key={index}>
                                                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#DA0E29] hover:underline underline-offset-2 break-all">
                                                                <Icons.externalLink className="w-3 h-3 flex-shrink-0" />
                                                                <span className="truncate">{source.title}</span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </AnalysisSection>
                            )}

                            <div className="flex flex-wrap gap-2 mt-6">
                                {analysis.relatedThemes.map(theme => (
                                    <span key={theme} className="px-2 py-0.5 text-xs bg-[#DA0E29]/10 border border-[#DA0E29]/50 text-[#E0D8C8] rounded-full">{theme}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};