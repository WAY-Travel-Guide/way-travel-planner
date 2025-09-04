import { placesCache } from './placesCache.js';

const API_BASE_URL = '/api/places';

/**
 * Получает точки интереса для указанной области и уровня зума
 */
export async function fetchPlaces({ bounds, zoom, limit = null }) {
    const params = new URLSearchParams({
        bounds: bounds.join(','),
        zoom: zoom.toString()
    });
    
    if (limit) {
        params.append('limit', limit.toString());
    }
    
    const url = `${API_BASE_URL}/list?${params}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.data || !data.data.features) {
            throw new Error('Invalid response format: missing features');
        }
        
        return data.data;
    } catch (error) {
        console.error('Error fetching places:', error);
        throw error;
    }
}

/**
 * Получает статистику по точкам в указанной области
 */
export async function fetchPlacesStats(bounds) {
    const params = new URLSearchParams({
        bounds: bounds.join(',')
    });
    
    const url = `${API_BASE_URL}/stats?${params}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching places stats:', error);
        throw error;
    }
}

/**
 * API клиент с кэшированием для точек интереса
 */
export async function fetchPlacesCached({ bounds, zoom, limit = null }) {
    // Проверяем кэш
    const cached = placesCache.getPlacesWithStaleCheck(bounds, zoom);
    if (cached && !cached.isStale) {
        return cached.data;
    }
    
    // Загружаем данные
    const data = await fetchPlaces({ bounds, zoom, limit });
    
    // Сохраняем в кэш
    placesCache.setPlaces(bounds, zoom, data);
    
    return data;
}
