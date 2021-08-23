const Joi = require('joi');
const { CatalogDTO } = require('../dto/catalogDTO');

const catalogDto = new CatalogDTO();

class CatalogMiddleware {
    async validateCreateCatalog(req, res, next) {
        try {
            await Joi.attempt(req.body, catalogDto.post);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateEditCatalog(req, res, next) {
        try {
            await Joi.attempt(req.body, catalogDto.put);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateDeleteCatalog(req, res, next) {
        try {
            await Joi.attempt(req.body, catalogDto.delete);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateGetCatalog(req, res, next) {
        try {
            console.log(req.params);
            await Joi.attempt(req.params, catalogDto.get);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = {
    CatalogMiddleware
}
