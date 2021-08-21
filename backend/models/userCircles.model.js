const { sequelize, DataTypes, Op } = require('../db/conexion');
//const { Users } = require('./users.model');


const UserCircles = sequelize.define('users_circles', {
    circle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    type_circle: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

class UserCircle {

    /**
     *
     * @param {Object} circle
     * @param {number} circle.typeCircle Tipo de circulo 1 amigos, 2 colegas, 3 empleo --Invitación para el tipo de feedback
     * @param {number} circle.userId
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async createUserCircle(circle) {
        try {
            return UserCircles.create({
                type_circle: circle.typeCircle,
                user_id: circle.userId,
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     *
     * @param {Object} circle
     * @param {number} circle.typeCircle Tipo de circulo 1 amigos, 2 colegas, 3 empleo --Invitación para el tipo de feedback
     * @param {number} circle.userId
     * @param {number} circle.id
     * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
     */
    async updateUserCircle(circle) {
        try {
            return UserCircles.update({
                type_circle: circle.typeCircle,
                user_id: circle.userId,
            }, {
                where: {
                    circle_id: circle.id
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     *
     * @param {number} id
     * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
     */
    async deleteUserCircle(id) {
        try {
            return UserCircles.update({
                active: false
            }, {
                where: {
                    enterprise_id: id
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     *
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
     */
    async getAllUsersCircles() {
        try {
            return UserCircles.findAll({
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
     *
     * @param {number} id
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    async getUserCircleById(id) {
        try {
            return UserCircles.findOne({
                where: {
                    circle_id: id,
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
     *
     * @param {number} userId
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    async getUserCircleByUserId(userId) {
        try {
            return UserCircles.findAll({
                where: {
                    user_id: userId,
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
     *
     * @param {number} type
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    async getUserCircleByTypeCircle(type) {
        try {
            return UserCircles.findAll({
                where: {
                    type_circle: type,
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
    
}

async function CreateTableUserCircles() {
    try {
        await UserCircles.sync();
    } catch (e) {
        throw new Error(`Error al sincronizar el modelo UserCircles: ${e.message}`);
    }
}

module.exports = {
    UserCircles,
    UserCircle,
    CreateTableUserCircles
}