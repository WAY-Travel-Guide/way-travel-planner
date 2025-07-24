import express from 'express';
import { userController } from './controller.js';
import { validateRegisterUser, validateLoginUser, validateDeleteUser } from './validations.js';
import { roleMiddleware } from '../../core/middleware/role.js';

const userRoutes = express.Router();

// POST /api/users/register - Регистрация пользователя
userRoutes.post('/register', validateRegisterUser, userController.registerUser);

// POST /api/users/login - Авторизация пользователя
userRoutes.post('/login', validateLoginUser, userController.checkUser);

// GET /api/users - Получение списка пользователей (только для админов)
userRoutes.get('/', roleMiddleware(['Admin']), userController.getAllUsers);

// POST /api/users/delete - Удаление пользователя
userRoutes.post('/delete', roleMiddleware(['Admin']), validateDeleteUser, userController.deleteUser);

export { userRoutes };