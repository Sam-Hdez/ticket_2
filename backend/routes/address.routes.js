const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const address = require('../controllers/user.actions.controller');
const { AddressExist } = require('../middlewares/address.middleware');
const cors = require('cors');

router.post('/create', /*cors(corsOption),*/ UserInSession, address.CreateAddressUser);
router.put('/update', /*cors(corsOption),*/ UserInSession, AddressExist, address.UpdateAddressUser);
router.delete('/drop', /*cors(corsOption),*/ UserInSession, AddressExist, address.DeleteAddressUser);
router.get('/list-all', /*cors(corsOption),*/ UserInSession, address.AllAddressUser);

module.exports = router;