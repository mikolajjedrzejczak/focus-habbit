import { useHabits } from '../../hooks/useHabits.js';
import type { Habit } from '../../types/habit.types.js';
import {
  isHabitDoneToday
} from '../../utils/date.helpers.js';
import styles from './HabitCard.module.scss';
import 'react-tooltip/dist/react-tooltip.css';

interface habitCardProps {
  habit: Habit;
}

const HabitCard = ({ habit }: habitCardProps) => {
  const { toggleHabit, isTogglingHabit, deleteHabit, isDeletingHabit } =
    useHabits();

  const isDone = isHabitDoneToday(habit);

  const isOperationPending = isTogglingHabit || isDeletingHabit;

  return (
    <li className={styles.habitCard}>
      <div className={styles.habitCard__header}>
        <span
          className={`${styles.habitCard__name} ${
            isDone ? styles.habitCard__name_done : ''
          }`}
        >
          {habit.name}
        </span>
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