import React, { useState } from 'react';

import styles from './Radio.module.css';

import { FaArrowLeft, FaPause, FaArrowRight, FaVolumeUp } from 'react-icons/fa'; // Импортируем иконки из FontAwesome
import { MdVolumeUp, MdRadio } from 'react-icons/md'; // Импортируем иконку радио из Material Design

import UIBlock from '../../ui/UIBlock/UIBlock';
import SquareButton from '../../ui/SquareButton/SquareButton';
import RadioStationModal from '../Modals/RadioStationsModal/RadioStationModal';

const Radio = () => {
  const [isRadioStationModalOpen, setIsRadioStationModalOpen] = useState(false);
  const [volume, setVolume] = useState(50); // Состояние для громкости (значение от 0 до 100)

  const openRadioStationModal = () => {
    setIsRadioStationModalOpen(true);
  };

  const closeRadioStationModal = () => {
    setIsRadioStationModalOpen(false);
  };

  return (
    <div>
      {/* Блок с кнопками */}
      <UIBlock className={styles.block}>
        {/* Кнопка 1 (Стрелка влево) */}
        <SquareButton icon={<FaArrowLeft />} className="button" />

        {/* Кнопка 2 (Пауза) */}
        <SquareButton icon={<FaPause />} className="button" />

        {/* Кнопка 3 (Стрелка вправо) */}
        <SquareButton icon={<FaArrowRight />} className="button" />

        {/* Кнопка 4 (Громкость + слайдер) */}
        <div className={styles.volumeControl}>
          <MdVolumeUp className={styles.volumeIcon} size={24} color="white" />
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className={styles.volumeSlider}
          />
        </div>

        {/* Кнопка 5 (Радио, открывает модальное окно) */}
        <SquareButton
          icon={<MdRadio />} // Используем Material Design иконку
          onClick={openRadioStationModal}
          className="radio-station-button"
        />
      </UIBlock>

      {/* Модальное окно RadioStationModal */}
      <RadioStationModal
        isOpen={isRadioStationModalOpen}
        onClose={closeRadioStationModal}
      />
    </div>
  );
};

export default Radio;