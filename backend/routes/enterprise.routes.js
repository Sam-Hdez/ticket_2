const express = require('express');
const router = express.Router();

const { EnterpriseController } = require('../controllers/enterprise.controller');
const { EnterpriseMiddleware } = require('../middlewares/enterprise.middleware');
const cors = require('cors');
const { corsOption } = require('../middlewares/index.middleware');

const enterpriseMiddleware = new EnterpriseMiddleware();
const enterpriseController = new EnterpriseController();

/* GET http://localhost:3000/enterprises/ */
/* Obtiene una lista de las empresas de la DB */
router.get('/',
    cors(corsOption),
    enterpriseController.getAllEnterprises
);

/* GET http://localhost:3000/enterprises/:id */
/* Obtiene la empresa por id */
router.get('/:id',
    cors(corsOption),
    enterpriseController.getEnterpriseById
);

/* POST http://localhost:3000/enterprises/ */
router.post('/',
    cors(corsOption),
    enterpriseMiddleware.validateCreateEnterprise,
    enterpriseController.createEnterprise
);

/* PUT http://localhost:3000/enterprises/ */
router.put('/',
    cors(corsOption),
    enterpriseMiddleware.validateEditEnterprise,
    enterpriseController.editEnterprise
);

/* DELETE http://localhost:3000/enterprises/ */
router.delete('/',
    cors(corsOption),
    enterpriseMiddleware.validateDeleteEnterprise,
    enterpriseController.removeEnterprise
);


module.exports = router;