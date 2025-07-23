import { useState, useEffect } from 'react';
import { fetchPlaces } from '../../../entities/places';

export const usePlaces = function () {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        fetchPlaces()
        .then(data => setPlaces(data))
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    }, []);

    return { places, loading, error };
}
