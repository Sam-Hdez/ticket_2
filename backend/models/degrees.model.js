const { sequelize, DataTypes, Op } = require('../db/conexion');

const Degrees = sequelize.define('degrees', {
    degree_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    degree_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    institute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: false
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
        defaultValue: 1
    }
}, {
    underscored: true
});

async function CreateTableDegrees() {
    await Degrees.sync();
}

module.exports = {
    CreateTableDegrees,
}