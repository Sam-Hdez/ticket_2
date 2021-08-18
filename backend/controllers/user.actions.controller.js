const { createAddress } = require('../services/user_actions.service');

async function CreateAddressUser(req, res) {
    try {
        let address = { user_id: req.body.user_id, country: req.body.country, city: req.body.city }
        let status_address = await createAddress(address);
        res.status(200).json({ status: 'Dirección creada en ' + status_address.city });
    } catch (error) {
        res.status(502).json({ message: 'Error al crear un nueva dirección: ' + error.message });;
    }
}

module.exports = {
    CreateAddressUser,
}