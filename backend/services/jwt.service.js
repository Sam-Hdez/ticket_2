const jwt = require('jsonwebtoken');

const generarToken = async(payload) => {
    try {
        delete payload.password;
        const token = jwt.sign({ data: payload }, process.env.JWT_SEED, { expiresIn: '10min' }); //30 min solo por pruebas
        return token;
    } catch (error) {
        throw new Error('Error al generar Token: ' + error);
    }
}

const descubrirToken = async(token) => {
    try {
        const resultado = jwt.verify(token, process.env.JWT_SEED);
        if (resultado) {
            return resultado;
        } else {
            throw new Error('Token no válido');
        }
    } catch (error) {
        throw new Error('Error al verificar Token: ' + error.message)
    }
}

module.exports = {
    generarToken,
    descubrirToken,
    jwt,
};