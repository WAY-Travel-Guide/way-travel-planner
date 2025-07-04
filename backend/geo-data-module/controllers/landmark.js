
/*
* Набор функций для работы с геоданными. Кадая функция представляет собоой реализацию одной операции 
* (поиск ближайших достопримечательностей, поиск достопримечательности по названию и др.).

*/
const Landmark = require('../models/landmark');

// Поиск ближайших
async function getNearest(req, res) {
  const { lat, lng, maxDistance = 5000 } = req.query;
  
  const landmarks = await Landmark.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseInt(maxDistance)
      }
    }
  }).limit(20);

  res.json(landmarks);
}

// Поиск по названию
async function search(req, res) {
  const { query, type } = req.query;
  const filter = { name: { $regex: query, $options: 'i' } };
  if (type) filter.type = type;
  
  const results = await Landmark.find(filter);
  res.json(results);
}

module.exports = { getNearest, search };