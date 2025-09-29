import React from 'react';
import './def-switcher.css';

/**
 * Простой переключатель с твоими стилями
 * 
 * @param {boolean} checked - Включен или выключен
 * @param {function} onChange - Функция при изменении
 */
const DefaultSwitcher = function({ 
    checked = false, 
    onChange 
}) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <label className="switcher">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="switcher-input"
            />
            <span className="switcher-visual"></span>
        </label>
    );
}

export { DefaultSwitcher };