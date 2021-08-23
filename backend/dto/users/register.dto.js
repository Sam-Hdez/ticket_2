const Joi = require('joi');

module.exports.altaUserDTO = Joi.object().keys({
    email: Joi.string().email().required(),
    nombre: Joi.string().alphanum().max(150).required(),
    apellidos: Joi.string().alphanum().max(150).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).min(8).required(),
    image: Joi.any().optional()
});