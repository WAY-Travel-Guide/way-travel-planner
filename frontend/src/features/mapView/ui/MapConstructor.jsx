import React, { useEffect } from 'react';
import { Feature } from 'ol';
import Point  from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon, Text, Fill } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { MapContainer } from '../../../shared/';
import { usePlaces } from '../model/usePlaces';

const MapConstructor = function() {
  const { places, loading, error } = usePlaces();

  useEffect(() => {
    if (loading || error) return;

    const src = new VectorSource();
    places.forEach(place => {
      const feat = new Feature({
        geometry: new Point(fromLonLat(place.coordinates)),
        name: place.name,
      });
      src.addFeature(feat);
    });

    const layer = new VectorLayer({
      source: src,
      style: feature => new Style({
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
          padding: [2,2,2,2],
        }),
      }),
    });

    // добавляем слой поверх базовой карты
    MapContainer.__OL_MAP__.addLayer(layer);
    return () => MapContainer.__OL_MAP__.removeLayer(layer);
  }, [places, loading, error]);

  if (loading) return <div>Загрузка точек...</div>;
  if (error)   return <div>Ошибка при загрузке точек</div>;

  // Рендерим карту с children-слоем (слой меток добавится в useEffect)
  return <MapContainer />;
}

export { MapConstructor };