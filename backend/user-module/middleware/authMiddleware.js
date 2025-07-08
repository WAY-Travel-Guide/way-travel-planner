/**
 * @file authMiddleware.js
 * @brief Express-middleware для проверки JWT-токена (авторизации пользователя).
 *
 * @description
 * - Проверяет наличие заголовка Authorization: Bearer <JWT>.
 * - Проверяет валидность JWT (подпись, срок действия).
 * - Если токен валиден — добавляет данные пользователя в req.user и пускает дальше.
 * - Если нет токена или он невалиден — возвращает 403 Forbidden.
 *
 * @usage
 * // Только авторизованные пользователи могут получить список всех пользователей:
 * UserRouter.get('/users', authMiddleware, UserController.getAllUsers);
 */

import jwt from "jsonwebtoken";
import { secret } from "../controllers/config.js";

/**
 * @function authMiddleware
 * @param {Request} req - Объект запроса Express
 * @param {Response} res - Объект ответа Express
 * @param {Function} next - Функция для перехода к следующему middleware/обработчику
 */
export default function (req, res, next) {
    // Пропускаем preflight-запросы CORS
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        // Проверяем наличие заголовка Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ message: "Пользователь не авторизован." });
        }

        // Извлекаем сам токен (формат: "Bearer <token>")
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "Пользователь не авторизован." });
        }

        // Проверяем токен
        const decodedData = jwt.verify(token, secret);

        // Добавляем данные пользователя в req.user (можно использовать дальше в обработчиках)
        req.user = decodedData;

        // Всё ок, пропускаем дальше
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Пользователь не авторизован." });
    }
}
