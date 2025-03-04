import React, { useState, useEffect } from "react";
import Planet from "./Planet";
import "../styles/SolarSystem.css";

const planets = [
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
    moons: [{ name: "Moon1" }, { name: "Moon2" }],
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
    moons: [{ name: "Moon1" }, { name: "Moon2" }, { name: "Moon3" }],
    color: "#9DB4C0",
    orbitalPeriod: 5200,
  },
  {
    name: "Neptune",
    orbitRadius: 650,
    size: 24,
    moons: [{ name: "Moon1" }, { name: "Moon2" }, { name: "Moon3" }],
    color: "#3E54E8",
    orbitalPeriod: 5700,
  },
];

const SolarSystem = () => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [zoomedPlanet, setZoomedPlanet] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomComplete, setIsZoomComplete] = useState(false);

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const maxOrbitRadius = Math.max(
      ...planets.map((planet) => planet.orbitRadius)
    );
    const factor = (viewportHeight * 0.9) / (maxOrbitRadius * 2);
    setScaleFactor(factor);
  }, []);

  useEffect(() => {
    if (zoomLevel > 1) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [zoomLevel]);

  const handlePlanetClick = (planetName, x, y) => {
    const selectedPlanet = planets.find((p) => p.name === planetName);
    setIsAnimating(false);
    setZoomedPlanet(selectedPlanet);
    setZoomPosition({ x, y });

    // Start zoom animation
    setZoomLevel(7);

    // Set zoom complete after animation
    setTimeout(() => {
      setIsZoomComplete(true);
    }, 1000); // This should match the transition duration in CSS
  };

  const handleBackClick = () => {
    setZoomLevel(1);
    setIsZoomComplete(false);

    // Wait for zoom out animation to complete before resetting state
    setTimeout(() => {
      setIsAnimating(true);
      setZoomedPlanet(null);
    }, 1000); // This should match the transition duration in CSS
  };

  return (
    <div
      className="solar-system"
      style={{
        transform: `scale(${zoomLevel})`,
        transition: "transform 1s ease-in-out",
        transformOrigin: zoomedPlanet
          ? `${zoomPosition.x}px ${zoomPosition.y}px`
          : "center center",
        overflow: zoomLevel > 1 ? "hidden" : "visible",
      }}
    >
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
            isAnimating={isAnimating}
            isZoomed={zoomedPlanet?.name === planet.name}
          />
        </React.Fragment>
      ))}

      {isZoomComplete && (
        <div className="back-button-container">
          <button onClick={handleBackClick} className="back-button">
            Back to Solar System
          </button>
        </div>
      )}
    </div>
  );
};

export default SolarSystem;
