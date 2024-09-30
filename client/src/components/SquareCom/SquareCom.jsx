import { useEffect, useState, useCallback } from 'react';
import './SquareCom.css';
import pixelSquare from '../../assets/PixelSquare.png';

function SquareCom() {
    const [squareHPosition, setSquareHPosition] = useState(0);
    const [squareVPosition, setSquareVPosition] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const moveSquare = (dx, dy) => {
        setSquareHPosition((prevPosition) => {
            const newPosition = prevPosition + dx;
            const squareWidth = document.getElementById('moveSquare').offsetWidth;
            const containerWidth = document.querySelector('.insideSquareBox').offsetWidth;

            return (newPosition + squareWidth <= containerWidth && newPosition >= 0) ? newPosition : prevPosition;
        });

        setSquareVPosition((prevPosition) => {
            const newPosition = prevPosition + dy;
            const squareHeight = document.getElementById('moveSquare').offsetHeight;
            const containerHeight = document.querySelector('.insideSquareBox').offsetHeight;

            return (newPosition + squareHeight <= containerHeight && newPosition >= 0) ? newPosition : prevPosition;
        });
    };

    const handleKeyDown = useCallback((e) => {
        if (intervalId) return;

        let dx = 0;
        let dy = 0;

        switch (e.key) {
            case 'ArrowRight':
                dx = 10;
                break;
            case 'ArrowLeft':
                dx = -10;
                break;
            case 'ArrowUp':
                dy = -10;
                break;
            case 'ArrowDown':
                dy = 10;
                break;
            default:
                return;
        }

        const id = setInterval(() => moveSquare(dx, dy), 25);
        setIntervalId(id);
    }, [intervalId]);

    const handleKeyUp = useCallback(() => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [intervalId]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [handleKeyDown, handleKeyUp, intervalId]);

    return (
        <>
            <div className='squareBox'>
                <div className='insideSquareBox'>
                    <img id='moveSquare'
                         src={pixelSquare}
                         alt='Pixel Square'
                         style={{ transform: `translate(${squareHPosition}px, ${squareVPosition}px)`,
                                  transition: 'transform 0.1s ease'}} />
                </div>
            </div>
        </>
    )
}

export default SquareCom;