import { useState } from 'react';

import styles from './Manual.module.css';

import Modal from '../Modals/Modal/Modal';
import AboutPage from './ManualPages/AboutPage/AboutPage';
import RadioPage from './ManualPages/RadioPage/RadioPage';
import SoundsPage from './ManualPages/SoundsPage/SoundsPage';
import PomodoroPage from './ManualPages/PomodoroPage/PomodoroPage';

const pages = {
  about: 'about',
  radio: 'radio',
  sounds: 'sounds',
  pomodoro: 'pomodoro',
};

const Manual = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(pages.about);

  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Manual">
      <div className={styles.manual}>
        <div className={styles.left}>
          <h2 className={styles.logo}>Virtual Comfy Environment</h2>
          <div className={styles.nav}>
            <p
              className={`${styles.navLink} ${currentPage === pages.about && styles.activeLink}`}
              onClick={() => setCurrentPage(pages.about)}
            >
              About
            </p>
            <p
              className={`${styles.navLink} ${currentPage === pages.radio && styles.activeLink}`}
              onClick={() => setCurrentPage(pages.radio)}
            >
              Radio
            </p>
            <p
              className={`${styles.navLink} ${currentPage === pages.sounds && styles.activeLink}`}
              onClick={() => setCurrentPage(pages.sounds)}
            >
              Sounds & Ambiance
            </p>
            <p
              className={`${styles.navLink} ${currentPage === pages.pomodoro && styles.activeLink}`}
              onClick={() => setCurrentPage(pages.pomodoro)}
            >
              Pomodoro
            </p>
          </div>
        </div>
        <div className={styles.body}>
          {currentPage === pages.about && <AboutPage />}
          {currentPage === pages.radio && <RadioPage />}
          {currentPage === pages.sounds && <SoundsPage />}
          {currentPage === pages.pomodoro && <PomodoroPage />}
        </div>
      </div>
    </Modal>
  );
};

export default Manual;
