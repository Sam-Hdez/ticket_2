const { Address, AllAddressUser } = require('../models/addresses.model');

const newAddress = async(data) => {
    try {
        let new_address = new Address(data);
        await new_address.createAddress();
        //console.log(new_address);
        return new_address;
    } catch (error) {
        throw new Error('Error en la función newAddress: ' + error.message)
    }
}

const editAddress = async(data) => {
    try {
        let status_address = new Address(data);
        await status_address.updateAddress(data.address_id, data);
        //console.log(status_address);
        return status_address;
    } catch (error) {
        throw new Error('Error en la función editAddress: ' + error.message)
    }
}

const deleteAddress = async(data) => {
    try {
        let status_address = new Address(data);
        await status_address.deleteAddress(data.address_id);
        //console.log(status_address);
        return status_address;
    } catch (error) {
        throw new Error('Error en la función deleteAddress: ' + error.message)
    }
}

const addressesUser = async(data) => {
    try {
        let addresses = await AllAddressUser(data);
        //console.log(addresses);
        return addresses;
    } catch (error) {
        throw new Error('Error en la función addressesUser: ' + error.message)
    }
}

module.exports = {
    newAddress,
    editAddress,
    deleteAddress,
    addressesUser
}