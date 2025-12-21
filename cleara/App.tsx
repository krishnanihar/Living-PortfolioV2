import React, { useState } from 'react';
import { Screen, Ritual, PasiLog } from './types';
import { INITIAL_RITUALS, PASI_HISTORY } from './constants';
import WatercolorBackground from './components/WatercolorBackground';
import BottomNavigation from './components/BottomNavigation';
import HomeScreen from './screens/HomeScreen';
import PhotoCaptureScreen from './screens/PhotoCaptureScreen';
import InsightsScreen from './screens/InsightsScreen';
import RitualsScreen from './screens/RitualsScreen';
import WellnessScreen from './screens/WellnessScreen';

// Initialize history with rich mock data for graphs
const INITIAL_LOGS: PasiLog[] = PASI_HISTORY.map((h, i) => {
  // Create some variance for the charts
  const variance = Math.sin(i); 
  return {
    id: `mock-${i}`,
    date: h.date,
    score: h.score,
    redness: Math.max(1, Math.min(4, 3 - (i * 0.3) + variance)), 
    thickness: Math.max(1, Math.min(4, 4 - (i * 0.5))),
    scaling: Math.max(1, Math.min(4, 2 + variance)),
    summary: "Healing is a journey, not a race."
  };
});

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Home);
  const [rituals, setRituals] = useState<Ritual[]>(INITIAL_RITUALS);
  const [logs, setLogs] = useState<PasiLog[]>(INITIAL_LOGS);

  const toggleRitual = (id: string) => {
    setRituals(prev => prev.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const addRitual = (title: string, category: 'morning' | 'evening') => {
    const newRitual: Ritual = {
      id: Date.now().toString(),
      title,
      subtitle: 'Personal care',
      completed: false,
      time: category === 'morning' ? '8:00 AM' : '8:00 PM',
      category
    };
    setRituals(prev => [...prev, newRitual]);
  };

  const handleSaveLog = (log: PasiLog) => {
    setLogs(prev => [...prev, log]);
    // Optionally navigate to insights after saving
    setCurrentScreen(Screen.Insights);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Home:
        return <HomeScreen rituals={rituals} onNavigate={setCurrentScreen} onToggleRitual={toggleRitual} />;
      case Screen.Photo:
        return <PhotoCaptureScreen onBack={() => setCurrentScreen(Screen.Home)} onSave={handleSaveLog} />;
      case Screen.Insights:
        return <InsightsScreen onNavigate={setCurrentScreen} logs={logs} />;
      case Screen.Rituals:
        return <RitualsScreen rituals={rituals} onToggle={toggleRitual} onNavigate={setCurrentScreen} onAddRitual={addRitual} />;
      case Screen.Wellness:
        return <WellnessScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen rituals={rituals} onNavigate={setCurrentScreen} onToggleRitual={toggleRitual} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-charcoal bg-canvas relative overflow-hidden">
      <WatercolorBackground />
      
      {/* Main Content Area */}
      <main className={`h-screen overflow-y-auto ${currentScreen !== Screen.Photo ? 'pb-20' : ''}`}>
        {renderScreen()}
      </main>

      {/* Navigation - Hidden on Photo Screen */}
      {currentScreen !== Screen.Photo && (
        <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
};

export default App;