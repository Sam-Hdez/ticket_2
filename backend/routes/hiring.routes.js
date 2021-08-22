const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const hiringController = require('../controllers/hiring.controller');
const { hiringMiddleware } = require('../middlewares/hiring.middleware');

const hiringMiddleware = new hiringMiddleware();

/* POST http://localhost:3000/catalog/ */
router.post('/create',
    /*cors(corsOption),*/
    hiringMiddleware.validateCreateHiring,
    hiringController.createHirig
);

/* GET http://localhost:3000/catalog/ */
router.get('/update',
    /*cors(corsOption),*/
    hiringMiddleware.validateGetHiring,
    hiringController.getCatalog
);

/* DELETE http://localhost:3000/catalog/ */
router.delete('/drop',
    /*cors(corsOption),*/
    hiringMiddleware.validateDeleteHiring,
    hiringController.removeHiring
);

/* PUT http://localhost:3000/catalog/ */
router.put('/list-all',
    /*cors(corsOption),*/
    hiringMiddleware.validateEditHiring,
    hiringController.editHiring
);

module.exports = router;