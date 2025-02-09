import styles from './ManualAndFullscreenButton.module.css';

import { FiBookOpen } from 'react-icons/fi';
import { FiMaximize } from 'react-icons/fi';

import UIBlock from '../../ui/UIBlock/UIBlock';
import SquareButton from '../../ui/SquareButton/SquareButton';

const ManualAndFullscreenButton = () => {
  const toggleFullscreen = () => {
    const element = document.documentElement; // Берём весь документ

    if (document.fullscreenElement) {
      // Если уже в полноэкранном режиме, выйти из него
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      // Если не в полноэкранном режиме, перейти в него
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }
  };

  return (
    <UIBlock className={styles.block}>
      <SquareButton icon={<FiBookOpen />} />
      <SquareButton icon={<FiMaximize />} onClick={toggleFullscreen} />
    </UIBlock>
  );
};

export default ManualAndFullscreenButton;
