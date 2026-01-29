import { Sequelize } from 'sequelize';
import { config } from './index.js';
import { logger } from '../core/logger.js';

// Инициализация Sequelize для базы геоданных (PostGIS)
const sequelizeGeoDB = new Sequelize(config.postgresUriGeodb, {
    dialect: 'postgres',
    logging: msg => logger.debug('[GEO] ' + msg),           // Логирование SQL-запросов с префиксом [GEO]
    define: {                                               // Общие настройки для всех моделей
        underscored: true,
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 } // Настройки пула соединений
});

// Инициализация Sequelize для базы пользователей
const sequelizeUserDB = new Sequelize(config.postgresUriUserdb, {
    dialect: 'postgres',
    logging: msg => logger.debug('[USER] ' + msg),
    define: {
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
});

// Подключение и проверка базы геоданных
const connectGeoDB = async () => {
    try {
        await sequelizeGeoDB.authenticate();
        logger.info('База геоданных подключена');
    } catch (err) {
        logger.error('Подключение к базе геоданных не удалось:', err.message);
        process.exit(1);
    }
};

// Подключение и синхронизация базы пользователей
const connectUserDB = async () => {
    try {
        await sequelizeUserDB.authenticate();
        logger.info('База пользователей подключена');

        // Создаём/обновляем только таблицы пользователей и ролей
        if (config.node === 'development') {
            await sequelizeUserDB.sync({ alter: true });
            logger.info('Таблицы пользователей синхронизированы { alter: true } (dev)');
        } else {
            await sequelizeUserDB.sync();
            logger.info('Таблицы пользователей синхронизированы { alter: false } (dev)');
        }

    } catch (err) {
        logger.error('Подключение к базе пользователей не удалось:', err);
        process.exit(1);
    }
};

// Инициализация всех баз
const initializeDatabases = async () => {
    await Promise.all([connectGeoDB(), connectUserDB()]);
    logger.info('Подключение ко всем базам данных успешно выполнено');
};

export { initializeDatabases };
export { config };
export { sequelizeGeoDB, sequelizeUserDB };
