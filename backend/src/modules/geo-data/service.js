import { Op, literal } from 'sequelize';
import { PlaceModel } from './model.js';
import { sequelize } from '../../config/database.js';
import { logger } from '../../core/logger.js';

class GeoDataService {
    /**
     * Получает точки интереса с учетом уровня зума и границ видимой области
     * @param {Object} params - Параметры запроса
     * @param {number} params.minLon - Минимальная долгота
     * @param {number} params.minLat - Минимальная широта
     * @param {number} params.maxLon - Максимальная долгота
     * @param {number} params.maxLat - Максимальная широта
     * @param {number} params.zoom - Уровень зума (0-18)
     * @param {number} params.limit - Максимальное количество точек (по умолчанию зависит от зума)
     * @returns {Object} GeoJSON объект с точками интереса
     */
    async getListPlaces({ minLon, minLat, maxLon, maxLat, zoom = 10, limit = null }) {
        // Определяем лимит и стратегию выборки в зависимости от уровня зума
        const { actualLimit, useClustering } = this._getZoomStrategy(zoom, limit);
        
        // Вычисляем площадь видимой области для дополнительной оптимизации
        const area = this._calculateArea(minLon, minLat, maxLon, maxLat);
        
        let query;
        
        if (useClustering && zoom < 12) {
            // Для низких уровней зума используем кластеризацию
            query = this._buildClusteringQuery(minLon, minLat, maxLon, maxLat, actualLimit);
        } else {
            // Для высоких уровней зума загружаем все точки в области
            query = this._buildStandardQuery(minLon, minLat, maxLon, maxLat, actualLimit);
        }

        const points = await PlaceModel.findAll(query);

        // Формируем GeoJSON
        const geojson = {
            type: 'FeatureCollection',
            features: points.map(point => ({
                type: 'Feature',
                geometry: JSON.parse(point.geometry),
                properties: {
                    id: point.gid,
                    ...(point.cluster_count && { cluster_count: point.cluster_count })
                }
            }))
        };
        
        logger.info('Service: Fetched bounds=%o, zoom=%d, count=%d, area=%.6f', 
            { minLon, minLat, maxLon, maxLat }, zoom, points.length, area);

        return geojson;
    }

    /**
     * Определяет стратегию выборки в зависимости от уровня зума
     */
    _getZoomStrategy(zoom, customLimit) {
        if (customLimit) {
            return { actualLimit: customLimit, useClustering: false };
        }

        // Стратегии для разных уровней зума
        if (zoom <= 8) {
            return { actualLimit: 100, useClustering: true }; // Очень мало точек, кластеризация
        } else if (zoom <= 10) {
            return { actualLimit: 500, useClustering: true }; // Мало точек, кластеризация
        } else if (zoom <= 12) {
            return { actualLimit: 2000, useClustering: true }; // Среднее количество, кластеризация
        } else if (zoom <= 14) {
            return { actualLimit: 5000, useClustering: false }; // Много точек, без кластеризации
        } else {
            return { actualLimit: 10000, useClustering: false }; // Максимум точек
        }
    }

    /**
     * Вычисляет площадь видимой области в квадратных градусах
     */
    _calculateArea(minLon, minLat, maxLon, maxLat) {
        return (maxLon - minLon) * (maxLat - minLat);
    }

    /**
     * Строит запрос с кластеризацией для низких уровней зума
     */
    _buildClusteringQuery(minLon, minLat, maxLon, maxLat, limit) {
        const clusterSize = 0.01; // Размер кластера в градусах
        
        return {
            attributes: [
                'gid',
                [
                    sequelize.literal(`ST_AsGeoJSON(ST_Centroid(ST_Collect(geom)))`),
                    'geometry'
                ],
                [
                    sequelize.literal(`COUNT(*)`),
                    'cluster_count'
                ]
            ],
            where: sequelize.literal(
                `ST_Within(geom, ST_MakeEnvelope(${minLon}, ${minLat}, ${maxLon}, ${maxLat}, 4326))`
            ),
            group: [
                sequelize.literal(`ST_SnapToGrid(geom, ${clusterSize})`)
            ],
            having: sequelize.literal(`COUNT(*) > 1`),
            limit,
            raw: true,
            order: [[sequelize.literal('COUNT(*)'), 'DESC']]
        };
    }

    /**
     * Строит стандартный запрос для высоких уровней зума
     */
    _buildStandardQuery(minLon, minLat, maxLon, maxLat, limit) {
        return {
            attributes: [
                'gid',
                [
                    sequelize.literal(`ST_AsGeoJSON(geom)`),
                    'geometry'
                ]
            ],
            where: sequelize.literal(
                `ST_Within(geom, ST_MakeEnvelope(${minLon}, ${minLat}, ${maxLon}, ${maxLat}, 4326))`
            ),
            limit,
            raw: true,
            order: [['gid', 'ASC']] // Стабильная сортировка для пагинации
        };
    }

    /**
     * Получает статистику по точкам в области (для отладки и мониторинга)
     */
    async getPlacesStats(bounds) {
        const { minLon, minLat, maxLon, maxLat } = bounds;
        
        const stats = await PlaceModel.findOne({
            attributes: [
                [sequelize.literal('COUNT(*)'), 'total_count'],
                [sequelize.literal('ST_Area(ST_MakeEnvelope(minLon, minLat, maxLon, maxLat, 4326))'), 'area']
            ],
            where: sequelize.literal(
                `ST_Within(geom, ST_MakeEnvelope(${minLon}, ${minLat}, ${maxLon}, ${maxLat}, 4326))`
            ),
            raw: true
        });

        return stats;
    }
}

const geoDataService = new GeoDataService();
export { geoDataService };