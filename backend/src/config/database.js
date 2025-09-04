import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import config from './index.js'; // Конфигурация окружения
import { logger } from '../core/logger.js'; // Логирование

// Подключение к MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Таймаут подключения 5 секунд
        bufferCommands: false, // Отключение буферизации команд
        });
        logger.info('MongoDB connected successfully');
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        process.exit(1); // Завершение процесса при ошибке
    }

    // Логирование событий подключения MongoDB
    mongoose.connection
        .on('connecting', () => logger.debug('MongoDB: connecting'))
        .on('connected', () => logger.debug('MongoDB: connected'))
        .on('error', (err) => logger.error(`MongoDB error: ${err.message}`))
        .on('disconnected', () => logger.warn('MongoDB: disconnected'));
};

// Подключение к PostgreSQL/PostGIS
const sequelize = new Sequelize(config.postgresUri, {
    dialect: 'postgres',
    logging: (msg) => logger.debug(msg), // Логирование SQL-запросов
    define: {
        timestamps: true,
        underscored: true
    }
});

const connectPostgres = async () => {
    try {
        await sequelize.authenticate();
        logger.info('PostgreSQL connected successfully');
    } catch (error) {
        logger.error(`PostgreSQL connection error: ${error.message}`);
        process.exit(1); // Завершение процесса при ошибке
    }
};

// Инициализация всех баз данных
const initializeDatabases = async () => {
    try {
        await Promise.all([connectMongoDB(), connectPostgres()]);
        logger.info('All databases initialized successfully');
    } catch (error) {
        logger.error(`Database initialization failed: ${error.message}`);
        process.exit(1);
    }
};

// Экспорт объектов для использования в модулях
export {
  mongoose, // Для работы с MongoDB в User Module
  sequelize, // Для работы с PostgreSQL/PostGIS в Geo Data Module
  initializeDatabases, // Функция для инициализации подключений
};