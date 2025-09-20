/**
 * @fileoverview
 * Кастомная универсальная синяя кнопка для интерфейса приложения.
 * Позволяет передавать любой JSX-контент через children, а также обработчик клика и стили.
 *
 * @description
 * Button — компонент кнопки с предустановленными стилями (Button.css).
 * Используется для действий по клику в различных формах и интерфейсных элементах.
 * Принимает пользовательский стиль (style), обработчик onClick и содержимое (children).
 *
 * @module Button
 */

import React, {useState} from 'react';
import './def-btn.css';

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - Контент, отображаемый внутри кнопки (текст, иконки и пр.).
 * @property {function=} onClick        - Обработчик клика по кнопке (опционально).
 * @property {Object=} style            - Объект пользовательских CSS-стилей (опционально).
 */

/**
 * Универсальная кнопка с синим стилем.
 *
 * @param {ButtonProps} props       - Свойства компонента (children, onClick, style).
 * @returns {JSX.Element}               - Кнопка с заданным содержимым и обработчиком.
 */
const DefaultButton = function( {children, onClick, style ={}} ) {
    const { bgColor, borderColor, textColorBefore, textColor, backdropFilter, bgColorBefore } = style;

  // Собираем объект стилей для CSS-переменных:
    const vars = {
        ...(bgColor         && { '--btn-color':             bgColor }),
        ...(borderColor     && { '--btn-border-color':      borderColor }),
        ...(textColorBefore && { '--btn-before-text-color': textColorBefore }),
        ...(textColor       && { '--btn-text-color':        textColor }),
        ...(backdropFilter  && { '--btn-backdrop-filter':   backdropFilter}),
        ...(bgColorBefore   && { '--btn-before-color':      bgColorBefore}),
    };
    
    return (
        <button
            className="button"
            onClick={onClick}
            style={vars}
        >
            {children}
        </button>
    );
}

export { DefaultButton };
