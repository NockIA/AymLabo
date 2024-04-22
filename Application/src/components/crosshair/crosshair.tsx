// Crosshair.tsx
import React, { useEffect, useState } from 'react';
import './crosshair.css';

const Crosshair: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return (
    <div
      className="crosshair"
      style={{ left: position.x, top: position.y }}
    >
      <div className="horizontal"></div>
      <div className="vertical"></div>
    </div>
  );
};

export default Crosshair;
