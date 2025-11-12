import db from '../db.js';
import { getTodayDate } from '../utils.js';
import type { CreateHabitBody } from '../validators/habits.validator.js';

export const findHabitsByUserId = (userId: string) => {
  return db.habit.findMany({
    where: {
      userId: userId,
    },
    include: {
      entries: {
        orderBy: {
          date: 'desc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const createHabit = (userId: string, data: CreateHabitBody) => {
  return db.habit.create({
    data: {
      name: data.name,
      userId: userId,
    },
  });
};

export const deleteHabitById = (userId: string, habbitId: string) => {
  return db.habit.deleteMany({
    where: {
      id: habbitId,
      userId: userId,
    },
  });
};

export const toggleHabitEntry = async (userId: string, habitId: string) => {
  const today = getTodayDate();

  const existingEntry = await db.habitEntry.findFirst({
    where: {
      habitId: habitId,
      date: today,
      habit: {
        userId: userId,
      },
    },
  });

  if (existingEntry) {
    await db.habitEntry.delete({
      where: {
        id: existingEntry.id,
      },
    });

    return { status: 'deleted' };
  } else {
    const habit = await db.habit.findFirst({
      where: { id: habitId, userId: userId },
    });

    if (!habit) {
      throw new Error('Nie znaleziono nawyku lub brak uprawnień');
    }

    await db.habitEntry.create({
      data: {
        date: today,
        habitId: habitId,
      },
    });
    return { status: 'created' };
  }
};
