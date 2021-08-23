const Joi = require('joi');

class CatalogDTO {
    post = Joi.object().keys({
        enterprise_id: Joi.number().greater(-1).required(),
        catalog_name: Joi.string().max(255).required()
    });

    put = Joi.object().keys({
        catalog_id: Joi.number().greater(-1).optional(),
        catalog_name: Joi.string().max(255).optional()
    });

    delete = Joi.object().keys({
        catalog_id: Joi.number().greater(-1).required(),
        catalog_name: Joi.string().max(255).optional()
    });

    get = Joi.object().keys({
        catalog_id: Joi.number().greater(-1).required(),
        catalog_name: Joi.string().max(255).optional()
    });
}

module.exports = {
    CatalogDTO
}