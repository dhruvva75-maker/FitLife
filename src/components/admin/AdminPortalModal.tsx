import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Exercise, ExerciseDifficulty } from '../../types/fitness';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  ShieldCheck, 
  Dumbbell, 
  Film, 
  Sparkles,
  Layers 
} from 'lucide-react';

export const AdminPortalModal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    homeExercises, 
    gymExercises, 
    adminAddExercise, 
    adminDeleteExercise,
    adminAddYogaSession 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'exercises' | 'add_exercise' | 'yoga'>('exercises');
  
  // New Exercise Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<'home' | 'gym'>('home');
  const [category, setCategory] = useState('Full Body');
  const [targetMuscles, setTargetMuscles] = useState('Chest, Core');
  const [equipment, setEquipment] = useState('Bodyweight');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState('12-15 reps');
  const [restSeconds, setRestSeconds] = useState(45);
  const [difficulty, setDifficulty] = useState<ExerciseDifficulty>('Beginner');
  const [instructions, setInstructions] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [successToast, setSuccessToast] = useState('');

  if (!isAdminOpen) return null;

  const handleAddExerciseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEx: Exercise = {
      id: `custom_ex_${Date.now()}`,
      name,
      type,
      category,
      targetMuscles: targetMuscles.split(',').map(m => m.trim()),
      equipment,
      sets: Number(sets),
      reps,
      restSeconds: Number(restSeconds),
      difficulty,
      shortInstructions: instructions || 'Execute movements with controlled tempo and braced core.',
      properForm: [
        'Maintain spinal alignment and engaged abdominal wall',
        'Move through full active range of motion'
      ],
      commonMistakes: [
        'Rushing repetitions and using momentum'
      ],
      beginnerAlternative: 'Perform with lower intensity or elevated stance.',
      safetyTips: ['Warm up thoroughly prior to heavy load'],
      thumbnailUrl: type === 'home' ? '/src/assets/images/hero_workout_home_1790861840545.jpg' : '/src/assets/images/hero_workout_gym_1790861855051.jpg',
      videoUrl: videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      durationSeconds: 50,
      estimatedCalories: 40
    };

    adminAddExercise(newEx);
    setSuccessToast(`Exercise "${name}" successfully added to ${type} workouts!`);
    setName('');
    setInstructions('');
    setActiveTab('exercises');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const allExercises = [...homeExercises, ...gymExercises];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                FitLife Administrator CMS
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Exercise database, media management, and custom content publishing
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('exercises')}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'exercises' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Manage Exercises ({allExercises.length})
          </button>
          <button
            onClick={() => setActiveTab('add_exercise')}
            className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
              activeTab === 'add_exercise' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Exercise</span>
          </button>
        </div>

        {successToast && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            {successToast}
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">
          {activeTab === 'exercises' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-slate-500 text-[11px] px-1 font-semibold uppercase tracking-wider">
                <span>Exercise Name & Muscles</span>
                <span>Type / Sets / Action</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {allExercises.map((ex) => (
                  <div key={ex.id} className="p-3.5 bg-white dark:bg-slate-900 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-xs">{ex.name}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 capitalize">
                          {ex.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">· {ex.category}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Target: {ex.targetMuscles.join(', ')} · Equip: {ex.equipment}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-600 dark:text-slate-300 text-xs">
                        {ex.sets} sets · {ex.reps}
                      </span>
                      <button
                        onClick={() => adminDeleteExercise(ex.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Remove Exercise"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleAddExerciseSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Exercise Title *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bulgarian Split Squat"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Environment / Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'home' | 'gym')}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="home">Home (Bodyweight/Mat)</option>
                    <option value="gym">Gym (Equipment/Weights)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Muscle Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Chest, Legs, Abs"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Equipment</label>
                  <input
                    type="text"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    placeholder="e.g. Dumbbells, Bodyweight"
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as ExerciseDifficulty)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Sets</label>
                  <input
                    type="number"
                    value={sets}
                    onChange={(e) => setSets(Number(e.target.value))}
                    min="1"
                    max="10"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reps / Cadence</label>
                  <input
                    type="text"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="e.g. 10-12 reps"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Rest Interval (Seconds)</label>
                  <input
                    type="number"
                    value={restSeconds}
                    onChange={(e) => setRestSeconds(Number(e.target.value))}
                    min="15"
                    max="180"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Muscles (comma separated)</label>
                <input
                  type="text"
                  value={targetMuscles}
                  onChange={(e) => setTargetMuscles(e.target.value)}
                  placeholder="Quadriceps, Glutes, Calves"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Video Stream or Demonstration URL</label>
                <div className="relative">
                  <Film className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Form Instructions & Cue</label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={3}
                  placeholder="Key form cues and setup instructions..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('exercises')}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-sm shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Exercise to Database</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
