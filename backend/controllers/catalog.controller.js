const { newCatalog, editCatalog, deleteCatalog, CatalogById, CatalogByName, AllCatalog } = require('../services/catalogs.service')

class CatalogController {
    async CreateCatalog(req, res) {
        try {
            let catalog = { enterprise_id: req.boy.enterprise_id, catalog_name: req.body.catalog_name }
            let status_catalog = await newCatalog(catalog);
            res.status(200).json({ message: 'Catalogo creado: ' + status_catalog.catalog_name });
        } catch (error) {
            res.status(502).json({ message: 'Error al crear catalogo: ' + error.message });;
        }
    }

    async UpdateCatalog(req, res) {
        try {
            let catalog = { catalog_id: req.body.catalog_id, catalog_name: req.body.catalog_name }
            let status_catalog = await editCatalog(catalog);
            res.status(200).json({ message: 'Catalogo actualizado: ' + status_catalog.catalog_name });
        } catch (error) {
            res.status(502).json({ message: 'Error al actualizar los catalogos: ' + error.message });;
        }
    }

    async DeleteCatalog(req, res) {
        try {
            let catalog = { catalog_id: req.body.catalog_id, catalog_name: req.body.catalog_name }
            let status_catalog = await deleteCatalog(catalog);
            res.status(200).json({ message: 'Catalogo eliminado' + status_catalog.catalog_name});
        } catch (error) {
            res.status(502).json({ message: 'Error al eliminar el catalogo: ' + error.message });;
        }
    }

    async catalogbyid(req, res) {
        try {
            const id = req.body.catalog_id;
            let status_catalog = await CatalogById(id);
            res.status(200).json({ message: 'Lista de catalogos', data: status_catalog });
        } catch (error) {
            res.status(502).json({ message: 'Error al listar los catalogos: ' + error.message });;
        }
    }

    async catalogbyname(req, res) {
        try {
            const name = req.body.catalog_name;
            let status_catalog = await CatalogByName(name);
            res.status(200).json({ message: 'Lista de catalogos', data: status_catalog });
        } catch (error) {
            res.status(502).json({ message: 'Error al listar los catalogos: ' + error.message });;
        }
    }

    async catalogall(req, res) {
        try {
            let status_catalog = await AllCatalog();
            res.status(200).json({ message: 'Lista de catalogos', data: status_catalog });
        } catch (error) {
            res.status(502).json({ message: 'Error al listar los catalogos: ' + error.message });;
        }
    }
}

module.exports = {
    CatalogController
}