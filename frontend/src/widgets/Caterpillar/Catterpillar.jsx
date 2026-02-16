import React from "react";
import LeftArrow from "../picture-swapper/left.svg?react";
import RightArrow from "../picture-swapper/right.svg?react";
import "./Catterpillar.css";

const CaterpillarSlider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const len = slides.length;
  if (!len) return null;

  const nextSlide = React.useCallback(
    () => setCurrentIndex((i) => (i + 1) % len),
    [len]
  );

  const prevSlide = React.useCallback(
    () => setCurrentIndex((i) => (i === 0 ? len - 1 : i - 1)),
    [len]
  );

  const getSlide = (offset) => slides[(currentIndex + offset + len) % len];

  // Десктоп: 3 карточки
  const visibleSlidesDesktop = [getSlide(-1), getSlide(0), getSlide(1)];

  // Мобилка: 1 карточка
  const visibleSlidesMobile = [getSlide(0)];

  // --- Swipe (touch) ---
  const startXRef = React.useRef(null);

  const onTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (startXRef.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startXRef.current;
    startXRef.current = null;

    const threshold = 40;
    if (dx > threshold) prevSlide();
    if (dx < -threshold) nextSlide();
  };

  return (
    <section className="container-fluid px-0 my-lg-5">
      <div className="row justify-content-center g-0">
        <div className="col-12">
          <div className="cat-wrap position-relative">

            {/* ===== DESKTOP HEADER ===== */}
            <div className="cat-head d-none d-md-flex align-items-center justify-content-between mb-3 px-3 px-md-4">
              <h5 className="mb-0 fw-light fs-2">Популярные маршруты</h5>

              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="cat-icon-btn"
                  onClick={prevSlide}
                  aria-label="Prev"
                >
                  <i className="bi bi-arrow-left-circle" />
                </button>

                <button
                  type="button"
                  className="cat-icon-btn"
                  onClick={nextSlide}
                  aria-label="Next"
                >
                  <i className="bi bi-arrow-right-circle" />
                </button>
              </div>
            </div>

            {/* ===== DESKTOP: 3 CARDS ===== */}
            <div className="cat-row d-none d-md-flex mb-1">
              {visibleSlidesDesktop.map((slide, i) => (
                <article key={`${slide.city}-d-${i}`} className="cat-col">
                  <div className="cat-card rounded-4 overflow-hidden shadow position-relative">
                    <img
                      src={slide.image}
                      alt={slide.city}
                      className="cat-img"
                      loading="lazy"
                    />

                    <div className="cat-overlay position-absolute start-0 end-0 bottom-0 p-4 text-start text-white">
                      <div className="fw-bold cat-title">{slide.city}</div>
                      <div className="fw-semibold cat-subtitle">{slide.label}</div>
                      <div className="cat-desc">{slide.description}</div>

                      <button
                        type="button"
                        className="btn btn-light btn-sm mt-3 w-100 text-center d-block rounded-pill"
                      >
                        Подробнее
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* ===== MOBILE: 1 CARD + TITLE ===== */}
            <div className="cat-mobile d-md-none px-3">
              {/* Заголовок */}
              <h5 className="cat-mobile-title fw-light fs-4 text-center mt-3 mb-2">
                Популярные маршруты
              </h5>
              <div
                className="cat-mobile-swipe"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {visibleSlidesMobile.map((slide) => (
                  <article key={`${slide.city}-m`} className="cat-col-mobile">
                    <div className="cat-card rounded-4 overflow-hidden shadow position-relative mb-1">
                      <img
                        src={slide.image}
                        alt={slide.city}
                        className="cat-img"
                        loading="lazy"
                      />

                      <div className="cat-overlay position-absolute start-0 end-0 bottom-0 p-4 text-center text-white">
                        <div className="fw-bold cat-title">{slide.city}</div>
                        <div className="fw-semibold cat-subtitle">{slide.label}</div>
                        <div className="cat-desc">{slide.description}</div>

                        <button
                          type="button"
                          className="btn btn-light btn-sm mt-3 px-4 rounded-pill"
                        >
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export { CaterpillarSlider };
