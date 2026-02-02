import React from "react";
import "./def-input.css";

const DefaultInput = function({value, onChange, placeholder, type = "text", style}) {
    return (
    <div className="input-group">
        <input
            className="input"
            type={type}
            value={value}
            onChange={onChange}
            required
            style={style}
        />
        <label className="user-label">{placeholder}</label>
    </div>
    )
}

export { DefaultInput };
