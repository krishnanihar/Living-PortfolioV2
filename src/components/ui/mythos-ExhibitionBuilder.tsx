'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EXAMPLE_PROMPTS, SUMMONING_MESSAGES } from '@/data/mythos-artworks';
import { Icons } from '@/components/ui/mythos-Icons';

// Add type definitions for SpeechRecognition API for browsers that support it
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: (() => void) | null;
    onend: (() => void) | null;
    onerror: ((event: any) => void) | null;
    onresult: ((event: any) => void) | null;
    start: () => void;
    stop: () => void;
}

declare global {
    interface Window {
        SpeechRecognition: { new (): SpeechRecognition };
        webkitSpeechRecognition: { new (): SpeechRecognition };
    }
}

interface ExhibitionBuilderProps {
    onSummon: (prompt: string) => void;
    isLoading: boolean;
    error: string | null;
    isSticky?: boolean;
}

export const ExhibitionBuilder = ({ onSummon, isLoading, error, isSticky = true }: ExhibitionBuilderProps) => {
    const [prompt, setPrompt] = useState('');
    const [loadingMessage, setLoadingMessage] = useState(SUMMONING_MESSAGES[0]);
    const [isListening, setIsListening] = useState(false);
    
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = SUMMONING_MESSAGES.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % SUMMONING_MESSAGES.length;
                    return SUMMONING_MESSAGES[nextIndex];
                });
            }, 800);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    const handleSummonClick = () => {
        if (prompt.length >= 5 && !isLoading) {
            onSummon(prompt);
        }
    };
    
    const handleExampleClick = (example: string) => {
        setPrompt(example);
        onSummon(example);
    }
    
    const handleSurpriseMe = () => {
        const randomPrompt = EXAMPLE_PROMPTS[Math.floor(Math.random() * EXAMPLE_PROMPTS.length)];
        setPrompt(randomPrompt);
        onSummon(randomPrompt);
    }
    
    const handleVoiceInput = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };
        
        let final_transcript = '';
        recognition.onresult = (event) => {
            let interim_transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            setPrompt(final_transcript + interim_transcript);
        };
        
        recognition.start();
        recognitionRef.current = recognition;
    };

    const wrapperClasses = isSticky
        ? "sticky top-20 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50 transition-all duration-300"
        : "bg-white/[.04] backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50 transition-all duration-300";

    return (
        <div className={wrapperClasses}>
            <div className="flex flex-col md:flex-row items-start gap-4">
                {isLoading ? (
                    <div className="w-full h-24 flex items-center justify-center gap-4">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 bg-[#DA0E29]/20 rounded-full animate-mystical-breathe"></div>
                            <div className="absolute inset-2 border-2 border-[#DA0E29] rounded-full animate-spin [animation-duration:3s]"></div>
                        </div>
                        <span className="text-lg text-white/80 animate-pulse">{loadingMessage}</span>
                    </div>
                ) : (
                    <>
                        <div className="relative w-full">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Speak or type your desire to Mythos..."
                                className="w-full h-24 md:h-auto md:flex-1 bg-white/5 border border-white/10 focus:border-[#DA0E29] focus:ring-2 focus:ring-[#DA0E29]/50 rounded-lg p-3 placeholder-white/30 transition-colors duration-300 resize-none pr-12"
                            />
                            <button
                                onClick={handleVoiceInput}
                                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                                    isListening ? 'bg-[#DA0E29] text-white animate-pulse' : 'bg-transparent text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                                aria-label="Use voice input"
                            >
                                <Icons.mic className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={handleSummonClick}
                            disabled={prompt.length < 5 || isLoading}
                            className="w-full md:w-auto px-6 py-3 bg-[#DA0E29] text-white font-semibold rounded-lg disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed hover:bg-red-500 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                           <Icons.sparkles className="w-5 h-5"/> Summon
                        </button>
                    </>
                )}
            </div>
            
            {!isLoading && error && (
                <div className="mt-4 text-center text-[#DA0E29] flex items-center justify-center gap-2">
                    <Icons.alert className="w-5 h-5"/>
                    <p>{error} Mythos remains silent.</p>
                </div>
            )}
            
            {!isLoading && (
                 <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                    <span className="text-white/50 mr-2">Try whispering:</span>
                    {EXAMPLE_PROMPTS.slice(0,3).map((ex) => (
                        <button key={ex} onClick={() => handleExampleClick(ex)} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#DA0E29] transition-colors">{ex}</button>
                    ))}
                    <button onClick={handleSurpriseMe} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#DA0E29] transition-colors flex items-center gap-1.5"><Icons.dice className="w-4 h-4" /> Surprise Me</button>
                </div>
            )}
        </div>
    );
};
