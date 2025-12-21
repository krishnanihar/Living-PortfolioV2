import React from 'react';
import { ArrowRight, CheckCircle2, Circle, Camera, Smile, Plus, Sparkles, TrendingUp, BookHeart, Shield } from 'lucide-react';
import { Ritual, Screen } from '../types';
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';
import { PASI_HISTORY } from '../constants';

interface HomeScreenProps {
  rituals: Ritual[];
  onNavigate: (screen: Screen) => void;
  onToggleRitual: (id: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ rituals, onNavigate, onToggleRitual }) => {
  const completedCount = rituals.filter(r => r.completed).length;
  
  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
            <h1 className="font-serif text-4xl text-charcoal mb-2">Good morning, Sarah</h1>
            <p className="font-sans text-charcoal/60 text-lg">Your skin is healing.</p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" 
                alt="Profile" 
                className="w-full h-full object-cover"
            />
        </div>
      </header>

      {/* Daily Inspiration Card */}
      <div className="relative h-48 rounded-[32px] overflow-hidden group shadow-md">
        <img 
            src="https://images.unsplash.com/photo-1490750967868-58cb75065ed4?auto=format&fit=crop&q=80&w=800" 
            alt="Daily Inspiration" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-center gap-2 text-white/90 mb-1">
                <Sparkles size={16} strokeWidth={2} />
                <span className="text-xs font-bold uppercase tracking-wider">Daily Focus</span>
            </div>
            <h3 className="font-serif text-2xl text-white leading-tight">
                Embrace the gentle pace of nature.
            </h3>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
         {/* 1. Log Skin */}
         <button
           onClick={() => onNavigate(Screen.Photo)}
           className="flex-1 min-w-[105px] bg-white/40 backdrop-blur-sm border border-white/40 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/50 shadow-sm"
         >
            <div className="p-2.5 bg-lavender/20 rounded-full text-lavender">
                <Camera size={20} strokeWidth={2} />
            </div>
            <span className="font-sans text-sm font-medium text-charcoal/80 whitespace-nowrap">Log Skin</span>
         </button>

         {/* 2. Mood Check */}
         <button
           onClick={() => onNavigate(Screen.Wellness)}
           className="flex-1 min-w-[105px] bg-white/40 backdrop-blur-sm border border-white/40 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/50 shadow-sm"
         >
            <div className="p-2.5 bg-sage/20 rounded-full text-sage">
                <Smile size={20} strokeWidth={2} />
            </div>
            <span className="font-sans text-sm font-medium text-charcoal/80 whitespace-nowrap">Mood Check</span>
         </button>

         {/* 3. Add Ritual */}
         <button
           onClick={() => onNavigate(Screen.Rituals)}
           className="flex-1 min-w-[105px] bg-white/40 backdrop-blur-sm border border-white/40 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/50 shadow-sm"
         >
            <div className="p-2.5 bg-blush/20 rounded-full text-blush">
                <Plus size={20} strokeWidth={2} />
            </div>
            <span className="font-sans text-sm font-medium text-charcoal/80 whitespace-nowrap">Add Ritual</span>
         </button>

         {/* 4. Trends */}
         <button
           onClick={() => onNavigate(Screen.Insights)}
           className="flex-1 min-w-[105px] bg-white/40 backdrop-blur-sm border border-white/40 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/50 shadow-sm"
         >
            <div className="p-2.5 bg-periwinkle/30 rounded-full text-charcoal/60">
                <TrendingUp size={20} strokeWidth={2} />
            </div>
            <span className="font-sans text-sm font-medium text-charcoal/80 whitespace-nowrap">Trends</span>
         </button>

         {/* 5. Journal */}
         <button
           onClick={() => onNavigate(Screen.Wellness)}
           className="flex-1 min-w-[105px] bg-white/40 backdrop-blur-sm border border-white/40 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/50 shadow-sm"
         >
            <div className="p-2.5 bg-lavender/20 rounded-full text-lavender">
                <BookHeart size={20} strokeWidth={2} />
            </div>
            <span className="font-sans text-sm font-medium text-charcoal/80 whitespace-nowrap">Journal</span>
         </button>

         {/* 6. Care Plan */}
         <button
           onClick={() => onNavigate(Screen.Rituals)}
           className="flex-1 min-w-[105px] bg-white/40 backdrop-blur-sm border border-white/40 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all hover:bg-white/50 shadow-sm"
         >
            <div className="p-2.5 bg-sage/20 rounded-full text-sage">
                <Shield size={20} strokeWidth={2} />
            </div>
            <span className="font-sans text-sm font-medium text-charcoal/80 whitespace-nowrap">Care Plan</span>
         </button>
      </div>

      {/* Rituals Summary Card */}
      <div 
        onClick={() => onNavigate(Screen.Rituals)}
        className="bg-white/60 backdrop-blur-md rounded-[28px] border border-lavender/15 p-6 shadow-[0_8px_32px_rgba(139,157,195,0.12)] active:scale-98 transition-transform duration-200"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display font-semibold text-xl text-charcoal">Today's Gentle Rituals</h2>
          <span className="bg-white/50 px-3 py-1 rounded-full text-xs font-sans text-charcoal/60 border border-lavender/10">
            {completedCount} of {rituals.length}
          </span>
        </div>
        
        <div className="space-y-3">
          {rituals.slice(0, 3).map((ritual) => (
            <div key={ritual.id} className="flex items-center gap-3">
              {ritual.completed ? (
                <CheckCircle2 size={20} className="text-sage" strokeWidth={2} />
              ) : (
                <Circle size={20} className="text-lavender/60" strokeWidth={2} />
              )}
              <span className={`font-sans ${ritual.completed ? 'text-charcoal/40 line-through' : 'text-charcoal/80'}`}>
                {ritual.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PASI Progress Card */}
      <div 
        onClick={() => onNavigate(Screen.Insights)}
        className="bg-gradient-to-br from-white/70 to-sage/5 backdrop-blur-md rounded-[28px] border border-sage/15 p-6 shadow-[0_8px_32px_rgba(168,197,181,0.12)] active:scale-98 transition-transform duration-200"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="font-display font-semibold text-xl text-charcoal">Your Progress</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-3xl text-charcoal">12.4</span>
              <span className="text-sm font-sans text-sage font-medium">PASI Score</span>
            </div>
            <p className="text-sm text-charcoal/50 mt-1">↓ 32% healing from last month</p>
          </div>
        </div>

        <div className="h-24 mt-4 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PASI_HISTORY}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A8C5B5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#A8C5B5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" hide />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#A8C5B5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Streak/Encouragement Card */}
      <div className="bg-gradient-to-br from-blush/10 to-lavender/10 backdrop-blur-md rounded-[28px] border border-blush/20 p-6 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl text-charcoal mb-1">7 days of consistency</h3>
          <p className="font-sans text-charcoal/60 text-sm">You're building something beautiful.</p>
        </div>
        <div className="bg-white/40 p-3 rounded-full">
          <ArrowRight size={20} className="text-charcoal/60" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;