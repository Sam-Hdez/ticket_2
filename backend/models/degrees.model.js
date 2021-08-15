const { sequelize, DataTypes, Op } = require('../db/conexion');

const Degrees = sequelize.define('degrees', {
    degree_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    degree_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    institute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree: {
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

async function CreateTableDegrees() {
    await Degrees.sync();
}

class Degree {

    async createDegree(data) {
        try {
            return Degrees.create({
                degree_name: data.name,
                institute: data.institute,
                degree: data.degree,
                user_id: data.userId,
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateDegree(data) {
        try {
            return Degrees.update({
                degree_name: data.name,
                institute: data.institute,
                degree: data.degree,
                user_id: data.userId,
            }, {
                where: {
                    degree_id: data.id,
                    active: true
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async deleteDegree(id) {
        try {
            return Degrees.update({
                active: false
            }, {
                where: {
                    degree_id: id,
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAllDegrees() {
        try {
            return Degrees.findAll({
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
            })
        } catch (e) {
            throw new Error(e);
        }
    }

    async getDegreeById(id) {
        try {
            return Degrees.findOne({
                where: {
                    degree_id: id,
                    active: true
                },
                attributes: {
                    exclude: [
                        'updated_at',
                        'created_at',
                        'active'
                    ]
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    }
}


module.exports = {
    CreateTableDegrees,
    Degree
}