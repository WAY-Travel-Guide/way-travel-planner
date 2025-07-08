# WAY – Smart Travel Route Planner for Russia

## 📂 User-module Structure

Модуль управления пользователями, авторизацией, JWT-токенами и ролями
для проекта WAY – Smart Travel Route Planner for Russia.

<details>
  <summary><b>Expand to see the full structure</b></summary>

```plaintext
user-module/
│
├── controllers/             # Логика обработки HTTP-запросов (регистрация, логин, список пользователей)
│   ├── config.js            # Секреты и конфигурация (secret для JWT)
│   └── UserController.js    # Основной контроллер пользователей
│
├── middleware/              # Express-middleware для авторизации и проверки ролей
│   ├── authMiddleware.js    # Проверка JWT-токена (защита маршрутов)
│   └── roleMiddleware.js    # Проверка ролей пользователя (например, Admin)
│
├── models/                  # Mongoose-модели (MongoDB)
│   ├── Role.js              # Схема ролей (Admin, User и др.)
│   └── User.js              # Схема пользователя (login, password (bcrypt), roles)
│
└── routers/
    └── UserRouter.js        # Роуты Express: регистрация, логин, список пользователей и др.