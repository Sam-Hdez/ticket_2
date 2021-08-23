const Joi = require('joi');

class HiringDTO {
    post = Joi.object().keys({
        enterprise_id: Joi.number().greater(-1).required(),
        hiring_name: Joi.string().max(255).required(),
        hiring_description: Joi.string().max(255).required(),
        soft_skills: Joi.string().max(255).required(),
        hard_skills: Joi.string().max(255).required(),
        we_offer: Joi.string().max(255).required(),
        salary: Joi.number().greater(-1).required()
    });

    put = Joi.object().keys({
        hiring_id: Joi.number().greater(-1).optional(),
        enterprise_id: Joi.number().greater(-1).optional(),
        hiring_name: Joi.string().max(255).optional(),
        hiring_description: Joi.string().max(255).optional(),
        soft_skills: Joi.string().max(255).optional(),
        hard_skills: Joi.string().max(255).optional(),
        we_offer: Joi.string().max(255).optional(),
        salary: Joi.number().greater(-1).optional()
    });

    delete = Joi.object().keys({
        hiring_id: Joi.number().greater(-1).required(),
        hiring_name: Joi.string().max(255).optional()
    });

    get = Joi.object().keys({
        hiring_id: Joi.number().greater(-1).required(),
        enterprise_id: Joi.number().greater(-1).optional()
    });
}

module.exports = {
    HiringDTO
}