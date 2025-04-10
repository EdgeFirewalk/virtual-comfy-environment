import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import AppSizeWarning from './components/layout/AppSizeWarning/AppSizeWarning';
import Pomodoro from './components/layout/Pomodoro/Pomodoro';
import Sounds from './components/layout/Sounds/Sounds';
import Radio from './components/layout/Radio/Radio';
import ManualAndFullscreenButton from './components/layout/ManualAndFullscreenButton/ManualAndFullscreenButton';
import styles from './App.module.css';
import default_stations from './utils/consts/DEFAULT_STATIONS';

function App() {
  const [backgroundVideo, setBackgroundVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentStation, setCurrentStation] = useState(null);
  const [savedUrls, setSavedUrls] = useState([]);

  // Загрузка последней станции при монтировании
  useEffect(() => {
    const savedUrlsFromStorage = JSON.parse(localStorage.getItem('savedUrls')) || default_stations;
    setSavedUrls(savedUrlsFromStorage);
    
    const lastPlayed = JSON.parse(localStorage.getItem('lastPlayedStation'));
    if (lastPlayed && savedUrlsFromStorage.some(s => s.id === lastPlayed.id)) {
      setCurrentStation(lastPlayed);
      setBackgroundVideo(lastPlayed.url);
      setIsPlaying(false); // Ставим на паузу при загрузке
    }
  }, []);

  return (
    <>
      <div className={styles.videoContainer}>
        {backgroundVideo && (
          <ReactPlayer
            className={styles.videoPlayer}
            url={backgroundVideo}
            playing={isPlaying}
            loop={true}
            muted={false}
            volume={volume}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  controls: 0,
                  showinfo: 0,
                  rel: 0,
                  modestbranding: 1,
                },
              },
            }}
          />
        )}
      </div>

      <div className={styles.darkOverlay} />

      <AppSizeWarning />
      <Pomodoro />
      <Sounds />
      <Radio
        setBackgroundVideo={setBackgroundVideo}
        setIsPlaying={setIsPlaying}
        setVolume={setVolume}
        isPlaying={isPlaying}
        volume={volume}
        currentStation={currentStation}
        setCurrentStation={setCurrentStation}
        savedUrls={savedUrls}
        setSavedUrls={setSavedUrls}
      />
      <ManualAndFullscreenButton />
    </>
  );
}

export default App;