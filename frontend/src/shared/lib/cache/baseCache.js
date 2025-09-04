/**
 * Базовый класс для кэширования с LRU стратегией
 */
export class BaseCache {
    constructor(maxSize = 100, ttl = 5 * 60 * 1000) {
        this.cache = new Map();
        this.accessOrder = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl; // Time to live в миллисекундах
    }
    
    _generateKey(...args) {
        return args.map(arg => 
            Array.isArray(arg) ? arg.join(',') : String(arg)
        ).join('_');
    }
    
    _updateAccessOrder(key) {
        this.accessOrder.set(key, Date.now());
    }
    
    _evictOldest() {
        if (this.cache.size >= this.maxSize) {
            let oldestKey = null;
            let oldestTime = Infinity;
            
            for (const [key, time] of this.accessOrder) {
                if (time < oldestTime) {
                    oldestTime = time;
                    oldestKey = key;
                }
            }
            
            if (oldestKey) {
                this.cache.delete(oldestKey);
                this.accessOrder.delete(oldestKey);
            }
        }
    }
    
    _isStale(timestamp) {
        return Date.now() - timestamp > this.ttl;
    }
    
    get(key) {
        const cached = this.cache.get(key);
        
        if (cached) {
            this._updateAccessOrder(key);
            return cached;
        }
        
        return null;
    }
    
    set(key, value) {
        this._evictOldest();
        this.cache.set(key, {
            data: value,
            timestamp: Date.now()
        });
        this._updateAccessOrder(key);
    }
    
    has(key) {
        return this.cache.has(key);
    }
    
    delete(key) {
        const deleted = this.cache.delete(key);
        this.accessOrder.delete(key);
        return deleted;
    }
    
    clear() {
        this.cache.clear();
        this.accessOrder.clear();
    }
    
    size() {
        return this.cache.size;
    }
}