import { Sequelize } from 'sequelize';
import { config } from './index.js';
import { logger } from '../core/logger.js';

const sequelizeGeoDB = new Sequelize(config.postgresUriGeodb, {
    dialect: 'postgres',
    logging: msg => logger.debug('[GEO] ' + msg),
    define: {
        underscored: true,
        timestamps: false,
    },
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
});

const sequelizeUserDB = new Sequelize(config.postgresUriUserdb, {
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

const connectGeoDB = async () => {
    try {
        await sequelizeGeoDB.authenticate();
        logger.info('Geo database (PostGIS) connected');
    } catch (err) {
        logger.error('Geo DB connection failed:', err.message);
        process.exit(1);
    }
};

const connectUserDB = async () => {
    try {
        await sequelizeUserDB.authenticate();
        logger.info('User database connected');

        // Создаём/обновляем только таблицы пользователей и ролей
        if (config.node === 'development') {
            await sequelizeUserDB.sync({ alter: true });
            logger.info('User tables synced with { alter: true } (dev)');
        } else {
            await sequelizeUserDB.sync();
            logger.info('User tables checked (no changes in prod)');
        }

    } catch (err) {
        logger.error('User DB connection/sync failed:', err);
        process.exit(1);
    }
};

// Инициализация всех баз
const initializeDatabases = async () => {
    await Promise.all([connectGeoDB(), connectUserDB()]);
    logger.info('All databases (Geo + Auth) initialized successfully');
};

export { initializeDatabases };
export { config };
export { sequelizeGeoDB, sequelizeUserDB };
