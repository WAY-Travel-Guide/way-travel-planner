/**
 * @fileoverview
 * Компонент главной страницы приложения.
 * Содержит основной виджет домашней страницы, оборачивает его в стилизованный контейнер.
 *
 * @description
 * HomePage — React-компонент для отображения главной (домашней) страницы.
 * Использует HomeWidget для рендера основного содержимого, пробрасывает в него текущего пользователя и функцию выхода.
 * Подключает стили HomePage.css.
 *
 * @module HomePage
 */

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HomeWidget,Header,TileBackground} from '../../widgets/';
import "./HomePage.css";

/**
 * @typedef {Object} HomePageProps
 * @property {Object|null} user         - Данные текущего пользователя или null.
 * @property {Function} onLogout        - Функция выхода пользователя (очищает данные и перенаправляет).
 */

/**
 * Главная страница приложения. Отображает основной виджет и передаёт ему user/onLogout.
 *
 * @param {HomePageProps} props         - Свойства компонента (user, onLogout).
 * @returns {JSX.Element}               - Стилизиованный контейнер с содержимым домашней страницы.
 */

const slides = [
    {
        city: "Волгоград",
        label: "Историческое",
        description: "2-дневный гид по городу-герою",
        image: "/images/slides1-1.jpg"
    },
    {
        city: "Москва",
        label: "Популярно",
        description: "5-дневный гид",
        image: "/images/slides1-2.png"
    },
    {
        city: "Санкт-Петербург",
        label: "Историческое",
        description: "3-дневный маршрут",
        image: "/images/slides1-5.jpg"
    },
    {
        city: "Казань",
        label: "Национальное",
        description: "Уикенд в столице Татарстана",
        image: "/images/slides1-6.jpg"
    },
    {
        city: "Калининград",
        label: "Историческое",
        description: "Уикенд в сердце янтарного края",
        image: "/images/slides1-4.jpg"
    },
    {
        city: "Нижний Новгород",
        label: "Национальное",
        description: "3-дневный маршрут по столице Поволжья",
        image: "/images/slides1-3.jpg"
    }
];
const HomePage = function ({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    /**
     * Основной контейнер главной страницы. Содержит HomeWidget.
     * @see HomeWidget
     */
    <div className="homepage">
      <Header></Header>
      {/*<HomeWidget user={user} onLogout={onLogout}/>*/}
      <TileBackground slides = {slides}></TileBackground>
    </div>
  );
}

export { HomePage };
