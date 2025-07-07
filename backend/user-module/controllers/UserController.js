/*
* @file UserController.js
* @brief Контроллер для обработки запросов, связанных с пользователями.
*        Реализует регистрацию, авторизацию и получение списка пользователей.
*/

import User from "../models/User.js";  // Импортируем модель пользователя
import mongoose from "mongoose";       // Импортируем mongoose для работы с состоянием подключения

/*
* @class UserController
* @brief Класс-контроллер для управления пользователями через REST API.
*/
class UserController {

    /*
    * @function registerUser
    * @brief Регистрирует нового пользователя.
    * @param req HTTP-запрос (ожидается login и password в теле)
    * @param res HTTP-ответ
    */
    async registerUser(req, res) {
        // Логируем состояние подключения к базе данных (0 — нет соединения, 1 — подключено)
        console.log("MongoDB readyState:", mongoose.connection.readyState);
        try {
            // Получаем login и password из тела запроса
            const { login, password } = req.body;
            console.log("POST /api/register:", req.body);

            // Проверяем, что поля не пустые
            if (!login || !password) {
                return res.status(400).json({ success: false, message: "Логин и пароль обязательны" });
            }

            // Проверяем, существует ли уже пользователь с таким логином
            const existingUser = await User.findOne({ login });

            // Если найден, выбрасываем ошибку
            if (existingUser) {
                throw new Error("Пользователь с таким логином уже существует");
            }

            // Создаем и сохраняем нового пользователя
            const newUser = new User({ login, password });
            await newUser.save();

            // Отправляем успешный ответ
            res.json({ success: true, message: "Регистрация успешно выполнена", newUser });
        } catch (error) {
            // Логируем ошибку и отправляем ответ с ошибкой
            console.error("Ошибка регистрации:", error);
            res.status(400).json({ success: false, message: error.message || "Ошибка регистрации" });
        }
    }

    /*
    * @function checkUser
    * @brief Проверяет логин и пароль пользователя (авторизация).
    * @param req HTTP-запрос (login и password в теле)
    * @param res HTTP-ответ
    */
    async checkUser(req, res) {
        try {
            // Получаем login и password из тела запроса
            const { login, password } = req.body;
            console.log("POST /api/login:", req.body);

            // Проверка наличия логина и пароля в запросе
            if (!login || !password) {
                return res.status(400).json({ success: false, message: "Логин и пароль обязательны" });
            }

            // Ищем пользователя с заданным логином и паролем в базе
            const user = await User.findOne({ login, password });

            // Если пользователь найден, авторизация успешна
            if (user) {
                res.json({ success: true, message: "Вход успешно выполнен", user });
            } else {
                // Если не найден, отправляем ошибку авторизации
                res.status(401).json({ success: false, message: "Неверный логин или пароль" });
            }
        } catch (error) {
            // Логируем ошибку и отправляем ответ с ошибкой сервера
            console.error("Ошибка авторизации:", error);
            res.status(500).json({ success: false, message: "Ошибка сервера" });
        }
    }

    /*
    * @function getAllUsers
    * @brief Получает список всех пользователей.
    * @param req HTTP-запрос
    * @param res HTTP-ответ
    */
    async getAllUsers(req, res) {
        try {
            // Получаем всех пользователей из базы данных
            const users = await User.find();
            return res.json(users);
        } catch (error) {
            // Логируем ошибку и отправляем ответ с ошибкой сервера
            console.log(error);
            res.status(500).json(error);
        }
    }
}

// Экспортируем экземпляр контроллера
export default new UserController();
