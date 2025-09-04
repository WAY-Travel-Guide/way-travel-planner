import { userService } from './service.js';
import { googleAuthService } from './googleAuthService.js';
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

    async checkUserByEmail(req, res) {
        try {
            const result = await userService.checkUserByEmail(req.body);
            sendSuccess(res, result);
        } catch (err) {
            logger.error(`Error logging in user by email: ${err.message}`);
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

    async confirmEmail(req, res) {
        try {
            const { token } = req.params;
            const result = await userService.confirmEmail(token);
            sendSuccess(res, result);
        } catch (err) {
            logger.error(`Error confirming email: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }

    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;
            const result = await userService.requestPasswordReset(email);
            sendSuccess(res, result);
        } catch (err) {
            logger.error(`Error requesting password reset: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }

    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const result = await userService.resetPassword(token, password);
            sendSuccess(res, result);
        } catch (err) {
            logger.error(`Error resetting password: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }

    async googleAuth(req, res) {
        try {
            const { idToken } = req.body;
            if (!idToken) {
                return sendError(res, 400, 'Google ID токен обязателен');
            }

            const result = await googleAuthService.authenticateWithGoogle(idToken);
            sendSuccess(res, result);
        } catch (err) {
            logger.error(`Error with Google authentication: ${err.message}`);
            sendError(res, 400, err.message);
        }
    }
}

const userController = new UserController();
export { userController };