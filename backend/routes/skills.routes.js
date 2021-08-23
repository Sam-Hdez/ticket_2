const express = require('express');
const router = express.Router();

const { corsOption } = require('../middlewares/index.middleware');
const { UserInSession } = require('../middlewares/user.middleware');
const skill = require('../controllers/user.actions.controller');
const { SkillExist, skillPost, skillPut, skillDelete } = require('../middlewares/skill.middleware');
const cors = require('cors');

router.post('/create', /*cors(corsOption),*/ UserInSession, skillPost, skill.CreateSkillUser);
router.put('/update', /*cors(corsOption),*/ UserInSession, skillPut, SkillExist, skill.UpdateSkillUser);
router.delete('/drop', /*cors(corsOption),*/ UserInSession, skillDelete, SkillExist, skill.DeleteSkillUser);
router.get('/list-all', /*cors(corsOption),*/ UserInSession, skill.AllSkillUser);

module.exports = router;