const Joi = require('joi');

class ElementCatalogDTO {
    post = Joi.object().keys({
        catalog_type: Joi.number().greater(-1).required(),
        element_name: Joi.string().max(255).required()
    });

    put = Joi.object().keys({
        element_catalog_id: Joi.number().greater(-1).optional(),
        element_name: Joi.string().max(255).optional()
    });

    delete = Joi.object().keys({
        element_catalog_id: Joi.number().greater(-1).required(),
        element_name: Joi.string().max(255).optional()
    });

    get = Joi.object().keys({
        element_name: Joi.string().max(255).optional(),
    });
}

module.exports = {
    ElementCatalogDTO
}