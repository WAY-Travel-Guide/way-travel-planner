import { Router } from "express";
import { geoDataController } from './controller.js';

// Инициализация роутера для геоданных
const geoDataRoutes = new Router();

geoDataRoutes.post('/route', geoDataController.getRouteByFilters);

export { geoDataRoutes };