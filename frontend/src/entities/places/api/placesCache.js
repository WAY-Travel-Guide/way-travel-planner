import { BaseCache } from '../../../shared/lib/cache/baseCache.js';

/**
 * Специализированный кэш для точек интереса
 */
export class PlacesCache extends BaseCache {
    constructor(maxSize = 100, ttl = 5 * 60 * 1000) {
        super(maxSize, ttl);
    }
    
    /**
     * Генерирует ключ для кэша на основе bounds и zoom
     */
    generatePlacesKey(bounds, zoom) {
        return this._generateKey(bounds, zoom);
    }
    
    /**
     * Получает кэшированные данные для places
     */
    getPlaces(bounds, zoom) {
        const key = this.generatePlacesKey(bounds, zoom);
        const cached = this.get(key);
        
        if (cached && !this._isStale(cached.timestamp)) {
            return cached.data;
        }
        
        return null;
    }
    
    /**
     * Сохраняет данные places в кэш
     */
    setPlaces(bounds, zoom, data) {
        const key = this.generatePlacesKey(bounds, zoom);
        this.set(key, data);
    }
    
    /**
     * Получает кэшированные данные с проверкой устаревания
     */
    getPlacesWithStaleCheck(bounds, zoom) {
        const key = this.generatePlacesKey(bounds, zoom);
        const cached = this.get(key);
        
        if (cached) {
            const isStale = this._isStale(cached.timestamp);
            return {
                data: cached.data,
                isStale
            };
        }
        
        return null;
    }
}

// Создаем глобальный экземпляр
export const placesCache = new PlacesCache();