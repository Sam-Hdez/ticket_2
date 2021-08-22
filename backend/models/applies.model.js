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
        defaultValue: true
    }
}, {
    underscored: true
});

async function CreateTableApplies() {
    try {
        await Applies.sync();
    } catch (e) {
        throw new Error(`Error al sincronizar el modelo Applies: ${e.message}`);
    }
}

class Apply {
    constructor(data) {
        this.user_id = data.user_id;
        this.hiring_id = data.hiring_id;
    }

    /**
     * Un usuario aplica a una vacante
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async createApply() {
        try {
            const applyCreated = await Applies.create({
                user_id: this.user_id,
                hiring_id: this.hiring_id,
                apply_status: 1
            });
            return applyCreated;
        } catch (error) {
            throw new Error('Error en la función createApply: ' + error.message);
        }
    }

    /**
     * El usuario comenta algo sobre la vacante a la que aplicó
     * @param id
     * @param data Objeto con el atributo user_comments
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async updateUserComments(id, data) {
        try {
            let apply_status = await Applies.update({
                user_comments: data.user_comments
            }, {
                where: {
                    apply_id: id
                }
            });
            return apply_status;
        } catch (error) {
            throw new Error('Error en la función updateUserComments: ' + error.message);
        }
    }

    /**
     * La empresa comenta algo sobre un usuario que aplicó a su vacante
     * @param id
     * @param data Objeto con los atributos: atributo apply_status: (0) La empresa rechaza la solicitud o la elimina | (2) La empresa acepta la solicitud | (3) Concluye el proceso con contratación. atributo enterprise_comments
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async updateEnterpriseComments(id, data) {
        try {
            let apply_state = await Applies.update({
                apply_status: data.apply_status,
                enterprise_comments: data.enterprise_comments
            }, {
                where: {
                    apply_id: id
                }
            });
            return apply_state;
        } catch (error) {
            throw new Error('Error en la función updateEnterpriseComments: ' + error.message);
        }
    }

    /**
     * Desactiva los datos de una aplicación
     * @param {string} id
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async deleteApply(id) {
        try {
            let apply_status = await Applies.update({
                active: false,
            }, {
                where: {
                    apply_id: id
                }
            });
            return apply_status;
        } catch (error) {
            throw new Error('Error en la función deleteApply: ' + error.message);
        }
    }
}

/**
 * Listar todas las aplicaciones de un usuario
 * @param {string} user
 * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
 */
async function AllAppliesUser(user) {
    try {
        let listApplies = await Applies.findAll({ where: { user_id: user, active: 1 } });
        return listApplies;
    } catch (error) {
        throw new Error('Error en la función AllAppliesUser: ' + error.message);
    }
}

module.exports = {
    CreateTableApplies,
    Apply,
    AllAppliesUser,
}