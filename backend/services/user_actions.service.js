const AddressService = require('../services/addresses.service');

async function createAddress(data) {
    try {
        return await AddressService.newAddress(data);
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createAddress,
}