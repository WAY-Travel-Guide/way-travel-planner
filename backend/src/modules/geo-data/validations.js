import Joi from 'joi';
import { sendError } from '../../utils/response.js';

const createPlaceSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    geom: Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array().items(
            Joi.number().min(-180).max(180), // долгота
            Joi.number().min(-90).max(90)   // широта
        ).length(2).required()
    }).required(),
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