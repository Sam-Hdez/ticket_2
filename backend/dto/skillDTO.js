const Joi = require('joi');

class SkillDTO {
    post = Joi.object().keys({
        type_skill: Joi.number().greater(-1).required(),
        skill_name: Joi.string().max(255).required(),
    });

    put = Joi.object().keys({
        skill_id: Joi.number().greater(-1).required(),
        type_skill: Joi.number().greater(-1).required(),
        skill_name: Joi.string().max(255).required(),
    });

    delete = Joi.object().keys({
        skill_id: Joi.number().greater(-1).required(),
        type_skill: Joi.number().greater(-1).optional(),
        skill_name: Joi.string().max(255).optional(),
    });
}

module.exports = {
    SkillDTO,
}