import mongoose from 'mongoose';
import { logger } from '../../core/logger.js';

const userSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
});

const roleSchema = new mongoose.Schema({
    value: { type: String, unique: true, default: 'User' },
});

logger.debug('[UserModel] Initializing User and Role schemas');

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

export { User, Role };