import { useState, useEffect } from 'react';

import DEFAULT_SOUNDS from '../../../utils/consts/DEFAULT_SOUNDS';

import styles from './Sounds.module.css';

import { FiPlus } from 'react-icons/fi';

import UIBlock from '../../ui/UIBlock/UIBlock';
import Sound from '../Sound/Sound';
import SquareButton from '../../ui/SquareButton/SquareButton';

const Sounds = () => {
  const [isSoundsOpen, setIsSoundsOpen] = useState(false);

  const [sounds, setSounds] = useState([]);

  const deleteSound = (id) => {
    const newSounds = sounds.filter((sound) => sound.id !== id);
    setSounds(newSounds);
    localStorage.setItem('savedSounds', JSON.stringify(newSounds));
  };

  useEffect(() => {
    const openedAppOnce = JSON.parse(localStorage.getItem('openedAppOnce'));

    // Если ни разу не был в приложении
    if (!openedAppOnce) {
      localStorage.setItem('savedSounds', JSON.stringify(DEFAULT_SOUNDS));
      localStorage.setItem('openedAppOnce', 'true');
    }

    const savedSounds = JSON.parse(localStorage.getItem('savedSounds'));

    // Если звуков в localStorage не оказалось, то подгружать нечего
    if (!savedSounds) {
      return;
    }

    // Сортируем фактически по порядку (времени) добавления звука
    savedSounds.sort((sound1, sound2) => sound1.id - sound2.id);

    setSounds(savedSounds);
  }, []);

  return (
    <UIBlock
      className={styles.block}
      onMouseEnter={() => setIsSoundsOpen(true)}
      onMouseLeave={() => setIsSoundsOpen(false)}
    >
      <div className={styles.sounds}>
        {sounds.map((sound) => (
          <Sound
            key={sound.id}
            isOpen={isSoundsOpen}
            sound={sound}
            deleteSound={deleteSound}
          />
        ))}
      </div>
      <SquareButton
        icon={<FiPlus />}
        onClick={() => {
          setSounds([
            ...sounds,
            {
              id: Date.now(),
              name: '',
              URL: '',
              volume: 1,
              isPlaying: false,
            },
          ]);
        }}
      />
    </UIBlock>
  );
};

export default Sounds;
