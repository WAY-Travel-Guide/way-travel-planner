import { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Style, Icon, Text, Fill } from 'ol/style';
import volgogradPlaces from '../data/VolgogradPlaces';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Создаём источник для меток
    const vectorSource = new VectorSource();
    volgogradPlaces.forEach((place) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(place.coordinates)),
        name: place.name,
      });
      vectorSource.addFeature(feature);
    });

    // Создаём слой для меток с подписями
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) =>
        new Style({
          image: new Icon({
            src: '/location-pin.svg', // SVG из public
            scale: 0.05, // Масштаб иконки
          }),
          text: new Text({
            text: feature.get('name'),
            offsetY: -20, // Смещение текста над меткой
            font: '12px Arial',
            fill: new Fill({ color: '#000' }),
            backgroundFill: new Fill({ color: '#fff' }),
            padding: [2, 2, 2, 2],
          }),
        }),
    });

    // Инициализируем карту
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }), // Тайлы OpenStreetMap
        vectorLayer, // Слой с метками
      ],
      view: new View({
        center: fromLonLat([44.5133, 48.7071]), // Центр Волгограда
        zoom: 12, // Уровень зума
      }),
    });

    // Очистка при размонтировании
    return () => map.setTarget(null);
  }, []);

  return <div ref={mapRef} className="map-container" />;
};

export default MapComponent;