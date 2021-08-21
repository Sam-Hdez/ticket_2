const { obtenerIdUsser } = require('../services/jwt.service');
const { createAddress, updateAddress, dropAddress, allAddress, createSkill, allSkill, updateSkill, dropSkill, allIdsSkill, createHobby, updateHobby, dropHobby, allHobbies } = require('../services/user_actions.service');

async function CreateAddressUser(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = await obtenerIdUsser(token);

        let address = { user_id: user, country: req.body.country, city: req.body.city }
        let status_address = await createAddress(address);
        res.status(200).json({ message: 'Dirección creada en ' + status_address.city });
    } catch (error) {
        res.status(502).json({ message: 'Error al crear un nueva dirección: ' + error.message });;
    }
}

async function UpdateAddressUser(req, res) {
    try {
        let address = { address_id: req.body.address_id, country: req.body.country, city: req.body.city, street: req.body.street, outside_number: req.body.outside_number, inside_number: req.body.inside_number, home_references: req.body.home_references }
        let status_address = await updateAddress(address);
        res.status(200).json({ message: 'Dirección actualizada' });
    } catch (error) {
        res.status(502).json({ message: 'Error al actualizar dirección: ' + error.message });;
    }
}

async function DeleteAddressUser(req, res) {
    try {
        let address = { address_id: req.body.address_id, country: req.body.country, city: req.body.city }
        let status_address = await dropAddress(address);
        res.status(200).json({ message: 'Dirección eliminada' });
    } catch (error) {
        res.status(502).json({ message: 'Error al eliminar dirección: ' + error.message });;
    }
}

async function AllAddressUser(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = await obtenerIdUsser(token);
        let status_address = await allAddress(user);
        res.status(200).json({ message: 'Lista de direcciones', data: status_address });
    } catch (error) {
        res.status(502).json({ message: 'Error al listar direcciones: ' + error.message });;
    }
}

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

async function CreateHobbyUser(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = await obtenerIdUsser(token);

        let hobby = { user_id: user, hobby_name: req.body.hobby_name }
        let status_hobby = await createHobby(hobby);
        res.status(200).json({ message: 'Hobby creado: ' + status_hobby.hobby_name });
    } catch (error) {
        res.status(502).json({ message: 'Error al crear hobby: ' + error.message });;
    }
}

async function UpdateHobbyUser(req, res) {
    try {
        let hobby = { hobby_id: req.body.hobby_id, hobby_name: req.body.hobby_name }
        let status_hobby = await updateHobby(hobby);
        res.status(200).json({ message: 'Hobby actualizado: ' + status_hobby.hobby_name });
    } catch (error) {
        res.status(502).json({ message: 'Error al actualizar hobby: ' + error.message });;
    }
}

async function DeleteHobbyUser(req, res) {
    try {
        let hobby = { hobby_id: req.body.hobby_id, hobby_name: req.body.hobby_name }
        let status_hobby = await dropHobby(hobby);
        res.status(200).json({ message: 'Hobby eliminado' });
    } catch (error) {
        res.status(502).json({ message: 'Error al eliminar hobby: ' + error.message });;
    }
}

async function AllHobbyUser(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let user = await obtenerIdUsser(token);
        let status_hobby = await allHobbies(user);
        res.status(200).json({ message: 'Lista de hobbies', data: status_hobby });
    } catch (error) {
        res.status(502).json({ message: 'Error al listar hobbies: ' + error.message });;
    }
}

module.exports = {
    CreateAddressUser,
    UpdateAddressUser,
    DeleteAddressUser,
    AllAddressUser,
    CreateSkillUser,
    UpdateSkillUser,
    DeleteSkillUser,
    AllSkillUser,
    CreateHobbyUser,
    UpdateHobbyUser,
    DeleteHobbyUser,
    AllHobbyUser
}