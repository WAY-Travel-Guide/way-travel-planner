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
import { DefaultButton } from "../../shared/";

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
            <DefaultButton
            onClick={() => navigate("/login")}
            style={{
                bgColor: "#B95700",
                borderColor: "#B95700",
                textColor: "#ffffff"
            }}>
                Вход
            </DefaultButton>
            <DefaultButton
            onClick={() => navigate("/register")}
            style={{
                bgColor: "#B95700",
                borderColor: "#B95700",
                textColor: "#ffffff"
            }}>
                Регистрация
            </DefaultButton>
        </div>
    );
}

export { LoginHeader };
