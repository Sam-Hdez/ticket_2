const { sequelize, DataTypes, Op } = require('../db/conexion');

const ElementsCatalog = sequelize.define('elementsCatalog', {
    element_catalog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    element_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    catalog_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Catalogs',
            key: 'catalog_type'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    underscored: true
});

async function CreateTableElementsCatalog() {
    await ElementsCatalog.sync();
}

module.exports = {
    CreateTableElementsCatalog,
}