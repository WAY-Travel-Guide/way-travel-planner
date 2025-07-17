import { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Icon, Text, Fill, Stroke } from 'ol/style';
import volgogradPlaces from '../data/VolgogradPlaces';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Источник для меток
    const vectorSource = new VectorSource();
    volgogradPlaces.forEach((place) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(place.coordinates)),
        name: place.name,
      });
      vectorSource.addFeature(feature);
    });

    // Слой для меток
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) =>
        new Style({
          image: new Icon({
            src: '/location-pin.svg',
            scale: 0.05,
          }),
          text: new Text({
            text: feature.get('name'),
            offsetY: -20,
            font: '12px Arial',
            fill: new Fill({ color: '#000' }),
            backgroundFill: new Fill({ color: '#fff' }),
            padding: [2, 2, 2, 2],
          }),
        }),
    });

    // Источник и слой для маршрута
    const routeSource = new VectorSource();
    const routeLayer = new VectorLayer({
      source: routeSource,
      style: new Style({
        stroke: new Stroke({
          color: '#ff0000', // Цвет линии маршрута
          width: 3,
        }),
      }),
    });

    // Инициализация карты
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
        routeLayer, // Добавляем слой маршрута
      ],
      view: new View({
        center: fromLonLat([44.5133, 48.7071]),
        zoom: 12,
      }),
    });

    // Функция для получения маршрута через OSRM
    const fetchRoute = async (start, end) => {
      const url = `http://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry.coordinates; // Координаты маршрута
          // Преобразуем координаты в формат OpenLayers
          const routeCoords = route.map((coord) => fromLonLat([coord[0], coord[1]]));
          // Создаём линию маршрута
          const routeFeature = new Feature({
            geometry: new LineString(routeCoords),
          });
          routeSource.clear(); // Очищаем предыдущий маршрут
          routeSource.addFeature(routeFeature);
        }
      } catch (error) {
        console.error('Ошибка при получении маршрута:', error);
      }
    };

    // Пример: маршрут между первыми двумя точками
    if (volgogradPlaces.length >= 2) {
      fetchRoute(volgogradPlaces[0].coordinates, volgogradPlaces[1].coordinates);
    }

    // Очистка при размонтировании
    return () => map.setTarget(null);
  }, []);

  return <div ref={mapRef} className="map-container" />;
};

export default MapComponent;