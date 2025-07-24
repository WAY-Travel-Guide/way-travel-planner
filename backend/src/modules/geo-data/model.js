import { Model, DataTypes } from 'sequelize';
import { logger } from '../../core/logger.js';

const PlaceModel = (sequelize) => {
    const attributes = {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        name: {
        type: DataTypes.TEXT,
        allowNull: false,
        },
        description: {
        type: DataTypes.TEXT,
        allowNull: true,
        },
        tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
        defaultValue: [],
        },
        properties: {
        type: DataTypes.JSONB,
        allowNull: true,
        },
        geom: {
        type: DataTypes.GEOMETRY('POINT', 4326),
        allowNull: false,
        },
    };

    const options = {
        sequelize,
        modelName: 'Place',
        tableName: 'poi',
        timestamps: true,
        underscored: true,
    };

    const { sequelize: _sequelize, ...loggableOptions } = options;

    logger.debug(`[PlaceModel] Initializing with attributes: ${JSON.stringify(attributes, null, 2)}`);
    logger.debug(`[PlaceModel] Options: ${JSON.stringify(loggableOptions, null, 2)}`);

    class Place extends Model {}
    Place.init(attributes, options);

    logger.debug(`[PlaceModel] Initialized, modelName: ${Place.name}`);

    return Place;
};

export { PlaceModel };