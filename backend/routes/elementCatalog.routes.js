const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { ElementCatalogController } = require('../controllers/elementCatalog.controller');
const { ElementCatalogMiddleware } = require('../middlewares/elementCatalog.middleware');
const { UserInSession } = require('../middlewares/user.middleware');

const elementCatalogMiddleware = new ElementCatalogMiddleware();
const elementCatalogController = new ElementCatalogController();

/* POST http://localhost:3000/elementCatalog/ */
router.post('/create',
    /*cors(corsOption),*/
    UserInSession,
    elementCatalogMiddleware.validateCreateElementCatalog,
    elementCatalogController.CreateElementCatalog
);

/* GET http://localhost:3000/elementCatalog/ */
router.put('/update',
    /*cors(corsOption),*/
    UserInSession,
    elementCatalogMiddleware.validateEditElementCatalog,
    elementCatalogController.UpdateElementCatalog
);

/* DELETE http://localhost:3000/elementCatalog/ */
router.delete('/drop',
    /*cors(corsOption),*/
    UserInSession,
    elementCatalogMiddleware.validateDeleteElementCatalog,
    elementCatalogController.DeleteElementCatalog
);

/* PUT http://localhost:3000/elementCatalog/ */
router.get('/list-all',
    /*cors(corsOption),*/
    UserInSession,
    elementCatalogMiddleware.validateGetElementCatalog,
    elementCatalogController.elementcatalogbyname
);

module.exports = router;