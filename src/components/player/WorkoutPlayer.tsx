import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Check, 
  Flame, 
  Clock, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Trophy, 
  Sparkles, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WorkoutPlayer: React.FC = () => {
  const { 
    activeWorkoutPlanForPlayer, 
    closePlayer, 
    completeWorkout 
  } = useApp();

  const plan = activeWorkoutPlanForPlayer;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restSecondsRemaining, setRestSecondsRemaining] = useState(45);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTotalSeconds, setElapsedTotalSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Timer intervals
  const totalTimerRef = useRef<number | null>(null);
  const restTimerRef = useRef<number | null>(null);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } catch (e) {
      // safe fallback
    }
  };

  useEffect(() => {
    if (!plan || isCompleted) return;

    // Start total elapsed timer
    totalTimerRef.current = window.setInterval(() => {
      if (!isPaused) {
        setElapsedTotalSeconds(prev => prev + 1);
      }
    }, 1000);

    return () => {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    };
  }, [plan, isPaused, isCompleted]);

  // Handle rest timer countdown
  useEffect(() => {
    if (isResting && !isPaused) {
      restTimerRef.current = window.setInterval(() => {
        setRestSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(restTimerRef.current!);
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    }

    return () => {
      if (restTimerRef.current) clearInterval(restTimerRef.current);
    };
  }, [isResting, isPaused]);

  if (!plan) return null;

  const currentExercise = plan.exercises[currentExerciseIndex] || plan.exercises[0];
  const totalExercises = plan.exercises.length;
  const progressPercent = Math.round(((currentExerciseIndex + (currentSet / currentExercise.sets)) / totalExercises) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleNextSet = () => {
    if (currentSet < currentExercise.sets) {
      setCurrentSet(prev => prev + 1);
      setIsResting(true);
      setRestSecondsRemaining(currentExercise.restSeconds || 45);
    } else {
      // Completed all sets for this exercise
      if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        setIsResting(true);
        setRestSecondsRemaining(currentExercise.restSeconds || 45);
      } else {
        // Entire workout finished!
        handleFinishWorkout();
      }
    }
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setIsResting(false);
    } else {
      handleFinishWorkout();
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setCurrentSet(1);
      setIsResting(false);
    }
  };

  const handleFinishWorkout = () => {
    setIsCompleted(true);
    triggerConfetti();
    const durationMins = Math.max(1, Math.round(elapsedTotalSeconds / 60));
    const estimatedBurned = Math.round((plan.totalCalories * Math.max(1, durationMins)) / (plan.durationMinutes || 30));
    completeWorkout(durationMins, estimatedBurned, totalExercises);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between overflow-hidden select-none animate-in fade-in duration-300">
      
      {/* 1. Header Bar */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/90 z-20">
        <button
          onClick={closePlayer}
          className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center truncate px-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
            {plan.title}
          </p>
          <p className="text-xs text-slate-400">
            Exercise {currentExerciseIndex + 1} of {totalExercises}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>{formatTime(elapsedTotalSeconds)}</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-900 h-1">
        <div 
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
        />
      </div>

      {/* 2. Main Player Body */}
      {!isCompleted ? (
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 max-w-xl mx-auto w-full overflow-y-auto">
          
          {/* Demonstration Video / Visual Screen */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center">
            <video
              src={currentExercise.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
              poster={currentExercise.thumbnailUrl}
              autoPlay
              loop
              muted={isSoundMuted}
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

            {/* Video overlay badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md">
                {currentExercise.category}
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/50 text-slate-200 backdrop-blur-md">
                {currentExercise.equipment}
              </span>
            </div>

            <button
              onClick={() => setIsSoundMuted(!isSoundMuted)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Rest Timer Overlay */}
            {isResting && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
                  Rest & Breathe
                </span>
                <span className="text-5xl font-extrabold text-white font-mono tabular-nums mb-3">
                  {restSecondsRemaining}s
                </span>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  Next up: Set {currentSet} of {currentExercise.sets}
                </p>
                <button
                  onClick={() => setIsResting(false)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>Skip Rest Timer</span>
                </button>
              </div>
            )}
          </div>

          {/* Exercise Info & Active Set Card */}
          <div className="mt-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-['Outfit']">{currentExercise.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target: {currentExercise.targetMuscles.join(' · ')}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Set</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  {currentSet} <span className="text-xs text-slate-500">/ {currentExercise.sets}</span>
                </span>
              </div>
            </div>

            {/* Recommended Reps & Target */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target Reps</span>
                <span className="text-base font-bold text-white font-mono">{currentExercise.reps}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Rest Interval</span>
                <span className="text-base font-bold text-white font-mono">{currentExercise.restSeconds} sec</span>
              </div>
            </div>

            {/* Micro Form Cue */}
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <strong className="text-emerald-400">Coach Tip: </strong>
              {currentExercise.properForm[0] || currentExercise.shortInstructions}
            </div>
          </div>

          {/* Action Controllers */}
          <div className="mt-4 flex items-center justify-between gap-3">
            {/* Prev Exercise */}
            <button
              onClick={handlePreviousExercise}
              disabled={currentExerciseIndex === 0}
              className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              title="Previous Exercise"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Pause / Resume */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title={isPaused ? 'Resume Workout' : 'Pause Workout'}
            >
              {isPaused ? <Play className="w-5 h-5 text-emerald-400 fill-emerald-400 ml-0.5" /> : <Pause className="w-5 h-5" />}
            </button>

            {/* Complete Set / Next */}
            <button
              onClick={handleNextSet}
              className="flex-1 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>
                {currentSet < currentExercise.sets
                  ? `Finish Set ${currentSet}`
                  : currentExerciseIndex < totalExercises - 1
                  ? 'Complete & Next Exercise'
                  : 'Complete Workout 🎉'}
              </span>
            </button>

            {/* Skip Exercise */}
            <button
              onClick={handleSkipExercise}
              className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Skip Exercise"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

        </div>
      ) : (
        /* 3. Workout Completed Screen */
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 shadow-xl">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
            Workout Complete 🎉
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xs">
            Incredible dedication! You crushed {plan.title}.
          </p>

          {/* Celebration Stat Badges */}
          <div className="grid grid-cols-3 gap-3 w-full my-6">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <Clock className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="text-lg font-bold text-white font-mono block">
                {Math.max(1, Math.round(elapsedTotalSeconds / 60))}m
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Duration</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <Flame className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="text-lg font-bold text-white font-mono block">
                {plan.totalCalories}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Calories</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <Check className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="text-lg font-bold text-white font-mono block">
                {totalExercises}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Exercises</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200/90 text-left w-full mb-6">
            <p className="font-semibold text-emerald-300 mb-0.5">Progress Saved to Dashboard</p>
            <p className="text-[11px] text-emerald-200/70">
              Your workout history, calorie burn, and weekly streak have been automatically updated.
            </p>
          </div>

          <button
            onClick={closePlayer}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
          >
            <span>Done & Return to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
