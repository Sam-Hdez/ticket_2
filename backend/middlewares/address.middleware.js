const { checkAddress } = require('../services/addresses.service');

const { AddressDTO } = require('../dto/addressDTO');
const Joi = require('joi');

const address_dto = new AddressDTO();

const addressPost = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, address_dto.post);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const addressPut = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, address_dto.put);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const addressDelete = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, address_dto.delete);
        return next();
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const AddressExist = async(req, res, next) => {
    try {
        let address_exist = await checkAddress(req.body.address_id);
        return next()
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

module.exports = {
    AddressExist,
    addressPost,
    addressPut,
    addressDelete
}