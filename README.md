/project-root
  /frontend            # React SPA
  /backend
    /webapi            # основной API-шлюз (Express)
    /geo-data-service  # микросервис гео-данных (Express)
    /route-service     # сервис маршрутов (Express)
    /pdf-generator     # PDF генератор (Express)
    /cache-service     # кэш сервис (Express, Redis)
    /user-service      # сервис пользователей (Express, PostgreSQL)
    /admin-service     # сервис админки (Express)
    /feedback-service  # отзывы (Express, MongoDB)
  /deploy
    /k8s               # YAML-манифесты для Kubernetes
    /nginx             # конфиги nginx
    /docker            # docker-compose/dev-контейнеры
  /docs
  /scripts
