import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FitnessGoal, 
  ExperienceLevel, 
  WorkoutLocationPreference, 
  DietPreference 
} from '../../types/fitness';
import { 
  User, 
  Mail, 
  Calendar, 
  Target, 
  Dumbbell, 
  Apple, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  LogOut, 
  Edit3, 
  ShieldCheck, 
  Check, 
  X, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const { 
    user, 
    updateProfile, 
    logout, 
    isDarkMode, 
    toggleDarkMode, 
    setIsAdminOpen,
    setIsAuthModalOpen,
    isAuthenticated 
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Dhruv');
  const [age, setAge] = useState(user?.age || 26);
  const [goal, setGoal] = useState<FitnessGoal>(user?.goal || 'muscle_building');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(user?.experienceLevel || 'intermediate');
  const [workoutPreference, setWorkoutPreference] = useState<WorkoutLocationPreference>(user?.workoutPreference || 'both');
  const [dietPreference, setDietPreference] = useState<DietPreference>(user?.dietPreference || 'vegetarian');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [notifications, setNotifications] = useState(user?.notificationsEnabled ?? true);
  const [privacyPrivateAccount, setPrivacyPrivateAccount] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">Guest Account</h2>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Sign in or create an account to view your tailored stats, customized workouts, and profile settings.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      age: Number(age),
      goal,
      experienceLevel,
      workoutPreference,
      dietPreference,
      avatarUrl: avatarUrl || user.avatarUrl,
      notificationsEnabled: notifications
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const goalLabels: Record<FitnessGoal, string> = {
    weight_loss: 'Fat Loss & Tone',
    muscle_building: 'Muscle Building & Hypertrophy',
    maintain_fitness: 'Balanced Health & Vitality',
    endurance_stamina: 'Endurance & Stamina',
    flexibility_tone: 'Flexibility & Posture',
  };

  return (
    <div className="space-y-6 pb-24 max-w-3xl mx-auto px-4 pt-4">
      
      {/* Profile Card Header */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          
          {/* Avatar with Ring */}
          <div className="relative group">
            <img
              src={user.avatarUrl}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-md"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {user.isAdmin && (
              <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md" title="Admin User">
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          {/* User Bio Details */}
          <div className="flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">
                  {user.name}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="self-center sm:self-start px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                {goalLabels[user.goal]}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50 capitalize">
                {user.experienceLevel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/50 capitalize">
                {user.dietPreference.replace('_', ' ')} Diet
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50 capitalize">
                {user.workoutPreference} Workout
              </span>
            </div>
          </div>
        </div>

        {saveSuccess && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            Profile changes saved successfully!
          </div>
        )}
      </div>

      {/* Settings Sections */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
        
        {/* Dark / Light Mode */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
              {isDarkMode ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-slate-700" />}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">App Appearance</h4>
              <p className="text-xs text-slate-400">{isDarkMode ? 'Dark Theme (OLED Friendly)' : 'Light Theme (Clean Daylight)'}</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              isDarkMode ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
          </button>
        </div>

        {/* Notifications */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Workout & Water Reminders</h4>
              <p className="text-xs text-slate-400">Receive gentle motivational prompts for hydration and daily workouts</p>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              notifications ? 'bg-emerald-600 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
          </button>
        </div>

        {/* Privacy */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Privacy & Data Handling</h4>
              <p className="text-xs text-slate-400">Local-first data encryption and profile confidentiality</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Secured</span>
        </div>

        {/* Admin CMS Trigger */}
        {user.isAdmin && (
          <div className="p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Admin / Content Management</h4>
                <p className="text-xs text-slate-400">Add or modify exercises, video sources, workouts & diet entries</p>
              </div>
            </div>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Open CMS
            </button>
          </div>
        )}

        {/* Logout */}
        <div className="p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-rose-600 dark:text-rose-400">Sign Out</h4>
              <p className="text-xs text-slate-400">Safely log out of your FitLife session</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
                Edit FitLife Profile
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    min="15"
                    max="90"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Fitness Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="muscle_building">Muscle Building & Strength</option>
                  <option value="weight_loss">Fat Loss & Toning</option>
                  <option value="maintain_fitness">Maintain Health & Fitness</option>
                  <option value="endurance_stamina">Endurance & Stamina</option>
                  <option value="flexibility_tone">Flexibility & Tone</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Workout Place</label>
                  <select
                    value={workoutPreference}
                    onChange={(e) => setWorkoutPreference(e.target.value as WorkoutLocationPreference)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="home">Home Workout</option>
                    <option value="gym">Gym Workout</option>
                    <option value="both">Both / Mixed</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Diet Preference</label>
                  <select
                    value={dietPreference}
                    onChange={(e) => setDietPreference(e.target.value as DietPreference)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non_vegetarian">Non-Vegetarian</option>
                    <option value="eggitarian">Eggitarian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Profile Photo URL</label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-sm shadow-emerald-600/30"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
