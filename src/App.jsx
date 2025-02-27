// import Pomodoro
import Sounds from './components/layout/Sounds/Sounds';

import Radio from './components/layout/Radio/Radio';

import ManualAndFullscreenButton from './components/layout/ManualAndFullscreenButton/ManualAndFullscreenButton';

function App() {

  return (
    <>
      {/* Pomodoro */}
      <Sounds />
      <Radio />
      <ManualAndFullscreenButton />
    </>
  );
}

export default App;
