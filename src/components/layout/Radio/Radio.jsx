import React, { useState, useEffect } from 'react';
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
  currentStation,
  setCurrentStation,
  savedUrls,
  setSavedUrls,
}) => {
  const [isRadioStationsModalOpen, setIsRadioStationsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Загрузка сохраненной громкости при монтировании
  useEffect(() => {
    const savedVolume = localStorage.getItem('radioVolume');
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
  }, [setVolume]);

  // Сохранение громкости при изменении
  useEffect(() => {
    localStorage.setItem('radioVolume', volume.toString());
  }, [volume]);

  const openRadioStationsModal = () => setIsRadioStationsModalOpen(true);
  const closeRadioStationsModal = () => setIsRadioStationsModalOpen(false);

  // Находим индекс текущей станции
  useEffect(() => {
    if (currentStation) {
      const index = savedUrls.findIndex(url => url.id === currentStation.id);
      setCurrentIndex(index);
    }
  }, [currentStation, savedUrls]);

  const handleStationSelect = (station) => {
    if (station) {
      setCurrentStation(station);
      setBackgroundVideo(station.url);
      setIsPlaying(true);
      localStorage.setItem('lastPlayedStation', JSON.stringify(station));
    } else {
      setCurrentStation(null);
      setBackgroundVideo(null);
      setIsPlaying(false);
      localStorage.removeItem('lastPlayedStation');
    }
  };

  const handleNext = () => {
    if (savedUrls.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % savedUrls.length;
    const nextStation = savedUrls[nextIndex];
    setCurrentIndex(nextIndex);
    setCurrentStation(nextStation);
    setBackgroundVideo(nextStation.url);
    setIsPlaying(true);
    localStorage.setItem('lastPlayedStation', JSON.stringify(nextStation));
  };

  const handlePrevious = () => {
    if (savedUrls.length === 0) return;
    
    const prevIndex = (currentIndex - 1 + savedUrls.length) % savedUrls.length;
    const prevStation = savedUrls[prevIndex];
    setCurrentIndex(prevIndex);
    setCurrentStation(prevStation);
    setBackgroundVideo(prevStation.url);
    setIsPlaying(true);
    localStorage.setItem('lastPlayedStation', JSON.stringify(prevStation));
  };

  const togglePlayPause = () => setIsPlaying(prev => !prev);
  
  const handleVolumeChange = (value) => {
    setVolume(value);
    // Не нужно сохранять здесь, т.к. это делается в useEffect
  };

  return (
    <>
      <div className={styles.radioContainer}>
        <div className={styles.stationName}>
          {currentStation ? currentStation.title : 'Select a station'}
        </div>
        <UIBlock className={styles.block}>
          <SquareButton icon={<FiSkipBack />} onClick={handlePrevious} />
          <SquareButton icon={isPlaying ? <FiPause /> : <FiPlay />} onClick={togglePlayPause} />
          <SquareButton icon={<FiSkipForward />} onClick={handleNext} />
          <VolumeSlider 
            value={volume} 
            onChange={handleVolumeChange} 
            className={styles.volumeSlider} 
          />
          <SquareButton icon={<FiRadio />} onClick={openRadioStationsModal} />
        </UIBlock>
      </div>

      <RadioStationModal
        isOpen={isRadioStationsModalOpen}
        onClose={closeRadioStationsModal}
        onStationSelect={handleStationSelect}
        setSavedUrls={setSavedUrls}
        currentPlayingStation={currentStation}
        isPlaying={isPlaying}
      />
    </>
  );
};

export default Radio;