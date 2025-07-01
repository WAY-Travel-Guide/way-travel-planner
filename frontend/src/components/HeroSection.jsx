import React from 'react';
import './HeroSection.css'; // вынеси стили сюда
import moscowImg from '../assets/moscow.jpg';

export const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-left">
        <div className="hero-stepper">
          <div className="circle">1</div>
          {[...Array(4)].map((_, i) => (
            <div className="line-dot" key={i}>
              <div className="line" />
              <div className="dot" />
            </div>
          ))}
        </div>
        <div>
          <h1 className="hero-title">
            TOURIST<br />GUIDE
          </h1>
          <div className="hero-desc">
            Туристический гид для планирования<br />
            путешествия и еще какая-то инфа
          </div>
          <button className="hero-btn">
            Сгенерировать маршрут <span className="arrow">→</span>
          </button>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-header">5-дневный гид. Москва</div>
        <img src={moscowImg} alt="Москва" className="hero-img"/>
        <div className="hero-arrows">
          <button>&lt;</button>
          <button>&gt;</button>
        </div>
      </div>
      <div className="hero-topnav">
        <a href="#">Отзывы</a>
        <a href="#">Контакты</a>
        <a href="#">Помощь</a>
      </div>
    </div>
  );
};
