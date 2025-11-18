import { Router } from "express";
import { geoDataController } from './controller.js';

const geoDataRoutes = new Router();

geoDataRoutes.post('/route', geoDataController.getRouteByFilters);

export { geoDataRoutes };