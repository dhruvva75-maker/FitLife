import { 
  Exercise, 
  WorkoutPlan, 
  YogaSession, 
  DailyDietPlan, 
  UserProfile, 
  PersonalRecord,
  DailyActivityStats,
  CompletedWorkoutLog 
} from '../types/fitness';

export const ASSET_IMAGES = {
  heroHome: '/src/assets/images/hero_workout_home_1790861840545.jpg',
  heroGym: '/src/assets/images/hero_workout_gym_1790861855051.jpg',
  heroYoga: '/src/assets/images/hero_yoga_peace_1790861866849.jpg',
  heroDiet: '/src/assets/images/hero_diet_nutrition_1790861879166.jpg',
  userAvatar: '/src/assets/images/user_avatar_dhruv_1790861893018.jpg',
};

export const INITIAL_USER: UserProfile = {
  id: 'user_dhruv_101',
  name: 'Dhruv',
  email: 'dhruvva75@gmail.com',
  avatarUrl: ASSET_IMAGES.userAvatar,
  age: 26,
  weightKg: 72,
  heightCm: 178,
  goal: 'muscle_building',
  experienceLevel: 'intermediate',
  workoutPreference: 'both',
  dietPreference: 'vegetarian',
  allergies: [],
  isOnboarded: true,
  isAdmin: true,
  notificationsEnabled: true,
  createdAt: '2026-01-15T08:00:00.000Z',
};

