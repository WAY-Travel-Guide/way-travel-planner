import { useState, useEffect } from 'react';

function useGeoData(initialData, filtersData = {}, routeOptions = {}) {
    const [geoData, setGeoData] = useState([]);           // массив точек
    const [routeGeometry, setRouteGeometry] = useState(null); // [[lon, lat], ...] или null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Отменяем запрос, если компонент размонтируется
        const controller = new AbortController();

        async function fetchData() {
        try {
            setLoading(true);
            setError(null);

            // Проверяем, что у нас есть координаты старта
            if (!initialData || !initialData.latitude || !initialData.longitude) {
                setGeoData([]);
                setRouteGeometry(null);
                setLoading(false);
                return;
            }

            console.log(filtersData);

            const response = await fetch('/api/geo-data/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initial_data: initialData,
                    filters_data: filtersData,
                    route_options: routeOptions,
                }),
                signal: controller.signal,
            });

            console.log(response);

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Ошибка сервера: ${response.status} ${text}`);
            }

            const result = await response.json();

            setGeoData(result.points || []);
            setRouteGeometry(result.route?.geometry || null); // уже готовый массив координат

        } catch (err) {
            if (err.name !== 'AbortError') {
            console.error('useGeoData ошибка:', err);
            setError(err.message || 'Не удалось загрузить данные');
            }
        } finally {
            setLoading(false);
        }
        }

        fetchData();

        // Отмена запроса при размонтировании
        return () => controller.abort();
    }, [
        initialData?.latitude,
        initialData?.longitude,
        initialData?.radius,
        JSON.stringify(filtersData),    // важно! объекты не сравниваются по значению
        JSON.stringify(routeOptions),
    ]);

    return { geoData, routeGeometry, loading, error };
}

export { useGeoData };