import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Exercise, WorkoutPlan } from '../../types/fitness';
import { 
  Dumbbell, 
  Home, 
  Building2, 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Flame, 
  ChevronRight, 
  Sparkles, 
  CheckCircle, 
  Info 
} from 'lucide-react';
import { VideoModal } from '../common/VideoModal';

export const WorkoutSection: React.FC = () => {
  const { 
    homeExercises, 
    gymExercises, 
    workoutPlans, 
    setSelectedExerciseForModal, 
    startWorkout 
  } = useApp();

  const [activeTypeTab, setActiveTypeTab] = useState<'home' | 'gym'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Video preview player
  const [videoModalData, setVideoModalData] = useState<{
    isOpen: boolean;
    title: string;
    url?: string;
    thumbnail?: string;
    targetMuscles?: string[];
  }>({
    isOpen: false,
    title: ''
  });

  const homeCategories = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Full Body',
    'Abs',
    'Chest',
    'Arms',
    'Legs',
    'Back',
    'Cardio',
    'Fat-loss focused',
    'Mobility'
  ];

  const gymCategories = [
    'All',
    'Chest',
    'Back',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Legs',
    'Full Body',
    'Beginner Gym Plan'
  ];

  const activeCategories = activeTypeTab === 'home' ? homeCategories : gymCategories;
  const currentExercises = activeTypeTab === 'home' ? homeExercises : gymExercises;

  // Filter exercises
  const filteredExercises = currentExercises.filter((ex) => {
    // Type match
    if (ex.type !== activeTypeTab) return false;

    // Category match
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Beginner' || selectedCategory === 'Intermediate' || selectedCategory === 'Advanced') {
        if (ex.difficulty !== selectedCategory) return false;
      } else if (selectedCategory === 'Beginner Gym Plan') {
        if (ex.difficulty !== 'Beginner') return false;
      } else {
        if (!ex.category.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
      }
    }

    // Difficulty match
    if (selectedDifficulty !== 'All' && ex.difficulty !== selectedDifficulty) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ex.name.toLowerCase().includes(q);
      const matchCategory = ex.category.toLowerCase().includes(q);
      const matchMuscles = ex.targetMuscles.some(m => m.toLowerCase().includes(q));
      const matchEquipment = ex.equipment.toLowerCase().includes(q);
      if (!matchName && !matchCategory && !matchMuscles && !matchEquipment) return false;
    }

    return true;
  });

  // Relevant workout plans for this tab
  const relevantPlans = workoutPlans.filter(p => p.type === activeTypeTab || p.type === 'custom');

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto px-4 pt-4">
      
      {/* Top Toggle: Home Workout vs Gym Workout */}
      <div className="p-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center shadow-sm">
        <button
          onClick={() => { setActiveTypeTab('home'); setSelectedCategory('All'); }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTypeTab === 'home'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home Workout</span>
        </button>

        <button
          onClick={() => { setActiveTypeTab('gym'); setSelectedCategory('All'); }}
          className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTypeTab === 'gym'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Gym Workout</span>
        </button>
      </div>

      {/* Featured Workout Plans Carousel / Banner */}
      {relevantPlans.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-['Outfit']">
              Recommended Routine Plans
            </h2>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Curated by FitLife
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relevantPlans.map((plan) => (
              <div
                key={plan.id}
                className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between p-5 text-white group"
              >
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white">
                      {plan.difficulty}
                    </span>
                    <span className="text-xs text-slate-300">
                      {plan.category} · {plan.exercises.length} Exercises
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-['Outfit'] group-hover:text-emerald-400 transition-colors">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {plan.subtitle}
                  </p>
                </div>

                <div className="relative z-10 pt-4 flex items-center justify-between border-t border-slate-800/80 mt-3 text-xs">
                  <div className="flex items-center gap-3 text-slate-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {plan.durationMinutes}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      ~{plan.totalCalories} kcal
                    </span>
                  </div>

                  <button
                    onClick={() => startWorkout(plan)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start Routine</span>
                  </button>
                </div>

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-emerald-950/80 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Difficulty Filter Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTypeTab === 'home' ? 'bodyweight movements, abs, pushups' : 'bench press, cables, machines'}...`}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-500 shadow-sm cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Filter Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {activeCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercises Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Showing {filteredExercises.length} {activeTypeTab === 'home' ? 'Home' : 'Gym'} Exercises</span>
        <span>Tap any exercise for instructions & video</span>
      </div>

      {/* Exercises List / Cards Grid */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Media Thumbnail */}
              <div className="relative h-36 sm:h-40 bg-slate-900 overflow-hidden">
                <img
                  src={exercise.thumbnailUrl}
                  alt={exercise.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.3';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Badges on Thumbnail */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-600 text-white">
                    {exercise.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/50 text-slate-200 backdrop-blur-md">
                    {exercise.difficulty}
                  </span>
                </div>

                {/* Quick Video Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoModalData({
                      isOpen: true,
                      title: exercise.name,
                      url: exercise.videoUrl,
                      thumbnail: exercise.thumbnailUrl,
                      targetMuscles: exercise.targetMuscles
                    });
                  }}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                  title="Watch Video Demonstration"
                >
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </button>

                <div className="absolute bottom-3 left-3 text-xs text-white font-semibold truncate max-w-[70%]">
                  {exercise.targetMuscles[0]}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit'] group-hover:text-emerald-500 transition-colors">
                    {exercise.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {exercise.shortInstructions}
                  </p>
                </div>

                {/* Metrics Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-x-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{exercise.sets} sets</span>
                    <span>·</span>
                    <span>{exercise.reps}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>{exercise.restSeconds}s rest</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedExerciseForModal(exercise)}
                    className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer text-center"
                  >
                    View Form & Tips
                  </button>
                  <button
                    onClick={() => {
                      startWorkout({
                        id: `solo_${exercise.id}`,
                        title: exercise.name,
                        subtitle: `${exercise.difficulty} • ${exercise.category}`,
                        type: exercise.type,
                        category: exercise.category,
                        difficulty: exercise.difficulty,
                        durationMinutes: 5,
                        totalCalories: exercise.estimatedCalories * exercise.sets,
                        coverImage: exercise.thumbnailUrl,
                        exercises: [exercise],
                        targetGoal: 'maintain_fitness'
                      });
                    }}
                    className="py-2 px-3 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                    title="Start Exercise Now"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Train</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Dumbbell className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">No exercises found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Try resetting your search query or selecting a different muscle group category.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Video Modal Trigger */}
      <VideoModal
        isOpen={videoModalData.isOpen}
        onClose={() => setVideoModalData({ isOpen: false, title: '' })}
        title={videoModalData.title}
        videoUrl={videoModalData.url}
        thumbnailUrl={videoModalData.thumbnail}
        targetMuscles={videoModalData.targetMuscles}
      />
    </div>
  );
};
