/*
* @file UserRouter.js
* @brief Роутер для обработки HTTP-запросов, связанных с пользователями.
*        Включает маршруты авторизации, регистрации и получения списка пользователей.
*/

import { Router } from "express";                        // Импортируем Router из Express
import UserController from "../controllers/UserController.js"; // Импортируем контроллер пользователей

/*
* @const UserRouter
* @brief Экземпляр роутера Express для маршрутов пользователей.
*/
const UserRouter = new Router();

/*
* @route POST /login
* @brief Маршрут для авторизации пользователя.
*        Обрабатывает запросы на вход (логин).
*/
UserRouter.post('/login', UserController.checkUser);

/*
* @route POST /register
* @brief Маршрут для регистрации нового пользователя.
*/
UserRouter.post('/register', UserController.registerUser);

/*
* @route GET /users
* @brief Маршрут для получения списка всех пользователей.
*/
UserRouter.get('/users', UserController.getAllUsers);

/*
* @route GET /deluser
* @brief Маршрут для удаления пользователя.
*/
UserRouter.post('/deluser', UserController.deleteUser);

// Экспортируем роутер пользователей для использования в основном приложении
export default UserRouter;
