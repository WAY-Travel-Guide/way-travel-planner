import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import CornerLogo from "../../assets/corner-logo.svg";
import './ToHome.css';

const ToHome = function() {
    const navigate = useNavigate();
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

export default ToHome;
