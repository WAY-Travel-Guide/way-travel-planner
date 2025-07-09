import React, {useState} from 'react';
import './OrangeButton.css'

const OrangeButton = function( {children, onClick, style} ) {
    return (
        <button className="orange-button" onClick={onClick} style={style}>
            {children}
        </button>
    );
}

export default OrangeButton;