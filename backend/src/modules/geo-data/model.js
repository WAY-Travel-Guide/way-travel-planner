import { Model, DataTypes } from 'sequelize';
import { sequelizeAuth } from '../../config/database.js';
import { logger } from '../../core/logger.js';

class PlaceModel extends Model {}

const attributes = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
    },
    tags: {
        type: DataTypes.HSTORE, // Поддержка hstore для тегов (ключ-значение)
        allowNull: true,
    },
    geom: {
        type: DataTypes.GEOMETRY('POINT', 4326), // PostGIS point для геолокации
        allowNull: true,
    },
};

const options = {
    sequelize,
    modelName: 'PlaceModel',
    tableName: 'nodes',
    timestamps: false,
    underscored: true,
    //indexes: { name: 'idx_nodes_geom', using: 'GIST', fields: ['geom'] }, // GIST-индекс для геозапросов
};

PlaceModel.init(attributes, options);

logger.debug(`[PlaceModel] Initialized with attributes: ${JSON.stringify(attributes, null, 2)}`);
const { modelName, tableName, timestamps, underscored } = options;
logger.debug(`[PlaceModel] Options: ${JSON.stringify({ modelName, tableName, timestamps, underscored }, null, 2)}`);

export { PlaceModel };