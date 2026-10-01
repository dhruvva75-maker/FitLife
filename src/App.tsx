import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { HomeDashboard } from './components/home/HomeDashboard';
import { WorkoutSection } from './components/workout/WorkoutSection';
import { YogaSection } from './components/yoga/YogaSection';
import { DietSection } from './components/diet/DietSection';
import { ProgressSection } from './components/progress/ProgressSection';
import { ProfileSection } from './components/profile/ProfileSection';
import { ExerciseDetailModal } from './components/workout/ExerciseDetailModal';
import { WorkoutPlayer } from './components/player/WorkoutPlayer';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/auth/OnboardingModal';
import { AdminPortalModal } from './components/admin/AdminPortalModal';
import { Smartphone, Monitor } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    activeTab, 
    activeWorkoutPlanForPlayer, 
    selectedExerciseForModal 
  } = useApp();

  const [isPhoneFrameMode, setIsPhoneFrameMode] = useState(false);

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard />;
      case 'workout':
        return <WorkoutSection />;
      case 'yoga':
        return <YogaSection />;
      case 'diet':
        return <DietSection />;
      case 'progress':
        return <ProgressSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Top Bar following Top Bar Contract */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        {isPhoneFrameMode ? (
          /* Simulated Smartphone Frame for previewing mobile ergonomics */
          <div className="w-full max-w-[420px] my-4 mx-auto bg-slate-950 rounded-[44px] p-3 shadow-2xl border-[6px] border-slate-800 relative">
            {/* Phone Notch */}
            <div className="w-32 h-5 bg-slate-800 rounded-b-2xl mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900" />
            </div>
            <div className="rounded-[36px] overflow-hidden bg-slate-50 dark:bg-slate-950 min-h-[780px] max-h-[820px] overflow-y-auto no-scrollbar">
              {renderActiveTabContent()}
            </div>
          </div>
        ) : (
          /* Responsive Fluid Layout */
          <div className="w-full max-w-4xl mx-auto flex-1">
            {renderActiveTabContent()}
          </div>
        )}
      </main>

      {/* Desktop Device View Toggle Button (Subtle Floating Widget) */}
      <div className="hidden lg:flex fixed bottom-5 right-5 z-30">
        <button
          onClick={() => setIsPhoneFrameMode(!isPhoneFrameMode)}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
          title="Toggle Mobile Simulator vs Fluid Layout"
        >
          {isPhoneFrameMode ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-emerald-500" />
              <span>Fluid Desktop View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mobile Frame View</span>
            </>
          )}
        </button>
      </div>

      {/* Fixed Mobile Bottom Navigation Tab Bar */}
      <BottomNav />

      {/* Modals & Full Screen Players */}
      <AuthModal />
      <OnboardingModal />
      <ExerciseDetailModal />
      {activeWorkoutPlanForPlayer && <WorkoutPlayer />}
      <AdminPortalModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
