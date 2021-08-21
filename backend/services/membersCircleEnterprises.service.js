
const { MemberCircleEnterprise } = require("../models/membersCircleEnterprises.model");

const memberCircleEnterprise = new MemberCircleEnterprise();

const newMemberCircleEnterprise = (data) => {
    try {
        return memberCircleEnterprise.createMemberCircleEnterprise(data);
    } catch (e) {
        throw new Error(e);
    }
}

const editMemberCircleEnterprise = (data) => {
    try {
        return memberCircleEnterprise.updateMemberCircleEnterprise(data);
    } catch (e) {
        throw new Error(e);
    }
}

const deleteMemberCircleEnterprise = (id) => {
    try {
        return memberCircleEnterprise.deleteMemberCircleEnterprise(id);
    } catch (e) {
        throw new Error(e);
    }
}

const getMemberCircleEnterpriseById = (id) => {
    try {
        return memberCircleEnterprise.getMemberCircleEnterpriseById(id);
    } catch (e) {
        throw new Error(e);
    }
}

const getMemberCircleEnterprises = () => {
    try {
        return memberCircleEnterprise.getAllMembersCirclesEnterprises();
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    newMemberCircleEnterprise,
    editMemberCircleEnterprise,
    deleteMemberCircleEnterprise,
    getMemberCircleEnterpriseById,
    getMemberCircleEnterprises
}