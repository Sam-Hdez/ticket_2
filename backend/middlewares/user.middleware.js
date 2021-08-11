const { isAdmin } = require('../models/users.model');
const { descubrirToken } = require('../services/jwt.service');
const Joi = require('joi');
const { loginDTO } = require('../dto/users/login.dto');
const { altaUserDTO } = require('../dto/users/register.dto');
const { changePassDTO } = require('../dto/users/changepassword.dto');


const UserInSession = async(req, res, next) => {
    try {
        if (req.headers.authorization != undefined) {
            const token = req.headers.authorization.split(' ')[1];
            let verificado = await descubrirToken(token);
            //console.log(verificado.data);
            //console.log(req.params);
            return next()
        } else {
            throw new Error('Este es un sistema seguro y requiere autorización')
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const LevelAdmin = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let verificado = await descubrirToken(token);
        const email = await verificado.data.email;
        const result = await isAdmin(email);
        //console.log(result)
        next();
    } catch (error) {
        res.status(403).json({ error: 'Ocurrio un error en la función LevelAdmin: ' + error.message }) //403 Forbidden El usuario no tiene acceso a ese contenido
    }
}

const checkDatosLogin = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, loginDTO, "Los datos enviados no son correctos");
        return next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const checkDatosAlta = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, altaUserDTO, "Los datos enviados no son correctos");
        return next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const checkDatosChangePass = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, changePassDTO, "Los datos enviados no son correctos");
        return next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    UserInSession,
    LevelAdmin,
    checkDatosLogin,
    checkDatosAlta,
    checkDatosChangePass
}