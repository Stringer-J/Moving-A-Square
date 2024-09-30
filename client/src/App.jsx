import { useState } from 'react'
import './App.css'
import pixelSquare from './assets/PixelSquare.png';
import pixelBook from './assets/PixelBook.png';
import InfoCom from './components/InfoCom/InfoCom.jsx';
import SquareCom from './components/SquareCom/SquareCom.jsx';

function App() {
  const [selectedFromSideBar, setSelectedFromSideBar] = useState(null);

  const handleSideBarClick = (component) => {
    setSelectedFromSideBar(component);
  };

  const renderSideBarComponent = () => {
    switch (selectedFromSideBar) {
      case 'InfoCom':
        return <InfoCom />;
      case 'SquareCom':
        return <SquareCom />;
      default:
        return null;
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
            <button className='inactiveButtonInfo tiny5-regular'
                    onClick={() => handleSideBarClick('InfoCom')}>
              INFO
              <img src={pixelBook} alt='Pixel Book' />
            </button>
            <button className='inactiveButtonSquare tiny5-regular'
                    onClick={() => handleSideBarClick('SquareCom')}>
              SQUARE
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
