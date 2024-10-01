import { useState } from 'react'
import './App.css'
import pixelSquare from './assets/PixelSquare.png';
import pixelBook from './assets/PixelBook.png';
import StartCom from './components/StartCom/StartCom.jsx';
import InfoCom from './components/InfoCom/InfoCom.jsx';
import SquareCom from './components/SquareCom/SquareCom.jsx';

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
    }
  };

  const renderSideBarComponent = () => {
    switch (selectedFromSideBar) {
      case 'InfoCom':
        return <InfoCom />;
      case 'SquareCom':
        return <SquareCom />;
      default:
        return <StartCom />;
    }
  };

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
              <img src={pixelSquare} alt='Pixel Square' />
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
