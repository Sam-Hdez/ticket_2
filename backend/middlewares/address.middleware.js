const { checkAddress } = require('../services/addresses.service');

const AddressExist = async(req, res, next) => {
    try {
        let address_exist = await checkAddress(req.body.address_id);
        return next()
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

module.exports = {
    AddressExist,
}