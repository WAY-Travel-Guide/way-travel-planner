import { Map, View, Overlay } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';

import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';

import Feature from 'ol/Feature';

import { useGeoData } from './useGeoData.jsx';
import { useEffect, useState } from 'react';

const MapConstructor = function() {
    
    const { geoData, loading, error } = useGeoData(
        {
            longitude: 44.0,
            latitude: 49.5,
            radius: 300000,
            keysArray: ['amenity', 'buildings'],
        }
    );

    useEffect(() => {
        if (loading) return;

        const map = new Map (
            {
                target: document.getElementById('map'),
                layers: [ 
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                view: new View({
                    center: [4955579.885754102, 6226328.539273945],
                    zoom: 11
                })
            }
        )

        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({
                source: vectorSource
            }
        );
        map.addLayer(vectorLayer);

        const overlay = new Overlay({
            element: document.getElementById('popup'),
            positioning: 'bottom-center',
            offset: [0, -4]
        });     
        map.addOverlay(overlay);

        map.on('pointermove', function (event) {
            const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
            if (feature) {
                const coordinate = event.coordinate;
                overlay.setPosition(coordinate);
                document.getElementById('popup').innerHTML = feature.get('name') || 'Нет данных';
            } else {
                overlay.setPosition(undefined);
            }
        });

        geoData.forEach((point) => {
            const { longitude, latitude, tags } = point;
            const feature = new Feature({
                    geometry: new Point(fromLonLat([longitude, latitude])),
                    name: tags.name || 'Точка', 
                });
                vectorSource.addFeature(feature);
        });
    }, [geoData, loading, error]);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '100vh' }}></div>
            <div id="popup" style={{ width: '10%', height: '10vh' }}></div>
        </div>
    );
};

export { MapConstructor };