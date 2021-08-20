const { sequelize, DataTypes, Op } = require('../db/conexion');
const { Enterprises } = require('./enterprises.model');

const Catalogs = sequelize.define('catalogs', {
    catalog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    catalog_name: {
        type: DataTypes.STRING,
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

class Catalog {
    constructor(data){
        this.enterprise_id = data.enterprise_id;
        this.catalog_name = data.catalog_name;
    }

    /**
     * Crea un nuevo catalogo
     * @param {string} catalogName
     */
    async createCatalog() {
        try {
            const catalogcreate = await Catalogs.create ({
                enterprise_id: this.enterprise_id,
                catalog_name: this.catalog_name,
            });
            return catalogcreate;
        } catch (error) {
            throw new Error('Error en la función createCatalog: ' + error.message);
        }
    }

    /**
     * Actualiza datos de un catalogo
     * @param {Object} data
     * @param {string} data.name Nombre del catalogo.
     * @param {number} catalog_id Id del catalogo.
     */
     async updateCatalog(id, data) {
        try {
            let catalog_status = await Catalogs.update({
                catalog_name: data.catalog_name,
            }, {
                where: {
                    catalog_id: id
                }
            });
            return catalog_status;
        } catch (error) {
            throw new Error('Error en la función updateCatalog: ' + error.message);
        }
    }

    /**
     * Borra un catalogo de la base de datos
     * @param {number} id
     */
     async deleteCatalog(id) {
        try {
            let catalog_status = await Catalogs.update({
                active: false,
            }, {
                where: {
                    catalog_id: id
                }
            });
            return catalog_status;
        } catch (error) {
            throw new Error('Error en la función deleteCatalog: ' + error.message);
        }
    }

    /**
     * Obtén el registro de un catalogo por su ID
     * @param {number} id
     */
    async getCatalogById(id) {
        try {
            return Catalogs.findOne({
                where: {
                    catalog_id: id,
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
            throw new Error('Error en la función getCatalogById: ' + error.message);
        }
    }

    /**
     * Obtén el registro de un catalogo por su nombre
     * @param {string} name
     */
    async getCatalogByName(name) {
        try {
            return Catalogs.findOne({
                where: {
                    catalog_name: name,
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
            throw new Error('Error en la función getCatalogByName: ' + error.message);
        }
    }

    /**
     * Obtén una lista de todos los catalogos
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
     */
    async getAllCatalog() {
        try {
            return Catalogs.findAll({
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
        } catch (error) {
            throw new Error('Error en la función getAllCatalog: ' + error.message);
        }
    }
}

async function CreateTableCatalogs() {
    await Catalogs.sync();
}

module.exports = {
    CreateTableCatalogs,
    Catalog,
    Catalogs
}