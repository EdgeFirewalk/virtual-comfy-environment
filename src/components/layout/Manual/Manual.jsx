import styles from './Manual.module.css';

import Modal from '../Modals/Modal/Modal';
import AboutPage from './ManualPages/AboutPage/AboutPage';

const Manual = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Manual">
      <div className={styles.manual}>
        <div className={styles.left}>
          <h2 className={styles.logo}>Virtual Comfy Environment</h2>
          <p>About</p>
          <p>Radio</p>
          <p>Sounds & Ambiance</p>
          <p>Pomodoro</p>
        </div>
        <div className={styles.body}>{/* <AboutPage /> */}</div>
      </div>
    </Modal>
  );
};

export default Manual;
