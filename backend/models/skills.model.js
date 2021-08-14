const { sequelize, DataTypes, Op } = require('../db/conexion');

const Skills = sequelize.define('skills', {
    skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    type_skill: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    skill_name: {
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

async function CreateTableSkills() {
    await Skills.sync();
}

module.exports = {
    CreateTableSkills,
}