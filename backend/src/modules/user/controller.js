import { userService } from './service/userService.js';
import { logger } from '../../core/logger.js';
import { sendSuccess, sendError } from '../../utils/response.js';

// Контроллер пользователей
class UserController {

    // Регистрация пользователя
    async registerUser(req, res) {
        try {
            const result = await userService.registerUser(req.body);
            sendSuccess(res, result, 201);
        } catch (err) {
            logger.error(`Error registering user: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }

    // Аутентификация пользователя
    async checkUser(req, res) {
        try {
            const result = await userService.checkUser(req.body);
            sendSuccess(res, result);
        } catch (err) {
            logger.error(`Error logging in user: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }

    // Аутентификация пользователя по email
    async checkUserByEmail(req, res) {
        try {
            const result = await userService.checkUserByEmail(req.body);
            sendSuccess(res, result);
        } catch (err) {
            logger.error(`Error logging in user by email: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }

    // Получение всех пользователей
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            sendSuccess(res, users);
        } catch (err) {
            logger.error(`Error fetching users: ${err.message}`);
            sendError(res, 500, 'Ошибка сервера');
        }
    }

    // Удаление пользователя
    async deleteUser(req, res) {
        try {
            const result = await userService.deleteUser({ ...req.body, userId: req.user.id });
            sendSuccess(res, result);
        } catch (err) {
            logger.error(`Error deleting user: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }
}

const userController = new UserController();

export { userController };