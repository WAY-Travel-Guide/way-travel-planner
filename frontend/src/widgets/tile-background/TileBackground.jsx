/**
 * @fileoverview
 * Компонент TileBackground — это интерактивная карусель (слайдер) с фоновыми изображениями.
 * Каждый слайд содержит картинку, название и описание.
 * Реализована анимация автопрокрутки и визуальные индикаторы прогресса.
 * Пользователь может переключать слайды стрелками вручную.
 */

import React, { useState, useRef, useEffect } from "react";
import "./TileBackground.css";
import BackgroundImage from "../../../public/images/bg1.jpg"; // Пример фона (можно не использовать)

/**
 * Компонент TileBackground
 * 
 * @param {Array} slides - Массив объектов со слайдами. Каждый объект должен содержать:
 *   { image: "url", label: "Название", description: "Описание" }
 * @param {number} duration - Время показа одного слайда (в миллисекундах), по умолчанию 5000 мс = 5 секунд.
 */
const TileBackground = ({ slides = [], duration = 7000 }) => {
  /**
   * current — индекс текущего слайда, который сейчас отображается.
   * progress — процент заполнения текущей полоски прогресса (0–100).
   */
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  /**
   * intervalRef — ссылка (ref) на активный таймер (setInterval).
   * Через ref мы можем очистить его при размонтировании или смене слайда.
   */
  const intervalRef = useRef(null);

  /*
   * useEffect срабатывает при каждом изменении `current`, `slides` или `duration`.
   * Он запускает новый интервал, который обновляет прогресс текущего слайда.
   */
  useEffect(() => {
    // Если слайдов нет, ничего не делаем
    if (!slides.length) return;

    // Сброс прогресса при смене слайда
    setProgress(0);

    // Фиксируем момент начала текущего слайда
    const startTime = Date.now();

    // Создаём интервал, который будет каждые 100 мс обновлять прогресс
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime; // сколько времени прошло
      const percent = Math.min((elapsed / duration) * 100, 100); // вычисляем процент заполнения
      setProgress(percent);

      // Когда процент достиг 100 — переходим на следующий слайд
      if (percent >= 100) {
        clearInterval(intervalRef.current); // очищаем текущий таймер
        nextSlide(); // вызываем функцию перехода
      }
    }, 100); // обновляем каждые 0.1 секунды для плавности

    // Возвращаем "чистильщик" — очистку таймера при размонтировании или смене слайда
    return () => clearInterval(intervalRef.current);
  }, [current, slides, duration]); // зависим от текущего слайда и длительности

  /**
   * Переход на следующий слайд.
   * Используется остаток от деления (%) — чтобы при достижении конца массива возвращаться к началу.
   */
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  /**
   * Переход на предыдущий слайд.
   * (prev - 1 + slides.length) гарантирует, что индекс не станет отрицательным.
   */
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Если слайдов нет — показываем заглушку
  if (!slides.length) return <div className="homestory-carousel">Нет слайдов</div>;

  // Деструктурируем текущий слайд
  const { image, label, description } = slides[current];

  return (
    <div className="homestory-carousel">
      {/* ======= Основной слайд ======= */}
      <div
        className="homestory-background"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="homestory-overlay">
          <h2>{label}</h2>
          <p>{description}</p>
        </div>
      </div>

      {/* ======= Прогресс-бары ======= */}
          <div className="homeprogress-bars">
      {slides.map((_, i) => (
        <div
          key={i}
          className="homeprogress-bar"
          onClick={() => setCurrent(i)} //  добавили кликабельность
          style={{ cursor: "pointer" }} //  чтобы видно было, что элемент кликабельный
        >
          <div
            className={`homeprogress-fill ${
              i < current
                ? "filled"
                : i === current
                ? "active"
                : ""
            }`}
            style={i === current ? { width: `${progress}%` } : {}}
          ></div>
        </div>
      ))}
    </div>
    </div>
  );
};

// Экспорт компонента
export { TileBackground };



/* 
{/* ======= Кнопки навигации ======= 
      <button className="nav left" onClick={prevSlide}>
        ‹ {/* Левая стрелка }
      </button>
      <button className="nav right" onClick={nextSlide}>
        › {/* Правая стрелка }
      </button>


}*/
