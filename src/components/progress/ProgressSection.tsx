import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  Flame, 
  Clock, 
  Footprints, 
  Droplet, 
  Calendar, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  Plus 
} from 'lucide-react';
import { CircularProgress } from '../common/CircularProgress';

export const ProgressSection: React.FC = () => {
  const { 
    user, 
    activityStats, 
    completedLogs, 
    personalRecords, 
    weeklyActivity, 
    streakDays,
    logSteps 
  } = useApp();

  const [activeTimeframe, setActiveTimeframe] = useState<'week' | 'month'>('week');

  const totalCaloriesBurned = completedLogs.reduce((acc, curr) => acc + curr.caloriesBurned, activityStats.caloriesBurned);
  const totalWorkoutMinutes = completedLogs.reduce((acc, curr) => acc + curr.durationMinutes, activityStats.workoutDurationMinutes);
  const totalWorkoutsCount = completedLogs.length;

  const maxSteps = Math.max(...weeklyActivity.map(d => d.steps), 12000);

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto px-4 pt-4">
      
      {/* Overview Top Stats Rings Banner */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Performance Analytics
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              Activity & Fitness Streak
            </h1>
          </div>
          
          {/* Active Streak Badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
              {streakDays} Day Workout Streak 🔥
            </span>
          </div>
        </div>

        {/* 3 Main Metric Rings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {/* Steps Ring */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <CircularProgress
              percentage={(activityStats.steps / activityStats.stepsGoal) * 100}
              size={76}
              strokeWidth={8}
              strokeColor="#10b981"
              valueText={`${Math.round(activityStats.steps / 1000)}k`}
              subText="STEPS"
            />
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Daily Steps</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {activityStats.steps.toLocaleString()}
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">Goal: {activityStats.stepsGoal.toLocaleString()}</p>
              <button
                onClick={() => logSteps(500)}
                className="mt-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 font-semibold cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Log +500 steps
              </button>
            </div>
          </div>

          {/* Calories Burned Ring */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <CircularProgress
              percentage={(activityStats.caloriesBurned / activityStats.caloriesGoal) * 100}
              size={76}
              strokeWidth={8}
              strokeColor="#f59e0b"
              valueText={`${activityStats.caloriesBurned}`}
              subText="KCAL"
            />
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Active Burn</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {activityStats.caloriesBurned} kcal
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">Goal: {activityStats.caloriesGoal} kcal</p>
            </div>
          </div>

          {/* Water Intake Ring */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
            <CircularProgress
              percentage={(activityStats.waterMl / activityStats.waterGoalMl) * 100}
              size={76}
              strokeWidth={8}
              strokeColor="#06b6d4"
              valueText={`${(activityStats.waterMl / 1000).toFixed(1)}L`}
              subText="WATER"
            />
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Hydration</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {activityStats.waterMl} ml
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">Target: {activityStats.waterGoalMl} ml</p>
            </div>
          </div>
        </div>

        {/* Aggregate Stats Bar */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Workouts Done</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">{totalWorkoutsCount}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Time</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">{totalWorkoutMinutes}m</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Burn</span>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">{totalCaloriesBurned} kcal</span>
          </div>
        </div>
      </div>

      {/* Weekly Activity Bar Chart */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
              Weekly Step & Workout Cadence
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Daily steps and exercise consistency over the last 7 days
            </p>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTimeframe('week')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTimeframe === 'week' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveTimeframe('month')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTimeframe === 'month' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Monthly View
            </button>
          </div>
        </div>

        {/* Interactive Bar Chart Representation */}
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2">
          {weeklyActivity.map((dayItem, idx) => {
            const heightPercent = Math.round((dayItem.steps / maxSteps) * 100);
            const isToday = idx === weeklyActivity.length - 1;

            return (
              <div key={dayItem.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded pointer-events-none mb-1 whitespace-nowrap tabular-nums">
                  {dayItem.steps.toLocaleString()}
                </div>

                {/* Vertical Bar */}
                <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden h-32 flex items-end">
                  <div
                    className={`w-full rounded-xl transition-all duration-500 ${
                      isToday
                        ? 'bg-emerald-500 shadow-md shadow-emerald-500/30'
                        : dayItem.completed
                        ? 'bg-emerald-600/80 dark:bg-emerald-500/70'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Day Label & completion dot */}
                <div className="flex flex-col items-center">
                  <span className={`text-[11px] font-semibold ${isToday ? 'text-emerald-500' : 'text-slate-500'}`}>
                    {dayItem.day}
                  </span>
                  {dayItem.completed ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mt-1" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Records Cards */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
              Personal Records (PRs)
            </h3>
          </div>
          <span className="text-xs text-slate-400">All-time milestones</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {personalRecords.map((pr) => (
            <div
              key={pr.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">{pr.category}</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{pr.exerciseName}</h4>
                <span className="text-[11px] text-slate-400">Achieved: {pr.dateAchieved}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                  {pr.recordValue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Log of Completed Workouts */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
              Workout History Log
            </h3>
          </div>
          <span className="text-xs text-slate-400">{completedLogs.length} total sessions</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {completedLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {log.workoutTitle}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 capitalize">
                    {log.type}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {new Date(log.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div className="text-right text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 font-mono block">
                  {log.durationMinutes} mins · {log.caloriesBurned} kcal
                </span>
                <span className="text-[10px] text-slate-400">
                  {log.exercisesCount} exercises
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
