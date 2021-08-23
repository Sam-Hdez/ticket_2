const { elementCatalog } = require('../models/elementsCatalogs.model');

const newElementCatalog = async(data) => {
    try {
        let new_elementcatalog = new elementCatalog(data);
        await new_elementcatalog.createelementCatalog();
        return new_elementcatalog;
    } catch (error) {
        throw new Error('Error en la función newElementCatalog: ' + error.message)
    }
}

const editElementCatalog = async(data) => {
    try {
        let status_elementcatalog = new elementCatalog(data);
        await status_elementcatalog.updateelementCatalog(data.element_catalog_id, data);
        return status_elementcatalog;
    } catch (error) {
        throw new Error('Error en la función editElementCatalog: ' + error.message)
    }
}

const deleteElementCatalog = async(data) => {
    try {
        let status_elementcatalog = new elementCatalog(data);
        await status_elementcatalog.deleteelementCatalog(data.element_catalog_id);
        return status_elementcatalog;
    } catch (error) {
        throw new Error('Error en la función deleteElementCatalog: ' + error.message)
    }
}

const ElementCatalogById = async(data) => {
    try {
        let elementcatalog = await getelementCatalogByName(data);
        return elementcatalog;
    } catch (error) {
        throw new Error('Error en la función ElementCatalogById: ' + error.message)
    }
}

module.exports = {
    newElementCatalog,
    editElementCatalog,
    deleteElementCatalog,
    ElementCatalogById
}