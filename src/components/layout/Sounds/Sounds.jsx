import styles from './Sounds.module.css';

import { FiPlus } from 'react-icons/fi';

import UIBlock from '../../ui/UIBlock/UIBlock';
import SquareButton from '../../ui/SquareButton/SquareButton';

const Sounds = () => {
  return (
    <UIBlock className={styles.block}>
      <SquareButton text="Wind" />
      <SquareButton text="Rain" />
      <SquareButton text="Thunder" />
      <SquareButton text="Raining storm" />
      <SquareButton icon={<FiPlus />} />
    </UIBlock>
  );
};

export default Sounds;
