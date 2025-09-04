/**
 * Утилиты для оптимизации производительности карты
 */

/**
 * Вычисляет оптимальные параметры загрузки на основе зума и размера области
 * @param {number} zoom - Уровень зума
 * @param {Array<number>} bounds - Границы области [minLon, minLat, maxLon, maxLat]
 * @returns {Object} Оптимальные параметры
 */
export function calculateOptimalParams(zoom, bounds) {
    const [minLon, minLat, maxLon, maxLat] = bounds;
    const area = (maxLon - minLon) * (maxLat - minLat);
    
    // Базовые параметры в зависимости от зума
    let baseLimit, clusterSize, updateThreshold;
    
    if (zoom <= 6) {
        baseLimit = 50;
        clusterSize = 0.1;
        updateThreshold = 0.5;
    } else if (zoom <= 8) {
        baseLimit = 100;
        clusterSize = 0.05;
        updateThreshold = 0.3;
    } else if (zoom <= 10) {
        baseLimit = 300;
        clusterSize = 0.02;
        updateThreshold = 0.2;
    } else if (zoom <= 12) {
        baseLimit = 1000;
        clusterSize = 0.01;
        updateThreshold = 0.1;
    } else if (zoom <= 14) {
        baseLimit = 3000;
        clusterSize = 0.005;
        updateThreshold = 0.05;
    } else {
        baseLimit = 5000;
        clusterSize = 0.002;
        updateThreshold = 0.02;
    }
    
    // Корректируем лимит в зависимости от площади
    const areaFactor = Math.min(area / 0.01, 10); // Нормализуем площадь
    const adjustedLimit = Math.round(baseLimit * areaFactor);
    
    return {
        limit: Math.min(adjustedLimit, 10000), // Максимум 10k точек
        clusterSize,
        updateThreshold,
        useClustering: zoom < 12,
        debounceMs: zoom < 10 ? 800 : 300 // Больше debounce для низких зумов
    };
}

/**
 * Проверяет, нужно ли обновлять данные при изменении карты
 * @param {Array<number>} oldBounds - Предыдущие границы
 * @param {Array<number>} newBounds - Новые границы
 * @param {number} oldZoom - Предыдущий зум
 * @param {number} newZoom - Новый зум
 * @param {number} threshold - Порог изменения (0-1)
 * @returns {boolean} Нужно ли обновлять
 */
export function shouldUpdateData(oldBounds, newBounds, oldZoom, newZoom, threshold = 0.1) {
    if (!oldBounds || !newBounds) return true;
    
    // Проверяем изменение зума
    if (Math.abs(newZoom - oldZoom) >= 0.5) return true;
    
    // Проверяем изменение границ
    const [oldMinLon, oldMinLat, oldMaxLon, oldMaxLat] = oldBounds;
    const [newMinLon, newMinLat, newMaxLon, newMaxLat] = newBounds;
    
    const oldWidth = oldMaxLon - oldMinLon;
    const oldHeight = oldMaxLat - oldMinLat;
    const newWidth = newMaxLon - newMinLon;
    const newHeight = newMaxLat - newMinLat;
    
    // Проверяем смещение центра
    const oldCenterLon = (oldMinLon + oldMaxLon) / 2;
    const oldCenterLat = (oldMinLat + oldMaxLat) / 2;
    const newCenterLon = (newMinLon + newMaxLon) / 2;
    const newCenterLat = (newMinLat + newMaxLat) / 2;
    
    const centerShift = Math.sqrt(
        Math.pow(newCenterLon - oldCenterLon, 2) + 
        Math.pow(newCenterLat - oldCenterLat, 2)
    );
    
    const avgSize = (oldWidth + oldHeight) / 2;
    const relativeShift = centerShift / avgSize;
    
    if (relativeShift > threshold) return true;
    
    // Проверяем изменение размера области
    const sizeChange = Math.abs(newWidth - oldWidth) / oldWidth;
    if (sizeChange > threshold) return true;
    
    return false;
}

/**
 * Оптимизирует массив точек для отображения
 * @param {Array} features - Массив GeoJSON features
 * @param {number} maxPoints - Максимальное количество точек
 * @returns {Array} Оптимизированный массив
 */
