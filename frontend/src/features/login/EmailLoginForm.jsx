/**
 * @fileoverview
 * Форма авторизации пользователя через email.
 * Отображает поля email и пароля, кнопку входа и ссылку на регистрацию.
 *
 * @description
 * EmailLoginForm — React-компонент для авторизации пользователя через email.
 * Содержит элементы ввода email и пароля, кнопку входа, обработку ошибок и переход на регистрацию.
 * Использует кастомные компоненты Input, BlueButton и кнопку возврата на главную.
 *
 * @module EmailLoginForm
 */

import React from 'react';
import { DefaultInput } from '../../shared';
import { DefaultButton } from '../../shared';
import { ToHomeButton } from "../../shared";
import './LoginForm.css';

/**
 * @typedef {Object} EmailLoginFormProps
 * @property {string} email           - Текущее значение поля email.
 * @property {function(string)} setEmail     - Setter для поля email.
 * @property {string} password        - Текущее значение поля пароля.
 * @property {function(string)} setPassword  - Setter для поля пароля.
 * @property {string} msg             - Сообщение об ошибке или информационное сообщение.
 * @property {function} handleLogin   - Callback для отправки формы логина.
 */

/**
 * Форма логина через email.
 *
 * @param {EmailLoginFormProps} props   - Свойства компонента (email, setEmail, password, setPassword, msg, handleLogin).
 * @returns {JSX.Element}          - Форма логина с полями, кнопкой и ссылками.
 */
const EmailLoginForm = function ({ email, setEmail, password, setPassword, msg, handleLogin }) {
  return (
    <div className="login-form">
      {/* Кнопка возврата на главную */}
      <ToHomeButton />
      <h1 className='title'>Вход через email</h1>

      {/* Поле ввода email */}
      <DefaultInput
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{  }}
      />

      {/* Поле ввода пароля */}
      <DefaultInput
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
      <DefaultButton
      onClick={handleLogin}
      style={{
        bgColor: "#0C2461",
        borderColor: "#0C2461",
        textColor: "#ffffff",
        bgColorBefore: "#ffffffff",
        textColorBefore: "#0C2461"
      }}>
        Войти
      </DefaultButton>

      {/* Нижний текст со ссылкой на регистрацию */}
      <div className="bottom-text">
        Еще не зарегистрированы?
        <a href="/register">Зарегистрируйтесь сейчас!</a>
      </div>
      
      {/* Ссылка на обычный вход */}
      <div className="bottom-text" >
        Войти через логин?
        <a href="/login">Нажмите здесь!</a>
      </div>
    </div>
  );
};

export { EmailLoginForm };
