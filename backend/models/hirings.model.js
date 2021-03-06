const { sequelize, DataTypes, Op } = require('../db/conexion');
const { Enterprises } = require('./enterprises.model');

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

class Hiring {
    constructor(data){
        this.enterprise_id = data.enterprise_id;
        this.hiring_name = data.hiring_name;
        this.hiring_description = data.hiring_description;
        this.soft_skills = data.soft_skills;
        this.hard_skills = data.hard_skills;
        this.we_offer = data.we_offer;
        this.salary = data.salary;
    }

    /**
     * Crea un nuevo elemento del hiring
     */
    async createHiring() {
        try {
            const Hiringcreate = await Hirings.create ({
                enterprise_id: this.enterprise_id,
                hiring_name: this.hiring_name,
                hiring_description: this.hiring_description,
                soft_skills: this.soft_skills,
                hard_skills: this.hard_skills,
                we_offer: this.we_offer,
                salary: this.salary
            });
            return hiringcreate;
        } catch (error) {
            throw new Error('Error en la funci??n createHiring: ' + error.message);
        }
    }

    /**
     * Actualiza datos del hiring                                                                                                                            
     */
     async updateHiring(id, data) {
        try {
            let hiring_status = await Hirings.update({
                enterprise_id: this.enterprise_id,
                hiring_name: this.hiring_name,
                hiring_description: this.hiring_description,
                soft_skills: this.soft_skills,
                hard_skills: this.hard_skills,
                we_offer: this.we_offer,
                salary: this.salary
            }, {
                where: {
                    hiring_id: id
                }
            });
            return hiring_status;
        } catch (error) {
            throw new Error('Error en la funci??n updatehiring: ' + error.message);
        }
    }

    /**
     * Borra un hiring
     * @param {number} id
     */
     async deleteHiring(id) {
        try {
            let hiring_status = await Hirings.update({
                active: false,
            }, {
                where: {
                    hiring_id: id
                }
            });
            return hiring_status;
        } catch (error) {
            throw new Error('Error en la funci??n deletehiring: ' + error.message);
        }
    }

    /**
     * Obt??n el registro del hiring por su id
     * @param {number} id
     */
    async getHiringById(id) {
        try {
            return Hirings.findOne({
                where: {
                    hiring_id: id,
                    active: true
                },
                attributes: {
                    exclude: [
                        'updated_at',
                        'created_at',
                        'active'
                    ]
                }
            });
        } catch (error) {
            throw new Error('Error en la funci??n getHiringById: ' + error.message);
        }
    }

    async getHiringsByEnterpriseId(id){
        try {
            return Hirings.findAll({
                where: {
                    enterprise_id: id,
                },
                attributes: {
                    exclude: [
                        'updated_at',
                        'created_at',
                        'active'
                    ]
                }
            });
        } catch (e) {
            throw new Error(`Error en la funci??n getHiringsByEnterpriseId `+ e.message);
        }
    }

}

async function CreateTableHirings() {
    try {
        await Hirings.sync();
    } catch (e) {
        throw new Error(`Error al sincronizar el modelo Hirings: ${e.message}`);
    }
}

module.exports = {
    CreateTableHirings,
    Hirings,
    Hiring
}