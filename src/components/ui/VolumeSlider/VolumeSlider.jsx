import styles from './VolumeSlider.module.css';

const VolumeSlider = ({ ...props }) => {
  return (
    <input
      className={styles.slider}
      type="range"
      orient="vertical"
      min={0}
      max={1}
      step={0.01}
      {...props}
    />
  );
};

export default VolumeSlider;
