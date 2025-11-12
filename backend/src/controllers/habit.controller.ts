import type { Request, Response } from 'express';
import * as habitService from '../services/habit.service.js';
import { createHabitSchema } from '../validators/habits.validator.js';

interface AuthenticatedUser {
  id: string;
  email: string;
}

export const getAllUserHabits = async (req: Request, res: Response) => {
  try {
    const user = req.user as AuthenticatedUser;
    const habits = await habitService.findHabitsByUserId(user.id);
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: 'Błąd serwera!' });
  }
};

export const createNewHabit = async (req: Request, res: Response) => {
  const validationResult = createHabitSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  try {
    const user = req.user as AuthenticatedUser;
    const newHabit = await habitService.createHabit(
      user.id,
      validationResult.data
    );
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    const user = req.user as AuthenticatedUser;
    const habitId = req.params.id as string;

    const result = await habitService.deleteHabitById(user.id, habitId);

    if (result.count === 0) {
      return res.status(404).json({ message: 'Nie znaleziono nawyku!' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

export const toggleHabit = async (req: Request, res: Response) => {
  try {
    const user = req.user as AuthenticatedUser;
    const habitId = req.params.id as string | undefined;

    if (!habitId) {
      return res.status(400).json({ message: 'Brak id nawyku' });
    }

    const result = await habitService.toggleHabitEntry(user.id, habitId);
    
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message.includes('uprawnień')) {
      return res.status(404).json({ message: 'Nie znaleziono nawyku' });
    }
    res.status(500).json({ message: 'Wewnętrzny błąd serwera' });
  }
};