const Joi = require('joi');

class AddressDTO {
    post = Joi.object().keys({
        country: Joi.string().max(255).required(),
        city: Joi.string().max(255).required(),
    });

    put = Joi.object().keys({
        address_id: Joi.number().greater(-1).required(),
        country: Joi.string().max(255).required(),
        city: Joi.string().max(255).required(),
        street: Joi.string().max(255).optional(),
        outside_number: Joi.string().max(255).optional(),
        inside_number: Joi.string().max(255).optional(),
        home_references: Joi.string().max(255).allow('').optional(),
    });

    delete = Joi.object().keys({
        address_id: Joi.number().greater(-1).required(),
        country: Joi.string().max(255).optional(),
        city: Joi.string().max(255).optional(),
    });
}

module.exports = {
    AddressDTO,
}