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
import UseState, { useState } from "react";
import { DefaultInput } from '../../shared';
import { DefaultButton } from '../../shared';
import { ToHomeButton } from "../../shared";
import { DefaultSwitcher } from '../../shared';
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
  const [onChange, setChange] = useState(false);
  return (
    <div className="login-form">
      {/* Кнопка возврата на главную */}
      <ToHomeButton />
      <h1 className='title'>С возвращением!</h1>

      {/* Поле ввода логина */}
      <DefaultInput
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Логин"
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
      
      {/* Ссылка на вход через email */}
      <div className="bottom-text" >
        Войти через электронную почту?
        <a href="/login-email">Нажмите здесь!</a>
      </div>    
    </div>
  );
};

export { LoginForm };
