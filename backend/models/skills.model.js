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

class Skill {
    constructor(data) {
        this.user_id = data.user_id;
        this.type_skill = data.type_skill;
        this.skill_name = data.skill_name;
    }

    async createSkill() {
        try {
            const skillCreated = await Skills.create({
                user_id: this.user_id,
                type_skill: this.type_skill,
                skill_name: this.skill_name,
            });
            return skillCreated;
        } catch (error) {
            throw new Error('Error en la función createAddress: ' + error.message);
        }
    }

    async updateSkill(id, data) {
        try {
            let skill_status = await Skills.update({
                type_skill: data.type_skill,
                skill_name: data.skill_name,
            }, {
                where: {
                    skill_id: id
                }
            });
            return skill_status;
        } catch (error) {
            throw new Error('Error en la función updateSkill: ' + error.message);
        }
    }

    async deleteSkill(id) {
        try {
            let skill_status = await Skills.update({
                active: 0,
            }, {
                where: {
                    skill_id: id
                }
            });
            return skill_status;
        } catch (error) {
            throw new Error('Error en la función deleteSkill: ' + error.message);
        }
    }
}

async function AllSkillsUser(user) {
    try {
        let listAddress = await Skills.findAll({ where: { user_id: user, active: 1 } });
        return listAddress;
    } catch (error) {
        throw new Error('Error en la función AllSkillsUser: ' + error.message);
    }
}

module.exports = {
    CreateTableSkills,
    Skill,
    AllSkillsUser,
}