/*
* @file UserController.js
* @brief Контроллер для обработки запросов, связанных с пользователями.
*        Реализует регистрацию, авторизацию и получение списка пользователей.
*/

import User from "../models/User.js";  // Импортируем модель пользователя
import Role from "../models/Role.js";
import mongoose from "mongoose";       // Импортируем mongoose для работы с состоянием подключения
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { secret } from "./config.js";

const generateAccessToken = (id, roles) => {
    /*
    * @function generateAccessToken
    * @brief Генерирует JWT-токен для авторизации пользователя.
    * @param id     - Идентификатор пользователя (user._id)
    * @param roles  - Массив ролей пользователя (например, ['Admin', 'User'])
    * @returns      - Подписанный JWT-токен, действительный 24 часа
    *
    * @details
    *   - В payload токена кладутся id и roles пользователя.
    *   - Токен подписывается секретным ключом (secret).
    *   - Токен используется для защиты маршрутов и проверки прав доступа.
    */
    const payload = {
        id,
        roles
    };

    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

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

            /*
            * ХЕШИРОВАНИЕ ПАРОЛЯ (bcrypt)
            *
            * - Никогда не сохраняем пароль в базе в открытом виде!
            * - С помощью bcrypt генерируется защищённый хэш пароля.
            * - Параметр "7" — это число "кругов" (cost factor), влияет на сложность вычисления.
            * - hashPassword будет сохранён в базе вместо исходного пароля.
            */
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "User"});

            // Создаем и сохраняем нового пользователя
            const newUser = new User({ login, password:hashPassword, roles: [userRole.value] });
            await newUser.save();

            // Отправляем успешный ответ
            const token = generateAccessToken(newUser._id, newUser.roles);
            return res.json({
            success: true,
            message: "Регистрация успешно выполнена",
            id: newUser._id,
            login: newUser.login,
            token
            });
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
            const user = await User.findOne({ login });
            if (!user) {
                return res.status(400).json({succes: false, message: "Пользователь с таким логином не найден."});
            }

            /*
            * ПРОВЕРКА ПАРОЛЯ ПРИ АВТОРИЗАЦИИ
            *
            * - Пользователь ищется по логину (user = await User.findOne({ login }))
            * - Пароль не сравнивается напрямую, а сверяется через bcrypt.compareSync:
            *   - password        — введённый пароль пользователя
            *   - user.password   — захешированный пароль из базы
            * - bcrypt.compareSync возвращает true, если пароль совпадает с хэшем.
            */
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({success: false, message: "Введен неверный пароль."});
            }

            // Если пользователь найден, авторизация успешна
            if (user) {
                /*
                * СОЗДАНИЕ JWT ПОСЛЕ АВТОРИЗАЦИИ
                *
                * - После успешной проверки пароля генерируется JWT-токен.
                * - В токен помещается user._id и user.roles (payload).
                * - Токен подписывается секретом и отправляется клиенту для последующих авторизованных запросов.
                */
                const token = generateAccessToken(user._id, user.roles);
                return res.json({
                    success: true,
                    message: "Вход успешно выполнен",
                    id: user._id,
                    login: user.login,
                    token,
                });
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

            // Сохранение ролей в схеме Role
            // const userRole = new Role();
            // const adminRole = new Role({value: "Admin"});
            // await userRole.save();
            // await adminRole.save();

            return res.json(users);
        } catch (error) {
            // Логируем ошибку и отправляем ответ с ошибкой сервера
            console.log(error);
            res.status(500).json(error);
        }
    }

    /*
    * @function deleteUser
    * @brief Удаляет пользователя.
    * @param req HTTP-запрос
    * @param res HTTP-ответ
    */
    async deleteUser(req, res) {
        try {
            const { login, password } = req.body;
            console.log("POST /api/deluser:", req.body);

            // Проверка наличия логина и пароля в запросе
            if (!login || !password) {
                return res.status(400).json({ success: false, message: "Логин и пароль обязательны" });
            }

            // Ищем пользователя с заданным логином и паролем в базе
            const user = await User.findOne({ login, password });

            if (user) {
                await User.deleteOne( {login, password} );
                return res.json("Пользователь успешно удален.");
            }
            else {
                return res.json("Пользователя нет в системе.");
            }
            
        } catch (error) {
            // Логируем ошибку и отправляем ответ с ошибкой сервера
            console.log(error);
            res.status(500).json(error);
        }
    }
}

// Экспортируем экземпляр контроллера
export default new UserController();
