import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database.js';
import { logger } from '../../../core/logger.js';

class RoleModel extends Model {}

const roleAttributes = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: 'User',
    },
};

const roleOptions = {
    sequelize,
    modelName: 'RoleModel',
    tableName: 'roles',
    timestamps: false,
    underscored: true,
};

RoleModel.init(roleAttributes, roleOptions);

logger.debug(`[RoleModel] Initialized with attributes: ${JSON.stringify(roleAttributes, null, 2)}`);

const { modelName: roleModelName, tableName: roleTableName, timestamps: roleTimestamps, underscored: roleUnderscored } = roleOptions;

logger.debug(`[RoleModel] Options: ${JSON.stringify({ modelName: roleModelName, tableName: roleTableName, timestamps: roleTimestamps, underscored: roleUnderscored }, null, 2)}`);

// Экспорт
export { RoleModel };