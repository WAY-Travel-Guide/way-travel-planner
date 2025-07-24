/**
 * @fileoverview
 * Компонент страницы регистрации пользователя.
 * Содержит форму регистрации и визуальный виджет PictureSwapper.
 * Реализует всю логику регистрации, валидацию и обработку ошибок.
 *
 * @description
 * RegisterPage — React-компонент страницы регистрации. Хранит локальное состояние логина, пароля, подтверждения и сообщения.
 * Выполняет базовую валидацию, отправляет запрос на API, обрабатывает результат,
 * вызывает onLogin при успешной регистрации и выполняет редирект в профиль пользователя.
 * Визуально состоит из формы регистрации и секции с картинкой.
 *
 * @module RegisterPage
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../../features/";
import { PictureSwapper } from "../../widgets";
import "./RegisterPage.css";

/**
 * @typedef {Object} RegisterPageProps
 * @property {Function} onLogin - Callback для обработки успешной регистрации и автоматического входа.
 */

/**
 * Страница регистрации пользователя.
 * Реализует валидацию полей, обработку ошибок, работу с API и автоматический вход.
 *
 * @param {RegisterPageProps} props   - Свойства компонента (onLogin).
 * @returns {JSX.Element}             - Верстка страницы регистрации с формой и картинкой.
 */
function RegisterPage({ onLogin }) {
  /** @type {[string, Function]} */
  const [login, setLogin] = useState("");
  /** @type {[string, Function]} */
  const [password, setPassword] = useState("");
  /** @type {[string, Function]} */
  const [confirmPassword, setConfirmPassword] = useState("");
  /** @type {[string, Function]} */
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  /**
   * Обработчик регистрации пользователя.
   * Выполняет базовую валидацию, отправляет POST-запрос на /api/register, обрабатывает ответ.
   *
   * @async
   * @returns {Promise<void>}
   */
  const handleRegister = async () => {
    setMsg("");
    if (!login || !password || !confirmPassword) {
      setMsg("Все поля обязательны");
      return;
    }
    if (password !== confirmPassword) {
      setMsg("Пароли не совпадают");
      return;
    }
    if (password.length < 4) {
      setMsg("Пароль должен содержать минимум 4 символа");
      return;
    }

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const res_body = await res.json();
      console.log(res_body);

      if (res_body.success && res_body.data.token) {
        const userData = {
          id: res_body.data.id,
          login: login,
          name: login,
          token: res_body.data.token,
        };
        onLogin(userData);
        navigate(`/user/${res_body.data.id}`);
      } else {
        setMsg(res_body.error || "Не удалось зарегистрироваться");
      }
    } catch (error) {
      setMsg("Ошибка сервера");
    }
  };

  return (
    /**
     * Основной контейнер страницы регистрации.
     * Секция формы регистрации (RegisterForm) и секция виджета PictureSwapper.
     */
    <div className="register-page">
      <div className="reg-form-section">
        <RegisterForm
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          msg={msg}
          handleRegister={handleRegister}
        />
      </div>
      <div className="reg-picture-swapper-section">
        <PictureSwapper />
      </div>
    </div>
  )
}

export { RegisterPage };
