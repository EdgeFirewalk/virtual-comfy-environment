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
  const [isRadioStationsModalOpen, setIsRadioStationsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [savedUrls, setSavedUrls] = useState([]);

  const openRadioStationsModal = () => setIsRadioStationsModalOpen(true);
  const closeRadioStationsModal = () => setIsRadioStationsModalOpen(false);

  const handleStationSelect = (station) => {
    if (station) {
      const index = savedUrls.findIndex(url => url.id === station.id);
      setCurrentIndex(index);
      setCurrentStation(station.title);
      setBackgroundVideo(station.url);
      setIsPlaying(true);
    } else {
      setCurrentIndex(-1);
      setCurrentStation('Select a station');
      setBackgroundVideo(null);
      setIsPlaying(false);
    }
  };

  // Обновленная функция для следующей станции с зацикливанием
  const handleNext = () => {
    if (savedUrls.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % savedUrls.length;
    const nextStation = savedUrls[nextIndex];
    setCurrentIndex(nextIndex);
    setCurrentStation(nextStation.title);
    setBackgroundVideo(nextStation.url);
    setIsPlaying(true);
  };

  // Обновленная функция для предыдущей станции с зацикливанием
  const handlePrevious = () => {
    if (savedUrls.length === 0) return;
    
    const prevIndex = (currentIndex - 1 + savedUrls.length) % savedUrls.length;
    const prevStation = savedUrls[prevIndex];
    setCurrentIndex(prevIndex);
    setCurrentStation(prevStation.title);
    setBackgroundVideo(prevStation.url);
    setIsPlaying(true);
  };

  const togglePlayPause = () => setIsPlaying(prev => !prev);
  const handleVolumeChange = (value) => setVolume(value);

  return (
    <>
      <div className={styles.radioContainer}>
        <div className={styles.stationName}>{currentStation}</div>
        <UIBlock className={styles.block}>
          <SquareButton icon={<FiSkipBack />} onClick={handlePrevious} />
          <SquareButton icon={isPlaying ? <FiPause /> : <FiPlay />} onClick={togglePlayPause} />
          <SquareButton icon={<FiSkipForward />} onClick={handleNext} />
          <VolumeSlider value={volume} onChange={handleVolumeChange} className={styles.volumeSlider} />
          <SquareButton icon={<FiRadio />} onClick={openRadioStationsModal} />
        </UIBlock>
      </div>

      <RadioStationModal
        isOpen={isRadioStationsModalOpen}
        onClose={closeRadioStationsModal}
        onStationSelect={handleStationSelect}
        setSavedUrls={setSavedUrls}
      />
    </>
  );
};

export default Radio;