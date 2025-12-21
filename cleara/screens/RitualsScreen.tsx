import React, { useState } from 'react';
import { ArrowLeft, Check, Sun, Moon, Plus, X } from 'lucide-react';
import { Screen, Ritual, Sparkle } from '../types';

interface RitualsScreenProps {
  rituals: Ritual[];
  onToggle: (id: string) => void;
  onNavigate: (screen: Screen) => void;
  onAddRitual: (title: string, category: 'morning' | 'evening') => void;
}

const RitualsScreen: React.FC<RitualsScreenProps> = ({ rituals, onToggle, onNavigate, onAddRitual }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newRitualTitle, setNewRitualTitle] = useState('');
  const [newRitualCategory, setNewRitualCategory] = useState<'morning'|'evening'>('morning');

  const handleCheck = (e: React.MouseEvent, id: string) => {
    // Only add sparkles if checking (not unchecking)
    const ritual = rituals.find(r => r.id === id);
    if (ritual && !ritual.completed) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
        y: rect.top + rect.height / 2 + (Math.random() - 0.5) * 100,
        color: ['#8B9DC3', '#B8C5E2', '#A8C5B5', '#D4A5A5'][i % 4]
      }));
      setSparkles(prev => [...prev, ...newSparkles]);
      setTimeout(() => setSparkles(prev => prev.slice(12)), 1000);
    }
    onToggle(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRitualTitle.trim()) {
        onAddRitual(newRitualTitle, newRitualCategory);
        setNewRitualTitle('');
        setIsAdding(false);
    }
  };

  const morningRituals = rituals.filter(r => r.category === 'morning');
  const eveningRituals = rituals.filter(r => r.category === 'evening');

  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto min-h-screen relative">
      
      {/* Sparkle Overlay */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed w-3 h-3 rounded-full pointer-events-none animate-ping"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            backgroundColor: sparkle.color,
            animationDuration: '0.8s'
          }}
        />
      ))}

      <header className="mb-8">
        <div className="flex justify-between items-start mb-6">
            <button onClick={() => onNavigate(Screen.Home)} className="text-charcoal/60 p-2 -ml-2">
                <ArrowLeft size={24} strokeWidth={2} />
            </button>
            <button 
                onClick={() => setIsAdding(true)}
                className="bg-charcoal text-white p-3 rounded-full shadow-lg active:scale-90 transition-transform"
            >
                <Plus size={24} strokeWidth={2} />
            </button>
        </div>
        
        {/* Hero Image */}
        <div className="w-full h-40 rounded-[32px] overflow-hidden mb-6 relative shadow-sm">
            <img 
                src="https://images.unsplash.com/photo-1515020617920-e93c19aa8711?auto=format&fit=crop&q=80&w=800" 
                alt="Cozy morning tea" 
                className="w-full h-full object-cover opacity-90"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent flex items-end p-6">
                 <div className="text-white">
                     <p className="font-sans text-xs uppercase tracking-wider font-bold opacity-80 mb-1">Daily Practice</p>
                     <h1 className="font-serif text-3xl">Your Healing Rituals</h1>
                 </div>
             </div>
        </div>
        
        <p className="font-sans text-charcoal/60 px-2">Small acts of care, every day.</p>
      </header>

      {/* Progress Card */}
      <div className="bg-blush/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-blush/20">
         <div className="flex justify-between items-center mb-3">
            <span className="font-display font-semibold text-charcoal">7 days of consistency</span>
            <span className="text-blush">🌸</span>
         </div>
         <div className="h-2 w-full bg-white/40 rounded-full overflow-hidden">
            <div className="h-full w-[70%] bg-blush rounded-full animate-pulse-slow" />
         </div>
         <p className="text-xs text-charcoal/50 mt-2 text-right">3 more days to milestone</p>
      </div>

      <div className="space-y-8">
        {/* Morning Section */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-charcoal/70">
            <Sun size={20} strokeWidth={2} />
            <h3 className="font-display font-semibold text-lg">Morning Ritual</h3>
          </div>
          
          <div className="space-y-3">
            {morningRituals.map(ritual => (
              <RitualCard key={ritual.id} ritual={ritual} onCheck={handleCheck} />
            ))}
            {morningRituals.length === 0 && (
                <div className="p-4 text-center text-charcoal/40 font-sans italic text-sm">
                    No morning rituals yet.
                </div>
            )}
          </div>
        </section>

        {/* Evening Section */}
        <section>
          <div className="flex items-center gap-2 mb-4 text-charcoal/70">
            <Moon size={20} strokeWidth={2} />
            <h3 className="font-display font-semibold text-lg">Evening Ritual</h3>
          </div>
          
          <div className="space-y-3">
            {eveningRituals.map(ritual => (
              <RitualCard key={ritual.id} ritual={ritual} onCheck={handleCheck} />
            ))}
             {eveningRituals.length === 0 && (
                <div className="p-4 text-center text-charcoal/40 font-sans italic text-sm">
                    No evening rituals yet.
                </div>
            )}
          </div>
        </section>
      </div>

      {/* Add Ritual Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-charcoal/20 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-float">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-2xl text-charcoal">New Ritual</h3>
                    <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-100 rounded-full">
                        <X size={20} className="text-charcoal/60" strokeWidth={2} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-sans text-xs font-bold text-charcoal/50 uppercase tracking-wider mb-2">Title</label>
                        <input 
                            autoFocus
                            type="text" 
                            placeholder="e.g., Drink Green Tea" 
                            value={newRitualTitle}
                            onChange={(e) => setNewRitualTitle(e.target.value)}
                            className="w-full bg-canvas border-b-2 border-lavender/30 p-3 font-serif text-xl focus:outline-none focus:border-lavender text-charcoal placeholder:text-charcoal/20"
                        />
                    </div>
                    
                    <div>
                        <label className="block font-sans text-xs font-bold text-charcoal/50 uppercase tracking-wider mb-2">Time of Day</label>
                        <div className="flex gap-3">
                            <button 
                                type="button"
                                onClick={() => setNewRitualCategory('morning')}
                                className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${newRitualCategory === 'morning' ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-200' : 'bg-gray-50 text-gray-400'}`}
                            >
                                <Sun size={18} strokeWidth={2} /> Morning
                            </button>
                            <button 
                                type="button"
                                onClick={() => setNewRitualCategory('evening')}
                                className={`flex-1 p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${newRitualCategory === 'evening' ? 'bg-indigo-100 text-indigo-800 ring-2 ring-indigo-200' : 'bg-gray-50 text-gray-400'}`}
                            >
                                <Moon size={18} strokeWidth={2} /> Evening
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={!newRitualTitle.trim()}
                        className="w-full bg-charcoal text-white font-display font-medium py-4 rounded-xl shadow-lg mt-4 disabled:opacity-50"
                    >
                        Begin Ritual
                    </button>
                </form>
             </div>
        </div>
      )}
    </div>
  );
};

const RitualCard: React.FC<{ ritual: Ritual; onCheck: (e: React.MouseEvent, id: string) => void }> = ({ ritual, onCheck }) => (
  <div className={`
    group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
    ${ritual.completed 
      ? 'bg-sage/10 border-sage/20' 
      : 'bg-white/60 border-lavender/10 hover:bg-white/80'
    }
  `}>
    <div>
      <h4 className={`font-display font-medium transition-colors ${ritual.completed ? 'text-charcoal/40' : 'text-charcoal'}`}>
        {ritual.title}
      </h4>
      <p className="text-xs text-charcoal/40 font-sans mt-0.5">{ritual.subtitle}</p>
    </div>

    <button
      onClick={(e) => onCheck(e, ritual.id)}
      className={`
        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform
        ${ritual.completed 
          ? 'bg-sage text-white scale-100 shadow-sm' 
          : 'bg-white border-2 border-lavender/30 text-transparent scale-95 hover:scale-100'
        }
      `}
    >
      <Check size={16} strokeWidth={2.5} />
    </button>
  </div>
);

export default RitualsScreen;