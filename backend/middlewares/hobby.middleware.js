const { checkHobby } = require('../services/hobbies.service');

const HobbyExist = async(req, res, next) => {
    try {
        let hobby_exist = await checkHobby(req.body.hobby_id);
        return next()
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

module.exports = {
    HobbyExist,
}