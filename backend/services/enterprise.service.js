
const { Enterprise } = require('../models/enterprises.model');

const enterprise = new Enterprise();

/**
 * Crea una nueva empresa
 * @param {string} enterpriseName
 * @returns {Promise<{msg: string}|Model<TModelAttributes, TCreationAttributes>>}
 */
const newEnterprise = async (enterpriseName) => {
    try {
        if( !await enterprise.verifyIfEnterpriseExists(enterpriseName) ) //Si la empresa no existe, la creamos
            return enterprise.createEnterprise(enterpriseName);
        return { msg: 'El nombre de la empresa ya existe' };
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Edita una empresa
 * @param {Object} data
 * @param {string} data.name
 * @param {number} data.id
 * @param {boolean?} data.system_owner
 * @returns {Promise<[number, Model[]]|undefined>}
 */
const editEnterprise = async (data) => {
    try {
        return enterprise.updateEnterprise(data);
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Borra una empresa
 * @param {number} id
 * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
 */
const deleteEnterprise = async (id) => {
    try {
        return enterprise.deleteEnterprise(id);
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Obtiene una empresa por su ID
 * @param {number} id
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>|null>}
 */
const getEnterpriseById = async (id) => {
    try {
        return enterprise.getEnterpriseById(id);
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Obtiene una empresa por su nombre
 * @param {string} name
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>|null>}
 */
const getEnterpriseByName = async (name) => {
    try {
        return enterprise.getEnterpriseByName(name);
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Obtiene una lista de todas las empresas
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
 */
const getAllEnterprises = async () => {
    try {
        return enterprise.getAllEnterprises();
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    newEnterprise,
    editEnterprise,
    deleteEnterprise,
    getEnterpriseById,
    getEnterpriseByName,
    getAllEnterprises
}