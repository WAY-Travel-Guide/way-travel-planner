import express from 'express';
import { userController } from './controller.js';
import { validateRegisterUser, validateLoginUser, validateLoginEmail, validateDeleteUser } from './validations.js';
import { roleMiddleware } from '../../core/middleware/role.js';

const userRoutes = express.Router();

// POST /api/users/register - Регистрация пользователя
userRoutes.post('/register', validateRegisterUser, userController.registerUser);

// POST /api/users/login - Авторизация пользователя
userRoutes.post('/login', validateLoginUser, userController.checkUser);

// POST /api/users/login-email - Авторизация пользователя по email
userRoutes.post('/login-email', validateLoginEmail, userController.checkUserByEmail);

// GET /api/users - Получение списка пользователей (только для админов)
userRoutes.get('/', roleMiddleware(['Admin']), userController.getAllUsers);

// POST /api/users/delete - Удаление пользователя
userRoutes.post('/delete', roleMiddleware(['Admin']), validateDeleteUser, userController.deleteUser);

// GET /api/users/confirm-email/:token - Подтверждение email
userRoutes.get('/confirm-email/:token', userController.confirmEmail);

// POST /api/users/request-password-reset - Запрос восстановления пароля
userRoutes.post('/request-password-reset', userController.requestPasswordReset);

// POST /api/users/reset-password/:token - Восстановление пароля
userRoutes.post('/reset-password/:token', userController.resetPassword);

// POST /api/users/google-auth - Аутентификация через Google
userRoutes.post('/google-auth', userController.googleAuth);

export { userRoutes };