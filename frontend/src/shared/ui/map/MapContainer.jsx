import React, { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import './MapContainer.css';

const MapContainer = function({ children, center = [44.5133, 48.7071], zoom = 12 }) {
    const mapRef = useRef(null);

    useEffect(() => {
        const map = new Map({
        target: mapRef.current,
        layers: [
            new TileLayer({ source: new OSM() }),
        ],
        view: new View({
            center: fromLonLat(center),
            zoom,
        }),
        });

        return () => map.setTarget(null);
    }, [center, zoom]);

    return (
        <div className="map-container" ref={mapRef}>
            {children}
        </div>
    );
}

export { MapContainer };