const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const hobby = require('../controllers/user.actions.controller');

router.post('/create', /*cors(corsOption),*/ UserInSession, hobby.CreateHobbyUser);
router.put('/update', /*cors(corsOption),*/ UserInSession, hobby.UpdateHobbyUser);
router.delete('/drop', /*cors(corsOption),*/ UserInSession, hobby.DeleteHobbyUser);
router.get('/list-all', /*cors(corsOption),*/ UserInSession, hobby.AllHobbyUser);

module.exports = router;