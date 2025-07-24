import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Role } from './model.js';
import { logger } from '../../core/logger.js';
import config from '../../config/index.js';

class UserService {
    async registerUser({ login, password }) {
        const existingUser = await User.findOne({ login });
        if (existingUser) {
        throw new Error('Пользователь с таким логином уже существует');
        }

        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ value: 'User' }) || (await Role.create({ value: 'User' }));

        const newUser = new User({ login, password: hashPassword, roles: [userRole.value] });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, roles: newUser.roles }, config.secret, { expiresIn: '24h' });
        logger.info(`Registered user: ${login}`);
        return { id: newUser._id, login: newUser.login, token };
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
        return { id: user._id, login: user.login, token };
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
}

const userService = new UserService();
export { userService };