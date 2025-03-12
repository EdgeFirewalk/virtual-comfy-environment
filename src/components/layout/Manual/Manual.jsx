import styles from './Manual.module.css';

import Modal from '../Modals/Modal/Modal';
import AboutPage from './ManualPages/AboutPage/AboutPage';
//
//
import PomodoroPage from './ManualPages/PomodoroPage/PomodoroPage';

const Manual = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Manual">
      <div className={styles.manual}>
        <div className={styles.left}>
          <h2 className={styles.logo}>Virtual Comfy Environment</h2>
          <div className={styles.nav}>
            <p className={styles.navLink}>About</p>
            <p className={styles.navLink}>Radio</p>
            <p className={styles.navLink}>Sounds & Ambiance</p>
            <p className={styles.navLink}>Pomodoro</p>
          </div>
        </div>
        <div className={styles.body}>
          {/* <AboutPage /> */}
          <PomodoroPage />
        </div>
      </div>
    </Modal>
  );
};

export default Manual;
