const { User, checkUser, getUser, ListAllUsers, changePassword } = require('../models/users.model');
const bcrypt = require('bcrypt'); //bcrypt para hashear contraseña
const { generarToken, descubrirToken } = require('../services/jwt.service');

async function loginController(req, res) {
    try {
        console.log('Login');
        console.log(req.body);
        //let usuario = JSON.parse(req.body.json);
        let usuario = { email: req.body.email, password: req.body.password }
        let userFromDB = await checkUser(usuario);
        const token = await generarToken(userFromDB);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: `Sistema seguro, error en autenticación: ${error.message}` });
    }
}

async function registerController(req, res) {
    try {
        let user = new User({ email: req.body.email, first_name: req.body.nombre, last_name: req.body.apellidos, encrypted_password: req.body.password });
        const createResult = await user.createUser();
        res.status(200).json({ message: 'Usuario creado ' + createResult.dataValues.email });
    } catch (error) {
        res.status(409).json({ message: 'Error al crear un usuario: ' + error.message }); //409 Conflict
    }
}

async function deleteController(req, res) {
    try {
        let user = req.params.id;
        //console.log(user);
        const result = await getUser(user);
        const user_to_delete = new User(result);
        //console.log(result);
        //console.log(user_to_delete);
        const delete_status = await user_to_delete.deleteUser(result.user_id);
        if (delete_status[0]) {
            res.status(200).json({ message: 'Usuario eliminado' });
        }
    } catch (error) {
        res.status(412).json({ message: 'Error al borrar usuario: ' + error.message }); //412 Precondition Failed  
    }
}

async function editController(req, res) {
    try {
        //console.log('EditController');
        let user_id = req.params.id;
        let data = { first_name: req.body.nombre, last_name: req.body.apellidos, is_admin: req.body.is_admin };

        const result = await getUser(user_id);
        const user_to_edit = new User(result);

        const updateResult = await user_to_edit.updateUser(user_id, data);

        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(409).json({ message: 'Error al editar usuario: ' + error.message }); //409 Conflict
    }
}

async function listUsers(req, res) {
    try {
        console.log('ListUser');
        const listUser = await ListAllUsers();
        const UserList = [];
        for (let index = 0; index < listUser.length; index++) {
            const element = listUser[index];
            UserList.push({
                user_id: element.dataValues.user_id,
                first_name: element.dataValues.first_name,
                last_name: element.dataValues.last_name,
                full_name: element.dataValues.first_name + ' ' + element.dataValues.last_name,
                email: element.dataValues.email,
                age: element.dataValues.age,
                profile_linkedin: element.dataValues.profile_linkedin,
                profile_photo: element.dataValues.profile_photo,
                job_resume: element.dataValues.job_resume,
                encrypted_password: element.dataValues.encrypted_password,
                is_admin: element.dataValues.is_admin,
                active: element.dataValues.active
            });
        }
        res.status(200).json({ message: 'Lista de usuarios', data: UserList });
    } catch (error) {
        res.status(412).json({ message: 'Error al listar todos los usuarios: ' + error.message }); //412 Precondition Failed  
    }
}

async function recoverPassword(req, res) {
    try {
        console.log('recuperar contraseña')
        let resultado = await changePassword(req.body.email, req.body.newPassword);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(412).json({ message: 'Error en cambio de contraseña : ' + error.message }); //412 Precondition Failed  
    }
}

module.exports = {
    loginController,
    registerController,
    deleteController,
    editController,
    listUsers,
    recoverPassword
}