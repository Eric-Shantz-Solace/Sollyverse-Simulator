import React, { useState } from 'react';
import Planet from './Planet.js';
import '../styles/SolarSystem.css';

const planets = [
  { name: 'Mercury', orbitRadius: 100, size: 10, moons: 0, color: '#8C7E6A', orbitalPeriod: 88 },
  { name: 'Venus', orbitRadius: 150, size: 15, moons: 0, color: '#E6C073', orbitalPeriod: 225 },
  { name: 'Earth', orbitRadius: 200, size: 16, moons: 1, color: '#6B93D6', orbitalPeriod: 365 },
  { name: 'Mars', orbitRadius: 250, size: 12, moons: 2, color: '#C1440E', orbitalPeriod: 687 },
  { name: 'Jupiter', orbitRadius: 350, size: 40, moons: 4, color: '#C9A889', orbitalPeriod: 4333 },
  { name: 'Saturn', orbitRadius: 450, size: 35, moons: 5, color: '#E6C073', orbitalPeriod: 10759 },
  { name: 'Uranus', orbitRadius: 550, size: 25, moons: 3, color: '#9DB4C0', orbitalPeriod: 30687 },
  { name: 'Neptune', orbitRadius: 650, size: 24, moons: 3, color: '#3E54E8', orbitalPeriod: 60190 },
];

const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
  };

  const handleBackClick = () => {
    setSelectedPlanet(null);
  };

  return (
    <div className="solar-system">
      {!selectedPlanet && (
        <>
          <div className="sun"></div>
          {planets.map((planet) => (
            <React.Fragment key={planet.name}>
              <div 
                className="orbit" 
                style={{
                  width: planet.orbitRadius * 2,
                  height: planet.orbitRadius * 2,
                }}
              ></div>
              <Planet
                {...planet}
                onClick={() => handlePlanetClick(planet)}
              />
            </React.Fragment>
          ))}
        </>
      )}
      {selectedPlanet && (
        <div className="planet-view">
          <h2>{selectedPlanet.name}</h2>
          <button onClick={handleBackClick}>Back to Solar System</button>
          {/* Add detailed planet view components here */}
        </div>
      )}
    </div>
  );
};

export default SolarSystem;
