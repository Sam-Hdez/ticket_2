const { sequelize, DataTypes, Op } = require('../db/conexion');

const Catalogs = sequelize.define('catalogs', {
    catalog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    catalog_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enterprise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Enterprises',
            key: 'enterprise_id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    underscored: true
});

async function CreateTableCatalogs() {
    await Catalogs.sync();
}

module.exports = {
    CreateTableCatalogs,
}