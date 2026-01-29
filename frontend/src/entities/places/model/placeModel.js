import { fetchPlacesCached, fetchPlacesStats } from '../api/placesAPI.js';

/**
 * Модель для работы с точками интереса
 */
class PlaceModel {
    constructor() {
        this.currentBounds = null;
        this.currentZoom = null;
        this.isLoading = false;
        this.lastLoadTime = null;
    }

    /**
     * Загружает точки интереса для указанной области и зума
     * @param {Array<number>} bounds - Границы области [minLon, minLat, maxLon, maxLat]
     * @param {number} zoom - Уровень зума
     * @param {Object} options - Дополнительные опции
     * @returns {Promise<Object>} GeoJSON с точками
     */
    async loadPlaces(bounds, zoom, options = {}) {
        const { useCache = true, limit = null } = options;
        
        // Проверяем, нужно ли загружать данные
        if (this._shouldSkipLoad(bounds, zoom, useCache)) {
            return null;
        }
        
        this.isLoading = true;
        this.currentBounds = bounds;
        this.currentZoom = zoom;
        
        try {
            const params = { bounds, zoom, limit };
            const data = useCache ? 
                await fetchPlacesCached(params) : 
                await fetchPlaces(params);
            
            this.lastLoadTime = Date.now();
            return data;
        } catch (error) {
            console.error('Error loading places:', error);
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Получает статистику по точкам в области
     * @param {Array<number>} bounds - Границы области
     * @returns {Promise<Object>} Статистика
     */
    async getStats(bounds) {
        try {
            return await fetchPlacesStats(bounds);
        } catch (error) {
            console.error('Error loading places stats:', error);
            throw error;
        }
    }

    /**
     * Проверяет, нужно ли пропустить загрузку
     * @private
     */
    _shouldSkipLoad(bounds, zoom, useCache) {
        // Если уже загружается
        if (this.isLoading) {
            return true;
        }
        
        // Если данные уже загружены для этих параметров
        if (useCache && 
            this.currentBounds && 
            this.currentZoom === zoom &&
            this._boundsEqual(this.currentBounds, bounds) &&
            this.lastLoadTime &&
            Date.now() - this.lastLoadTime < 1000) { // 1 секунда
            return true;
        }
        
        return false;
    }

    /**
     * Сравнивает границы областей
     * @private
     */
    _boundsEqual(bounds1, bounds2, tolerance = 0.001) {
        if (!bounds1 || !bounds2) return false;
        
        return Math.abs(bounds1[0] - bounds2[0]) < tolerance &&
               Math.abs(bounds1[1] - bounds2[1]) < tolerance &&
               Math.abs(bounds1[2] - bounds2[2]) < tolerance &&
               Math.abs(bounds1[3] - bounds2[3]) < tolerance;
    }

    /**
     * Сбрасывает состояние модели
     */
    reset() {
        this.currentBounds = null;
        this.currentZoom = null;
        this.isLoading = false;
        this.lastLoadTime = null;
    }

    /**
     * Получает текущее состояние
     */
    getState() {
        return {
            currentBounds: this.currentBounds,
            currentZoom: this.currentZoom,
            isLoading: this.isLoading,
            lastLoadTime: this.lastLoadTime
        };
    }
}

// Создаем глобальный экземпляр модели
const placeModel = new PlaceModel();

export { placeModel, PlaceModel };
