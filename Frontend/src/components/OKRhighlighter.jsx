import React, { useState } from "react";

const highlights = [
  {
    title: "Q1 Sales Growth",
    description: "Achieved 25% growth surpassing the target by 5%.",
    progress: 80,
  },
  {
    title: "Customer Satisfaction",
    description: "CSAT score reached 92%, highest in company history.",
    progress: 92,
  },
  {
    title: "New Product Launch",
    description: "Successfully launched version 2.0 ahead of schedule.",
    progress: 100,
  },
  {
    title: "Team Engagement",
    description: "Engagement increased by 15% with new initiatives.",
    progress: 75,
  },
];

const OKRHighlightsCarousel = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === highlights.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? highlights.length - 1 : current - 1);
  };

  return (
    <div className="okr-carousel">
      <button className="carousel-btn prev" onClick={prevSlide}>&#10094;</button>
      <div className="carousel-wrapper">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 300}px)` }}
        >
          {highlights.map((item, index) => (
            <div
              className="carousel-card"
              key={index}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <span className="progress-text">{item.progress}%</span>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-btn next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default OKRHighlightsCarousel;
