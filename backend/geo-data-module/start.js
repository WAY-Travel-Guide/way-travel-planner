
/*
 *Назначение:
Главный файл, который объединяет все компоненты модуля и запускает сервер. Это "мозг" модуля.

Что делает:

Инициализирует Express-приложение

Подключает middleware (парсеры JSON, CORS, логирование)

Подключает роуты

Настраивает обработку ошибок

Запускает сервер
*/
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');

// 1. Создаём Express-приложение
const app = express();

// 2. Подключаем middleware
app.use(express.json()); // Для парсинга JSON
app.use(express.urlencoded({ extended: true })); // Для форм

// 3. Подключаем роуты
app.use('/api/geo', routes);

// 4. Обработка ошибок (Must be last!)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 5. Подключение к MongoDB и запуск сервера
mongoose.connect(config.mongo.uri)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`GeoData module запущен на порту ${config.port}`);
    });
  })
  .catch(err => {
    console.error('Ошибка подключения к MongoDB:', err);
    process.exit(1);
  });

module.exports = app; // Для тестирования