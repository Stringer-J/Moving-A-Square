import { useEffect, useState, useRef } from 'react';
import { useMovement } from '../Movement/MoveMovement.js';
import './SquareCom.css';
import pixelSquare from '../../assets/PixelSquare.png';
import pixelFlowers from '../../assets/PixelFlowers.png';
import pixelWhiteTulip from '../../assets/PixelWhiteTulip.png';
import pixelGrassTuft from '../../assets/PixelGrassTuft.png';

function SquareCom() {
    const containerRef = useRef(null);
    const { squareHPosition, squareVPosition } = useMovement(containerRef);
    const [randomFlowers, setRandomFlowers] = useState([]);
    const [randomGrass, setRandomGrass] = useState([]);

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

    const generateRandomGrass = (count) => {
        const grass = [];
        const container = document.querySelector('.insideSquareBox');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        for (let i = 0; i < count; i++) {
            const randomX = Math.floor(Math.random() * (containerWidth - 20));
            const randomY = Math.floor(Math.random() * (containerHeight - 20));
            grass.push({ id: i, x: randomX, y: randomY, image: randomGrass });
        }
        setRandomGrass(grass);
    };

    useEffect(() => {
        generateRandomFlowers(20);
        generateRandomGrass(70);
    }, []);

    return (
        <>
            <div className='squareBox'>
                <button className='controlButton tiny5-regular'>CONTROLS</button>
                <div className='insideSquareBox' ref={containerRef}>
                    <img id='moveSquare'
                         src={pixelSquare}
                         alt='Pixel Square'
                         style={{ transform: `translate(${squareHPosition}px, ${squareVPosition}px)`,
                                  transition: 'transform 0.1s ease'}} 
                    />
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
                    {randomGrass.map(grass => (
                        <img key={grass.id}
                             src={pixelGrassTuft}
                             alt='Grass Tuft'
                             style={{
                                position: 'absolute',
                                left: `${grass.x}px`,
                                top: `${grass.y}px`,
                                width: '20px',
                                height: '20px'
                             }}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default SquareCom;