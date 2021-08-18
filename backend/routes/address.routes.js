const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const address = require('../controllers/user.actions.controller');

router.post('/create', /*cors(corsOption),*/ UserInSession, address.CreateAddressUser);

module.exports = router;