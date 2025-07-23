// Клиент для загрузки точек из вашего бэкенда
async function fetchPlaces() {
    const res = await fetch('/api/places');
    if (!res.ok) throw new Error('Failed to load places');
    return res.json(); // ожидаем массив { coordinates: [lon,lat], name: string }
}

export { fetchPlaces };