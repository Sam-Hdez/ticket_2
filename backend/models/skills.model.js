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
            const skillCreated = await Addresses.create({
                user_id: this.user_id,
                type_skill: this.type_skill,
                skill_name: this.skill_name,
            });
            return skillCreated;
        } catch (error) {
            throw new Error('Error en la función createAddress: ' + error.message);
        }
    }

    /*async updateAddress(id, data) {
        try {
            let address_status = await Users.update({
                country: data.country,
                city: data.city,
                street: data.street,
                outside_number: data.outside_number,
                inside_number: data.inside_number,
                home_references: data.home_references,
            }, {
                where: {
                    address_id: id
                }
            });
            return address_status;
        } catch (error) {
            throw new Error('Error en la función updateAddress: ' + error.message);
        }
    }

    async deleteAddress(id) {
        try {
            let address_status = await Users.update({
                active: 0,
            }, {
                where: {
                    address_id: id
                }
            });
            return address_status;
        } catch (error) {
            throw new Error('Error en la función deleteAddress: ' + error.message);
        }
    }*/
}

module.exports = {
    CreateTableSkills,
}