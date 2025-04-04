import React from 'react';
import styles from './Modal.module.css';
import { FiX } from 'react-icons/fi';
import SquareButton from '../../../ui/SquareButton/SquareButton';

const Modal = ({ isOpen, onClose, label, children, className }) => {
  return (
    <div
      className={`${styles.modalContainer} ${isOpen ? styles.open : styles.closed} ${className}`}
    >
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
      <div className={styles.modalBody}>
        {children}
      </div>
    </div>
  );
};

export default Modal;