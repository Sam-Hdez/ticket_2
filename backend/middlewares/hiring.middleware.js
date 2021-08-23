const Joi = require('joi');
const { HiringDTO } = require('../dto/HiringDTO');

const hiringDto = new HiringDTO();

class HiringMiddleware {
    async validateCreateHiring(req, res, next) {
        try {
            await Joi.attempt(req.body, hiringDto.post);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateEditHiring(req, res, next) {
        try {
            await Joi.attempt(req.body, hiringDto.put);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateDeleteHiring(req, res, next) {
        try {
            await Joi.attempt(req.body, hiringDto.delete);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateGetHiring(req, res, next) {
        try {
            console.log(req.params);
            await Joi.attempt(req.params, hiringDto.get);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = {
    HiringMiddleware
}