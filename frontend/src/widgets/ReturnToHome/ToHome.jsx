/**
 * @fileoverview
 * Кнопка возврата на главную страницу (в уголке экрана).
 * Отображает логотип и всплывающую подсказку при наведении.
 *
 * @description
 * ToHome — универсальная кнопка для возврата пользователя на главную страницу приложения.
 * При наведении отображает подсказку, реализован плавный hover-эффект.
 * Используется на формах логина, регистрации и др. для быстрого возврата к домашнему экрану.
 *
 * @module ToHome
 */

import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import CornerLogo from "../../assets/corner-logo.svg";
import './ToHome.css';

/**
 * Кнопка возврата в главное меню.
 *
 * @returns {JSX.Element}  - Обёртка с логотипом и tooltip-подсказкой.
 */
const ToHome = function() {
    const navigate = useNavigate();
    /** @type {[boolean, Function]} Состояние наведения мыши на кнопку */
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="to-home-wrapper"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => navigate("/")}
        >
            <img
                src={CornerLogo}
                alt="На главную"
                className="to-home-logo-button"
            />
            <div className={`to-home-tooltip ${hovered ? "visible" : ""}`}>
                ← Вернуться в главное меню?
            </div>
        </div>
    );
};

export default ToHome;
