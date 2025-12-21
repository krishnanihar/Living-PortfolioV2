import React, { useState } from 'react';
import { Share2, ArrowLeft, TrendingDown, TrendingUp, Info } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Cell
} from 'recharts';
import { Screen, PasiLog } from '../types';

interface InsightsScreenProps {
  onNavigate: (screen: Screen) => void;
  logs: PasiLog[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-lavender/20">
        <p className="font-serif text-charcoal mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs font-sans text-charcoal/70">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="capitalize">{entry.name}:</span>
            <span className="font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const InsightsScreen: React.FC<InsightsScreenProps> = ({ onNavigate, logs }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trends'>('overview');

  // Get latest log
  const latest = logs[logs.length - 1];
  const previous = logs.length > 1 ? logs[logs.length - 2] : null;
  const scoreChange = previous ? latest.score - previous.score : 0;
  const isHealing = scoreChange <= 0;

  // Prepare data for Radar Chart (Current Symptoms)
  const radarData = [
    { subject: 'Redness', A: latest.redness, fullMark: 5 },
    { subject: 'Thickness', A: latest.thickness, fullMark: 5 },
    { subject: 'Scaling', A: latest.scaling, fullMark: 5 },
  ];

  // Mock Wellness Data for Correlation Chart (mixing real logs with mock mood data)
  const correlationData = logs.map(log => ({
    date: log.date,
    severity: log.score,
    wellness: Math.max(2, 10 - (log.score / 2) + (Math.random() * 2 - 1)), // Inverse correlation mock
  }));

  return (
    <div className="pb-24 pt-8 px-6 max-w-md mx-auto space-y-8 animate-fade-in">
       {/* Header */}
       <header className="relative">
         <div className="absolute -top-10 -left-10 w-48 h-48 bg-lavender/20 blur-3xl rounded-full -z-10" />
         <div className="flex justify-between items-center mb-6">
           <button onClick={() => onNavigate(Screen.Home)} className="p-2 -ml-2 text-charcoal/60 hover:bg-white/50 rounded-full transition-colors">
             <ArrowLeft size={24} />
           </button>
           <button className="text-charcoal/60 flex items-center gap-2 font-sans text-sm hover:text-charcoal transition-colors">
             Share <Share2 size={16} />
           </button>
         </div>
         
         <h1 className="font-serif text-4xl text-charcoal">Your Healing Story</h1>
       </header>

       {/* Tab Switcher */}
       <div className="flex p-1 bg-white/40 backdrop-blur-md rounded-2xl border border-white/40">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-sm font-sans font-medium rounded-xl transition-all ${activeTab === 'overview' ? 'bg-white shadow-sm text-charcoal' : 'text-charcoal/50'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('trends')}
            className={`flex-1 py-3 text-sm font-sans font-medium rounded-xl transition-all ${activeTab === 'trends' ? 'bg-white shadow-sm text-charcoal' : 'text-charcoal/50'}`}
          >
            Deep Dive
          </button>
       </div>

       {activeTab === 'overview' ? (
         <>
            {/* Main Score Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[32px] border border-white/60 p-8 shadow-sm text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sage/10 blur-2xl rounded-full transition-transform duration-700 group-hover:scale-110" />
                
                <h2 className="font-display text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-2">Current PASI Score</h2>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="font-serif text-6xl text-charcoal">{latest.score.toFixed(1)}</div>
                  {previous && (
                      <div className={`flex flex-col text-xs font-bold ${isHealing ? 'text-sage' : 'text-blush'}`}>
                          {isHealing ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
                          <span>{Math.abs(scoreChange).toFixed(1)}</span>
                      </div>
                  )}
                </div>
                
                {/* Visual Scale */}
                <div className="relative h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-sage/50 via-lavender/50 to-blush/50" />
                  <div 
                      className="absolute top-0 bottom-0 w-1.5 bg-charcoal rounded-full transition-all duration-1000 border border-white"
                      style={{ left: `${Math.min((latest.score / 30) * 100, 100)}%` }} 
                  />
                </div>
                
                <p className="font-sans text-sage font-medium text-sm">
                  {latest.score < 5 ? "Clear to Mild" : latest.score < 10 ? "Moderate" : "Severe"}
                </p>
            </div>

            {/* Symptom Radar Chart */}
            <div className="bg-white/50 backdrop-blur-md rounded-[32px] border border-white/40 p-6 relative">
               <div className="flex items-center justify-between mb-2">
                 <h3 className="font-serif text-xl text-charcoal">Symptom Balance</h3>
                 <Info size={18} className="text-charcoal/30" />
               </div>
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B9DC3', fontSize: 12, fontFamily: 'DM Sans' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                      <Radar
                        name="Severity"
                        dataKey="A"
                        stroke="#D4A5A5"
                        strokeWidth={2}
                        fill="#D4A5A5"
                        fillOpacity={0.5}
                      />
                      <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
               </div>
               <p className="text-center text-xs text-charcoal/50 font-sans mt-[-20px]">
                 Balanced tracking of Redness, Thickness, & Scaling
               </p>
            </div>
         </>
       ) : (
         <>
            {/* Timeline Chart */}
            <div className="bg-white/50 backdrop-blur-md rounded-[32px] border border-white/40 p-6">
               <h3 className="font-serif text-xl text-charcoal mb-4">Healing Timeline</h3>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={logs}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A8C5B5" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#A8C5B5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#8B9DC3', fontSize: 12 }} 
                        dy={10}
                      />
                      <YAxis hide domain={[0, 'auto']} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        name="PASI Score"
                        stroke="#A8C5B5" 
                        strokeWidth={3}
                        fill="url(#colorScore)" 
                        animationDuration={1500}
                        dot={{ r: 4, fill: '#A8C5B5', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, fill: '#A8C5B5' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Correlation Chart */}
            <div className="bg-white/50 backdrop-blur-md rounded-[32px] border border-white/40 p-6">
               <div className="mb-4">
                 <h3 className="font-serif text-xl text-charcoal">Wellness vs. Skin</h3>
                 <p className="text-xs text-charcoal/50">Tracking how mood impacts severity</p>
               </div>
               <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={correlationData}>
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#8B9DC3', fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(139, 157, 195, 0.1)'}} />
                      <Bar dataKey="wellness" name="Wellness" stackId="a" fill="#B8C5E2" radius={[4, 4, 0, 0]} barSize={12} />
                      <Bar dataKey="severity" name="Severity" stackId="b" fill="#D4A5A5" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex justify-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-xs text-charcoal/60">
                    <div className="w-2 h-2 rounded-full bg-periwinkle" /> Wellness
                  </div>
                  <div className="flex items-center gap-2 text-xs text-charcoal/60">
                    <div className="w-2 h-2 rounded-full bg-blush" /> Severity
                  </div>
               </div>
            </div>
         </>
       )}
    </div>
  );
};

export default InsightsScreen;