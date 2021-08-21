const { sequelize, DataTypes, Op } = require('../db/conexion');
const { Catalogs } = require('./catalogs.model');

const ElementsCatalogs = sequelize.define('elementsCatalogs', {
    element_catalog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    element_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    catalog_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Catalogs',
            key: 'catalog_id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    underscored: true
});

class elementCatalog {
    constructor(data){
        this.element_name = data.element_name;
        this.catalog_type = data.catalog_type;
    }

    /**
     * Crea un nuevo elemento del catalogo
     * @param {string} catalog_type
     */
    async createelementCatalog() {
        try {
            const elementcatalogcreate = await ElementsCatalogs.create ({
                element_name: this.element_name,
                catalog_type: this.catalog_type,
            });
            return elementcatalogcreate;
        } catch (error) {
            throw new Error('Error en la función createelementCatalog: ' + error.message);
        }
    }

    /**
     * Actualiza datos de un elemento del catalogo                                                                                                                                      b  
     * @param {Object} data
     * @param {string} data.name Nombre del elemento del catalogo.
     * @param {number} catalog_type Id del tipo catalogo.
     */
     async updateelementCatalog(id, data) {
        try {
            let elementcatalog_status = await ElementsCatalogs.update({
                catalog_type: data.catalog_type,
                element_name: data.element_name
            }, {
                where: {
                    element_catalog_id: id
                }
            });
            return elementcatalog_status;
        } catch (error) {
            throw new Error('Error en la función updateelementCatalog: ' + error.message);
        }
    }

    /**
     * Borra un elemento de un catalogo de la base de datos
     * @param {number} id
     */
     async deleteelementCatalog(id) {
        try {
            let elementcatalog_status = await ElementsCatalogs.update({
                active: false,
            }, {
                where: {
                    element_catalog_id: id
                }
            });
            return elementcatalog_status;
        } catch (error) {
            throw new Error('Error en la función deleteelementCatalog: ' + error.message);
        }
    }

    /**
     * Obtén el registro de un elemento del catalogo por su nombre
     * @param {string} name
     */
    async getelementCatalogByName(name) {
        try {
            return ElementsCatalogs.findOne({
                where: {
                    element_name: name,
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
            throw new Error('Error en la función getelementCatalogByName: ' + error.message);
        }
    }
}

async function CreateTableElementsCatalogs() {
    try {
        await ElementsCatalogs.sync();
    } catch (e) {
        throw new Error(`Error al sincronizar el modelo ElementsCatalogs: ${e.message}`);
    }
}

module.exports = {
    CreateTableElementsCatalogs,
    ElementsCatalogs,
    elementCatalog
}