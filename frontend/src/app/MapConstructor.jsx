import { useEffect, useRef } from 'react';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { useGeoData } from './useGeoData.jsx';

import Cluster from 'ol/source/Cluster';
import { Style, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style';

const INITIAL_DATA = {
  longitude: 44.0,
  latitude: 49.5,
  radius: 300000,
  keysArray: ['amenity', 'buildings'],
};

const MapConstructor = function () {
  const initialDataRef = useRef({
    longitude: 44.0,
    latitude: 49.5,
    radius: 300000,
    keysArray: ['amenity', 'buildings'],
  });

  const popupRef = useRef(null);
  const mapRef = useRef(null);
  const { geoData, loading, error } = useGeoData(initialDataRef.current);

  useEffect(() => {
    // ждём пока данные загрузятся и refs будут готовы
    if (loading || !popupRef.current || !mapRef.current) return;

    // предотвращаем повторную инициализацию
    if (mapRef.current.__ol_initialized) return;
    mapRef.current.__ol_initialized = true;

    // Создание карты 
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([44.0, 49.5]),
        zoom: 8,
      }),
    });

    // Обычный источник точек
const vectorSource = new VectorSource();

// Кластерный источник
const clusterSource = new Cluster({
  distance: 40,          // расстояние (в пикселях) для объединения точек
  source: vectorSource,
});

// Стиль для кластеров
const clusterStyle = function (feature) {
  const size = feature.get('features').length;

  if (size === 1) {
    // одиночная точка
    return new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({ color: '#1976d2' }),
        stroke: new Stroke({ color: '#fff', width: 2 }),
      }),
    });
  } else {
    // кластер
    return new Style({
      image: new CircleStyle({
        radius: 15,
        fill: new Fill({ color: '#ff7043' }),
        stroke: new Stroke({ color: '#fff', width: 2 }),
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({ color: '#fff' }),
        font: 'bold 13px sans-serif',
      }),
    });
  }
};

// Слой с кластеризацией
const vectorLayer = new VectorLayer({
  source: clusterSource,
  style: clusterStyle,
});

map.addLayer(vectorLayer);

    //  Всплывающее описание точек
    const overlay = new Overlay({
      element: popupRef.current,
      positioning: 'bottom-center',
      offset: [0, -8],
      stopEvent: false, // важно
      autoPan: false,   // не двигать карту
    });
    map.addOverlay(overlay);

    // фичи
    geoData.forEach((point) => {
      const { longitude, latitude, tags } = point;
      const feature = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
        
        pointData: {
          tags: tags || {},
          longitude,
          latitude,
        },
      });
      vectorSource.addFeature(feature);
    });

    // Обработчик наведения
    let lastFeature = null;
    map.on('pointermove', function (event) {
    if (map.getView().getAnimating() || map.getView().getInteracting()) return;

    const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);

    // Если та же фича, что и раньше — ничего не делаем
    if (feature === lastFeature) return;
    lastFeature = feature;

    if (feature) {
        const features = feature.get('features'); // массив внутренних точек

        // Если это кластер (несколько точек) — не показываем popup
        if (features.length > 1) {
        overlay.setPosition(undefined);
        popupRef.current.style.display = 'none';
        return;
        }

        // Если это одиночная точка — показываем popup
        const coordinate = event.coordinate;
        overlay.setPosition(coordinate);
        const point = features[0].get('pointData');

        let content = '<div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">';

        // Координаты
        content += `<div><strong>Координаты:</strong> ${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}</div>`;

        // Все tags
        if (point.tags && Object.keys(point.tags).length > 0) {
          content += '<div style="margin-top: 6px;"><strong>Теги:</strong></div>';
          content += '<ul style="margin: 4px 0; padding-left: 18px;">';
          for (const [key, value] of Object.entries(point.tags)) {
            content += `<li><strong>${key}:</strong> ${value}</li>`;
          }
          content += '</ul>';
        } else {
          content += '<div style="margin-top: 6px; color: #666;">Теги отсутствуют</div>';
        }

        content += '</div>';

        popupRef.current.innerHTML = content;
        popupRef.current.style.display = 'block';
    } else {
        overlay.setPosition(undefined);
        popupRef.current.style.display = 'none';
    }
    });
    }, [geoData, loading, error]);

  if (error) return <div>Error: {error}</div>;







  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        ref={mapRef}
        id="map"
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          willChange: 'auto',
          zIndex: 0,
        }}
      ></div>

      <div
        ref={popupRef}
        id="popup"
        style={{
          backgroundColor: 'white',
          border: '1px solid black',
          borderRadius: '6px',
          padding: '4px 8px',
          position: 'absolute',
          zIndex: 1000,
          display: 'none',
          transform: 'translate(-50%, -100%)',
          pointerEvents: 'none',
        }}
      ></div>
    </div>
  );
};

export { MapConstructor };
