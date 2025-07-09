/**
 * @fileoverview
 * Форма регистрации нового пользователя.
 * Содержит поля для логина, пароля и подтверждения пароля, кнопку регистрации и ссылку на авторизацию.
 *
 * @description
 * RegisterForm — React-компонент для регистрации пользователя.
 * Показывает поля ввода логина, пароля и подтверждения пароля, кнопку регистрации и возможное сообщение об ошибке.
 * Использует кастомные компоненты Input, BlueButton, кнопку возврата на главную (ToHomeLogoButton).
 *
 * @module RegisterForm
 */

import React from 'react';
import Input from '../../shared/ui/Input/Input.jsx';
import BlueButton from '../../shared/ui/BlueButton/BlueButton.jsx';
import ToHomeLogoButton from "../ReturnToHome/ToHome.jsx";
import './RegisterForm.css';

/**
 * @typedef {Object} RegisterFormProps
 * @property {string} login                         - Текущее значение поля логина.
 * @property {function(string)} setLogin            - Setter для поля логина.
 * @property {string} password                      - Текущее значение поля пароля.
 * @property {function(string)} setPassword         - Setter для поля пароля.
 * @property {string} confirmPassword               - Текущее значение поля подтверждения пароля.
 * @property {function(string)} setConfirmPassword  - Setter для поля подтверждения пароля.
 * @property {string} msg                           - Сообщение об ошибке или статусе.
 * @property {function} handleRegister              - Callback для отправки формы регистрации.
 */

/**
 * Форма регистрации.
 *
 * @param {RegisterFormProps} props   - Свойства компонента (login, setLogin, password, setPassword, confirmPassword, setConfirmPassword, msg, handleRegister).
 * @returns {JSX.Element}             - Форма регистрации с полями, кнопкой и ссылкой.
 */
const RegisterForm = function ({ login, setLogin, password, setPassword, confirmPassword, setConfirmPassword, msg, handleRegister }) {
    return (
        <div className="reg-form">
            {/* Кнопка возврата на главную */}
            <ToHomeLogoButton />
            <h1 className='reg-title'>Добро пожаловать!</h1>

            {/* Поле ввода логина */}
            <Input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Логин"
                style={{  }}
            />

            {/* Поле ввода пароля */}
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                style={{  }}
            />

            {/* Поле подтверждения пароля */}
            <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Подтвердите пароль"
                style={{  }}
            />

            {/* Сообщение об ошибке или статусе */}
            {msg && <div className="reg-error-msg">{msg}</div>}

            {/* Кнопка регистрации */}
            <BlueButton onClick={handleRegister} style={{ }}>
                Регистрация
            </BlueButton>

            {/* Нижний текст со ссылкой на авторизацию */}
            <div className="bottom-text">
                Уже есть аккаунт?
                <a href="/login">Авторизуйтесь сейчас!</a>
            </div>
        </div>
    );
};

export default RegisterForm;
