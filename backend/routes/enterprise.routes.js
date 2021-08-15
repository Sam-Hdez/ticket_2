const express = require('express');
const router = express.Router();

const enterpriseController = require('../controllers/enterprise.controller');
const { EnterpriseMiddleware } = require('../middlewares/enterprise.middleware');

const enterpriseMiddleware = new EnterpriseMiddleware();

/* GET http://localhost:3000/enterprises/ */
router.get('/',
    enterpriseMiddleware.validateGetEnterprise,
    enterpriseController.getEnterprise
);

/* POST http://localhost:3000/enterprises/ */
router.post('/',
    enterpriseMiddleware.validateCreateEnterprise,
    enterpriseController.createEnterprise
);

/* PUT http://localhost:3000/enterprises/ */
router.put('/',
    enterpriseMiddleware.validateEditEnterprise,
    enterpriseController.editEnterprise
);

/* DELETE http://localhost:3000/enterprises/ */
router.delete('/',
    enterpriseMiddleware.validateDeleteEnterprise,
    enterpriseController.removeEnterprise
);


module.exports = router;