import winston from 'winston';
import {config} from '../config/index.js'; // Конфигурация окружения

// Определение уровней логирования
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Определение цветов для уровней логирования
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

// Формат логов
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Добавление временной метки
    winston.format.colorize(), // Цвета для консоли
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

const logger = winston.createLogger({
    levels,
    level: 'info',
    format,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error', maxsize: 5242880, maxFiles: 5 }),
        new winston.transports.File({ filename: 'logs/combined.log', level: 'info', maxsize: 5242880, maxFiles: 5 }),
    ],
});

// Middleware для логирования HTTP-запросов
const requestLogger = (req, res, next) => {
    const { method, url } = req;
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.http(`${method} ${url} ${res.statusCode} ${duration}ms`);
    });
    next();
};

export {
  logger, // Основной логгер для использования в других модулях
  requestLogger, // Middleware для логирования запросов
};