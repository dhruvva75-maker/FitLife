import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Flame, 
  Clock, 
  Footprints, 
  Droplet, 
  Plus, 
  Dumbbell, 
  Home, 
  Building2, 
  Apple, 
  Sparkles, 
  ChevronRight, 
  Calendar, 
  CheckCircle2, 
  Compass 
} from 'lucide-react';
import { CircularProgress } from '../common/CircularProgress';
import { ASSET_IMAGES } from '../../data/mockData';

export const HomeDashboard: React.FC = () => {
  const { 
    user, 
    activityStats, 
    logWater, 
    logSteps, 
    workoutPlans, 
    yogaSessions, 
    activeDietPlan, 
    startWorkout, 
    startYogaSession, 
    setActiveTab,
    weeklyActivity,
    streakDays 
  } = useApp();

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userName = user?.name ? user.name.split(' ')[0] : 'Athlete';

  // Smart recommended workout based on user's preference and goal
  const recommendedWorkout = workoutPlans.find(p => {
    if (user?.workoutPreference === 'home' && p.type === 'home') return true;
    if (user?.workoutPreference === 'gym' && p.type === 'gym') return true;
    return p.targetGoal === user?.goal;
  }) || workoutPlans[0];

  // Recommended peaceful yoga session
  const recommendedYoga = yogaSessions[0];

  // Today's progress percentage across goals
  const stepsProgress = Math.min(100, (activityStats.steps / activityStats.stepsGoal) * 100);
  const caloriesProgress = Math.min(100, (activityStats.caloriesBurned / activityStats.caloriesGoal) * 100);
  const waterProgress = Math.min(100, (activityStats.waterMl / activityStats.waterGoalMl) * 100);
  const overallDayProgress = Math.round((stepsProgress + caloriesProgress + waterProgress) / 3);

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto px-4 pt-4">
      
      {/* 1. Header Greeting & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">
            {getGreeting()}, {userName} 👋
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ready to conquer your daily fitness targets?
          </p>
        </div>

        {/* Streak Pill */}
        <div className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 shadow-sm">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
            {streakDays} Day Streak
          </span>
        </div>
      </div>

      {/* 2. Today's Recommended Workout Spotlight Card */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 text-white shadow-xl group">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0">
          <img
            src={recommendedWorkout.coverImage || ASSET_IMAGES.heroHome}
            alt={recommendedWorkout.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLElement).style.opacity = '0.3';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        </div>

        <div className="relative z-10 p-6 sm:p-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-sm">
              Today's Workout
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/60 text-slate-200 backdrop-blur-md">
              {recommendedWorkout.type === 'home' ? 'Home Bodyweight' : 'Gym Training'}
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/60 text-slate-200 backdrop-blur-md">
              {recommendedWorkout.difficulty}
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
              {recommendedWorkout.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl line-clamp-2">
              {recommendedWorkout.subtitle}
            </p>
          </div>

          {/* Metrics Meta */}
          <div className="flex items-center gap-4 text-xs text-slate-200 pt-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-emerald-400" />
              {recommendedWorkout.durationMinutes} Minutes
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Flame className="w-4 h-4 text-amber-400" />
              ~{recommendedWorkout.totalCalories} kcal
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Dumbbell className="w-4 h-4 text-blue-400" />
              {recommendedWorkout.exercises.length} Exercises
            </span>
          </div>

          {/* Start Workout Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => startWorkout(recommendedWorkout)}
              className="py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Workout</span>
            </button>
            <button
              onClick={() => setActiveTab('workout')}
              className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1 backdrop-blur-md transition-colors cursor-pointer"
            >
              <span>Explore All Workouts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Daily Vitals Metric Tracker Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Steps */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Footprints className="w-4 h-4" />
            </div>
            <button
              onClick={() => logSteps(500)}
              className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
              title="Add 500 steps"
            >
              +500
            </button>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Daily Steps</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {activityStats.steps.toLocaleString()}
            </span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (activityStats.steps / activityStats.stepsGoal) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Calories Burned */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
            <Flame className="w-4 h-4 fill-amber-500" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Burn</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {activityStats.caloriesBurned} <span className="text-xs font-sans text-slate-400 font-normal">kcal</span>
            </span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (activityStats.caloriesBurned / activityStats.caloriesGoal) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Workout Duration */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Workout Time</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {activityStats.workoutDurationMinutes} <span className="text-xs font-sans text-slate-400 font-normal">mins</span>
            </span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (activityStats.workoutDurationMinutes / 45) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Water Intake */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-500 flex items-center justify-center">
              <Droplet className="w-4 h-4 fill-cyan-500" />
            </div>
            <button
              onClick={() => logWater(250)}
              className="text-[10px] text-cyan-600 dark:text-cyan-400 hover:underline font-semibold cursor-pointer"
              title="Add 250ml glass"
            >
              +250ml
            </button>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Water Intake</span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {(activityStats.waterMl / 1000).toFixed(1)} <span className="text-xs font-sans text-slate-400 font-normal">/ {(activityStats.waterGoalMl / 1000).toFixed(1)}L</span>
            </span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (activityStats.waterMl / activityStats.waterGoalMl) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Large Interactive Core Category Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-['Outfit'] px-1">
          Explore Training & Wellness
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 🏠 Home Workout Card */}
          <button
            onClick={() => setActiveTab('workout')}
            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/20 dark:border-slate-800 h-44 p-6 text-left flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <img
              src={ASSET_IMAGES.heroHome}
              alt="Home Workout"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-2xl">🏠</span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mt-1">
                Home Workout
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Bodyweight routines, HIIT fat loss, abs & mobility
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Zero equipment required</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 🏋️ Gym Workout Card */}
          <button
            onClick={() => setActiveTab('workout')}
            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/20 dark:border-slate-800 h-44 p-6 text-left flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <img
              src={ASSET_IMAGES.heroGym}
              alt="Gym Workout"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-2xl">🏋️</span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mt-1">
                Gym Workout
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Barbell bench, cables, lats, hypertrophy & legs
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Compound & machine splits</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 🧘 Yoga Card */}
          <button
            onClick={() => setActiveTab('yoga')}
            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/20 dark:border-slate-800 h-44 p-6 text-left flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <img
              src={ASSET_IMAGES.heroYoga}
              alt="Yoga & Mindfulness"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-2xl">🧘</span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mt-1">
                Peaceful Yoga & Meditation
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Morning vitality, evening unwind, pranayama & flexibility
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Guided sessions with soothing timer</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 🥗 Diet Plan Card */}
          <button
            onClick={() => setActiveTab('diet')}
            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/20 dark:border-slate-800 h-44 p-6 text-left flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <img
              src={ASSET_IMAGES.heroDiet}
              alt="Diet & Nutrition"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="relative z-10">
              <span className="text-2xl">🥗</span>
              <h3 className="text-lg font-bold text-white font-['Outfit'] mt-1">
                Personalized Diet Plan
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Vegetarian, Non-Veg, Eggitarian with precise macro tracking
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Calibrated to {user?.goal?.replace('_', ' ')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* 5. Weekly Workout Streak Summary & Progress Percentage */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
              Weekly Workout Summary
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {streakDays} of 7 days completed this week
            </p>
          </div>

          {/* Overall Progress Ring */}
          <div className="flex items-center gap-3">
            <CircularProgress
              percentage={overallDayProgress}
              size={56}
              strokeWidth={6}
              strokeColor="#10b981"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">Daily Target</span>
              <p className="text-[11px] text-slate-400">Vitals Accomplished</p>
            </div>
          </div>
        </div>

        {/* Days Streak Badges */}
        <div className="grid grid-cols-7 gap-2 pt-2">
          {weeklyActivity.map((d, idx) => {
            const isToday = idx === weeklyActivity.length - 1;
            return (
              <div 
                key={d.day} 
                className={`p-2.5 rounded-2xl text-center flex flex-col items-center justify-between transition-colors ${
                  isToday 
                    ? 'bg-emerald-500/10 border border-emerald-500/30' 
                    : 'bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800'
                }`}
              >
                <span className={`text-[11px] font-semibold ${isToday ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'}`}>
                  {d.day}
                </span>
                <div className="my-1">
                  {d.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700" />
                  )}
                </div>
                <span className="text-[9px] text-slate-400 font-mono">
                  {Math.round(d.steps / 1000)}k
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
