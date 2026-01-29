import { QueryTypes } from 'sequelize';
import { PlaceModel } from './model.js';
import { sequelizeGeoDB } from '../../config/database.js';
import { logger } from '../../core/logger.js';

class GeoDataService {
    async getRouteByFilters(longitude, latitude, radius, keysArray) {
        const sql = `
            SELECT
                n.id,
                ST_X(n.geom) AS longitude,
                ST_Y(n.geom) AS latitude,
                n.tags
            FROM nodes n
            WHERE ST_DWithin(
                n.geom::geography,
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
            const results = await sequelizeGeoDB.query(sql, {
                replacements,
                type: QueryTypes.SELECT,
                raw: true,
            });

            // Приводим к числам (Postgres иногда отдаёт строки)
            const normalized = results.map(r => ({
                ...r,
                longitude: Number(r.longitude),
                latitude: Number(r.latitude),
            }));

            logger.info('Результаты:', normalized.slice(0, 3));
            return normalized;
            } catch (error) {
            logger.info('Ошибка запроса:', error);
            return [];
        }
    }
}

const geoDataService = new GeoDataService();
export { geoDataService };