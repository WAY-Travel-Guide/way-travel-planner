import dotenv from 'dotenv';
dotenv.config();

const config = {
    port:        process.env.PORT || 5000,
    mongoUri:    process.env.MONGO_URI,
    postgresUri: process.env.POSTGRES_URI,
    //osrmUrl:     process.env.OSRM_URL,
    logLevel:    process.env.LOG_LEVEL || 'info',
    secret:      process.env.JWT_SECRET || 'your-secret-key',
    OSRM_URL:    process.env.OSRM_URL,
};

export default config;
