/**
 * @fileoverview
 * Компонент страницы авторизации пользователя через email.
 * Содержит форму входа и визуальный виджет PictureSwapper.
 * Обрабатывает логику входа через API и перенаправление пользователя.
 *
 * @description
 * EmailLoginPage — React-компонент для страницы логина через email. Реализует обработку формы, обращение к API,
 * обработку ошибок, пробрасывает результат логина родителю и выполняет редирект в профиль пользователя.
 * Визуально состоит из формы входа и секции с картинкой.
 *
 * @module EmailLoginPage
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailLoginForm } from "../../features/login/EmailLoginForm";
import { PictureSwapper } from "../../widgets";
import "./EmailLoginPage.css";

/**
 * @typedef {Object} EmailLoginPageProps
 * @property {Function} onLogin   - Callback для обработки успешного входа пользователя.
 */

/**
 * Страница входа в систему через email.
 * Хранит локальные состояния email, пароля и сообщений, пробрасывает их в EmailLoginForm.
 * При успешной авторизации вызывает onLogin и перенаправляет пользователя.
 *
 * @param {EmailLoginPageProps} props  - Свойства компонента (onLogin).
 * @returns {JSX.Element}         - Верстка страницы логина с формой и картинкой.
 */
const EmailLoginPage = function ({ onLogin }) {
  /** @type {[string, Function]} */
  const [email, setEmail] = useState('');
  /** @type {[string, Function]} */
  const [password, setPassword] = useState('');
  /** @type {[string, Function]} */
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  /**
   * Обработчик отправки формы логина через email.
   * Выполняет POST-запрос на /api/users/login-email, проверяет результат и обновляет состояние/выполняет редирект.
   *
   * @async
   * @returns {Promise<void>}
   */
  const handleLogin = async () => {
    if (!email || !password) {
      setMsg("Все поля обязательны");
      return;
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg("Введите корректный email");
      return;
    }

    try {
      const res = await fetch('/api/users/login-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const res_body = await res.json();

      if (res_body.success && res_body.data.token) {
        const userData = {
          id: res_body.data.id,
          login: res_body.data.login,
          email: res_body.data.email,
          name: res_body.data.login,
          token: res_body.data.token,
        };
        onLogin(userData);
        navigate(`/user/${res_body.data.id}`);
      } else {
        setMsg(res_body.error || "Ошибка авторизации");
      }
    } catch (error) {
      setMsg('Ошибка сервера. Попробуйте позже.');
      console.error('Ошибка:', error);
    }
  };

  return (
    /**
     * Основной контейнер страницы логина.
     * Секция формы авторизации (EmailLoginForm) и секция виджета PictureSwapper.
     */
    <div className="login-page">
      <div className="form-section">
        <EmailLoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          msg={msg}
          handleLogin={handleLogin}
        />
      </div>
      <div className="picture-swapper-section">
        <PictureSwapper />
      </div>
    </div>
  );
};

export { EmailLoginPage };
