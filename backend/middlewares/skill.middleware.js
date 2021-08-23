const { checkSkill } = require('../services/skills.service');
const { SkillDTO } = require('../dto/skillDTO');
const Joi = require('joi');

const skill_dto = new SkillDTO();

const skillPost = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, skill_dto.post);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const skillPut = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, skill_dto.put);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const skillDelete = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, skill_dto.delete);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const SkillExist = async(req, res, next) => {
    try {
        let skill_exist = await checkSkill(req.body.skill_id);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

module.exports = {
    SkillExist,
    skillPost,
    skillPut,
    skillDelete
}