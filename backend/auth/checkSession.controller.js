const { jwt } = require("../services/jwt.service");

async function check_session(req, res) {
    try {
        //console.log('Entrando a checkSession');
        let token = jwt.decode(req.headers.authorization.split(' ')[1]);
        //console.log(token.data.rol_id)
        let valido = { status: true, message: 'Bienvenido', type: token.data.rol_id, user: { id: token.data.user_id, name: token.data.first_name } };
        res.status(200).json(valido);
    } catch (error) {
        res.status(400).json('Usuario no autenticado, redirigir a Login: ' + error.message);
    }
}

module.exports = {
    check_session,
}