import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/landing.module.scss'


const MapImage = () => {


  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      return;
    }
    const deltaX = e.clientX - initialPosition.x;
    const deltaY = e.clientY - initialPosition.y;
    setPosition({ x: position.x + deltaX, y: position.y + deltaY });
    setInitialPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  return (
    <Image
      className={styles.mapImage}
      src={'/Images/Map1New.jpg'}
      layout="fill"
      alt={''}
      style={{ position: 'absolute', left: position.x, top: position.y }}
    //   style={{ zIndex: 111 }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default MapImage;
