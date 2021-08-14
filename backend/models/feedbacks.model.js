const { sequelize, DataTypes, Op } = require('../db/conexion');

const Feedbacks = sequelize.define('feedbacks', {
    feedback_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    visibility: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_general_feedback: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    relation_circle_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'MembersCircleEnterprises',
            key: 'relation_circle_id'
        }
    },
    skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Skills',
            key: 'skill_id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    underscored: true
});

async function CreateTableFeedbacks() {
    await Feedbacks.sync();
}

module.exports = {
    CreateTableFeedbacks,
}