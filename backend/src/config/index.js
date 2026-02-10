import dotenv from 'dotenv';

dotenv.config();

// Подгрузка всех необходимых переменных окружения
const config = {
    port:                   process.env.API_PORT,
    mongoUri:               process.env.MONGO_URI,
    postgresUriGeodb:       process.env.GEODB_POSTGRES_URI,
    postgresUriUserdb:      process.env.USERDB_POSTGRES_URI,
    logLevel:               process.env.LOG_LEVEL,
    secret:                 process.env.JWT_SECRET,
    osrmUrl:                process.env.OSRM_URL,
    node:                   process.env.NODE || 'development',
};

export { config };
