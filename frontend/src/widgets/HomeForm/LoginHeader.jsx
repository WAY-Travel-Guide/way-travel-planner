/**
 * @fileoverview
 * Компонент шапки входа/регистрации для главной страницы.
 * Отображает две кнопки: "Вход" и "Регистрация", которые ведут на соответствующие маршруты.
 *
 * @description
 * LoginHeader — React-компонент, отображающий две навигационные кнопки для перехода на страницы логина и регистрации.
 * Использует кастомный компонент Button (оранжевая кнопка) из UI-библиотеки приложения.
 * Используется, например, в HomeWidget на главной странице.
 *
 * @module LoginHeader
 */

import { useNavigate } from "react-router-dom";
import Button from "../../shared/ui/OrangeButton/OrangeButton.jsx";

/**
 * Компонент для отображения кнопок "Вход" и "Регистрация".
 * Использует flex-контейнер для горизонтального расположения кнопок.
 *
 * @returns {JSX.Element}  - Контейнер с двумя кнопками для навигации.
 */
const LoginHeader = function() {
    const navigate = useNavigate();
    return (
        <div style={{
            display: "flex",
            flexDirection: "row", // Кнопки расположены по горизонтали
            alignItems: "center",
            gap: "70px" // Расстояние между кнопками
        }}>
            <Button onClick={() => navigate("/login")} >
                Вход
            </Button>
            <Button onClick={() => navigate("/register")} >
                Регистрация
            </Button>
        </div>
    );
}

export default LoginHeader;
