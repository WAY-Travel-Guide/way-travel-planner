import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database.js';
import { logger } from '../../../core/logger.js';

class UserModel extends Model {}

const userAttributes = {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true, // необязательно для Google-авторизации
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    emailVerificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
};

const userOptions = {
    sequelize,
    modelName: 'UserModel',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: false,
};

UserModel.init(userAttributes, userOptions);

logger.debug(`[UserModel] Initialized with attributes: ${JSON.stringify(userAttributes, null, 2)}`);
const { modelName: userModelName, tableName: userTableName, timestamps: userTimestamps, underscored: userUnderscored } = userOptions;
logger.debug(`[UserModel] Options: ${JSON.stringify({ modelName: userModelName, tableName: userTableName, timestamps: userTimestamps, underscored: userUnderscored }, null, 2)}`);

export { UserModel };