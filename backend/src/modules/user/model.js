import mongoose from 'mongoose';
import { logger } from '../../core/logger.js';

const userSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Сделали необязательным для Google пользователей
    name: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    roles: [{ type: String, ref: 'Role' }],
}, {
    timestamps: true
});

const roleSchema = new mongoose.Schema({
    value: { type: String, unique: true, default: 'User' },
});

logger.debug('[UserModel] Initializing User and Role schemas');

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

export { User, Role };