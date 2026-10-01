import React from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { 
  Home, 
  Dumbbell, 
  Flame, 
  Utensils, 
  TrendingUp, 
  User 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'yoga', label: 'Yoga', icon: Flame },
    { id: 'diet', label: 'Diet', icon: Utensils },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe">
      <div className="grid grid-cols-6 items-center h-15 max-w-md mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center transition-colors cursor-pointer select-none ${
                isActive 
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg transition-transform ${isActive ? 'scale-110' : ''}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
