import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User, Role } from './model.js';
import { logger } from '../../core/logger.js';
import config from '../../config/index.js';
import { emailService } from './emailService.js';

class UserService {
    async registerUser({ login, email, password }) {
        // Проверяем существование пользователя по логину
        const existingUserByLogin = await User.findOne({ login });
        if (existingUserByLogin) {
            throw new Error('Пользователь с таким логином уже существует');
        }

        // Проверяем существование пользователя по email
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            throw new Error('Пользователь с таким email уже существует');
        }

        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ value: 'User' }) || (await Role.create({ value: 'User' }));
        
        // Генерируем токен для подтверждения email
        const emailVerificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = new User({ 
            login, 
            email, 
            password: hashPassword, 
            emailVerificationToken,
            roles: [userRole.value] 
        });
        await newUser.save();

        // Отправляем письмо с подтверждением
        try {
            await emailService.sendConfirmationEmail(email, emailVerificationToken, login);
        } catch (error) {
            logger.error('Failed to send confirmation email:', error);
            // Не блокируем регистрацию, если не удалось отправить email
        }

        const token = jwt.sign({ id: newUser._id, roles: newUser.roles }, config.secret, { expiresIn: '24h' });
        logger.info(`Registered user: ${login} with email: ${email}`);
        return { 
            id: newUser._id, 
            login: newUser.login, 
            email: newUser.email, 
            emailVerified: newUser.emailVerified,
            token 
        };
    }

    async checkUser({ login, password }) {
        const user = await User.findOne({ login });
        if (!user) {
        throw new Error('Пользователь с таким логином не найден');
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
        throw new Error('Введён неверный пароль');
        }

        const token = jwt.sign({ id: user._id, roles: user.roles }, config.secret, { expiresIn: '24h' });
        logger.info(`User logged in: ${login}`);
        return { id: user._id, login: user.login, email: user.email, token };
    }

    async checkUserByEmail({ email, password }) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Пользователь с таким email не найден');
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            throw new Error('Введён неверный пароль');
        }

        const token = jwt.sign({ id: user._id, roles: user.roles }, config.secret, { expiresIn: '24h' });
        logger.info(`User logged in by email: ${email}`);
        return { id: user._id, login: user.login, email: user.email, token };
    }

    async getAllUsers() {
        const users = await User.find();
        logger.info(`Fetched ${users.length} users`);
        return users;
    }

    async deleteUser({ login, userId }) {
        const user = await User.findOne({ login });
        if (!user) {
        throw new Error('Пользователь с таким логином не найден');
        }

        if (user._id.toString() !== userId) {
        throw new Error('Недостаточно прав для удаления');
        }

        await User.deleteOne({ login });
        logger.info(`Deleted user: ${login}`);
        return { message: 'Пользователь успешно удалён' };
    }

    async confirmEmail(token) {
        const user = await User.findOne({ emailVerificationToken: token });
        if (!user) {
            throw new Error('Неверный токен подтверждения');
        }

        user.emailVerified = true;
        user.emailVerificationToken = undefined;
        await user.save();

        logger.info(`Email confirmed for user: ${user.login}`);
        return { message: 'Email успешно подтвержден' };
    }

    async requestPasswordReset(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Пользователь с таким email не найден');
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 час
        await user.save();

        try {
            await emailService.sendPasswordResetEmail(email, resetToken, user.login);
        } catch (error) {
            logger.error('Failed to send password reset email:', error);
            throw new Error('Не удалось отправить письмо восстановления пароля');
        }

        logger.info(`Password reset requested for user: ${user.login}`);
        return { message: 'Письмо с инструкциями отправлено на ваш email' };
    }

    async resetPassword(token, newPassword) {
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: new Date() }
        });

        if (!user) {
            throw new Error('Неверный или истекший токен восстановления');
        }

        user.password = bcrypt.hashSync(newPassword, 7);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        logger.info(`Password reset for user: ${user.login}`);
        return { message: 'Пароль успешно изменен' };
    }
}

const userService = new UserService();
export { userService };