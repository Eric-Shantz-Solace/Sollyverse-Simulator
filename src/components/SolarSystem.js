import React, { useState, useEffect } from "react";
import Planet from "./Planet";
import "../styles/SolarSystem.css";

const planets = [
  // Planet data remains unchanged
  {
    name: "Mercury",
    orbitRadius: 100,
    size: 10,
    moons: [{ name: "Moon1" }],
    color: "#8C7E6A",
    orbitalPeriod: 1500,
  },
  {
    name: "Venus",
    orbitRadius: 150,
    size: 15,
    moons: [],
    color: "#E6C073",
    orbitalPeriod: 1700,
  },
  {
    name: "Earth",
    orbitRadius: 200,
    size: 16,
    moons: [{ name: "Moon1" }],
    color: "#6B93D6",
    orbitalPeriod: 2700,
  },
  {
    name: "Mars",
    orbitRadius: 250,
    size: 12,
    moons: [
      { name: "Moon1" },
      { name: "Moon2" },
    ],
    color: "#C1440E",
    orbitalPeriod: 3200,
  },
  {
    name: "Jupiter",
    orbitRadius: 350,
    size: 40,
    moons: [
      { name: "Moon1" },
      { name: "Moon2" },
      { name: "Moon3" },
      { name: "Moon4" },
    ],
    color: "#C9A889",
    orbitalPeriod: 3700,
  },
  {
    name: "Saturn",
    orbitRadius: 450,
    size: 35,
    moons: [
      { name: "Moon1" },
      { name: "Moon2" },
      { name: "Moon3" },
      { name: "Moon4" },
      { name: "Moon5" },
    ],
    color: "#E6C073",
    orbitalPeriod: 4200,
  },
  {
    name: "Uranus",
    orbitRadius: 550,
    size: 25,
    moons: [
      { name: "Moon1" },
      { name: "Moon2" },
      { name: "Moon3" },
    ],
    color: "#9DB4C0",
    orbitalPeriod: 5200,
  },
  {
    name: "Neptune",
    orbitRadius: 650,
    size: 24,
    moons: [
      { name: "Moon1" },
      { name: "Moon2" },
      { name: "Moon3" },
    ],
    color: "#3E54E8",
    orbitalPeriod: 5700,
  },
];

const SolarSystem = () => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true); // New state to control animation

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const maxOrbitRadius = Math.max(...planets.map((planet) => planet.orbitRadius));
    const factor = (viewportHeight * 0.9) / (maxOrbitRadius * 2);
    setScaleFactor(factor);
  }, []);

  const handlePlanetClick = (planetName) => {
    setIsAnimating((prev) => !prev); // Toggle animation state
    console.log(`Toggled animation for ${planetName}`);
  };

  return (
    <div className="solar-system">
      <div className="sun"></div>
      {planets.map((planet) => (
        <React.Fragment key={planet.name}>
          <div
            className="orbit"
            style={{
              width: planet.orbitRadius * 2 * scaleFactor,
              height: planet.orbitRadius * 2 * scaleFactor,
            }}
          ></div>
          <Planet
            {...planet}
            onClick={handlePlanetClick}
            scaleFactor={scaleFactor}
            isAnimating={isAnimating} // Pass animation state to Planet
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default SolarSystem;
