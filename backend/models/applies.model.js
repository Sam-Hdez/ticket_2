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