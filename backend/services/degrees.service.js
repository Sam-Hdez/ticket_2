
const { Degree } = require('../models/degrees.model');


const degrees = new Degree();

const newDegree = (data) => {
    try {
        return degrees.createDegree(data);
    } catch (e) {
        throw new Error(e);
    }
}

const updateDegree = (data) => {
    try {
        return degrees.updateDegree(data);
    } catch (e) {
        throw new Error(e);
    }
}

const deleteDegree = (id) => {
    try {
        return degrees.deleteDegree(id);
    } catch (e) {
        throw new Error(e);
    }
}

const getDegrees = () => {
    try {
        return degrees.getAllDegrees()
    } catch (e) {
        throw new Error(e);
    }
}

const getDegreeById = (id) => {
    try {
        return degrees.getDegreeById(id);
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    newDegree,
    updateDegree,
    deleteDegree,
    getDegrees,
    getDegreeById
}
