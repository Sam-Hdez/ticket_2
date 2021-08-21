const { sequelize, DataTypes, Op } = require('../db/conexion');

const Addresses = sequelize.define('addresses', {
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
    },
    outside_number: {
        type: DataTypes.STRING,
    },
    inside_number: {
        type: DataTypes.STRING,
    },
    home_references: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    underscored: true
});

async function CreateTableAddresses() {
    try {
        await Addresses.sync();
    } catch (e) {
        throw new Error(`Error al sincronizar el modelo Addresses: ${e.message}`);
    }
}

class Address {
    constructor(data) {
        this.user_id = data.user_id;
        this.country = data.country;
        this.city = data.city;
    }

    async createAddress() {
        try {
            const addressCreated = await Addresses.create({
                user_id: this.user_id,
                country: this.country,
                city: this.city,
            });
            return addressCreated;
        } catch (error) {
            throw new Error('Error en la función createAddress: ' + error.message);
        }
    }

    async updateAddress(id, data) {
        try {
            let address_status = await Addresses.update({
                country: data.country,
                city: data.city,
                street: data.street,
                outside_number: data.outside_number,
                inside_number: data.inside_number,
                home_references: data.home_references,
            }, {
                where: {
                    address_id: id
                }
            });
            return address_status;
        } catch (error) {
            throw new Error('Error en la función updateAddress: ' + error.message);
        }
    }

    async deleteAddress(id) {
        try {
            let address_status = await Addresses.update({
                active: false,
            }, {
                where: {
                    address_id: id
                }
            });
            return address_status;
        } catch (error) {
            throw new Error('Error en la función deleteAddress: ' + error.message);
        }
    }
}

async function AllAddressUser(user) {
    try {
        let listAddress = await Addresses.findAll({ where: { user_id: user, active: 1 }, attributes: ['address_id', 'country', 'city', 'outside_number', 'inside_number', 'home_references'] });
        return listAddress;
    } catch (error) {
        throw new Error('Error en la función AllAddressUser: ' + error.message);
    }
}

async function check_address(data) {
    try {
        let address = await Addresses.findByPk(data);

        if (address === null) {
            throw new Error('Address not found');
        } else {
            return address;
        }
    } catch (error) {
        throw new Error('Error en la función check_address: ' + error.message);
    }
}

module.exports = {
    CreateTableAddresses,
    Address,
    AllAddressUser,
    check_address,
}