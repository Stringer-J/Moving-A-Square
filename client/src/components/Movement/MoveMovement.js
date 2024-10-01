import { useState, useEffect, useCallback } from "react";

export const useMovement = () => {
    const [squareHPosition, setSquareHPosition] = useState(0);
    const [squareVPosition, setSquareVPosition] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const moveSquare = (dx, dy) => {
        setSquareHPosition((prevPosition) => {
            const newPosition = prevPosition + dx;
            const squareWidth = 70;
            const containerWidth = window.innerWidth;

            return (newPosition + squareWidth <= containerWidth && newPosition >= 0) ? newPosition : prevPosition;
        });

        setSquareVPosition((prevPosition) => {
            const newPosition = prevPosition + dy;
            const squareHeight = 70;
            const containerHeight = window.innerHeight;

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

    return {
        squareHPosition,
        squareVPosition,
        moveSquare,
    };
};