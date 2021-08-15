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
    circle_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UserCircles,
            key: 'circle_id'
        }
    },
    enterprise_id: {
        type: DataTypes.INTEGER,
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

class MemberCircleEnterprise {

    /**
     * Crea un miembro de un circulo de una empresa
     * @param {Object} memberCircleEnterprise
     * @param {number} memberCircleEnterprise.typeRelation
     * @param {number?} memberCircleEnterprise.circleId
     * @param {number?} memberCircleEnterprise.enterpriseId
     * @param {number} memberCircleEnterprise.userId
     * @returns {Promise<CreateOptions<Model["_attributes"]> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<TModelAttributes, TCreationAttributes>>}
     */
    async createMemberCircleEnterprise(memberCircleEnterprise) {
        try {
            return MembersCircleEnterprises.create({
                type_relation: memberCircleEnterprise.typeRelation,
                circle_id: (memberCircleEnterprise.typeRelation == 2) ? null : memberCircleEnterprise.circleId,
                enterprise_id: (memberCircleEnterprise.typeRelation == 1) ? null : memberCircleEnterprise.enterpriseId,
                user_id: memberCircleEnterprise.userId,
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     *
     * @param {Object} data
     * @param {number} data.typeRelation
     * @param {number?} data.circleId
     * @param {number?} data.enterpriseId
     * @param {number} data.userId
     * @param {number} data.id
     * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
     */
    async updateMemberCircleEnterprise(data) {
        try {
            return MembersCircleEnterprises.update({
                type_relation: data.typeRelation,
                circle_id: (data.typeRelation == 2) ? null : data.circleId,
                enterprise_id: (data.typeRelation == 1) ? null : data.enterpriseId,
                user_id: data.userId,
            }, {
                where: {
                    relation_circle_id: data.id,
                    active: true
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async deleteMemberCircleEnterprise (id) {
        try {
            return MembersCircleEnterprises.update({
                active: false
            }, {where: {relation_circle_id: id}});
        } catch (e) {
            throw new Error(e);
        }
    }

    async getMemberCircleEnterpriseById(id) {
        try {
            return MembersCircleEnterprises.findOne({
                where: {
                    relation_circle_id: id,
                    active: true
                },
                attributes: {
                    exclude: [
                        'updated_at',
                        'created_at',
                        'active'
                    ]
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async getAllMembersCirclesEnterprises() {
        try {
            return MembersCircleEnterprises.findAll({
                where: {
                    active: true
                },
                attributes: {
                    exclude: [
                        'updated_at',
                        'created_at',
                        'active'
                    ]
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    }

}


async function CreateTableMembersCircleEnterprises() {
    await MembersCircleEnterprises.sync();
}

module.exports = {
    CreateTableMembersCircleEnterprises,
    MembersCircleEnterprises,
    MemberCircleEnterprise
}