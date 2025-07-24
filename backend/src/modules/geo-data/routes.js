import { Router } from "express";
import { placesController } from './controller.js';

const geoDataRoutes = new Router();

// GET  /api/places/           – выборка точек
geoDataRoutes.get('/list', placesController.listPlaces);
// POST /api/places/           – добавление точки
geoDataRoutes.post('/create', placesController.createPlace);

export { geoDataRoutes };