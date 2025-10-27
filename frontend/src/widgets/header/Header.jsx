import React from 'react';
import './Header.css';
import Exit from "../../assets/exit.svg";
import History from "../../assets/time-past.svg";
import Person from "../../assets/user.svg";
import Logo from "../../../public/way-minilogo.svg"
import MainLogo from "../../../public/images/github-logo.png"

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
          <div className="header-nav-list">
              <img src={Logo} alt="Лого" className = "minilogo"/>
              <a className='menu-items'> Отзывы</a>
              <a className='menu-items'> Контакты</a>
              <a className='menu-items'> Помощь</a>
            <li className="header-spacer"></li>
            {/*<li>
              <img src={MainLogo} alt="Основной логотип" className='headerhome-widget'/>
            </li>*/}
            <img src={Exit} alt="Главная" className="header-nav-icon" />      
            <img src={History} alt="О нас" className="header-nav-icon" />
            <img src={Person} alt="Контакты" className="header-nav-icon" />
          </div>
      </div>
    </header>
  );
};

export {Header};