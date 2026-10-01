export type FitnessGoal = 
  | 'weight_loss' 
  | 'muscle_building' 
  | 'maintain_fitness' 
  | 'endurance_stamina' 
  | 'flexibility_tone';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type WorkoutLocationPreference = 'home' | 'gym' | 'both';

export type DietPreference = 'vegetarian' | 'non_vegetarian' | 'eggitarian';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  age: number;
  weightKg: number;
  heightCm: number;
  goal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  workoutPreference: WorkoutLocationPreference;
  dietPreference: DietPreference;
  allergies: string[];
  isOnboarded: boolean;
  isAdmin: boolean;
  notificationsEnabled: boolean;
  createdAt: string;
}

export type ExerciseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  id: string;
  name: string;
  type: 'home' | 'gym';
  category: string; // e.g. "Chest", "Legs", "Abs", "Cardio", etc.
  targetMuscles: string[];
  equipment: string; // "Bodyweight", "Dumbbells", "Barbell", "Cable Machine", etc.
  sets: number;
  reps: string; // "12-15 reps" or "45 seconds"
  restSeconds: number;
  difficulty: ExerciseDifficulty;
  shortInstructions: string;
  properForm: string[];
  commonMistakes: string[];
  beginnerAlternative?: string;
  safetyTips: string[];
  videoUrl?: string;
  thumbnailUrl: string;
  durationSeconds?: number;
  estimatedCalories: number;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  subtitle: string;
  type: 'home' | 'gym' | 'custom';
  category: string;
  difficulty: ExerciseDifficulty;
  durationMinutes: number;
  totalCalories: number;
  coverImage: string;
  exercises: Exercise[];
  targetGoal: FitnessGoal;
}

export interface YogaSession {
  id: string;
  title: string;
  category: 'Beginner Yoga' | 'Morning Yoga' | 'Evening Yoga' | 'Flexibility' | 'Relaxation' | 'Breathing exercises' | 'Meditation';
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits: string[];
  instructions: string[];
  safetyGuidance: string[];
  thumbnailUrl: string;
  videoUrl?: string;
  caloriesBurned: number;
  poses: {
    name: string;
    durationSeconds: number;
    description: string;
    focus: string;
  }[];
}

export interface MealItem {
  id: string;
  name: string;
  mealType: 'breakfast' | 'morning_snack' | 'lunch' | 'evening_snack' | 'dinner';
  dietType: DietPreference;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  fiberGrams: number;
  portion: string;
  ingredients: string[];
  prepTimeMinutes: number;
  recipeInstructions?: string;
  image?: string;
}

export interface DailyDietPlan {
  id: string;
  goal: FitnessGoal;
  dietPreference: DietPreference;
  title: string;
  description: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  targetFiber: number;
  meals: {
    breakfast: MealItem[];
    morningSnack: MealItem[];
    lunch: MealItem[];
    eveningSnack: MealItem[];
    dinner: MealItem[];
  };
}

export interface CompletedWorkoutLog {
  id: string;
  workoutTitle: string;
  type: 'home' | 'gym' | 'yoga';
  completedAt: string; // ISO date
  durationMinutes: number;
  exercisesCount: number;
  caloriesBurned: number;
}

export interface PersonalRecord {
  id: string;
  exerciseName: string;
  recordValue: string; // e.g. "35 reps", "100 kg", "2 min 15s"
  dateAchieved: string;
  category: string;
}

export interface DailyActivityStats {
  date: string; // YYYY-MM-DD
  steps: number;
  stepsGoal: number;
  waterMl: number;
  waterGoalMl: number;
  caloriesBurned: number;
  caloriesGoal: number;
  workoutDurationMinutes: number;
  workoutCompleted: boolean;
}
