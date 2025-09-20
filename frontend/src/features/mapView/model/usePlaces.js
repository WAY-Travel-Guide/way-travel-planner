import { useState, useCallback, useRef } from 'react';
import { placeModel } from '../../../entities/places';
import { 
    calculateOptimalParams, 
    shouldUpdateData, 
    optimizeFeaturesForDisplay,
    MemoryManager,
    debounceWithCancel
} from '../utils/performanceUtils';

/**
 * Хук для работы с точками интереса на карте
 * @param {Object} options - Опции хука
 * @param {boolean} options.autoLoad - Автоматически загружать данные при изменении параметров
 * @param {number} options.debounceMs - Задержка для debounce (по умолчанию 300мс)
 * @returns {Object} Состояние и методы для работы с местами
 */
export const usePlaces = function(options = {}) {
    const { autoLoad = true, debounceMs = 300, enableOptimization = true } = options;
    
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);
    
    const debounceTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);
    const lastParamsRef = useRef(null);
    const memoryManagerRef = useRef(new MemoryManager());
    const debouncedLoadRef = useRef(null);

    /**
     * Загружает точки интереса для указанной области и зума
     */
    const loadPlaces = useCallback(async (bounds, zoom, loadOptions = {}) => {
        // Проверяем, нужно ли обновлять данные
        if (enableOptimization && lastParamsRef.current) {
            const { bounds: lastBounds, zoom: lastZoom } = lastParamsRef.current;
            const optimalParams = calculateOptimalParams(zoom, bounds);
            
            if (!shouldUpdateData(lastBounds, bounds, lastZoom, zoom, optimalParams.updateThreshold)) {
                return; // Пропускаем загрузку
            }
        }
        
        // Отменяем предыдущий запрос
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        // Создаем новый AbortController
        abortControllerRef.current = new AbortController();
        
        setLoading(true);
        setError(null);
        
        try {
            // Вычисляем оптимальные параметры
            const optimalParams = calculateOptimalParams(zoom, bounds);
            
            const data = await placeModel.loadPlaces(bounds, zoom, {
                ...loadOptions,
                limit: optimalParams.limit,
                signal: abortControllerRef.current.signal
            });
            
            if (data) {
                let features = data.features || [];
                
                // Оптимизируем данные для отображения
                if (enableOptimization) {
                    features = optimizeFeaturesForDisplay(features, optimalParams.limit);
                }
                
                setPlaces(features);
                setMeta(data.meta || null);
                
                // Сохраняем параметры для следующей проверки
                lastParamsRef.current = { bounds, zoom };
                
                // Кэшируем данные
                const cacheKey = `${bounds.join(',')}_${zoom}`;
                memoryManagerRef.current.set(cacheKey, { features, meta: data.meta });
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err.message || 'Ошибка загрузки точек интереса');
                console.error('Error loading places:', err);
            }
        } finally {
            setLoading(false);
        }
    }, [enableOptimization]);

    /**
     * Загружает точки с debounce
     */
    const loadPlacesDebounced = useCallback((bounds, zoom, loadOptions = {}) => {
        // Создаем дебаунсированную функцию если её нет
        if (!debouncedLoadRef.current) {
            const optimalParams = calculateOptimalParams(zoom, bounds);
            const actualDebounceMs = optimalParams.debounceMs || debounceMs;
            
            debouncedLoadRef.current = debounceWithCancel(loadPlaces, actualDebounceMs);
        }
        
        // Отменяем предыдущий вызов
        debouncedLoadRef.current.cancel();
        
        // Запускаем новый
        debouncedLoadRef.current(bounds, zoom, loadOptions);
    }, [loadPlaces, debounceMs]);

    /**
     * Очищает текущие данные
     */
    const clearPlaces = useCallback(() => {
        setPlaces([]);
        setMeta(null);
        setError(null);
        placeModel.reset();
    }, []);

    /**
     * Обновляет данные (принудительно)
     */
    const refreshPlaces = useCallback((bounds, zoom) => {
        loadPlaces(bounds, zoom, { useCache: false });
    }, [loadPlaces]);

    /**
     * Получает статистику по текущей области
     */
    const getStats = useCallback(async (bounds) => {
        try {
            return await placeModel.getStats(bounds);
        } catch (err) {
            console.error('Error getting places stats:', err);
            throw err;
        }
    }, []);

    /**
     * Очистка при размонтировании компонента
     */
    const cleanup = useCallback(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        
        if (debouncedLoadRef.current) {
            debouncedLoadRef.current.cancel();
        }
        
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        // Очищаем память
        memoryManagerRef.current.clear();
    }, []);

    return {
        // Состояние
        places,
        loading,
        error,
        meta,
        
        // Методы
        loadPlaces,
        loadPlacesDebounced,
        clearPlaces,
        refreshPlaces,
        getStats,
        cleanup,
        
        // Утилиты
        getState: () => placeModel.getState()
    };
};
