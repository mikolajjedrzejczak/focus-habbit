export interface HabitEntry {
  id: string;
  date: string;
  habitId: string;
}

export interface Habit {
  id: string;
  name: string;
  listId: string;
  createdAt: string;
  entries: HabitEntry[];
}

export interface HabitList {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  habits: Habit[];
}
