const { sequelize, DataTypes, Op } = require('../db/conexion');

const Enterprises = sequelize.define('enterprises', {
  enterprise_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  enterprise_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  system_owner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  underscored: true
});

class Enterprise {
  constructor(data){
    this.enterprise_name = data.enterprise_name;
  }

  async createEnterprise() {

  }

  async updateEnterprise() {

  }

  async deleteEnterprise() {

  }
}

async function listAllEnterprises() {
  try {

  } catch (e) {

  }
}

async function getEnterprise(id) {

}


module.exports = {
  Enterprises
}