import { useHabits } from '../../hooks/useHabits.js';
import type { Habit } from '../../types/habit.types.js';
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  isHabitDoneToday,
} from '../../utils/date.helpers.js';
import styles from './HabitCard.module.scss';

interface habitCardProps {
  habit: Habit;
}

const HabitCard = ({ habit }: habitCardProps) => {
  const { toggleHabit, isTogglingHabit, deleteHabit, isDeletingHabit } =
    useHabits();

  const isDone = isHabitDoneToday(habit);

  const isOperationPending = isTogglingHabit || isDeletingHabit;

  const currentStreak = calculateCurrentStreak(habit.entries);
  const longestStreak = calculateLongestStreak(habit.entries);

  return (
    <li className={styles.habitCard}>
      <div className={styles.habitCard__header}>
        <div className={styles.habitCard__info}>
          <span
            className={`${styles.habitCard__name} ${
              isDone ? styles.habitCard__name_done : ''
            }`}
          >
            {habit.name}
          </span>

          <div className={styles.habitCard__stats}>
            {currentStreak > 0 && (
              <span
                className={`${styles.habitCard__stat} ${styles.habitCard__stat_current}`}
              >
                🔥 {currentStreak} {currentStreak === 1 ? 'dzień' : 'dni'}{' '}
                serii!
              </span>
            )}
            {longestStreak > 1 && (
              <span
                className={`${styles.habitCard__stat} ${styles.habitCard__stat_longest}`}
              >
                🏆 Rekord: {longestStreak}
              </span>
            )}
          </div>
        </div>

        <div className={styles.habitCard__actions}>
          <button
            onClick={() => toggleHabit(habit.id)}
            disabled={isOperationPending}
            className={`${styles.habitCard__toggleButton} ${
              isDone ? styles.habitCard__toggleButton_done : ''
            }`}
          >
            {isDone ? 'Cofnij' : 'Zrobione!'}
          </button>
          <button
            onClick={() => deleteHabit(habit.id)}
            disabled={isOperationPending}
            className={styles.habitCard__deleteButton}
          >
            Usuń
          </button>
        </div>
      </div>
    </li>
  );
};

export default HabitCard;
