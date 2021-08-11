const Joi = require('joi');

module.exports.changePassDTO = Joi.object().keys({
    email: Joi.string().email().required(),
    newPassword: Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).min(8).required()
}).with('email', 'newPassword');