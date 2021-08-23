const Joi = require('joi');
const { ElementCatalogDTO } = require('../dto/elementCatalogDTO');

const elementCatalogDto = new ElementCatalogDTO();

class ElementCatalogMiddleware {
    async validateCreateElementCatalog(req, res, next) {
        try {
            await Joi.attempt(req.body, elementCatalogDto.post);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateEditElementCatalog(req, res, next) {
        try {
            await Joi.attempt(req.body, elementCatalogDto.put);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateDeleteElementCatalog(req, res, next) {
        try {
            await Joi.attempt(req.body, elementCatalogDto.delete);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async validateGetElementCatalog(req, res, next) {
        try {
            console.log(req.params);
            await Joi.attempt(req.params, elementCatalogDto.get);
            return next();
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = {
    ElementCatalogMiddleware
}