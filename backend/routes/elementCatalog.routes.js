const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const elementCatalogController = require('../controllers/elementCatalog.controller');
const { elementCatalogMiddleware } = require('../middlewares/elementCatalog.middleware');

const elementCatalogMiddleware = new elementCatalogMiddleware();

/* POST http://localhost:3000/elementCatalog/ */
router.post('/create',
    /*cors(corsOption),*/
    catalogMiddleware.validateCreateElementCatalog,
    catalogController.createElementCatalog
);

/* GET http://localhost:3000/elementCatalog/ */
router.get('/update',
    /*cors(corsOption),*/
    catalogMiddleware.validateGetElementCatalog,
    catalogController.getElementCatalog
);

/* DELETE http://localhost:3000/elementCatalog/ */
router.delete('/drop',
    /*cors(corsOption),*/
    catalogMiddleware.validateDeleteElementCatalog,
    catalogController.removeCatalog
);

/* PUT http://localhost:3000/elementCatalog/ */
router.put('/list-all',
    /*cors(corsOption),*/
    catalogMiddleware.validateEditElementCatalog,
    catalogController.editElementCatalog
);

module.exports = router;