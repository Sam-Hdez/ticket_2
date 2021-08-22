const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const catalogController = require('../controllers/catalog.controller');
const { CatalogMiddleware } = require('../middlewares/catalog.middleware');

const catalogMiddleware = new CatalogMiddleware();

/* POST http://localhost:3000/catalog/ */
router.post('/create',
    /*cors(corsOption),*/
    catalogMiddleware.validateCreateCatalog,
    catalogController.createCatalog
);

/* GET http://localhost:3000/catalog/ */
router.get('/update',
    /*cors(corsOption),*/
    catalogMiddleware.validateGetCatalog,
    catalogController.getCatalog
);

/* DELETE http://localhost:3000/catalog/ */
router.delete('/drop',
    /*cors(corsOption),*/
    catalogMiddleware.validateDeleteCatalog,
    catalogController.removeCatalog
);

/* PUT http://localhost:3000/catalog/ */
router.put('/list-all',
    /*cors(corsOption),*/
    catalogMiddleware.validateEditCatalog,
    catalogController.editCatalog
);

module.exports = router;