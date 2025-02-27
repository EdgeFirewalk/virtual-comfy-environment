import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import { FiX } from 'react-icons/fi';
import SquareButton from '../../../ui/SquareButton/SquareButton';

const Modal = ({ isOpen, onClose, label, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Эффект для обработки анимации закрытия
  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false); // Сбрасываем состояние закрытия
    }
  }, [isOpen]);

  // Функция для обработки закрытия с анимацией
  const handleClose = () => {
    setIsClosing(true); // Запускаем анимацию закрытия
    setTimeout(() => {
      onClose(); // Закрываем модальное окно после завершения анимации
    }, 500); // Время анимации (0.5 секунды)
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`}
      onClick={handleClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Заголовок и кнопка закрытия */}
        <div className={styles.modal_header}>
          {label && <div className={styles.label}>{label}</div>}
          <SquareButton
            icon={<FiX />}
            onClick={handleClose}
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