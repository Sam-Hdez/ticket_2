const Joi = require('joi');
const { EnterpriseDTO } = require('../dto/enterpriseDTO');

const enterpriseDto = new EnterpriseDTO();

class EnterpriseMiddleware {

    async validateGetEnterprise(req, res, next) {
        try {
            console.log(req.params);
            await Joi.attempt(req.params, enterpriseDto.get);
            return next();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async validateCreateEnterprise(req, res, next) {
        try {
            await Joi.attempt(req.body, enterpriseDto.post);
            return next();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async validateEditEnterprise(req, res, next) {
        try {
            await Joi.attempt(req.body, enterpriseDto.put);
            return next();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }

    async validateDeleteEnterprise(req, res, next) {
        try {
            await Joi.attempt(req.body, enterpriseDto.delete);
            return next();
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }
    }
}


module.exports = {
    EnterpriseMiddleware
}
