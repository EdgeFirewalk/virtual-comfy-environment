import { useState, useEffect } from 'react';

import styles from './Pomodoro.module.css';

import { FiClock } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import { FiSettings } from 'react-icons/fi';
import { FiChevronLeft } from 'react-icons/fi';

import UIBlock from '../../ui/UIBlock/UIBlock';
import SquareButton from '../../ui/SquareButton/SquareButton';
import NumberInput from '../../ui/InputFields/NumberInput/NumberInput';

const Pomodoro = () => {
  const [isUnfold, setIsUnfold] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Время указывается в минутах
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [isValidPomodoroTime, setIsValidPomodoroTime] = useState(true);

  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [isValidShortBreakTime, setIsValidShortBreakTime] = useState(true);

  const [longBreakTime, setLongBreakTime] = useState(15);
  const [isValidLongBreakTime, setIsValidLongBreakTime] = useState(true);

  const [shouldAutoStartPomodoros, setShouldAutoStartPomodoros] =
    useState(true);
  const [shouldAutoStartBreaks, setShouldAutoStartBreaks] = useState(true);

  const toggleIsUnfold = () => {
    setIsUnfold((prev) => !prev);
  };

  const toggleIsSettingsOpen = () => {
    // TODO: Останавливать таймер
    setIsSettingsOpen((prev) => !prev);
  };

  // Используется для изменения настроек времени таймера
  const setTimerTimeSetting = (newValue, valueSetterFunc, validSetterFunc) => {
    validSetterFunc(true);

    if (newValue <= 0) {
      validSetterFunc(false);
    }

    valueSetterFunc(newValue);
  };

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
    setShouldAutoStartPomodoros(savedPomodoroSettings.shouldAutoStartPomodoros);
    setShouldAutoStartBreaks(savedPomodoroSettings.shouldAutoStartBreaks);
  }, []);

  useEffect(() => {
    const newTimerSettings = {
      isUnfold: isUnfold,
      isSettingsOpen: isSettingsOpen,
      pomodoroTime: parseInt(pomodoroTime),
      shortBreakTime: parseInt(shortBreakTime),
      longBreakTime: parseInt(longBreakTime),
      shouldAutoStartPomodoros: shouldAutoStartPomodoros,
      shouldAutoStartBreaks: shouldAutoStartBreaks,
    };

    if (!isValidPomodoroTime) {
      newTimerSettings.pomodoroTime = 25; // Сохраняем дефолтное значение
    }
    if (!isValidShortBreakTime) {
      newTimerSettings.shortBreakTime = 5; // Сохраняем дефолтное значение
    }
    if (!isValidLongBreakTime) {
      newTimerSettings.longBreakTime = 15; // Сохраняем дефолтное значение
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
              isValidLongBreakTime
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
                isValidLongBreakTime
              )
            }
          />
        </div>
        <div
          className={`${styles.timerPage} ${styles.timer}`}
          style={{ display: isUnfold && !isSettingsOpen ? 'flex' : 'none' }}
        >
          <div className={styles.stages}>
            <p className={`${styles.stage} ${styles.activeStage}`}>Pomodoro</p>
            <p className={`${styles.stage}`}>Short Break</p>
            <p className={`${styles.stage}`}>Long Break</p>
          </div>
          <p className={styles.time}>25:00</p>
          {/* TODO: Применить Анину кнопку */}
          <button className={styles.button}>Start</button>
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
            <p className={styles.settingsBlockTitle}>Timer</p>
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
        25:00
      </p>
    </div>
  );
};

export default Pomodoro;
