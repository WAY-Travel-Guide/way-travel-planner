import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User, Role } from './model.js';
import { logger } from '../../core/logger.js';
import config from '../../config/index.js';

class GoogleAuthService {
    constructor() {
        this.client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
            process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret'
        );
    }

    /**
     * Верифицирует Google ID токен и возвращает данные пользователя
     * @param {string} idToken - Google ID токен
     * @returns {Object} Данные пользователя от Google
     */
    async verifyGoogleToken(idToken) {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id'
            });

            const payload = ticket.getPayload();
            return {
                googleId: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                emailVerified: payload.email_verified
            };
        } catch (error) {
            logger.error('Error verifying Google token:', error);
            throw new Error('Неверный Google токен');
        }
    }

    /**
     * Создает или находит пользователя по Google данным
     * @param {Object} googleUser - Данные пользователя от Google
     * @returns {Object} Данные пользователя и JWT токен
     */
    async authenticateGoogleUser(googleUser) {
        try {
            // Ищем пользователя по Google ID или email
            let user = await User.findOne({
                $or: [
                    { googleId: googleUser.googleId },
                    { email: googleUser.email }
                ]
            });

            if (!user) {
                // Создаем нового пользователя
                const userRole = await Role.findOne({ value: 'User' }) || (await Role.create({ value: 'User' }));
                
                user = new User({
                    login: googleUser.email.split('@')[0], // Используем часть email как логин
                    email: googleUser.email,
                    name: googleUser.name,
                    googleId: googleUser.googleId,
                    emailVerified: googleUser.emailVerified,
                    roles: [userRole.value],
                    password: null // У Google пользователей нет пароля
                });

                await user.save();
                logger.info(`New Google user created: ${user.login}`);
            } else {
                // Обновляем существующего пользователя
                if (!user.googleId) {
                    user.googleId = googleUser.googleId;
                }
                if (!user.name) {
                    user.name = googleUser.name;
                }
                if (googleUser.emailVerified) {
                    user.emailVerified = true;
                }
                
                await user.save();
                logger.info(`Google user updated: ${user.login}`);
            }

            // Создаем JWT токен
            const token = jwt.sign(
                { id: user._id, roles: user.roles }, 
                config.secret, 
                { expiresIn: '24h' }
            );

            return {
                id: user._id,
                login: user.login,
                email: user.email,
                name: user.name,
                emailVerified: user.emailVerified,
                token
            };
        } catch (error) {
            logger.error('Error authenticating Google user:', error);
            throw new Error('Ошибка аутентификации через Google');
        }
    }

    /**
     * Полный процесс аутентификации через Google
     * @param {string} idToken - Google ID токен
     * @returns {Object} Данные пользователя и JWT токен
     */
    async authenticateWithGoogle(idToken) {
        const googleUser = await this.verifyGoogleToken(idToken);
        return await this.authenticateGoogleUser(googleUser);
    }
}

const googleAuthService = new GoogleAuthService();
export { googleAuthService };
