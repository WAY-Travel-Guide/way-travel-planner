import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HomeWidget,Header,TileBackground,CaterpillarSlider} from '../../widgets/';
import "./HomePage.css";
import {slides} from './slides.jsx';

const HomePage = function ({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <>
      <section className="section min-vh-100 d-flex flex-column">
        <Header />
        {/* <div className="container">
          <TileBackground slides={slides} />
        </div> */}
      </section>

      {/* <section className="section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Популярные туры</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {slides.map((slide, i) => (
              <div className="col" key={i}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={slide.image}
                    className="card-img-top"
                    alt={slide.city}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{slide.city}</h5>
                    <p className="card-text text-muted">{slide.description}</p>
                    <span className="badge bg-primary">{slide.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
};

export { HomePage };
