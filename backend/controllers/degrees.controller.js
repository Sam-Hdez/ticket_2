const degreesService = require('../services/degrees.service');

async function createDegrees(req, res) {
    try {
        const data = req.body;
        const degree = await degreesService.newDegree(data);
        res.status(201).json(degree);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function editDegrees(req, res) {
    try {
        const data = req.body;
        const degree = await degreesService.updateDegree(data);
        res.status(201).json(degree);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function deleteDegrees(req, res) {
    try {
        const id = req.body.id;
        const degree = await degreesService.deleteDegree(id);
        res.status(201).json(degree);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function getDegrees(req, res) {
    try {
        const degree = await degreesService.getDegrees();
        res.status(201).json(degree);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function getDegreesById(req, res) {
    try {
        const id = req.body.id;
        const degree = await degreesService.getDegreeById(id);
        res.status(201).json(degree);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

module.exports = {
    createDegrees,
    editDegrees,
    deleteDegrees,
    getDegrees,
    getDegreesById
}