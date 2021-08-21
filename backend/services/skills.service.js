const { Skill, AllSkillsUser, AllSkillsUserIds, check_skill } = require('../models/skills.model');

const newSkill = async(data) => {
    try {
        let new_skill = new Skill(data);
        await new_skill.createSkill();
        //console.log(new_skill);
        return new_skill;
    } catch (error) {
        throw new Error('Error en la función newSkill: ' + error.message)
    }
}

const editSkill = async(data) => {
    try {
        let status_skill = new Skill(data);
        await status_skill.updateSkill(data.skill_id, data);
        //console.log(status_skill);
        return status_skill;
    } catch (error) {
        throw new Error('Error en la función editSkill: ' + error.message)
    }
}

const deleteSkill = async(data) => {
    try {
        let status_skill = new Skill(data);
        await status_skill.deleteSkill(data.skill_id);
        //console.log(status_skill);
        return status_skill;
    } catch (error) {
        throw new Error('Error en la función deleteSkill: ' + error.message)
    }
}

const skillsUser = async(data) => {
    try {
        let skills = await AllSkillsUser(data);
        //console.log(skills);
        return skills;
    } catch (error) {
        throw new Error('Error en la función skillsUser: ' + error.message)
    }
}

const skillsIdsUser = async(data) => {
    try {
        let skills = await AllSkillsUserIds(data);
        //console.log(skills);
        return skills;
    } catch (error) {
        throw new Error('Error en la función skillsIdsUser: ' + error.message)
    }
}

const checkSkill = async(data) => {
    try {
        let skill = await check_skill(data);
    } catch (error) {
        throw new Error('Error en la función checkSkill: ' + error.message)
    }
}

module.exports = {
    newSkill,
    editSkill,
    deleteSkill,
    skillsUser,
    skillsIdsUser,
    checkSkill
}