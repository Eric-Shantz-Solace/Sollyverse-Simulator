import React from 'react';
import '../styles/Continent.css';

const Continent = ({ name, shape, position, onClick }) => {
  return (
    <div
      className="continent"
      style={{
        clipPath: shape,
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      onClick={() => onClick(name)}
    >
      <span className="continent-label">{name}</span>
    </div>
  );
};

export default Continent;
