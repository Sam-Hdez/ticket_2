const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession, LevelAdmin, checkDatosLogin, checkDatosAlta, checkDatosChangePass } = require('../middlewares/user.middleware');
const user = require('../controllers/user.controller');
const profile = require('../controllers/profile.controller');

router.post('/login', /*cors(corsOption),*/ checkDatosLogin, user.loginController);
router.post('/register', /*cors(corsOption),*/ checkDatosAlta, user.registerController);
router.get('/list-users', /*cors(corsOption),*/ LevelAdmin, UserInSession, user.listUsers);
router.put('/edit/:id', /*cors(corsOption),*/ LevelAdmin, UserInSession, user.editController);
router.delete('/delete/:id', /*cors(corsOption),*/ LevelAdmin, UserInSession, user.deleteController);
router.put('/changePassword', /*cors(corsOption),*/ checkDatosChangePass, user.recoverPassword); //Añadir validación con JOI

router.get('/profile', UserInSession, profile.personalProfileController);
//router.get('/profile/:id', UserInSession, );

module.exports = router;