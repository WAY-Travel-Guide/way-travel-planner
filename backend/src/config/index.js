import dotenv from 'dotenv';
dotenv.config();

const config = {
    port:                   process.env.PORT,
    mongoUri:               process.env.MONGO_URI,
    postgresUriGeodb:       process.env.POSTGRES_URI_GEODB,
    postgresUriUserdb:      process.env.POSTGRES_URI_USERDB,
    logLevel:               process.env.LOG_LEVEL,
    secret:                 process.env.JWT_SECRET,
    osrmUrl:                process.env.OSRM_URL,
    node:                   process.env.NODE || 'development',
};

export {config};
