import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../utils/date.helpers';

const WORK_TIME = 25 * 60; // 25 min
const SHORT_BREAK_TIME = 5 * 60; // 5 min
const LONG_BREAK_TIME = 15 * 60; // 15 min

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export const usePomodoro = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prevSeconds) => {
          if (prevSeconds <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsActive(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  const startTimer = () => {
    if (secondsLeft > 0) {
      setIsActive(true);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);

    switch (newMode) {
      case 'work':
        setSecondsLeft(WORK_TIME);
        break;
      case 'shortBreak':
        setSecondsLeft(SHORT_BREAK_TIME);
        break;
      case 'longBreak':
        setSecondsLeft(LONG_BREAK_TIME);
        break;
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    changeMode(mode);
  };

  return {
    mode,
    isActive,
    secondsLeft,
    formattedTime: formatTime(secondsLeft),
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
  };
};
