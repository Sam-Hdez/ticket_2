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

    excludeAttributes = {
        exclude: [
            'updatedAt',
            'createdAt',
            'active'
        ]
    };

    /**
     * Crea una nueva empresa en la base de datos
     * @param {string} name
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    createEnterprise = async name => Enterprises.create({
        enterprise_name: name
    }).catch((err) => { throw new Error(err) });

    /**
     * Actualiza datos de una empresa
     * @param {Object} data
     * @param {string} data.name Nombre de la empresa.
     * @param {number} data.id Id de la empresa.
     * @param {boolean?} data.system_owner Opcional modificar el dueño del sistema.
     * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
     */
    updateEnterprise = async data => {
        try {
            return await this.verifyIfEnterpriseExistsById(data.id) ?
                await Enterprises.update({
                    enterprise_name: data.name,
                    system_owner: data.system_owner || false
                }, {
                    where: { enterprise_id: data.id }
                }) :
                { error: `No se encontró la empresa con el id: ${data.id}` }
        } catch (e) {
            throw new Error(e);
        }
    }


    /**
     * Borra una empresa de la base de datos
     * @param {number} id
     * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
     */
    deleteEnterprise = async id => Enterprises.update({
        active: false
    }, {
        where: { enterprise_id: id }
    }).catch((err) => { throw new Error(err) });

    deleteEnterprise = async id => {
        try {
            return await this.verifyIfEnterpriseExistsById(id) ?
                Enterprises.update({
                    active: false
                }, {
                    where: { enterprise_id: id }
                }) :
                { error: `No se encontró la empresa con el id: ${id}` }
        } catch (e) {

        }
    }

    /**
     * Obtén el registro de una empresa por su ID
     * @param {number} id
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    getEnterpriseById = async id => Enterprises.findOne({
        where: {
            enterprise_id: id,
            active: true
        },
        attributes: this.excludeAttributes,
    }).catch((err) => { throw new Error(err) });

    /**
     * Obtén el registro de una empresa por su nombre
     * @param {string} name
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    getEnterpriseByName = async name => Enterprises.findOne({
        where: {
            enterprise_name: name,
            active: true
        },
        attributes: this.excludeAttributes
    }).catch((err) => { throw new Error(err) });

    /**
     * Obtén un arreglo de todas las empresas
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
     */
    getAllEnterprises = async () => Enterprises.findAll({
        where: {
            active: true
        },
        attributes: this.excludeAttributes
    }).catch((err) => { throw new Error(err) });


    /**
     * Verifica si existe una empresa por su nombre
     * @param {string} name
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    verifyIfEnterpriseExistsByName = async name => Enterprises.findOne({where: {enterprise_name: name, active: true}})
        .catch((err) => { throw new Error(err) });

    /**
     * Verifica si existe una empresa por su id
     * @param {number} id
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    verifyIfEnterpriseExistsById = async id => Enterprises.findOne({ where: { enterprise_id: id, active: true }})
        .catch((err) => { throw new Error(err) });
}

async function CreateTableEnterprises() {
    try {
        await Enterprises.sync();
    } catch (e) {
        throw new Error(`Error al sincronizar el modelo Enterprises: ${e.message}`);
    }
}

module.exports = {
    Enterprises,
    Enterprise,
    CreateTableEnterprises,
}