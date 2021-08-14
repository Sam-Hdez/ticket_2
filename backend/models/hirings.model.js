const { sequelize, DataTypes, Op } = require('../db/conexion');

const Hirings = sequelize.define('hirings', {
    hiring_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    hiring_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hiring_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    soft_skills: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hard_skills: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    we_offer: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    failed_message: {
        type: DataTypes.TEXT,
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

async function CreateTableHirings() {
    await Hirings.sync();
}

module.exports = {
    CreateTableHirings,
}