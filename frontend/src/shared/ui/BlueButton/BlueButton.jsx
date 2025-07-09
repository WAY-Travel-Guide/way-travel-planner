/**
 * @fileoverview
 * Кастомная универсальная синяя кнопка для интерфейса приложения.
 * Позволяет передавать любой JSX-контент через children, а также обработчик клика и стили.
 *
 * @description
 * BlueButton — компонент кнопки с предустановленными стилями (BlueButton.css).
 * Используется для действий по клику в различных формах и интерфейсных элементах.
 * Принимает пользовательский стиль (style), обработчик onClick и содержимое (children).
 *
 * @module BlueButton
 */

import React, {useState} from 'react';
import './BlueButton.css';

/**
 * @typedef {Object} BlueButtonProps
 * @property {React.ReactNode} children - Контент, отображаемый внутри кнопки (текст, иконки и пр.).
 * @property {function=} onClick        - Обработчик клика по кнопке (опционально).
 * @property {Object=} style            - Объект пользовательских CSS-стилей (опционально).
 */

/**
 * Универсальная кнопка с синим стилем.
 *
 * @param {BlueButtonProps} props       - Свойства компонента (children, onClick, style).
 * @returns {JSX.Element}               - Кнопка с заданным содержимым и обработчиком.
 */
const BlueButton = function( {children, onClick, style} ) {
    return (
        <button className="blue-button" onClick={onClick} style={style}>
            {children}
        </button>
    );
}

export default BlueButton;
