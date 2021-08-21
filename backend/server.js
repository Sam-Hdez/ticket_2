const express = require('express');
const app = express();
const { sequelize } = require('./db/conexion');
const { models } = require('./db/createModels');
const errorHandler = require('./helpers/errorHandler');

require('dotenv').config();
const cors = require('cors');

//MIDDLEWARE GLOBALES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(require('morgan')('dev'));

const userRoutes = require('./routes/user.routes');
const enterpriseRoutes = require('./routes/enterprise.routes');
const userCircleRoutes = require('./routes/userCircle.routes');
const addressRoutes = require('./routes/address.routes');
const skillRoutes = require('./routes/skills.routes');
const membersCircleEnterprisesRoutes = require('./routes/membersCircleEnterprises.routes');

app.get('/', (req,res) => {
    return res.status(200).json({ msg: `El servidor esta funcionando correctamente :D`});
});
app.use('/user', userRoutes);
app.use('/enterprises', enterpriseRoutes);
app.use('/usercircles', userCircleRoutes);
app.use('/address', addressRoutes);
app.use('/skill', skillRoutes);
app.use('/membersCircleEnterprises', membersCircleEnterprisesRoutes);

// El manejador de errores debe ir abajo de las rutas,
// suponemos que si ninguna ruta llega a manejar la petición
// llega a este punto donde marcamos el error 404 por que la ruta no existe.
app.use(errorHandler);

async function server() {
    console.log(`Checando conexión con la base de datos...`);
    try {
        await assertDatabaseConnection(); //Hace la conexión a la base de datos
        console.log('Conexión exitosa con la base de datos.');
        startServer(); //Inicia el servidor de node
        await models(); //Sincroniza los modelos en la base de datos
    } catch (error) {
        throw new Error(error.message);
    }
}

server()
    .then( () => {
        console.log(`---------------------------------------`);
        console.log(`Inicio de la aplicación SATISFACTORIA.`);
        console.log(`Host: http://${process.env.HOST}:${process.env.PORT}`);
        console.log(`---------------------------------------`);
    })
    .catch( (error) => {
        console.log(`---------------------------------------`);
        console.log(`Error al iniciar la aplicación (REVISA EL ERROR DE LA APLICACIÓN): \n${error}`);
        console.log(`---------------------------------------`);
    });


async function assertDatabaseConnection() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        throw new Error('Imposible conectarse a la base de datos:\n' + error.message);
    }
}
function startServer() {
    app.listen(process.env.PORT, function() {
        console.log(`Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`);
    });
}