/**
* @fileoverview User.js
* @description Модель пользователя для MongoDB/Mongoose.
*        Описывает структуру и ограничения коллекции users.
*/

import mongoose from "mongoose"; // Импортируем mongoose для создания схемы и модели

/**
* @const userSchema
* @description Схема пользователя.
*        Определяет поля login (уникальный, обязательный) и password (обязательный).
*/
const userSchema = new mongoose.Schema({ 
    login: { type: String, required: true, unique: true },    // Логин пользователя, уникальный и обязательный
    password: { type: String, required: true },               // Пароль пользователя, обязательный
    roles: [{type: String, ref: 'Role'}]                      // Роль пользователя: администратор или обычный пользователь
});

/**
* @const User
* @description Модель пользователя на основе схемы userSchema.
*        Используется для взаимодействия с коллекцией users в базе данных.
*        Проверка на существование модели позволяет избежать ошибки переопределения при hot-reload.
*/
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Экспортируем модель пользователя по умолчанию
export default User;
