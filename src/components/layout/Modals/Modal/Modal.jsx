import styles from './Modal.module.css';

import { FiBookOpen } from 'react-icons/fi';
import { FiMaximize } from 'react-icons/fi';
import { MdClose } from 'react-icons/md'; // Импортируем Material Design иконку "крестик"

import UIBlock from '../../../ui/UIBlock/UIBlock';
import SquareButton from '../../../ui/SquareButton/SquareButton';

const Modal = ({ isOpen, onClose, label }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* Надпись в левом верхнем углу */}
      {label && <div className={styles.label}>{label}</div>}

      {/* Кнопка закрытия в правом верхнем углу */}
      <UIBlock className={styles.closeButtonBlock}>
        <SquareButton
          icon={<MdClose />} // Используем иконку "крестик"
          onClick={onClose}
          className="close-button"
        />
      </UIBlock>
    </div>
  );
};

export default Modal;