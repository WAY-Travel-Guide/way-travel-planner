// config/database.js
import { Sequelize } from 'sequelize';
import { config } from './index.js';
import { logger } from '../core/logger.js';

// 1. БД с геоданными (у тебя уже есть)
export const sequelizeGeo = new Sequelize(config.postgresUriGeodb, {
    dialect: 'postgres',
    logging: msg => logger.debug('[GEO] ' + msg),
    define: {
        underscored: true,
        timestamps: false, // у тебя геоданные обычно без timestamps
    },
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
});

// 2. Отдельная БД для пользователей и авторизации
export const sequelizeAuth = new Sequelize(config.postgresUriUserdb, {
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

// Подключение и синхронизация каждой БД отдельно
const connectGeo = async () => {
    try {
        await sequelizeGeo.authenticate();
        logger.info('Geo database (PostGIS) connected');
    } catch (err) {
        logger.error('Geo DB connection failed:', err.message);
        process.exit(1);
    }
};

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
        logger.error('Auth DB connection/sync failed:', err.message);
        process.exit(1);
    }
};

// Инициализация всех баз
export const initializeDatabases = async () => {
    await Promise.all([connectGeo(), connectAuth()]);
    logger.info('All databases (Geo + Auth) initialized successfully');
};