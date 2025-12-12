import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { UserModel, RoleModel } from '../models/UserModel.js'; // Правильный импорт
import { logger } from '../../../core/logger.js';
import config from '../../../config/index.js';
import { emailService } from './emailService.js';
import { Op } from 'sequelize';

class UserService {
    async registerUser({ login, email, password }) {
        // Проверка на уникальность (уже проверяется в middleware, но дублируем для надёжности)
        const existingUser = await UserModel.findOne({
            where: {
                [Op.or]: [{ login }, { email }]
            }
        });

        if (existingUser) {
            if (existingUser.login === login) {
                throw new Error('Пользователь с таким логином уже существует');
            }
            if (existingUser.email === email) {
                throw new Error('Пользователь с таким email уже существует');
            }
        }

        const hashPassword = bcrypt.hashSync(password, 7);

        // Убедимся, что роль "User" существует
        let userRole = await RoleModel.findOne({ where: { value: 'User' } });
        if (!userRole) {
            userRole = await RoleModel.create({ value: 'User' });
            logger.info('Создана роль по умолчанию: User');
        }

        // Генерация токена подтверждения email
        const emailVerificationToken = crypto.randomBytes(32).toString('hex');

        // Создание пользователя
        const newUser = await UserModel.create({
            login,
            email,
            password: hashPassword,
            emailVerificationToken,
        });

        // Роль назначается через отдельную связь (если many-to-many) или напрямую
        // Здесь предполагаем, что у тебя будет отдельная таблица user_roles (many-to-many)
        // Если нет — можно хранить как JSONB или строку. Ниже — два варианта:

        // Вариант 1: Если roles — это JSONB или строка (не рекомендую)
        // await newUser.update({ roles: ['User'] });

        // Вариант 2: Правильный — через ассоциации (рекомендуется)
        // Убедись, что в модели определена связь: UserModel.belongsToMany(RoleModel, { through: 'user_roles' })
        // await newUser.addRole(userRole); // Sequelize метод

        // Пока оставлю как есть — если нужно, добавишь ассоциации позже

        try {
            await emailService.sendConfirmationEmail(email, emailVerificationToken, login);
        } catch (error) {
            logger.error('Failed to send confirmation email:', error);
            // Не прерываем регистрацию
        }

        const token = jwt.sign(
            { id: newUser.id, roles: ['User'] }, // роли пока хардкодим, потом через ассоциации
            config.secret,
            { expiresIn: '24h' }
        );

        logger.info(`Registered user: ${login} | email: ${email} | id: ${newUser.id}`);

        return {
            id: newUser.id,
            login: newUser.login,
            email: newUser.email,
            emailVerified: newUser.emailVerified,
            token
        };
    }

    async checkUser({ login, password }) {
        const user = await UserModel.findOne({ where: { login } });
        if (!user) {
            throw new Error('Пользователь с таким логином не найден');
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw new Error('Введён неверный пароль');
        }

        const token = jwt.sign(
            { id: user.id, roles: ['User'] }, // потом заменить на реальные роли
            config.secret,
            { expiresIn: '24h' }
        );

        logger.info(`User logged in: ${login} (id: ${user.id})`);
        return {
            id: user.id,
            login: user.login,
            email: user.email,
            token
        };
    }

    async checkUserByEmail({ email, password }) {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            throw new Error('Пользователь с таким email не найден');
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw new Error('Введён неверный пароль');
        }

        const token = jwt.sign(
            { id: user.id, roles: ['User'] },
            config.secret,
            { expiresIn: '24h' }
        );

        logger.info(`User logged in by email: ${email} (id: ${user.id})`);
        return {
            id: user.id,
            login: user.login,
            email: user.email,
            token
        };
    }

    async getAllUsers() {
        const users = await UserModel.findAll({
            attributes: ['id', 'login', 'email', 'emailVerified', 'createdAt', 'updatedAt'],
            // include: [{ model: RoleModel, through: { attributes: [] } }] // если есть связь
        });

        logger.info(`Fetched ${users.length} users`);
        return users;
    }

    async deleteUser({ login, userId }) {
        const user = await UserModel.findOne({ where: { login } });
        if (!user) {
            throw new Error('Пользователь с таким логином не найден');
        }

        if (user.id.toString() !== userId) {
            throw new Error('Недостаточно прав для удаления');
        }

        await user.destroy();
        logger.info(`Deleted user: ${login} (id: ${user.id})`);

        return { message: 'Пользователь успешно удалён' };
    }
}

const userService = new UserService();
export { userService };