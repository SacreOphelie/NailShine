"use client"; // Indispensable pour utiliser les événements de souris et les Hooks

import { useRef, useState } from "react";

export default function SliderTechniques({ techniques }) {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    if (!sliderRef.current) return;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      className={`slider ${isDown ? "active" : ""}`}
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      >
      {techniques?.map((technique) => (
        <div
          className="card"
          key={technique.id}
          style={{ backgroundImage: `url(${technique.image_url})` }}
        >
          <div className="technique">
            <h4>{technique.nom}</h4>
            <p>{technique.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}