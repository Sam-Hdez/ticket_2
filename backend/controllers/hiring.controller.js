const { newhiring, edithiring, deletehiring, HiringById, HiringByIdEnterprise } = require('../services/hirings.service')

async function CreateHiring(req, res) {
    try {
        let hiring = { enterprise_id: req.boy.enterprise_id, hiring_name: req.body.hiring_name, hiring_description: req.body.hiring_description, soft_skills: req.body.soft_skills, hard_skills: req.body.hard_skills, we_offer: req.body.we_offer, salary: req.body.salary }
        let status_hiring = await newhiring(hiring);
        res.status(200).json({ message: 'Hiring creado: ' + status_hiring.hiring_name });
    } catch (error) {
        res.status(502).json({ message: 'Error al crear hiring: ' + error.message });;
    }
}

async function UpdateHiring(req, res) {
    try {
        let hiring = { hiring_id: req.body.hiring_id, enterprise_id: req.boy.enterprise_id, hiring_name: req.body.hiring_name, hiring_description: req.body.hiring_description, soft_skills: req.body.soft_skills, hard_skills: req.body.hard_skills, we_offer: req.body.we_offer, salary: req.body.salary }
        let status_hiring = await edithiring(hiring);
        res.status(200).json({ message: 'Hiring actualizado: ' + status_hiring.hiring_name });
    } catch (error) {
        res.status(502).json({ message: 'Error al actualizar el hiring: ' + error.message });;
    }
}

async function DeleteHiring(req, res) {
    try {
        let hiring = { hiring_id: req.body.hiring_id, hiring_name: req.body.hiring_name }
        let status_hiring = await deletehiring(hiring);
        res.status(200).json({ message: 'Hiring eliminado' + status_hiring.hiring_name});
    } catch (error) {
        res.status(502).json({ message: 'Error al eliminar el hiring: ' + error.message });;
    }
}

async function hiringbyid(req, res) {
    try {
        const id = req.body.hiring_id;
        let status_hiring = await HiringById(id);
        res.status(200).json({ message: 'Lista de hirings', data: status_hiring });
    } catch (error) {
        res.status(502).json({ message: 'Error al listar los hirings: ' + error.message });;
    }
}

async function hiringbyidenterprise(req, res) {
    try {
        const id = req.body.enterprise_id;
        let status_hiring = await HiringByIdEnterprise(id);
        res.status(200).json({ message: 'Lista de hirings de las empresas', data: status_hiring });
    } catch (error) {
        res.status(502).json({ message: 'Error al listar los hirings de las empresas: ' + error.message });;
    }
}



module.exports = {
    CreateHiring,
    UpdateHiring,
    DeleteHiring,
    hiringbyid,
    hiringbyidenterprise
}