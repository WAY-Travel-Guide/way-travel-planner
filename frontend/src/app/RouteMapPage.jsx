import React from 'react';
import { MapConstructor } from './MapConstructor';

function RouteMapPage({ initialData, filtersData, onBack }) {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Ваш маршрут</h1>
        <div style={{ marginBottom: '20px' }}>
            <button onClick={onBack} style={{
            padding: '10px 20px',
            background: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
            }}>
            ← Назад к настройкам
            </button>
        </div>

        <div style={{ height: '80vh', border: '2px solid #1890ff', borderRadius: '12px', overflow: 'hidden' }}>
            <MapConstructor
            initialData={initialData}
            filtersData={filtersData}
            />
        </div>
        </div>
    );
}

export { RouteMapPage };