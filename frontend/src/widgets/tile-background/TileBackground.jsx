import React from "react";
import { HomeWidget } from "../home-widget/HomeWidget";

const TileBackground = ({ slides = [], duration = 7000 }) => {
  if (!slides.length) {
    return (
      <section className="container" style={{ paddingTop: 80 }}>
        <div className="alert alert-secondary rounded-4 mb-0">Нет слайдов</div>
      </section>
    );
  }

  return (
    <section className="container px-0 mt-0" style={{ paddingTop: 0 }}>         {/*регулирование отступов (px-боковые) */}
      <div className="position-relative overflow-hidden rounded-4 shadow-sm">
        <div
          id="homeCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval={duration}
          data-bs-pause="false"
        >
          {/* HomeWidget */}
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{
              zIndex: 5,
              width: "100%",
              paddingInline: "12px",
            }}
          >
            <HomeWidget />
          </div>

          {/* Индикаторы */}
          <div className="carousel-indicators" style={{ marginBottom: 0, zIndex: 4 }}>
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#homeCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Слайд ${index + 1}`}
                style={{
                  width: "100%",
                  maxWidth: 120,
                  height: 4,
                  borderRadius: 999,
                }}
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
                {/* Высота блока слайда */}
                <div style={{ height: "min(87vh, 820px)" }}>
                  <img
                    src={slide.image}
                    alt={slide.city || slide.label || `Слайд ${index + 1}`}
                    className="d-block w-100 h-100"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>

                {/* Текст слайда  */}
                <div
                  className="carousel-caption text-start hide-caption-on-zoom"
                  style={{
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "1.25rem",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%)",
                  }}
                >
                  <div className="container">
                    <h1 className="mb-1" style={{ fontSize: "clamp(24px, 4vw, 44px)" }}>
                      {slide.city}
                    </h1>
                    <h5 className="mb-2 opacity-75" style={{ fontSize: "clamp(14px, 2vw, 18px)" }}>
                      {slide.label}
                    </h5>
                    <p className="mb-0" style={{ maxWidth: 720 }}>
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { TileBackground };