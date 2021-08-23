const { checkHobby } = require('../services/hobbies.service');
const { HobbiesDTO } = require('../dto/hobbies.DTO');
const Joi = require('joi');

const hobby_dto = new HobbiesDTO();

const hobbyPost = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, hobby_dto.post);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const hobbyPut = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, hobby_dto.put);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const hobbyDelete = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, hobby_dto.delete);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const HobbyExist = async(req, res, next) => {
    try {
        let hobby_exist = await checkHobby(req.body.hobby_id);
        return next()
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

module.exports = {
    HobbyExist,
    hobbyPost,
    hobbyPut,
    hobbyDelete,
}