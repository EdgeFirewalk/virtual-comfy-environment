import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import AppSizeWarning from './components/layout/AppSizeWarning/AppSizeWarning';
import Pomodoro from './components/layout/Pomodoro/Pomodoro';
import Sounds from './components/layout/Sounds/Sounds';
import Radio from './components/layout/Radio/Radio';
import ManualAndFullscreenButton from './components/layout/ManualAndFullscreenButton/ManualAndFullscreenButton';
import styles from './App.module.css'; // Импортируем стили

function App() {
  const [backgroundVideo, setBackgroundVideo] = useState(null); // Состояние для видео
  const [isPlaying, setIsPlaying] = useState(false); // Состояние для воспроизведения
  const [volume, setVolume] = useState(1); // Состояние для громкости

  return (
    <>
      {/* Фоновое видео и музыка */}
      <div className={styles.videoContainer}>
        {backgroundVideo && (
          <ReactPlayer
            className={styles.videoPlayer}
            url={backgroundVideo}
            playing={isPlaying} // Управляем воспроизведением
            loop={true} // Зацикливание
            muted={false} // Звук включён
            volume={volume} // Громкость
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  controls: 0, // Скрываем элементы управления YouTube
                  showinfo: 0, // Скрываем информацию о видео
                  rel: 0, // Отключаем связанные видео
                  modestbranding: 1, // Скрываем логотип YouTube
                },
              },
            }}
          />
        )}
      </div>

      {/* Полупрозрачный тёмный блок (теперь всегда отображается) */}
      <div className={styles.darkOverlay} />

      {/* Компоненты */}
      <AppSizeWarning />
      <Pomodoro />
      <Sounds />
      <Radio
        setBackgroundVideo={setBackgroundVideo} // Передаём функцию для обновления фона
        setIsPlaying={setIsPlaying} // Передаём функцию для управления воспроизведением
        setVolume={setVolume} // Передаём функцию для управления громкостью
        isPlaying={isPlaying} // Передаём состояние воспроизведения
        volume={volume} // Передаём текущую громкость
      />
      <ManualAndFullscreenButton />
    </>
  );
}

export default App;