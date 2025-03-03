import React, { useState, useEffect, useRef } from "react";
import "../styles/Planet.css";

const Planet = ({
  name,
  orbitRadius,
  size,
  moons,
  color,
  orbitalPeriod,
  onClick,
  scaleFactor,
}) => {
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2);
  const [moonAngles, setMoonAngles] = useState(moons.map(() => Math.random() * Math.PI * 2)); // Initial angles for moons
  const angleRef = useRef(angle); // To keep track of angle for smooth updates
  const moonAnglesRef = useRef(moonAngles); // To keep track of moon angles
  const requestRef = useRef(null); // To store the requestAnimationFrame ID

  // Speed factor for smoother orbiting of the planet
  const planetSpeed = (2 * Math.PI) / orbitalPeriod;

  // Global moon speed multiplier
  const moonSpeedMultiplier = 0.3; // Increase this value for faster moons

  useEffect(() => {
    const animate = () => {
      // Update the planet's angle for smooth movement
      angleRef.current += planetSpeed;
      setAngle(angleRef.current); // Update planet position

      // Update the moon's angles for smooth orbiting
      const updatedMoonAngles = moonAnglesRef.current.map((moonAngle, index) => {
        const moonSpeed = 0.1 * moonSpeedMultiplier; // Constant moon speed multiplier
        return moonAngle + moonSpeed; // Update the moon's angle
      });

      setMoonAngles(updatedMoonAngles); // Update moon angles
      moonAnglesRef.current = updatedMoonAngles; // Update reference to keep in sync

      requestRef.current = requestAnimationFrame(animate); // Request the next frame
    };

    requestRef.current = requestAnimationFrame(animate); // Start the animation loop

    return () => cancelAnimationFrame(requestRef.current); // Cleanup on component unmount
  }, [orbitalPeriod]);

  const x = Math.cos(angle) * orbitRadius * scaleFactor;
  const y = Math.sin(angle) * orbitRadius * scaleFactor;

  return (
    <div
      className="planet"
      style={{
        width: size * scaleFactor,
        height: size * scaleFactor,
        backgroundColor: color,
        transform: `translate(calc(50vw + ${x}px - ${
          size / 2
        }px), calc(50vh + ${y}px - ${size / 2}px))`,
        position: "absolute",
        cursor: "pointer",
        zIndex: 10,
      }}
      onClick={() => onClick(name)}
    >
      <div className="planet-label">{name}</div>

      {/* Render moons */}
      {moons.map((moon, index) => {
        const moonAngle = moonAngles[index]; // Get the moon's updated angle
        const moonX = Math.cos(moonAngle) * (size / 2 + 10); // Orbit moons around the planet
        const moonY = Math.sin(moonAngle) * (size / 2 + 10);

        return (
          <div
            key={index}
            className="moon"
            style={{
              left: `calc(50% + ${moonX}px - 3px)`, // Center moons around the planet
              top: `calc(50% + ${moonY}px - 3px)`, // Center moons around the planet
              width: 6, // Moon size
              height: 6,
              backgroundColor: "#ccc", // Moon color
              borderRadius: "50%", // Make moons round
              position: "absolute",
            }}
          />
        );
      })}
    </div>
  );
};

export default Planet;
