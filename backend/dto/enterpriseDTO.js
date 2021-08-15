
const Joi = require('joi');

class EnterpriseDTO {

    get = Joi.object().keys({
        id: Joi.number().greater(-1).optional(),
        name: Joi.string().max(255).optional(),
    });

    post = Joi.object().keys({
        name: Joi.string().max(255).required()
    });

    put = Joi.object().keys({
        name: Joi.string().max(255).required(),
        id: Joi.number().greater(-1).required(),
        system_owner: Joi.boolean().optional()
    });

    delete = Joi.object().keys({
        id: Joi.number().greater(-1).required()
    });

}

module.exports = {
    EnterpriseDTO
}