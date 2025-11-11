import { useState, useEffect } from 'react';

const useGeoData = function(initialData) {
    const [geoData, setGeoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGeoData = async () => {
            try {
                const res = await fetch('/api/places/allPOIVolgograd', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(initialData),
                });
                const result = await res.json();
                setGeoData(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchGeoData();
    }, [initialData]);

    return { geoData, loading, error };
};

export { useGeoData };