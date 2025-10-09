import React from 'react';
import './Header.css';
import Exit from "../../assets/exit.svg";
import History from "../../assets/time-past.svg";
import Person from "../../assets/user.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="header-nav">
          <ul className="header-nav-list">
            <li>
              <a className='menu-items'> Отзывы</a>
            </li>
            <li>
              <a className='menu-items'> Контакты</a>
            </li>
            <li>
              <a className='menu-items'> Помощь</a>
            </li>
            <li className="header-spacer"></li>
            <li>
                <img src={Exit} alt="Главная" className="header-nav-icon" />
            </li>
            <li>
                <img src={History} alt="О нас" className="header-nav-icon" />
            </li>
            <li>
                <img src={Person} alt="Контакты" className="header-nav-icon" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export {Header};