const userCircleService = require('../services/userCircle.service');

async function createUserCircle(req, res) {
    try {
        const circle = req.body;
        const userCircle = await userCircleService.newUserCircle(circle);
        res.status(201).json(userCircle);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function removeUserCircle(req, res) {
    try {
        const id = req.body.id;
        await userCircleService.deleteUserCircle(id);
        res.status(201).json({
            msg: `Se eliminó la empresa con el ID: ${id}`
        });
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function editUserCircle(req, res) {
    try {
        const data = req.body;
        const userCircle = await userCircleService.editUserCircle(data);
        res.status(201).json(userCircle);
    } catch (e) {
        res.status(502).send(e.message);
    }
}

async function getUserCircle(req, res) {
    try {
        const data = req.query;
        if(data.id) {
            const userCircle = await userCircleService.getUserCircleById(data.id);
            res.status(200).json(userCircle);
        } else if (data.typeCircle) {
            const userCircle = await userCircleService.getUserCircleByTypeCircle(data.typeCircle);
            res.status(200).json(userCircle);
        } else if(data.userId){
            const userCircle = await userCircleService.getUserCircleByUserId(data.userId);
            res.status(200).json(userCircle);
        } else {
            const usersCircles = await userCircleService.getAllUserCircle();
            res.status(200).json(usersCircles);
        }
    } catch (e) {
        res.status(502).send(e.message);
    }
}

module.exports = {
    createUserCircle,
    removeUserCircle,
    editUserCircle,
    getUserCircle
}