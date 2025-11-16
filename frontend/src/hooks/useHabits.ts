import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getHabitsRequest,
  createHabitRequest,
  deleteHabitRequest,
  toggleHabitRequest,
} from '../services/habit.service';
import type { Habit } from '../types/habit.types';
import { isHabitDoneToday } from '../utils/date.helpers';

const HABITS_QUERY_KEY = ['habits'];

export const useHabits = () => {
  const queryClient = useQueryClient();

  const {
    data: habits,
    isLoading: isLoadingHabits,
    error: habitsError,
  } = useQuery({
    queryKey: HABITS_QUERY_KEY,
    queryFn: async () => {
      const response = await getHabitsRequest();
      return response.data;
    },
  });

  const { mutate: createHabit, isPending: isCreatingHabit } = useMutation({
    mutationFn: (name: string) => createHabitRequest({ name }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HABITS_QUERY_KEY });
    },
  });

  const { mutate: toggleHabit, isPending: isTogglingHabit } = useMutation({
    mutationFn: (habitId: string) => toggleHabitRequest(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HABITS_QUERY_KEY });
    },
  });

  const { mutate: deleteHabit, isPending: isDeletingHabit } = useMutation({
    mutationFn: (habitId: string) => deleteHabitRequest(habitId),
    onMutate: async (toggleHabitId: string) => {
      await queryClient.cancelQueries({ queryKey: HABITS_QUERY_KEY });

      const previousHabits =
        queryClient.getQueryData<Habit[]>(HABITS_QUERY_KEY);

      queryClient.setQueryData<Habit[]>(HABITS_QUERY_KEY, (oldData) => {
        if (!oldData) return [];

        return oldData.map((habit) => {
          if (habit.id === toggleHabitId) {
            const isDone = isHabitDoneToday(habit);

            if (isDone) {
              const today = new Date().toISOString().split('T')[0];
              return {
                ...habit,
                entries: habit.entries.filter(
                  (entry) => entry.date.split('T')[0] !== today
                ),
              };
            } else {
              const fakeEntry = {
                id: Math.random().toString(),
                date: new Date().toISOString(),
                habitId: habit.id,
              };
              return {
                ...habit,
                entrie: [...habit.entries, fakeEntry],
              };
            }
          }
          return habit;
        });
      });
      return { previousHabits };
    },
    onError: (err, variables, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(HABITS_QUERY_KEY, context.previousHabits);
      }
    },
  
  });

  return {
    habits,
    isLoadingHabits,
    habitsError,
    createHabit,
    isCreatingHabit,
    toggleHabit,
    isTogglingHabit,
    deleteHabit,
    isDeletingHabit,
  };
};
