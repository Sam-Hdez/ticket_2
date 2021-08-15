const { sequelize, DataTypes, Op } = require('../db/conexion');
const bcrypt = require('bcrypt'); //bcrypt para hashear contraseña
const saltRounds = 10; //rondas salt entre más hay más seguridad pero tarda más la respuesta

const Users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    first_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false
    },
    profile_linkedin: {
        type: DataTypes.STRING(320),
    },
    profile_photo: {
        type: DataTypes.STRING,
    },
    job_resume: {
        type: DataTypes.STRING,
    },
    encrypted_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_feedback: {
        //False: El usuario solo acepta feedback de miembros en sus circulos
        //True: El usuario acepta feedback de toda la comunidad
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    underscored: true
});

async function CreateTableUsers() {
    await Users.sync();
}

async function LoadingOneAdmin() {
    try {
        await Users.sync(); //Crea la tabla si no existe y si existe no hace nada
        let userAdmin = await Users.count({ where: { is_admin: 1 } });
        if (userAdmin == 0) {
            const administrator = await Users.create({
                first_name: 'Admin',
                last_name: 'System',
                email: 'admin@system.com',
                is_admin: true,
                encrypted_password: await bcrypt.hashSync('password123' + process.env.STRING_STRONG, saltRounds)
            });
            console.log('Usuario administrador inicial creado de forma correcta: pass:password123, email: admin@system.com');
        } else {
            console.log('Ya existen ' + userAdmin + ' usuarios administradores, no es necesario uno extra.');
        }
    } catch (error) {
        console.log('Error en la creación de usuario Administrador Inicial: ' + error);
    }
}

class User {
    constructor(data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.encrypted_password = data.encrypted_password;
    }

    async createUser() {
        try {
            let userFind = await ValidateUser(this.email);
            const userCreated = await Users.create({
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                encrypted_password: await bcrypt.hashSync(this.encrypted_password + process.env.STRING_STRONG, saltRounds)
            });
            return userCreated;
        } catch (error) {
            throw new Error('Error en la función createUser: ' + error.message);
        }
    }

    async updateUser(id, data) {
        try {
            let user_status = await Users.update({
                first_name: data.first_name,
                last_name: data.last_name,
                age: data.age,
                type_feedback: data.type_feedback,
                is_admin: data.is_admin,
            }, {
                where: {
                    user_id: id
                }
            });
            return user_status;
        } catch (error) {
            throw new Error('Error en la función updateUser: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            let user_status = await Users.update({
                active: false,
                encrypted_password: '' //Se manda encrypted_password a vacío, por el momento no hay solicitud de reactivación
            }, {
                where: {
                    user_id: id
                }
            });
            return user_status;
        } catch (error) {
            throw new Error('Error en la función DeleteUser: ' + error.message);
        }
    }
}

async function ListAllUsers() {
    try {
        let listUser = await Users.findAll({ where: { active: 1 } });
        return listUser;
    } catch (error) {
        throw new Error('Error en la función ListAllUsers: ' + error.message);
    }
}

async function getUser(id) {
    try {
        let userResultado = await Users.findOne({ where: { user_id: id } });
        if (userResultado) {
            let user = {
                user_id: userResultado.dataValues.user_id,
                first_name: userResultado.dataValues.first_name,
                last_name: userResultado.dataValues.last_name,
                full_name: userResultado.dataValues.first_name + ' ' + userResultado.dataValues.last_name,
                email: userResultado.dataValues.email,
                age: userResultado.dataValues.age,
                profile_linkedin: userResultado.dataValues.profile_linkedin,
                profile_photo: userResultado.dataValues.profile_photo,
                job_resume: userResultado.dataValues.job_resume,
                encrypted_password: userResultado.dataValues.encrypted_password,
                is_admin: userResultado.dataValues.is_admin,
                active: userResultado.dataValues.active
            };
            return user;
        } else {
            throw new Error('El usuario no existe');
        }
    } catch (error) {
        throw new Error('Error en la función getUser: ' + error.message);
    }
}

