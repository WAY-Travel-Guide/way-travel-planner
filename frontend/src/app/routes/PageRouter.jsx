/**
 * @fileoverview
 * Компонент маршрутизации страниц приложения.
 * Определяет публичные и защищённые маршруты, связывает страницы с соответствующими props.
 *
 * @description
 * PageRouter — фронтовый роутер, использующий react-router-dom для организации переходов между страницами.
 * В зависимости от маршрута рендерит LoginPage, RegisterPage, HomePage или UserPage, передавая необходимые props.
 * Содержит только Routes компонент (BrowserRouter находится в App.jsx).
 *
 * @module PageRouter
 */

import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../../pages/";
import { EmailLoginPage } from "../../pages/";
import { UserPage } from "../../pages/";
import { HomePage } from "../../pages/";
import { RegisterPage } from "../../pages/";

/**
 * @typedef {Object} PageRouterProps
 * @property {Object|null} user           - Объект пользователя или null, если пользователь не авторизован.
 * @property {Function} handleLogin       - Функция-обработчик входа, вызывается при успешной авторизации.
 * @property {Function} handleLogout      - Функция-обработчик выхода пользователя.
 */

/**
 * Компонент маршрутизации. Определяет, какой компонент страницы отобразить по текущему URL.
 *
 * @param {PageRouterProps} props - Свойства компонента.
 * @returns {JSX.Element} JSX-дерево роутера для приложения.
 */
const PageRouter = function({ user, handleLogin, handleLogout }) {
    return (
        /**
         * Рендерит все маршруты приложения.
         * Маршруты:
         * - "/login"     — страница авторизации (LoginPage)
         * - "/register"  — страница регистрации (RegisterPage)
         * - "/"          — главная страница (HomePage)
         * - "/user/:id"  — страница профиля пользователя (UserPage)
         */
        <Routes>
            {/* Страница входа. onLogin пробрасывается для дальнейшей авторизации. */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    
            {/* Страница входа через email. onLogin пробрасывается для дальнейшей авторизации. */}
            <Route path="/login-email" element={<EmailLoginPage onLogin={handleLogin} />} />
                    
            {/* Страница регистрации. onLogin пробрасывается для автоматического входа после регистрации. */}
            <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
                    
            {/* Главная страница. Передаём user и onLogout для отображения профиля и выхода. */}
            <Route path="/" element={<HomePage user={user} onLogout={handleLogout} />} />
                    
            {/* Страница пользователя. Передаём user для отображения информации о текущем пользователе. */}
            <Route path="/user/:id" element={<UserPage user={user} />} />
        </Routes>
    )
}

export default PageRouter;
