import React from 'react';
import './def-switcher.css';

const DefaultSwitcher = function({ checked = false, onChange, style = {} }) {
    const { tsbgColor, afterShadow, chAfterBgColor, chTsBgColor } = style;


    const vars = {
        ...(tsbgColor      && { '--tsbg-color': tsbgColor }),
        ...(afterShadow    && { '--after-color': afterShadow }),
        ...(chAfterBgColor && { '--ch-after-bg-color': chAfterBgColor }),
        ...(chTsBgColor    && { '--ch-ts-bg-color': chTsBgColor }),
    };

    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <>
            <input
                id="checkboxInput"
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            />
            <label
                htmlFor="checkboxInput"
                className="toggleSwitch"
                style={vars}
            >
            </label>
        </>
    );
}

export { DefaultSwitcher };
