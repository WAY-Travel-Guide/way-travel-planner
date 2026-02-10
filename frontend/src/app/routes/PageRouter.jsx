import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../../pages";
import { EmailLoginPage } from "../../pages";
import { HomePage } from "../../pages";
import { RegisterPage } from "../../pages";
import { Filters } from "../Filters.jsx";

const PageRouter = function({ handleLogin }) {
    return (

        // Настройка маршрутов приложения
        <Routes>
            {/* Страница входа. onLogin пробрасывается для дальнейшей авторизации. */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    
            {/* Страница входа через email. onLogin пробрасывается для дальнейшей авторизации. */}
            <Route path="/login-email" element={<EmailLoginPage onLogin={handleLogin} />} />
                    
            {/* Страница регистрации. onLogin пробрасывается для автоматического входа после регистрации. */}
            <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
                    
            {/* Главная страница. Передаём user и onLogout для отображения профиля и выхода. */}
            <Route path="/" element={<HomePage />} />

            <Route path="/map" element={<Filters />} />
        </Routes>
    )
}

export { PageRouter };
