import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { checkUser } from "../user-service/user_auth.js";
import { registerUser } from "../user-service/user_register.js";

const app = express();

// Middleware
app.use(cors()); // Разрешить запросы с фронтенда
app.use(bodyParser.json());

// Маршрут для авторизации
app.post("/api/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    console.log("POST /api/login:", req.body);

    // Проверка наличия логина и пароля в запросе
    if (!login || !password) {
      return res.status(400).json({ success: false, message: "Логин и пароль обязательны" });
    }

    // Вызов функции checkUser из user_auth.js
    const user = await checkUser(login, password);

    if (user) {
        res.json({ success: true, message: "Вход успешно выполнен", user });
    } else {
      res.status(401).json({ success: false, message: "Неверный логин или пароль" });
    }
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

// Маршрут для регистрации
app.post("/api/register", async (req, res) => {
  try {
    const { login, password } = req.body;
    console.log("POST /api/register:", req.body);

    if (!login || !password) {
      return res.status(400).json({ success: false, message: "Логин и пароль обязательны" });
    }

    const user = await registerUser(login, password);
    res.json({ success: true, message: "Регистрация успешно выполнена", user });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    res.status(400).json({ success: false, message: error.message || "Ошибка регистрации" });
  }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => console.log("Server started on port " + PORT));