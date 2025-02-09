import { useState, useRef, useEffect } from 'react';

import ReactPlayer from 'react-player/youtube';

import styles from './Sound.module.css';

import { FiTrash2 } from 'react-icons/fi';

import SquareButton from '../../ui/SquareButton/SquareButton';
import TextInput from '../../ui/InputFields/TextInput/TextInput';
import VolumeSlider from '../../ui/VolumeSlider/VolumeSlider';

const Sound = ({ isOpen, sound, deleteSound }) => {
  const [soundName, setSoundName] = useState(sound.name);
  const nameRef = useRef(null);

  const [soundURL, setSoundURL] = useState(sound.URL);
  const URLRef = useRef(null);

  const [canPlaySound, setCanPlaySound] = useState(false);
  const [isPlaying, setIsPlaying] = useState(sound.isPlaying);
  const [volume, setVolume] = useState(sound.volume);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    // Когда раздел со звуками закрывается, убираем фокус с полей ввода
    // Иначе пользователь может понажимать всякого на клавиатуре и ввести то, что не хотел
    if (!isOpen) {
      nameRef.current.blur();
      URLRef.current.blur();
    }
  }, [isOpen]);

  useEffect(() => {
    // Проверяем валидность ссылки на YouTube видос при любом изменении ссылки
    setCanPlaySound(ReactPlayer.canPlay(soundURL));
  }, [soundURL]);

  useEffect(() => {
    // Сохраняем в localStorage только полностью валидный звук
    if (!(soundName.length > 0 && canPlaySound)) {
      return;
    }

    const newSound = {
      id: sound.id,
      name: soundName,
      URL: soundURL,
      volume: parseFloat(volume),
      isPlaying: isPlaying,
    };

    const savedSounds = JSON.parse(localStorage.getItem('savedSounds'));

    // Если ранее не было сохранено звуков, то просто сохраняем данный
    if (!savedSounds) {
      localStorage.setItem('savedSounds', JSON.stringify([newSound]));
      return;
    }

    // Иначе удаляем звук с данным id (если он там есть, чтобы потом просто перезаписать его)
    const newSounds = savedSounds.filter((sound) => sound.id !== newSound.id);

    // Сохраняем все звуки + новый
    localStorage.setItem(
      'savedSounds',
      JSON.stringify([...newSounds, newSound]),
    );
  }, [soundName, soundURL, volume, isPlaying, canPlaySound]);

  return (
    <div className={styles.sound}>
      <div
        className={`${styles.settings}
        ${isOpen && styles.open}
        `}
      >
        <SquareButton
          icon={<FiTrash2 />}
          onClick={() => deleteSound(sound.id)}
        />
        <div className={styles.settingsBlock}>
          <div className={styles.settingsLine}>
            <p className={styles.settingPlaceholder}>Name:</p>
            <TextInput
              ref={nameRef}
              placeholder="Sound Name"
              value={soundName}
              onChange={(e) => setSoundName(e.target.value)}
              isValid={soundName.length > 0}
            />
          </div>
          <div className={styles.settingsLine}>
            <p className={styles.settingPlaceholder}>YT URL:</p>
            <TextInput
              ref={URLRef}
              placeholder="YouTube Link"
              value={soundURL}
              onChange={(e) => setSoundURL(e.target.value)}
              isValid={canPlaySound}
            />
          </div>
        </div>
        <VolumeSlider
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <SquareButton
        className={`${styles.button} ${isPlaying && styles.playing}`}
        text={soundName || '...'}
        onClick={togglePlayPause}
        disabled={!(soundName.length > 0 && canPlaySound)}
      />
      <ReactPlayer
        width={0}
        height={0}
        url={soundURL}
        playing={isPlaying}
        volume={volume}
        loop={true}
        onError={() => setCanPlaySound(false)}
      />
    </div>
  );
};

export default Sound;
