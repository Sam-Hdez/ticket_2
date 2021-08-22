const { obtenerIdUsser } = require('../services/jwt.service');
const { } = require('../services/catalogs.service')


async function CreateSkillUser(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = await obtenerIdUsser(token);

        let skill = { user_id: user, type_skill: req.body.type_skill, skill_name: req.body.skill_name }
        let status_skill = await createSkill(skill);
        res.status(200).json({ message: 'Skill creada: ' + status_skill.skill_name });
    } catch (error) {
        res.status(502).json({ message: 'Error al crear skill: ' + error.message });;
    }
}

async function UpdateSkillUser(req, res) {
    try {
        let skill = { skill_id: req.body.skill_id, type_skill: req.body.type_skill, skill_name: req.body.skill_name }
        let status_skill = await updateSkill(skill);
        res.status(200).json({ message: 'Skill actualizada: ' + status_skill.skill_name });
    } catch (error) {
        res.status(502).json({ message: 'Error al actualizar skill: ' + error.message });;
    }
}

async function DeleteSkillUser(req, res) {
    try {
        let skill = { skill_id: req.body.skill_id, type_skill: req.body.type_skill, skill_name: req.body.skill_name }
        let status_skill = await dropSkill(skill);
        res.status(200).json({ message: 'Skill eliminada' });
    } catch (error) {
        res.status(502).json({ message: 'Error al eliminar skill: ' + error.message });;
    }
}

async function AllSkillUser(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = await obtenerIdUsser(token);
        let status_skill = await allSkill(user);
        res.status(200).json({ message: 'Lista de skills', data: status_skill });
    } catch (error) {
        res.status(502).json({ message: 'Error al listar skills: ' + error.message });;
    }
}