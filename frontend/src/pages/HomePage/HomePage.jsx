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
import MapWidget from '../../widgets/MapWidget';
import HomeWidget from '../../widgets/HomeForm/HomeWidget.jsx';
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
const HomePage = function ({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    /**
     * Основной контейнер главной страницы. Содержит HomeWidget.
     * @see HomeWidget
     */
    <div className="homepage">
      <HomeWidget user={user} onLogout={onLogout}/>
    </div>
  );
}

export default HomePage;
