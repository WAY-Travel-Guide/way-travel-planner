import React, {useState} from 'react';
import './def-btn.css';

// Универсальная кнопка с синим стилем.
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
