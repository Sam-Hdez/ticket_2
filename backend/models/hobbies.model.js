const { sequelize, DataTypes, Op } = require('../db/conexion');

const Hobbies = sequelize.define('hobbies', {
    hobby_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    hobby_name: {
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

async function CreateTableHobbies() {
    try {
        await Hobbies.sync();
    } catch (e) {
        throw new Error(`Error al sincronizar el modelo Hobbies: ${e.message}`);
    }
}

class Hobby {
    constructor(data) {
        this.user_id = data.user_id;
        this.hobby_name = data.hobby_name;
    }

    /**
     * Crea un hobby para un usuario
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async createHobby() {
        try {
            const hobbyCreated = await Hobbies.create({
                user_id: this.user_id,
                hobby_name: this.hobby_name,
            });
            return hobbyCreated;
        } catch (error) {
            throw new Error('Error en la función createHobby: ' + error.message);
        }
    }

    /**
     * Cambiar el nombre de un hobby
     * @param id
     * @param data Objeto con el atributo hobby_name
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async updateHobby(id, data) {
        try {
            let hobby_status = await Hobbies.update({
                hobby_name: data.hobby_name,
            }, {
                where: {
                    hobby_id: id
                }
            });
            return hobby_status;
        } catch (error) {
            throw new Error('Error en la función updateHobby: ' + error.message);
        }
    }

    /**
     * Desactiva los datos de un hobby
     * @param {string} id
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async deleteHobby(id) {
        try {
            let hobby_status = await Hobbies.update({
                active: false,
            }, {
                where: {
                    hobby_id: id
                }
            });
            return hobby_status;
        } catch (error) {
            throw new Error('Error en la función deleteHobby: ' + error.message);
        }
    }
}

/**
 * Listar todos los hobbies de un usuario
 * @param {string} user
 * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
 */
async function AllHobbiesUser(user) {
    try {
        let listHobbies = await Hobbies.findAll({ where: { user_id: user, active: 1 }, attributes: ['hobby_id', 'hobby_name'] });
        return listHobbies;
    } catch (error) {
        throw new Error('Error en la función AllHobbiesUser: ' + error.message);
    }
}

/**
 * Verifica la existencia de un hobby
 * @param {string} data
 * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
 */
async function check_hobby(data) {
    try {
        let hobby = await Hobbies.findByPk(data);

        if (hobby === null) {
            throw new Error('Hobby not found');
        } else {
            return hobby;
        }
    } catch (error) {
        throw new Error('Error en la función check_hobby: ' + error.message);
    }
}

module.exports = {
    CreateTableHobbies,
    Hobby,
    AllHobbiesUser,
    check_hobby,
}