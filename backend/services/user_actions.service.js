const AddressService = require('../services/addresses.service');
const SkillService = require('../services/skills.service');

async function createAddress(data) {
    try {
        return await AddressService.newAddress(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

async function updateAddress(data) {
    try {
        return await AddressService.editAddress(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

async function dropAddress(data) {
    try {
        return await AddressService.deleteAddress(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

async function allAddress(data) {
    try {
        return await AddressService.addressesUser(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

async function createSkill(data) {
    try {
        return await SkillService.newSkill(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

async function updateSkill(data) {
    try {
        return await SkillService.editSkill(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

async function dropSkill(data) {
    try {
        return await SkillService.deleteSkill(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

async function allSkill(data) {
    try {
        return await SkillService.skillsUser(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

async function allIdsSkill(data) {
    try {
        return await SkillService.skillsIdsUser(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createAddress,
    updateAddress,
    dropAddress,
    allAddress,
    createSkill,
    updateSkill,
    dropSkill,
    allSkill,
    allIdsSkill
}