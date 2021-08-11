const corsOption = {
    origin: function(origin, callback) {
        if (process.env.LISTA_BLANCA.indexOf(origin) !== -1) {
            //devuelve menos uno si el dato no esta dentro del array
            callback(null, true);
        } else {
            callback(new Error('No autorizado por CORS'));
        }
    }
}

module.exports = {
    corsOption,
}