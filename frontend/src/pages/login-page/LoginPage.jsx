/**
 * @fileoverview
 * Компонент страницы авторизации пользователя.
 * Содержит форму входа и визуальный виджет PictureSwapper.
 * Обрабатывает логику входа через API и перенаправление пользователя.
 *
 * @description
 * LoginPage — React-компонент для страницы логина. Реализует обработку формы, обращение к API,
 * обработку ошибок, пробрасывает результат логина родителю и выполняет редирект в профиль пользователя.
 * Визуально состоит из формы входа и секции с картинкой.
 *
 * @module LoginPage
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../features/login/LoginForm";
import { PictureSwapper } from "../../widgets";
import "./LoginPage.css";

/**
 * @typedef {Object} LoginPageProps
 * @property {Function} onLogin   - Callback для обработки успешного входа пользователя.
 */

/**
 * Страница входа в систему.
 * Хранит локальные состояния логина, пароля и сообщений, пробрасывает их в LoginForm.
 * При успешной авторизации вызывает onLogin и перенаправляет пользователя.
 *
 * @param {LoginPageProps} props  - Свойства компонента (onLogin).
 * @returns {JSX.Element}         - Верстка страницы логина с формой и картинкой.
 */
const LoginPage = function ({ onLogin }) {
  /** @type {[string, Function]} */
  const [login, setLogin] = useState('');
  /** @type {[string, Function]} */
  const [password, setPassword] = useState('');
  /** @type {[string, Function]} */
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  /**
   * Обработчик отправки формы логина.
   * Выполняет POST-запрос на /api/login, проверяет результат и обновляет состояние/выполняет редирект.
   *
   * @async
   * @returns {Promise<void>}
   */
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        /** @type {{id: string, login: string, name: string, token: string}} */
        const userData = {
          id: data.id,
          login: login,
          name: login,
          token: data.token,
        };
        onLogin(userData);
        navigate(`/user/${data.id}`);
      } else {
        setMsg(data.message || "Ошибка авторизации");
      }
    } catch (error) {
      setMsg('Ошибка сервера. Попробуйте позже.');
      console.error('Ошибка:', error);
    }
  };

  return (
    /**
     * Основной контейнер страницы логина.
     * Секция формы авторизации (LoginForm) и секция виджета PictureSwapper.
     */
    <div className="login-page">
      <div className="form-section">
        <LoginForm
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          msg={msg}
          handleLogin={handleLogin}
        />
      </div>
      <div className="pictur-swapper-section">
        <PictureSwapper />
      </div>
    </div>
  );
};

export { LoginPage };
