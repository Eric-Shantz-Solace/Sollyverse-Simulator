import React, { useState, useEffect } from "react";
import Planet from "./Planet";
import "../styles/SolarSystem.css";

const planets = [
  {
    name: "Mercury",
    orbitRadius: 100,
    size: 10,
    moons: 0,
    color: "#8C7E6A",
    orbitalPeriod: 88,
  },
  {
    name: "Venus",
    orbitRadius: 150,
    size: 15,
    moons: 0,
    color: "#E6C073",
    orbitalPeriod: 225,
  },
  {
    name: "Earth",
    orbitRadius: 200,
    size: 16,
    moons: 1,
    color: "#6B93D6",
    orbitalPeriod: 365,
  },
  {
    name: "Mars",
    orbitRadius: 250,
    size: 12,
    moons: 2,
    color: "#C1440E",
    orbitalPeriod: 687,
  },
  {
    name: "Jupiter",
    orbitRadius: 350,
    size: 40,
    moons: 4,
    color: "#C9A889",
    orbitalPeriod: 4333,
  },
  {
    name: "Saturn",
    orbitRadius: 450,
    size: 35,
    moons: 5,
    color: "#E6C073",
    orbitalPeriod: 10759,
  },
  {
    name: "Uranus",
    orbitRadius: 550,
    size: 25,
    moons: 3,
    color: "#9DB4C0",
    orbitalPeriod: 30687,
  },
  {
    name: "Neptune",
    orbitRadius: 650,
    size: 24,
    moons: 3,
    color: "#3E54E8",
    orbitalPeriod: 60190,
  },
];

const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    // Dynamically calculate the scale factor based on viewport height
    const viewportHeight = window.innerHeight;
    const maxOrbitRadius = Math.max(
      ...planets.map((planet) => planet.orbitRadius)
    );

    // Scale to fit within 80% of the screen height (to avoid top and bottom overflow)
    const factor = (viewportHeight * 0.9) / (maxOrbitRadius * 2); // Adjusting this factor to make everything fit better
    setScaleFactor(factor);
  }, []);

  // Handle when a planet is clicked
  const handlePlanetClick = (planetName) => {
    const planet = planets.find((p) => p.name === planetName);
    setSelectedPlanet(planet);
    console.log(`Clicked on ${planetName}`);
  };

  // Handle going back to the solar system view
  const handleBackClick = () => {
    setSelectedPlanet(null);
    console.log("Back to Solar System");
  };

  return (
    <div className="solar-system">
      {/* If no planet is selected */}
      {!selectedPlanet && (
        <>
          <div className="sun"></div>
          {planets.map((planet) => (
            <React.Fragment key={planet.name}>
              {/* Orbit */}
              <div
                className="orbit"
                style={{
                  width: planet.orbitRadius * 2 * scaleFactor,
                  height: planet.orbitRadius * 2 * scaleFactor,
                }}
              ></div>

              {/* Planet */}
              <Planet
                {...planet}
                onClick={handlePlanetClick} // Pass the click handler
                scaleFactor={scaleFactor}
              />
            </React.Fragment>
          ))}
        </>
      )}

      {/* If a planet is selected */}
      {selectedPlanet && (
        <div className="planet-view">
          <h2>{selectedPlanet.name}</h2>
          <p>Orbit Radius: {selectedPlanet.orbitRadius} px</p>
          <p>Size (Diameter): {selectedPlanet.size} px</p>
          <p>Moons Count: {selectedPlanet.moons}</p>
          <p>Orbital Period (days): {selectedPlanet.orbitalPeriod}</p>
          <button onClick={handleBackClick}>Back to Solar System</button>
        </div>
      )}
    </div>
  );
};

export default SolarSystem;
