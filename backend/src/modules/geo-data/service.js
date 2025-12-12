import { QueryTypes } from 'sequelize';
import { PlaceModel } from './model.js';
// import { sequelize } from '../../config/database.js';

class GeoDataService {
    async getRouteByFilters(longitude, latitude, radius, keysArray) {
        const sql = `
            SELECT
                n.id,
                ST_X(n.geom) AS longitude,
                ST_Y(n.geom) AS latitude,
                n.tags,
                n.geom
            FROM nodes n
            WHERE ST_DWithin(
                n.geom,
                ST_SetSRID(ST_MakePoint(:long, :lat), 4326)::geography,
                :radius
            )
            AND n.tags ?| ARRAY[:keys]
        `; // Используем плейсхолдеры для параметров

        const replacements = {
            long: longitude,
            lat: latitude,
            radius,
            keys: keysArray, // Массив ключей
        };

        try {
            const results = await sequelize.query(sql, {
                replacements,
                type: QueryTypes.SELECT,
                model: PlaceModel,
                mapToModel: true,
            });
            logger.info('Результаты:', results.map(r => r.toJSON()));
            return results;
        } catch (error) {
            logger.info('Ошибка запроса:', error);
        }
    }
}

const geoDataService = new GeoDataService();
export { geoDataService };