/*
* @file Role.js
* @brief Модель роли пользователя для MongoDB/Mongoose.
*        Описывает структуру и ограничения коллекции users.
*/

import mongoose from "mongoose"; // Импортируем mongoose для создания схемы и модели

/*
* @const userSchema
* @brief Схема пользователя.
*        Определяет поля login (уникальный, обязательный) и password (обязательный).
*/
const roleSchema = new mongoose.Schema({ 
    value: { type: String, unique: true, default: "User" }
});

/*
* @const User
* @brief Модель пользователя на основе схемы userSchema.
*        Используется для взаимодействия с коллекцией users в базе данных.
*        Проверка на существование модели позволяет избежать ошибки переопределения при hot-reload.
*/
const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

// Экспортируем модель пользователя по умолчанию
export default Role;
