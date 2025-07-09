import React, {useState} from 'react';
import './BlueButton.css'

const BlueButton = function( {children, onClick, style} ) {
    return (
        <button className="blue-button" onClick={onClick} style={style}>
            {children}
        </button>
    );
}

export default BlueButton;