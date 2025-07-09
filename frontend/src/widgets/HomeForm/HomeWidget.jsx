import React from "react";
import LoginHeader from "./LoginHeader.jsx";
import "./HomeWidget.css";

const HomeWidget = function({ user, onLogout }) {
    
    return (
        <div className="home-widget">
            <img src="/images/logo-homepage.svg" alt="Logo" className="home-logo" />
            <LoginHeader />
        </div>
    );
}

export default HomeWidget;