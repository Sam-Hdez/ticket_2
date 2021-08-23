const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession, LevelAdmin, checkDatosLogin, checkDatosAlta, checkDatosChangePass } = require('../middlewares/user.middleware');
const user = require('../controllers/user.controller');
const profile = require('../controllers/profile.controller');
const { check_session } = require('../auth/checkSession.controller');
const cors = require('cors');
const path = require('path');

const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname) )
    }
});

const upload = multer({ storage: storage });

router.post('/login', /*cors(corsOption),*/ checkDatosLogin, user.loginController);
router.post('/register', /*cors(corsOption),*/ upload.single('image'), checkDatosAlta, user.registerController);
router.get('/list-users', /*cors(corsOption),*/ /*LevelAdmin,*/ UserInSession, user.listUsers);
router.put('/edit/:id', /*cors(corsOption),*/ LevelAdmin, UserInSession, user.editController);
router.delete('/delete/:id', /*cors(corsOption),*/ LevelAdmin, UserInSession, user.deleteController);
router.put('/changePassword', /*cors(corsOption),*/ checkDatosChangePass, user.recoverPassword);

router.get('/checkSession', cors(corsOption), UserInSession, check_session);

router.get('/profile', UserInSession, profile.personalProfileController);

router.get('/profile/:id', UserInSession, profile.personalProfileByIdController);

//router.get('/profile/:id', UserInSession, );

module.exports = router;