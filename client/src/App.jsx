import { useEffect, useState } from 'react'
import './App.css'
import pixelSquare from './assets/PixelSquare.png';
import pixelBook from './assets/PixelBook.png';
import pixelShoe from './assets/PixelShoe.png';
import pixelUpArrow from './assets/PixelUpArrow.png';
import StartCom from './components/StartCom/StartCom.jsx';
import InfoCom from './components/InfoCom/InfoCom.jsx';
import SquareCom from './components/SquareCom/SquareCom.jsx';
import JumpCom from './components/JumpCom/JumpCom.jsx';

function App() {
  const [selectedFromSideBar, setSelectedFromSideBar] = useState(null);

  const handleSideBarClick = (component) => {
    setSelectedFromSideBar(component);
  };

  const getButtonClass = (componentName) => {
    switch (componentName) {
      case 'InfoCom':
        return selectedFromSideBar === 'InfoCom' ? 'activeButtonInfo' : 'inactiveButtonInfo';
      case 'SquareCom':
        return selectedFromSideBar === 'SquareCom' ? 'activeButtonSquare' : 'inactiveButtonSquare';
      case 'JumpCom':
        return selectedFromSideBar === 'JumpCom' ? 'activeButtonJump' : 'inactiveButtonJump';
    }
  };

  const renderSideBarComponent = () => {
    switch (selectedFromSideBar) {
      case 'InfoCom':
        return <InfoCom />;
      case 'SquareCom':
        return <SquareCom />;
      case 'JumpCom':
        return <JumpCom />;
      default:
        return <StartCom />;
    }
  };

  useEffect(() => {
    const pressedClasses = ['inactiveButtonInfo',
                            'inactiveButtonInfo:hover',
                            'activeButtonInfo',
                            'inactiveButtonSquare',
                            'inactiveButtonSquare:hover',
                            'activeButtonSquare',
                            'inactiveButtonJump',
                            'inactiveButtonJump:hover',
                            'activeButtonJump',
                            'controlButton',
                            'controlButton:hover'];

    const handleMouseDown = (e) => {
      document.body.classList.add('pressed');
      const target = e.target;
      if (pressedClasses.some(className => target.classList.contains(className))) {
        target.classList.add('pressed');
      }
    };

    const handleMouseUp = (e) => {
      document.body.classList.remove('pressed');
      const target = e.target;
      if (pressedClasses.some(className => target.classList.contains(className))) {
        target.classList.remove('pressed');
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div className='appBox'>
        <div className='appBoxHeader'>
          <img src={pixelSquare} alt='Pixel Square' />
          <h1 className='tiny5-regular'>MOVING-A-SQUARE</h1>
          <img src={pixelSquare} alt='Pixel Square' />
        </div>
        <div className='appBoxBody'>
          <div className='sideBar'>
            <button className={`${getButtonClass('InfoCom')} tiny5-regular`}
                    onClick={() => handleSideBarClick('InfoCom')}>
              INFO
              <img src={pixelBook} alt='Pixel Book' />
            </button>
            <button className={`${getButtonClass('SquareCom')} tiny5-regular`}
                    onClick={() => handleSideBarClick('SquareCom')}>
              MOVE
              <img src={pixelShoe} alt='Pixel Shoe' />
            </button>
            <button className={`${getButtonClass('JumpCom')} tiny5-regular`}
                    onClick={() => handleSideBarClick('JumpCom')}>
              JUMP
              <img src={pixelUpArrow} alt='Pixel Up Arrow' />
            </button>
          </div>
          <div className='mainContent'>
            {renderSideBarComponent()}
          </div>
        </div>

      </div>
    </>
  )
}

export default App;
