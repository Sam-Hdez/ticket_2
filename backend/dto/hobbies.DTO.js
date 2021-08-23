const Joi = require('joi');

class HobbiesDTO {
    post = Joi.object().keys({
        hobby_name: Joi.string().max(255).required(),
    });

    put = Joi.object().keys({
        hobby_id: Joi.number().greater(-1).required(),
        hobby_name: Joi.string().max(255).required(),
    });

    delete = Joi.object().keys({
        hobby_id: Joi.number().greater(-1).required(),
        hobby_name: Joi.string().max(255).optional(),
    });
}

module.exports = {
    HobbiesDTO,
}