import { usePomodoro } from '../hooks/usePomodoro';
import { Navbar } from '../layout/Navbar';
import styles from './PomodoroPage.module.scss';

const PomodoroPage = () => {
const {
    mode,
    isActive,
    formattedTime,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
  } = usePomodoro();

  return (
    <div className={styles.pomodoroPage}>
      <Navbar />
      <main className={styles.timerContainer}>
        <div className={styles.modeButtons}>
          <button
            className={`${styles.modeButton} ${
              mode === 'work' ? styles.modeButton_active : ''
            }`}
            onClick={() => changeMode('work')}
          >
            Praca
          </button>
          <button
            className={`${styles.modeButton} ${
              mode === 'shortBreak' ? styles.modeButton_active : ''
            }`}
            onClick={() => changeMode('shortBreak')}
          >
            Krótka Przerwa
          </button>
          <button
            className={`${styles.modeButton} ${
              mode === 'longBreak' ? styles.modeButton_active : ''
            }`}
            onClick={() => changeMode('longBreak')}
          >
            Długa Przerwa
          </button>
        </div>
        <div className={styles.timer}>{formattedTime}</div>
        <div className={styles.controlButtons}>
          {!isActive ? (
            <button
              className={`${styles.controlButton} ${styles.controlButton_start}`}
              onClick={startTimer}
            >
              Start
            </button>
          ) : (
            <button
              className={`${styles.controlButton} ${styles.controlButton_pause}`}
              onClick={pauseTimer}
            >
              Pauza
            </button>
          )}
          <button
            className={`${styles.controlButton} ${styles.controlButton_reset}`}
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </main>
    </div>
  );
};

export default PomodoroPage;
