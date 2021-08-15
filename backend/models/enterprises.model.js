const {sequelize, DataTypes, Op} = require('../db/conexion');

const Enterprises = sequelize.define('enterprises', {
    enterprise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    enterprise_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    system_owner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    underscored: true
});

class Enterprise {

    /**
     * Crea una nueva empresa en la base de datos
     * @param {string} enterpriseName
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async createEnterprise(enterpriseName) {
        try {
            return Enterprises.create({
                enterprise_name: enterpriseName,
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Actualiza datos de una empresa
     * @param {Object} data
     * @param {string} data.name Nombre de la empresa.
     * @param {number} data.id Id de la empresa.
     * @param {boolean?} data.system_owner Opcional modificar el dueño del sistema.
     * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
     */
    async updateEnterprise(data) {
        try {
            return Enterprises.update({
                enterprise_name: data.name,
                system_owner: data.system_owner || false,
            }, {where: {enterprise_id: data.id}});
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Borra una empresa de la base de datos
     * @param {number} id
     * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
     */
    async deleteEnterprise(id) {
        try {
            return Enterprises.update({
                active: false
            }, {where: {enterprise_id: id}});
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Obtén el registro de una empresa por su ID
     * @param {number} id
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    async getEnterpriseById(id) {
        try {
            return Enterprises.findOne({
                where: {
                    enterprise_id: id,
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
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Obtén el registro de una empresa por su nombre
     * @param {string} name
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    async getEnterpriseByName(name) {
        try {
            return Enterprises.findOne({
                where: {
                    enterprise_name: name,
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
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Obtén una lista de todas las empresas
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
     */
    async getAllEnterprises() {
        try {
            return Enterprises.findAll({
                where: {
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
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Verifica si existe una empresa por su nombre
     * @param {string} enterpriseName
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    async verifyIfEnterpriseExists(enterpriseName) {
        return Enterprises.findOne({where: {enterprise_name: enterpriseName}});
    }
}

async function CreateTableEnterprises() {
    await Enterprises.sync();
}

module.exports = {
    Enterprises,
    Enterprise,
    CreateTableEnterprises,
}