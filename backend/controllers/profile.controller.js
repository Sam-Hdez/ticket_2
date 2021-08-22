const { obtenerIdUsser } = require('../services/jwt.service');
const { personalProfile } = require('../services/profile.service');

async function personalProfileController(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = await obtenerIdUsser(token);

        let personal_profile = await personalProfile(user);

        res.status(200).json({ message: 'Perfil personal', data: personal_profile });
    } catch (error) {
        res.status(400).json({ message: `Sistema seguro, error en autenticación: ${error.message}` });
    }
}

module.exports = {
    personalProfileController,
}