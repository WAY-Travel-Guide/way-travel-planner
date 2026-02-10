import "./TileBackground.css";
import { HomeWidget } from "../home-widget/HomeWidget";

const TileBackground = ({ slides = [], duration = 7000 }) => {

  // Если слайдов нет — показываем заглушку
  if (!slides.length) return <div className="homestory-carousel">Нет слайдов</div>;

  return (
    <div
      id="homeCarousel"
      className="carousel slide homestory-carousel"
      data-bs-ride="carousel"
      data-bs-interval={duration}
      pause="false"
    >
      {/* Индикаторы слайда */}
      <div className="carousel-indicators">
      {slides.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide-to={index}
          className={`flex-fill progress-bar-style ${index === 0 ? "active" : ""}`}
          aria-current={index}
          aria-label={`Слайд ${index + 1}`}
        />
      ))}
    </div>

    {/* Слайды */}
    <div className="carousel-inner">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
          data-bs-interval={duration}
        >
          <img
            src={slide.image}
            className="d-block w-100"
            alt={slide.city || slide.label}
          />
          <div className="carousel-caption homestory-overlay">
            <h1>{slide.city}</h1>
            <h5>{slide.label}</h5>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

// Экспорт компонента
export { TileBackground };
