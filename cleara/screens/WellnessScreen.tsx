import React, { useState } from 'react';
import { ArrowLeft, X, Sparkles, Loader2 } from 'lucide-react';
import { Screen } from '../types';
import { GoogleGenAI } from "@google/genai";

interface WellnessScreenProps {
  onNavigate: (screen: Screen) => void;
}

const QUESTIONS = [
  "Have you felt tired or low on energy?",
  "Have you felt little interest in doing things?",
  "Have you felt down, depressed, or hopeless?"
];

const OPTIONS = [
  "Not really",
  "Sometimes",
  "Often",
  "Most days"
];

const WellnessScreen: React.FC<WellnessScreenProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(0); // 0 = Intro, 1-3 = Questions, 4 = Result
  const [answers, setAnswers] = useState<number[]>([]);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAnswer = (val: number) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length) {
      setStep(prev => prev + 1);
    } else {
      setStep(4); // Result
    }
  };

  const getAiGuidance = async () => {
    setLoadingAi(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
          The user answered a wellness check-in (PHQ-9 simplified).
          Questions:
          1. Tired/low energy: ${OPTIONS[answers[0]]}
          2. Little interest: ${OPTIONS[answers[1]]}
          3. Depressed/hopeless: ${OPTIONS[answers[2]]}
          
          Task: Provide a gentle, warm, and poetic "Healing Note" (max 2 sentences).
          Then provide 3 very specific, simple, sensory-based self-care rituals for a psoriasis patient feeling this way.
          Format the output as simple text, no markdown. 
          Tone: Like a caring friend, watercolor aesthetic, calming.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        setAiAdvice(response.text || "Rest is a revolution. Take a moment to breathe deeply today.");
    } catch (error) {
        console.error("AI Error", error);
        setAiAdvice("The most important thing right now is to be gentle with yourself. \n\n• Drink a glass of cool water.\n• Listen to your favorite song.\n• Rest your eyes for 5 minutes.");
    } finally {
        setLoadingAi(false);
    }
  };

  if (step === 0) {
    return (
      <div className="h-full flex flex-col justify-center px-8 text-center animate-fade-in relative">
        <button onClick={() => onNavigate(Screen.Home)} className="absolute top-8 left-6 text-charcoal/40">
            <X size={28} />
        </button>
        
        <div className="mb-12 relative flex justify-center">
             <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/50 shadow-xl">
                <img 
                    src="https://images.unsplash.com/photo-1544367563-12123d832d34?auto=format&fit=crop&q=80&w=600" 
                    alt="Calm water and stones" 
                    className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-1000"
                />
             </div>
             <div className="absolute inset-0 bg-lavender/20 blur-3xl rounded-full -z-10" />
        </div>
        
        <h1 className="font-serif text-4xl text-charcoal mb-6 leading-tight">
          Taking a moment for yourself is an act of healing.
        </h1>
        <p className="font-sans text-charcoal/60 mb-12 leading-relaxed">
          We'll ask a few gentle questions to understand how you're feeling lately. No judgment, just clarity.
        </p>
        <button 
          onClick={() => setStep(1)}
          className="w-full bg-charcoal text-white font-display font-medium py-4 rounded-2xl shadow-lg shadow-lavender/20 active:scale-95 transition-transform"
        >
          Begin Check-in
        </button>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="h-full flex flex-col px-6 pt-12 animate-fade-in overflow-y-auto">
        <div className="flex-1 pb-20">
             {/* Header Image */}
            <div className="relative w-full h-48 rounded-[32px] overflow-hidden mb-8 shadow-sm">
                <img 
                    src="https://images.unsplash.com/photo-1516575334481-f85287c2c81d?auto=format&fit=crop&q=80&w=800" 
                    alt="Gentle flower" 
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas to-transparent" />
            </div>

            <span className="font-display font-bold text-blush tracking-wider uppercase text-sm mb-2 block">Reflection</span>
            <h2 className="font-serif text-4xl text-charcoal mb-6">💜 You're not alone</h2>
            
            <p className="font-sans text-lg text-charcoal/80 mb-6 leading-relaxed">
              Your check-in suggests you might benefit from some extra support right now.
            </p>

            {/* Standard Advice */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm space-y-4 mb-6">
               <h3 className="font-display font-bold text-charcoal">🌸 This is common</h3>
               <p className="font-sans text-charcoal/60 text-sm">
                 1 in 5 people living with psoriasis experience these feelings. Your skin and emotions are deeply connected.
               </p>
            </div>

            {/* AI Section */}
            {!aiAdvice && !loadingAi && (
                 <button 
                    onClick={getAiGuidance}
                    className="w-full bg-gradient-to-r from-lavender/20 to-sage/20 border border-lavender/30 p-6 rounded-2xl flex items-center justify-center gap-3 text-charcoal group active:scale-98 transition-all"
                 >
                    <Sparkles size={20} className="text-lavender group-hover:text-charcoal transition-colors" />
                    <span className="font-serif text-lg font-medium">Ask Cleara for gentle guidance</span>
                 </button>
            )}

            {loadingAi && (
                <div className="w-full bg-white/40 border border-lavender/20 p-8 rounded-2xl flex flex-col items-center justify-center gap-3 animate-pulse">
                    <Loader2 size={24} className="animate-spin text-lavender" />
                    <span className="font-serif text-charcoal/60">Crafting your healing note...</span>
                </div>
            )}

            {aiAdvice && (
                <div className="bg-gradient-to-br from-white to-lavender/10 rounded-2xl p-6 border border-lavender/20 shadow-sm animate-fade-in">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={16} className="text-lavender" />
                        <h3 className="font-display font-bold text-charcoal">Personalized Wisdom</h3>
                    </div>
                    <div className="font-serif text-lg text-charcoal/90 leading-relaxed whitespace-pre-wrap">
                        {aiAdvice}
                    </div>
                </div>
            )}
            
            <div className="mt-8 bg-lavender/5 rounded-2xl p-6 border border-lavender/10">
               <h3 className="font-display font-bold text-charcoal mb-3">Professional Support</h3>
               <ul className="space-y-2 font-sans text-charcoal/70 text-sm">
                 <li className="flex gap-2"><span>•</span> Talk to someone you trust</li>
                 <li className="flex gap-2"><span>•</span> Gentle movement helps</li>
                 <li className="flex gap-2"><span>•</span> Consider speaking with a doctor</li>
               </ul>
            </div>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-canvas to-transparent">
           <button onClick={() => onNavigate(Screen.Home)} className="w-full bg-white border border-lavender/30 text-charcoal font-medium py-4 rounded-2xl shadow-sm">
             Close
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col px-6 pt-12 animate-fade-in">
       <div className="flex justify-between items-center mb-8 text-charcoal/40">
         <button onClick={() => setStep(step - 1)}><ArrowLeft size={24} /></button>
         <span className="font-sans text-sm font-medium">{step} of {QUESTIONS.length}</span>
       </div>

       <div className="flex-1">
         <h2 className="font-serif text-3xl text-charcoal mb-2 leading-tight">
           Over the last two weeks, have you felt...
         </h2>
         <p className="font-serif text-2xl text-lavender italic mb-12">"{QUESTIONS[step - 1]}"</p>

         <div className="space-y-3">
           {OPTIONS.map((opt, idx) => (
             <button
               key={idx}
               onClick={() => handleAnswer(idx)}
               className="w-full text-left bg-white/50 backdrop-blur-sm border border-white/60 hover:bg-lavender/10 hover:border-lavender/30 p-5 rounded-2xl font-sans text-charcoal transition-all duration-200"
             >
               {opt}
             </button>
           ))}
         </div>
       </div>
    </div>
  );
};

export default WellnessScreen;