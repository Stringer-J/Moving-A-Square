import { useEffect, useState, useCallback } from 'react';
import './SquareCom.css';
import pixelSquare from '../../assets/PixelSquare.png';
import pixelFlowers from '../../assets/PixelFlowers.png';
import pixelWhiteTulip from '../../assets/PixelWhiteTulip.png';

function SquareCom() {
    const [squareHPosition, setSquareHPosition] = useState(0);
    const [squareVPosition, setSquareVPosition] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [randomFlowers, setRandomFlowers] = useState([]);

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

    const generateRandomFlowers = (count) => {
        const flowers = [];
        const container = document.querySelector('.insideSquareBox');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const flowerImages = [
            { image: pixelFlowers, size: { width: 60, height: 60 } },
            { image: pixelWhiteTulip, size: { width: 35, height: 35 } },
        ];

        for (let i = 0; i < count; i++) {
            const randomX = Math.floor(Math.random() * (containerWidth - 20));
            const randomY = Math.floor(Math.random() * (containerHeight - 20));
            const randomFlower = flowerImages[Math.floor(Math.random() * flowerImages.length)];
            flowers.push({ id: i, x: randomX, y: randomY, image: randomFlower.image, size: randomFlower.size });
        }
        setRandomFlowers(flowers);
    };

    useEffect(() => {
        generateRandomFlowers(20);
    }, []);

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
                    {randomFlowers.map(flower => (
                        <img key={flower.id}
                             src={flower.image}
                             alt='Flower'
                             style={{
                                position: 'absolute',
                                left: `${flower.x}px`,
                                top: `${flower.y}px`,
                                width: `${flower.size.width}px`,
                                height: `${flower.size.height}px`
                             }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default SquareCom;