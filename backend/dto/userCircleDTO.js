
const Joi = require('joi');

class UserCircleDTO {

    get = Joi.object().keys({
        id: Joi.number().greater(-1).optional(),
        userId: Joi.number().greater(-1).optional(),
        type: Joi.number().greater(-1).optional(),
    });

    post = Joi.object().keys({
        typeCircle: Joi.number().greater(-1).required(),
        userId: Joi.number().greater(-1).required(),
    });

    put = Joi.object().keys({
        typeCircle: Joi.number().greater(-1).required(),
        userId: Joi.number().greater(-1).required(),
        id: Joi.number().greater(-1).required(),
    });

    delete = Joi.object().keys({
        id: Joi.number().greater(-1).required(),
    });

}

module.exports = {
    UserCircleDTO
}