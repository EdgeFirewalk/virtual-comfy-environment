import React from 'react';
import Modal from '../Modal/Modal';
import styles from './RadioStationModal.module.css';

const RadioStationModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      label="Available Radio Stations" // Надпись в левом верхнем углу
    />
  );
};

export default RadioStationModal;