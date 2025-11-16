import { type Habit } from '../types/habit.types.js';

const getTodayUTC = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
};

export const isHabitDoneToday = (habit: Habit) => {
  const todayTimestamp = getTodayUTC().getTime();

  return habit.entries.some((entry) => {
    const entryDate = new Date(entry.date);

    return entryDate.getTime() === todayTimestamp;
  });
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}}`;
};
