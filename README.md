# WAY – Smart Travel Route Planner for Russia

![WAY Logo](frontend/public/images/github-logo.png)

**WAY** — это платформа для автоматического подбора индивидуальных маршрутов путешествий по России с учетом предпочтений пользователя: даты, тип транспорта, бюджет, цели поездки (семейный отдых, природа, культурные объекты и т.д.).

Платформа позволяет визуализировать маршруты на интерактивной карте, а также скачать готовое путешествие в формате PDF. Вся система спроектирована для упрощения планирования поездки и индивидуального подхода к каждому пользователю.

---

## Структура проекта

```plaintext
way-travel-planner/
├── frontend/         # Клиентская часть: React SPA
├── backend/          # Серверная часть: микросервисы (Node.js, Express, MongoDB, Redis)
├── deploy/           # Конфиги для деплоя (Kubernetes, Nginx, Docker)
├── docs/             # Документация по проекту
├── .gitignore        # Глобальный gitignore
├── README.md         # Этот файл (главное описание проекта)
└── ...
```

## Основные модули

-frontend/ — одностраничное приложение (SPA) на React, Vite, OpenLayers (карты).
-backend/ — модульный бэкенд на Node.js (Express, MongoDB, JWT, Docker).
-deploy/ — скрипты и конфиги для развертывания (Docker Compose, Kubernetes, nginx).
-docs/ — расширенная документация, схемы, диаграммы, примеры API.

## Запуск

Backend

```plaintext
cd backend
npm install
npm install dotenv sequelize pg pg-hstore nodemon winston joi nodemailer google-auth-library
npm run dev
```
---

Frontend

```plaintext
cd frontend
npm install
npm install ol
npm run dev
```

## Ключевые технологии

-Node.js, Express.js — сервер, REST API, middleware
-JWT, bcrypt — безопасная авторизация, шифрование паролей
-React, Vite, OpenLayers — быстрый современный фронтенд
-Docker, Kubernetes — контейнеризация и масштабирование
-Open Street Map — геоданные
-OSRM - своя маршрутная машина

