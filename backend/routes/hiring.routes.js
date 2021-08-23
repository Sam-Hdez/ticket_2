const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { HiringController } = require('../controllers/hiring.controller');
const { HiringMiddleware } = require('../middlewares/hiring.middleware');
const { UserInSession } = require('../middlewares/user.middleware');

const hiringMiddleware = new HiringMiddleware();
const hiringController = new HiringController();

/* POST http://localhost:3000/catalog/ */
router.post('/create',
    /*cors(corsOption),*/
    UserInSession,
    hiringMiddleware.validateCreateHiring,
    hiringController.CreateHiring
);

/* GET http://localhost:3000/catalog/ */
router.put('/update',
    /*cors(corsOption),*/
    UserInSession,
    hiringMiddleware.validateEditHiring,
    hiringController.UpdateHiring
);

/* DELETE http://localhost:3000/catalog/ */
router.delete('/drop',
    /*cors(corsOption),*/
    UserInSession,
    hiringMiddleware.validateDeleteHiring,
    hiringController.DeleteHiring
);

/* PUT http://localhost:3000/catalog/ */
router.get('/list-all',
    /*cors(corsOption),*/
    UserInSession,
    hiringMiddleware.validateGetHiring,
    hiringController.hiringbyid,
    hiringController.hiringbyidenterprise
);

module.exports = router;