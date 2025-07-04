
const connectDB = require('./db');
const loadOSMData = require('./osmLoader');

// Подключение к БД
connectDB();

// Пример: загрузка данных для центра Москвы
const bbox = '37.6,55.7,37.7,55.8'; // min lon, min lat, max lon, max lat
loadOSMData(bbox);
// Использовать osrm