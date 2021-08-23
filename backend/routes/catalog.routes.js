const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { CatalogController } = require('../controllers/catalog.controller');
const { CatalogMiddleware } = require('../middlewares/catalog.middleware');
const { UserInSession } = require('../middlewares/user.middleware');

const catalogMiddleware = new CatalogMiddleware();
const catalogController = new CatalogController();

/* POST http://localhost:3000/catalog/ */
router.post('/create',
    /*cors(corsOption),*/
    UserInSession,
    catalogMiddleware.validateCreateCatalog,
    catalogController.CreateCatalog
);

/* GET http://localhost:3000/catalog/ */
router.put('/update',
    /*cors(corsOption),*/
    UserInSession,
    catalogMiddleware.validateEditCatalog,
    catalogController.UpdateCatalog
);

/* DELETE http://localhost:3000/catalog/ */
router.delete('/drop',
    /*cors(corsOption),*/
    UserInSession,
    catalogMiddleware.validateDeleteCatalog,
    catalogController.DeleteCatalog
);

/* PUT http://localhost:3000/catalog/ */
router.get('/list-all',
    /*cors(corsOption),*/
    UserInSession,
    catalogMiddleware.validateGetCatalog,
    catalogController.catalogbyid,
    catalogController.catalogbyname,
    catalogController.catalogall
);

module.exports = router;