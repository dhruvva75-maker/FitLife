import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { YogaSession } from '../../types/fitness';
import { 
  Play, 
  Pause, 
  Clock, 
  Flame, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Wind, 
  X, 
  RotateCcw, 
  Check, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  Compass 
} from 'lucide-react';
import { VideoModal } from '../common/VideoModal';

export const YogaSection: React.FC = () => {
  const { 
    yogaSessions, 
    activeYogaSessionForPlayer, 
    startYogaSession, 
    closeYogaPlayer 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSessionDetails, setActiveSessionDetails] = useState<YogaSession | null>(null);
  const [videoDemoUrl, setVideoDemoUrl] = useState<{ isOpen: boolean; title: string; url?: string }>({
    isOpen: false,
    title: ''
  });

  // Guided yoga session player states
  const [currentPoseIdx, setCurrentPoseIdx] = useState(0);
  const [poseSecondsLeft, setPoseSecondsLeft] = useState(60);
  const [isSessionPlaying, setIsSessionPlaying] = useState(true);
  const [isAmbientSoundOn, setIsAmbientSoundOn] = useState(true);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);

  const categories = [
    'All',
    'Morning Yoga',
    'Evening Yoga',
    'Beginner Yoga',
    'Flexibility',
    'Relaxation',
    'Breathing exercises',
    'Meditation'
  ];

  const filteredSessions = selectedCategory === 'All'
    ? yogaSessions
    : yogaSessions.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Timer loop for yoga session player
  useEffect(() => {
    let interval: number;
    if (activeYogaSessionForPlayer && isSessionPlaying && !isSessionCompleted) {
      interval = window.setInterval(() => {
        setPoseSecondsLeft(prev => {
          if (prev <= 1) {
            const poses = activeYogaSessionForPlayer.poses;
            if (currentPoseIdx < poses.length - 1) {
              setCurrentPoseIdx(i => i + 1);
              return poses[currentPoseIdx + 1]?.durationSeconds || 60;
            } else {
              setIsSessionCompleted(true);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeYogaSessionForPlayer, isSessionPlaying, currentPoseIdx, isSessionCompleted]);

  const handleStartSession = (session: YogaSession) => {
    setCurrentPoseIdx(0);
    setPoseSecondsLeft(session.poses[0]?.durationSeconds || 60);
    setIsSessionPlaying(true);
    setIsSessionCompleted(false);
    startYogaSession(session);
    setActiveSessionDetails(null);
  };

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto px-4 pt-4">
      
      {/* Editorial Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/20 dark:border-slate-800 p-6 sm:p-8 text-white">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
            <Compass className="w-4 h-4" />
            <span>Mindfulness & Somatic Restoration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-['Outfit']">
            Inner Harmony & Mobility
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Calm your nervous system, expand joint range of motion, and build serene core endurance with guided yoga sequences and pranayama breathwork.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-900/30 to-transparent pointer-events-none" />
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
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

      {/* Yoga Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Visual Cover */}
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img
                src={session.thumbnailUrl}
                alt={session.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                onError={(e) => {
                  (e.target as HTMLElement).style.opacity = '0.3';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
              
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-600 text-white backdrop-blur-md">
                  {session.category}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/50 text-slate-200 backdrop-blur-md">
                  {session.difficulty}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {session.durationMinutes} mins
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  ~{session.caloriesBurned} kcal
                </span>
              </div>
            </div>

            {/* Session Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                  {session.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {session.benefits[0]}
                </p>
              </div>

              {/* Poselist preview */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider block">
                  Featured Flow & Postures:
                </span>
                <div className="flex flex-wrap gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {session.poses.slice(0, 3).map((p, i) => (
                    <span key={p.name}>
                      {p.name}{i < Math.min(2, session.poses.length - 1) ? ' · ' : ''}
                    </span>
                  ))}
                  {session.poses.length > 3 && (
                    <span> +{session.poses.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setActiveSessionDetails(session)}
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  View Postures & Guide
                </button>
                <button
                  onClick={() => handleStartSession(session)}
                  className="py-2 px-4 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Session</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Session Details Modal */}
      {activeSessionDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {activeSessionDetails.category} · {activeSessionDetails.durationMinutes} mins
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
                  {activeSessionDetails.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveSessionDetails(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Benefits */}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-xs mb-1.5 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Health & Mental Benefits
                </h4>
                <ul className="space-y-1 pl-1 text-slate-600 dark:text-slate-300">
                  {activeSessionDetails.benefits.map((b, idx) => (
                    <li key={idx} className="list-disc ml-4 leading-relaxed">{b}</li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-xs mb-1.5 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-emerald-500" />
                  Mindful Practice Guidance
                </h4>
                <ul className="space-y-1.5 pl-1">
                  {activeSessionDetails.instructions.map((ins, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Poses Timeline */}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-xs mb-2">
                  Pose Sequence & Timing
                </h4>
                <div className="space-y-2">
                  {activeSessionDetails.poses.map((p, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{p.description}</p>
                      </div>
                      <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400 text-xs shrink-0 ml-3">
                        {p.durationSeconds}s
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety */}
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Safety Guidance
                </h4>
                <ul className="space-y-1 pl-1 text-emerald-800 dark:text-emerald-300/80">
                  {activeSessionDetails.safetyGuidance.map((sg, idx) => (
                    <li key={idx} className="list-disc ml-4">{sg}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <button
                onClick={() => setVideoDemoUrl({ isOpen: true, title: activeSessionDetails.title, url: activeSessionDetails.videoUrl })}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Watch Flow Video</span>
              </button>
              <button
                onClick={() => handleStartSession(activeSessionDetails)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Session With Timer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Peaceful Yoga Player Modal */}
      {activeYogaSessionForPlayer && (
        <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-5 animate-in fade-in duration-300 select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <button
              onClick={closeYogaPlayer}
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <span className="text-[10px] text-emerald-400 uppercase font-semibold tracking-wider">
                {activeYogaSessionForPlayer.category}
              </span>
              <h3 className="text-sm font-bold text-white">
                {activeYogaSessionForPlayer.title}
              </h3>
            </div>
            <button
              onClick={() => setIsAmbientSoundOn(!isAmbientSoundOn)}
              className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
            >
              {isAmbientSoundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {!isSessionCompleted ? (
            <div className="max-w-md mx-auto w-full my-auto text-center space-y-6">
              {/* Peaceful Meditation Visual Indicator */}
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-2 border-emerald-500/30 ${isSessionPlaying ? 'animate-ping duration-1000' : ''}`} />
                <div className="w-40 h-40 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex flex-col items-center justify-center backdrop-blur-md shadow-2xl">
                  <span className="text-4xl font-extrabold font-mono text-white tabular-nums">
                    {poseSecondsLeft}s
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-emerald-400 mt-1">
                    Breathe Deeply
                  </span>
                </div>
              </div>

              {/* Current Pose Details */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Pose {currentPoseIdx + 1} of {activeYogaSessionForPlayer.poses.length}</span>
                  <span className="text-emerald-400 font-semibold">{activeYogaSessionForPlayer.poses[currentPoseIdx]?.focus}</span>
                </div>
                <h4 className="text-lg font-bold text-white font-['Outfit']">
                  {activeYogaSessionForPlayer.poses[currentPoseIdx]?.name}
                </h4>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {activeYogaSessionForPlayer.poses[currentPoseIdx]?.description}
                </p>
              </div>

              {/* Player Controllers */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => {
                    if (currentPoseIdx > 0) {
                      setCurrentPoseIdx(prev => prev - 1);
                      setPoseSecondsLeft(activeYogaSessionForPlayer.poses[currentPoseIdx - 1]?.durationSeconds || 60);
                    }
                  }}
                  disabled={currentPoseIdx === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-30 cursor-pointer"
                >
                  Prev Pose
                </button>
                <button
                  onClick={() => setIsSessionPlaying(!isSessionPlaying)}
                  className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  {isSessionPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                </button>
                <button
                  onClick={() => {
                    if (currentPoseIdx < activeYogaSessionForPlayer.poses.length - 1) {
                      setCurrentPoseIdx(prev => prev + 1);
                      setPoseSecondsLeft(activeYogaSessionForPlayer.poses[currentPoseIdx + 1]?.durationSeconds || 60);
                    } else {
                      setIsSessionCompleted(true);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  Next Pose
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto w-full my-auto text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-['Outfit']">Session Complete. Namaste 🙏</h3>
              <p className="text-xs text-slate-400">
                You have restored mental clarity, lengthened tight muscles, and replenished vital energy.
              </p>
              <button
                onClick={closeYogaPlayer}
                className="mt-4 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/30 cursor-pointer"
              >
                Return to Yoga Center
              </button>
            </div>
          )}
        </div>
      )}

      {/* Video Modal */}
      <VideoModal
        isOpen={videoDemoUrl.isOpen}
        onClose={() => setVideoDemoUrl({ isOpen: false, title: '' })}
        title={videoDemoUrl.title}
        videoUrl={videoDemoUrl.url}
      />
    </div>
  );
};
