const { checkSkill } = require('../services/skills.service');

const SkillExist = async(req, res, next) => {
    try {
        let skill_exist = await checkSkill(req.body.skill_id);
        return next()
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

module.exports = {
    SkillExist,
}