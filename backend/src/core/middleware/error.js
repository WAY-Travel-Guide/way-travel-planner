import { logger } from '../logger.js';
import { sendError } from '../../utils/response.js';

const errorMiddleware = (err, req, res, next) => {
    // Логируем ошибку с информацией о запросе
    logger.error(`Error in ${req.method} ${req.originalUrl}: ${err.message}`);

    // Обработка различных типов ошибок
    if (err.name === 'ValidationError') {
        // Ошибки валидации от Mongoose (для user module)
        return sendError(res, 400, `Validation error: ${err.message}`);
    }

    if (err.name === 'SequelizeValidationError') {
        // Ошибки валидации от Sequelize (для geo-data module)
        const errors = err.errors.map(e => e.message).join(', ');
        return sendError(res, 400, `Validation error: ${errors}`);
    }

    if (err.name === 'JsonWebTokenError') {
        // Ошибки JWT (например, неверный токен)
        return sendError(res, 401, 'Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        // Истёкший JWT токен
        return sendError(res, 401, 'Token expired');
    }

    // Общие ошибки
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    sendError(res, statusCode, message);
};

export { errorMiddleware };