const express = require('express');
const router = express.Router();

const userCircleController = require('../controllers/userCircle.controller');
const { UserCircleMiddleware } = require('../middlewares/userCircle.middleware');

const userCircleMiddleware = new UserCircleMiddleware();

/* GET http://localhost:3000/userCircle/ */
router.get('/',
    userCircleMiddleware.validateGetUserCircle,
    userCircleController.getUserCircle
);

/* POST http://localhost:3000/userCircle/ */
router.post('/',
    userCircleMiddleware.validateCreateUserCircle,
    userCircleController.createUserCircle
);

/* PUT http://localhost:3000/userCircle/ */
router.put('/',
    userCircleMiddleware.validateEditUserCircle,
    userCircleController.editUserCircle
);

/* DELETE http://localhost:3000/userCircle/ */
router.delete('/',
    userCircleMiddleware.validateDeleteUserCircle,
    userCircleController.removeUserCircle
);

module.exports = router;