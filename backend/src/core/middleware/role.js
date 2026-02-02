import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";
import { logger } from "../logger.js";

// Middleware для проверки ролей пользователя
const roleMiddleware = function (roles) {

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
            const decoded = jwt.verify(token, config.secret);

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

            next();
        } catch (error) {

            logger.info(error);
            return res.status(403).json({ message: "Пользователь не авторизован." });
        }
    }
}

export { roleMiddleware };
