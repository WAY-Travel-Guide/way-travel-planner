import React from 'react';
import { useNavigate } from "react-router-dom";
import './UserOptions.css';

const UserOptions = function({ userName }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Тут можно очистить данные или токен, если нужно
        navigate("/");
    };

    return (
        <div className="user-options-form">
        <div className="user-name">{userName || "Пользователь"}</div>
        <button className="user-options-item">Профиль</button>
        <button className="user-options-item">История</button>
        <button className="user-options-item" onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default UserOptions;
