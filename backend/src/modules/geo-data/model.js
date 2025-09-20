import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import { logger } from '../../core/logger.js';

class PlaceModel extends Model {}

const attributes = {
    gid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // name: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    // },
    // description: {
    //     type: DataTypes.TEXT,
    //     allowNull: true,
    // },
    // tags: {
    //     type: DataTypes.ARRAY(DataTypes.TEXT),
    //     allowNull: true,
    //     defaultValue: [],
    // },
    // properties: {
    //     type: DataTypes.JSONB,
    //     allowNull: true,
    // },
    // geom: {
    //     type: DataTypes.GEOMETRY('POINT', 4326),
    //     allowNull: false,
    // },
};

const options = {
    sequelize,
    modelName: 'Place',
    tableName: 'osm_volgograd',
    timestamps: true,
    underscored: true,
};

PlaceModel.init(attributes, options);

logger.debug(`[PlaceModel] Initialized with attributes: ${JSON.stringify(attributes, null, 2)}`);
const { modelName, tableName, timestamps, underscored } = options;
logger.debug(`[PlaceModel] Options: ${JSON.stringify({ modelName, tableName, timestamps, underscored }, null, 2)}`);

export { PlaceModel };