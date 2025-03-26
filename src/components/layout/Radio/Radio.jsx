import React, { useState } from 'react';
import styles from './Radio.module.css';
import {
  FiSkipBack,
  FiSkipForward,
  FiPlay,
  FiPause,
  FiRadio,
} from 'react-icons/fi';
import UIBlock from '../../ui/UIBlock/UIBlock';
import SquareButton from '../../ui/SquareButton/SquareButton';
import RadioStationModal from '../Modals/RadioStationsModal/RadioStationsModal';
import VolumeSlider from '../../ui/VolumeSlider/VolumeSlider';

const Radio = ({
  setBackgroundVideo,
  setIsPlaying,
  setVolume,
  isPlaying,
  volume,
}) => {
  const [currentStation, setCurrentStation] = useState('Select a station');
  const [isRadioStationsModalOpen, setIsRadioStationsModalOpen] =
    useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1); // Текущий индекс радиостанции
  const [savedUrls, setSavedUrls] = useState([]); // Сохраняем список радиостанций

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
    if (station) {
      const index = savedUrls.findIndex((url) => url.id === station.id);
      setCurrentIndex(index); // Устанавливаем текущий индекс
      setCurrentStation(station.title);
      setBackgroundVideo(station.url); // Устанавливаем видео
      setIsPlaying(true); // Включаем воспроизведение
    } else {
      setCurrentIndex(-1); // Сбрасываем индекс
      setCurrentStation('Select a station');
      setBackgroundVideo(null); // Убираем видео
      setIsPlaying(false); // Останавливаем воспроизведение
    }
  };

  // Функция для переключения на следующую радиостанцию
  const handleNext = () => {
    if (savedUrls.length > 0 && currentIndex < savedUrls.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextStation = savedUrls[nextIndex];
      setCurrentIndex(nextIndex);
      setCurrentStation(nextStation.title);
      setBackgroundVideo(nextStation.url); // Устанавливаем видео
      setIsPlaying(true); // Включаем воспроизведение
    }
  };

  // Функция для переключения на предыдущую радиостанцию
  const handlePrevious = () => {
    if (savedUrls.length > 0 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevStation = savedUrls[prevIndex];
      setCurrentIndex(prevIndex);
      setCurrentStation(prevStation.title);
      setBackgroundVideo(prevStation.url); // Устанавливаем видео
      setIsPlaying(true); // Включаем воспроизведение
    }
  };

  // Функция для управления воспроизведением
  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState); // Переключаем состояние воспроизведения
  };

  // Функция для изменения громкости
  const handleVolumeChange = (value) => {
    setVolume(value); // Обновляем громкость
  };

  return (
    <>
      {/* Контейнер для текста и блока с кнопками */}
      <div className={styles.radioContainer}>
        <div className={styles.stationName}>{currentStation}</div>
        <UIBlock className={styles.block}>
          {/* Кнопка "Назад" */}
          <SquareButton
            icon={<FiSkipBack />}
            onClick={handlePrevious}
            className="button"
          />

          {/* Кнопка "Пауза/Воспроизведение" */}
          <SquareButton
            icon={isPlaying ? <FiPause /> : <FiPlay />}
            onClick={togglePlayPause}
            className="button"
          />

          {/* Кнопка "Вперед" */}
          <SquareButton
            icon={<FiSkipForward />}
            onClick={handleNext}
            className="button"
          />

          {/* Громкость */}
          <VolumeSlider
            value={volume} // Используем текущую громкость
            onChange={handleVolumeChange} // Передаём функцию для изменения громкости
            className={styles.volumeSlider}
          />

          {/* Кнопка "Радио" */}
          <SquareButton icon={<FiRadio />} onClick={openRadioStationsModal} />
        </UIBlock>
      </div>

      {/* Модальное окно RadioStationModal */}
      <RadioStationModal
        isOpen={isRadioStationsModalOpen}
        onClose={closeRadioStationsModal}
        onStationSelect={handleStationSelect}
        setSavedUrls={setSavedUrls} // Передаём функцию для обновления списка радиостанций
      />
    </>
  );
};

export default Radio;
