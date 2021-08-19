const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const address = require('../controllers/user.actions.controller');

router.post('/create', /*cors(corsOption),*/ UserInSession, address.CreateAddressUser);
router.put('/update', /*cors(corsOption),*/ UserInSession, address.UpdateAddressUser);
router.delete('/drop', /*cors(corsOption),*/ UserInSession, address.DeleteAddressUser);
router.get('/list-all', /*cors(corsOption),*/ UserInSession, address.AllAddressUser);

module.exports = router;