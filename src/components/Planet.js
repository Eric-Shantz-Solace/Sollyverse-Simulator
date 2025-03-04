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
  isAnimating, // New prop to control animation
}) => {
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2);
  const [moonAngles, setMoonAngles] = useState(moons.map(() => Math.random() * Math.PI * 2));
  const angleRef = useRef(angle);
  const moonAnglesRef = useRef(moonAngles);
  const requestRef = useRef(null);

  const planetSpeed = (2 * Math.PI) / orbitalPeriod;
  const moonSpeedMultiplier = 0.3;

  useEffect(() => {
    const animate = () => {
      if (isAnimating) {
        // Update planet angle
        angleRef.current += planetSpeed;
        setAngle(angleRef.current);

        // Update moon angles
        const updatedMoonAngles = moonAnglesRef.current.map((moonAngle) => {
          const moonSpeed = 0.1 * moonSpeedMultiplier;
          return moonAngle + moonSpeed;
        });

        setMoonAngles(updatedMoonAngles);
        moonAnglesRef.current = updatedMoonAngles;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [isAnimating, orbitalPeriod, planetSpeed]);

  const x = Math.cos(angle) * orbitRadius * scaleFactor;
  const y = Math.sin(angle) * orbitRadius * scaleFactor;

  return (
    <div
      className="planet"
      style={{
        width: size * scaleFactor,
        height: size * scaleFactor,
        backgroundColor: color,
        transform: `translate(calc(50vw + ${x}px - ${size / 2}px), calc(50vh + ${y}px - ${size / 2}px))`,
        position: "absolute",
        cursor: "pointer",
        zIndex: 10,
      }}
      onClick={() => onClick(name)}
    >
      <div className="planet-label">{name}</div>

      {moons.map((moon, index) => {
        const moonAngle = moonAngles[index];
        const moonX = Math.cos(moonAngle) * (size / 2 + 10);
        const moonY = Math.sin(moonAngle) * (size / 2 + 10);

        return (
          <div
            key={index}
            className="moon"
            style={{
              left: `calc(50% + ${moonX}px - 3px)`,
              top: `calc(50% + ${moonY}px - 3px)`,
              width: 6,
              height: 6,
              backgroundColor: "#ccc",
              borderRadius: "50%",
              position: "absolute",
            }}
          />
        );
      })}
    </div>
  );
};

export default Planet;
