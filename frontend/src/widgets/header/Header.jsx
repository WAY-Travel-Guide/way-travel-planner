import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>Твой Логотип</h1> {/* Или img */}
        </div>
        <nav className="header-nav">
          <ul className="header-nav-list">
            <li><a href="#home">Главная</a></li>
            <li><a href="#about">О нас</a></li>
            <li><a href="#contact">Контакты</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export {Header};