import { useState } from 'react'
import './App.css'
import pixelSquare from './assets/PixelSquare.png';
import pixelBook from './assets/PixelBook.png';

function App() {

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
            <button className='inactiveButtonInfo tiny5-regular'>
              INFO
              <img src={pixelBook} alt='Pixel Book' />
            </button>
            <button className='inactiveButtonSquare tiny5-regular'>
              SQUARE
              <img src={pixelSquare} alt='Pixel Square' />
            </button>
          </div>
          <div className='mainContent'>

          </div>
        </div>

      </div>
    </>
  )
}

export default App;
