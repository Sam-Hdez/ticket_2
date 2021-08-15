const enterpriseService = require('../services/enterprise.service');

async function createEnterprise(req, res) {
    try {
        const name = req.body.name;
        const enterprise = await enterpriseService.newEnterprise(name);
        res.status(201).json(enterprise);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function removeEnterprise(req, res) {
    try {
        const id = req.body.id;
        await enterpriseService.deleteEnterprise(id);
        res.status(201).json({
            msg: `Se eliminó la empresa con el ID: ${id}`
        });
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function editEnterprise(req, res) {
    try {
        const data = req.body;
        const enterprise = await enterpriseService.editEnterprise(data);
        res.status(201).json(enterprise);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function getEnterprise(req, res) {
    try {
        const data = req.query;
        if(data.name) {
            const enterprise = await enterpriseService.getEnterpriseByName(data.name);
            return res.status(200).json(enterprise);
        } else if(data.id) {
            const enterprise = await enterpriseService.getEnterpriseById(data.id);
            return res.status(200).json(enterprise);
        } else {
            const enterprises = await enterpriseService.getAllEnterprises();
            res.status(200).json(enterprises);
        }
    } catch (e) {
        res.status(502).send(e.message);
    }
}


module.exports = {
    createEnterprise,
    removeEnterprise,
    editEnterprise,
    getEnterprise,
}