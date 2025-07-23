/**
 * @fileoverview
 * Основной виджет главной страницы.
 * Показывает логотип и шапку (LoginHeader), используется в HomePage.
 *
 * @description
 * HomeWidget — React-компонент, который отображает фирменный логотип и компонент LoginHeader.
 * Обычно используется как центральный элемент домашней страницы приложения.
 * Принимает объект пользователя и функцию выхода (для проброса в LoginHeader или других дочерних компонентов).
 *
 * @module HomeWidget
 */

import React from "react";
import { LoginHeader } from "../../features/";
import HomeLogo from './logo-homepage.svg?react';
import "./HomeWidget.css";

/**
 * @typedef {Object} HomeWidgetProps
 * @property {Object|null} user   - Данные пользователя (опционально, может быть null).
 * @property {Function} onLogout  - Функция выхода (опционально, может быть не использована здесь напрямую).
 */

/**
 * Основной виджет для домашней страницы.
 *
 * @param {HomeWidgetProps} props   - Свойства компонента (user, onLogout).
 * @returns {JSX.Element}           - Контейнер с логотипом и LoginHeader.
 */
const HomeWidget = function({ user, onLogout }) {
    return (
        <div className="home-widget">
            <HomeLogo className="home-logo" />
            <LoginHeader />
        </div>
    );
}

export { HomeWidget };
