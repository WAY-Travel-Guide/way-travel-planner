/**
 * @fileoverview roleMiddleware.js
 * @description Express-middleware для проверки JWT и наличия нужных ролей у пользователя.
 *
 * @param {Array<string>} roles - Список ролей, которым разрешён доступ к маршруту (например, ['Admin', 'Moderator']).
 * @returns {function} Middleware-функция для Express.
 *
 * @usage
 * // Только администраторы могут получить список всех пользователей:
 * UserRouter.get('/users', roleMiddleware(['Admin']), UserController.getAllUsers);
 *
 * @description
 * - Проверяет наличие заголовка Authorization: Bearer <JWT>.
 * - Проверяет валидность JWT (подпись, срок действия).
 * - Проверяет, что у пользователя в JWT есть хотя бы одна из указанных ролей.
 * - Если проверки не пройдены, возвращает 403 Forbidden и сообщение.
 * - Если всё ок, добавляет req.user с данными из JWT и пускает дальше.
 */

import jwt from "jsonwebtoken";
import { secret } from "../controllers/config.js";

/**
 * @function roleMiddleware
 * @param {Array<string>} roles - Массив разрешённых ролей
 * @returns {function} Express middleware для проверки ролей пользователя через JWT
 */
export default function (roles) {
    return function (req, res, next) {
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

            // Декодируем и проверяем токен
            const decoded = jwt.verify(token, secret);
            // console.log("decoded JWT:", decoded);

            const { roles: userRoles } = decoded;
            let hasRole = false;

            // Проверяем, есть ли у пользователя хотя бы одна из нужных ролей
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });

            // Если нет нужной роли — запрещаем доступ
            if (!hasRole) {
                return res.status(403).json({ message: "Доступ запрещен." });
            }

            // Всё ок, пропускаем дальше
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({ message: "Пользователь не авторизован." });
        }
    }
}
