import React from 'react';

import styles from './Modal.module.css';

import { FiX } from 'react-icons/fi';

import SquareButton from '../../../ui/SquareButton/SquareButton';

const Modal = ({ isOpen, onClose, label, children }) => {
  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.open : styles.closed}`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Заголовок и кнопка закрытия */}
        <div className={styles.modalHeader}>
          {label && <div className={styles.label}>{label}</div>}
          <SquareButton
            icon={<FiX />}
            onClick={onClose}
            className={styles.closeButton}
          />
        </div>
        {/* Дочерние элементы (контент модального окна) */}
        {children}
      </div>
    </div>
  );
};

export default Modal;