import config from '../../config/index.js';
const { OSRM_URL } = config;

class RoutingService {
    async buildRoute(points, options = {}) {
        if (!points || points.length < 2) return null;

        const validPoints = points
            .filter(p => typeof p.longitude === 'number' && typeof p.latitude === 'number')
            .slice(0, options.maxPoints || 500);

        if (validPoints.length < 2) return null;

        const coords = validPoints.map(p => [p.longitude, p.latitude]);
        const coordString = coords.map(c => c.join(',')).join(';');

        const url = `${OSRM_URL}/route/v1/driving/${coordString}?overview=full&geometries=geojson`;
        //const url = `${OSRM_URL}/trip/v1/driving/${coordString}?overview=full&geometries=geojson`;

        try {
            const res = await fetch(url, { signal: AbortSignal.timeout(20000) });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`OSRM error ${res.status}: ${text}`);
            }

            const data = await res.json();

            if (!data.routes?.[0]) {
                console.warn('OSRM: маршрут не построен', data);
                return null;
            }

            const route = data.routes[0];

            // ГЛАВНОЕ ИСПРАВЛЕНИЕ: берём координаты из GeoJSON
            const coordinates = route.geometry.type === 'LineString'
                ? route.geometry.coordinates
                : route.geometry; // на случай, если вдруг придёт массив

            return {
                geometry: coordinates,                    // ← теперь точно массив [[lon, lat], ...]
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