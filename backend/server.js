const express = require('express');
const app = express();
const { sequelize } = require('./db/conexion');
const { models } = require('./db/createModels');

require('dotenv').config();
const cors = require('cors');

//MIDDLEWARE GLOBALES
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user.routes');

app.use('/user', userRoutes);

async function server() {
    try {
        await sequelize.authenticate();
        console.log(`Se ha realizado la conexión exitosa a ${process.env.DB_NAME}`);

        app.listen(process.env.PORT, function() {
            console.log(`Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`);
        });

        await models();

    } catch (error) {
        console.error('No se pudo conectar correctamebte con la Base de datos:', error);
    }
}


server();