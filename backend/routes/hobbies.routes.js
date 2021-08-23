const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const hobby = require('../controllers/user.actions.controller');
const { HobbyExist, hobbyPost, hobbyPut, hobbyDelete } = require('../middlewares/hobby.middleware');
const cors = require('cors');

router.post('/create', /*cors(corsOption),*/ UserInSession, hobbyPost, hobby.CreateHobbyUser);
router.put('/update', /*cors(corsOption),*/ UserInSession, hobbyPut, HobbyExist, hobby.UpdateHobbyUser);
router.delete('/drop', /*cors(corsOption),*/ UserInSession, hobbyDelete, HobbyExist, hobby.DeleteHobbyUser);
router.get('/list-all', /*cors(corsOption),*/ UserInSession, hobby.AllHobbyUser);

module.exports = router;