import { config } from '../../config/index.js';
import { logger } from '../../core/logger.js';

// Сервис для работы с маршрутами
class RoutingService {

    // Построение маршрута через OSRM
    async buildRoute(points, options = {}) {
        if (!points || points.length < 2) return null;

        const validPoints = points
            .filter(p => typeof p.longitude === 'number' && typeof p.latitude === 'number')
            .slice(0, 100);

        if (validPoints.length < 2) return null;

        // Формируем строку координат для OSRM
        const coordString = validPoints.map(p => `${p.longitude},${p.latitude}`).join(';');

        const url =
            `${config.osrmUrl}/trip/v1/driving/${coordString}` +
            `?roundtrip=false` +
            `&source=first` +
            `&destination=last` +
            `&overview=full` +
            `&steps=false` +
            `&geometries=geojson`;


        logger.debug('[OSRM] URL:', url);

        try {
            const res = await fetch(url);

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`OSRM error ${res.status}: ${text}`);
            }

            const data = await res.json();

            if (!data.trips?.[0]) {
                logger.warn('OSRM: маршрут не построен', data);
                return null;
            }

            const route = data.trips[0];

            // Формируем результат в виде GeoJSON
            const coordinates = route.geometry.type === 'LineString'
                ? route.geometry.coordinates
                : route.geometry;                                    // на случай, если вдруг придёт массив

            return {
                geometry: coordinates,
                distance_km: Math.round(route.distance / 100) / 10,  // 15.0 км
                duration_min: Math.round(route.duration / 60),       // 25 мин
            };
        } catch (err) {
            console.error('RoutingService error:', err.message);
            return null;
        }
    }
}

const routingService = new RoutingService();
export { routingService };