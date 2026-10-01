import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DietPreference, 
  FitnessGoal, 
  MealItem 
} from '../../types/fitness';
import { 
  Apple, 
  Droplet, 
  Plus, 
  Minus, 
  Flame, 
  ShieldAlert, 
  Clock, 
  ChefHat, 
  Sparkles, 
  Info,
  CheckCircle 
} from 'lucide-react';

export const DietSection: React.FC = () => {
  const { 
    user, 
    updateProfile, 
    activeDietPlan, 
    activityStats, 
    logWater 
  } = useApp();

  const [activeMealType, setActiveMealType] = useState<'all' | 'breakfast' | 'morning_snack' | 'lunch' | 'evening_snack' | 'dinner'>('all');
  const [selectedMealForRecipe, setSelectedMealForRecipe] = useState<MealItem | null>(null);

  const currentDietPref = user?.dietPreference || 'vegetarian';
  const currentGoal = user?.goal || 'muscle_building';

  const mealTypeLabels: Record<string, { label: string; time: string }> = {
    breakfast: { label: 'Breakfast', time: '8:00 AM' },
    morning_snack: { label: 'Morning Snack', time: '11:00 AM' },
    lunch: { label: 'Lunch', time: '1:30 PM' },
    evening_snack: { label: 'Evening Snack', time: '5:00 PM' },
    dinner: { label: 'Dinner', time: '8:00 PM' },
  };

  const handleGoalChange = (newGoal: FitnessGoal) => {
    updateProfile({ goal: newGoal });
  };

  const handleDietPrefChange = (newPref: DietPreference) => {
    updateProfile({ dietPreference: newPref });
  };

  const plan = activeDietPlan;
  const targetCalories = plan.targetCalories;
  const targetProtein = plan.targetProtein;
  const targetCarbs = plan.targetCarbs;
  const targetFats = plan.targetFats;
  const targetFiber = plan.targetFiber;

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto px-4 pt-4">
      
      {/* Editorial Header */}
      <div className="rounded-3xl bg-emerald-900/20 dark:bg-emerald-950/40 border border-emerald-500/20 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              <Apple className="w-4 h-4" />
              <span>Personalized Whole-Food Nutrition</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              {plan.title}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              {plan.description}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400">Daily Target</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
              {targetCalories} <span className="text-xs font-sans text-slate-500">kcal</span>
            </span>
          </div>
        </div>

        {/* Nutritional Macronutrients Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block">Protein</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono tabular-nums">{targetProtein}g</span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-blue-500 h-full w-4/5 rounded-full" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block">Carbohydrates</span>
            <span className="text-lg font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums">{targetCarbs}g</span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-amber-500 h-full w-3/4 rounded-full" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block">Healthy Fats</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">{targetFats}g</span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-full w-2/3 rounded-full" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block">Dietary Fiber</span>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono tabular-nums">{targetFiber}g</span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-purple-500 h-full w-4/5 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Preference Switchers */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Diet Preference */}
        <div>
          <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-1.5">Diet Type</span>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {(['vegetarian', 'non_vegetarian', 'eggitarian'] as DietPreference[]).map((pref) => (
              <button
                key={pref}
                onClick={() => handleDietPrefChange(pref)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  currentDietPref === pref
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {pref.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Goal switcher */}
        <div>
          <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-1.5">Nutritional Goal</span>
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {[
              { id: 'muscle_building', label: 'Muscle Building' },
              { id: 'weight_loss', label: 'Weight Management' },
              { id: 'maintain_fitness', label: 'Healthy Eating' },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => handleGoalChange(g.id as FitnessGoal)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  currentGoal === g.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Water Intake Section */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-500 flex items-center justify-center">
            <Droplet className="w-6 h-6 fill-cyan-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">Daily Hydration</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activityStats.waterMl} ml logged of {activityStats.waterGoalMl} ml daily goal
            </p>
            <div className="w-48 bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (activityStats.waterMl / activityStats.waterGoalMl) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => logWater(-250)}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm cursor-pointer"
            title="Subtract 250ml"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => logWater(250)}
            className="px-4 h-10 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-cyan-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+250ml Glass</span>
          </button>
        </div>
      </div>

      {/* Meal Timing Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Meals' },
          { id: 'breakfast', label: 'Breakfast' },
          { id: 'morning_snack', label: 'Morning Snack' },
          { id: 'lunch', label: 'Lunch' },
          { id: 'evening_snack', label: 'Evening Snack' },
          { id: 'dinner', label: 'Dinner' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMealType(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeMealType === tab.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Meals List */}
      <div className="space-y-4">
        {Object.entries(plan.meals).map(([mealKey, mealsList]) => {
          if (activeMealType !== 'all' && activeMealType !== mealKey) return null;
          const info = mealTypeLabels[mealKey] || { label: mealKey, time: '' };

          return (
            <div key={mealKey} className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">
                    {info.label}
                  </span>
                  <span className="text-xs text-slate-400">· {info.time}</span>
                </div>
              </div>

              {mealsList.map((meal) => (
                <div
                  key={meal.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {meal.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                        {meal.portion}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{meal.calories} kcal</span>
                      <span>·</span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">{meal.proteinGrams}g Protein</span>
                      <span>·</span>
                      <span>{meal.carbsGrams}g Carbs</span>
                      <span>·</span>
                      <span>{meal.fatsGrams}g Fats</span>
                      <span>·</span>
                      <span>{meal.fiberGrams}g Fiber</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      Ingredients: {meal.ingredients.join(', ')}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedMealForRecipe(meal)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors cursor-pointer shrink-0"
                  >
                    View Prep & Recipe
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Mandatory Medical / Nutrition Health Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950 dark:text-amber-200">
            Professional Medical & Nutrition Disclaimer
          </p>
          <p className="leading-relaxed text-[11px] text-amber-800/90 dark:text-amber-300/80">
            FitLife nutrition guides represent general educational wellness suggestions designed to fuel your daily workouts. FitLife strictly opposes starvation, extreme caloric deficit, and unsafe weight-loss practices. Personalized clinical advice, metabolic evaluation, and dietary adjustments should always be obtained directly from a licensed physician or registered dietitian.
          </p>
        </div>
      </div>

      {/* Recipe Modal */}
      {selectedMealForRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                  {selectedMealForRecipe.mealType.replace('_', ' ')}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                  {selectedMealForRecipe.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMealForRecipe(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-4 gap-2 text-center p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Calories</span>
                  <p className="font-bold text-slate-900 dark:text-white font-mono">{selectedMealForRecipe.calories}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Protein</span>
                  <p className="font-bold text-blue-600 dark:text-blue-400 font-mono">{selectedMealForRecipe.proteinGrams}g</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Carbs</span>
                  <p className="font-bold text-amber-600 dark:text-amber-400 font-mono">{selectedMealForRecipe.carbsGrams}g</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Fats</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{selectedMealForRecipe.fatsGrams}g</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5">Ingredients</h4>
                <ul className="space-y-1 pl-1 text-slate-600 dark:text-slate-300">
                  {selectedMealForRecipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="list-disc ml-4">{ing}</li>
                  ))}
                </ul>
              </div>

              {selectedMealForRecipe.recipeInstructions && (
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Preparation Instructions</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    {selectedMealForRecipe.recipeInstructions}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedMealForRecipe(null)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
