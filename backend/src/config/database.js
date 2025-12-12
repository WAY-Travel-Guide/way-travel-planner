import { Sequelize } from 'sequelize';
import { config } from './index.js';
import { logger } from '../core/logger.js';


const sequelizeAuth = new Sequelize(config.postgresUriUserdb, {
    dialect: 'postgres',
    logging: msg => logger.debug('[AUTH] ' + msg),
    define: {
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
});

const connectAuth = async () => {
    try {
        await sequelizeAuth.authenticate();
        logger.info('Auth database connected');

        // Создаём/обновляем только таблицы пользователей и ролей
        if (process.env.NODE_ENV === 'development') {
            await sequelizeAuth.sync({ alter: true });
            logger.info('Auth tables synced with { alter: true } (dev)');
        } else {
            await sequelizeAuth.sync();
            logger.info('Auth tables checked (no changes in prod)');
        }

    } catch (err) {
        logger.error('Auth DB connection/sync failed:', err);
        process.exit(1);
    }
};

// Инициализация всех баз
const initializeDatabases = async () => {
    await Promise.all([/*connectGeo(),*/ connectAuth()]);
    logger.info('All databases (Geo + Auth) initialized successfully');
};

export {sequelizeAuth, initializeDatabases};
export {config};
