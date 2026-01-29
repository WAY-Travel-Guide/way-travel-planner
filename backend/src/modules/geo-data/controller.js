import { logger } from '../../core/logger.js';
import { sendSuccess, sendError } from '../../utils/response.js';

import { geoDataService } from './service.js';
import { routingService } from '../route/service.js';
import { CATEGORY_TO_OSM_TAGS } from '../../utils/tagsMapping.js';

class GeoDataController {
    async getRouteByFilters(req, res) {
        try {
            const { initial_data, filters_data, route_options = {} } = req.body;

            const { longitude, latitude, radius } = initial_data;

            // 1. Собираем теги из активных фильтров
            const activeTags = Object.keys(filters_data)
                .filter(key => filters_data[key])
                .flatMap(key => CATEGORY_TO_OSM_TAGS[key] || []);

            if (activeTags.length === 0) {
                return res.json({ points: [], route: null });
            }

            // 2. Получаем точки
            const points = await geoDataService.getRouteByFilters(longitude, latitude, radius, activeTags);
            
            // 3. Строим маршрут (на бэкенде)
            let route = null;
            if (points.length >= 2 && route_options.optimize !== false) {
                route = await routingService.buildRoute(points, route_options);
            }

            res.json({
                points: points.map(p => ({
                    longitude: p.longitude,
                    latitude: p.latitude,
                    tags: p.tags
                })),
                route
            });

        } catch (error) {
            logger.error(error);
            res.status(500).json({ erroror: error.message });
        }
    }
}

const geoDataController = new GeoDataController();

export { geoDataController };