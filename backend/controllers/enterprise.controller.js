const enterpriseService = require('../services/enterprise.service');

class EnterpriseController {
    async createEnterprise(req, res) {
        try {
            const name = req.body.name;
            const enterprise = await enterpriseService.newEnterprise(name);
            res.status(201).json(enterprise);
        } catch (e) {
            res.status(502).send(e.message);
        }
    }

    async removeEnterprise(req, res) {
        try {
            const id = req.body.id;
            const result = await enterpriseService.deleteEnterprise(id);
            res.status(201).json(result);
        } catch (e) {
            res.status(502).send(e.message);
        }
    }

    async editEnterprise(req, res) {
        try {
            const data = req.body;
            const enterprise = await enterpriseService.editEnterprise(data);
            res.status(201).json(enterprise);
        } catch (e) {
            res.status(502).send(e.message);
        }
    }
    async getEnterpriseById(req, res) {
        try {
            const id = req.params.id;
            const enterprise = await enterpriseService.getEnterpriseById(id);
            res.status(200).json(enterprise);
        } catch (e) {
            res.status(502).json({
                error: `${e.message}`
            });
        }
    }

    /* Obtiene un arreglo de todas las empresas en la BD */
    async getAllEnterprises(req, res) {
        try {
            const enterprises = await enterpriseService.getAllEnterprises();
            return res.status(200).json(enterprises);
        } catch (e) {
            res.status(502).json({
                error: `${e.message}`
            });
        }
    }
}


module.exports = {
    EnterpriseController
}