// import Pomodoro
import Sounds from './components/layout/Sounds/Sounds';
// import Radio
import ManualAndFullscreenButton from './components/layout/ManualAndFullscreenButton/ManualAndFullscreenButton';
//import Button
import Button from './components/ui/Button/Button'; 
import Radio from './components/layout/Radio/Radio';

function App() {

  
  const handleClick = () => {
    console.log('Кнопка нажата!');
  };
  return (
    <>
    {/* Radio */}
    <Radio />
    
    {/* Button */}
    <div className="App">
      <Button onClick={handleClick}>Add Station</Button>
    </div>

      {/* Pomodoro */}
      <Sounds />
      {/* Radio */}
      <ManualAndFullscreenButton />
    </>
  );
}

export default App;
