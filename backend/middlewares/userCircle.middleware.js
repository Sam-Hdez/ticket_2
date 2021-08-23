const Joi = require('joi');
const { UserCircleDTO } = require('../dto/userCircleDTO');

const userCircleDto = new UserCircleDTO();

class UserCircleMiddleware {

    async validateGetUserCircle(req, res, next) {
        try {
            await Joi.attempt(req.params, userCircleDto.get);
            return next();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async validateCreateUserCircle(req, res, next) {
        try {
            await Joi.attempt(req.body, userCircleDto.post);
            return next();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async validateEditUserCircle(req, res, next) {
        try {
            await Joi.attempt(req.body, userCircleDto.put);
            return next();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async validateDeleteUserCircle(req, res, next) {
        try {
            await Joi.attempt(req.body, userCircleDto.delete);
            return next();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}

module.exports = {
    UserCircleMiddleware
}