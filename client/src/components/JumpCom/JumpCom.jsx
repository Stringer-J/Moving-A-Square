import { useRef } from 'react';
import './JumpCom.css';
import { useMovement } from '../Movement/JumpMovement.js';
import pixelSquare from '../../assets/PixelSquare.png';

function JumpCom() {
    const containerRef = useRef(null);
    const { squareHPosition, squareVPosition } = useMovement(containerRef);

    return (
        <>
            <div className='jumpBox'>
            <button className='controlButton tiny5-regular'>CONTROLS</button>
                <div className='insideJumpBox'>
                    <div className='sky' ref={containerRef}>
                        <img id='jumpSquare'
                            src={pixelSquare}
                            alt='Pixel Square'
                            style={{ transform: `translate(${squareHPosition}px, ${squareVPosition}px)`,
                                  transition: 'transform 0.1s ease'}}
                        />
                    </div>
                    <div className='ground'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default JumpCom;