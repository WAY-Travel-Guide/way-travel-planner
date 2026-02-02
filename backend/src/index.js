import express from'express';
import { initializeDatabases } from'./config/database.js';
import {config} from'./config/index.js';
import { logger, requestLogger } from'./core/logger.js';
import { errorMiddleware } from './core/middleware/error.js';
import { userRoutes } from'./modules/user/routes.js';
import { geoDataRoutes } from'./modules/geo-data/routes.js';

// Инициализация приложения через Express
const app = express();

app.use(express.json());
app.use(requestLogger);

// Подключение маршрутов в API
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Маршруты модулей
apiRouter.use('/users', userRoutes);
apiRouter.use('/geo-data', geoDataRoutes);

// Глобальный обработчик ошибок
app.use(errorMiddleware);


// Запуск сервера после инициализации баз данных
const startServer = async () => {
  try {
    await initializeDatabases();
    app.listen(config.port || 5000, () => {
      logger.info(`Сервер запущен на порту ${config.port}`);
    });
  } catch (error) {
    logger.error(`Ошибка при запуске сервера: ${error.message}`);
    process.exit(1);
  }
};

startServer();