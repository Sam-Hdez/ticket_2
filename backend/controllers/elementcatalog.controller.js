const { newElementCatalog, editElementCatalog, deleteElementCatalog, ElementCatalogByName } = require('../services/elementsCatalogs.service')

class ElementCatalogController {
    async CreateElementCatalog(req, res) {
        try {
            let elementcatalog = { catalog_type: req.body.catalog_type, element_name: req.body.element_name }
            let status_elementcatalog = await newElementCatalog(elementcatalog);
            res.status(200).json({ message: 'Elemento del catalogo creado: ' + status_elementcatalog.element_name });
        } catch (error) {
            res.status(502).json({ message: 'Error al crear el elemento del catalogo: ' + error.message });;
        }
    }

    async UpdateElementCatalog(req, res) {
        try {
            let elementcatalog = { element_catalog_id: req.body.element_catalog_id, element_name: req.body.element_name }
            let status_elementcatalog = await editElementCatalog(elementcatalog);
            res.status(200).json({ message: 'Elemento del Catalogo actualizado: ' + status_elementcatalog.element_name });
        } catch (error) {
            res.status(502).json({ message: 'Error al actualizar los elementos del catalogo: ' + error.message });;
        }
    }

    async DeleteElementCatalog(req, res) {
        try {
            let elementcatalog = { element_catalog_id: req.body.element_catalog_id, element_name: req.body.element_name }
            let status_elementcatalog = await deleteElementCatalog(elementcatalog);
            res.status(200).json({ message: 'Elemento de Catalogo eliminado' + status_elementcatalog.element_name});
        } catch (error) {
            res.status(502).json({ message: 'Error al eliminar el elemento de un catalogo: ' + error.message });;
        }
    }

    async elementcatalogbyname(req, res) {
        try {
            const name = req.body.element_name;
            let status_elementcatalog = await ElementCatalogByName(name);
            res.status(200).json({ message: 'Lista de los elementos del catalogo', data: status_elementcatalog });
        } catch (error) {
            res.status(502).json({ message: 'Error al listar los elementos del catalogo: ' + error.message });;
        }
    }
}

module.exports = {
    ElementCatalogController
}