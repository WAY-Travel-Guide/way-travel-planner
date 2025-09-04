import { geoDataService } from './service.js';
import { logger } from '../../core/logger.js';
import { sendSuccess, sendError } from '../../utils/response.js';

class GeoDataController {
    async listPlaces(req, res, next) {
        try {
            const { bounds, zoom, limit } = req.query;
            
            if (!bounds) {
                return sendError(res, 400, "Missing 'bounds' query parameter");
            }
            
            // Ожидаем bounds в формате: minLon,minLat,maxLon,maxLat
            const [minLon, minLat, maxLon, maxLat] = bounds.split(',').map(Number);
            
            // Валидация координат
            if (isNaN(minLon) || isNaN(minLat) || isNaN(maxLon) || isNaN(maxLat)) {
                return sendError(res, 400, "Invalid bounds format. Expected: minLon,minLat,maxLon,maxLat");
            }
            
            if (minLon >= maxLon || minLat >= maxLat) {
                return sendError(res, 400, "Invalid bounds: min coordinates must be less than max coordinates");
            }
            
            // Параметры запроса
            const params = {
                minLon, minLat, maxLon, maxLat,
                zoom: zoom ? parseInt(zoom) : 10,
                limit: limit ? parseInt(limit) : null
            };
            
            // Валидация зума
            if (params.zoom < 0 || params.zoom > 18) {
                return sendError(res, 400, "Zoom level must be between 0 and 18");
            }
            
            // Валидация лимита
            if (params.limit && (params.limit < 1 || params.limit > 50000)) {
                return sendError(res, 400, "Limit must be between 1 and 50000");
            }
            
            const geojson = await geoDataService.getListPlaces(params);
            
            // Добавляем метаданные в ответ
            const response = {
                ...geojson,
                meta: {
                    bounds: { minLon, minLat, maxLon, maxLat },
                    zoom: params.zoom,
                    limit: params.limit,
                    count: geojson.features.length,
                    timestamp: new Date().toISOString()
                }
            };
            
            return sendSuccess(res, response);
        } catch (error) {
            logger.error(`Error fetching places: ${error.message}`);
            return sendError(res, error);
        }
    }

    async getPlacesStats(req, res, next) {
        try {
            const { bounds } = req.query;
            
            if (!bounds) {
                return sendError(res, 400, "Missing 'bounds' query parameter");
            }
            
            const [minLon, minLat, maxLon, maxLat] = bounds.split(',').map(Number);
            
            if (isNaN(minLon) || isNaN(minLat) || isNaN(maxLon) || isNaN(maxLat)) {
                return sendError(res, 400, "Invalid bounds format");
            }
            
            const stats = await geoDataService.getPlacesStats({
                minLon, minLat, maxLon, maxLat
            });
            
            return sendSuccess(res, stats);
        } catch (error) {
            logger.error(`Error fetching places stats: ${error.message}`);
            return sendError(res, error);
        }
    }
}

const geoDataController = new GeoDataController();
export { geoDataController };