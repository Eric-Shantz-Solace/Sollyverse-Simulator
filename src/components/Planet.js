import React, { useState, useEffect } from 'react';
import Moon from './Moon';
import '../styles/Planet.css';

const Planet = ({ name, orbitRadius, size, moons, color, orbitalPeriod }) => {
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2);

  useEffect(() => {
    const speed = (2 * Math.PI) / orbitalPeriod;
    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + speed) % (2 * Math.PI));
    }, 16);

    return () => clearInterval(interval);
  }, [orbitalPeriod]);

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="planet"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        transform: `translate(calc(50vw + ${x}px - ${size/2}px), calc(50vh + ${y}px - ${size/2}px))`,
      }}
    >
      <div className="planet-label">{name}</div>
      {[...Array(moons)].map((_, index) => (
        <Moon key={index} distance={size / 2 + 5} angle={(index * 2 * Math.PI) / moons} />
      ))}
    </div>
  );
};

export default Planet;
