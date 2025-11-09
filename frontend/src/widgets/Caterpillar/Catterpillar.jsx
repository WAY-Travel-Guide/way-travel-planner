import React from "react";
import "./Catterpillar.css";


const CaterpillarSlider = ({ slides }) => {
  return (
    <div className="container-items">
      {slides.map((slide, i) => (
        <button
          key={i}
          className="item-color"
          onClick={() => slide.onClick?.(slide)}
        >
          {/* Изображение */}
          <img
            src={slide.image}
            alt={slide.city}
            className="slide-image"
          />

          {/* Overlay с текстом поверх */}
          <div className="slide-text-overlay">
            {/* Название города */}
            <div className="slide-city">{slide.city}</div>

            {/* Подпись / описание */}
            <div className="slide-label">{slide.label}</div>
            <div className="slide-description">{slide.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export { CaterpillarSlider };
/*
{
          {/* Изображение }
          <img
            src={slide.image}
            alt={slide.city}
            className="slide-image"
          />

          {/*Название города }
          <div className="slide-city">{slide.city}</div>

          {/* Подпись / описание }
          <div className="slide-label">{slide.label}</div>
          <div className="slide-description">{slide.description}</div>
        }


*/