import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FitnessGoal, 
  ExperienceLevel, 
  WorkoutLocationPreference, 
  DietPreference 
} from '../../types/fitness';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Target, 
  Flame, 
  Dumbbell, 
  Home, 
  Building2, 
  Apple, 
  ShieldAlert 
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, completeOnboarding, user } = useApp();

  const [step, setStep] = useState(1);
  const [age, setAge] = useState<number>(user?.age || 26);
  const [goal, setGoal] = useState<FitnessGoal>('muscle_building');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('intermediate');
  const [workoutPreference, setWorkoutPreference] = useState<WorkoutLocationPreference>('both');
  const [dietPreference, setDietPreference] = useState<DietPreference>('vegetarian');
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  if (!isOnboardingOpen) return null;

  const allergyOptions = [
    'Dairy / Lactose',
    'Gluten',
    'Peanuts / Tree Nuts',
    'Shellfish / Seafood',
    'Soy',
    'Eggs',
    'None'
  ];

  const toggleAllergy = (item: string) => {
    if (item === 'None') {
      setSelectedAllergies(['None']);
      return;
    }
    const filtered = selectedAllergies.filter(a => a !== 'None');
    if (filtered.includes(item)) {
      setSelectedAllergies(filtered.filter(a => a !== item));
    } else {
      setSelectedAllergies([...filtered, item]);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      age,
      goal,
      experienceLevel,
      workoutPreference,
      dietPreference,
      allergies: selectedAllergies.filter(a => a !== 'None'),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Step Progress Bar */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Step {step} of 4</span>
            <span>Personalizing FitLife</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">What is your primary goal & age?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  We calibrate your workouts, pacing, and diet specifically to your metabolism.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Age: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{age} years</span>
                </label>
                <input 
                  type="range"
                  min="16"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>16</span>
                  <span>45</span>
                  <span>80</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Primary Fitness Goal
                </label>
                {[
                  { id: 'muscle_building', label: 'Muscle Building & Strength', desc: 'Hypertrophy, progressive overload, high protein' },
                  { id: 'weight_loss', label: 'Fat Loss & Toning', desc: 'Caloric balance, high energy burn, lean conditioning' },
                  { id: 'maintain_fitness', label: 'Maintain Health & Vitality', desc: 'Balanced lifestyle, steady energy, cardiovascular fitness' },
                  { id: 'endurance_stamina', label: 'Endurance & Stamina', desc: 'Athletic stamina, aerobic conditioning, mobility' },
                  { id: 'flexibility_tone', label: 'Flexibility & Mindful Posture', desc: 'Yoga flows, joint mobility, core stability' },
                ].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGoal(g.id as FitnessGoal)}
                    className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      goal === g.id
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{g.label}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{g.desc}</p>
                    </div>
                    {goal === g.id && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Experience Level</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ensures correct exercise difficulty, recommended sets, and rest intervals.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'beginner', title: 'Beginner', subtitle: 'New to exercise or returning after a long break. Need form guidance & baseline strength.' },
                  { id: 'intermediate', title: 'Intermediate', subtitle: 'Consistent workouts for 6+ months. Familiar with core movements and proper lifting form.' },
                  { id: 'advanced', title: 'Advanced', subtitle: 'Disciplined athlete for 2+ years. Ready for high intensity, advanced volume, and complex lifts.' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setExperienceLevel(item.id as ExperienceLevel)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      experienceLevel === item.id
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.subtitle}</p>
                    </div>
                    {experienceLevel === item.id && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Where do you prefer to train?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your environment to see the most relevant exercises and plans first.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'home', label: 'Home Workout', icon: Home, desc: 'Zero equipment, bodyweight & floor mat' },
                  { id: 'gym', label: 'Gym Workout', icon: Building2, desc: 'Barbells, cables & machines' },
                  { id: 'both', label: 'Both / Mixed', icon: Dumbbell, desc: 'Flexible combination based on day' },
                ].map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setWorkoutPreference(opt.id as WorkoutLocationPreference)}
                      className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                        workoutPreference === opt.id
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{opt.label}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Apple className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nutrition & Dietary Choices</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Choose your diet type and specify any allergies for meal suggestions.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Diet Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'vegetarian', label: 'Vegetarian', desc: 'Plant & dairy based' },
                    { id: 'non_vegetarian', label: 'Non-Vegetarian', desc: 'Includes poultry, fish, meats' },
                    { id: 'eggitarian', label: 'Eggitarian', desc: 'Vegetarian + whole eggs' },
                  ].map((diet) => (
                    <button
                      key={diet.id}
                      type="button"
                      onClick={() => setDietPreference(diet.id as DietPreference)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        dietPreference === diet.id
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{diet.label}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{diet.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Any Food Allergies or Restrictions?
                </label>
                <div className="flex flex-wrap gap-2">
                  {allergyOptions.map((alg) => {
                    const isSelected = selectedAllergies.includes(alg);
                    return (
                      <button
                        key={alg}
                        type="button"
                        onClick={() => toggleAllergy(alg)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {alg}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                <p>
                  FitLife provides general wellness guidance. We never encourage extreme diets or starvation; always consult with a licensed healthcare practitioner or registered dietitian for medical dietary needs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Setup & Explore</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
