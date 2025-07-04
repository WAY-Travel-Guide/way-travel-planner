/*
Назначение:
Файл, который запускается при старте модуля. Его задача — подготовить окружение и передать управление app.js.
*/
const express = require('express');
const {
  getNearest,
  getById,
  searchByName,
  filterByType,
  createLandmark
} = require('../controllers/landmarks');

const router = express.Router();

// не все из этих функций реализованы в landmark.js
router.get('/landmarks/nearest', getNearest);
router.get('/landmarks/:id', getById);          // GET /landmarks/507f1f77bcf86cd799439011
router.get('/landmarks/search', searchByName);  // GET /landmarks/search?query=музей
router.get('/landmarks/type/:type', filterByType); // GET /landmarks/type/museum
router.post('/landmarks', createLandmark);      // POST /landmarks (требует авторизации)

module.exports = router;