export const HOME_EXERCISES: Exercise[] = [
  {
    id: 'home_pushups',
    name: 'Standard Push-ups',
    type: 'home',
    category: 'Chest',
    targetMuscles: ['Chest', 'Triceps', 'Front Shoulders', 'Core'],
    equipment: 'Bodyweight',
    sets: 3,
    reps: '12-15 reps',
    restSeconds: 45,
    difficulty: 'Beginner',
    shortInstructions: 'Plant hands shoulder-width apart, keep body in a rigid line, lower until chest hovers just above floor, then press up firmly.',
    properForm: [
      'Maintain an active plank position with glutes and core engaged',
      'Keep elbows at a 45-degree arrow angle, avoid flaring out 90 degrees',
      'Lower under control for 2 seconds, drive up explosively',
      'Inhale on the way down, exhale through the mouth on the press'
    ],
    commonMistakes: [
      'Sagging hips or piking buttocks into the air',
      'Flaring elbows perpendicular to torso, straining rotator cuffs',
      'Incomplete range of motion without full elbow extension'
    ],
    beginnerAlternative: 'Incline push-ups on a sturdy chair or kitchen countertop, or knee-supported push-ups.',
    safetyTips: [
      'Warm up wrists with circular rotations prior to sets',
      'Stop if you feel sharp pain in wrists or anterior shoulder joints'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 45,
    estimatedCalories: 35
  },
  {
    id: 'home_squats',
    name: 'Bodyweight Air Squats',
    type: 'home',
    category: 'Legs',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    equipment: 'Bodyweight',
    sets: 4,
    reps: '15-20 reps',
    restSeconds: 45,
    difficulty: 'Beginner',
    shortInstructions: 'Stand with feet shoulder-width, drive hips back and downward like sitting into a low chair, keep chest proud and press through full foot.',
    properForm: [
      'Distribute weight evenly between midfoot and heel',
      'Knees track outward in line with your second and third toes',
      'Descend until thighs are parallel to ground or slightly below',
      'Keep chest elevated and gaze forward'
    ],
    commonMistakes: [
      'Knees caving inward (valgus collapse)',
      'Heels lifting off the ground while driving forward into knees',
      'Rounding the lower back in the bottom of the squat'
    ],
    beginnerAlternative: 'Box squats: Sit back onto a dining chair, lightly touch the seat, then stand back up.',
    safetyTips: [
      'Do not bounce abruptly at the bottom of the movement',
      'Maintain gentle spinal neutrality throughout'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    durationSeconds: 50,
    estimatedCalories: 45
  },
  {
    id: 'home_lunges',
    name: 'Walking & Reverse Lunges',
    type: 'home',
    category: 'Legs',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    equipment: 'Bodyweight',
    sets: 3,
    reps: '12 reps per leg',
    restSeconds: 45,
    difficulty: 'Beginner',
    shortInstructions: 'Step backward or forward with one leg, lower both knees to 90 degrees, press through front heel to return to standing.',
    properForm: [
      'Maintain upright torso with shoulders aligned over hips',
      'Front knee should stay directly stacked over ankle, not past toes',
      'Back knee hovers 1-2 inches above the floor without slamming down',
      'Engage core for lateral balance'
    ],
    commonMistakes: [
      'Leaning aggressively forward over front knee',
      'Walking on a tightrope (keep feet hip-distance wide for stability)',
      'Banging back kneecap onto hard flooring'
    ],
    beginnerAlternative: 'Static split squats while holding onto a wall or sturdy table for balance support.',
    safetyTips: [
      'Perform on a soft rug or exercise mat for knee comfort'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    durationSeconds: 60,
    estimatedCalories: 40
  },
  {
    id: 'home_plank',
    name: 'Forearm Core Plank',
    type: 'home',
    category: 'Abs',
    targetMuscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Glutes', 'Deltoids'],
    equipment: 'Bodyweight',
    sets: 3,
    reps: '45-60 seconds',
    restSeconds: 30,
    difficulty: 'Beginner',
    shortInstructions: 'Rest on forearms with elbows beneath shoulders. Form a straight line from crown of head to heels and breathe rhythmically.',
    properForm: [
      'Elbows directly under shoulder joints',
      'Pull belly button upward towards spine and squeeze glutes actively',
      'Gaze at the floor between your wrists to keep neck neutral',
      'Maintain steady, diaphragmatic breathing'
    ],
    commonMistakes: [
      'Arching low back or letting stomach sag toward mat',
      'Hiking hips high up in the air',
      'Holding breath causing elevated intra-thoracic pressure'
    ],
    beginnerAlternative: 'Knee plank or elevated forearm plank on an ottoman.',
    safetyTips: [
      'Release the position immediately if lower back takes excessive load'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    durationSeconds: 45,
    estimatedCalories: 30
  },
  {
    id: 'home_mountain_climbers',
    name: 'Dynamic Mountain Climbers',
    type: 'home',
    category: 'Cardio',
    targetMuscles: ['Abs', 'Hip Flexors', 'Shoulders', 'Cardiovascular System'],
    equipment: 'Bodyweight',
    sets: 3,
    reps: '40 seconds',
    restSeconds: 30,
    difficulty: 'Intermediate',
    shortInstructions: 'From high plank, alternate driving knees into chest with speed and control like sprinting in place horizontally.',
    properForm: [
      'Keep shoulders directly over wrists and fingers spread',
      'Drive one knee straight toward chest while keeping other toe anchored',
      'Keep hips at shoulder height, avoid bouncing up and down',
      'Breathe in steady cadence with alternating legs'
    ],
    commonMistakes: [
      'Bouncing hips too high and losing core engagement',
      'Drifting shoulders backward away from hands',
      'Stomping feet violently on floor'
    ],
    beginnerAlternative: 'Slow-tempo mountain climbers: step one knee in, tap toe, step back, alternate calmly.',
    safetyTips: [
      'Ensure floor has traction or use athletic shoes to prevent slipping'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    durationSeconds: 40,
    estimatedCalories: 50
  },
  {
    id: 'home_jumping_jacks',
    name: 'Cardio Jumping Jacks',
    type: 'home',
    category: 'Fat-loss focused',
    targetMuscles: ['Calves', 'Deltoids', 'Core', 'Cardiovascular System'],
    equipment: 'Bodyweight',
    sets: 3,
    reps: '60 seconds',
    restSeconds: 30,
    difficulty: 'Beginner',
    shortInstructions: 'Jump feet wide while raising arms overhead into a clap, then spring back to center simultaneously.',
    properForm: [
      'Land softly on balls of feet with slight bend in knees',
      'Extend arms fully overhead without hunching neck',
      'Maintain brisk, rhythmic tempo to elevate heart rate'
    ],
    commonMistakes: [
      'Landing with stiff, locked knees jarring hip and knee joints',
      'Shallow arm movement below shoulder line'
    ],
    beginnerAlternative: 'Step-jacks: Step right foot out while raising arms, step back, step left foot out.',
    safetyTips: [
      'Wear supportive trainers if on tile or wood floors'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    durationSeconds: 60,
    estimatedCalories: 45
  },
  {
    id: 'home_glute_bridge',
    name: 'Posterior Glute Bridge',
    type: 'home',
    category: 'Legs',
    targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Lower Back'],
    equipment: 'Bodyweight',
    sets: 3,
    reps: '15-20 reps',
    restSeconds: 40,
    difficulty: 'Beginner',
    shortInstructions: 'Lie on back with knees bent and feet flat on floor. Drive heels into floor and squeeze glutes at the apex.',
    properForm: [
      'Feet placed hip-width apart, heels about 8 inches from glutes',
      'Drive hips up until thighs, hips, and chest form straight ramp',
      'Hold peak contraction for 1 full second with deep glute squeeze',
      'Do not hyperextend lumbar spine at top'
    ],
    commonMistakes: [
      'Arching lower back rather than squeezing buttocks',
      'Pushing through toes rather than driving through heels'
    ],
    beginnerAlternative: 'Single-leg glute bridge or isometric 30-second glute bridge hold.',
    safetyTips: [
      'Keep head flat on mat without turning neck side-to-side'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    durationSeconds: 50,
    estimatedCalories: 35
  },
  {
    id: 'home_burpees',
    name: 'Full Body HIIT Burpees',
    type: 'home',
    category: 'Full Body',
    targetMuscles: ['Chest', 'Quadriceps', 'Core', 'Shoulders', 'Cardiovascular System'],
    equipment: 'Bodyweight',
    sets: 3,
    reps: '10-12 reps',
    restSeconds: 60,
    difficulty: 'Advanced',
    shortInstructions: 'Drop down into squat thrust, kick feet back to plank, perform push-up, jump feet forward, and explode vertically into air.',
    properForm: [
      'Drop hands flat on mat, jump feet back into tight plank',
      'Lower chest smoothly to ground and push back up',
      'Jump feet outside hands and leap vertically with arms extended',
      'Absorb landing softly through bent knees'
    ],
    commonMistakes: [
      'Sagging lumbar spine when feet shoot back',
      'Landing with straight, locked knees on the vertical jump'
    ],
    beginnerAlternative: 'Step-back burpees without the push-up and without the vertical jump.',
    safetyTips: [
      'Pace yourself; focus on clean form rather than erratic speed'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    durationSeconds: 60,
    estimatedCalories: 65
  },
  {
    id: 'home_bicycle_crunches',
    name: 'Bicycle Abdominal Crunches',
    type: 'home',
    category: 'Abs',
    targetMuscles: ['Obliques', 'Rectus Abdominis', 'Hip Flexors'],
    equipment: 'Bodyweight',
    sets: 3,
    reps: '20 total reps (10 per side)',
    restSeconds: 40,
    difficulty: 'Intermediate',
    shortInstructions: 'Lie on back, rotate right elbow toward left knee while extending right leg straight, then alternate seamlessly with controlled tempo.',
    properForm: [
      'Fingertips lightly resting behind ears without pulling neck forward',
      'Initiate twist from ribcage and torso, not merely elbows',
      'Extend opposite leg straight out at a 45-degree angle',
      'Exhale on each rotational contraction'
    ],
    commonMistakes: [
      'Tugging on cervical spine and neck with hands',
      'Rushing through reps with erratic momentum instead of contraction'
    ],
    beginnerAlternative: 'Dead bug exercise with arms and opposite legs extending with back pressed into floor.',
    safetyTips: [
      'Keep low back pressed flat into mat at all times'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    durationSeconds: 45,
    estimatedCalories: 35
  },
  {
    id: 'home_mobility_flow',
    name: "World's Greatest Stretch & T-Spine Mobility",
    type: 'home',
    category: 'Mobility',
    targetMuscles: ['Hip Flexors', 'Thoracic Spine', 'Hamstrings', 'Chest'],
    equipment: 'Bodyweight',
    sets: 2,
    reps: '8 reps per side',
    restSeconds: 30,
    difficulty: 'Beginner',
    shortInstructions: 'Step into deep lunge, place inside hand on ground, rotate opposite arm up to sky opening chest, then shift back to stretch hamstring.',
    properForm: [
      'Keep front knee directly tracking over ankle',
      'Follow your rotating hand with your eyes to promote thoracic rotation',
      'Breathe deeply into ribcage at maximum stretch reach'
    ],
    commonMistakes: [
      'Holding breath during rotational phase',
      'Forcing rotation through lumbar spine instead of mid-back'
    ],
    beginnerAlternative: 'Cat-Cow stretch and child pose flow.',
    safetyTips: [
      'Move gently through range of motion without ballistic jerking'
    ],
    thumbnailUrl: ASSET_IMAGES.heroHome,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    durationSeconds: 60,
    estimatedCalories: 25
  }
];

export const GYM_EXERCISES: Exercise[] = [
  {
    id: 'gym_bench_press',
    name: 'Barbell Flat Bench Press',
    type: 'gym',
    category: 'Chest',
    targetMuscles: ['Pectoralis Major', 'Anterior Deltoids', 'Triceps Brachii'],
    equipment: 'Olympic Barbell & Flat Bench',
    sets: 4,
    reps: '8-10 reps',
    restSeconds: 90,
    difficulty: 'Intermediate',
    shortInstructions: 'Grip bar slightly wider than shoulder width, retract shoulder blades, unrack bar, lower bar with control to mid-sternum, and press up over shoulders.',
    properForm: [
      'Plant feet flat and drive through the floor for solid leg drive',
      'Retract and depress scapulae into the bench padding for shoulder stability',
      'Lower bar in controlled 2-3 second tempo until lightly touching chest',
      'Keep wrists straight and bar aligned over wrist and forearm bones'
    ],
    commonMistakes: [
      'Bouncing barbell off ribs or sternum violently',
      'Flaring elbows out at 90 degrees risking shoulder impingement',
      'Lifting glutes off the bench during heavy press drive'
    ],
    beginnerAlternative: 'Dumbbell bench press on flat bench or flat chest press machine.',
    safetyTips: [
      'Always utilize safety pins or work with a spotter on heavy compound sets',
      'Keep thumbs wrapped securely around bar (avoid suicide false grip)'
    ],
    thumbnailUrl: ASSET_IMAGES.heroGym,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 60,
    estimatedCalories: 55
  },
  {
    id: 'gym_lat_pulldown',
    name: 'Cable Wide-Grip Lat Pulldown',
    type: 'gym',
    category: 'Back',
    targetMuscles: ['Latissimus Dorsi', 'Teres Major', 'Biceps', 'Rhomboids'],
    equipment: 'Cable Lat Pulldown Machine',
    sets: 3,
    reps: '10-12 reps',
    restSeconds: 60,
    difficulty: 'Beginner',
    shortInstructions: 'Grip bar wide with overhand grip, adjust thigh pads snugly, sit tall, lean back slightly (10-15°), and pull bar smoothly to upper chest.',
    properForm: [
      'Drive motion through elbows down and back into ribcage pockets',
      'Squeeze lats and shoulder blades together at bottom position for 1 second',
      'Control eccentric return allowing lats to fully stretch at the top',
      'Maintain steady torso without violent swinging momentum'
    ],
    commonMistakes: [
      'Pulling bar behind the neck, which strains cervical spine and rotator cuff',
      'Using excessive body swing to yank weight down',
      'Shrugging shoulders into ears at bottom of repetition'
    ],
    beginnerAlternative: 'Resistance band lat pull down or assisted pull-up machine.',
    safetyTips: [
      'Adjust thigh lock roller pad tightly to prevent being lifted out of seat'
    ],
    thumbnailUrl: ASSET_IMAGES.heroGym,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    durationSeconds: 50,
    estimatedCalories: 45
  },
  {
    id: 'gym_cable_row',
    name: 'Seated Cable Row',
    type: 'gym',
    category: 'Back',
    targetMuscles: ['Middle Trapezius', 'Rhomboids', 'Latissimus Dorsi', 'Rear Delts'],
    equipment: 'Low Cable Row Station with V-Bar Handle',
    sets: 3,
    reps: '10-12 reps',
    restSeconds: 60,
    difficulty: 'Beginner',
    shortInstructions: 'Sit tall with slight bend in knees, grip close V-handle, pull elbows back along ribs and squeeze shoulder blades firmly.',
    properForm: [
      'Chest up and proud with neutral lumbar spine',
      'Pull handle directly to lower abdomen/belly button line',
      'Initiate with scapular retraction before bending arms',
      'Return weight slowly under control without rounding back forward'
    ],
    commonMistakes: [
      'Excessive backward rocking and relying on lower back momentum',
      'Rounding upper back when releasing weight forward'
    ],
    beginnerAlternative: 'Chest-supported machine row or seated resistance band row.',
    safetyTips: [
      'Keep knees soft and never lock knee joints fully against foot rests'
    ],
    thumbnailUrl: ASSET_IMAGES.heroGym,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    durationSeconds: 50,
    estimatedCalories: 45
  },
  {
    id: 'gym_shoulder_press',
    name: 'Seated Overhead Dumbbell Shoulder Press',
    type: 'gym',
    category: 'Shoulders',
    targetMuscles: ['Anterior & Lateral Deltoids', 'Triceps', 'Upper Traps'],
    equipment: 'Adjustable Bench & Pair of Dumbbells',
    sets: 3,
    reps: '10-12 reps',
    restSeconds: 75,
    difficulty: 'Intermediate',
    shortInstructions: 'Sit on bench angled at 75-80 degrees, bring dumbbells to shoulder height, press overhead in gentle arc until arms extend.',
    properForm: [
      'Elbows positioned slightly in the scapular plane (about 30° forward)',
      'Press dumbbells overhead without clanking them together violently',
      'Lower weights under control until dumbbells touch shoulder height',
      'Brace core and keep head resting against bench'
    ],
    commonMistakes: [
      'Hyperextending lower back to turn the movement into an incline chest press',
      'Pressing with flared elbows 90 degrees out to sides'
    ],
    beginnerAlternative: 'Seated machine overhead press with guided fixed path.',
    safetyTips: [
      'Kick dumbbells up from knees to shoulders one at a time with care'
    ],
    thumbnailUrl: ASSET_IMAGES.heroGym,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    durationSeconds: 55,
    estimatedCalories: 45
  },
  {
    id: 'gym_dumbbell_curl',
    name: 'Standing Supinating Dumbbell Bicep Curl',
    type: 'gym',
    category: 'Biceps',
    targetMuscles: ['Biceps Brachii', 'Brachialis', 'Forearms'],
    equipment: 'Pair of Dumbbells',
    sets: 3,
    reps: '12 reps',
    restSeconds: 45,
    difficulty: 'Beginner',
    shortInstructions: 'Stand tall with weights at sides, curl upward while rotating palms to face ceiling, squeeze bicep at peak contraction.',
    properForm: [
      'Keep elbows pinned securely at sides of ribcage',
      'Rotate wrists outward (supination) as weights pass waist height',
      'Squeeze biceps actively at the top for 1 full second',
      'Lower under 3-second negative eccentric control'
    ],
    commonMistakes: [
      'Swinging hips or using torso sway to heave dumbbells up',
      'Drifting elbows forward turning bicep curl into front shoulder raise'
    ],
    beginnerAlternative: 'Seated incline dumbbell curls or cable bicep curls.',
    safetyTips: [
      'Choose a weight you can handle without using lumbar extension swing'
    ],
    thumbnailUrl: ASSET_IMAGES.heroGym,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    durationSeconds: 45,
    estimatedCalories: 30
  },
  {
    id: 'gym_triceps_pushdown',
    name: 'Cable Rope Triceps Pushdown',
    type: 'gym',
    category: 'Triceps',
    targetMuscles: ['Triceps Brachii (Lateral, Long, and Medial Heads)'],
    equipment: 'High Cable Pulley with Rope Attachment',
    sets: 3,
    reps: '12-15 reps',
    restSeconds: 45,
    difficulty: 'Beginner',
    shortInstructions: 'Grip rope with neutral palms, lock elbows at side of ribs, extend arms downward and spread rope tips outward at bottom.',
    properForm: [
      'Hinge forward slightly (10-15 degrees) at hips for clearance',
      'Keep upper arms stationary; only forearms pivot at elbow joint',
      'Flare rope ends apart at the bottom for maximal peak triceps contraction',
      'Allow rope to return slowly until forearms are just above horizontal'
    ],
    commonMistakes: [
      'Allowing elbows to flare outward or drift forward and backward',
      'Using shoulder shrug and torso momentum to press down'
    ],
    beginnerAlternative: 'Straight bar cable pushdown or bench triceps dips.',
    safetyTips: [
      'Keep wrists neutral and strong without bending backward under load'
    ],
    thumbnailUrl: ASSET_IMAGES.heroGym,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    durationSeconds: 45,
    estimatedCalories: 30
  },
  {
    id: 'gym_leg_press',
    name: '45-Degree Incline Leg Press',
    type: 'gym',
    category: 'Legs',
    targetMuscles: ['Quadriceps', 'Glutes', 'Adductors', 'Hamstrings'],
    equipment: '45-Degree Incline Leg Press Machine',
    sets: 4,
    reps: '10-12 reps',
    restSeconds: 90,
    difficulty: 'Beginner',
    shortInstructions: 'Place feet shoulder-width on center platform, release safety catch, lower sled until knees reach 90 degrees, press platform back up.',
    properForm: [
      'Press lower back and hips firmly against backrest pad',
      'Lower platform under control until knees flex to ~90° without butt lifting',
      'Drive through whole foot and heels to push sled upward',
      'Stop just short of locking knees at full extension'
    ],
    commonMistakes: [
      'Hyperextending and violently locking knees at the top of the press',
      'Lowering too deep causing the lower back to round off the backrest (butt wink)'
    ],
    beginnerAlternative: 'Seated horizontal cable leg press machine.',
    safetyTips: [
      'Never lock knees completely straight; maintain soft tension at top',
      'Ensure side safety stopper catches are set at appropriate depth'
    ],
    thumbnailUrl: ASSET_IMAGES.heroGym,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    durationSeconds: 60,
    estimatedCalories: 60
  },
  {
    id: 'gym_leg_extension',
    name: 'Seated Machine Leg Extension',
    type: 'gym',
    category: 'Legs',
    targetMuscles: ['Quadriceps (Rectus Femoris, Vastus Lateralis/Medialis)'],
    equipment: 'Leg Extension Machine',
    sets: 3,
    reps: '12-15 reps',
    restSeconds: 60,
    difficulty: 'Beginner',
    shortInstructions: 'Adjust back pad so knees line up with pivot point, place shin pad above ankles, extend legs up and pause at peak.',
    properForm: [
      'Grip side handles tightly to anchor hips into seat',
      'Extend knees smoothly until legs are straight, hold for 1 second',
      'Lower weight stack slowly over 3 seconds under constant tension'
    ],
    commonMistakes: [
      'Kicking weight up fast with momentum and letting it crash down',
      'Aligning knee joint ahead of or behind machine axis of rotation'
    ],
    beginnerAlternative: 'Bodyweight step-ups or goblet box squats.',
    safetyTips: [
      'If you have patellofemoral pain, limit the range of motion to top 45 degrees'
    ],
    thumbnailUrl: ASSET_IMAGES.heroGym,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    durationSeconds: 45,
    estimatedCalories: 35
  },
  {
    id: 'gym_leg_curl',
    name: 'Lying or Seated Hamstring Leg Curl',
    type: 'gym',
    category: 'Legs',
    targetMuscles: ['Hamstrings (Biceps Femoris, Semitendinosus)'],
    equipment: 'Prone or Seated Hamstring Curl Machine',
    sets: 3,
    reps: '12-15 reps',
    restSeconds: 60,
    difficulty: 'Beginner',
    shortInstructions: 'Position roller pad against back of lower calves, curl heels toward glutes smoothly, and hold peak contraction.',
    properForm: [
      'Keep hips pinned down flat onto bench without lifting',
      'Pull pad into full contraction, squeezing hamstrings hard',
      'Resist weight on descent for 3 controlled seconds'
    ],
    commonMistakes: [
      'Lifting pelvis up off the pad during the curl',
      'Using jerky momentum to swing roller pad'
    ],
    beginnerAlternative: 'Swiss ball hamstring curls or resistance band lying leg curls.',
    safetyTips: [
      'Keep toes pointed neutral to prevent calf cramping during sets'
    ],
    thumbnailUrl: ASSET_IMAGES.heroGym,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    durationSeconds: 45,
    estimatedCalories: 35
  }
];

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'plan_home_fullbody_beginner',
    title: 'Beginner Home Bodyweight Foundation',
    subtitle: 'Build functional strength, posture, and core stamina without equipment.',
    type: 'home',
    category: 'Full Body',
    difficulty: 'Beginner',
    durationMinutes: 25,
    totalCalories: 210,
    coverImage: ASSET_IMAGES.heroHome,
    targetGoal: 'maintain_fitness',
    exercises: [
      HOME_EXERCISES[5], // Jumping jacks (warmup)
      HOME_EXERCISES[0], // Push-ups
      HOME_EXERCISES[1], // Squats
      HOME_EXERCISES[3], // Plank
      HOME_EXERCISES[6], // Glute Bridge
      HOME_EXERCISES[9]  // Mobility stretch
    ]
  },
  {
    id: 'plan_home_hiit_fatloss',
    title: 'High-Energy Fat Burn & Core Sculpt',
    subtitle: 'Intense metabolic conditioning designed to elevate calorie expenditure.',
    type: 'home',
    category: 'Fat-loss focused',
    difficulty: 'Intermediate',
    durationMinutes: 30,
    totalCalories: 320,
    coverImage: ASSET_IMAGES.heroHome,
    targetGoal: 'weight_loss',
    exercises: [
      HOME_EXERCISES[5], // Jumping Jacks
      HOME_EXERCISES[4], // Mountain climbers
      HOME_EXERCISES[7], // Burpees
      HOME_EXERCISES[2], // Lunges
      HOME_EXERCISES[8], // Bicycle Crunches
      HOME_EXERCISES[3]  // Plank
    ]
  },
  {
    id: 'plan_gym_hypertrophy',
    title: 'Muscle Builder: Upper Body Strength & Hypertrophy',
    subtitle: 'Classic bodybuilding compound lifts to sculpt chest, back, shoulders & arms.',
    type: 'gym',
    category: 'Full Body',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    totalCalories: 380,
    coverImage: ASSET_IMAGES.heroGym,
    targetGoal: 'muscle_building',
    exercises: [
      GYM_EXERCISES[0], // Bench Press
      GYM_EXERCISES[1], // Lat Pulldown
      GYM_EXERCISES[2], // Cable Row
      GYM_EXERCISES[3], // Shoulder Press
      GYM_EXERCISES[4], // Dumbbell Curl
      GYM_EXERCISES[5]  // Triceps Pushdown
    ]
  },
  {
    id: 'plan_gym_legs_power',
    title: 'Lower Body Strength & Quad Sculpt',
    subtitle: 'Target quads, glutes, and hamstrings for strength and balanced athletic power.',
    type: 'gym',
    category: 'Legs',
    difficulty: 'Intermediate',
    durationMinutes: 40,
    totalCalories: 340,
    coverImage: ASSET_IMAGES.heroGym,
    targetGoal: 'endurance_stamina',
    exercises: [
      GYM_EXERCISES[6], // Leg press
      GYM_EXERCISES[7], // Leg extension
      GYM_EXERCISES[8], // Leg curl
      HOME_EXERCISES[1], // Air squats burnout
      HOME_EXERCISES[6]  // Glute bridge finisher
    ]
  }
];

export const YOGA_SESSIONS: YogaSession[] = [
  {
    id: 'yoga_morning_vitality',
    title: 'Morning Sun Salutation & Vitality Flow',
    category: 'Morning Yoga',
    durationMinutes: 20,
    difficulty: 'Beginner',
    benefits: [
      'Gently wakes up nervous system and boosts circulation',
      'Lengthens hamstrings, opens chest, and alleviates morning stiffness',
      'Promotes calm clarity and mental focus for the day ahead'
    ],
    instructions: [
      'Begin in Mountain Pose (Tadasana), feet grounded, palms together at heart',
      'Inhale arms sweep overhead into Upward Salute, exhale fold into Forward Fold (Uttanasana)',
      'Halfway lift to flat back, step into Plank and lower gently through Chaturanga',
      'Open chest into Cobra or Upward-Facing Dog, pressing tops of feet down',
      'Exhale press hips up and back into Downward-Facing Dog, hold for 5 breaths',
      'Step forward, rise to standing, and repeat for 4 mindful cycles'
    ],
    safetyGuidance: [
      'Bend knees generously in forward folds if hamstrings feel tight in the morning',
      'Keep collarbones wide and shoulders relaxed away from ears'
    ],
    thumbnailUrl: ASSET_IMAGES.heroYoga,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    caloriesBurned: 95,
    poses: [
      { name: 'Mountain Pose (Tadasana)', durationSeconds: 60, description: 'Ground through four corners of feet, lengthen spine tall.', focus: 'Alignment & Breath' },
      { name: 'Forward Fold (Uttanasana)', durationSeconds: 90, description: 'Hinge from hips, let crown of head release toward mat.', focus: 'Hamstring & Spine Release' },
      { name: 'Downward-Facing Dog', durationSeconds: 120, description: 'Press through hands, lift sit bones high to create an inverted V.', focus: 'Total Body Stretch' },
      { name: 'Cobra Pose (Bhujangasana)', durationSeconds: 90, description: 'Press through palms, broaden collarbones, gentle backbend.', focus: 'Chest & Spine Opening' },
      { name: 'Warrior II (Virabhadrasana II)', durationSeconds: 120, description: 'Deep front knee bend, arms parallel to floor, grounded stance.', focus: 'Leg Strength & Balance' }
    ]
  },
  {
    id: 'yoga_evening_winddown',
    title: 'Evening Deep Rest & De-stress Unwind',
    category: 'Evening Yoga',
    durationMinutes: 25,
    difficulty: 'Beginner',
    benefits: [
      'Activates parasympathetic nervous system for restorative sleep',
      'Releases lower back tension and neck stress accumulated during day',
      'Lowers cortisol levels and slows racing thoughts'
    ],
    instructions: [
      'Transition to a quiet, dimly-lit space with a comfortable mat or blanket',
      'Move slowly between restorative postures, holding each for 2 to 3 minutes',
      'Deepen belly breathing with 4-second inhales and 6-second slow exhales',
      'Conclude in full Savasana with eyes gently closed'
    ],
    safetyGuidance: [
      'Support knees or hips with folded towels or yoga blocks if needed',
      'Avoid any sharp sensations; aim for a comforting, warm stretch'
    ],
    thumbnailUrl: ASSET_IMAGES.heroYoga,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    caloriesBurned: 80,
    poses: [
      { name: 'Child Pose (Balasana)', durationSeconds: 180, description: 'Big toes touch, knees wide, torso resting between thighs, arms stretched forward.', focus: 'Spinal Decompression' },
      { name: 'Puppy Dog Pose (Uttana Shishosana)', durationSeconds: 120, description: 'Hips over knees, chest melting toward floor.', focus: 'Upper Back & Shoulder Opening' },
      { name: 'Reclining Bound Angle (Supta Baddha Konasana)', durationSeconds: 180, description: 'Soles of feet together, knees dropping open, hand on belly.', focus: 'Hip Release & Relaxation' },
      { name: 'Corpse Pose (Savasana)', durationSeconds: 240, description: 'Total stillness, body heavy, letting go of all muscular tension.', focus: 'Deep Mental Restoration' }
    ]
  },
  {
    id: 'yoga_pranayama_breathing',
    title: 'Pranayama Breathwork & Calming Meditation',
    category: 'Breathing exercises',
    durationMinutes: 15,
    difficulty: 'Beginner',
    benefits: [
      'Balances autonomic nervous system through rhythmic breath regulation',
      'Rapidly reduces acute anxiety and mental clutter',
      'Increases oxygenation and lung vital capacity'
    ],
    instructions: [
      'Sit comfortably in a cross-legged position with spine erect and shoulders soft',
      'Practice 4-4-4-4 Box Breathing (Inhale 4s, Hold 4s, Exhale 4s, Hold 4s)',
      'Transition into Nadi Shodhana (Alternate Nostril Breathing) for 5 minutes',
      'Conclude with 5 minutes of open, non-judgmental breath observation'
    ],
    safetyGuidance: [
      'Do not strain on breath retention; keep holds gentle and relaxed'
    ],
    thumbnailUrl: ASSET_IMAGES.heroYoga,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    caloriesBurned: 45,
    poses: [
      { name: 'Seated Easy Pose (Sukhasana)', durationSeconds: 60, description: 'Ground sitting bones, spine long, chin slightly tucked.', focus: 'Posture & Centering' },
      { name: 'Box Breathing Cadence', durationSeconds: 300, description: 'Inhale 4s, pause 4s, exhale 4s, pause 4s in smooth continuous loop.', focus: 'Autonomic Reset' },
      { name: 'Alternate Nostril (Nadi Shodhana)', durationSeconds: 300, description: 'Use right thumb and ring finger to alternate gentle airflow.', focus: 'Hemispheric Balance' },
      { name: 'Silent Mindful Presence', durationSeconds: 240, description: 'Rest attention lightly on the natural ebb and flow of breath.', focus: 'Mental Clarity' }
    ]
  }
];

export const DIET_PLANS: Record<string, DailyDietPlan> = {
  // Muscle building Vegetarian
  muscle_building_vegetarian: {
    id: 'diet_muscle_veg',
    goal: 'muscle_building',
    dietPreference: 'vegetarian',
    title: 'High-Protein Plant-Powered Muscle Fuel',
    description: 'Rich in dairy, legumes, tofu, seeds, and complex carbohydrates for optimal muscle synthesis and recovery.',
    targetCalories: 2650,
    targetProtein: 145,
    targetCarbs: 320,
    targetFats: 75,
    targetFiber: 42,
    meals: {
      breakfast: [
        {
          id: 'm1',
          name: 'Greek Yogurt & Rolled Oats Berry Bowl',
          mealType: 'breakfast',
          dietType: 'vegetarian',
          calories: 540,
          proteinGrams: 32,
          carbsGrams: 68,
          fatsGrams: 14,
          fiberGrams: 9,
          portion: '1 large bowl (350g)',
          ingredients: ['Greek Yogurt (200g)', 'Rolled Oats (60g)', 'Chia Seeds (1 tbsp)', 'Blueberries & Bananas', 'Raw Honey (1 tsp)'],
          prepTimeMinutes: 5,
          recipeInstructions: 'Mix yogurt and oats, top with fresh berries, chia seeds, and a drizzle of honey.'
        }
      ],
      morningSnack: [
        {
          id: 'm2',
          name: 'Sprouted Moong & Paneer Chaat',
          mealType: 'morning_snack',
          dietType: 'vegetarian',
          calories: 280,
          proteinGrams: 18,
          carbsGrams: 28,
          fatsGrams: 10,
          fiberGrams: 7,
          portion: '1 medium bowl (180g)',
          ingredients: ['Sprouted Moong Beans', 'Low-fat Paneer Cubes (60g)', 'Chopped Cucumber & Tomato', 'Lemon juice & Chaat masala'],
          prepTimeMinutes: 8,
          recipeInstructions: 'Toss steamed sprouts and paneer cubes with cucumbers, tomatoes, pinch of pink salt, and lemon.'
        }
      ],
      lunch: [
        {
          id: 'm3',
          name: 'Quinoa Paneer Power Bowl with Dal Tadka',
          mealType: 'lunch',
          dietType: 'vegetarian',
          calories: 780,
          proteinGrams: 42,
          carbsGrams: 92,
          fatsGrams: 24,
          fiberGrams: 14,
          portion: 'Full platter',
          ingredients: ['Cooked Quinoa (1.5 cups)', 'Yellow Lentil Dal Tadka (1 cup)', 'Grilled Spiced Paneer (120g)', 'Steamed Broccoli & Spinach'],
          prepTimeMinutes: 20,
          recipeInstructions: 'Serve fragrant yellow dal alongside quinoa, grilled spiced paneer, and lightly sauteed greens.'
        }
      ],
      eveningSnack: [
        {
          id: 'm4',
          name: 'Whey / Plant Protein Smoothie with Peanut Butter',
          mealType: 'evening_snack',
          dietType: 'vegetarian',
          calories: 340,
          proteinGrams: 28,
          carbsGrams: 32,
          fatsGrams: 11,
          fiberGrams: 4,
          portion: '1 glass (400ml)',
          ingredients: ['Plant/Whey Protein Powder (1 scoop)', 'Oat Milk (300ml)', 'Peanut Butter (1 tbsp)', '1 Small Banana'],
          prepTimeMinutes: 3,
          recipeInstructions: 'Blend all ingredients until silky and creamy.'
        }
      ],
      dinner: [
        {
          id: 'm5',
          name: 'Tofu & Edamame Brown Rice Stir-Fry',
          mealType: 'dinner',
          dietType: 'vegetarian',
          calories: 710,
          proteinGrams: 38,
          carbsGrams: 80,
          fatsGrams: 22,
          fiberGrams: 12,
          portion: '1 large plate',
          ingredients: ['Firm Organic Tofu (150g)', 'Edamame beans (1/2 cup)', 'Brown Rice (1 cup)', 'Bell peppers, snap peas, sesame oil'],
          prepTimeMinutes: 15,
          recipeInstructions: 'Crisp tofu in sesame oil, toss with edamame and colorful peppers, serve over steamed brown rice.'
        }
      ]
    }
  },

  // Weight Loss Vegetarian
  weight_loss_vegetarian: {
    id: 'diet_weightloss_veg',
    goal: 'weight_loss',
    dietPreference: 'vegetarian',
    title: 'High-Volume Satiety & Lean Nutrition',
    description: 'High in fiber, leafy vegetables, lentils, and healthy fats designed to sustain high energy without starvation.',
    targetCalories: 1850,
    targetProtein: 105,
    targetCarbs: 210,
    targetFats: 48,
    targetFiber: 38,
    meals: {
      breakfast: [
        {
          id: 'wl_m1',
          name: 'Chia Seed Overnight Oats with Almonds',
          mealType: 'breakfast',
          dietType: 'vegetarian',
          calories: 380,
          proteinGrams: 16,
          carbsGrams: 52,
          fatsGrams: 12,
          fiberGrams: 10,
          portion: '1 jar (250g)',
          ingredients: ['Rolled Oats (45g)', 'Chia Seeds (1 tbsp)', 'Unsweetened Almond Milk', 'Strawberries', '6 Crushed Almonds'],
          prepTimeMinutes: 5
        }
      ],
      morningSnack: [
        {
          id: 'wl_m2',
          name: 'Crispy Roasted Spiced Chickpeas',
          mealType: 'morning_snack',
          dietType: 'vegetarian',
          calories: 190,
          proteinGrams: 10,
          carbsGrams: 26,
          fatsGrams: 5,
          fiberGrams: 7,
          portion: '1 small bowl (60g)',
          ingredients: ['Boiled Chickpeas (100g)', 'Cumin, paprika, dash of olive oil spray'],
          prepTimeMinutes: 10
        }
      ],
      lunch: [
        {
          id: 'wl_m3',
          name: 'Mediterranean Rainbow Tofu Salad & Lentil Soup',
          mealType: 'lunch',
          dietType: 'vegetarian',
          calories: 520,
          proteinGrams: 32,
          carbsGrams: 58,
          fatsGrams: 15,
          fiberGrams: 12,
          portion: 'Large salad + 1 bowl soup',
          ingredients: ['Grilled Tofu (130g)', 'Mixed Greens, Cucumbers, Kalamata Olives', 'Red Lentil Soup (1 cup)'],
          prepTimeMinutes: 15
        }
      ],
      eveningSnack: [
        {
          id: 'wl_m4',
          name: 'Green Apple Slices with Greek Yogurt Dip',
          mealType: 'evening_snack',
          dietType: 'vegetarian',
          calories: 160,
          proteinGrams: 12,
          carbsGrams: 24,
          fatsGrams: 2,
          fiberGrams: 4,
          portion: '1 medium apple + 100g yogurt',
          ingredients: ['Crisp Green Apple', 'Low-fat Greek Yogurt with cinnamon'],
          prepTimeMinutes: 2
        }
      ],
      dinner: [
        {
          id: 'wl_m5',
          name: 'Paneer & Zucchini Ribbon Stir-Fry with Millet',
          mealType: 'dinner',
          dietType: 'vegetarian',
          calories: 600,
          proteinGrams: 35,
          carbsGrams: 50,
          fatsGrams: 20,
          fiberGrams: 8,
          portion: '1 dinner plate',
          ingredients: ['Light Paneer (120g)', 'Zucchini, Mushrooms, Bell Peppers', 'Cooked Foxtail Millet (3/4 cup)'],
          prepTimeMinutes: 18
        }
      ]
    }
  },

  // Muscle Building Non-Vegetarian
  muscle_building_non_vegetarian: {
    id: 'diet_muscle_nonveg',
    goal: 'muscle_building',
    dietPreference: 'non_vegetarian',
    title: 'Lean Athletic Muscle & High-Performance Nutrition',
    description: 'Packed with lean chicken breast, wild salmon, whole grains, eggs, and antioxidant-rich greens.',
    targetCalories: 2750,
    targetProtein: 175,
    targetCarbs: 310,
    targetFats: 78,
    targetFiber: 36,
    meals: {
      breakfast: [
        {
          id: 'nv_m1',
          name: 'Whole Grain Sourdough with 3 Eggs & Avocado',
          mealType: 'breakfast',
          dietType: 'non_vegetarian',
          calories: 560,
          proteinGrams: 32,
          carbsGrams: 48,
          fatsGrams: 26,
          fiberGrams: 8,
          portion: '2 slices + 3 eggs + 1/2 avocado',
          ingredients: ['Whole grain sourdough', '3 Organic Eggs (scrambled or poached)', '1/2 Avocado', 'Cherry tomatoes'],
          prepTimeMinutes: 10
        }
      ],
      morningSnack: [
        {
          id: 'nv_m2',
          name: 'Greek Yogurt with Granola & Walnuts',
          mealType: 'morning_snack',
          dietType: 'non_vegetarian',
          calories: 320,
          proteinGrams: 24,
          carbsGrams: 32,
          fatsGrams: 10,
          fiberGrams: 4,
          portion: '1 bowl',
          ingredients: ['Plain Greek Yogurt (200g)', 'Oat Granola (30g)', 'Walnuts (15g)'],
          prepTimeMinutes: 2
        }
      ],
      lunch: [
        {
          id: 'nv_m3',
          name: 'Grilled Herb Chicken Breast & Jasmine Rice Bowl',
          mealType: 'lunch',
          dietType: 'non_vegetarian',
          calories: 760,
          proteinGrams: 52,
          carbsGrams: 85,
          fatsGrams: 18,
          fiberGrams: 8,
          portion: 'Large lunch plate',
          ingredients: ['Grilled Chicken Breast (200g)', 'Fragrant Jasmine Rice (1.5 cups)', 'Steamed Asparagus & Carrots'],
          prepTimeMinutes: 20
        }
      ],
      eveningSnack: [
        {
          id: 'nv_m4',
          name: 'Protein Shake & Banana',
          mealType: 'evening_snack',
          dietType: 'non_vegetarian',
          calories: 330,
          proteinGrams: 30,
          carbsGrams: 38,
          fatsGrams: 4,
          fiberGrams: 3,
          portion: '1 shake + 1 banana',
          ingredients: ['Whey Isolate (1 scoop)', 'Almond milk (300ml)', '1 Medium Banana'],
          prepTimeMinutes: 2
        }
      ],
      dinner: [
        {
          id: 'nv_m5',
          name: 'Pan-Seared Salmon Fillet with Sweet Potato',
          mealType: 'dinner',
          dietType: 'non_vegetarian',
          calories: 780,
          proteinGrams: 46,
          carbsGrams: 62,
          fatsGrams: 28,
          fiberGrams: 9,
          portion: '1 dinner plate',
          ingredients: ['Wild Atlantic Salmon (180g)', 'Baked Sweet Potato (200g)', 'Sauteed Garlic Spinach in Olive Oil'],
          prepTimeMinutes: 20
        }
      ]
    }
  },

  // Eggitarian general healthy eating
  maintain_fitness_eggitarian: {
    id: 'diet_maintain_eggitarian',
    goal: 'maintain_fitness',
    dietPreference: 'eggitarian',
    title: 'Balanced Eggitarian Daily Vitality & Energy',
    description: 'Wholesome egg-enriched vegetarian plan offering steady endurance, lean tone, and vibrant digestion.',
    targetCalories: 2200,
    targetProtein: 125,
    targetCarbs: 260,
    targetFats: 62,
    targetFiber: 35,
    meals: {
      breakfast: [
        {
          id: 'eg_m1',
          name: 'Spinach & Feta Egg White Frittata with Multigrain Toast',
          mealType: 'breakfast',
          dietType: 'eggitarian',
          calories: 450,
          proteinGrams: 28,
          carbsGrams: 42,
          fatsGrams: 16,
          fiberGrams: 6,
          portion: '2 slices frittata + toast',
          ingredients: ['3 Whole Eggs + 2 Whites', 'Baby Spinach, Crumbled Feta', '2 Multigrain Toasts'],
          prepTimeMinutes: 12
        }
      ],
      morningSnack: [
        {
          id: 'eg_m2',
          name: 'Handful of Mixed Almonds, Walnuts & Dried Figs',
          mealType: 'morning_snack',
          dietType: 'eggitarian',
          calories: 220,
          proteinGrams: 7,
          carbsGrams: 22,
          fatsGrams: 14,
          fiberGrams: 4,
          portion: '40g',
          ingredients: ['Raw Almonds, Walnuts, Pumpkin Seeds, Dried Figs'],
          prepTimeMinutes: 1
        }
      ],
      lunch: [
        {
          id: 'eg_m3',
          name: 'Spiced Egg Curry with Basmati Brown Rice & Raita',
          mealType: 'lunch',
          dietType: 'eggitarian',
          calories: 680,
          proteinGrams: 34,
          carbsGrams: 78,
          fatsGrams: 22,
          fiberGrams: 10,
          portion: 'Full bowl',
          ingredients: ['3 Hard-Boiled Eggs in Tomato-Onion Gravy', 'Brown Rice (1 cup)', 'Cucumber Mint Raita'],
          prepTimeMinutes: 20
        }
      ],
      eveningSnack: [
        {
          id: 'eg_m4',
          name: 'Roasted Makhana (Foxnuts) & Lemon Green Tea',
          mealType: 'evening_snack',
          dietType: 'eggitarian',
          calories: 160,
          proteinGrams: 6,
          carbsGrams: 28,
          fatsGrams: 3,
          fiberGrams: 5,
          portion: '1 bowl (40g)',
          ingredients: ['Roasted Foxnuts with Himalayan Pink Salt & Black Pepper', 'Fresh Mint Green Tea'],
          prepTimeMinutes: 5
        }
      ],
      dinner: [
        {
          id: 'eg_m5',
          name: 'Egg Bhurji (Scramble) with Whole Wheat Roti & Salad',
          mealType: 'dinner',
          dietType: 'eggitarian',
          calories: 620,
          proteinGrams: 36,
          carbsGrams: 58,
          fatsGrams: 22,
          fiberGrams: 9,
          portion: '2 Rotis + 3 Eggs Bhurji',
          ingredients: ['3 Eggs scrambled with onions, chilies, tomatoes', '2 Fresh Whole Wheat Rotis', 'Kachumber Green Salad'],
          prepTimeMinutes: 15
        }
      ]
    }
  }
};

export const INITIAL_ACTIVITY_STATS: DailyActivityStats = {
  date: '2026-10-01',
  steps: 6840,
  stepsGoal: 10000,
  waterMl: 2250,
  waterGoalMl: 3000,
  caloriesBurned: 420,
  caloriesGoal: 650,
  workoutDurationMinutes: 35,
  workoutCompleted: true,
};

export const INITIAL_COMPLETED_LOGS: CompletedWorkoutLog[] = [
  {
    id: 'log_1',
    workoutTitle: 'Morning Sun Salutation & Vitality Flow',
    type: 'yoga',
    completedAt: '2026-10-01T07:15:00.000Z',
    durationMinutes: 20,
    exercisesCount: 5,
    caloriesBurned: 95
  },
  {
    id: 'log_2',
    workoutTitle: 'Beginner Home Bodyweight Foundation',
    type: 'home',
    completedAt: '2026-09-30T18:40:00.000Z',
    durationMinutes: 25,
    exercisesCount: 6,
    caloriesBurned: 210
  },
  {
    id: 'log_3',
    workoutTitle: 'Muscle Builder: Upper Body Strength',
    type: 'gym',
    completedAt: '2026-09-29T17:30:00.000Z',
    durationMinutes: 45,
    exercisesCount: 6,
    caloriesBurned: 380
  },
  {
    id: 'log_4',
    workoutTitle: 'High-Energy Fat Burn & Core Sculpt',
    type: 'home',
    completedAt: '2026-09-28T08:00:00.000Z',
    durationMinutes: 30,
    exercisesCount: 6,
    caloriesBurned: 320
  }
];

export const INITIAL_PERSONAL_RECORDS: PersonalRecord[] = [
  { id: 'pr_1', exerciseName: 'Standard Push-ups', recordValue: '32 consecutive reps', dateAchieved: 'Sep 24, 2026', category: 'Home Bodyweight' },
  { id: 'pr_2', exerciseName: 'Barbell Bench Press', recordValue: '85 kg (187 lbs) × 5', dateAchieved: 'Sep 29, 2026', category: 'Gym Compound' },
  { id: 'pr_3', exerciseName: 'Forearm Core Plank', recordValue: '2 min 45 sec hold', dateAchieved: 'Sep 18, 2026', category: 'Core Endurance' },
  { id: 'pr_4', exerciseName: 'Daily Step Record', recordValue: '14,820 steps', dateAchieved: 'Sep 22, 2026', category: 'Cardio & Steps' },
];

export const WEEKLY_ACTIVITY = [
  { day: 'Mon', completed: true, steps: 10450, calories: 520, duration: 45 },
  { day: 'Tue', completed: true, steps: 8900, calories: 430, duration: 35 },
  { day: 'Wed', completed: false, steps: 6100, calories: 180, duration: 0 },
  { day: 'Thu', completed: true, steps: 11200, calories: 590, duration: 50 },
  { day: 'Fri', completed: true, steps: 9400, calories: 480, duration: 40 },
  { day: 'Sat', completed: true, steps: 12800, calories: 650, duration: 55 },
  { day: 'Sun', completed: true, steps: 6840, calories: 420, duration: 35 }, // Today
];
