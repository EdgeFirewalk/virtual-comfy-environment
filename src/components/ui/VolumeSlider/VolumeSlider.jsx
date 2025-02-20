import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './VolumeSlider.css';

const VolumeSlider = ({ ...props }) => {
  return <Slider min={0} max={1} step={0.01} vertical {...props} />;
};

export default VolumeSlider;
