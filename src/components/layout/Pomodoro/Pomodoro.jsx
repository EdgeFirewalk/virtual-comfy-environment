import { useState } from 'react';

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

  // TODO: Сохранять состояние таймера в localStorage

  const toggleIsUnfold = () => {
    setIsUnfold((prev) => !prev);
  };

  const toggleIsSettingsOpen = () => {
    setIsSettingsOpen((prev) => !prev);
  };

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
            icon={<FiChevronLeft />}
            style={{ display: isUnfold && isSettingsOpen ? 'block' : 'none' }}
            onClick={toggleIsSettingsOpen}
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
              <NumberInput placeholder="" value={25} />
            </div>
            <div className={styles.inputBlock}>
              <p className={styles.inputLabel}>Short Break</p>
              <NumberInput placeholder="" value={5} />
            </div>
            <div className={styles.inputBlock}>
              <p className={styles.inputLabel}>Long Break</p>
              <NumberInput placeholder="" value={15} />
            </div>
          </div>
          <div className={styles.settingsBlock}>
            <p className={styles.settingsBlockTitle}>Timer</p>
            <div className={styles.checkboxBlock}>
              <input
                id="pomodoros"
                className={styles.checkbox}
                type="checkbox"
              />
              <label htmlFor="pomodoros">Autostart Pomodoros</label>
            </div>
            <div className={styles.checkboxBlock}>
              <input id="breaks" className={styles.checkbox} type="checkbox" />
              <label htmlFor="breaks">Autostart Breaks</label>
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
