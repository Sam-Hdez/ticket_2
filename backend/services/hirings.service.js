const { Hiring } = require('../models/hirings.model');

const newhiring = async(data) => {
    try {
        let new_hiring = new Hiring(data);
        await new_hiring.createHiring();
        return new_hiring;
    } catch (error) {
        throw new Error('Error en la función newhiring: ' + error.message)
    }
}

const edithiring = async(data) => {
    try {
        let status_hiring = new Hiring(data);
        await status_hiring.updateHiring(data.hiring_id, data);
        return status_hiring;
    } catch (error) {
        throw new Error('Error en la función edithiring: ' + error.message)
    }
}

const deletehiring = async(data) => {
    try {
        let status_hiring = new Hiring(data);
        await status_hiring.deleteHiring(data.hiring_id);
        return status_hiring;
    } catch (error) {
        throw new Error('Error en la función deletehiring: ' + error.message)
    }
}

const HiringById = async(data) => {
    try {
        let hiringid = await getHiringById(data);
        return hiringid;
    } catch (error) {
        throw new Error('Error en la función feedbackById: ' + error.message)
    }
}

const HiringByIdEnterprise = async(data) => {
    try {
        let hiring_id_enterprise = await getHiringsByEnterpriseId(data);
        return hiring_id_enterprise;
    } catch (error) {
        throw new Error('Error en la función HiringByIdEnterprise: ' + error.message)
    }
}

module.exports = {
    newhiring,
    edithiring,
    deletehiring,
    HiringById,
    HiringByIdEnterprise
}