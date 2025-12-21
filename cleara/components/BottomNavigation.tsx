import React from 'react';
import { Home, Camera, BarChart2, Heart, Smile } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: Screen.Home, icon: Home, label: 'Home' },
    { id: Screen.Photo, icon: Camera, label: 'Photo' },
    { id: Screen.Insights, icon: BarChart2, label: 'Insights' },
    { id: Screen.Rituals, icon: Heart, label: 'Rituals' },
    { id: Screen.Wellness, icon: Smile, label: 'Wellness' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-lavender/20 pb-safe pt-2 px-4 z-50">
      <div className="max-w-md mx-auto flex justify-between items-end pb-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${
                isActive ? '-translate-y-2' : ''
              }`}
            >
              <div
                className={`p-2 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-lavender/20 text-lavender shadow-[0_0_15px_rgba(139,157,195,0.2)]' 
                    : 'text-charcoal/40 hover:text-charcoal/60'
                }`}
              >
                <Icon size={24} strokeWidth={2} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;