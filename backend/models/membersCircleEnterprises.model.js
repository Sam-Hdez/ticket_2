const { sequelize, DataTypes, Op } = require('../db/conexion');
const { Users } = require('./users.model');
const { UserCircles } = require('./userCircles.model');
const { Enterprises } = require('./enterprises.model');

const MembersCircleEnterprises = sequelize.define('members_circle_enterprises', {
  relation_circle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  type_relation: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cirlce_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: UserCircles,
      key: 'circle_id'
    }
  },
  enterprise_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Enterprises,
      key: 'enterprise_id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
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


module.exports = {
  MembersCircleEnterprises
}