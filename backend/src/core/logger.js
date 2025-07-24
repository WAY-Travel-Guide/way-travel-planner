import winston from 'winston';
import config from '../config/index.js'; // Конфигурация окружения

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

// Транспорты (куда писать логи)
const transports = [
    // Логи в консоль
    new winston.transports.Console({
        level: config.logLevel || 'info', // Уровень логирования из конфигурации
    }),
    // Логи в файл для ошибок
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5, // Хранить до 5 файлов
    }),
    // Логи в файл для всех событий
    new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'info',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    }),
];

// Создание логгера
const logger = winston.createLogger({
    levels,
    format,
    transports,
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