/**
 * @fileoverview
 * Выпадающее меню пользователя (UserOptions).
 * Отображает имя пользователя и список действий: профиль, история, выход.
 *
 * @description
 * UserOptions — React-компонент для отображения опций пользователя в выпадающем меню.
 * Содержит кнопки для перехода в профиль, просмотра истории и выхода из аккаунта.
 * Кнопка "Выйти" возвращает на главную страницу и может быть расширена для очистки сессии.
 *
 * @module UserOptions
 */

import React from 'react';
import { useNavigate } from "react-router-dom";
import './UserOptions.css';

/**
 * @typedef {Object} UserOptionsProps
 * @property {string} [userName] - Имя пользователя (опционально, по умолчанию "Пользователь").
 */

/**
 * Выпадающее меню пользователя с опциями: Профиль, История, Выйти.
 *
 * @param {UserOptionsProps} props    - Свойства компонента (userName).
 * @returns {JSX.Element}             - Контейнер с кнопками пользовательских опций.
 */
const UserOptions = function({ userName }) {
    const navigate = useNavigate();

    /**
     * Обработчик выхода пользователя.
     * Перенаправляет на главную страницу.
     */
    const handleLogout = () => {
        // Тут можно очистить данные или токен, если нужно
        navigate("/");
    };

    return (
        <div className="user-options-form">
            <div className="user-name">{userName || "Пользователь"}</div>
            <button className="user-options-item">Профиль</button>
            <button className="user-options-item">История</button>
            <button className="user-options-item" onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export { UserOptions };
