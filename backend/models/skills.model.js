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
        defaultValue: true
    }
}, {
    underscored: true
});

async function CreateTableSkills() {
    try {
        await Skills.sync();
    } catch (e) {
        throw new Error(`Error al sincronizar el modelo Skills: ${e.message}`);
    }
}

class Skill {
    constructor(data) {
        this.user_id = data.user_id;
        this.type_skill = data.type_skill;
        this.skill_name = data.skill_name;
    }

    /**
     * Crea una skill para un usuario
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
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

    /**
     * Actualización de skill
     * @param id
     * @param data Objeto con los atributos type_skill and skill_name
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
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

    /**
     * Desactiva los datos de una skill
     * @param {string} id
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async deleteSkill(id) {
        try {
            let skill_status = await Skills.update({
                active: false,
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

/**
 * Listar todas las skills de un usuario
 * @param {string} user
 * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
 */
async function AllSkillsUser(user) {
    try {
        let listSkill = await Skills.findAll({ where: { user_id: user, active: 1 }, attributes: ['skill_id', 'type_skill', 'skill_name'] });
        return listSkill;
    } catch (error) {
        throw new Error('Error en la función AllSkillsUser: ' + error.message);
    }
}

/**
 * Obtener todos los ids de las skills de un usuario
 * @param {string} user
 * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
 */
async function AllSkillsUserIds(user) {
    try {
        let listSkill = await Skills.findAll({ where: { user_id: user, active: 1 }, attributes: ['skill_id'] });
        let skills_ids = [];
        listSkill.forEach(skill => {
            skills_ids.push(skill.dataValues.skill_id);
        });
        return skills_ids;
    } catch (error) {
        throw new Error('Error en la función getMonthsIds: ' + error.message);
    }
}

/**
 * Verifica la existencia de una skill
 * @param {string} data
 * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
 */
async function check_skill(data) {
    try {
        let skill = await Skills.findByPk(data);

        if (skill === null) {
            throw new Error('Skill not found');
        } else {
            return skill;
        }
    } catch (error) {
        throw new Error('Error en la función check_skill: ' + error.message);
    }
}

module.exports = {
    CreateTableSkills,
    Skill,
    AllSkillsUser,
    AllSkillsUserIds,
    check_skill
}