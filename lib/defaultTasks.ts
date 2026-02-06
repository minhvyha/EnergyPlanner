import { Task } from './storage'

export interface TaskCategory {
  name: string
  description: string
  condition: (mental: number, physical: number, emotional: number) => boolean
  tasks: Omit<Task, 'id' | 'checked' | 'inFocus'>[]
}

export const taskCategories: TaskCategory[] = [
  {
    name: 'LOW Energy (0-10)',
    description: 'For when overall energy is depleted',
    condition: (m, p, e) => (m + p + e) <= 10,
    tasks: [
      {
        title: 'Review 10 flashcards',
        description: 'Quick recall practice to stay engaged without heavy effort',
        duration: '10 mins',
        subject: 'Study',
        energyLevel: 'low',
      },
      {
        title: 'Read a 1-page summary',
        description: 'Skim a short summary or notes page',
        duration: '10 mins',
        subject: 'Reading',
        energyLevel: 'low',
      },
      {
        title: 'Tidy your desktop files',
        description: 'Quickly organise desktop folders and remove clutter',
        duration: '10 mins',
        subject: 'Admin',
        energyLevel: 'low',
      },
      {
        title: 'Reply to one email',
        description: 'Handle a single simple message',
        duration: '10 mins',
        subject: 'Admin',
        energyLevel: 'low',
      },
      {
        title: 'Open your lecture slides',
        description: 'Open slides without taking notes yet to reduce friction',
        duration: '5 mins',
        subject: 'Preparation',
        energyLevel: 'low',
      },
      {
        title: '5-minute stretch',
        description: 'Gentle mobility to refresh body and mind',
        duration: '5 mins',
        subject: 'Wellness',
        energyLevel: 'low',
      },
      {
        title: 'Take a short walk',
        description: 'Walk around the block or indoors to move a little',
        duration: '10 mins',
        subject: 'Movement',
        energyLevel: 'low',
      },
      {
        title: 'Drink water or have a snack',
        description: 'Hydrate and refuel to restore baseline energy',
        duration: '5 mins',
        subject: 'Self-care',
        energyLevel: 'low',
      },
      {
        title: 'Do nothing for 5 minutes',
        description: 'Allow a short mental break with no tasks. And YES, this is valid!',
        duration: '5 mins',
        subject: 'Rest',
        energyLevel: 'low',
      },
    ],
  },
  {
    name: 'MEDIUM Energy (11-20)',
    description: 'For moderate energy levels',
    condition: (m, p, e) => (m + p + e) > 10 && (m + p + e) <= 20,
    tasks: [
      {
        title: 'Summarise 5 lecture slides',
        description: 'Create a concise summary of a small slide set',
        duration: '20 mins',
        subject: 'Study',
        energyLevel: 'med',
      },
      {
        title: 'Outline an essay',
        description: 'Create structure and headings without writing content',
        duration: '25 mins',
        subject: 'Writing',
        energyLevel: 'med',
      },
      {
        title: 'Complete 5 practice questions',
        description: 'Targeted practice to reinforce learning',
        duration: '25 mins',
        subject: 'Practice',
        energyLevel: 'med',
      },
      {
        title: 'Make a study plan for tomorrow',
        description: 'Set a short, actionable plan for the next day',
        duration: '15 mins',
        subject: 'Planning',
        energyLevel: 'med',
      },
      {
        title: 'Organise notes for one subject',
        description: 'Sort and label notes so they are easier to use later',
        duration: '25 mins',
        subject: 'Organisation',
        energyLevel: 'med',
      },
      {
        title: '20 to 30 min jog or walk',
        description: 'Sustained movement to raise physical energy',
        duration: '25 mins',
        subject: 'Exercise',
        energyLevel: 'med',
      },
      {
        title: 'Clean your study desk',
        description: 'Clear and arrange study space for better focus',
        duration: '20 mins',
        subject: 'Environment',
        energyLevel: 'med',
      },
      {
        title: 'Watch a short educational video',
        description: 'Learn from a brief lecture or explainer video',
        duration: '15 to 20 mins',
        subject: 'Learning',
        energyLevel: 'med',
      },
    ],
  },
  {
    name: 'HIGH Energy (21-30)',
    description: 'For peak energy levels',
    condition: (m, p, e) => (m + p + e) > 20,
    tasks: [
      {
        title: 'Write 2 to 3 paragraphs of an essay',
        description: 'Produce focused written work with deep attention',
        duration: '40 mins',
        subject: 'Writing',
        energyLevel: 'high',
      },
      {
        title: 'Complete a full problem set',
        description: 'Work through a full set of practice problems',
        duration: '60+ mins',
        subject: 'Practice',
        energyLevel: 'high',
      },
      {
        title: 'Revise for 45 to 60 minutes',
        description: 'Sustained revision using active recall',
        duration: '45 to 60 mins',
        subject: 'Study',
        energyLevel: 'high',
      },
      {
        title: 'Draft an assignment section',
        description: 'Write a substantial section of coursework',
        duration: '60 mins',
        subject: 'Assignment',
        energyLevel: 'high',
      },
      {
        title: 'Create flashcards for a whole topic',
        description: 'Build a comprehensive set of flashcards',
        duration: '45+ mins',
        subject: 'Study',
        energyLevel: 'high',
      },
      {
        title: 'Do a mock exam question',
        description: 'Simulate exam conditions for practice',
        duration: '30 to 60 mins',
        subject: 'Assessment',
        energyLevel: 'high',
      },
      {
        title: 'Start a difficult task you are avoiding',
        description: 'Begin the hard task to build momentum',
        duration: '45 mins',
        subject: 'Work',
        energyLevel: 'high',
      },
    ],
  },
  {
    name: 'High Physical Energy (≥ 7)',
    description: 'For when physical energy is high',
    condition: (m, p, e) => p >= 7,
    tasks: [
      {
        title: 'Go for a jog or walk 20 to 30 mins',
        description: 'Cardio to use surplus physical energy',
        duration: '20 to 30 mins',
        subject: 'Exercise',
        energyLevel: 'high',
      },
      {
        title: 'Quick stretch routine',
        description: 'Short dynamic or static stretches',
        duration: '10 mins',
        subject: 'Wellness',
        energyLevel: 'med',
      },
      {
        title: 'Bike ride, gym session or sport',
        description: 'Sustained physical activity',
        duration: '30 to 60 mins',
        subject: 'Exercise',
        energyLevel: 'high',
      },
      {
        title: 'Do chores: laundry, cleaning, errands',
        description: 'Productive tasks that use physical energy',
        duration: '30 to 60 mins',
        subject: 'Chores',
        energyLevel: 'med',
      },
    ],
  },
  {
    name: 'High Physical, Low Emotional (P≥7, E≤3)',
    description: 'High physical energy but emotionally drained',
    condition: (m, p, e) => p >= 7 && e <= 3,
    tasks: [
      {
        title: 'Complete worksheet questions',
        description: 'Focused solo practice from your worksheet',
        duration: '30 to 45 mins',
        subject: 'Practice',
        energyLevel: 'high',
      },
      {
        title: 'Revise from a checklist',
        description: 'Step through a prepared checklist for review',
        duration: '25 to 40 mins',
        subject: 'Revision',
        energyLevel: 'med',
      },
      {
        title: 'Organise notes logically',
        description: 'Structure notes into clear order and headings',
        duration: '30 mins',
        subject: 'Organisation',
        energyLevel: 'med',
      },
    ],
  },
  {
    name: 'High Emotional, Low Mental (E≥7, M≤3)',
    description: 'High emotional energy but low focus',
    condition: (m, p, e) => e >= 7 && m <= 3,
    tasks: [
      {
        title: 'Journal for 10 minutes',
        description: 'Express thoughts to process emotions',
        duration: '10 mins',
        subject: 'Wellness',
        energyLevel: 'med',
      },
      {
        title: 'Review past notes',
        description: 'Read old notes with no heavy learning',
        duration: '20 mins',
        subject: 'Reading',
        energyLevel: 'med',
      },
      {
        title: 'Watch a lecture recording',
        description: 'Passive learning without heavy effort',
        duration: '20 to 30 mins',
        subject: 'Learning',
        energyLevel: 'med',
      },
      {
        title: 'Colour-code notes',
        description: 'Visual organisation to feel in control',
        duration: '20 mins',
        subject: 'Organisation',
        energyLevel: 'med',
      },
      {
        title: 'Read casually',
        description: 'Light reading for enjoyment or overview',
        duration: '20 mins',
        subject: 'Reading',
        energyLevel: 'low',
      },
    ],
  },
  {
    name: 'High Mental, High Emotional, Low Physical (M≥7, E≥7, P≤3)',
    description: 'Great for focused collaboration and creative work',
    condition: (m, p, e) => m >= 7 && e >= 7 && p <= 3,
    tasks: [
      {
        title: 'Essay writing',
        description: 'Sustained writing when ideas and motivation align',
        duration: '60 mins',
        subject: 'Writing',
        energyLevel: 'high',
      },
      {
        title: 'Problem solving',
        description: 'Work on complex cognitive tasks',
        duration: '45 to 60 mins',
        subject: 'Study',
        energyLevel: 'high',
      },
      {
        title: 'Coding or design work',
        description: 'Deep creative technical work',
        duration: '60 mins',
        subject: 'Work',
        energyLevel: 'high',
      },
    ],
  },
  {
    name: 'High Physical, High Emotional, Low Mental (P≥7, E≥7, M≤3)',
    description: 'Active and social but low focus',
    condition: (m, p, e) => p >= 7 && e >= 7 && m <= 3,
    tasks: [
      {
        title: 'Long walk or run',
        description: 'Use energy with movement and mood lift',
        duration: '30 to 60 mins',
        subject: 'Exercise',
        energyLevel: 'high',
      },
      {
        title: 'Clean your room',
        description: 'Physical tidying that also feels rewarding',
        duration: '30 to 60 mins',
        subject: 'Chores',
        energyLevel: 'high',
      },
      {
        title: 'Grocery shopping',
        description: 'Errands that combine movement and planning',
        duration: '30 to 60 mins',
        subject: 'Errands',
        energyLevel: 'med',
      },
      {
        title: 'Meal prep',
        description: 'Cook and prepare meals for the next days',
        duration: '45 mins',
        subject: 'Food',
        energyLevel: 'med',
      },
      {
        title: 'Organise physical space',
        description: 'Rearrange or declutter a physical area',
        duration: '30 to 60 mins',
        subject: 'Environment',
        energyLevel: 'high',
      },
    ],
  },
  {
    name: 'Low Mental + Low Emotional (M≤3, E≤3)',
    description: 'Very low cognitive and emotional capacity',
    condition: (m, p, e) => m <= 3 && e <= 3,
    tasks: [
      {
        title: '5-minute breathing exercise',
        description: 'Short breathing practice to calm and reset',
        duration: '5 mins',
        subject: 'Wellness',
        energyLevel: 'low',
      },
      {
        title: 'Step outside',
        description: 'Brief change of environment for fresh air',
        duration: '5 to 10 mins',
        subject: 'Wellness',
        energyLevel: 'low',
      },
      {
        title: 'Drink water',
        description: 'Hydrate to improve baseline functioning',
        duration: '2 mins',
        subject: 'Self-care',
        energyLevel: 'low',
      },
      {
        title: 'Nap or break',
        description: 'Short rest to recover energy',
        duration: '15 to 30 mins',
        subject: 'Rest',
        energyLevel: 'low',
      },
    ],
  },
  {
    name: 'High Mental + Medium Physical (M≥7, P 4-6)',
    description: 'Focused work with some activity',
    condition: (m, p, e) => m >= 7 && p >= 4 && p <= 6,
    tasks: [
      {
        title: 'Pomodoro study session',
        description: '25 minute focused session with short break',
        duration: '25 mins',
        subject: 'Study',
        energyLevel: 'high',
      },
      {
        title: 'Solve problems',
        description: 'Targeted problem solving with steady activity',
        duration: '45 mins',
        subject: 'Practice',
        energyLevel: 'high',
      },
      {
        title: 'Draft writing',
        description: 'Produce a draft that can be refined later',
        duration: '40 to 60 mins',
        subject: 'Writing',
        energyLevel: 'high',
      },
      {
        title: 'Revision with active recall',
        description: 'Use flashcards or practice problems for retention',
        duration: '30 to 45 mins',
        subject: 'Study',
        energyLevel: 'high',
      },
    ],
  },
]


// Helper function to get default tasks based on energy levels
export const getDefaultTasksForEnergy = (
  mental: number,
  physical: number,
  emotional: number,
): Omit<Task, 'id' | 'checked' | 'inFocus'>[] => {
  // Find all matching categories (ordered by specificity)
  const matchedCategories = taskCategories.filter(cat =>
    cat.condition(mental, physical, emotional),
  )

  if (matchedCategories.length === 0) return []

  // Return tasks from the most specific match (last in the list)
  const selectedCategory = matchedCategories[matchedCategories.length - 1]
  return selectedCategory.tasks
}
