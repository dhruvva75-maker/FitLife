import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Exercise } from '../../types/fitness';
import { 
  X, 
  Play, 
  Clock, 
  Flame, 
  Dumbbell, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { VideoModal } from '../common/VideoModal';

export const ExerciseDetailModal: React.FC = () => {
  const { 
    selectedExerciseForModal, 
    setSelectedExerciseForModal, 
    startWorkout, 
    workoutPlans 
  } = useApp();

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  if (!selectedExerciseForModal) return null;

  const ex = selectedExerciseForModal;

  const handleStartSoloExercise = () => {
    // Wrap solo exercise into a dedicated mini workout plan for player
    startWorkout({
      id: `solo_${ex.id}`,
      title: ex.name,
      subtitle: `${ex.difficulty} • ${ex.category} • ${ex.equipment}`,
      type: ex.type,
      category: ex.category,
      difficulty: ex.difficulty,
      durationMinutes: Math.round((ex.durationSeconds || 60) * ex.sets / 60) || 5,
      totalCalories: ex.estimatedCalories * ex.sets,
      coverImage: ex.thumbnailUrl,
      exercises: [ex],
      targetGoal: 'maintain_fitness'
    });
    setSelectedExerciseForModal(null);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
        <div 
          className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Media Banner */}
          <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden shrink-0">
            <img 
              src={ex.thumbnailUrl} 
              alt={ex.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80"
              onError={(e) => {
                (e.target as HTMLElement).style.opacity = '0.3';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedExerciseForModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Play CTA */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-white ml-1" />
            </button>

            {/* Title & Category on Image */}
            <div className="absolute bottom-3 left-4 right-4">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
                <span>{ex.type === 'home' ? 'Home Bodyweight' : 'Gym Equipment'}</span>
                <span>·</span>
                <span>{ex.category}</span>
                <span>·</span>
                <span>{ex.difficulty}</span>
              </div>
              <h2 className="text-xl font-bold text-white truncate font-['Outfit']">{ex.name}</h2>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 py-3 text-center text-xs">
            <div>
              <span className="block text-slate-400 text-[10px] uppercase font-semibold">Sets</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{ex.sets}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] uppercase font-semibold">Reps / Time</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{ex.reps}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] uppercase font-semibold">Rest</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{ex.restSeconds}s</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] uppercase font-semibold">Calories</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">~{ex.estimatedCalories * ex.sets} kcal</span>
            </div>
          </div>

          {/* Scrollable Content Details */}
          <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
            {/* Target Muscles & Equipment */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">Target Muscles:</span>
                {ex.targetMuscles.map((muscle, idx) => (
                  <span key={muscle}>
                    {muscle}{idx < ex.targetMuscles.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">Required Equipment:</span>
                <span>{ex.equipment}</span>
              </div>
            </div>

            {/* Overview Instructions */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs mb-1">Executive Summary</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{ex.shortInstructions}</p>
            </div>

            {/* Proper Form Instructions */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Proper Form & Execution
              </h4>
              <ul className="space-y-1.5 pl-1">
                {ex.properForm.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Common Mistakes to Avoid
              </h4>
              <ul className="space-y-1.5 pl-1">
                {ex.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <span className="text-amber-500 font-bold shrink-0">✕</span>
                    <span className="leading-relaxed">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beginner Alternative */}
            {ex.beginnerAlternative && (
              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 rounded-xl">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1">
                  <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Beginner Alternative
                </h4>
                <p className="text-blue-800 dark:text-blue-300/90 leading-relaxed">
                  {ex.beginnerAlternative}
                </p>
              </div>
            )}

            {/* Safety Tips */}
            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl">
              <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Joint Safety & Injury Prevention
              </h4>
              <ul className="space-y-1 pl-1">
                {ex.safetyTips.map((tip, idx) => (
                  <li key={idx} className="text-emerald-800 dark:text-emerald-300/80 list-disc ml-3">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Watch Video Demo</span>
            </button>
            <button
              onClick={handleStartSoloExercise}
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch In Player</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Demonstration Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={ex.name}
        videoUrl={ex.videoUrl}
        thumbnailUrl={ex.thumbnailUrl}
        targetMuscles={ex.targetMuscles}
      />
    </>
  );
};
