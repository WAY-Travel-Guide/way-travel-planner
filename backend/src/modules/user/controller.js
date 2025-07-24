import { userService } from './service.js';
import { logger } from '../../core/logger.js';
import { sendSuccess, sendError } from '../../utils/response.js';

class UserController {
    async registerUser(req, res) {
        try {
            const result = await userService.registerUser(req.body);
            sendSuccess(res, result, 201);
        } catch (err) {
            logger.error(`Error registering user: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }

    async checkUser(req, res) {
        try {
            const result = await userService.checkUser(req.body);
            sendSuccess(res, result);
        } catch (err) {
            logger.error(`Error logging in user: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            sendSuccess(res, users);
        } catch (err) {
            logger.error(`Error fetching users: ${err.message}`);
            sendError(res, 500, 'Ошибка сервера');
        }
    }

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