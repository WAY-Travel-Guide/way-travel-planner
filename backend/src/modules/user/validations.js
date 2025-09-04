import Joi from 'joi';
import { sendError } from '../../utils/response.js';

const registerUserSchema = Joi.object({
    login: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
});

const loginUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
});

const loginEmailSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const deleteUserSchema = Joi.object({
    login: Joi.string().required(),
});

const validateRegisterUser = (req, res, next) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
        return sendError(res, 400, `Validation error: ${error.details[0].message}`);
    }
    next();
};

const validateLoginUser = (req, res, next) => {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
        return sendError(res, 400, `Validation error: ${error.details[0].message}`);
    }
    next();
    };

const validateLoginEmail = (req, res, next) => {
    const { error } = loginEmailSchema.validate(req.body);
    if (error) {
        return sendError(res, 400, `Validation error: ${error.details[0].message}`);
    }
    next();
};

const validateDeleteUser = (req, res, next) => {
    const { error } = deleteUserSchema.validate(req.body);
    if (error) {
        return sendError(res, 400, `Validation error: ${error.details[0].message}`);
    }
    next();
};

export { validateRegisterUser, validateLoginUser, validateLoginEmail, validateDeleteUser };