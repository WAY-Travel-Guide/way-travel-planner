import { useEffect, useRef } from 'react';
import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Cluster from 'ol/source/Cluster';
import { Style, Circle as CircleStyle, Fill, Stroke, Text } from 'ol/style';
import { useGeoData } from './useGeoData';

const DEFAULT_CENTER = fromLonLat([44.5167, 48.7077]);

const defaultRouteOptions = {
  optimize: true,
  max_distance_km: 20,
  return_to_start: false
};

const MapConstructor = ({ initialData, filtersData }) => {
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const { geoData, routeGeometry, loading, error } = useGeoData(
    initialData,
    filtersData,
    defaultRouteOptions
  );

  useEffect(() => {
    if (loading || error || !mapRef.current) return;

    // Инициализация карты один раз
    if (!mapInstanceRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({ center: DEFAULT_CENTER, zoom: 12 }),
        controls: [],
      });

      const vectorSource = new VectorSource();
      const clusterSource = new Cluster({ distance: 40, source: vectorSource });

      const pointsLayer = new VectorLayer({
        source: clusterSource,
        style: (feature) => {
          const size = feature.get('features').length;
          if (size === 1)
            return new Style({
              image: new CircleStyle({
                radius: 8,
                fill: new Fill({ color: '#1976d2' }),
                stroke: new Stroke({ color: '#fff', width: 2 }),
              }),
            });

          return new Style({
            image: new CircleStyle({
              radius: 18,
              fill: new Fill({ color: '#ff7043' }),
              stroke: new Stroke({ color: '#fff', width: 3 }),
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({ color: '#fff' }),
              font: 'bold 14px Arial',
            }),
          });
        },
        zIndex: 2,
      });

      map.addLayer(pointsLayer);

      const overlay = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        offset: [0, -10],
        stopEvent: false,
      });
      map.addOverlay(overlay);

      // Сохраняем ссылки
      mapInstanceRef.current = { map, vectorSource, overlay };
    }

    const { map, vectorSource, overlay } = mapInstanceRef.current;

    // Очищаем старые точки
    vectorSource.clear();

    // Добавляем новые точки
    geoData.forEach((point) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([point.longitude, point.latitude])),
        pointData: point,
      });
      vectorSource.addFeature(feature);
    });

    // === Маршрут от бэкенда ===
    map.getLayers().getArray()
      .filter(layer => layer.get('name') === 'routeLayer')
      .forEach(layer => map.removeLayer(layer));

    if (routeGeometry && routeGeometry.length >= 2) {
      const routeCoords = routeGeometry.map(coord => fromLonLat(coord));

      const routeFeature = new Feature({
        geometry: new LineString(routeCoords),
      });

      const routeLayer = new VectorLayer({
        source: new VectorSource({ features: [routeFeature] }),
        style: new Style({
          stroke: new Stroke({ color: '#d32f2f', width: 4 }),
        }),
        zIndex: 1,
      });
      routeLayer.set('name', 'routeLayer');
      map.addLayer(routeLayer);

      // Автомасштабирование под маршрут + точки
      const extent = routeFeature.getGeometry().getExtent();
      geoData.forEach(p => {
        const coord = fromLonLat([p.longitude, p.latitude]);
        extent[0] = Math.min(extent[0], coord[0]);
        extent[1] = Math.min(extent[1], coord[1]);
        extent[2] = Math.max(extent[2], coord[0]);
        extent[3] = Math.max(extent[3], coord[1]);
      });

      map.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 1000 });
    }

    // Popup на наведение
    let hoveredFeature = null;
    map.on('pointermove', (evt) => {
      if (map.getView().getAnimating()) return;

      const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
      if (feature === hoveredFeature) return;
      hoveredFeature = feature;

      if (feature && feature.get('features')?.length === 1) {
        const point = feature.get('features')[0].get('pointData');
        overlay.setPosition(evt.coordinate);

        let html = `<div style="font-family: Arial; font-size: 13px;">`;
        html += `<strong>Координаты:</strong> ${point.latitude.toFixed(6)}, ${point.longitude.toFixed(6)}<br>`;
        if (point.tags && Object.keys(point.tags).length) {
          html += `<strong>Теги:</strong><ul style="margin:4px 0; padding-left:18px;">`;
          for (const [k, v] of Object.entries(point.tags)) {
            html += `<li><b>${k}:</b> ${v}</li>`;
          }
          html += `</ul>`;
        }
        html += `</div>`;
        popupRef.current.innerHTML = html;
        popupRef.current.style.display = 'block';
      } else {
        overlay.setPosition(undefined);
        popupRef.current.style.display = 'none';
      }
    });

  }, [geoData, routeGeometry, loading, error]);

  

  if (error) return <div style={{ padding: 20, color: 'red' }}>Ошибка: {error}</div>;
  if (loading) return <div style={{ padding: 20 }}>Загрузка карты...</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      <div
        ref={popupRef}
        style={{
          position: 'absolute',
          background: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
          zIndex: 1000,
          display: 'none',
          maxWidth: '300px',
          fontSize: '13px',
          lineHeight: '1.4',
        }}
      />
    </div>
  );
};

export { MapConstructor };