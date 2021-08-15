
const { UserCircle } = require('../models/userCircles.model');

const userCircle = new UserCircle();

const newUserCircle = (circle) => {
    try {
        return userCircle.createUserCircle(circle);
    } catch (e) {
        throw new Error(e);
    }
}

const editUserCircle = (data) => {
    try {
        return userCircle.updateUserCircle(data);
    } catch (e) {
        throw new Error(e);
    }
}

const deleteUserCircle = (id) => {
    try {
        return userCircle.deleteUserCircle(id);
    } catch (e) {
        throw new Error(e);
    }
}

const getUserCircleById = (id) => {
    try {
        return userCircle.getUserCircleById(id);
    } catch (e) {
        throw new Error(e);
    }
}

const getUserCircleByTypeCircle = (type) => {
    try {
        return userCircle.getUserCircleByTypeCircle(type);
    } catch (e) {
        throw new Error(e);
    }
}

const getUserCircleByUserId = (userId) => {
    try {
        return userCircle.getUserCircleByUserId(userId);
    } catch (e) {
        throw new Error(e);
    }
}

const getAllUserCircle = () => {
    try {
        return userCircle.getAllUsersCircles();
    } catch (e) {
        throw new Error(e);
    }
}


module.exports = {
    newUserCircle,
    editUserCircle,
    deleteUserCircle,
    getUserCircleById,
    getUserCircleByTypeCircle,
    getUserCircleByUserId,
    getAllUserCircle
}