import React from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { 
  Sun, 
  Moon, 
  Dumbbell, 
  ShieldCheck, 
  UserCircle 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isDarkMode, 
    toggleDarkMode, 
    user, 
    isAuthenticated,
    setIsAuthModalOpen,
    setIsAdminOpen 
  } = useApp();

  const navLinks: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'workout', label: 'Workouts' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'diet', label: 'Diet' },
    { id: 'progress', label: 'Progress' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Zone 1: Single text element brand wordmark */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            aria-label="FitLife Home"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              Fit<span className="text-emerald-500">Life</span>
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`transition-colors relative py-1 cursor-pointer ${
                  isActive 
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold' 
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Admin CMS Portal Trigger */}
          {user?.isAdmin && (
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Admin Content Manager"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">Admin CMS</span>
            </button>
          )}

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* User Profile / Auth Button */}
          {isAuthenticated && user ? (
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500/30"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="hidden sm:inline text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[90px]">
                {user.name}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <UserCircle className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
