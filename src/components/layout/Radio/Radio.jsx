import React, { useState } from 'react';

import styles from './Radio.module.css';

import { FiSkipBack, FiSkipForward, FiPlay, FiRadio } from "react-icons/fi";

import UIBlock from '../../ui/UIBlock/UIBlock';
import SquareButton from '../../ui/SquareButton/SquareButton';
import RadioStationModal from '../Modals/RadioStationsModal/RadioStationsModal';
import VolumeSlider from '../../ui/VolumeSlider/VolumeSlider';

const Radio = () => {
  const [currentStation, setCurrentStation] = useState('Select a station'); // Состояние текущей радиостанции
  const [isRadioStationsModalOpen, setIsRadioStationsModalOpen] = useState(false);
  const [volume, setVolume] = useState(1); // Состояние громкости начальное
  

  // Функция для открытия модального окна
  const openRadioStationsModal = () => {
    setIsRadioStationsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeRadioStationsModal = () => {
    setIsRadioStationsModalOpen(false);
  };

  // Функция для выбора радиостанции
  const handleStationSelect = (station) => {
    setCurrentStation(station); // Обновляем текущую станцию
  };

  return (
    <>
      {/* Контейнер для текста и блока с кнопками */}
      <div className={styles.radioContainer}>
      {/* Название текущей радиостанции */}
      <div className={styles.stationName}>
          {currentStation}
      </div>
        {/* Блок с кнопками */}
        <UIBlock className={styles.block}>
          {/* Кнопка 1 (Стрелка влево) */}
          <SquareButton icon={<FiSkipBack />} className="button" />

          {/* Кнопка 2 (Пауза) */}
          <SquareButton icon={<FiPlay />} className="button" />

          {/* Кнопка 3 (Стрелка вправо) */}
          <SquareButton icon={<FiSkipForward />} className="button" />

          {/* Громкость + слайдер (используем VolumeSlider) */}
          <div className={styles.volumeControl}>
            
          <VolumeSlider
            value={volume}
            onChange={(value) => setVolume(value)} // Принимаем значение напрямую
            className={styles.volumeSlider}
            />
          </div>
          

          {/* Кнопка 5 (Радио, открывает модальное окно) */}
          <SquareButton
            icon={<FiRadio />} 
            onClick={openRadioStationsModal}
            
          />
        </UIBlock>
        </div>
        {/* Модальное окно RadioStationModal */}
        <RadioStationModal
          isOpen={isRadioStationsModalOpen}
          onClose={closeRadioStationsModal}
        />
    </>
    
  );
};

export default Radio;