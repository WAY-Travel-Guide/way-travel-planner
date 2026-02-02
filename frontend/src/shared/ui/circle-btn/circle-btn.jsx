// CircleButton.jsx
import React from "react";
import "./circle-btn.css";

const CircleButton = function ({ onClick, active = false, color = "var(--dot-color)", id }) {
    return (
        <button
        className={`circle-button${active ? " active" : ""}`}
        onClick={onClick}
        aria-pressed={active}
        style={{ "--dot-color": color }}
        >
            <span className="btn-label">{id}</span>
        </button>
    );
};

export { CircleButton };