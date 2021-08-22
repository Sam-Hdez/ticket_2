const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const hobby = require('../controllers/user.actions.controller');
const { HobbyExist } = require('../middlewares/hobby.middleware');
const cors = require('cors');

router.post('/create', /*cors(corsOption),*/ UserInSession, hobby.CreateHobbyUser);
router.put('/update', /*cors(corsOption),*/ UserInSession, HobbyExist, hobby.UpdateHobbyUser);
router.delete('/drop', /*cors(corsOption),*/ UserInSession, HobbyExist, hobby.DeleteHobbyUser);
router.get('/list-all', /*cors(corsOption),*/ UserInSession, hobby.AllHobbyUser);

module.exports = router;