import React, { useEffect, useRef, useState } from 'react';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon, Text, Fill, Stroke, Circle } from 'ol/style';
import { fromLonLat, toLonLat } from 'ol/proj';
import { MapContainer } from '../../../shared/';
import { usePlaces } from '../model/usePlaces';

/**
 * Компонент карты с динамической загрузкой точек интереса
 */
const MapConstructor = function() {
  const {
    places,
    loading,
    error,
    meta,
    loadPlacesDebounced,
    clearPlaces,
    cleanup
  } = usePlaces({ debounceMs: 500 });

  const mapRef = useRef(null);
  const placesLayerRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  // Инициализация карты и слоя точек
  useEffect(() => {
    if (!MapContainer.__OL_MAP__) return;

    const map = MapContainer.__OL_MAP__;
    mapRef.current = map;
    
    // Создаем слой для точек интереса
    const placesSource = new VectorSource();
    const placesLayer = new VectorLayer({
      source: placesSource,
      style: createPlacesStyle
    });
    
    placesLayerRef.current = placesLayer;
    map.addLayer(placesLayer);
    
    setMapReady(true);

    // Очистка при размонтировании
    return () => {
      if (placesLayer) {
        map.removeLayer(placesLayer);
      }
      cleanup();
    };
  }, [cleanup]);

  // Обработка изменений карты
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const map = mapRef.current;
    const view = map.getView();

    const handleMapChange = () => {
      const extent = view.calculateExtent(map.getSize());
      const zoom = Math.round(view.getZoom() * 10) / 10; // Округляем до 1 знака
      
      // Преобразуем extent в bounds [minLon, minLat, maxLon, maxLat]
      const [minX, minY, maxX, maxY] = extent;
      const [minLon, minLat] = toLonLat([minX, minY]);
      const [maxLon, maxLat] = toLonLat([maxX, maxY]);
      
      const bounds = [minLon, minLat, maxLon, maxLat];
      
      // Загружаем точки с debounce
      loadPlacesDebounced(bounds, zoom);
    };

    // Обработчики событий карты
    map.on('moveend', handleMapChange);
    map.on('zoomend', handleMapChange);
    
    // Первоначальная загрузка
    handleMapChange();

    return () => {
      map.un('moveend', handleMapChange);
      map.un('zoomend', handleMapChange);
    };
  }, [mapReady, loadPlacesDebounced]);

  // Обновление слоя при изменении данных
  useEffect(() => {
    if (!placesLayerRef.current || !places) return;

    const source = placesLayerRef.current.getSource();
    source.clear();

    // Добавляем новые точки
    places.forEach(place => {
      if (place.geometry && place.geometry.coordinates) {
        const feature = new Feature({
          geometry: new Point(fromLonLat(place.geometry.coordinates)),
          properties: place.properties
        });
        
        source.addFeature(feature);
      }
    });
  }, [places]);

  // Создание стилей для точек
  function createPlacesStyle(feature) {
    const properties = feature.getProperties();
    const isCluster = properties.cluster_count > 1;
    
    if (isCluster) {
      // Стиль для кластера
      const count = properties.cluster_count;
      const size = Math.min(20 + count * 2, 50); // Размер зависит от количества точек
      
      return new Style({
        image: new Circle({
          radius: size / 2,
          fill: new Fill({
            color: 'rgba(255, 87, 34, 0.8)'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2
          })
        }),
        text: new Text({
          text: count.toString(),
          fill: new Fill({
            color: '#fff'
          }),
          font: 'bold 12px Arial'
        })
      });
    } else {
      // Стиль для обычной точки
      return new Style({
        image: new Circle({
          radius: 4,
          fill: new Fill({
            color: '#1976d2'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 1
          })
        })
      });
    }
  }

  // Индикатор загрузки
  const LoadingIndicator = () => (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '14px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{
        width: '16px',
        height: '16px',
        border: '2px solid #f3f3f3',
        borderTop: '2px solid #1976d2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      Загрузка точек...
    </div>
  );

  // Индикатор ошибки
  const ErrorIndicator = () => (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(244, 67, 54, 0.9)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: '14px',
      zIndex: 1000
    }}>
      {error}
    </div>
  );

  // Информационная панель
  const InfoPanel = () => {
    if (!meta) return null;
    
    return (
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 1000
      }}>
        <div>Точек: {meta.count}</div>
        <div>Зум: {meta.zoom}</div>
        {meta.limit && <div>Лимит: {meta.limit}</div>}
      </div>
    );
  };

  return (
    <div>
      <MapContainer />
    </div>
  );
};

export { MapConstructor };