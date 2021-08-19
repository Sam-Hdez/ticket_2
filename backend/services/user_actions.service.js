const AddressService = require('../services/addresses.service');

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

module.exports = {
    createAddress,
    updateAddress,
    dropAddress,
    allAddress
}