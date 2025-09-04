import { Router } from "express";
import { geoDataController } from './controller.js';
import { validateCreatePlace } from './validations.js';

const geoDataRoutes = new Router();

// GET  /api/places/list         – выборка точек с поддержкой зума и пагинации
geoDataRoutes.get('/list', validateCreatePlace, geoDataController.listPlaces);

// GET  /api/places/stats        – статистика по точкам в области
geoDataRoutes.get('/stats', geoDataController.getPlacesStats);

export { geoDataRoutes };