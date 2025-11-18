import React, { useState } from 'react';
import { RouteMapPage } from './RouteMapPage.jsx';

const initialData = {
    longitude: 44.5167,
    latitude: 48.7077,
    radius: 50000,
    keysArray: []
};

const initialFilters = {
    "Food": true,
    "Beauty": false,
    "Services": false,
    "Sports": false,
    "Groceries": true,
    "Construction and Repair": false,
    "Transport": false,
    "Pets": false,
    "Medicine": false,
    "Shops": false,
    "Car": false,
    "Government": true,
    "Mail": false,
    "Banks and Finance": false,
    "Entertainment and Leisure": false,
    "Tourism": false,
    "Education": false,
    "Other": false
};

function Filters() {
    // Состояние фильтров
    const [filters, setFilters] = useState(initialFilters);

    // Состояние для координат и радиуса
    const [location, setLocation] = useState({
        longitude: initialData.longitude,
        latitude: initialData.latitude,
        radius: initialData.radius
    });

    // Состояние: показывать карту или нет
    const [showMap, setShowMap] = useState(false);

    // Обработчик переключения чекбокса
    const toggleFilter = (key) => {
        setFilters(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // Обработчик изменения инпутов
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocation(prev => ({
            ...prev,
            [name]: name === 'radius' ? parseInt(value) || 0 : parseFloat(value) || 0
        }));
    };

    const activeFilters = Object.keys(filters).filter(key => filters[key]);

    // Формируем массив активных ключей для передачи на карту
    const filtersData = Object.fromEntries(activeFilters.map(f => [f, true]));

    if (showMap) {
        return <RouteMapPage initialData={location} filtersData={filtersData} onBack={() => setShowMap(false)}/>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ marginBottom: '20px' }}>Настройки карты</h1>
            <h2>Фильтры</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                {Object.keys(filters).map((filterName) => (
                    <label
                        key={filterName}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            userSelect: 'none',
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: filters[filterName] ? '#e6f7ff' : '#f9f9f9',
                            border: `1px solid ${filters[filterName] ? '#1890ff' : '#d9d9d9'}`
                        }}
                        onClick={() => toggleFilter(filterName)}
                    >
                        <span style={{ fontSize: '16px' }}>{filterName}</span>
                        <span style={{
                            fontSize: '24px',
                            color: filters[filterName] ? '#52c41a' : '#bfbfbf'
                        }}>
                            {filters[filterName] ? '✓' : '○'}
                        </span>
                    </label>
                ))}
            </div>

            <h3>Координаты и радиус поиска</h3>
            <div style={{ display: 'grid', gap: '15px', marginBottom: '20px', maxWidth: '300px' }}>
                <div>
                    <label>Долгота (longitude):</label>
                    <input
                        type="number"
                        step="0.0001"
                        name="longitude"
                        value={location.longitude}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div>
                    <label>Широта (latitude):</label>
                    <input
                        type="number"
                        step="0.0001"
                        name="latitude"
                        value={location.latitude}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div>
                    <label>Радиус (метры):</label>
                    <input
                        type="number"
                        name="radius"
                        value={location.radius}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <button
                onClick={() => setShowMap(true)}
                style={{
                    padding: '14px 40px',
                    fontSize: '18px',
                    background: '#52c41a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(82, 196, 26, 0.3)'
                }}
                >
                    Построить маршрут
                </button>
            </div>
        </div>
    );
}

export { Filters };