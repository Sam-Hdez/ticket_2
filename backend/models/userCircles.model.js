const { sequelize, DataTypes, Op } = require('../db/conexion');
//const { Users } = require('./users.model');


const UserCircles = sequelize.define('users_circles', {
    circle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    type_circle: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    underscored: true
});

async function CreateTableUserCircles() {
    await UserCircles.sync();
}

module.exports = {
    CreateTableUserCircles,
    UserCircles
}