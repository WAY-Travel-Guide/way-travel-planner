import { QueryTypes } from 'sequelize';
import { sequelizeGeoDB } from '../../config/database.js';
import { logger } from '../../core/logger.js';

// Сервис для работы с геоданными
class GeoDataService {

    // Получение маршрута по фильтрам
    async getRouteByFilters(longitude, latitude, radius, keysArray) {
        const sql = `
            SELECT
                n.id,
                ST_X(n.geom) AS longitude,
                ST_Y(n.geom) AS latitude,
                n.tags
            FROM nodes n
            WHERE ST_DWithin(
                ST_Transform(n.geom, 3857),
                ST_Transform(ST_SetSRID(ST_MakePoint(:long, :lat), 4326), 3857),
                :radius
            )
            AND n.tags ?| ARRAY[:keys]
            LIMIT 100
        `;

        const replacements = {
            long: longitude,                    // Долгота
            lat: latitude,                      // Широта
            radius,                             // Радиус в метрах
            keys: keysArray,                    // Массив ключей
        };

        try {

            // Выполняем запрос к базе данных через Sequelize
            const results = await sequelizeGeoDB.query(sql, {
                replacements,
                type: QueryTypes.SELECT,        // Тип запроса - SELECT
                raw: true,
            });

            // Приводим к числам (Postgres иногда отдаёт строки)
            const normalized = results.map(r => ({
                ...r,
                longitude: Number(r.longitude),
                latitude: Number(r.latitude),
            }));

            return normalized;

        } catch (error) {
            logger.info('Ошибка запроса:', error);
            return [];
        }
    }
}

const geoDataService = new GeoDataService();
export { geoDataService };