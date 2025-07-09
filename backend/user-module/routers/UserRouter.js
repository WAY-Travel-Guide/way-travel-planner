/**
* @fileoverview UserRouter.js
* @description Роутер для обработки HTTP-запросов, связанных с пользователями.
*        Включает маршруты авторизации, регистрации и получения списка пользователей.
*/

import { Router } from "express";                        // Импортируем Router из Express
import UserController from "../controllers/UserController.js"; // Импортируем контроллер пользователей
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

/**
* @const UserRouter
* @description Экземпляр роутера Express для маршрутов пользователей.
*/
const UserRouter = new Router();

/**
* @route POST /login
* @description Маршрут для авторизации пользователя.
*        Обрабатывает запросы на вход (логин).
*/
UserRouter.post('/login', UserController.checkUser);

/**
* @route POST /register
* @description Маршрут для регистрации нового пользователя.
*/
UserRouter.post('/register', UserController.registerUser);

/**
* @route   GET /users
* @description   Маршрут для получения списка всех пользователей.
* @access  Только для пользователей с ролью "Admin" (доступ защищён JWT и middleware ролей)
*
* @middleware
*   - roleMiddleware(['Admin']) — проверяет, что у пользователя есть роль 'Admin' (JWT обязателен)
*
* @controller
*   - UserController.getAllUsers — возвращает массив всех пользователей из базы данных
*/
UserRouter.get(
  '/users',
  roleMiddleware(['Admin']), // Middleware для проверки роли
  UserController.getAllUsers // Контроллер для обработки запроса
);

/**
* @route GET /deluser
* @description Маршрут для удаления пользователя.
*/
UserRouter.post('/deluser', UserController.deleteUser);

// Экспортируем роутер пользователей для использования в основном приложении
export default UserRouter;
