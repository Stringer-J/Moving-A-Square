import { useEffect, useState, useCallback } from 'react';
import './SquareCom.css';
import pixelSquare from '../../assets/PixelSquare.png';

function SquareCom() {
    const [squarePosition, setSquarePosition] = useState(0);

    const handleKeyPress = useCallback((e) => {
        const squareImg = document.getElementById('moveSquare');
        const squareContainer = document.querySelector('.insideSquareBox');

        if (e.key === 'ArrowRight') {
            const squareImgWidth = squareImg.offsetWidth;
            const squareContainerWidth = squareContainer.offsetWidth;

            if (squarePosition + squareImgWidth + 10 <= squareContainerWidth) {
                setSquarePosition((prevPosition) => prevPosition + 10)
            } 
        }
    }, [squarePosition]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <>
            <div className='squareBox'>
                <div className='insideSquareBox'>
                    <img id='moveSquare'
                         src={pixelSquare}
                         alt='Pixel Square'
                         style={{ transform: `translateX(${squarePosition}px)`,
                                  transition: 'transform 0.1s ease' }} />
                </div>
            </div>
        </>
    )
}

export default SquareCom;