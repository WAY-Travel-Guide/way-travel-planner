/**
 * @fileoverview
 * Плиточка с каруселью картинок и информации (TileBackground) для home-page.
 * Позволяет листать слайды с фотографиями и названиями городов.
 * Добавляет анимацию и визуальные стрелки для навигации.
 *
 * @description
 * TileBackground — React-компонент, реализующий слайдер (carousel) с изображениями, подписями и описаниями.
 * Предназначен для визуального оформления страниц и привлечения внимания пользователя.
 * Слайды пролистываются стрелками, плавно анимируются при смене.
 * В верхней части есть быстрые ссылки: "Отзывы", "Контакты", "Помощь".
 * Реализована карулесь в формате "плиточки".
 * @module PictureSwapper
 */
/*
useState - хранение состояния (текущий слайд и прогресс)
useEffect - запуск побочных эффектов
useRef - хранение ссылки на интервал
*/
import React, { useState, useRef, useEffect } from "react";
import "./TileBackground.css";
import BackgroundImage from "../../../public/images/bg1.jpg";

/**
 * Slides - Список слайдов для карусели.
 * duration - Время на один слайд в миллисекундах (базово даем 5 секунд) 
 * @type 
 */
const TileBackground = ({ slides = [], duration = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!slides.length) return;

    setProgress(0);
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent >= 100) {
        clearInterval(intervalRef.current);
        nextSlide();
      }
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [current, slides, duration]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides.length) return <div className="story-carousel">Нет слайдов</div>;

  const { image, label, description } = slides[current];

  return (
    <div className="story-carousel">
      {/* Слайд */}
      <div
        className="story-background"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="story-overlay">
          <h2>{label}</h2>
          <p>{description}</p>
        </div>
      </div>

      {/* Прогресс-бары */}
      <div className="progress-bars">
        {slides.map((_, i) => (
          <div key={i} className="progress-bar">
            <div
              className={`progress-fill ${
                i < current ? "filled" : i === current ? "active" : ""
              }`}
              style={i === current ? { width: `${progress}%` } : {}}
            ></div>
          </div>
        ))}
      </div>

      {/* Кнопки */}
      <button className="nav left" onClick={prevSlide}>
        ‹
      </button>
      <button className="nav right" onClick={nextSlide}>
        ›
      </button>
    </div>
  );
};

export {TileBackground};