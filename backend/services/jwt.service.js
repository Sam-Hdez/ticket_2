const jwt = require('jsonwebtoken');

const generarToken = async(payload) => {
    try {
        delete payload.encrypted_password;
        //Codificar variable user_id
        payload.user_id = Buffer.from(payload.user_id + '|' + process.env.STRING_STRONG).toString('base64');
        //console.log(payload);
        const token = jwt.sign({ data: payload }, process.env.JWT_SEED, { expiresIn: '12h' }); //30 min solo por pruebas
        return token;
    } catch (error) {
        throw new Error('Error al generar Token: ' + error);
    }
}

const descubrirToken = async(token) => {
    try {
        const resultado = jwt.verify(token, process.env.JWT_SEED);
        console.log(resultado);
        if (resultado) {
            return resultado;
        } else {
            throw new Error('Token no válido');
        }
    } catch (error) {
        throw new Error('Error al verificar Token: ' + error.message)
    }
}

const obtenerIdUsser = async(token) => {
    try {
        const resultado = jwt.verify(token, process.env.JWT_SEED);
        if (resultado) {
            //Decodificar variable user_id
            let user = Buffer.from(resultado.data.user_id, 'base64').toString('ascii');
            //Separar la cadena por el valor definido: | y devolver la posición del user_id
            return user.split("|")[0];
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
    obtenerIdUsser
};