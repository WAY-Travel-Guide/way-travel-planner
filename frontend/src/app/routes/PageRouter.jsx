/**
 * @fileoverview
 * Компонент маршрутизации страниц приложения.
 * Определяет публичные и защищённые маршруты, связывает страницы с соответствующими props.
 *
 * @description
 * PageRouter — фронтовый роутер, использующий react-router-dom для организации переходов между страницами.
 * В зависимости от маршрута рендерит LoginPage, RegisterPage, HomePage или UserPage, передавая необходимые props.
 * Оборачивает приложение в <BrowserRouter>.
 *
 * @module PageRouter
 */

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/LoginPage.jsx";
import UserPage from "../../pages/UserPage/UserPage.jsx";
import HomePage from "../../pages/HomePage/HomePage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage.jsx";

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
         * Оборачивает все маршруты в BrowserRouter для поддержки истории переходов.
         * Маршруты:
         * - "/login"     — страница авторизации (LoginPage)
         * - "/register"  — страница регистрации (RegisterPage)
         * - "/"          — главная страница (HomePage)
         * - "/user/:id"  — страница профиля пользователя (UserPage)
         */
        <BrowserRouter>
            <div>
                <Routes>
                    {/* Страница входа. onLogin пробрасывается для дальнейшей авторизации. */}
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    
                    {/* Страница регистрации. onLogin пробрасывается для автоматического входа после регистрации. */}
                    <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
                    
                    {/* Главная страница. Передаём user и onLogout для отображения профиля и выхода. */}
                    <Route path="/" element={<HomePage user={user} onLogout={handleLogout} />} />
                    
                    {/* Страница пользователя. Передаём user для отображения информации о текущем пользователе. */}
                    <Route path="/user/:id" element={<UserPage user={user} />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default PageRouter;
