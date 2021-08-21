const { Hobby, AllHobbiesUser } = require('../models/hobbies.model');

const newHobby = async(data) => {
    try {
        let new_hobby = new Hobby(data);
        await new_hobby.createHobby();
        //console.log(new_hobby);
        return new_hobby;
    } catch (error) {
        throw new Error('Error en la función newHobby: ' + error.message)
    }
}

const editHobby = async(data) => {
    try {
        let status_hobby = new Hobby(data);
        await status_hobby.updateHobby(data.hobby_id, data);
        //console.log(status_hobby);
        return status_hobby;
    } catch (error) {
        throw new Error('Error en la función editHobby: ' + error.message)
    }
}

const deleteHobby = async(data) => {
    try {
        let status_hobby = new Hobby(data);
        await status_hobby.deleteHobby(data.hobby_id);
        //console.log(status_hobby);
        return status_hobby;
    } catch (error) {
        throw new Error('Error en la función deleteHobby: ' + error.message)
    }
}

const hobbiesUser = async(data) => {
    try {
        let hobbies = await AllHobbiesUser(data);
        //console.log(hobbies);
        return hobbies;
    } catch (error) {
        throw new Error('Error en la función hobbiesUser: ' + error.message)
    }
}

module.exports = {
    newHobby,
    editHobby,
    deleteHobby,
    hobbiesUser,
}