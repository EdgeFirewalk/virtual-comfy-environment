import { useState, useEffect } from 'react';

import styles from './Sounds.module.css';

import { FiPlus } from 'react-icons/fi';

import UIBlock from '../../ui/UIBlock/UIBlock';
import Sound from '../Sound/Sound';
import SquareButton from '../../ui/SquareButton/SquareButton';

const Sounds = () => {
  const [isSoundsOpen, setIsSoundsOpen] = useState(false);

  const [sounds, setSounds] = useState([]);

  const deleteSound = (id) => {
    setSounds((prevSounds) => {
      const newSounds = prevSounds.filter((sound) => sound.id !== id);
      localStorage.setItem('savedSounds', JSON.stringify(newSounds));
      return newSounds;
    });
  };

  useEffect(() => {
    const savedSounds = JSON.parse(localStorage.getItem('savedSounds'));

    // Если звуков в localStorage не оказалось, то подгружать нечего
    if (!savedSounds) {
      return;
    }

    setSounds(savedSounds);
  }, []);

  return (
    <UIBlock
      className={styles.block}
      onMouseEnter={() => setIsSoundsOpen(true)}
      onMouseLeave={() => setIsSoundsOpen(false)}
    >
      <div className={styles.sounds}>
        {sounds.map((sound, index) => (
          <Sound
            key={index}
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
