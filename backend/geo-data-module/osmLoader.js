
const axios = require('axios');
const osmtogeojson = require('osmtogeojson');
const Landmark = require('./models/Landmark');

async function loadOSMData(bbox) {
  // bbox формат: 'мин_долгота,мин_широта,макс_долгота,макс_широта'
  const url = `https://api.openstreetmap.org/api/0.6/map?bbox=${bbox}`;
  
  try {
    const response = await axios.get(url);
    const geojson = osmtogeojson(response.data);
    
    // Фильтрация и преобразование данных
    const landmarks = geojson.features
      .filter(feature => 
        feature.properties.tourism || 
        feature.properties.historic ||
        feature.properties.amenity)
      .map(feature => ({
        name: feature.properties.name || 'Unnamed',
        type: Object.keys(feature.properties)
          .find(key => ['tourism', 'historic', 'amenity'].includes(key)),
        location: {
          type: 'Point',
          coordinates: feature.geometry.coordinates
        },
        properties: feature.properties
      }));
    
    // Сохранение в MongoDB
    await Landmark.insertMany(landmarks);
    console.log(`Saved ${landmarks.length} landmarks`);
  } catch (err) {
    console.error('Error loading OSM data:', err);
  }
}

module.exports = loadOSMData;