export function optimizeFeaturesForDisplay(features, maxPoints = 5000) {
    if (features.length <= maxPoints) return features;
    
    // Сортируем по важности (если есть свойство importance)
    const sortedFeatures = features.sort((a, b) => {
        const aImportance = a.properties?.importance || 0;
        const bImportance = b.properties?.importance || 0;
        return bImportance - aImportance;
    });
    
    // Берем первые maxPoints точек
    return sortedFeatures.slice(0, maxPoints);
}

/**
 * Создает пространственный индекс для быстрого поиска
 * @param {Array} features - Массив GeoJSON features
 * @returns {Object} Пространственный индекс
 */
export function createSpatialIndex(features) {
    const index = new Map();
    const gridSize = 0.01; // Размер ячейки сетки
    
    features.forEach((feature, idx) => {
        if (feature.geometry && feature.geometry.coordinates) {
            const [lon, lat] = feature.geometry.coordinates;
            const gridX = Math.floor(lon / gridSize);
            const gridY = Math.floor(lat / gridSize);
            const key = `${gridX},${gridY}`;
            
            if (!index.has(key)) {
                index.set(key, []);
            }
            index.get(key).push(idx);
        }
    });
    
    return {
        index,
        gridSize,
        getFeaturesInBounds: (bounds) => {
            const [minLon, minLat, maxLon, maxLat] = bounds;
            const minGridX = Math.floor(minLon / gridSize);
            const minGridY = Math.floor(minLat / gridSize);
            const maxGridX = Math.floor(maxLon / gridSize);
            const maxGridY = Math.floor(maxLat / gridSize);
            
            const result = new Set();
            
            for (let x = minGridX; x <= maxGridX; x++) {
                for (let y = minGridY; y <= maxGridY; y++) {
                    const key = `${x},${y}`;
                    const cellFeatures = index.get(key);
                    if (cellFeatures) {
                        cellFeatures.forEach(idx => result.add(idx));
                    }
                }
            }
            
            return Array.from(result).map(idx => features[idx]);
        }
    };
}

/**
 * Управляет памятью и очищает неиспользуемые данные
 */
export class MemoryManager {
    constructor(maxCacheSize = 100, maxMemoryMB = 50) {
        this.maxCacheSize = maxCacheSize;
        this.maxMemoryMB = maxMemoryMB;
        this.cache = new Map();
        this.accessTimes = new Map();
    }
    
    set(key, data) {
        // Проверяем размер памяти
        if (this._getMemoryUsage() > this.maxMemoryMB) {
            this._cleanup();
        }
        
        this.cache.set(key, data);
        this.accessTimes.set(key, Date.now());
        
        // Ограничиваем размер кэша
        if (this.cache.size > this.maxCacheSize) {
            this._evictOldest();
        }
    }
    
    get(key) {
        const data = this.cache.get(key);
        if (data) {
            this.accessTimes.set(key, Date.now());
        }
        return data;
    }
    
    has(key) {
        return this.cache.has(key);
    }
    
    delete(key) {
        this.cache.delete(key);
        this.accessTimes.delete(key);
    }
    
    clear() {
        this.cache.clear();
        this.accessTimes.clear();
    }
    
    _getMemoryUsage() {
        // Примерная оценка использования памяти
        let totalSize = 0;
        for (const [key, value] of this.cache) {
            totalSize += key.length * 2; // Unicode chars
            totalSize += JSON.stringify(value).length * 2;
        }
        return totalSize / (1024 * 1024); // MB
    }
    
    _evictOldest() {
        let oldestKey = null;
        let oldestTime = Infinity;
        
        for (const [key, time] of this.accessTimes) {
            if (time < oldestTime) {
                oldestTime = time;
                oldestKey = key;
            }
        }
        
        if (oldestKey) {
            this.delete(oldestKey);
        }
    }
    
    _cleanup() {
        // Удаляем 20% самых старых записей
        const entries = Array.from(this.accessTimes.entries())
            .sort((a, b) => a[1] - b[1]);
        
        const toDelete = Math.ceil(entries.length * 0.2);
        for (let i = 0; i < toDelete; i++) {
            this.delete(entries[i][0]);
        }
    }
}

/**
 * Дебаунс функция с возможностью отмены
 * @param {Function} func - Функция для дебаунса
 * @param {number} wait - Время ожидания в мс
 * @returns {Function} Дебаунсированная функция
 */
export function debounceWithCancel(func, wait) {
    let timeout;
    
    const debounced = function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
    
    debounced.cancel = () => {
        clearTimeout(timeout);
    };
    
    return debounced;
}
