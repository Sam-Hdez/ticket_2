const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const skill = require('../controllers/user.actions.controller');
const { SkillExist } = require('../middlewares/skill.middleware');

router.post('/create', /*cors(corsOption),*/ UserInSession, skill.CreateSkillUser);
router.put('/update', /*cors(corsOption),*/ UserInSession, SkillExist, skill.UpdateSkillUser);
router.delete('/drop', /*cors(corsOption),*/ UserInSession, SkillExist, skill.DeleteSkillUser);
router.get('/list-all', /*cors(corsOption),*/ UserInSession, skill.AllSkillUser);

module.exports = router;