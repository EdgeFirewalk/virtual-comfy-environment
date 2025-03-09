import AppSizeWarning from './components/layout/AppSizeWarning/AppSizeWarning';
// import Pomodoro
import Sounds from './components/layout/Sounds/Sounds';
import Radio from './components/layout/Radio/Radio';
import ManualAndFullscreenButton from './components/layout/ManualAndFullscreenButton/ManualAndFullscreenButton';

function App() {
  return (
    <>
      <AppSizeWarning />
      {/* Pomodoro */}
      <Sounds />
      <Radio />
      <ManualAndFullscreenButton />
    </>
  );
}

export default App;
