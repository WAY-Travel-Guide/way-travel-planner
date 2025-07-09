/**
 * @fileoverview
 * Главный компонент приложения (App). Отвечает за хранение состояния пользователя,
 * обработку входа/выхода и инициализацию роутинга. Использует React hooks и компонент PageRouter.
 *
 * @description
 * App — основной React-компонент фронтенда. При загрузке пытается восстановить пользователя
 * из localStorage. Передаёт методы авторизации и выхода дочернему роутеру.
 * Все маршруты, защищённые и публичные, реализуются внутри PageRouter.
 *
 * @module App
 */

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import PageRouter from "./routes/PageRouter";

/**
 * Главный компонент приложения, реализующий базовую логику авторизации пользователя,
 * хранение и восстановление данных пользователя из localStorage, а также маршрутизацию.
 *
 * @function
 * @returns {JSX.Element} Корневой компонент приложения, содержащий логику аутентификации и передачи props дочерним компонентам.
 */
function App() {
  /**
   * @typedef {Object} User
   * @property {string} [id]        - Идентификатор пользователя (опционально)
   * @property {string} [login]     - Логин пользователя (опционально)
   * @property {string} [token]     - JWT или иной токен (опционально)
   * @property {any}     [...]      - Прочие свойства в зависимости от реализации
   */

  /** @type {[User|null, Function]} */
  const [user, setUser] = useState(null);

  useEffect(() => {
    /**
     * При первом рендере проверяет наличие данных пользователя в localStorage.
     * Если данные валидны, восстанавливает пользователя.
     * Если данные некорректны, очищает localStorage.
     */
    const savedUser = localStorage.getItem("user");
    // Проверяем, что строка реально валидная!
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
        console.log("Loaded user from localStorage:", JSON.parse(savedUser));
      } catch (e) {
        console.warn("Некорректный user в localStorage:", savedUser);
        setUser(null);
        localStorage.removeItem("user");
      }
    }
  }, []);

  /**
   * Обработчик успешного входа пользователя.
   *
   * @param {User} userData - Данные пользователя, полученные после авторизации.
   */
  const handleLogin = (userData) => {
    console.log("handleLogin called with:", userData); // Отладка
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * Обработчик выхода пользователя из системы.
   * Очищает состояние и localStorage.
   */
  const handleLogout = () => {
    console.log("handleLogout called"); // Отладка
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    /**
     * Рендерит компонент маршрутизации страниц.
     * @see PageRouter
     * @param {User|null} user - Текущий пользователь или null.
     * @param {Function} handleLogin - Метод для входа.
     * @param {Function} handleLogout - Метод для выхода.
     */
    <PageRouter user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
  );
}

export default App;
