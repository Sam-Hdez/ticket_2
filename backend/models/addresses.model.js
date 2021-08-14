const { sequelize, DataTypes, Op } = require('../db/conexion');

const Addresses = sequelize.define('addresses', {
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
    },
    outside_number: {
        type: DataTypes.STRING,
    },
    inside_number: {
        type: DataTypes.STRING,
    },
    home_references: {
        type: DataTypes.STRING,
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

async function CreateTableAddresses() {
    await Addresses.sync();
}

module.exports = {
    CreateTableAddresses,
}