const { createAddress, updateAddress, dropAddress, allAddress } = require('../services/user_actions.service');

async function CreateAddressUser(req, res) {
    try {
        let address = { user_id: req.body.user_id, country: req.body.country, city: req.body.city }
        let status_address = await createAddress(address);
        res.status(200).json({ message: 'Dirección creada en ' + status_address.city });
    } catch (error) {
        res.status(502).json({ message: 'Error al crear un nueva dirección: ' + error.message });;
    }
}

async function UpdateAddressUser(req, res) {
    try {
        let address = { address_id: req.body.address_id, country: req.body.country, city: req.body.city, street: req.body.street, outside_number: req.body.outside_number, inside_number: req.body.inside_number, home_references: req.body.home_references }
        let status_address = await updateAddress(address);
        res.status(200).json({ message: 'Dirección actualizada' });
    } catch (error) {
        res.status(502).json({ message: 'Error al actualizar dirección: ' + error.message });;
    }
}

async function DeleteAddressUser(req, res) {
    try {
        let address = { address_id: req.body.address_id, country: req.body.country, city: req.body.city }
        let status_address = await dropAddress(address);
        res.status(200).json({ message: 'Dirección eliminada' });
    } catch (error) {
        res.status(502).json({ message: 'Error al eliminar dirección: ' + error.message });;
    }
}

async function AllAddressUser(req, res) {
    try {
        let user = req.body.user_id;
        let status_address = await allAddress(user);
        res.status(200).json({ message: 'Lista de direcciones', data: status_address });
    } catch (error) {
        res.status(502).json({ message: 'Error al listar direcciones: ' + error.message });;
    }
}

module.exports = {
    CreateAddressUser,
    UpdateAddressUser,
    DeleteAddressUser,
    AllAddressUser
}