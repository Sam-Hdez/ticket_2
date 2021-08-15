const { sequelize, DataTypes, Op } = require('../db/conexion');

const Hobbies = sequelize.define('hobbies', {
    hobby_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    hobby_name: {
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

async function CreateTableHobbies() {
    await Hobbies.sync();
}



module.exports = {
    CreateTableHobbies,
}