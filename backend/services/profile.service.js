const { getUser } = require('../models/users.model');
const address = require('./addresses.service');
const skills = require('../services/skills.service');
const hobbies = require('../services/hobbies.service');

const personalProfile = async(data) => {
    try {
        let user_profile_info_personal = await getUser(data);
        delete user_profile_info_personal.encrypted_password

        let user_address = await address.addressesUser(data);
        let user_skills = await skills.skillsUser(data);
        let user_hobbies = await hobbies.hobbiesUser(data);

        user_profile_info_personal.hobbies = user_hobbies;

        return { personal_info: user_profile_info_personal, addresses_info: user_address, skills_info: user_skills };
    } catch (error) {
        throw new Error('Error en la construcción de perfil: ' + error.message);
    }
}

module.exports = {
    personalProfile,
}