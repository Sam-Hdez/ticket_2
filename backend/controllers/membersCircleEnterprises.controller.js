

const membersCircleEnterprisesService = require('../services/membersCircleEnterprises.service');

async function createMemberCircleEnterprise(req, res) {
    try {
        const data = req.body;
        const memberCircleEnterprise = membersCircleEnterprisesService.newMemberCircleEnterprise(data);
        res.status(201).json(memberCircleEnterprise);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function removeMemberCircleEnterprise(req, res) {
    try {
        const id = req.body.id;
        const memberCircleEnterprise = membersCircleEnterprisesService.deleteMemberCircleEnterprise(id);
        res.status(201).json({
            msg: `Se eliminó la empresa con el ID: ${id}`
        });
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function editMemberCircleEnterprise(req, res) {
    try {
        const data = req.body;
        const memberCircleEnterprise = membersCircleEnterprisesService.editMemberCircleEnterprise(data);
        res.status(201).json(memberCircleEnterprise);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function getMemberCircleEnterpriseById(req, res) {
    try {
        const id = req.body.id;
        const memberCircleEnterprise = membersCircleEnterprisesService.getMemberCircleEnterpriseById(id);
        res.status(201).json(memberCircleEnterprise);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function getMemberCircleEnterprises(req, res) {
    try {
        const memberCircleEnterprise = membersCircleEnterprisesService.getMemberCircleEnterprises();
        res.status(201).json(memberCircleEnterprise);
    } catch (e) {
        res.status(502).send(e.message);
    }
}


module.exports = {
    createMemberCircleEnterprise,
    removeMemberCircleEnterprise,
    editMemberCircleEnterprise,
    getMemberCircleEnterpriseById,
    getMemberCircleEnterprises
}
