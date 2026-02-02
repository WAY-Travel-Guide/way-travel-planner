    import React from "react";
import "./Catterpillar.css";

import LeftArrow from '../picture-swapper/left.svg?react';
import RightArrow from '../picture-swapper/right.svg?react';


const CaterpillarSlider = ({ slides }) => {

  // Ограничиваем до 3 слайдов
  //const limitedSlides = slides.slice(0, 3);

  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Вычисляем индексы трех отображаемых слайдов
  const getSlide = (offset) => {
    const len = slides.length;
    return slides[(currentIndex+offset+len)%len];
  };

    const visibleSlides = [
      getSlide(-1),
      getSlide(0),
      getSlide(1)
    ];
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
      setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
    };
  

  return (
    <div className="container">
      
      <div className="home-arrows">
        <LeftArrow className="home-arrow" onClick={prevSlide}></LeftArrow>
        <RightArrow className="home-arrow" onClick={nextSlide}></RightArrow>
      </div>
      <div className="container-items">
        {visibleSlides.map((slide, i) => (
          <div
            key={slide.city} // уникальный ключ
            className={`item-color ${
              i === 0 ? "left" : i === 1 ? "center" : "right"
            }`}
          >
            <img src={slide.image} alt={slide.city} className="slide-image" />

            <div className="slide-text-overlay">
              <div className="slide-city">{slide.city}</div>
              <div className="slide-label">{slide.label}</div>
              <div className="slide-description">{slide.description}</div>
              <button className="see-more" >
                <span className="see-more-text"> Подробнее</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
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