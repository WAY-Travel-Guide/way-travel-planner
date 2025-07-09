/**
* @fileoverview index.js
* @description Точка входа для запуска модуля серверного API.
*        Производит подключение к MongoDB, настройку middleware и регистрацию маршрутов.
*/

import express from "express";                                // Импортируем Express для создания HTTP-сервера
import cors from "cors";                                      // Импортируем CORS для разрешения запросов с фронтенда
import mongoose from "mongoose";                              // Импортируем Mongoose для работы с MongoDB
import UserRouter from "../user-module/routers/UserRouter.js"; // Импортируем роутер пользователей

/**
* @const mongoUrl
* @description Строка подключения к MongoDB (Atlas или локальная).
*        Можно использовать переменные окружения для безопасности.
*/
const mongoUrl = "mongodb+srv://admin:RS7duwPQ9Sb6vxij@cluster-way-planner.rk99vsx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Way-planner";
// const mongoUrl = "mongodb://localhost:27017/user_login"; // Пример локального подключения

/**
* @const PORT
* @description Порт, на котором запускается сервер.
*/
const PORT = 5000;

/**
* @function startWebAPI
* @description Асинхронная функция для старта веб-сервера и подключения к базе данных.
*/
async function startWebAPI() {
  try {
    /*
    * Логируем состояние подключения к MongoDB через события
    */
    mongoose.connection
      .on("connecting",   () => console.log("→ Mongoose: connecting"))
      .on("connected",    () => console.log("→ Mongoose: connected"))
      .on("error",        err => console.error("→ Mongoose error:", err))
      .on("disconnected", () => console.log("→ Mongoose: disconnected"));

    /*
    * Подключаемся к MongoDB с параметрами таймаута и буферизации
    */
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands:          false,
    });

    // Включаем отладочный режим для Mongoose (все запросы будут логироваться)
    mongoose.set("debug", true);

    console.log("MongoDB успешно подключён");

    // Создаём экземпляр приложения Express
    const app = express();

    // Подключаем middleware CORS для поддержки запросов с других доменов
    app.use(cors());
    // Подключаем middleware для парсинга JSON в теле запросов
    app.use(express.json());
    // Регистрируем маршруты пользователей по префиксу /api
    app.use('/api', UserRouter);

    // Запускаем сервер на указанном порту
    app.listen(PORT, () => console.log("Server started on port " + PORT));
  }
  catch (error) {
    // Логируем ошибку при старте сервера
    console.log(error);
  }
}

// Запускаем функцию старта сервера, ловим возможные ошибки
startWebAPI().catch(console.error);
