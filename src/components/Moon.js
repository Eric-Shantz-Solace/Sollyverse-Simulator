import React from 'react';
import '../styles/Moon.css';

const Moon = ({ distance, angle }) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <div
      className="moon"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    ></div>
  );
};

export default Moon;
