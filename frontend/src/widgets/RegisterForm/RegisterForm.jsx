import React from 'react';
import Input from '../../shared/ui/Input/Input.jsx';
import BlueButton from '../../shared/ui/BlueButton/BlueButton.jsx';
import ToHomeLogoButton from "../ReturnToHome/ToHome.jsx";
import './RegisterForm.css';

const RegisterForm = function ({ login, setLogin, password, setPassword, confirmPassword, setConfirmPassword, msg, handleRegister }) {
    return (
        <div className="reg-form">
        <ToHomeLogoButton />
        <h1 className='reg-title'>Добро пожаловать!</h1>

        <Input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Логин"
            style={{  }}
        />

        <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            style={{  }}
        />

        <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Подтвердите пароль"
            style={{  }}
        />

        {msg && <div className="reg-error-msg">{msg}</div>}

        <BlueButton onClick={handleRegister} style={{ }}>
            Регистрация
        </BlueButton>
            <div className="bottom-text">
            Уже есть аккаунт?
            <a href="/login">Авторизуйтесь сейчас!</a>
        </div>
        </div>
    );
};

export default RegisterForm;
