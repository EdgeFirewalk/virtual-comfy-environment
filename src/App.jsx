import Pomodoro from './components/layout/Pomodoro/Pomodoro';
import Sounds from './components/layout/Sounds/Sounds';
// import Radio
import ManualAndFullscreenButton from './components/layout/ManualAndFullscreenButton/ManualAndFullscreenButton';

function App() {
  return (
    <>
      <Pomodoro />
      <Sounds />
      {/* Radio */}
      <ManualAndFullscreenButton />
    </>
  );
}

export default App;
