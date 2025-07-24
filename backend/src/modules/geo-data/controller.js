import { geoDataService } from './service.js';
import { logger } from '../../core/logger.js';
import { sendSuccess, sendError } from '../../utils/response.js';

class PlacesController {
    async listPlaces(req, res, next) {
        try {
        const { tags, bbox, near, limit } = req.query;
        const places = await geoDataService.listPlaces({ tags, bbox, near, limit });
        sendSuccess(res, places);
        } catch (err) {
        logger.error(`Error fetching places: ${err.message}`);
        next(err);
        }
    }

    async createPlace(req, res, next) {
        try {
        const place = await geoDataService.createPlace(req.body);
        sendSuccess(res, place, 201);
        } catch (err) {
        logger.error(`Error creating place: ${err.message}`);
        next(err);
        }
    }
}

const placesController = new PlacesController();
export { placesController };