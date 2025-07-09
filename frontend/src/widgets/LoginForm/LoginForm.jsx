/**
 * @fileoverview
 * Форма авторизации пользователя.
 * Отображает поля логина и пароля, кнопку входа и ссылку на регистрацию.
 *
 * @description
 * LoginForm — React-компонент для авторизации пользователя.
 * Содержит элементы ввода логина и пароля, кнопку входа, обработку ошибок и переход на регистрацию.
 * Использует кастомные компоненты Input, BlueButton и кнопку возврата на главную.
 *
 * @module LoginForm
 */

import React from 'react';
import Input from '../../shared/ui/Input/Input.jsx';
import BlueButton from '../../shared/ui/BlueButton/BlueButton.jsx';
import ToHomeLogoButton from "../ReturnToHome/ToHome.jsx";
import './LoginForm.css';

/**
 * @typedef {Object} LoginFormProps
 * @property {string} login           - Текущее значение поля логина.
 * @property {function(string)} setLogin     - Setter для поля логина.
 * @property {string} password        - Текущее значение поля пароля.
 * @property {function(string)} setPassword  - Setter для поля пароля.
 * @property {string} msg             - Сообщение об ошибке или информационное сообщение.
 * @property {function} handleLogin   - Callback для отправки формы логина.
 */

/**
 * Форма логина.
 *
 * @param {LoginFormProps} props   - Свойства компонента (login, setLogin, password, setPassword, msg, handleLogin).
 * @returns {JSX.Element}          - Форма логина с полями, кнопкой и ссылками.
 */
const LoginForm = function ({ login, setLogin, password, setPassword, msg, handleLogin }) {
  return (
    <div className="login-form">
      {/* Кнопка возврата на главную */}
      <ToHomeLogoButton />
      <h1 className='title'>С возвращением!</h1>

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

      {/* Сообщение об ошибке или статусе */}
      {msg && <div className="error-msg">{msg}</div>}

      {/* Ссылка "Забыли пароль?" */}
      <div className="forgot">Забыли пароль?</div>

      {/* Кнопка входа */}
      <BlueButton onClick={handleLogin} style={{ }}>
        Войти
      </BlueButton>

      {/* Нижний текст со ссылкой на регистрацию */}
      <div className="bottom-text">
        Еще не зарегистрированы?
        <a href="/register">Зарегистрируйтесь сейчас!</a>
      </div>
    </div>
  );
};

export default LoginForm;
