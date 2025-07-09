/**
 * @fileoverview
 * Кастомная универсальная оранжевая кнопка для интерфейса приложения.
 * Принимает любой контент (children), обработчик клика и пользовательские стили.
 *
 * @description
 * OrangeButton — компонент кнопки с предустановленными оранжевыми стилями (OrangeButton.css).
 * Используется для действий по клику в различных формах, модальных окнах, панелях и т.д.
 * Позволяет настраивать внешний вид с помощью prop style и поддерживает любой вложенный JSX через children.
 *
 * @module OrangeButton
 */

import React, {useState} from 'react';
import './OrangeButton.css';

/**
 * @typedef {Object} OrangeButtonProps
 * @property {React.ReactNode} children - Контент, который будет отображаться внутри кнопки (например, текст или иконка).
 * @property {function=} onClick        - Функция-обработчик события клика (опционально).
 * @property {Object=} style            - Дополнительные пользовательские CSS-стили (опционально).
 */

/**
 * Универсальная кнопка с оранжевым стилем.
 *
 * @param {OrangeButtonProps} props     - Свойства компонента (children, onClick, style).
 * @returns {JSX.Element}               - Кнопка с указанным содержимым и обработчиком.
 */
const OrangeButton = function( {children, onClick, style} ) {
    return (
        <button className="orange-button" onClick={onClick} style={style}>
            {children}
        </button>
    );
}

export default OrangeButton;
