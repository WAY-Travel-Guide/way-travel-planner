import express from'express';
import { initializeDatabases } from'./config/database.js';
import config from'./config/index.js';
import { logger, requestLogger } from'./core/logger.js';
import { errorMiddleware } from './core/middleware/error.js';
import { userRoutes } from'./modules/user/routes.js';
import { geoDataRoutes } from'./modules/geo-data/routes.js';
//import { routingRoutes } from'./modules/routing/routes.js';

const app = express();

app.use(express.json());
app.use(requestLogger);

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.use('/users', userRoutes);
apiRouter.use('/places', geoDataRoutes);
//apiRouter.use('/routes', routingRoutes);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await initializeDatabases();
    app.listen(config.port || 5000, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();