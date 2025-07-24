import Joi from 'joi';
import { sendError } from '../../utils/response.js';

const createPlaceSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
    properties: Joi.object().optional(),
    });

    const validateCreatePlace = (req, res, next) => {
    const { error } = createPlaceSchema.validate(req.body);
    if (error) {
        return sendError(res, 400, `Validation error: ${error.details[0].message}`);
    }
    next();
};

export { validateCreatePlace };