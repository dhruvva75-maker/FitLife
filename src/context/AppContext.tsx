import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  Exercise, 
  WorkoutPlan, 
  YogaSession, 
  DailyDietPlan, 
  DailyActivityStats, 
  CompletedWorkoutLog, 
  PersonalRecord,
  FitnessGoal,
  DietPreference,
  ExperienceLevel,
  WorkoutLocationPreference 
} from '../types/fitness';
import { 
  INITIAL_USER, 
  HOME_EXERCISES, 
  GYM_EXERCISES, 
  WORKOUT_PLANS, 
  YOGA_SESSIONS, 
  DIET_PLANS, 
  INITIAL_ACTIVITY_STATS, 
  INITIAL_COMPLETED_LOGS, 
  INITIAL_PERSONAL_RECORDS,
  WEEKLY_ACTIVITY 
} from '../data/mockData';

export type NavigationTab = 'home' | 'workout' | 'yoga' | 'diet' | 'progress' | 'profile';

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  
  // Auth & Onboarding
  login: (email: string, pass: string, remember: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (onboardingData: {
    age: number;
    goal: FitnessGoal;
    experienceLevel: ExperienceLevel;
    workoutPreference: WorkoutLocationPreference;
    dietPreference: DietPreference;
    allergies: string[];
  }) => void;

  // Daily Activity
  activityStats: DailyActivityStats;
  logWater: (amountMl: number) => void;
  logSteps: (steps: number) => void;

  // Workouts & Content
  homeExercises: Exercise[];
  gymExercises: Exercise[];
  workoutPlans: WorkoutPlan[];
  yogaSessions: YogaSession[];
  activeDietPlan: DailyDietPlan;
  
  // Detail Modal & Player
  selectedExerciseForModal: Exercise | null;
  setSelectedExerciseForModal: (exercise: Exercise | null) => void;
  activeWorkoutPlanForPlayer: WorkoutPlan | null;
  startWorkout: (plan: WorkoutPlan) => void;
  closePlayer: () => void;
  completeWorkout: (durationMinutes: number, caloriesBurned: number, exercisesCount: number) => void;

  // Yoga Player Modal
  activeYogaSessionForPlayer: YogaSession | null;
  startYogaSession: (session: YogaSession) => void;
  closeYogaPlayer: () => void;

  // Admin CMS
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  adminAddExercise: (exercise: Exercise) => void;
  adminUpdateExercise: (exercise: Exercise) => void;
  adminDeleteExercise: (id: string) => void;
  adminAddYogaSession: (session: YogaSession) => void;
  adminAddWorkoutPlan: (plan: WorkoutPlan) => void;

  // Progress Logs & Records
  personalRecords: PersonalRecord[];
  completedLogs: CompletedWorkoutLog[];
  weeklyActivity: typeof WEEKLY_ACTIVITY;
  streakDays: number;

  // Auth UI triggers
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot') => void;
  isOnboardingOpen: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'fitlife_user_v1',
  AUTH: 'fitlife_is_authenticated_v1',
  THEME: 'fitlife_theme_v1',
  STATS: 'fitlife_stats_v1',
  LOGS: 'fitlife_logs_v1',
  HOME_EX: 'fitlife_home_exercises_v1',
  GYM_EX: 'fitlife_gym_exercises_v1',
  YOGA: 'fitlife_yoga_v1',
  PLANS: 'fitlife_plans_v1',
  PR: 'fitlife_records_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved !== null ? saved === 'true' : true; // Default dark mode for modern fitness look
  });

  // User & Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    return saved !== null ? saved === 'true' : true; // Default logged in for smooth instant preview
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');

  // Exercises & Content State
  const [homeExercises, setHomeExercises] = useState<Exercise[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOME_EX);
    return saved ? JSON.parse(saved) : HOME_EXERCISES;
  });

  const [gymExercises, setGymExercises] = useState<Exercise[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GYM_EX);
    return saved ? JSON.parse(saved) : GYM_EXERCISES;
  });

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLANS);
    return saved ? JSON.parse(saved) : WORKOUT_PLANS;
  });

  const [yogaSessions, setYogaSessions] = useState<YogaSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.YOGA);
    return saved ? JSON.parse(saved) : YOGA_SESSIONS;
  });

  // Daily Activity & Records
  const [activityStats, setActivityStats] = useState<DailyActivityStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_STATS;
  });

  const [completedLogs, setCompletedLogs] = useState<CompletedWorkoutLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : INITIAL_COMPLETED_LOGS;
  });

  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PR);
    return saved ? JSON.parse(saved) : INITIAL_PERSONAL_RECORDS;
  });

  // Modals & Player States
  const [selectedExerciseForModal, setSelectedExerciseForModal] = useState<Exercise | null>(null);
  const [activeWorkoutPlanForPlayer, setActiveWorkoutPlanForPlayer] = useState<WorkoutPlan | null>(null);
  const [activeYogaSessionForPlayer, setActiveYogaSessionForPlayer] = useState<YogaSession | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(activityStats));
  }, [activityStats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(completedLogs));
  }, [completedLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HOME_EX, JSON.stringify(homeExercises));
  }, [homeExercises]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GYM_EX, JSON.stringify(gymExercises));
  }, [gymExercises]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.YOGA, JSON.stringify(yogaSessions));
  }, [yogaSessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(workoutPlans));
  }, [workoutPlans]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Auth Functions
  const login = async (email: string, pass: string, remember: boolean) => {
    if (!email || !pass) {
      return { success: false, error: 'Please enter both email and password.' };
    }
    // Simulate auth success
    const loggedUser: UserProfile = {
      ...INITIAL_USER,
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
    };
    setUser(loggedUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const signup = async (name: string, email: string, pass: string) => {
    if (!name || !email || !pass) {
      return { success: false, error: 'All fields are required.' };
    }
    if (pass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    const newUser: UserProfile = {
      ...INITIAL_USER,
      id: `user_${Date.now()}`,
      name,
      email,
      isOnboarded: false,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setIsOnboardingOpen(true);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    const googleUser: UserProfile = {
      ...INITIAL_USER,
      name: 'Dhruv Sharma',
      email: 'dhruvva75@gmail.com',
    };
    setUser(googleUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
    setAuthModalMode('login');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
  };

  const completeOnboarding = (data: {
    age: number;
    goal: FitnessGoal;
    experienceLevel: ExperienceLevel;
    workoutPreference: WorkoutLocationPreference;
    dietPreference: DietPreference;
    allergies: string[];
  }) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      age: data.age,
      goal: data.goal,
      experienceLevel: data.experienceLevel,
      workoutPreference: data.workoutPreference,
      dietPreference: data.dietPreference,
      allergies: data.allergies,
      isOnboarded: true,
    };
    setUser(updated);
    setIsOnboardingOpen(false);
  };

  // Activity Tracking
  const logWater = (amountMl: number) => {
    setActivityStats(prev => ({
      ...prev,
      waterMl: Math.max(0, Math.min(5000, prev.waterMl + amountMl))
    }));
  };

  const logSteps = (steps: number) => {
    setActivityStats(prev => ({
      ...prev,
      steps: Math.max(0, prev.steps + steps)
    }));
  };

  // Workout Player Controls
  const startWorkout = (plan: WorkoutPlan) => {
    setActiveWorkoutPlanForPlayer(plan);
  };

  const closePlayer = () => {
    setActiveWorkoutPlanForPlayer(null);
  };

  const completeWorkout = (durationMinutes: number, caloriesBurned: number, exercisesCount: number) => {
    if (!activeWorkoutPlanForPlayer) return;
    const newLog: CompletedWorkoutLog = {
      id: `log_${Date.now()}`,
      workoutTitle: activeWorkoutPlanForPlayer.title,
      type: activeWorkoutPlanForPlayer.type as 'home' | 'gym',
      completedAt: new Date().toISOString(),
      durationMinutes,
      exercisesCount,
      caloriesBurned
    };

    setCompletedLogs(prev => [newLog, ...prev]);

    // Update daily activity
    setActivityStats(prev => ({
      ...prev,
      workoutDurationMinutes: prev.workoutDurationMinutes + durationMinutes,
      caloriesBurned: prev.caloriesBurned + caloriesBurned,
      workoutCompleted: true
    }));
  };

  // Yoga Player Controls
  const startYogaSession = (session: YogaSession) => {
    setActiveYogaSessionForPlayer(session);
  };

  const closeYogaPlayer = () => {
    setActiveYogaSessionForPlayer(null);
  };

  // Admin CMS
  const adminAddExercise = (exercise: Exercise) => {
    if (exercise.type === 'home') {
      setHomeExercises(prev => [exercise, ...prev]);
    } else {
      setGymExercises(prev => [exercise, ...prev]);
    }
  };

  const adminUpdateExercise = (exercise: Exercise) => {
    if (exercise.type === 'home') {
      setHomeExercises(prev => prev.map(e => e.id === exercise.id ? exercise : e));
    } else {
      setGymExercises(prev => prev.map(e => e.id === exercise.id ? exercise : e));
    }
  };

  const adminDeleteExercise = (id: string) => {
    setHomeExercises(prev => prev.filter(e => e.id !== id));
    setGymExercises(prev => prev.filter(e => e.id !== id));
  };

  const adminAddYogaSession = (session: YogaSession) => {
    setYogaSessions(prev => [session, ...prev]);
  };

  const adminAddWorkoutPlan = (plan: WorkoutPlan) => {
    setWorkoutPlans(prev => [plan, ...prev]);
  };

  // Smart personalized diet plan selection
  const userGoal = user?.goal || 'muscle_building';
  const userDietPref = user?.dietPreference || 'vegetarian';
  const dietKey = `${userGoal}_${userDietPref}`;
  const activeDietPlan = DIET_PLANS[dietKey] || DIET_PLANS['muscle_building_vegetarian'];

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      isDarkMode,
      toggleDarkMode,
      activeTab,
      setActiveTab,
      login,
      signup,
      loginWithGoogle,
      logout,
      updateProfile,
      completeOnboarding,
      activityStats,
      logWater,
      logSteps,
      homeExercises,
      gymExercises,
      workoutPlans,
      yogaSessions,
      activeDietPlan,
      selectedExerciseForModal,
      setSelectedExerciseForModal,
      activeWorkoutPlanForPlayer,
      startWorkout,
      closePlayer,
      completeWorkout,
      activeYogaSessionForPlayer,
      startYogaSession,
      closeYogaPlayer,
      isAdminOpen,
      setIsAdminOpen,
      adminAddExercise,
      adminUpdateExercise,
      adminDeleteExercise,
      adminAddYogaSession,
      adminAddWorkoutPlan,
      personalRecords,
      completedLogs,
      weeklyActivity: WEEKLY_ACTIVITY,
      streakDays: 6,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalMode,
      setAuthModalMode,
      isOnboardingOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
