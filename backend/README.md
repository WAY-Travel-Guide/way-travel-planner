# WAY Backend – Сервис маршрутизации и управления пользователями

![WAY Logo](../frontend/public/images/github-logo.png)

---

## Структура backend

```plaintext
backend/
└── src/
    ├── index.js                  # express up, подключение роутов на модули, запуск сервера
    │
    ├── config/
    │   ├── index.js              # dotenv + config export (OSRM_URL, JWT_SECRET, URI и тд)
    │   └── database.js           # sequelizeGeoDB + sequelizeUserDB + initializeDatabases
    │
    ├── core/
    │   ├── logger.js             # winston logger + requestLogger
    │   └── middleware/
    │       ├── error.js          # errorMiddleware
    │       ├── role.js           # roleMiddleware
    │       └── auth.js           # (если нужен отдельный authMiddleware, вынеси сюда)
    │
    ├── modules/
    │   ├── geo-data/
    │   │   ├── controller.js
    │   │   ├── service.js
    │   │   ├── model.js
    │   │   └── routes.js
    │   │
    │   ├── route/
    │   │   ├── service.js        # routingService (OSRM)
    │   │   └── controller.js     # (если хочешь отдельный /api/route/* — иначе не нужно)
    │   │
    │   └── user/
    │       ├── controller.js
    │       ├── routes.js
    │       ├── validations.js
    │       ├── model/
    │       │   ├── userModel.js
    │       │   └── roleModel.js
    │       └── service/
    │           ├── userService.js
    │           └── emailService.js
    │
    └── utils/
        ├── response.js
        ├── tagsMapping.js
        └── defaultRouteOptions.js

---

## Безопасность

- JWT и bcrypt для авторизации и безопасного хранения паролей.
- Проверка прав пользователя через middleware на каждом защищённом маршруте.
- Доступ к личным и административным данным возможен только по JWT и с нужной ролью.

---

## Технологии

- **Node.js, Express.js** — сервер, middleware, обработка REST API
- **MongoDB, Redis** — хранение и кэширование
- **jsonwebtoken, bcryptjs** — безопасность (токены, хэши)
- **Puppeteer** — генерация PDF
- **Docker, Kubernetes, NGINX** — деплой и масштабирование
- **dotenv** — хранение секретов и переменных окружения

---

## Запуск

Backend

```plaintext
cd backend
npm install
npm install dotenv sequelize pg pg-hstore nodemon winston joi nodemailer google-auth-library
npm run dev
```
---


