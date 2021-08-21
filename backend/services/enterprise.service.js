
const { Enterprise } = require('../models/enterprises.model');
const { Hiring } = require('../models/hirings.model');
const { Catalog } = require('../models/catalogs.model');
const { MemberCircleEnterprise } = require('../models/membersCircleEnterprises.model');

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
 * @returns {Object}
 */
const getEnterpriseById = async (id) => {
    try {
        const enterpriseData = await enterprise.getEnterpriseById(id);
        const hiring = new Hiring({});
        const hiringData = await hiring.getHiringsByEnterpriseId(enterpriseData.enterprise_id);
        const catalog = new Catalog({});
        const catalogData = await catalog.getCatalogByEnterpriseId(enterpriseData.enterprise_id);
        const memberCircleEnterprise = new MemberCircleEnterprise();
        const memberCircleEnterpriseData = await memberCircleEnterprise.getMemberCircleEnterpriseByEnterpriseId(enterpriseData.enterprise_id);

        return {
            enterpriseData,
            hiringData,
            catalogData,
            memberCircleEnterpriseData
        }
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

const getEnterprises = async (data) => {
    const enterpriseData =  data.name ? await enterprise.getEnterpriseByName(data.name) :
        data.id ? await enterprise.getEnterpriseById(data.id) :
            await enterprise.getAllEnterprises();
    console.log(enterpriseData);
    const hiring = new Hiring(null);
    //const hiringData = await hiring.getHiringsByEnterpriseId(enterpriseData.enterprise_id);


    return {
        ok: true
    }

}

module.exports = {
    newEnterprise,
    editEnterprise,
    deleteEnterprise,
    getEnterpriseById,
    getEnterpriseByName,
    getAllEnterprises,
    getEnterprises
}