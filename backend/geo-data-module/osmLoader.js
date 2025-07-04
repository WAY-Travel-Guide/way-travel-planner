
const axios = require('axios');
const osmtogeojson = require('osmtogeojson');
const Landmark = require('../models/landmark');

/**
 * Загружает данные по Волгоградской области из Overpass API
 * и сохраняет в MongoDB
 */

/*
 * Зачем:
 * Качает сырые данные из OpenStreetMap и преобразует их в структуру MongoDB.
 * Как работает:
 * Overpass API запрашивает объекты с тегом tourism в пределах Волгоградской области.
 * osmtogeojson конвертирует XML/JSON от OSM в стандартный GeoJSON.
 * Для полигонов (парки, здания) вычисляется центр тяжести.
 * Критично:
 * area:3600051477 — ID Волгоградской области в OSM (найти можно здесь).
 * ordered: false в insertMany пропускает дубликаты вместо остановки.
*/

async function loadVolgogradLandmarks() {
  try {
    // 1. Формируем запрос к Overpass API
    const overpassQuery = `
      [out:json];
      (
        // Выбираем объекты с тегом tourism в пределах области
        node["tourism"](area:3600051477);
        way["tourism"](area:3600051477);
        relation["tourism"](area:3600051477);
      );
      out body;
      >;
      out skel qt;
    `;

    console.log('Загрузка данных из OSM...');
    const response = await axios.get(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`,
      { timeout: 30000 } // 30 секунд таймаут
    );

    // 2. Конвертация OSM -> GeoJSON
    console.log('Конвертация в GeoJSON...');
    const geojson = osmtogeojson(response.data);

    // 3. Подготовка данных для MongoDB
    console.log('Подготовка данных...');
    const landmarks = geojson.features
      .filter(feature => feature.geometry) // Отсеиваем объекты без геометрии
      .map(feature => {
        // Определяем центр координат для полигонов/линий
        let coordinates = feature.geometry.coordinates;
        if (feature.geometry.type !== 'Point') {
          const coords = coordinates.flat();
          coordinates = [
            coords.reduce((sum, c) => sum + c[0], 0) / coords.length, // lng
            coords.reduce((sum, c) => sum + c[1], 0) / coords.length  // lat
          ];
        }

        return {
          name: feature.properties.name || `Unnamed-${feature.id}`,
          type: 'tourism', // Основной тип
          location: {
            type: 'Point',
            coordinates
          },
          osmId: feature.id,
          properties: feature.properties
        };
      });

    // 4. Сохранение в базу (с проверкой дублей)
    console.log('Сохранение в MongoDB...');
    await Landmark.deleteMany({}); // Очистка старых данных (опционально)
    const result = await Landmark.insertMany(landmarks, { ordered: false }); // Продолжать при ошибках
    
    console.log(`Успешно сохранено ${result.length} объектов`);
    return result;
  } catch (err) {
    console.error('Ошибка загрузки:', err.message);
    throw err;
  }
}

module.exports = { loadVolgogradLandmarks };