const mongoose = require('mongoose');

/**
 * Схема для хранения достопримечательностей в MongoDB
 * - name: Название места
 * - type: Категория (туризм, историческое и т.д.)
 * - location: Геоточка в формате GeoJSON (обязательное поле)
 * - osmId: Уникальный ID из OpenStreetMap
 * - properties: Дополнительные метаданные из OSM
 */

/*
* Зачем:
* Создает "шаблон" для хранения данных о достопримечательностях в базе.
* Ключевые моменты:
* location хранит координаты в формате GeoJSON (обязательно для геопоиска в MongoDB).
* 2dsphere индекс ускоряет запросы по близости ($near, $geoWithin).
* osmId помогает избегать дубликатов при обновлении данных.
*/

const LandmarkSchema = new mongoose.Schema({
  name: { 
    type: String, 
    index: true // Индекс для быстрого поиска по названию
  },
  type: { 
    type: String, 
    enum: ['tourism', 'historic', 'amenity'], // Ограниченный набор значений
    required: true
  },
  location: {
    type: { 
      type: String,
      enum: ['Point'], // Только точки (не полигоны)
      default: 'Point'
    },
    coordinates: {
      type: [Number], // Формат: [долгота, широта]
      required: true
    }
  },
  osmId: {
    type: String,
    unique: true // Уникальный идентификатор OSM
  },
  properties: mongoose.Schema.Types.Mixed // Гибкое поле для любых данных
});

// Создание геопространственного индекса (для $near и $geoNear)
LandmarkSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Landmark', LandmarkSchema);