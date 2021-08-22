const { Catalog } = require('../models/catalogs.model');

const newCatalog = async(data) => {
    try {
        let new_catalog = new Catalog(data);
        await new_catalog.createCatalog();
        return new_catalog;
    } catch (error) {
        throw new Error('Error en la función newCatalog: ' + error.message)
    }
}

const editCatalog = async(data) => {
    try {
        let status_catalog = new Catalog(data);
        await status_catalog.updateCatalog(data.catalog_id, data);
        return status_catalog;
    } catch (error) {
        throw new Error('Error en la función editCatalog: ' + error.message)
    }
}

const deleteCatalog = async(data) => {
    try {
        let status_catalog = new Catalog(data);
        await status_catalog.deleteCatalog(data.catalog_id);
        return status_catalog;
    } catch (error) {
        throw new Error('Error en la función deleteCatalog: ' + error.message)
    }
}

const CatalogById = async(data) => {
    try {
        let catalogid = await getCatalogById(data);
        return catalogid;
    } catch (error) {
        throw new Error('Error en la función CatalogById: ' + error.message)
    }
}

const CatalogByName = async(data) => {
    try {
        let catalogname = await getCatalogByName(data);
        return catalogname;
    } catch (error) {
        throw new Error('Error en la función CatalogByName: ' + error.message)
    }
}

const AllCatalog = async(data) => {
    try {
        let catalogall = await getAllCatalog(data);
        return catalogall;
    } catch (error) {
        throw new Error('Error en la función AllCatalog: ' + error.message)
    }
}


module.exports = {
    newCatalog,
    editCatalog,
    deleteCatalog,
    CatalogById,
    CatalogByName,
    AllCatalog
}