async function readUser(email_to_search) {
    //Consultar datos de Usuario por Email
    //console.log('Buscando usuario');
    //return 'ok';
    try {
        let userResultado = await Users.findOne({ where: { email: email_to_search } });
        if (userResultado) {
            let user = {
                user_id: userResultado.dataValues.user_id,
                first_name: userResultado.dataValues.first_name,
                last_name: userResultado.dataValues.last_name,
                full_name: userResultado.dataValues.first_name + ' ' + userResultado.dataValues.last_name,
                email: userResultado.dataValues.email,
                age: userResultado.dataValues.age,
                profile_linkedin: userResultado.dataValues.profile_linkedin,
                profile_photo: userResultado.dataValues.profile_photo,
                job_resume: userResultado.dataValues.job_resume,
                encrypted_password: userResultado.dataValues.encrypted_password,
                is_admin: userResultado.dataValues.is_admin,
                active: userResultado.dataValues.active
            }
            return user;
        } else {
            throw new Error('El usuario no existe');
        }
    } catch (error) {
        throw new Error('Error en la función SearchUser: ' + error.message);
    }
}

async function ValidateUser(email_to_validate) {
    try {
        let user_status = await Users.findOne({ where: { email: email_to_validate } });
        //console.log(user_status);
        if (user_status == null) {
            return true;
        } else {
            throw new Error('Correo electrónico en existencia');
        }
    } catch (error) {
        throw new Error('Error en la función ValidateUser: ' + error.message);
    }
}

async function isAdmin(data) {
    try {
        let user_status = await readUser(data);
        //console.log(user_status.is_admin);
        if (user_status.is_admin) {
            return true;
        } else {
            throw new Error('Nivel de usuario no válido');
        }
    } catch (error) {
        throw new Error('Error en la función isAdmin: ' + error.message);
    }
}

const checkUser = async(user) => {
    try {
        //El usuario existe en DB
        const userFromDB = await readUser(user.email);
        //La contraseña es correcta
        if (!bcrypt.compareSync(user.password + process.env.STRING_STRONG, userFromDB.encrypted_password)) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        return userFromDB;
    } catch (error) {
        throw new Error('Error en controller checkUser: ' + error.message);
    }
}

async function changePassword(email_user, newpassword) {
    try {
        let user_status = await Users.update({
            encrypted_password: await bcrypt.hashSync(newpassword + process.env.STRING_STRONG, saltRounds)
        }, {
            where: {
                email: email_user
            }
        });
        return user_status;
    } catch (error) {
        throw new Error('Error en la función ListAllUsers: ' + error.message);
    }
}

async function editProfileLinkedin(id, profile) {
    try {
        let user_status = await Users.update({
            profile_linkedin: profile
        }, {
            where: {
                user_id: id
            }
        });
        return user_status;
    } catch (error) {
        throw new Error('Error en la función editProfileLinkedin: ' + error.message);
    }
}

async function editProfilePhoto(id, photo) {
    try {
        let user_status = await Users.update({
            profile_photo: photo
        }, {
            where: {
                user_id: id
            }
        });
        return user_status;
    } catch (error) {
        throw new Error('Error en la función editProfilePhoto: ' + error.message);
    }
}

async function editJobResume(id, resume_link) {
    try {
        let user_status = await Users.update({
            job_resume: resume_link
        }, {
            where: {
                user_id: id
            }
        });
        return user_status;
    } catch (error) {
        throw new Error('Error en la función editProfilePhoto: ' + error.message);
    }
}

//Pruebas individuales
//console.log(editProfileLinkedin(1, 'profile/linkedin'));
//console.log(editProfilePhoto(1, 'photos/users/id'));
//console.log(editJobResume(1, 'resumes/user/id'));

module.exports = {
    Users,
    User,
    CreateTableUsers,
    LoadingOneAdmin,
    readUser,
    getUser,
    checkUser,
    ValidateUser,
    isAdmin,
    ListAllUsers,
    changePassword,
    editProfileLinkedin,
    editProfilePhoto,
    editJobResume
}