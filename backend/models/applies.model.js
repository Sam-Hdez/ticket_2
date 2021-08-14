const { sequelize, DataTypes, Op } = require('../db/conexion');

const Applies = sequelize.define('applies', {
    apply_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    apply_status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_comments: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    enterprise_comments: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    hiring_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Hirings',
            key: 'hiring_id'
        }
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

async function CreateTableApplies() {
    await Applies.sync();
}

module.exports = {
    CreateTableApplies,
}