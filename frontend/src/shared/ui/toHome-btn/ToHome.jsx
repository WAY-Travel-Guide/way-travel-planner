import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import CornerLogo from "./corner-logo.svg";
import './ToHome.css';

const ToHomeButton = function() {
    const navigate = useNavigate();
    //Состояние наведения мыши на кнопку
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="to-home-wrapper"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => navigate("/")}
        >
            <img
                src={CornerLogo}
                alt="На главную"
                className="to-home-logo-button"
            />
            <div className={`to-home-tooltip ${hovered ? "visible" : ""}`}>
                ← Вернуться в главное меню?
            </div>
        </div>
    );
};

export { ToHomeButton };
