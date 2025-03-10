import { useState, useEffect } from 'react';
import useSound from 'use-sound';

import TIMER_STAGES from '../../../utils/consts/TIMER_STAGES';
import formatTime from '../../../utils/functions/formatTime';

import styles from './Pomodoro.module.css';

import { FiClock, FiX, FiSettings, FiChevronLeft } from 'react-icons/fi';

import startTimerSound from '../../../assets/sounds/timer-start.wav';
import stopTimerSound from '../../../assets/sounds/timer-stop.wav';
import timeIsUpSound from '../../../assets/sounds/times-up.wav';

import UIBlock from '../../ui/UIBlock/UIBlock';
import SquareButton from '../../ui/SquareButton/SquareButton';
import Button from '../../ui/Button/Button';
import NumberInput from '../../ui/InputFields/NumberInput/NumberInput';

const Pomodoro = () => {
  const [isUnfold, setIsUnfold] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Настройки таймера (время в минутах)
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [isValidPomodoroTime, setIsValidPomodoroTime] = useState(true);

  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [isValidShortBreakTime, setIsValidShortBreakTime] = useState(true);

  const [longBreakTime, setLongBreakTime] = useState(15);
  const [isValidLongBreakTime, setIsValidLongBreakTime] = useState(true);

  const [longBreakInterval, setLongBreakInterval] = useState(4); // Кол-во помидорок до долгого перерыва
  const [isValidLongBreakInterval, setIsValidLongBreakInterval] =
    useState(true);

  const [shouldAutoStartPomodoros, setShouldAutoStartPomodoros] =
    useState(true);
  const [shouldAutoStartBreaks, setShouldAutoStartBreaks] = useState(true);

  // Ядро таймера
  const [currentStage, setCurrentStage] = useState(TIMER_STAGES.pomodoro);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [timeLeft, setTimeLeft] = useState(pomodoroTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Звуки таймера
  const [playStartTimerSound] = useSound(startTimerSound);
  const [playStopTimerSound] = useSound(stopTimerSound);
  const [playTimeIsUpSound] = useSound(timeIsUpSound);

  const toggleIsUnfold = () => {
    setIsUnfold((prev) => !prev);
  };

  const toggleIsSettingsOpen = () => {
    setIsRunning(false);
    setIsSettingsOpen((prev) => !prev);
  };

  const toggleTimer = () => {
    setIsRunning((prev) => {
      if (prev) {
        playStopTimerSound();
      } else {
        playStartTimerSound();
      }

      return !prev;
    });
  };

  const setTimerTimeSetting = (newValue, valueSetterFunc, validSetterFunc) => {
    validSetterFunc(true);

    if (newValue <= 0) {
      validSetterFunc(false);
    }

    valueSetterFunc(newValue);
  };

  // Загрузка настроек из localStorage в самом начале работы приложения
  useEffect(() => {
    const savedPomodoroSettings = JSON.parse(
      localStorage.getItem('savedPomodoroSettings'),
    );

    // Если настроек не было сохранено, то ничего не подгружаем
    if (!savedPomodoroSettings) {
      return;
    }

    setIsUnfold(savedPomodoroSettings.isUnfold);
    setIsSettingsOpen(savedPomodoroSettings.isSettingsOpen);
    setPomodoroTime(savedPomodoroSettings.pomodoroTime);
    setShortBreakTime(savedPomodoroSettings.shortBreakTime);
    setLongBreakTime(savedPomodoroSettings.longBreakTime);
    setLongBreakInterval(savedPomodoroSettings.longBreakInterval);
    setShouldAutoStartPomodoros(savedPomodoroSettings.shouldAutoStartPomodoros);
    setShouldAutoStartBreaks(savedPomodoroSettings.shouldAutoStartBreaks);
  }, []);

  // Обновление времени и стадий таймера
  useEffect(() => {
    let timeout;

    const tick = () => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) {
          timeout = setTimeout(tick, 1000);
          return prevTime - 1;
        } else {
          playTimeIsUpSound();
          setIsRunning(false);

          // Логика переключения стадий
          if (currentStage === TIMER_STAGES.pomodoro) {
            setCompletedPomodoros((prevCount) => {
              const newCount = prevCount + 1;
              if (newCount % longBreakInterval === 0) {
                setCurrentStage(TIMER_STAGES.longBreak);
              } else {
                setCurrentStage(TIMER_STAGES.shortBreak);
              }

              if (shouldAutoStartBreaks) {
                setIsRunning(true);
              }

              return newCount;
            });
          } else {
            setCurrentStage(TIMER_STAGES.pomodoro);

            if (shouldAutoStartPomodoros) {
              setIsRunning(true);
            }
          }
          return 0;
        }
      });
    };

    if (isRunning) {
      timeout = setTimeout(tick, 1000);
    }

    return () => clearTimeout(timeout);
  }, [isRunning, currentStage]);

  // Установка времени, от которого начинает идти таймер, в зависимости от стадии, на которую таймер переключился
  useEffect(() => {
    switch (currentStage) {
      case TIMER_STAGES.pomodoro:
        setTimeLeft(pomodoroTime * 60);
        break;
      case TIMER_STAGES.shortBreak:
        setTimeLeft(shortBreakTime * 60);
        break;
      case TIMER_STAGES.longBreak:
        setTimeLeft(longBreakTime * 60);
        break;
      default:
        setTimeLeft(pomodoroTime * 60);
    }
  }, [currentStage, pomodoroTime, shortBreakTime, longBreakTime]);

  // Сохранение настроек таймера в localStorage при их изменении
  useEffect(() => {
    const newTimerSettings = {
      isUnfold: isUnfold,
      isSettingsOpen: isSettingsOpen,
      pomodoroTime: parseInt(pomodoroTime),
      shortBreakTime: parseInt(shortBreakTime),
      longBreakTime: parseInt(longBreakTime),
      longBreakInterval: parseInt(longBreakInterval),
      shouldAutoStartPomodoros: shouldAutoStartPomodoros,
      shouldAutoStartBreaks: shouldAutoStartBreaks,
    };

    // В случае невалидных данных сохраняем дефолтные значения
    if (!isValidPomodoroTime) {
      newTimerSettings.pomodoroTime = 25;
    }
    if (!isValidShortBreakTime) {
      newTimerSettings.shortBreakTime = 5;
    }
    if (!isValidLongBreakTime) {
      newTimerSettings.longBreakTime = 15;
    }
    if (!isValidLongBreakInterval) {
      newTimerSettings.longBreakInterval = 4;
    }

    localStorage.setItem(
      'savedPomodoroSettings',
      JSON.stringify(newTimerSettings),
    );
  }, [
    isUnfold,
    isSettingsOpen,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    longBreakInterval,
    shouldAutoStartPomodoros,
    shouldAutoStartBreaks,
  ]);

  return (
    <div className={styles.block}>
      <UIBlock className={styles.pomodoro}>
        <div className={styles.header}>
          <SquareButton
            icon={<FiX />}
            style={{ display: isUnfold && !isSettingsOpen ? 'block' : 'none' }}
            onClick={toggleIsUnfold}
          />
          <SquareButton
            icon={<FiClock />}
            style={{ display: isUnfold ? 'none' : 'block' }}
            onClick={toggleIsUnfold}
          />
          <SquareButton
            icon={<FiSettings />}
            style={{ display: isUnfold && !isSettingsOpen ? 'block' : 'none' }}
            onClick={toggleIsSettingsOpen}
          />
          <SquareButton
            className={
              isValidPomodoroTime &&
              isValidShortBreakTime &&
              isValidLongBreakTime &&
              isValidLongBreakInterval
                ? ''
                : styles.inactiveBackButton
            }
            icon={<FiChevronLeft />}
            style={{
              display: isUnfold && isSettingsOpen ? 'block' : 'none',
            }}
            onClick={toggleIsSettingsOpen}
            disabled={
              !(
                isValidPomodoroTime &&
                isValidShortBreakTime &&
                isValidLongBreakTime &&
                isValidLongBreakInterval
              )
            }
          />
        </div>
        <div
          className={`${styles.timerPage} ${styles.timer}`}
          style={{ display: isUnfold && !isSettingsOpen ? 'flex' : 'none' }}
        >
          <div className={styles.stages}>
            <p
              className={`${styles.stage} ${currentStage === TIMER_STAGES.pomodoro && styles.activeStage}`}
              onClick={() => setCurrentStage(TIMER_STAGES.pomodoro)}
            >
              Pomodoro
            </p>
            <p
              className={`${styles.stage} ${currentStage === TIMER_STAGES.shortBreak && styles.activeStage}`}
              onClick={() => setCurrentStage(TIMER_STAGES.shortBreak)}
            >
              Short Break
            </p>
            <p
              className={`${styles.stage} ${currentStage === TIMER_STAGES.longBreak && styles.activeStage}`}
              onClick={() => setCurrentStage(TIMER_STAGES.longBreak)}
            >
              Long Break
            </p>
          </div>
          <p className={styles.time}>{formatTime(timeLeft)}</p>
          <Button className={styles.button} onClick={toggleTimer}>
            {isRunning ? 'Stop' : 'Start'}
          </Button>
          <p className={styles.completedPomodoros}>#{completedPomodoros}</p>
        </div>
        <div
          className={`${styles.timerPage} ${styles.settings}`}
          style={{ display: isUnfold && isSettingsOpen ? 'flex' : 'none' }}
        >
          <div className={styles.settingsBlock}>
            <p className={styles.settingsBlockTitle}>Time (Minutes)</p>
            <div className={styles.inputBlock}>
              <p className={styles.inputLabel}>Pomodoro</p>
              <NumberInput
                placeholder="Pomodoro Time"
                min={1}
                value={pomodoroTime}
                onChange={(e) =>
                  setTimerTimeSetting(
                    e.target.value,
                    setPomodoroTime,
                    setIsValidPomodoroTime,
                  )
                }
                isValid={isValidPomodoroTime}
              />
            </div>
            <div className={styles.inputBlock}>
              <p className={styles.inputLabel}>Short Break</p>
              <NumberInput
                placeholder="Short Break Time"
                min={1}
                value={shortBreakTime}
                onChange={(e) =>
                  setTimerTimeSetting(
                    e.target.value,
                    setShortBreakTime,
                    setIsValidShortBreakTime,
                  )
                }
                isValid={isValidShortBreakTime}
              />
            </div>
            <div className={styles.inputBlock}>
              <p className={styles.inputLabel}>Long Break</p>
              <NumberInput
                placeholder="Long Break Time"
                min={1}
                value={longBreakTime}
                onChange={(e) =>
                  setTimerTimeSetting(
                    e.target.value,
                    setLongBreakTime,
                    setIsValidLongBreakTime,
                  )
                }
                isValid={isValidLongBreakTime}
              />
            </div>
          </div>
          <div className={styles.settingsBlock}>
            <p className={styles.settingsBlockTitle}>Workflow</p>
            <div className={styles.inputBlock}>
              <p className={styles.inputLabel}>
                Long Break Interval (Pomodoros)
              </p>
              <NumberInput
                placeholder="Long Break Interval"
                min={1}
                value={longBreakInterval}
                onChange={(e) =>
                  setTimerTimeSetting(
                    e.target.value,
                    setLongBreakInterval,
                    setIsValidLongBreakInterval,
                  )
                }
                isValid={isValidLongBreakInterval}
              />
            </div>
            <div className={styles.checkboxBlock}>
              <input
                id="pomodoros"
                className={styles.checkbox}
                type="checkbox"
                checked={shouldAutoStartPomodoros}
                onChange={() => setShouldAutoStartPomodoros((prev) => !prev)}
              />
              <label htmlFor="pomodoros">Auto Start Pomodoros</label>
            </div>
            <div className={styles.checkboxBlock}>
              <input
                id="breaks"
                className={styles.checkbox}
                type="checkbox"
                checked={shouldAutoStartBreaks}
                onChange={() => setShouldAutoStartBreaks((prev) => !prev)}
              />
              <label htmlFor="breaks">Auto Start Breaks</label>
            </div>
          </div>
        </div>
      </UIBlock>
      <p
        className={styles.foldTime}
        style={{ display: isUnfold ? 'none' : 'block' }}
      >
        {formatTime(timeLeft)}
      </p>
    </div>
  );
};

export default Pomodoro;
